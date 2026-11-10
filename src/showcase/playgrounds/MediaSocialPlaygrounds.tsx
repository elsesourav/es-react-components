import React, { useState } from 'react';
import {
  Button,
  Badge,
  PresenceAvatars,
  Accordion,
  FilterGrid,
  PollResults,
  useToast,
} from '@/components/ui';
import { ListTree, Vote } from 'lucide-react';

export const PresenceAvatarsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [presenceSlots, setPresenceSlots] = useState(4);
  const presencePeople = [
    { id: '1', name: 'Elena Rostova', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80' },
    { id: '2', name: 'Marcus Sterling', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80' },
    { id: '3', name: 'Devin Vance' },
    { id: '4', name: 'Sarah Connor', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80' },
    { id: '5', name: 'Kenji Sato' },
    { id: '6', name: 'Alex Rivera' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Max Visible Slots: {presenceSlots}
        </span>
        <div className="flex items-center gap-1.5">
          {[2, 3, 4, 5, 6].map((count) => (
            <button
              key={count}
              onClick={() => setPresenceSlots(count)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                presenceSlots === count
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto p-8 rounded-2xl border border-border bg-surface-subtle/50 flex flex-col items-center justify-center space-y-4">
        <div className="text-xs text-muted-foreground">Active Collaborators in Document:</div>
        <PresenceAvatars
          people={presencePeople}
          max={presenceSlots}
          size={36}
          overlap={11}
          onOverflowSelect={(hidden) => {
            addToast({
              title: 'Hidden Collaborators',
              description: `${hidden.map((p) => p.name).join(', ')}`,
              type: 'info',
            });
          }}
        />
        <div className="text-xs text-muted-foreground text-center font-mono pt-2">
          Click the +N badge to reveal the overflow roster callback!
        </div>
      </div>
    </div>
  );
};

export const AccordionPlayground: React.FC = () => {
  const [accordionType, setAccordionType] = useState<'single' | 'multiple'>('single');
  const [accordionCollapsible, setAccordionCollapsible] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ListTree className="size-4 text-primary" />
          Accordion Settings
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Mode:</span>
          <Button
            size="xs"
            variant={accordionType === 'single' ? 'primary' : 'outline'}
            onClick={() => setAccordionType('single')}
          >
            Single
          </Button>
          <Button
            size="xs"
            variant={accordionType === 'multiple' ? 'primary' : 'outline'}
            onClick={() => setAccordionType('multiple')}
          >
            Multiple
          </Button>
          <span className="text-xs text-muted-foreground ml-2">Collapsible:</span>
          <Button
            size="xs"
            variant={accordionCollapsible ? 'primary' : 'outline'}
            onClick={() => setAccordionCollapsible(!accordionCollapsible)}
          >
            {accordionCollapsible ? 'Enabled' : 'Disabled'}
          </Button>
        </div>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-xl">
          <Accordion
            type={accordionType}
            collapsible={accordionCollapsible}
            defaultOpen={['item-1']}
            items={[
              {
                id: 'item-1',
                title: 'How does dynamic design token theming work?',
                meta: 'v2.4',
                content:
                  'All components read CSS custom properties (HSL variables) such as --primary, --surface, --surface-elevated, and --radius. Switching themes or adjusting color pickers automatically triggers instantaneous live CSS restyling with zero JavaScript rerenders.',
              },
              {
                id: 'item-2',
                title: 'Are layout transitions smooth on variable-length content?',
                meta: 'ResizeObserver',
                content:
                  'Yes! Under the hood, useAutoHeight uses a performant ResizeObserver to measure the exact bounding box height of panel content, driving spring physics without hardcoded max-height jumps.',
              },
              {
                id: 'item-3',
                title: 'What accessibility standards are supported?',
                meta: 'WAI-ARIA',
                content:
                  'Accordions use semantic heading tags, aria-expanded, aria-controls, and full arrow key navigation (ArrowUp, ArrowDown, Home, End). Inactive panels are marked inert for assistive screen readers.',
              },
              {
                id: 'item-4',
                title: 'Can users navigate with prefers-reduced-motion?',
                meta: 'A11y',
                content:
                  'Whenever users have reduced motion enabled in their operating system, all height and rotation animations seamlessly collapse into instant switches.',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const FilterGridPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [filterGridCat, setFilterGridCat] = useState('all');
  const [filterGridCols, setFilterGridCols] = useState(3);

  const services = [
    { id: 'srv-1', name: 'API Gateway', category: 'compute', status: 'Healthy', latency: '4ms', load: '32%' },
    { id: 'srv-2', name: 'PostgreSQL Primary', category: 'database', status: 'Healthy', latency: '12ms', load: '64%' },
    { id: 'srv-3', name: 'Redis Cache Cluster', category: 'database', status: 'Healthy', latency: '1ms', load: '18%' },
    { id: 'srv-4', name: 'OAuth2 / mTLS Auth', category: 'security', status: 'Protected', latency: '8ms', load: '45%' },
    { id: 'srv-5', name: 'Edge V8 Workers', category: 'compute', status: 'Healthy', latency: '2ms', load: '78%' },
    { id: 'srv-6', name: 'Blob Storage S3', category: 'storage', status: 'Healthy', latency: '24ms', load: '52%' },
    { id: 'srv-7', name: 'KMS Secret Vault', category: 'security', status: 'Protected', latency: '6ms', load: '11%' },
    { id: 'srv-8', name: 'Kafka Event Bus', category: 'compute', status: 'Healthy', latency: '9ms', load: '89%' },
  ];

  const filters = [
    { id: 'all', label: 'All Services', match: () => true },
    { id: 'compute', label: 'Compute', match: (s: (typeof services)[0]) => s.category === 'compute' },
    { id: 'database', label: 'Database', match: (s: (typeof services)[0]) => s.category === 'database' },
    { id: 'security', label: 'Security & Auth', match: (s: (typeof services)[0]) => s.category === 'security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Columns:</span>
          {[2, 3, 4].map((cols) => (
            <Button
              key={cols}
              size="xs"
              variant={filterGridCols === cols ? 'primary' : 'outline'}
              onClick={() => setFilterGridCols(cols)}
            >
              {cols} Cols
            </Button>
          ))}
        </div>

        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            setFilterGridCat('all');
            addToast({ title: 'Filters Reset', description: 'Showing all service cards', type: 'info' });
          }}
        >
          Reset Filter
        </Button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-surface-subtle/50 border border-border">
        <FilterGrid
          items={services}
          filters={filters}
          value={filterGridCat}
          onValueChange={(id) => {
            setFilterGridCat(id);
            addToast({ title: 'Filter Applied', description: `Filtered by: ${id}`, type: 'info' });
          }}
          label="Service Inventory"
          columns={filterGridCols}
          getKey={(s) => s.id}
          renderItem={(s) => (
            <div className="p-4 rounded-xl bg-surface border border-border shadow-xs hover:border-primary/40 hover:shadow-sm transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{s.id}</span>
                  <Badge variant={s.category === 'security' ? 'secondary' : 'default'} size="sm">
                    {s.category}
                  </Badge>
                </div>
                <div className="font-semibold text-sm text-foreground">{s.name}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Latency: <strong className="text-foreground">{s.latency}</strong></span>
                <span>Load: <strong className="text-foreground">{s.load}</strong></span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const PollResultsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [pollVotedId, setPollVotedId] = useState<string | null>(null);

  const pollOptions = [
    { id: 'opt-react-state', label: 'React Context + Hooks', votes: 142 },
    { id: 'opt-zustand', label: 'Zustand Store', votes: 318 },
    { id: 'opt-tanstack', label: 'TanStack Query (React Query)', votes: 412 },
    { id: 'opt-redux', label: 'Redux Toolkit / RTK Query', votes: 98 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="text-xs text-muted-foreground">
          Current Status: <strong className="text-foreground">{pollVotedId ? 'Vote Recorded' : 'Awaiting Vote'}</strong>
        </div>

        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setPollVotedId(null);
            addToast({ title: 'Poll Reset', description: 'You can now cast your vote again.', type: 'info' });
          }}
        >
          Reset Vote
        </Button>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
        <div className="w-full max-w-md p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
              <Vote className="size-3.5" />
              <span>Developer Survey 2026</span>
            </div>
            <h3 className="text-base font-semibold text-foreground">
              What is your primary state management library in production?
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click an option below to reveal live spring percentage distributions.
            </p>
          </div>

          <PollResults
            label="Primary State Management Tool"
            options={pollOptions}
            value={pollVotedId}
            onVote={(id) => {
              setPollVotedId(id);
              const match = pollOptions.find((o) => o.id === id);
              addToast({
                title: 'Vote Counted!',
                description: `You voted for: ${match?.label}`,
                type: 'success',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
