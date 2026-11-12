import React, { useState } from 'react';
import {
  Dropdown,
  Select,
  Switch,
  Checkbox,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { Globe, Shield, Terminal, Server, Sliders } from 'lucide-react';

export const SelectPlayground: React.FC = () => {
  const [selectVariant, setSelectVariant] = useState<'animated' | 'native'>('animated');
  const [dropdownVal, setDropdownVal] = useState('us-east');
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [showError, setShowError] = useState(false);

  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '24ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-central', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-east', label: 'Asia Pacific (Tokyo)', hint: '112ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

  const htmlSelectOptions = [
    { value: 'developer', label: 'Software Developer (Individual)' },
    { value: 'team', label: 'Engineering Team (5-20 seats)' },
    { value: 'enterprise', label: 'Enterprise Organization (Custom SLA)' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
          <div className="w-full space-y-4">
            {selectVariant === 'animated' ? (
              <div className="space-y-3 animate-in fade-in">
                <Select
                  variant="animated"
                  label="Cloud Infrastructure Region"
                  items={regionItems}
                  value={dropdownVal}
                  onChange={setDropdownVal}
                  disabled={selectDisabled}
                  fullWidth={fullWidth}
                />
                <div className="text-xs text-muted-foreground flex items-center justify-between pt-2">
                  <span>Selected: <strong className="text-primary font-mono">{dropdownVal}</strong></span>
                  <span className="text-[11px] font-mono">Spring sliding indicator</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <Select
                  variant="native"
                  label="Subscription Tier"
                  options={htmlSelectOptions}
                  defaultValue="developer"
                  disabled={selectDisabled}
                  error={showError ? 'Please select a valid paid organization tier.' : undefined}
                  helperText={!showError ? 'Lightweight accessible HTML5 select with clean Tailwind styling.' : undefined}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls After Preview) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Variant & Parameter Controls
          </span>
        </div>

        {/* Variant Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-surface-subtle border border-border">
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-foreground">Select Implementation Variant:</span>
            <p className="text-[11px] text-muted-foreground">
              Choose between custom spring-animated floating dropdown or OS-native HTML5 select.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSelectVariant('animated')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium cursor-pointer ${
                selectVariant === 'animated'
                  ? 'border-primary bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'border-border text-muted-foreground hover:text-foreground bg-surface'
              }`}
            >
              Animated Dropdown
            </button>
            <button
              type="button"
              onClick={() => setSelectVariant('native')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium cursor-pointer ${
                selectVariant === 'native'
                  ? 'border-primary bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'border-border text-muted-foreground hover:text-foreground bg-surface'
              }`}
            >
              Native HTML5
            </button>
          </div>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSwitch
            label="Disabled State"
            checked={selectDisabled}
            onChange={setSelectDisabled}
          />
          {selectVariant === 'animated' ? (
            <ParameterSwitch
              label="Full Width Trigger"
              checked={fullWidth}
              onChange={setFullWidth}
            />
          ) : (
            <ParameterSwitch
              label="Show Error State"
              checked={showError}
              onChange={setShowError}
            />
          )}
        </ParameterGrid>
      </div>
    </div>
  );
};

export const DropdownPlayground = SelectPlayground;

export const SwitchPlayground: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchDisabled, setSwitchDisabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-md mx-auto space-y-5">
          <Switch
            label="Real-time Synchronization"
            description="Broadcast state updates over WebSockets automatically."
            checked={switchChecked}
            disabled={switchDisabled}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
          <Switch
            label="Two-Factor Authentication"
            description="Require authenticator OTP on login from new devices."
            defaultChecked={false}
            disabled={switchDisabled}
          />
          <Switch
            label="Maintenance Mode"
            description="Diverts inbound public requests to the maintenance holding page."
            disabled
          />
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Switch Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="Disabled Switch Option"
            checked={switchDisabled}
            onChange={setSwitchDisabled}
          />
        </ParameterGrid>
      </div>
    </div>
  );
};

export const CheckboxPlayground: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          <Checkbox
            label="Subscribe to Security Advisories"
            description="Get notified immediately about critical CVE patches."
            checked={checkboxChecked}
            disabled={checkboxDisabled}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          <Checkbox
            label="Enable Automated Daily Backups"
            description="Snapshots retained for 30 rolling calendar days."
            defaultChecked
            disabled={checkboxDisabled}
          />
          <Checkbox
            label="Enforce Hardware Security Keys (FIDO2)"
            description="Restricts dashboard access to physical YubiKeys."
            disabled
          />
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Checkbox Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="Disabled Checkbox Option"
            checked={checkboxDisabled}
            onChange={setCheckboxDisabled}
          />
        </ParameterGrid>
      </div>
    </div>
  );
};
