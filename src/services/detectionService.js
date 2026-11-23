/**
 * FireGuard AI - Inference Service
 * 
 * Communicates with the official Hugging Face Space backend:
 * Space: aman9832/object-detection
 * Endpoint: /detect
 * SDK: Gradio Client (@gradio/client)
 * 
 * Note on Model Output:
 * The underlying YOLO model plots detections directly onto the image canvas
 * and returns the annotated visual image. This service faithfully normalizes
 * the response without inventing synthetic bounding boxes or fake confidence scores.
 */

import { Client } from '@gradio/client';
import { generateUniqueId } from '../utils/formatUtils';
import { getImageDimensions, blobToDataUrl } from '../utils/imageUtils';

export const DEFAULT_SPACE_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_HF_SPACE_ID) || 'aman9832/object-detection';
export const DEFAULT_ENDPOINT = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_HF_ENDPOINT) || '/detect';

class DetectionService {
  constructor() {
    this.spaceId = DEFAULT_SPACE_ID;
    this.client = null;
    this.clientPromise = null;
    this.lastSuccessfulInference = null;
    this.connectionState = 'unknown'; // 'connected' | 'connecting' | 'error' | 'unknown'
    this.connectionError = null;
  }

  /**
   * Get or initialize the @gradio/client instance
   */
  async getClient(customSpaceId = null) {
    const targetSpace = customSpaceId || this.spaceId;

    if (this.client && this.spaceId === targetSpace) {
      return this.client;
    }

    if (this.clientPromise && this.spaceId === targetSpace) {
      return this.clientPromise;
    }

    this.spaceId = targetSpace;
    this.connectionState = 'connecting';

    this.clientPromise = (async () => {
      try {
        console.log(`[FireGuard AI] Connecting to Hugging Face Space: ${this.spaceId}...`);
        const client = await Client.connect(this.spaceId);
        this.client = client;
        this.connectionState = 'connected';
        this.connectionError = null;
        console.log(`[FireGuard AI] Successfully connected to ${this.spaceId}`);
        return client;
      } catch (err) {
        console.error(`[FireGuard AI] Connection error to ${this.spaceId}:`, err);
        this.connectionState = 'error';
        this.connectionError = err.message || 'Unable to establish connection to Hugging Face Space';
        this.client = null;
        this.clientPromise = null;
        throw err;
      }
    })();

    return this.clientPromise;
  }

  /**
   * Check connection status and space availability
   */
  async checkConnection(customSpaceId = null) {
    const startTime = performance.now();
    try {
      const client = await this.getClient(customSpaceId);
      const apiInfo = await client.view_api();
      const latencyMs = Math.round(performance.now() - startTime);

      const hasDetectEndpoint = Boolean(
        apiInfo?.named_endpoints?.['/detect'] ||
        apiInfo?.named_endpoints?.['detect']
      );

      this.connectionState = 'connected';
      this.connectionError = null;

      return {
        success: true,
        status: 'online',
        spaceId: this.spaceId,
        endpoint: DEFAULT_ENDPOINT,
        hasDetectEndpoint,
        latencyMs,
        lastChecked: new Date().toISOString(),
        apiInfo
      };
    } catch (err) {
      this.connectionState = 'error';
      this.connectionError = err.message;
      return {
        success: false,
        status: 'offline',
        spaceId: this.spaceId,
        error: err.message || 'Hugging Face Space unreachable or waking up.',
        lastChecked: new Date().toISOString()
      };
    }
  }

  /**
   * Execute real detection inference on an image
   * @param {File | Blob} imageFile 
   * @param {Object} options - { onProgress, filename }
   */
  async runDetection(imageFile, options = {}) {
    const { onProgress, filename = 'inspection.jpg' } = options;
    const startTime = performance.now();

    if (!imageFile) {
      throw new Error('Please select or drop a valid image file to run detection.');
    }

    try {
      if (onProgress) onProgress({ stage: 'connecting', message: 'Connecting to FireGuard AI detection model...' });
      const client = await this.getClient();

      if (onProgress) onProgress({ stage: 'uploading', message: 'Uploading image payload to Hugging Face Space...' });

      // Convert image to data URL for local display and preservation
      let originalDataUrl;
      try {
        originalDataUrl = await blobToDataUrl(imageFile);
      } catch (e) {
        console.warn('Could not generate originalDataUrl:', e);
      }

      const dimensions = await getImageDimensions(imageFile);

      if (onProgress) onProgress({ stage: 'inferring', message: 'Model running YOLO inference and bounding box plotting...' });

      // Run prediction against the verified /detect endpoint
      const result = await client.predict(DEFAULT_ENDPOINT, {
        image: imageFile
      });

      const elapsedMs = Math.round(performance.now() - startTime);
      this.lastSuccessfulInference = new Date().toISOString();

      // Parse and extract the processed image URL
      let processedImageUrl = null;
      let rawData = result?.data;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const item = rawData[0];
        if (typeof item === 'string') {
          processedImageUrl = item;
        } else if (item && typeof item === 'object') {
          processedImageUrl = item.url || item.path || null;
        }
      } else if (result?.data?.url) {
        processedImageUrl = result.data.url;
      }

      if (!processedImageUrl) {
        throw new Error('The model completed inference but did not return a valid annotated image URL.');
      }

      if (onProgress) onProgress({ stage: 'completed', message: 'Detection complete! Rendering annotated visualization.' });

      // Normalized Internal Result Structure
      const normalizedResult = {
        id: generateUniqueId('fg_det'),
        filename: filename || imageFile.name || 'inspection.jpg',
        timestamp: Date.now(),
        processedAt: new Date().toISOString(),
        status: 'completed',
        originalImage: originalDataUrl || null,
        processedImage: processedImageUrl,
        totalDetections: null, // Explicitly null: visual YOLO bounding boxes rendered on image
        averageConfidence: null, // Not returned by backend plot() API
        detections: [], // Detailed structured bounding boxes unavailable in current backend
        hasAnnotatedImage: true,
        visualDetectionsRendered: true,
        structuredBoundingBoxesAvailable: false,
        processingTimeMs: elapsedMs,
        modelEndpoint: `${this.spaceId} ${DEFAULT_ENDPOINT}`,
        spaceUrl: `https://huggingface.co/spaces/${this.spaceId}`,
        fileSize: imageFile.size || 0,
        dimensions
      };

      return normalizedResult;

    } catch (err) {
      console.error('[FireGuard AI] Detection execution failed:', err);
      const elapsedMs = Math.round(performance.now() - startTime);

      let friendlyMessage = err.message || 'An error occurred during detection.';
      if (friendlyMessage.includes('queue') || friendlyMessage.includes('timeout')) {
        friendlyMessage = 'The Hugging Face Space is experiencing high queue volume or waking from a cold start. Please try again in a few moments.';
      } else if (friendlyMessage.includes('NetworkError') || friendlyMessage.includes('Failed to fetch')) {
        friendlyMessage = 'Network connection failed. Verify internet connectivity and ensure the Hugging Face Space is public and reachable.';
      }

      throw new Error(friendlyMessage);
    }
  }
}

export const detectionService = new DetectionService();
