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
    label: 'Cyber Art (1:1)',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    shape: 'square' as const,
    ratio: '1:1',
  },
  {
    label: 'Hero Banner (16:9)',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    shape: 'banner' as const,
    ratio: '16:9',
  },
  {
    label: 'Desktop Banner (21:9)',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80',
    shape: 'banner' as const,
    ratio: '21:9',
  },
  {
    label: 'User Avatar (Round)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    shape: 'circle' as const,
    ratio: '1:1',
  },
  {
    label: 'Poster (3:4)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    shape: 'portrait' as const,
    ratio: '3:4',
  },
];

export const ImageUploadPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_IMAGES[0].url);
  const [label] = useState<string>('Profile Avatar & Cover Image');
  const [helperText] = useState<string>('PNG, JPG or WebP. Click Upload to pick files or paste from clipboard (⌘V).');
  const [previewShape, setPreviewShape] = useState<'square' | 'circle' | 'banner' | 'portrait'>('square');
  const [cropShape, setCropShape] = useState<CropShape>('rect');
  const [aspectRatio, setAspectRatio] = useState<number | string>('1:1');
  const [targetWidth, setTargetWidth] = useState<number>(512);
  const [targetHeight, setTargetHeight] = useState<number>(512);
  const [mimeType, setMimeType] = useState<'image/webp' | 'image/png' | 'image/jpeg'>('image/webp');
  const [quality, setQuality] = useState<number>(0.92);
  const [allowClipboard, setAllowClipboard] = useState<boolean>(true);
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
      setTargetWidth(512);
      setTargetHeight(512);
    } else if (sample.ratio === '21:9') {
      setCropShape('rect');
      setTargetWidth(2520);
      setTargetHeight(1080);
    } else if (sample.ratio === '16:9') {
      setCropShape('rect');
      setTargetWidth(1200);
      setTargetHeight(675);
    } else if (sample.ratio === '3:4') {
      setCropShape('rect');
      setTargetWidth(900);
      setTargetHeight(1200);
    } else {
      setCropShape('rect');
      setTargetWidth(512);
      setTargetHeight(512);
    }
    addToast({
      title: 'Sample Preset Loaded',
      description: `Loaded ${sample.label} (${sample.ratio}).`,
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
            allowClipboard={allowClipboard}
            disabled={disabled}
            required={required}
          />
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-surface-subtle px-3 py-1.5 rounded-full border border-border">
          <ImageIcon className="size-3.5 text-primary" />
          <span>
            Ratio: {String(aspectRatio)} · Output: {targetWidth} × {targetHeight} px ({mimeType.replace('image/', '').toUpperCase()} · {Math.round(quality * 100)}%)
          </span>
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
          {/* Target Ratio Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Target Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['1:1', '16:9', '21:9', '3:4', '4:3', 'free'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspectRatio(r)}
                  className={`text-xs px-2 py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                    aspectRatio === r
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-surface-subtle text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

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
        </ParameterGrid>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Target Width */}
          <ParameterSlider
            label="Target Output Width"
            value={targetWidth}
            onChange={setTargetWidth}
            min={128}
            max={2560}
            step={64}
            unit="px"
          />

          {/* Target Height */}
          <ParameterSlider
            label="Target Output Height"
            value={targetHeight}
            onChange={setTargetHeight}
            min={128}
            max={2560}
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
              label="Allow Clipboard Upload (⌘V / Paste Modal)"
              checked={allowClipboard}
              onChange={setAllowClipboard}
            />
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
