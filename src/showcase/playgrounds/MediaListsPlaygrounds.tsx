import React, { useState } from 'react';
import {
  Button,
  Badge,
  ReorderList,
  LogoMarquee,
  BlurUpImage,
  ShowMore,
  useToast,
} from '@/components/ui';
import {
  GripVertical,
  Zap,
  Globe,
  Sparkles,
  Rocket,
  Hash,
  Server,
  Layers,
  Tag,
  Play,
  Pause,
  Image as ImageIcon,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export const ReorderListPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [reorderItems, setReorderItems] = useState([
    { id: 'r1', title: 'Edge Routing Ingress Gateway', badge: 'Critical', latency: '8ms' },
    { id: 'r2', title: 'Zero-Trust Identity Verifier', badge: 'High', latency: '14ms' },
    { id: 'r3', title: 'Distributed Cache Invalidation', badge: 'Normal', latency: '28ms' },
    { id: 'r4', title: 'Prometheus Telemetry Collector', badge: 'Low', latency: '42ms' },
  ]);

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
        <div className="w-full max-w-lg space-y-3">
          <ReorderList
            label="Ingress Pipeline Tasks"
            items={reorderItems}
            getId={(item) => item.id}
            getLabel={(item) => item.title}
            onReorder={setReorderItems}
            onCommit={(items) => {
              addToast({
                title: 'Order Updated',
                description: `New top task: ${items[0]?.title}`,
                type: 'success',
              });
            }}
          >
            {(item) => (
              <div className="flex items-center justify-between w-full">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{item.title}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">Ping: {item.latency}</div>
                </div>
                <Badge
                  variant={item.badge === 'Critical' ? 'danger' : item.badge === 'High' ? 'warning' : 'outline'}
                  size="sm"
                >
                  {item.badge}
                </Badge>
              </div>
            )}
          </ReorderList>

          <p className="text-center text-xs text-muted-foreground">
            Drag items with mouse/touch, or press Space/Enter on a row and use Up/Down arrows to move.
          </p>
        </div>
      </div>
<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="text-xs text-muted-foreground">
          Sort Priority: <span className="text-foreground font-semibold">Top item has highest execution precedence</span>
        </div>

        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setReorderItems([
              { id: 'r1', title: 'Edge Routing Ingress Gateway', badge: 'Critical', latency: '8ms' },
              { id: 'r2', title: 'Zero-Trust Identity Verifier', badge: 'High', latency: '14ms' },
              { id: 'r3', title: 'Distributed Cache Invalidation', badge: 'Normal', latency: '28ms' },
              { id: 'r4', title: 'Prometheus Telemetry Collector', badge: 'Low', latency: '42ms' },
            ]);
            addToast({ title: 'List Reset', description: 'Restored default routing order.', type: 'info' });
          }}
        >
          Reset Order
        </Button>
      </div>

          </div>
  );
};

