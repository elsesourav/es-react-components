import React, { useState } from 'react';
import {
  Input,
  Textarea,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { Globe, Key, Zap } from 'lucide-react';

export const InputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [inputVal, setInputVal] = useState('Antigravity Design Engine');
  const [inputError, setInputError] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputScale, setInputScale] = useState(100);
  const [inputTab, setInputTab] = useState<
    'floating' | 'inline' | 'password' | 'otp' | 'tag' | 'search' | 'standard'
  >('floating');
  const [floatEmail, setFloatEmail] = useState('alex.chen@acme.corp');
  const [floatRef, setFloatRef] = useState('INV-2026-9041');
  const [floatTouched, setFloatTouched] = useState(false);
  const isFloatBad = floatTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(floatEmail);
  const [inlineEmail, setInlineEmail] = useState('');
  const checkEmail = (v: string) => {
    if (v.trim() === '') return 'A valid work email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a complete email address (e.g. name@company.com).';
    return null;
  };
  const [passVal, setPassVal] = useState('SuperSecret!2026');
  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Input Variant:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'floating', label: 'Floating Label' },
              { id: 'inline', label: 'Inline Validation' },
              { id: 'password', label: 'Password + Strength' },
              { id: 'otp', label: 'OTP Code' },
              { id: 'tag', label: 'Tags / Chips' },
              { id: 'search', label: 'Expanding Search' },
              { id: 'standard', label: 'Standard Input' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInputTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium cursor-pointer ${
                  inputTab === tab.id
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Scale / Zoom"
            value={inputScale}
            onChange={setInputScale}
            min={80}
            max={120}
            step={5}
            unit="%"
          />
          <ParameterSwitch
            label="Simulate Error State"
            checked={!!inputError}
            onChange={(checked) => setInputError(checked ? 'This field has a validation error.' : '')}
          />
          <ParameterSwitch
            label="Disabled Field"
            checked={inputDisabled}
            onChange={setInputDisabled}
          />
        </ParameterGrid>

        <div className="p-6 sm:p-8 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
          <div className="w-full max-w-md space-y-4" style={{ transform: `scale(${inputScale / 100})`, transformOrigin: 'top center' }}>
            {inputTab === 'floating' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Floating Label Variant</span>
                  <button
                    onClick={() => setFloatTouched(!floatTouched)}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Toggle touched ({String(floatTouched)})
                  </button>
                </div>
                <Input
                  variant="floating"
                  label="Corporate Email"
                  type="email"
                  value={floatEmail}
                  onChange={setFloatEmail}
                  onBlur={() => setFloatTouched(true)}
                  invalid={isFloatBad || !!inputError}
                  disabled={inputDisabled}
                  hint={isFloatBad ? "Must follow user@company.com format" : "Floating label elevates automatically on focus or text."}
                />
                <Input
                  variant="floating"
                  label="Transaction Code"
                  value={floatRef}
                  onChange={setFloatRef}
                  maxLength={16}
                  disabled={inputDisabled}
                  hint="Length limit indicators stick to bottom right."
                />
              </div>
            )}

            {inputTab === 'inline' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-xs text-muted-foreground mb-1">
                  Instant validation callback with live status icon
                </div>
                <Input
                  variant="inline-validation"
                  label="Team Invite Email"
                  type="email"
                  value={inlineEmail}
                  onChange={setInlineEmail}
                  validate={checkEmail}
                  disabled={inputDisabled}
                  placeholder="teammate@company.com"
                  hint="Type an invalid email, then a valid email to observe live reactive feedback."
                />
              </div>
            )}

            {inputTab === 'password' && (
              <div className="space-y-4 animate-in fade-in">
                <Input
                  variant="password"
                  label="Create Account Password"
                  value={passVal}
                  onChange={setPassVal}
                  disabled={inputDisabled}
                  showStrengthMeter
                  showRequirements
                />
              </div>
            )}

            {inputTab === 'otp' && (
              <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                <p className="text-xs text-muted-foreground text-center">
                  Segmented 6-digit verification code with clipboard paste
                </p>
                <Input
                  variant="otp"
                  length={6}
                  value={otpVal}
                  disabled={inputDisabled}
                  onChange={(code) => {
                    setOtpVal(code);
                    if (otpStatus === 'error') setOtpStatus('idle');
                  }}
                  status={otpStatus}
                  errorMessage="That verification token is invalid."
                  hint="Auto-advances to next input & handles backspace"
                  onComplete={(code) => {
                    addToast({
                      title: 'OTP Completed',
                      description: `Entered code: ${code}`,
                      type: 'success',
                    });
                  }}
                />
                <button
                  onClick={() => setOtpStatus(otpStatus === 'error' ? 'idle' : 'error')}
                  className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {otpStatus === 'error' ? 'Clear Error Shake' : 'Simulate Code Failure'}
                </button>
              </div>
            )}

            {inputTab === 'tag' && (
              <div className="space-y-4 animate-in fade-in">
                <Input
                  variant="tag"
                  label="Project Keywords"
                  value={tagsVal}
                  onChange={setTagsVal}
                  disabled={inputDisabled}
                  max={6}
                  separators={[',', ';']}
                  hint="Type a keyword and press Enter or comma. Backspace to delete."
                />
              </div>
            )}

            {inputTab === 'search' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Spring Physics Collapsible Search</span>
                  <span className="font-mono">{searchVal ? `"${searchVal}"` : 'idle'}</span>
                </div>
                <div className="flex justify-end">
                  <Input
                    variant="search"
                    label="Documentation Search"
                    placeholder="Type to search library..."
                    value={searchVal}
                    disabled={inputDisabled}
                    onChange={setSearchVal}
                    resultCount={searchVal ? 12 : undefined}
                  />
                </div>
              </div>
            )}

            {inputTab === 'standard' && (
              <div className="space-y-4 animate-in fade-in">
                <Input
                  label="Application Domain"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  error={inputError}
                  disabled={inputDisabled}
                  helperText="Configured via your workspace DNS records."
                  leftIcon={<Globe className="h-4 w-4" />}
                />
                <Input
                  label="Read-only API Key"
                  defaultValue="pk_live_891249120491"
                  disabled
                  leftIcon={<Key className="h-4 w-4" />}
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border/80 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Zap className="size-3.5 text-primary" />
            <span>Unified Component or Dedicated Imports</span>
          </div>
          <p className="text-muted-foreground">
            You can either use the all-in-one <code className="text-primary font-mono bg-surface-subtle px-1 py-0.5 rounded">&lt;Input variant="{inputTab}" /&gt;</code> or import dedicated components directly: <code className="text-primary font-mono bg-surface-subtle px-1 py-0.5 rounded">import &#123; FloatingLabelInput, OtpInput, TagInput &#125; from 'es-react-components'</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TextareaPlayground: React.FC = () => {
  const [rows, setRows] = useState(5);
  const [maxLen, setMaxLen] = useState(250);
  const [showCount, setShowCount] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Textarea Parameter Controls
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Visible Rows"
            value={rows}
            onChange={setRows}
            min={2}
            max={10}
            step={1}
          />
          <ParameterSlider
            label="Max Character Limit"
            value={maxLen}
            onChange={setMaxLen}
            min={100}
            max={500}
            step={50}
          />
          <ParameterSwitch
            label="Show Character Counter"
            checked={showCount}
            onChange={setShowCount}
          />
          <ParameterSwitch
            label="Disabled"
            checked={isDisabled}
            onChange={setIsDisabled}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-lg mx-auto">
          <Textarea
            label="Product Roadmap Summary"
            placeholder="Outline your architectural specifications here..."
            maxLength={maxLen}
            characterCount={showCount}
            rows={rows}
            disabled={isDisabled}
            helperText="Supports markdown formatting and line breaks."
          />
        </div>
      </div>
    </div>
  );
};
