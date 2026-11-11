import React, { useState } from 'react';
import {
  LeaderboardTable,
  LeaderboardItem,
  useToast,
  ParameterGrid,
  ParameterSlider,
  ParameterSwitch,
  Button,
} from '@/components/ui';
import { Trophy, Sliders, UserPlus, Sparkles } from 'lucide-react';

const INITIAL_SCORES: LeaderboardItem[] = [
  { id: '1', rank: 1, name: 'Sourav', score: 9850, time: '18.4s', level: 25, isCurrentUser: true, tag: 'Champion' },
  { id: '2', rank: 2, name: 'Elena_R', score: 9240, time: '21.2s', level: 24, tag: 'Grandmaster' },
  { id: '3', rank: 3, name: 'CyberBaller', score: 8710, time: '23.8s', level: 22, tag: 'Pro' },
  { id: '4', rank: 4, name: 'Vortex99', score: 7920, time: '27.5s', level: 19, tag: 'Challenger' },
  { id: '5', rank: 5, name: 'PixelStriker', score: 7450, time: '30.1s', level: 18 },
  { id: '6', rank: 6, name: 'NeonPaddle', score: 6890, time: '33.4s', level: 16 },
  { id: '7', rank: 7, name: 'ArcadeGhost', score: 6120, time: '38.9s', level: 15 },
  { id: '8', rank: 8, name: 'QuantumSpin', score: 5400, time: '42.0s', level: 12 },
];

export const LeaderboardTablePlayground: React.FC = () => {
  const { addToast } = useToast();
  const [players, setPlayers] = useState<LeaderboardItem[]>(INITIAL_SCORES);
  const [searchable, setSearchable] = useState(true);
  const [highlightPodium, setHighlightPodium] = useState(true);
  const [maxRows, setMaxRows] = useState(8);

  const handleSelectPlayer = (player: LeaderboardItem) => {
    addToast({
      title: `${player.name} (${player.rank === 1 ? '1st Place' : `#${player.rank}`})`,
      description: `Score: ${player.score.toLocaleString()} pts | Completion Time: ${player.time || '--'}`,
      type: 'info',
    });
  };

  const handleAddDemoScore = () => {
    const randomScore = Math.floor(6000 + Math.random() * 4500);
    const newPlayer: LeaderboardItem = {
      id: String(Date.now()),
      rank: 0,
      name: `Player_${Math.floor(100 + Math.random() * 900)}`,
      score: randomScore,
      time: `${(15 + Math.random() * 25).toFixed(1)}s`,
      level: Math.floor(10 + Math.random() * 15),
    };

    const combined = [...players, newPlayer]
      .sort((a, b) => b.score - a.score)
      .map((p, idx) => ({ ...p, rank: idx + 1 }));

    setPlayers(combined);
    addToast({
      title: 'New Score Submitted!',
      description: `${newPlayer.name} logged ${newPlayer.score.toLocaleString()} pts (Rank #${combined.find((p) => p.id === newPlayer.id)?.rank})`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
      <div className="p-4 sm:p-8 rounded-3xl bg-surface-subtle/40 border border-border flex flex-col items-center justify-center gap-6 shadow-sm">
        <div className="w-full max-w-2xl">
          <LeaderboardTable
            title="Players Ranking"
            subtitle="Global Breakout Ball High Scores"
            items={players}
            onSelectPlayer={handleSelectPlayer}
            searchable={searchable}
            highlightPodium={highlightPodium}
            maxRows={maxRows}
          />
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Leaderboard Options & Controls
            </span>
          </div>

          <Button
            size="xs"
            variant="outline"
            leftIcon={<UserPlus className="size-3.5" />}
            onClick={handleAddDemoScore}
          >
            Submit Random Score
          </Button>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Maximum Visible Rows"
            value={maxRows}
            onChange={setMaxRows}
            min={4}
            max={12}
            step={1}
          />
          <ParameterSwitch
            label="Live Search Bar"
            checked={searchable}
            onChange={setSearchable}
          />
          <ParameterSwitch
            label="Podium Trophy Icons"
            checked={highlightPodium}
            onChange={setHighlightPodium}
          />
        </ParameterGrid>
      </div>
    </div>
  );
};

export default LeaderboardTablePlayground;
