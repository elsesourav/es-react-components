import React, { useState, useRef } from 'react';
import {
  StickyHeader,
  ReadingProgress,
  ScrollSpy,
  HideOnScroll,
  Button,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { ScrollText, BookmarkCheck, Navigation2, EyeOff, Rocket } from 'lucide-react';

export const StickyHeaderPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [stickyExpandedH, setStickyExpandedH] = useState(68);
  const [stickyCompactH, setStickyCompactH] = useState(48);
  const [stickyMaxH, setStickyMaxH] = useState(320);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <ScrollText className="size-4 text-primary" />
          Sticky Header Range Slider & Height Controls
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Expanded Height"
            value={stickyExpandedH}
            onChange={setStickyExpandedH}
            min={56}
            max={96}
            step={4}
            unit="px"
          />
          <ParameterSlider
            label="Compact Height"
            value={stickyCompactH}
            onChange={setStickyCompactH}
            min={36}
            max={60}
            step={4}
            unit="px"
          />
          <ParameterSlider
            label="Max Container Height"
            value={stickyMaxH}
            onChange={setStickyMaxH}
            min={220}
            max={450}
            step={20}
            unit="px"
          />
        </ParameterGrid>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          <StickyHeader
            title="Deployment Pipelines"
            subtitle="3 active production clusters in us-east-1 and eu-central-1"
            expandedHeight={stickyExpandedH}
            compactHeight={stickyCompactH}
            maxHeight={stickyMaxH}
            leading={<Rocket className="size-4 text-primary" />}
            actions={
              <Button size="xs" variant="primary" onClick={() => addToast({ title: 'Deploy Triggered', description: 'Queued rollout to edge nodes.', type: 'info' })}>
                Rollout
              </Button>
            }
          >
            <div className="p-4 space-y-3">
              {[
                { name: 'api-gateway', status: 'Healthy', version: 'v2.14.0', uptime: '99.99%', latency: '24ms' },
                { name: 'auth-service', status: 'Healthy', version: 'v3.1.2', uptime: '100.0%', latency: '12ms' },
                { name: 'billing-worker', status: 'Syncing', version: 'v1.8.6', uptime: '99.95%', latency: '65ms' },
                { name: 'event-streaming', status: 'Healthy', version: 'v4.0.0', uptime: '99.98%', latency: '18ms' },
                { name: 'search-indexer', status: 'Healthy', version: 'v2.9.1', uptime: '99.91%', latency: '42ms' },
                { name: 'recommendation-engine', status: 'Healthy', version: 'v1.4.3', uptime: '99.89%', latency: '54ms' },
                { name: 'notification-router', status: 'Healthy', version: 'v2.0.7', uptime: '100.0%', latency: '15ms' },
                { name: 'analytics-pipeline', status: 'Healthy', version: 'v5.2.0', uptime: '99.97%', latency: '38ms' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-foreground">{item.name}</div>
                    <div className="text-[11px] text-muted-foreground">{item.version} · {item.uptime} uptime</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{item.latency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.status === 'Healthy' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </StickyHeader>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Scroll the container above to test spring-interpolated title condensing and header border reveal.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ReadingProgressPlayground: React.FC = () => {
  const readingScrollerRef = useRef<HTMLDivElement>(null);
  const [readingWords, setReadingWords] = useState(1400);
  const [readingWpm, setReadingWpm] = useState(220);
  const [containerHeight, setContainerHeight] = useState(260);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <BookmarkCheck className="size-4 text-primary" />
          Reading Progress Benchmark & Parameters
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Word Count"
            value={readingWords}
            onChange={setReadingWords}
            min={600}
            max={3600}
            step={200}
            unit=" words"
          />
          <ParameterSlider
            label="Reading WPM"
            value={readingWpm}
            onChange={setReadingWpm}
            min={160}
            max={320}
            step={20}
            unit=" wpm"
          />
          <ParameterSlider
            label="Container Height"
            value={containerHeight}
            onChange={setContainerHeight}
            min={180}
            max={380}
            step={20}
            unit="px"
          />
        </ParameterGrid>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-xl rounded-[var(--radius)] border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
          <ReadingProgress
            scroller={readingScrollerRef}
            words={readingWords}
            wordsPerMinute={readingWpm}
            label="Design System Article"
            doneLabel="Completed"
          />

          <div
            ref={readingScrollerRef}
            style={{ height: `${containerHeight}px` }}
            className="overflow-y-auto overscroll-contain pr-2 space-y-3.5 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3"
          >
            <h3 className="text-sm font-semibold text-foreground">1. Dynamic Design Token Architecture</h3>
            <p>
              Modern component architectures require fluid theming without coupling to a single global stylesheet.
              In es-react-components, every visual primitive reads from raw HSL CSS variables, allowing real-time
              color space transformations across dark, light, high-contrast, and custom user palettes.
            </p>
            <h3 className="text-sm font-semibold text-foreground">2. Spring Physics & Performance</h3>
            <p>
              Unlike CSS keyframe transitions that lock into fixed durations regardless of gesture velocity,
              spring-based physics calculate acceleration and damping dynamically. This ensures that rapid scroll
              flicks decelerate naturally while honoring reduced-motion preferences when requested.
            </p>
            <h3 className="text-sm font-semibold text-foreground">3. Accessibility as a First-Class Citizen</h3>
            <p>
              Screen reader users benefit from live aria-valuetext updates and landmark navigation tags.
              All progress meters expose standard progressbar roles with min, max, and current numeric attributes.
            </p>
            <h3 className="text-sm font-semibold text-foreground">4. Edge Distribution & Zero Layout Shift</h3>
            <p>
              By reserving layout height with scroll padding and placeholder geometry, containers avoid
              cumulative layout shift (CLS) when sticky headers condense or expanding menus open.
            </p>
            <div className="p-3 rounded-lg bg-surface-subtle border border-border text-center font-medium text-foreground">
              🎉 You have reached the end of the article!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScrollSpyPlayground: React.FC = () => {
  const scrollSpyRootRef = useRef<HTMLDivElement>(null);
  const [scrollSpyActive, setScrollSpyActive] = useState('section-1');
  const [spyOffset, setSpyOffset] = useState(40);
  const [spyHeight, setSpyHeight] = useState(288);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <Navigation2 className="size-4 text-primary" />
          Scroll Spy Parameters
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Scroll Spy Offset"
            value={spyOffset}
            onChange={setSpyOffset}
            min={20}
            max={80}
            step={5}
            unit="px"
          />
          <ParameterSlider
            label="Viewport Height"
            value={spyHeight}
            onChange={setSpyHeight}
            min={200}
            max={400}
            step={20}
            unit="px"
          />
        </ParameterGrid>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-xl space-y-4">
          <ScrollSpy
            root={scrollSpyRootRef}
            offset={spyOffset}
            onChange={setScrollSpyActive}
            sections={[
              { id: 'spy-overview', label: 'Overview' },
              { id: 'spy-architecture', label: 'Architecture' },
              { id: 'spy-security', label: 'Security' },
              { id: 'spy-benchmarks', label: 'Benchmarks' },
            ]}
          />

          <div
            ref={scrollSpyRootRef}
            style={{ height: `${spyHeight}px` }}
            className="overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-surface-elevated p-5 space-y-8 scroll-smooth"
          >
            <section id="spy-overview" className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">01</span>
                <h4 className="font-semibold text-foreground text-sm">System Overview</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The design system powers mission-critical edge dashboards and real-time developer workflows.
                Components are fully decoupled and export type-safe React 19 primitives with zero external stylesheet dependencies.
              </p>
            </section>

            <section id="spy-architecture" className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">02</span>
                <h4 className="font-semibold text-foreground text-sm">Layered Architecture</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Built atop modern CSS custom properties and Motion React. All components isolate side-effects
                and utilize ResizeObserver observers for precise layout geometry and responsive adaptations.
              </p>
            </section>

            <section id="spy-security" className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">03</span>
                <h4 className="font-semibold text-foreground text-sm">Zero-Trust Security</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Includes strict Content Security Policy (CSP) compatibility, sanitization hooks for rich markup,
                and automatic focus-trapping overlays with inert containment for modal dialogs.
              </p>
            </section>

            <section id="spy-benchmarks" className="space-y-2 pb-6">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">04</span>
                <h4 className="font-semibold text-foreground text-sm">Performance Benchmarks</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sub-millisecond input response time, sub-5kb bundle footprints per component, and 60fps hardware-accelerated
                compositor transitions even during high-frequency gesture scrolling.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HideOnScrollPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [hidePinned, setHidePinned] = useState(false);
  const [hideIsHidden, setHideIsHidden] = useState(false);
  const [hideBarHeight, setHideBarHeight] = useState(44);
  const [hideMaxHeight, setHideMaxHeight] = useState(320);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <EyeOff className="size-4 text-primary" />
          Hide On Scroll Range Slider & Controls
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Top Bar Height"
            value={hideBarHeight}
            onChange={setHideBarHeight}
            min={36}
            max={64}
            step={4}
            unit="px"
          />
          <ParameterSlider
            label="Feed Max Height"
            value={hideMaxHeight}
            onChange={setHideMaxHeight}
            min={220}
            max={450}
            step={20}
            unit="px"
          />
          <ParameterSwitch
            label="Pinned (Always Visible)"
            checked={hidePinned}
            onChange={setHidePinned}
          />
        </ParameterGrid>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          <HideOnScroll
            pinned={hidePinned}
            onHiddenChange={setHideIsHidden}
            barHeight={hideBarHeight}
            maxHeight={hideMaxHeight}
            bar={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">Active Feed Monitor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button size="xs" variant="outline" onClick={() => addToast({ title: 'Exported Feed', description: 'Downloaded telemetry logs.', type: 'info' })}>
                    Export
                  </Button>
                  <Button size="xs" variant="primary" onClick={() => addToast({ title: 'Refreshed Feed', description: 'Latest telemetry synchronized.', type: 'success' })}>
                    Sync
                  </Button>
                </div>
              </div>
            }
          >
            <div className="p-4 space-y-3">
              {[
                { id: 'EVT-101', type: 'Ingress Auth', time: '10:41:02', desc: 'mTLS handshake verified for node us-east-1a' },
                { id: 'EVT-102', type: 'Deploy Gate', time: '10:41:15', desc: 'Container image signature verified with cosign' },
                { id: 'EVT-103', type: 'Health Probe', time: '10:41:30', desc: 'Liveness check passed across all 12 worker replicas' },
                { id: 'EVT-104', type: 'Traffic Split', time: '10:41:48', desc: 'Canary weight increased from 10% to 25%' },
                { id: 'EVT-105', type: 'Cache Invalidate', time: '10:42:01', desc: 'Purged edge cache tags for customer portal' },
                { id: 'EVT-106', type: 'Database Backup', time: '10:42:19', desc: 'Incremental snapshot completed in 4.2 seconds' },
                { id: 'EVT-107', type: 'Rate Limit', time: '10:42:35', desc: 'Throttled 14 requests exceeding 1,000 req/sec threshold' },
                { id: 'EVT-108', type: 'Telemetry Sync', time: '10:42:50', desc: 'Exported OpenTelemetry metrics to Prometheus collector' },
              ].map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-surface border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-primary font-semibold">{item.id}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">{item.time}</span>
                  </div>
                  <div className="font-medium text-foreground">{item.type}</div>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </HideOnScroll>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Scroll down inside the feed to hide the top bar; scroll up slightly to reveal it instantly.
          </p>
        </div>
      </div>
    </div>
  );
};
