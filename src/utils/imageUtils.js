/**
 * Image Processing and File Utilities for FireGuard AI
 */

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB limit

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  const isTypeValid = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) ||
    /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isTypeValid) {
    return {
      valid: false,
      error: `Unsupported file format. Please upload JPG, PNG, or WebP image files.`
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 15 MB limit. Please upload a smaller image.`
    };
  }

  return { valid: true, error: null };
};

export const getImageDimensions = (source) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        aspectRatio: (img.naturalWidth / (img.naturalHeight || 1)).toFixed(2)
      });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0, aspectRatio: '1.0' });
    };

    if (source instanceof Blob || source instanceof File) {
      const url = URL.createObjectURL(source);
      img.src = url;
      img.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
    } else if (typeof source === 'string') {
      img.src = source;
    } else {
      resolve({ width: 0, height: 0, aspectRatio: '1.0' });
    }
  });
};

export const dataUrlToBlob = async (dataUrl) => {
  const res = await fetch(dataUrl);
  return await res.blob();
};

export const blobToDataUrl = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(blob);
  });
};

export const downloadImage = async (imageUrl, filename = 'fireguard_annotated_inspection.webp') => {
  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
    return true;
  } catch (err) {
    console.error('Failed to download image via blob, falling back to direct link:', err);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
};

export const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
};
