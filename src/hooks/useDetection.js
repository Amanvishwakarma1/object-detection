import { useState, useCallback, useEffect } from 'react';
import { detectionService } from '../services/detectionService';
import { historyService } from '../services/historyService';
import { validateImageFile, getImageDimensions, dataUrlToBlob } from '../utils/imageUtils';

export const useDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileDimensions, setFileDimensions] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState({ stage: 'idle', message: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /**
   * Handle setting or uploading a file
   */
  const handleSelectFile = useCallback(async (file) => {
    setError(null);
    setResult(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return false;
    }

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);

    try {
      const dimensions = await getImageDimensions(file);
      setFileDimensions(dimensions);
    } catch {
      setFileDimensions(null);
    }

    return true;
  }, [previewUrl]);

  /**
   * Select one of the pre-curated sample images
   */
  const handleSelectSample = useCallback(async (sample) => {
    setError(null);
    setResult(null);

    try {
      const blob = await dataUrlToBlob(sample.dataUrl);
      const file = new File([blob], sample.filename, { type: 'image/svg+xml' });
      
      setSelectedFile(file);
      setPreviewUrl(sample.dataUrl);
      
      const dimensions = await getImageDimensions(sample.dataUrl);
      setFileDimensions(dimensions);
      return true;
    } catch (err) {
      console.error('Failed to load sample:', err);
      setError('Could not load the sample image. Please try uploading a local image.');
      return false;
    }
  }, []);

  /**
   * Clear currently selected image and reset workspace
   */
  const handleClear = useCallback(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileDimensions(null);
    setResult(null);
    setError(null);
    setProgressState({ stage: 'idle', message: '' });
  }, [previewUrl]);

  /**
   * Execute real detection
   */
  const handleRunDetection = useCallback(async () => {
    if (!selectedFile) {
      setError('Please choose or drop an image file first.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgressState({ stage: 'starting', message: 'Initializing inspection job...' });

    try {
      const detectionResult = await detectionService.runDetection(selectedFile, {
        filename: selectedFile.name,
        onProgress: (status) => {
          setProgressState(status);
        }
      });

      setResult(detectionResult);
      setProgressState({ stage: 'completed', message: 'Inspection complete' });

      // Persist to local IndexedDB history automatically
      try {
        await historyService.saveRecord(detectionResult);
      } catch (histErr) {
        console.warn('Failed to save to history:', histErr);
      }

    } catch (err) {
      console.error('Detection failed in hook:', err);
      setError(err.message || 'Detection failed. Please verify the Hugging Face Space is active.');
      setProgressState({ stage: 'error', message: 'Detection aborted due to an error.' });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile]);

  return {
    selectedFile,
    previewUrl,
    fileDimensions,
    isProcessing,
    progressState,
    result,
    error,
    handleSelectFile,
    handleSelectSample,
    handleClear,
    handleRunDetection,
    setResult
  };
};
