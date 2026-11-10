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
import { Server, Globe } from 'lucide-react';

export const DropdownPlayground: React.FC = () => {
  const [dropdownVal, setDropdownVal] = useState('us-east');
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [dropdownFullWidth, setDropdownFullWidth] = useState(true);
  const [bottomPlacementDemo, setBottomPlacementDemo] = useState(false);

  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-tokyo', label: 'Asia Pacific (Tokyo)', hint: '124ms', icon: <Globe className="size-4" /> },
    { value: 'ap-singapore', label: 'Asia Pacific (Singapore)', hint: '110ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Dropdown Controls
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSwitch
            label="Full Width"
            checked={dropdownFullWidth}
            onChange={setDropdownFullWidth}
          />
          <ParameterSwitch
            label="Disabled State"
            checked={dropdownDisabled}
            onChange={setDropdownDisabled}
          />
          <ParameterSwitch
            label="Test Flip Up (Collision)"
            checked={bottomPlacementDemo}
            onChange={setBottomPlacementDemo}
          />
        </ParameterGrid>
      </div>

      <div
        className={`p-6 rounded-2xl bg-surface border border-border space-y-6 transition-all duration-300 ${
          bottomPlacementDemo ? 'pt-[420px]' : ''
        }`}
      >
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <Dropdown
              label="Select Active Deployment Zone"
              items={regionItems}
              value={dropdownVal}
              onChange={setDropdownVal}
              disabled={dropdownDisabled}
              fullWidth={dropdownFullWidth}
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-2 font-mono">
            <div className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
              Active Selection & Collision Diagnostics:
            </div>
            <div className="flex items-center justify-between">
              <span>Value: <strong className="text-primary">{dropdownVal}</strong></span>
              <span className="text-muted-foreground">Portaled fixed collision</span>
            </div>
            <p className="text-muted-foreground font-sans text-xs">
              Automatically flips upward if bottom space is &lt; 220px, viewport clamped on mobile, portaled into body with spring physics!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SelectPlayground: React.FC = () => {
  const [selectTab, setSelectTab] = useState<'animated' | 'native'>('animated');
  const [dropdownVal, setDropdownVal] = useState('us-east');
  const [nativeSelectVal, setNativeSelectVal] = useState('us-east-1');
  const [selectDelay, setSelectDelay] = useState(600);
  const [selectDisabled, setSelectDisabled] = useState(false);

  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-tokyo', label: 'Asia Pacific (Tokyo)', hint: '124ms', icon: <Globe className="size-4" /> },
    { value: 'ap-singapore', label: 'Asia Pacific (Singapore)', hint: '110ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Component Type:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectTab('animated')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium cursor-pointer ${
                selectTab === 'animated'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Spring Dropdown (Animated)
            </button>
            <button
              onClick={() => setSelectTab('native')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium cursor-pointer ${
                selectTab === 'native'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Native HTML5 Select
            </button>
          </div>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Typeahead Delay"
            value={selectDelay}
            onChange={setSelectDelay}
            min={200}
            max={1500}
            step={50}
            unit="ms"
          />
          <ParameterSwitch
            label="Disabled State"
            checked={selectDisabled}
            onChange={setSelectDisabled}
          />
        </ParameterGrid>

        <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
          <div className="w-full space-y-4">
            {selectTab === 'animated' ? (
              <div className="space-y-3 animate-in fade-in">
                <Dropdown
                  label="Cloud Infrastructure Region"
                  items={regionItems}
                  value={dropdownVal}
                  onChange={setDropdownVal}
                  disabled={selectDisabled}
                  fullWidth
                />
                <div className="text-xs text-muted-foreground flex items-center justify-between pt-2">
                  <span>Selected: <strong className="text-primary font-mono">{dropdownVal}</strong></span>
                  <span className="text-[11px] font-mono">Sliding pill indicator</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <Select
                  label="Production Hosting Region"
                  helperText="Standard browser select dropdown for simple lightweight forms."
                  value={nativeSelectVal}
                  disabled={selectDisabled}
                  onChange={(e: any) => setNativeSelectVal(e.target.value)}
                  options={[
                    { label: 'US East (N. Virginia)', value: 'us-east-1' },
                    { label: 'Europe Central (Frankfurt)', value: 'eu-central-1' },
                    { label: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1' },
                    { label: 'South America (São Paulo)', value: 'sa-east-1' },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SwitchPlayground: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchDisabled, setSwitchDisabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
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
    </div>
  );
};

export const CheckboxPlayground: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
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
            label="Strict Content Security Policy (CSP)"
            description="Disallows inline script tags and remote unsafe evaluations."
            disabled
          />
        </div>
      </div>
    </div>
  );
};
