'use client';

import React, { type ReactNode } from 'react';
import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import {
  Label as AriaLabel,
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from 'react-aria-components';
import { cn } from '@/lib/utils';

export { ElasticSlider, type ElasticSliderProps } from './elastic-slider';
export { WakeSlider, type WakeSliderProps } from './wake-slider';

const sliderLabelPositionStyles = {
  default: 'hidden',
  hidden: 'hidden',
  bottom:
    'absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-xs font-medium text-foreground whitespace-nowrap pointer-events-none',
  'top-floating':
    'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-surface-elevated px-2 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-border/80 border border-border/50 whitespace-nowrap pointer-events-none',
  tooltip:
    'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-surface-elevated px-2 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-border/80 border border-border/50 whitespace-nowrap pointer-events-none',
} as const;

export type SliderLabelPosition = keyof typeof sliderLabelPositionStyles;

export interface SliderProps
  extends Omit<AriaSliderProps<number | number[]>, 'value' | 'defaultValue' | 'onChange' | 'onChangeEnd'> {
  /** Explicit number of thumbs: 1 for single thumb, 2 for double / dual thumb range */
  thumbs?: 1 | 2;
  /** Mode alias: 'single' (1 thumb) | 'range' or 'dual' (2 thumbs) */
  mode?: 'single' | 'range' | 'dual';
  /** Controlled slider value: number for single thumb, [number, number] for dual thumb */
  value?: number | number[];
  /** Default uncontrolled value */
  defaultValue?: number | number[];
  /** Callback fired when thumb values change */
  onChange?: (value: any) => void;
  /** Callback fired when thumb dragging ends */
  onChangeEnd?: (value: any) => void;
  /** Minimum slider limit (alias for minValue) */
  min?: number;
  /** Maximum slider limit (alias for maxValue) */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state (alias for isDisabled) */
  disabled?: boolean;
  /** Optional label text */
  label?: ReactNode;
  /** Where the value label sits relative to the thumb: 'hidden' | 'bottom' | 'tooltip' ('top-floating') */
  labelPosition?: SliderLabelPosition;
  /** Formats the value shown in the label. Called with the raw thumb value. Without it the value is formatted as a percentage. */
  labelFormatter?: (value: number) => string;
  className?: string;
}

export const Slider = ({
  thumbs,
  mode,
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  min,
  max,
  minValue,
  maxValue,
  disabled,
  isDisabled,
  label,
  labelPosition = 'default',
  labelFormatter,
  formatOptions,
  className,
  ...sliderRestProps
}: SliderProps) => {
  const effectiveMin = min ?? minValue ?? 0;
  const effectiveMax = max ?? maxValue ?? 100;
  const effectiveDisabled = disabled ?? isDisabled ?? false;

  // Determine thumb count: explicit thumbs prop > mode alias > inferred from value/defaultValue type
  const resolvedThumbs: 1 | 2 =
    thumbs ??
    (mode === 'single'
      ? 1
      : mode === 'range' || mode === 'dual'
      ? 2
      : Array.isArray(value) || Array.isArray(defaultValue)
      ? 2
      : 1);

  // Normalize controlled value based on resolved thumb mode
  const normalizedValue = React.useMemo(() => {
    if (value === undefined) return undefined;
    if (resolvedThumbs === 1) {
      return Array.isArray(value) ? (value[0] ?? effectiveMin) : value;
    }
    return Array.isArray(value) ? value : [effectiveMin, value];
  }, [value, resolvedThumbs, effectiveMin]);

  // Normalize uncontrolled default value based on resolved thumb mode
  const normalizedDefaultValue = React.useMemo(() => {
    if (defaultValue === undefined) {
      return resolvedThumbs === 1 ? effectiveMin : [effectiveMin, effectiveMax];
    }
    if (resolvedThumbs === 1) {
      return Array.isArray(defaultValue) ? (defaultValue[0] ?? effectiveMin) : defaultValue;
    }
    return Array.isArray(defaultValue) ? defaultValue : [effectiveMin, defaultValue];
  }, [defaultValue, resolvedThumbs, effectiveMin, effectiveMax]);

  const defaultPercentageFormatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 0,
  };

  const handleValueChange = (incoming: number | number[]) => {
    if (!onChange) return;
    if (resolvedThumbs === 1) {
      const singleNumber = Array.isArray(incoming) ? incoming[0] ?? effectiveMin : incoming;
      onChange(singleNumber);
    } else {
      const pairArray = Array.isArray(incoming) ? incoming : [effectiveMin, incoming];
      onChange(pairArray);
    }
  };

  const handleValueChangeEnd = (incoming: number | number[]) => {
    if (!onChangeEnd) return;
    if (resolvedThumbs === 1) {
      const singleNumber = Array.isArray(incoming) ? incoming[0] ?? effectiveMin : incoming;
      onChangeEnd(singleNumber);
    } else {
      const pairArray = Array.isArray(incoming) ? incoming : [effectiveMin, incoming];
      onChangeEnd(pairArray);
    }
  };

  const isFloatingTooltip = labelPosition === 'top-floating' || labelPosition === 'tooltip';
  const isBottomLabel = labelPosition === 'bottom';

  return (
    <AriaSlider
      key={`slider-thumb-mode-${resolvedThumbs}`}
      {...sliderRestProps}
      value={normalizedValue as any}
      defaultValue={normalizedDefaultValue as any}
      onChange={handleValueChange}
      onChangeEnd={handleValueChangeEnd}
      minValue={effectiveMin}
      maxValue={effectiveMax}
      isDisabled={effectiveDisabled}
      formatOptions={formatOptions ?? defaultPercentageFormatOptions}
      className={cn(
        'flex flex-col gap-3 w-full select-none touch-none',
        isFloatingTooltip && 'pt-3',
        className
      )}
    >
      {label ? (
        <AriaLabel className="text-xs font-medium text-foreground block">{label}</AriaLabel>
      ) : (
        <AriaLabel className="sr-only">
          {(sliderRestProps as any)['aria-label'] || 'Slider'}
        </AriaLabel>
      )}
      <AriaSliderTrack
        className={cn(
          'relative h-6 w-full flex items-center',
          isFloatingTooltip && 'mt-6',
          isBottomLabel && 'mb-6'
        )}
      >
        {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
          const isDual = values.length > 1;
          const trackFillLeft = isDual
            ? Math.min(getThumbPercent(0), getThumbPercent(1))
            : 0;
          const trackFillWidth = isDual
            ? Math.abs(getThumbPercent(1) - getThumbPercent(0))
            : values.length === 1
            ? getThumbPercent(0)
            : 0;

          return (
            <>
              {/* Background track */}
              <span className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-muted dark:bg-surface-sunken border border-border/40" />
              {/* Filled active range */}
              <span
                className="absolute top-1/2 h-2 rounded-full bg-primary -translate-y-1/2"
                style={{
                  left: `${trackFillLeft * 100}%`,
                  width: `${trackFillWidth * 100}%`,
                }}
              />
              {/* Thumb handles */}
              {values.map((_, thumbIndex) => {
                const currentThumbValue = getThumbValue(thumbIndex);
                const displayFormattedValue = labelFormatter
                  ? labelFormatter(currentThumbValue)
                  : getFormattedValue(currentThumbValue / 100);

                return (
                  <AriaSliderThumb
                    key={thumbIndex}
                    index={thumbIndex}
                    aria-label={
                      values.length > 1
                        ? thumbIndex === 0
                          ? 'Minimum range bound'
                          : 'Maximum range bound'
                        : typeof label === 'string'
                        ? label
                        : 'Value'
                    }
                    className={({ isFocusVisible, isDragging }) =>
                      cn(
                        'top-1/2 box-border size-5 cursor-grab rounded-full bg-surface-elevated shadow-md ring-2 ring-primary ring-inset transition-transform duration-75',
                        isFocusVisible &&
                          'outline-2 outline-offset-2 outline-primary ring-offset-2 ring-offset-background',
                        isDragging && 'cursor-grabbing scale-110'
                      )
                    }
                  >
                    <AriaSliderOutput
                      className={cn(
                        'whitespace-nowrap',
                        sliderLabelPositionStyles[labelPosition]
                      )}
                    >
                      {displayFormattedValue}
                    </AriaSliderOutput>
                  </AriaSliderThumb>
                );
              })}
            </>
          );
        }}
      </AriaSliderTrack>
    </AriaSlider>
  );
};

export default Slider;
