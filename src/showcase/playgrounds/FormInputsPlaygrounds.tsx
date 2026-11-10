import React, { useState } from 'react';
import {
  FloatingLabelInput,
  OtpInput,
  TagInput,
  PasswordInput,
  ExpandingSearch,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';

export const FloatingInputPlayground: React.FC = () => {
  const [floatEmail, setFloatEmail] = useState('alex.chen@acme.corp');
  const [floatRef, setFloatRef] = useState('INV-2026-9041');
  const [floatTouched, setFloatTouched] = useState(false);
  const [isRequired, setIsRequired] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const isFloatBad = floatTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(floatEmail);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Floating Input Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="Required Field"
            checked={isRequired}
            onChange={setIsRequired}
          />
          <ParameterSwitch
            label="Disabled"
            checked={isDisabled}
            onChange={setIsDisabled}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-5">
          <FloatingLabelInput
            label="Work Email Address"
            type="email"
            value={floatEmail}
            onChange={setFloatEmail}
            onBlur={() => setFloatTouched(true)}
            invalid={isFloatBad}
            disabled={isDisabled}
            hint={isFloatBad ? "Needs to look like name@company.com" : "Official business receipts are sent here."}
            required={isRequired}
          />

          <FloatingLabelInput
            label="Invoice Reference ID"
            value={floatRef}
            onChange={setFloatRef}
            maxLength={18}
            disabled={isDisabled}
            hint="Printed directly on the quarterly statement header."
          />

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-1.5 font-mono">
            <div className="text-muted-foreground font-semibold">Live State:</div>
            <div>email: <span className="text-primary">{floatEmail || '(empty)'}</span></div>
            <div>reference: <span className="text-primary">{floatRef}</span></div>
            <div>invalid: <span className={isFloatBad ? "text-destructive" : "text-success"}>{String(isFloatBad)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OtpInputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [otpLength, setOtpLength] = useState(6);
  const [otpDisabled, setOtpDisabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            OTP Range & Action Controls
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOtpStatus(otpStatus === 'error' ? 'idle' : 'error');
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                otpStatus === 'error'
                  ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {otpStatus === 'error' ? 'Clear Error' : 'Simulate Rejection'}
            </button>
            <button
              onClick={() => {
                setOtpVal('');
                setOtpStatus('idle');
              }}
              className="px-3 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Digit Count / Length"
            value={otpLength}
            onChange={(l) => {
              setOtpLength(l);
              setOtpVal('');
            }}
            min={4}
            max={8}
            step={1}
            unit=" digits"
          />
          <ParameterSwitch
            label="Disabled State"
            checked={otpDisabled}
            onChange={setOtpDisabled}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6 space-y-4">
          <p className="text-sm font-medium text-foreground text-center">
            Enter {otpLength}-digit confirmation code
          </p>
          <OtpInput
            key={otpLength}
            length={otpLength}
            value={otpVal}
            disabled={otpDisabled}
            onChange={(code) => {
              setOtpVal(code);
              if (otpStatus === 'error') setOtpStatus('idle');
            }}
            status={otpStatus}
            errorMessage="That authentication code is incorrect. Please verify."
            hint="Tip: You can paste all digits into any cell."
            onComplete={(fullCode) => {
              addToast({
                title: 'Code Verified!',
                description: `Received full OTP: ${fullCode}`,
                type: 'success',
              });
            }}
          />

          <div className="text-xs text-muted-foreground font-mono mt-2">
            Entered: <span className="text-primary font-bold">{otpVal || '—'}</span> (length: {otpVal.length}/{otpLength})
          </div>
        </div>
      </div>
    </div>
  );
};

export const TagInputPlayground: React.FC = () => {
  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);
  const [maxTags, setMaxTags] = useState(8);
  const [tagDisabled, setTagDisabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tag Input Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Max Tags Allowed"
            value={maxTags}
            onChange={setMaxTags}
            min={4}
            max={16}
            step={2}
          />
          <ParameterSwitch
            label="Disabled State"
            checked={tagDisabled}
            onChange={setTagDisabled}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-4">
          <TagInput
            label="Repository Topics"
            value={tagsVal}
            onChange={setTagsVal}
            max={maxTags}
            disabled={tagDisabled}
            separators={[',', ';']}
            validate={(tag) => tag.length <= 20}
            hint="Press Enter or comma (,) to add · Backspace highlights then removes"
          />

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-1 font-mono">
            <span className="text-muted-foreground font-semibold">Active Tag Tokens ({tagsVal.length}/{maxTags}):</span>
            <div className="text-primary truncate">{JSON.stringify(tagsVal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PasswordInputPlayground: React.FC = () => {
  const [passVal, setPassVal] = useState('SuperSecret!2026');
  const [passReqs, setPassReqs] = useState(true);
  const [passMeter, setPassMeter] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password Input Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="Show Strength Meter"
            checked={passMeter}
            onChange={setPassMeter}
          />
          <ParameterSwitch
            label="Show Requirements Checklist"
            checked={passReqs}
            onChange={setPassReqs}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-4">
          <PasswordInput
            label="Master Password"
            value={passVal}
            onChange={setPassVal}
            showStrengthMeter={passMeter}
            showRequirements={passReqs}
            placeholder="Type your secure password..."
          />
        </div>
      </div>
    </div>
  );
};

export const ExpandingSearchPlayground: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [showBadge, setShowBadge] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Expanding Search Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="Show Results Count Badge"
            checked={showBadge}
            onChange={setShowBadge}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/50 border border-border/60 flex flex-col items-center gap-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Collapsible Spring Search Bar:
            </span>
            <span className="text-xs font-mono text-muted-foreground">Click icon to expand</span>
          </div>

          <div className="w-full flex justify-end">
            <ExpandingSearch
              label="Global Search"
              placeholder="Search components, APIs, tokens..."
              value={searchVal}
              onChange={setSearchVal}
              resultCount={showBadge && searchVal ? 8 : undefined}
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px]">Esc</kbd> to clear query or collapse back to the trigger icon.
          </p>
        </div>
      </div>
    </div>
  );
};
