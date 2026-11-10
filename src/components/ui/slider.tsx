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
  bottom:
    'absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-xs font-medium text-foreground whitespace-nowrap pointer-events-none',
  'top-floating':
    'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-surface-elevated px-2 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-border/80 border border-border/50 whitespace-nowrap pointer-events-none',
} as const;

export interface SliderProps extends AriaSliderProps<number | number[]> {
  /** Optional label text */
  label?: ReactNode;
  /** Where the value label sits relative to the thumb. `default` hides it, `bottom` places it below, and `top-floating` shows it in a tooltip above. */
  labelPosition?: keyof typeof sliderLabelPositionStyles;
  /** Formats the value shown in the label. Called with the raw thumb value. Without it the value is formatted as a percentage. */
  labelFormatter?: (value: number) => string;
  className?: string;
}

export const Slider = ({
  label,
  labelPosition = 'default',
  minValue = 0,
  maxValue = 100,
  labelFormatter,
  formatOptions,
  className,
  ...sliderRestProps
}: SliderProps) => {
  const defaultPercentageFormatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 0,
  };

  return (
    <AriaSlider
      {...sliderRestProps}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions ?? defaultPercentageFormatOptions}
      className={cn(
        'flex flex-col gap-3 w-full select-none touch-none',
        labelPosition === 'top-floating' && 'pt-3',
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
          labelPosition === 'top-floating' && 'mt-6',
          labelPosition === 'bottom' && 'mb-6'
        )}
      >
        {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
          const trackFillLeft = values.length === 1 ? 0 : getThumbPercent(0);
          const trackFillWidth = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - trackFillLeft;

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
                    className={({ isFocusVisible, isDragging }) =>
                      cn(
                        'top-1/2 box-border size-5 cursor-grab rounded-full bg-surface-elevated shadow-md ring-2 ring-primary ring-inset transition-transform duration-75',
                        isFocusVisible && 'outline-2 outline-offset-2 outline-primary ring-offset-2 ring-offset-background',
                        isDragging && 'cursor-grabbing scale-110'
                      )
                    }
                  >
                    <AriaSliderOutput className={cn('whitespace-nowrap', sliderLabelPositionStyles[labelPosition])}>
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
