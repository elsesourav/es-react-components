import React, { useState } from 'react';
import {
  Input,
  Textarea,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { Globe, Key, Zap, Sliders } from 'lucide-react';

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
  const [inlineDomain, setInlineDomain] = useState('');
  const checkEmail = (v: string) => {
    if (v.trim() === '') return 'A valid work email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a complete email address (e.g. name@company.com).';
    return null;
  };
  const checkDomain = (v: string) => {
    if (v.trim() === '') return 'Subdomain name is required.';
    if (v.length < 3) return 'Subdomain must be at least 3 characters.';
    return null;
  };
  const [passVal, setPassVal] = useState('SuperSecret!2026');
  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
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
                />
                <Input
                  variant="inline-validation"
                  label="Subdomain Prefix"
                  value={inlineDomain}
                  onChange={setInlineDomain}
                  validate={checkDomain}
                  disabled={inputDisabled}
                  placeholder="acme-corp"
                  hint="Custom subdomains require at least 3 characters."
                />
              </div>
            )}

            {inputTab === 'password' && (
              <div className="space-y-4 animate-in fade-in">
                <Input
                  variant="password"
                  label="Account Master Password"
                  value={passVal}
                  onChange={setPassVal}
                  showStrengthMeter
                  disabled={inputDisabled}
                  hint="Real-time Shannon entropy meter scoring length, symbols, and casing."
                />
              </div>
            )}

            {inputTab === 'otp' && (
              <div className="space-y-4 animate-in fade-in flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Verification Passcode</span>
                <Input
                  variant="otp"
                  length={6}
                  value={otpVal}
                  onChange={setOtpVal}
                  status={otpStatus}
                  disabled={inputDisabled}
                  onComplete={(code) => {
                    if (code === '123456') {
                      setOtpStatus('success');
                      addToast({ title: 'Authentication Verified', type: 'success' });
                    } else {
                      setOtpStatus('error');
                      addToast({ title: 'Invalid PIN', description: 'Try 123456', type: 'error' });
                    }
                  }}
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => { setOtpVal(''); setOtpStatus('idle'); }}
                    className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                  >
                    Reset Code
                  </button>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-primary font-mono">Demo PIN: 123456</span>
                </div>
              </div>
            )}

            {inputTab === 'tag' && (
              <div className="space-y-4 animate-in fade-in">
                <Input
                  variant="tag"
                  label="Deployment Tags"
                  value={tagsVal}
                  onChange={setTagsVal}
                  disabled={inputDisabled}
                  placeholder="Add technology tag..."
                  hint="Press Enter or comma to create a new tag chip."
                />
              </div>
            )}

            {inputTab === 'search' && (
              <div className="space-y-4 animate-in fade-in flex flex-col items-center justify-center p-4">
                <span className="text-xs text-muted-foreground mb-2">Click to expand compact search input</span>
                <div className="w-full flex justify-center">
                  <Input
                    variant="search"
                    placeholder="Search logs & traces..."
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

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Input Parameter Controls
          </span>
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
      {/* 1. Live Interactive Preview (Preview First) */}
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

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
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
    </div>
  );
};
