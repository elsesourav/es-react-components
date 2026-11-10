import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Stat,
  LiquidGlassSheet,
  CardCoverFlow,
  CardCarousel,
  Checkbox,
  ParameterSlider,
  ParameterGrid,
  useToast,
} from '@/components/ui';
import { Sparkles, CheckCircle } from 'lucide-react';

export const CardPlayground: React.FC = () => {
  const [cardVariant, setCardVariant] = useState<any>('default');
  const [cardRadius, setCardRadius] = useState(16);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Card Interactive Controls
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Border Radius"
            value={cardRadius}
            onChange={setCardRadius}
            min={0}
            max={28}
            step={2}
            unit="px"
          />
        </ParameterGrid>

        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            Card Style:
          </span>
          {['default', 'elevated', 'glass', 'outline', 'subtle'].map((v) => (
            <button
              key={v}
              onClick={() => setCardVariant(v)}
              className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                cardVariant === v
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div style={{ borderRadius: `${cardRadius}px` }} className="overflow-hidden">
          <Card variant={cardVariant}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="primary" dot size="sm">
                  Live Cluster
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  us-east-1a
                </span>
              </div>
              <CardTitle>Distributed Compute Engine</CardTitle>
              <CardDescription>
                High-throughput, event-driven reactive microservice pool.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs py-1 border-b border-border/40">
                <span className="text-muted-foreground">Health Status</span>
                <span className="text-success font-semibold flex items-center gap-1">
                  <CheckCircle className="size-3" /> Operational
                </span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-muted-foreground">Average Latency</span>
                <span className="font-mono font-semibold text-foreground">
                  14.2 ms
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                View Logs
              </Button>
              <Button variant="primary" size="sm">
                Scale Cluster
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const AvatarPlayground: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-6 py-6">
        <Avatar
          size="xl"
          fallback="SG"
          status="online"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
        />
        <Avatar size="lg" fallback="AC" status="busy" />
        <Avatar size="md" fallback="ES" status="away" />
        <Avatar size="sm" fallback="JD" status="offline" />
        <Avatar size="xs" fallback="AI" />
      </div>
    </div>
  );
};

export const StatPlayground: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat
          label="Total Revenue"
          value="$128,430"
          change="+18.2%"
          trend="up"
          caption="vs previous month"
        />
        <Stat
          label="Active Subscribers"
          value="14,290"
          change="+4.8%"
          trend="up"
          caption="99.4% retention"
        />
        <Stat
          label="P99 Latency"
          value="14.8 ms"
          change="-2.1%"
          trend="down"
          caption="Edge routing"
        />
      </div>
    </div>
  );
};

export const LiquidGlassSheetPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [glassTitle] = useState('Autumn forest');
  const [glassSubtitle] = useState('Liquid glass sheet');
  const [glassTheme, setGlassTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [glassImage, setGlassImage] = useState(
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800'
  );

  const wallpapers = [
    { id: 'forest', name: 'Forest', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800' },
    { id: 'nordic', name: 'Villa', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
    { id: 'tokyo', name: 'Tokyo', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800' },
    { id: 'coast', name: 'Coast', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Liquid Glass Sheet</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Theme:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['auto', 'light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setGlassTheme(t)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all",
                    glassTheme === t
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Backdrop:</span>
            <div className="flex items-center gap-1">
              {wallpapers.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setGlassImage(w.url)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg border text-xs font-medium transition-all",
                    glassImage === w.url
                      ? "bg-primary/15 text-primary border-primary/40 font-semibold"
                      : "bg-surface-subtle/40 border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden">
        <LiquidGlassSheet
          title={glassTitle}
          subtitle={glassSubtitle}
          backgroundImage={glassImage}
          theme={glassTheme}
          defaultOpen={true}
          onShare={() => {
            addToast({
              title: 'Share Triggered',
              description: 'Share sheet dialog invoked successfully.',
              type: 'info',
            });
          }}
          onSaveChange={(saved) => {
            addToast({
              title: saved ? 'Bookmark Saved' : 'Bookmark Removed',
              description: saved ? 'Sheet added to favorites.' : 'Sheet removed from favorites.',
              type: saved ? 'success' : 'info',
            });
          }}
        />
      </div>
    </div>
  );
};

export const CardCoverflowPlayground: React.FC = () => {
  const [coverflowMonochrome, setCoverflowMonochrome] = useState(false);
  const [coverflowIndex, setCoverflowIndex] = useState(2);

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Card CoverFlow Configuration
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            Active Slide: {coverflowIndex + 1} / 5
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Checkbox
            sizeVariant="sm"
            checked={coverflowMonochrome}
            onChange={(e) => setCoverflowMonochrome(e.target.checked)}
            label="Monochrome Slate Style"
          />
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-full max-w-xl">
          <CardCoverFlow
            isMonochrome={coverflowMonochrome}
            initialIndex={coverflowIndex}
            onIndexChange={(idx) => setCoverflowIndex(idx)}
          />
        </div>
      </div>
    </div>
  );
};

export const CardCarouselPlayground: React.FC = () => {
  const [carouselMonochrome, setCarouselMonochrome] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(2);

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Card Carousel Configuration
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            Active Slide: {carouselIndex + 1} / 5
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Checkbox
            sizeVariant="sm"
            checked={carouselMonochrome}
            onChange={(e) => setCarouselMonochrome(e.target.checked)}
            label="Monochrome Slate Style"
          />
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[320px]">
        <div className="w-full max-w-xl">
          <CardCarousel
            isMonochrome={carouselMonochrome}
            initialIndex={carouselIndex}
            onIndexChange={(idx) => setCarouselIndex(idx)}
          />
        </div>
      </div>
    </div>
  );
};
