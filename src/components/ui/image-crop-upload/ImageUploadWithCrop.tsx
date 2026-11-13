'use client';

import * as React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { ImageCropperModal } from './ImageCropperModal';
import { ImageUploadSourceModal } from './ImageUploadSourceModal';
import type { ImageUploadWithCropProps } from './types';
import { Upload, Crop, X, Loader2, Image as ImageIcon } from 'lucide-react';

export function ImageUploadWithCrop({
  value,
  onChange,
  onUploadFile,
  onUpload,
  label,
  helperText,
  placeholder = 'Image URL or upload file',
  required = false,
  aspectRatio = 1,
  allowedRatios,
  cropShape = 'rect',
  targetWidth,
  targetHeight,
  mimeType = 'image/webp',
  quality = 0.92,
  previewShape = 'square',
  allowClipboard = true,
  className = '',
  disabled = false,
  fallbackUrl,
}: ImageUploadWithCropProps) {
  const [cropperOpen, setCropperOpen] = React.useState(false);
  const [sourceModalOpen, setSourceModalOpen] = React.useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = React.useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>('image.webp');
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const displayImage = value || fallbackUrl;

  // Determine crop dimensions and numeric ratio dynamically
  const cropConfig = React.useMemo(() => {
    if (aspectRatio) {
      let numericRatio = 1.0;
      if (typeof aspectRatio === 'number') {
        numericRatio = aspectRatio;
      } else if (aspectRatio === '21:9') {
        numericRatio = 21 / 9;
      } else if (aspectRatio === '16:9') {
        numericRatio = 16 / 9;
      } else if (aspectRatio === '3:4') {
        numericRatio = 3 / 4;
      } else if (aspectRatio === '4:3') {
        numericRatio = 4 / 3;
      } else if (aspectRatio === '1:6') {
        numericRatio = 1 / 6;
      } else if (aspectRatio === '6:1') {
        numericRatio = 6.0;
      } else if (typeof aspectRatio === 'string' && (aspectRatio.includes(':') || aspectRatio.includes('/'))) {
        const parts = aspectRatio.split(/[:/]/);
        const num = parseFloat(parts[0] || '1');
        const den = parseFloat(parts[1] || '1');
        numericRatio = den !== 0 ? num / den : 1.0;
      } else {
        const parsed = parseFloat(String(aspectRatio));
        if (!isNaN(parsed) && parsed > 0) numericRatio = parsed;
      }

      const isWideBanner = numericRatio >= 2.0;
      const isPortrait = numericRatio < 1.0;

      return {
        aspectRatio: numericRatio,
        cropShape: previewShape === 'circle' ? ('round' as const) : cropShape,
        width: targetWidth || (isWideBanner ? 2520 : isPortrait ? 900 : 1200),
        height: targetHeight || (isWideBanner ? 1080 : isPortrait ? 1200 : Math.round(1200 / numericRatio)),
      };
    }

    switch (previewShape) {
      case 'circle':
        return {
          aspectRatio: 1.0,
          cropShape: 'round' as const,
          width: targetWidth || 512,
          height: targetHeight || 512,
        };
      case 'portrait':
        return {
          aspectRatio: 3 / 4,
          cropShape: 'rect' as const,
          width: targetWidth || 900,
          height: targetHeight || 1200,
        };
      case 'banner':
        return {
          aspectRatio: 16 / 9,
          cropShape: 'rect' as const,
          width: targetWidth || 1200,
          height: targetHeight || 675,
        };
      case 'square':
      default:
        return {
          aspectRatio: 1.0,
          cropShape: 'rect' as const,
          width: targetWidth || 512,
          height: targetHeight || 512,
        };
    }
  }, [previewShape, aspectRatio, cropShape, targetWidth, targetHeight]);

  const directUpload = async (fileToUpload: File) => {
    if (onUpload) {
      try {
        setIsUploading(true);
        setErrorMessage(null);
        const url = await onUpload(fileToUpload);
        onChange(url);
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    } else if (onUploadFile) {
      try {
        setIsUploading(true);
        setErrorMessage(null);
        const res = await onUploadFile(fileToUpload);
        if (res.success && res.url) {
          onChange(res.url);
        } else {
          setErrorMessage(res.error || 'Upload failed');
        }
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    } else {
      const dataUrl = URL.createObjectURL(fileToUpload);
      onChange(dataUrl);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file');
      return;
    }
    setErrorMessage(null);
    setSelectedFileName(file.name.replace(/\.[^/.]+$/, '') + '.webp');

    const objectUrl = URL.createObjectURL(file);

    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const targetRatio = cropConfig.aspectRatio;

      const isRatioMatched =
        targetRatio !== null ? Math.abs(imgRatio - targetRatio) <= 0.03 : true;

      if (!isRatioMatched) {
        setSelectedImageSrc(objectUrl);
        setCropperOpen(true);
      } else {
        directUpload(file);
      }
    };
    img.onerror = () => {
      directUpload(file);
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCropComplete = async (croppedFile: File) => {
    await directUpload(croppedFile);
  };

  const previewClasses = {
    circle:
      'size-12 rounded-full overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    square:
      'size-12 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    banner:
      'w-20 h-12 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    portrait:
      'w-10 h-14 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
  }[previewShape];

  const handleUploadButtonClick = () => {
    if (allowClipboard) {
      setSourceModalOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {/* Label & Header */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-semibold text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {displayImage && (
            <button
              type="button"
              onClick={() => {
                setSelectedImageSrc(displayImage);
                setCropperOpen(true);
              }}
              className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors px-1 py-0.5 rounded cursor-pointer"
            >
              <Crop className="size-3 text-primary" /> Crop
            </button>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors px-1 py-0.5 rounded cursor-pointer"
            >
              <X className="size-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Preview Thumbnail with Click to Crop */}
        <div
          className={`${previewClasses} relative group ${displayImage ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (displayImage) {
              setSelectedImageSrc(displayImage);
              setCropperOpen(true);
            }
          }}
          title={displayImage ? 'Click to crop image' : undefined}
        >
          {displayImage ? (
            <>
              <img
                src={displayImage}
                alt="Preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Crop className="size-3.5 text-primary" />
              </div>
            </>
          ) : (
            <ImageIcon className="size-5 text-muted-foreground" />
          )}
        </div>

        {/* Input & Action Buttons */}
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 min-w-0">
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled || isUploading}
            className="text-xs rounded-xl min-w-[140px] flex-1"
          />

          <div className="flex items-center gap-1.5 shrink-0 justify-end">
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleUploadButtonClick}
              disabled={disabled || isUploading}
              leftIcon={
                isUploading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Upload className="size-3.5" />
                )
              }
              className="rounded-xl h-9 px-3"
              title="Upload image from device or clipboard"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>

      {helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
      {errorMessage && <p className="text-[11px] text-destructive font-medium">{errorMessage}</p>}

      {/* Upload Source Modal (Device vs Clipboard) */}
      <ImageUploadSourceModal
        isOpen={sourceModalOpen}
        onClose={() => setSourceModalOpen(false)}
        onSelectFile={handleFileSelect}
        title={`Upload ${label || 'Image'}`}
        description="Select from your device or paste directly from clipboard"
      />

      {/* Interactive Crop Modal */}
      {selectedImageSrc && (
        <ImageCropperModal
          isOpen={cropperOpen}
          onClose={() => {
            setCropperOpen(false);
            if (selectedImageSrc && selectedImageSrc.startsWith('blob:')) {
              URL.revokeObjectURL(selectedImageSrc);
            }
            setSelectedImageSrc(null);
          }}
          imageSrc={selectedImageSrc}
          fileName={selectedFileName}
          aspectRatio={cropConfig.aspectRatio}
          allowedRatios={allowedRatios}
          cropShape={cropConfig.cropShape}
          targetWidth={cropConfig.width}
          targetHeight={cropConfig.height}
          mimeType={mimeType}
          quality={quality}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}

// Alias for convenience
export const ImageUpload = ImageUploadWithCrop;
export default ImageUploadWithCrop;
