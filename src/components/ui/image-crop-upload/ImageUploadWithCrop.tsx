'use client';

import * as React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { ImageCropperModal } from './ImageCropperModal';
import type { ImageUploadWithCropProps } from './types';
import { Upload, Crop, X, Loader2, Image as ImageIcon } from 'lucide-react';

export function ImageUploadWithCrop({
  value,
  onChange,
  onUploadFile,
  label,
  helperText,
  placeholder = 'Image URL or upload file',
  required = false,
  aspectRatio = 1,
  allowedRatios,
  cropShape = 'rect',
  targetWidth = 512,
  targetHeight = 512,
  mimeType = 'image/webp',
  quality = 0.92,
  previewShape = 'square',
  className = '',
  disabled = false,
  fallbackUrl,
}: ImageUploadWithCropProps) {
  const [cropperOpen, setCropperOpen] = React.useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = React.useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string>('image.webp');
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const displayImage = value || fallbackUrl;

  const directUpload = async (fileToUpload: File) => {
    if (onUploadFile) {
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

    // If an aspect ratio is required, inspect dimensions
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let numericRatio: number | null = null;
      if (typeof aspectRatio === 'number') {
        numericRatio = aspectRatio;
      } else if (typeof aspectRatio === 'string') {
        if (aspectRatio === '1:1') numericRatio = 1.0;
        else if (aspectRatio === '16:9') numericRatio = 16 / 9;
        else if (aspectRatio === '4:3') numericRatio = 4 / 3;
        else if (aspectRatio === '3:4') numericRatio = 3 / 4;
        else if (aspectRatio === '1:6') numericRatio = 1 / 6;
        else if (aspectRatio === '6:1') numericRatio = 6.0;
        else if (aspectRatio === '21:9') numericRatio = 21 / 9;
        else numericRatio = parseFloat(aspectRatio) || null;
      }

      const isRatioMatched =
        numericRatio !== null ? Math.abs(imgRatio - numericRatio) <= 0.05 : true;

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
      'w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    square:
      'w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    banner:
      'w-20 h-12 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
    portrait:
      'w-10 h-14 rounded-xl overflow-hidden shrink-0 border border-border bg-surface-sunken flex items-center justify-center',
  }[previewShape];

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
              <Crop className="w-3 h-3 text-primary" /> Crop
            </button>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors px-1 py-0.5 rounded cursor-pointer"
            >
              <X className="w-3 h-3" /> Clear
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
                <Crop className="w-3.5 h-3.5 text-primary" />
              </div>
            </>
          ) : (
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
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
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              leftIcon={
                isUploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )
              }
              className="rounded-xl h-9 px-3"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>

      {helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
      {errorMessage && <p className="text-[11px] text-destructive font-medium">{errorMessage}</p>}

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
          aspectRatio={aspectRatio}
          allowedRatios={allowedRatios}
          cropShape={cropShape}
          targetWidth={targetWidth}
          targetHeight={targetHeight}
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
