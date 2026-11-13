import React, { useState } from 'react';
import {
  ImageUploadWithCrop,
  CropShape,
  useToast,
  ParameterGrid,
  ParameterSlider,
  ParameterSwitch,
  Button,
} from '@/components/ui';
import { Sliders, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    label: 'Cyber Art',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    shape: 'square' as const,
    ratio: 1,
  },
  {
    label: 'Hero Banner',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    shape: 'banner' as const,
    ratio: 16 / 9,
  },
  {
    label: 'User Avatar',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    shape: 'circle' as const,
    ratio: 1,
  },
  {
    label: 'Portrait Poster',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    shape: 'portrait' as const,
    ratio: 3 / 4,
  },
];

export const ImageUploadPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_IMAGES[0].url);
  const [label, setLabel] = useState<string>('Profile Avatar & Cover Image');
  const [helperText, setHelperText] = useState<string>('PNG, JPG or WebP up to 10MB. Click thumbnail or Crop to adjust.');
  const [previewShape, setPreviewShape] = useState<'square' | 'circle' | 'banner' | 'portrait'>('square');
  const [cropShape, setCropShape] = useState<CropShape>('rect');
  const [aspectRatio, setAspectRatio] = useState<number | string>(1);
  const [targetWidth, setTargetWidth] = useState<number>(512);
  const [targetHeight, setTargetHeight] = useState<number>(512);
  const [mimeType, setMimeType] = useState<'image/webp' | 'image/png' | 'image/jpeg'>('image/webp');
  const [quality, setQuality] = useState<number>(0.92);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);

  const handleImageChange = (newUrl: string) => {
    setImageUrl(newUrl);
    if (newUrl) {
      addToast({
        title: 'Image Updated',
        description: 'New cropped asset loaded successfully.',
        type: 'success',
      });
    } else {
      addToast({
        title: 'Image Cleared',
        description: 'Image URL removed.',
        type: 'info',
      });
    }
  };

  const handleLoadSample = (sample: (typeof SAMPLE_IMAGES)[0]) => {
    setImageUrl(sample.url);
    setPreviewShape(sample.shape);
    setAspectRatio(sample.ratio);
    if (sample.shape === 'circle') {
      setCropShape('round');
    } else {
      setCropShape('rect');
    }
    addToast({
      title: 'Sample Preset Loaded',
      description: `Loaded ${sample.label} with ${sample.shape} preview.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden">
        {/* Header Preset Switcher */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live Preview & Presets
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleLoadSample(sample)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  imageUrl === sample.url
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-surface-subtle text-muted-foreground hover:text-foreground'
                }`}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Live Image Upload Component */}
        <div className="w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-surface-elevated border border-border shadow-md">
          <ImageUploadWithCrop
            value={imageUrl}
            onChange={handleImageChange}
            label={label}
            helperText={helperText}
            previewShape={previewShape}
            cropShape={cropShape}
            aspectRatio={aspectRatio}
            targetWidth={targetWidth}
            targetHeight={targetHeight}
            mimeType={mimeType}
            quality={quality}
            disabled={disabled}
            required={required}
          />
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-surface-subtle px-3 py-1.5 rounded-full border border-border">
          <ImageIcon className="size-3.5 text-primary" />
          <span>Output: {targetWidth} × {targetHeight} px ({mimeType.replace('image/', '').toUpperCase()} · {Math.round(quality * 100)}%)</span>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Crop & Upload Parameters
            </span>
          </div>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => handleLoadSample(SAMPLE_IMAGES[0])}
            leftIcon={<RefreshCw className="size-3" />}
          >
            Reset
          </Button>
        </div>

        <ParameterGrid columns={3}>
          {/* Preview Shape */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Thumbnail Shape</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['square', 'circle', 'banner', 'portrait'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => setPreviewShape(shape)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                    previewShape === shape
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-surface-subtle text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Box Shape */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Crop Frame Shape</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['rect', 'round'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => setCropShape(shape)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                    cropShape === shape
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-surface-subtle text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {shape === 'round' ? 'Round / Circle' : 'Rectangle'}
                </button>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Export Mime Type</label>
            <div className="grid grid-cols-3 gap-1">
              {(['image/webp', 'image/png', 'image/jpeg'] as const).map((mime) => (
                <button
                  key={mime}
                  type="button"
                  onClick={() => setMimeType(mime)}
                  className={`text-xs px-2 py-1.5 rounded-lg border uppercase transition-all cursor-pointer ${
                    mimeType === mime
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-surface-subtle text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {mime.replace('image/', '')}
                </button>
              ))}
            </div>
          </div>
        </ParameterGrid>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Target Width */}
          <ParameterSlider
            label="Target Output Width"
            value={targetWidth}
            onChange={setTargetWidth}
            min={128}
            max={1920}
            step={64}
            unit="px"
          />

          {/* Target Height */}
          <ParameterSlider
            label="Target Output Height"
            value={targetHeight}
            onChange={setTargetHeight}
            min={128}
            max={1920}
            step={64}
            unit="px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quality Slider */}
          <ParameterSlider
            label="Canvas Compression Quality"
            value={Math.round(quality * 100)}
            onChange={(val) => setQuality(val / 100)}
            min={20}
            max={100}
            step={5}
            unit="%"
          />

          {/* Toggles */}
          <div className="space-y-2.5">
            <ParameterSwitch
              label="Required Field Indicator"
              checked={required}
              onChange={setRequired}
            />
            <ParameterSwitch
              label="Disabled State"
              checked={disabled}
              onChange={setDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
