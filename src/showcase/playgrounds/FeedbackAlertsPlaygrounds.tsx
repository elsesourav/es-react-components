import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Alert,
  Spinner,
  Skeleton,
  CollapsibleBanner,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
  useToast,
} from '@/components/ui';
import { ShieldCheck } from 'lucide-react';

export { ToastPlayground } from './ToastPlayground';

export const DialogPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRadius, setDialogRadius] = useState(16);
  const [showChecklist, setShowChecklist] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Dialog Parameter Controls
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Corner Radius"
            value={dialogRadius}
            onChange={setDialogRadius}
            min={0}
            max={28}
            step={2}
            unit="px"
          />
          <ParameterSwitch
            label="Show Verification Checklist"
            checked={showChecklist}
            onChange={setShowChecklist}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[200px] gap-4">
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          Open Modal Dialog
        </Button>
        <Dialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Deploy Production Release"
          description="You are about to roll out tag v2.4.0 to 18 worldwide edge locations."
        >
          <div className="space-y-4 py-2">
            {showChecklist && (
              <div
                style={{ borderRadius: `${dialogRadius}px` }}
                className="p-3.5 bg-surface-subtle border border-border/80 text-xs space-y-1 transition-all"
              >
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" /> Verification Checklist
                </div>
                <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                  <li>Automated e2e regression suite passed (412 tests)</li>
                  <li>Zero database migration schema conflicts</li>
                  <li>Zero-downtime rolling deployment enabled</li>
                </ul>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setDialogOpen(false);
                  addToast({
                    title: 'Deployment Initiated',
                    description: 'Rolling build v2.4.0 to edge cluster.',
                    type: 'success',
                  });
                }}
              >
                Confirm Release
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export const AlertPlayground: React.FC = () => {
  const [alertVariant, setAlertVariant] = useState<'info' | 'success' | 'warning' | 'danger'>('info');
  const [showAlert, setShowAlert] = useState(true);
  const [alertRadius, setAlertRadius] = useState(12);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Alert Parameter Controls
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Corner Radius"
            value={alertRadius}
            onChange={setAlertRadius}
            min={0}
            max={24}
            step={2}
            unit="px"
          />
          <ParameterSwitch
            label="Show Alert"
            checked={showAlert}
            onChange={setShowAlert}
          />
        </ParameterGrid>

        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <span className="text-xs font-medium text-muted-foreground mr-2">Variant:</span>
          {(['info', 'success', 'warning', 'danger'] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setAlertVariant(v);
                setShowAlert(true);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                alertVariant === v
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {showAlert ? (
          <div style={{ borderRadius: `${alertRadius}px` }} className="overflow-hidden">
            <Alert
              variant={alertVariant}
              title={`${alertVariant.toUpperCase()} Alert Box`}
              onDismiss={() => setShowAlert(false)}
            >
              Reactive notifications styled with HSL status tokens. Supports inline dismiss controls.
            </Alert>
          </div>
        ) : (
          <div className="text-center py-4">
            <Button variant="outline" size="sm" onClick={() => setShowAlert(true)}>
              Restore Dismissed Alert
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SpinnerPlayground: React.FC = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [spinnerScale, setSpinnerScale] = useState(100);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Spinner & Shimmer Controls
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Scale / Zoom"
            value={spinnerScale}
            onChange={setSpinnerScale}
            min={60}
            max={180}
            step={10}
            unit="%"
          />
          <ParameterSwitch
            label="Show Skeletons"
            checked={showSkeleton}
            onChange={setShowSkeleton}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-8">
        <div
          style={{ transform: `scale(${spinnerScale / 100})`, transformOrigin: 'center' }}
          className="flex flex-wrap items-center justify-center gap-8 py-4 transition-transform"
        >
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>

        {showSkeleton && (
          <div className="max-w-md mx-auto space-y-3 pt-4 border-t border-border">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Skeleton Pulse Shimmer
            </span>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
      </div>
    </div>
  );
};

export const CollapsibleBannerPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [bannerVar, setBannerVar] = useState<'warning' | 'destructive' | 'info' | 'success'>('warning');
  const [bannerRadius, setBannerRadius] = useState(12);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Banner Variant:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['warning', 'destructive', 'info', 'success', 'default'].map((v) => (
            <button
              key={v}
              onClick={() => setBannerVar(v as any)}
              className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                bannerVar === v
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <ParameterGrid columns={2}>
        <ParameterSlider
          label="Border Radius"
          value={bannerRadius}
          onChange={setBannerRadius}
          min={0}
          max={24}
          step={2}
          unit="px"
        />
      </ParameterGrid>

      <div style={{ borderRadius: `${bannerRadius}px` }} className="max-w-md mx-auto space-y-3 overflow-hidden">
        <CollapsibleBanner
          variant={bannerVar}
          title={
            bannerVar === 'destructive'
              ? 'Your card was declined'
              : bannerVar === 'warning'
                ? 'Payments are degraded'
                : bannerVar === 'success'
                  ? 'Security compliance verified'
                  : 'Scheduled maintenance notification'
          }
          description={
            bannerVar === 'destructive'
              ? 'We retry automatically on the 14th. Invoices stay open until it clears.'
              : 'Charges are queued and settle automatically once the upstream payment provider recovers.'
          }
          action={
            <button
              type="button"
              onClick={() =>
                addToast({
                  title: 'Action Triggered',
                  description: 'Opening settings dialog.',
                  type: 'info',
                })
              }
              className="px-2.5 py-1 rounded-[var(--radius)] border border-border bg-surface text-foreground font-medium text-[11px] hover:border-primary/50 transition-colors cursor-pointer"
            >
              Update Details
            </button>
          }
        />
      </div>
    </div>
  );
};