export const LogoMarqueePlayground: React.FC = () => {
  const { addToast } = useToast();
  const [marqueeSpeed, setMarqueeSpeed] = useState(44);
  const [marqueeDirection, setMarqueeDirection] = useState<'left' | 'right'>('left');
  const [marqueePaused, setMarqueePaused] = useState(false);

  const brands = [
    { id: 'react', label: 'React 19', mark: <Zap className="size-4 text-cyan-400" /> },
    { id: 'next', label: 'Next.js 15', mark: <Globe className="size-4 text-foreground" /> },
    { id: 'tailwind', label: 'Tailwind CSS', mark: <Sparkles className="size-4 text-sky-400" /> },
    { id: 'motion', label: 'Motion React', mark: <Rocket className="size-4 text-purple-400" /> },
    { id: 'ts', label: 'TypeScript 5.7', mark: <Hash className="size-4 text-blue-400" /> },
    { id: 'vite', label: 'Vite 6', mark: <Server className="size-4 text-amber-400" /> },
    { id: 'radix', label: 'Radix Primitives', mark: <Layers className="size-4 text-emerald-400" /> },
    { id: 'lucide', label: 'Lucide Icons', mark: <Tag className="size-4 text-rose-400" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1">
          <h3 className="text-sm font-semibold text-foreground">Supported Enterprise Platforms</h3>
          <p className="text-xs text-muted-foreground">
            Hover to halt scrolling. Click any pill to trigger callback. Focus with Tab to automatically center item.
          </p>
        </div>

        <LogoMarquee
          items={brands}
          speed={marqueeSpeed}
          direction={marqueeDirection}
          paused={marqueePaused}
          gap={24}
          onSelect={(b) => {
            addToast({ title: 'Brand Selected', description: `Interacted with: ${b.label}`, type: 'info' });
          }}
        />
      </div>
<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-foreground">Speed:</span>
          {[24, 44, 72].map((s) => (
            <Button
              key={s}
              size="xs"
              variant={marqueeSpeed === s ? 'primary' : 'outline'}
              onClick={() => setMarqueeSpeed(s)}
            >
              {s} px/s
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="outline"
            onClick={() => setMarqueeDirection((d) => (d === 'left' ? 'right' : 'left'))}
          >
            Dir: {marqueeDirection === 'left' ? '← Left' : '→ Right'}
          </Button>
          <Button
            size="xs"
            variant={marqueePaused ? 'primary' : 'outline'}
            onClick={() => setMarqueePaused((p) => !p)}
          >
            {marqueePaused ? <Play className="size-3.5 mr-1" /> : <Pause className="size-3.5 mr-1" />}
            {marqueePaused ? 'Resume' : 'Pause'}
          </Button>
        </div>
      </div>

          </div>
  );
};

export const BlurUpImagePlayground: React.FC = () => {
  const { addToast } = useToast();
  const [blurUpKey, setBlurUpKey] = useState(0);
  const [blurUpError, setBlurUpError] = useState(false);

  const sampleSrc = blurUpError
    ? 'https://invalid-broken-domain-url-404.jpg'
    : `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80&r=${blurUpKey}`;
  const placeholder = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=32&q=20';

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-lg space-y-3">
          <div className="overflow-hidden rounded-2xl border border-border shadow-md">
            <BlurUpImage
              key={`${blurUpKey}-${blurUpError}`}
              src={sampleSrc}
              placeholder={placeholder}
              alt="Colorful abstract gradient mesh"
              width={16}
              height={9}
              blur={16}
              onReady={() => {
                addToast({ title: 'Image Decoded', description: 'Progressive spring unblur completed.', type: 'success' });
              }}
              onError={() => {
                addToast({ title: 'Decode Failed', description: 'Gracefully rendered fallback state.', type: 'error' });
              }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Loads low-resolution micro-thumbnail first, waits for browser async image decoding, then gracefully unblurs and saturates into focus.
          </p>
        </div>
      </div>
<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">
            Status: <span className="font-semibold text-primary">{blurUpError ? 'Simulating Error Fallback' : 'Active Decode Loader'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant={blurUpError ? 'danger' : 'outline'}
            onClick={() => {
              setBlurUpError((err) => !err);
              setBlurUpKey((k) => k + 1);
            }}
          >
            {blurUpError ? 'Restore Normal Image' : 'Simulate Error'}
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setBlurUpKey((k) => k + 1);
              addToast({ title: 'Image Reloaded', description: 'Re-triggered progressive decode unblur', type: 'info' });
            }}
          >
            <RotateCcw className="size-3.5 mr-1" />
            Reload
          </Button>
        </div>
      </div>

          </div>
  );
};

export const ShowMorePlayground: React.FC = () => {
  const { addToast } = useToast();
  const [showMoreExpanded, setShowMoreExpanded] = useState(false);
  const [showMoreLines, setShowMoreLines] = useState(3);

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
        <div className="w-full max-w-xl p-6 rounded-2xl bg-surface border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Global Data Residency & Compliance Policy</h3>
          </div>

          <ShowMore
            lines={showMoreLines}
            maxHeight={340}
            expanded={showMoreExpanded}
            onExpandedChange={(exp) => {
              setShowMoreExpanded(exp);
              addToast({
                title: exp ? 'Disclosed Content' : 'Collapsed Content',
                description: `Section ${exp ? 'expanded to full height' : `clamped to ${showMoreLines} lines`}`,
                type: 'info',
              });
            }}
            moreLabel="Read Full Compliance Terms"
            lessLabel="Show Fewer Lines"
          >
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
              <p>
                All customer telemetry data, session storage tokens, and encryption payloads are segregated
                across isolated sovereign compute zones. Primary relational replicas are deployed across
                multi-AZ Frankfurt (eu-central-1), Northern Virginia (us-east-1), and Tokyo (ap-northeast-1)
                clusters with automated synchronous mTLS cross-region failover.
              </p>
              <p>
                Zero-trust identity verification is strictly enforced on every internal RPC boundary using
                ephemeral SPIFFE/SPIRE X.509 certificates rotated every 60 minutes. Encryption at rest is
                secured using FIPS 140-3 Level 3 Hardware Security Modules (HSMs) with customer-managed keys (BYOK).
              </p>
              <p>
                Audit logs are immutably streamed to append-only tamper-evident cold storage with WORM (Write Once,
                Read Many) retention locks conforming to SOC 2 Type II, ISO 27001, and HIPAA compliance specifications.
              </p>
              <p>
                Third-party vulnerability assessments and continuous red-team pen testing reports are published
                quarterly in the customer trust portal with real-time SOC incident telemetry feeds.
              </p>
            </div>
          </ShowMore>
        </div>
      </div>
<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-foreground">Collapsed Lines:</span>
          {[2, 3, 5].map((l) => (
            <Button
              key={l}
              size="xs"
              variant={showMoreLines === l ? 'primary' : 'outline'}
              onClick={() => setShowMoreLines(l)}
            >
              {l} Lines
            </Button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Status: <span className="font-semibold text-foreground">{showMoreExpanded ? 'Expanded' : 'Clamped'}</span>
        </div>
      </div>

          </div>
  );
};
