'use client';

import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type FlapTileState = {
  currentGlyph: string;
  nextGlyph: string;
  isFlipping: boolean;
  animationTick: number;
};

type TileAnimationPlan = {
  tileIndex: number;
  sourceGlyph: string;
  targetGlyph: string;
  flipGlyphSequence: string[];
  startTimeMs: number;
  currentStep: number;
  isFinished: boolean;
};

type TileStateUpdate = {
  tileIndex: number;
  currentGlyph: string;
  nextGlyph: string;
  isFinished: boolean;
};

type AnimationTimingConfig = {
  flipDurationMs: number;
  staggerDelayMs: number;
  holdDelayMs: number;
  flipsCount: number;
  glyphSet: string;
  transitionOrder: SplitFlapOrder;
};

export type SplitFlapAlign = 'left' | 'center' | 'right';
export type SplitFlapOrder = 'left' | 'right' | 'center' | 'random';
export type SplitFlapTileStyle = 'board' | 'minimal';

export interface SplitFlapTextProps extends HTMLAttributes<HTMLDivElement> {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: 'alpha' | 'alphanumeric' | 'numeric' | (string & {});
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  align?: SplitFlapAlign;
  intro?: boolean;
  glare?: number;
  depth?: number;
  order?: SplitFlapOrder;
  tileStyle?: SplitFlapTileStyle;
}

const DEFAULT_SPLIT_FLAP_WORDS = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'];

const CHARACTER_SETS: Record<string, string> = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numeric: '0123456789',
};

const SPLIT_FLAP_STYLES = `
.split-flap-text {
  gap: var(--split-flap-gap, 6px);
  font-family: 'SFMono-Regular', 'Roboto Mono', 'Cascadia Code', 'Liberation Mono', Menlo, monospace;
  font-size: var(--split-flap-font-size, 52px);
  font-weight: 760;
  line-height: 1;
  letter-spacing: .035em;
  font-variant-numeric: tabular-nums;
}
.split-flap-text__tile {
  position: relative;
  flex: none;
  width: .78em;
  height: 1.08em;
  overflow: hidden;
  border-radius: var(--split-flap-radius, 8px);
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.16), transparent 44%), linear-gradient(180deg, color-mix(in srgb, var(--split-flap-tile-color, #111827) 82%, white), var(--split-flap-tile-color, #111827));
  box-shadow: 0 .035em .08em rgba(255,255,255,.08) inset, 0 -.05em .1em rgba(0,0,0,.38) inset, 0 calc(.16em * var(--split-flap-lift, 1)) calc(.38em * var(--split-flap-lift, 1)) rgba(0,0,0,var(--split-flap-drop, .28));
  perspective: 10em;
  transform-style: preserve-3d;
  isolation: isolate;
}
.split-flap-text__tile::before {
  content: '';
  position: absolute;
  z-index: 8;
  top: calc(50% - var(--split-flap-hinge, 1px) / 2);
  left: 0;
  width: 100%;
  height: var(--split-flap-hinge, 1px);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18) 18%, rgba(0,0,0,var(--split-flap-hinge-shade, .64)) 50%, rgba(255,255,255,.14) 82%, transparent);
  box-shadow: 0 -1px 0 rgba(255,255,255,.08), 0 1px 0 rgba(0,0,0,.5);
  pointer-events: none;
}
.split-flap-text__tile::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 9;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: inherit;
  box-shadow: 0 0 0 1px rgba(0,0,0,.2) inset;
  pointer-events: none;
}
.split-flap-text__half,
.split-flap-text__flap {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,.07), transparent 34%), var(--split-flap-tile-color, #111827);
  backface-visibility: hidden;
}
.split-flap-text__half--top,
.split-flap-text__flap--front {
  top: 0;
}
.split-flap-text__half--bottom,
.split-flap-text__flap--back {
  bottom: 0;
  background: linear-gradient(0deg, rgba(255,255,255,.06), transparent 38%), color-mix(in srgb, var(--split-flap-tile-color, #111827) 92%, black);
}
.split-flap-text__char {
  position: absolute;
  left: 0;
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--split-flap-text-color, #f8fafc);
  text-shadow: 0 .025em 0 rgba(255,255,255,.16), 0 .09em .16em rgba(0,0,0,.42);
}
.split-flap-text__half--top .split-flap-text__char,
.split-flap-text__flap--front .split-flap-text__char {
  top: 0;
}
.split-flap-text__half--bottom .split-flap-text__char,
.split-flap-text__flap--back .split-flap-text__char {
  bottom: 0;
}
.split-flap-text__flap {
  z-index: 6;
  will-change: transform, filter;
  transform-style: preserve-3d;
}
.split-flap-text__flap--front {
  transform-origin: center bottom;
  box-shadow: inset 0 var(--split-flap-edge, 0em) 0 rgba(255,255,255,.16);
  animation: split-flap-front var(--split-flap-flip-duration, .12s) linear both;
}
.split-flap-text__flap--back {
  transform-origin: center top;
  transform: rotateX(90deg);
  box-shadow: inset 0 calc(var(--split-flap-edge, 0em) * -1) 0 rgba(0,0,0,.4);
  animation: split-flap-back var(--split-flap-flip-duration, .12s) linear both;
}
.split-flap-text__shade {
  position: absolute;
  z-index: 4;
  left: 0;
  width: 100%;
  height: 50%;
  pointer-events: none;
  animation: split-flap-shade-top var(--split-flap-flip-duration, .12s) linear both;
}
.split-flap-text__shade--top {
  top: 0;
  background: linear-gradient(0deg, rgba(0,0,0,var(--split-flap-cast, 0)), transparent 85%);
}
.split-flap-text__shade--bottom {
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,var(--split-flap-cast, 0)), transparent 90%);
  animation-name: split-flap-shade-bottom;
}
.split-flap-text--glare .split-flap-text__flap::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 32%, rgba(255,255,255,var(--split-flap-glare, 0)) 50%, transparent 68%) 0 100% / 100% 300% no-repeat;
  animation: split-flap-glare-front var(--split-flap-flip-duration, .12s) linear both;
}
.split-flap-text--glare .split-flap-text__flap--back::after {
  animation-name: split-flap-glare-back;
}
.split-flap-text--minimal .split-flap-text__tile {
  background: none;
  box-shadow: none;
  -webkit-mask: linear-gradient(#000 0 0) top / 100% calc(50% - var(--split-flap-split, .045em) / 2) no-repeat, linear-gradient(#000 0 0) bottom / 100% calc(50% - var(--split-flap-split, .045em) / 2) no-repeat;
  mask: linear-gradient(#000 0 0) top / 100% calc(50% - var(--split-flap-split, .045em) / 2) no-repeat, linear-gradient(#000 0 0) bottom / 100% calc(50% - var(--split-flap-split, .045em) / 2) no-repeat;
}
.split-flap-text--minimal .split-flap-text__tile::before,
.split-flap-text--minimal .split-flap-text__tile::after,
.split-flap-text--minimal .split-flap-text__flap::after {
  display: none;
}
.split-flap-text--minimal .split-flap-text__half,
.split-flap-text--minimal .split-flap-text__flap {
  background: none;
  box-shadow: none;
}
.split-flap-text--minimal .split-flap-text__char {
  text-shadow: none;
}
.split-flap-text--minimal .split-flap-text__tile.is-flipping .split-flap-text__half--top {
  animation: split-flap-reveal var(--split-flap-flip-duration, .12s) linear both;
}
.split-flap-text--minimal .split-flap-text__tile.is-flipping .split-flap-text__half--bottom {
  animation: split-flap-cover var(--split-flap-flip-duration, .12s) linear both;
}
@keyframes split-flap-front {
  0% { transform: rotateX(0deg); filter: brightness(var(--split-flap-front-from, 1.08)); animation-timing-function: cubic-bezier(.55,.055,.675,.19); }
  50%, 100% { transform: rotateX(-90deg); filter: brightness(var(--split-flap-front-to, .52)); }
}
@keyframes split-flap-back {
  0%, 50% { transform: rotateX(90deg); filter: brightness(var(--split-flap-back-from, .58)); animation-timing-function: cubic-bezier(.215,.61,.355,1); }
  100% { transform: rotateX(0deg); filter: brightness(1); }
}
@keyframes split-flap-shade-top {
  0%, 32% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes split-flap-shade-bottom {
  0% { opacity: 0; animation-timing-function: cubic-bezier(.55,.055,.675,.19); }
  50%, 100% { opacity: 1; }
}
@keyframes split-flap-glare-front {
  0% { background-position: 0 100%; opacity: 0; }
  30% { opacity: 1; }
  50%, 100% { background-position: 0 0%; opacity: .75; }
}
@keyframes split-flap-glare-back {
  0%, 50% { background-position: 0 100%; opacity: .75; }
  100% { background-position: 0 0%; opacity: 0; }
}
@keyframes split-flap-reveal {
  0% { clip-path: inset(0 0 100% 0); }
  23.14% { clip-path: inset(0 0 99.21% 0); }
  29.67% { clip-path: inset(0 0 95.55% 0); }
  33.95% { clip-path: inset(0 0 89.09% 0); }
  37.41% { clip-path: inset(0 0 79.46% 0); }
  40.56% { clip-path: inset(0 0 66.05% 0); }
  43.73% { clip-path: inset(0 0 47.69% 0); }
  47.38% { clip-path: inset(0 0 21.22% 0); }
  50%, 100% { clip-path: inset(0 0 0 0); }
}
@keyframes split-flap-cover {
  0%, 50% { clip-path: inset(0 0 0 0); }
  54.42% { clip-path: inset(35.75% 0 0 0); }
  57.44% { clip-path: inset(55.86% 0 0 0); }
  60.39% { clip-path: inset(70.63% 0 0 0); }
  63.65% { clip-path: inset(81.86% 0 0 0); }
  67.65% { clip-path: inset(90.23% 0 0 0); }
  73.17% { clip-path: inset(96% 0 0 0); }
  82.62% { clip-path: inset(99.25% 0 0 0); }
  100% { clip-path: inset(100% 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  .split-flap-text__flap,
  .split-flap-text__flap::after,
  .split-flap-text__shade,
  .split-flap-text__half {
    animation: none !important;
  }
}
`;

const formatCssDimension = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

const resolveCssColor = (colorString?: string) => {
  if (!colorString) return colorString;
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};

const resolveCharacterSet = (charsetProp: SplitFlapTextProps['charset']) => {
  if (charsetProp && CHARACTER_SETS[charsetProp]) return CHARACTER_SETS[charsetProp];
  return typeof charsetProp === 'string' && charsetProp.length > 0
    ? charsetProp
    : CHARACTER_SETS.alphanumeric;
};

const padAndAlignPhrase = (
  phrase: string,
  targetWidth: number,
  alignment: SplitFlapAlign = 'left'
) => {
  const truncatedPhrase = String(phrase ?? '').slice(0, targetWidth);
  if (alignment === 'right') return truncatedPhrase.padStart(targetWidth, ' ');
  if (alignment === 'center') {
    const halfRemainder = Math.floor((targetWidth - truncatedPhrase.length) / 2);
    return truncatedPhrase
      .padStart(truncatedPhrase.length + halfRemainder, ' ')
      .padEnd(targetWidth, ' ');
  }
  return truncatedPhrase.padEnd(targetWidth, ' ');
};

const initializeTileStates = (phraseText: string): FlapTileState[] =>
  phraseText.split('').map((char) => ({
    currentGlyph: char,
    nextGlyph: char,
    isFlipping: false,
    animationTick: 0,
  }));

const pickRandomGlyph = (glyphSet: string) =>
  glyphSet.charAt(Math.floor(Math.random() * glyphSet.length)) || ' ';

const generateFlipSequence = (
  targetChar: string,
  totalFlips: number,
  glyphSet: string
) => {
  const sequenceList: string[] = [];
  for (let i = 0; i < totalFlips; i += 1) {
    sequenceList.push(pickRandomGlyph(glyphSet));
  }
  sequenceList.push(targetChar);
  return sequenceList;
};

const formatDisplayGlyph = (char: string) => (char === ' ' ? '\u00A0' : char);

const generateShuffledIndices = (count: number) => {
  const indicesList = Array.from({ length: count }, (_, index) => index);
  for (let i = count - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [indicesList[i], indicesList[randomIndex]] = [
      indicesList[randomIndex],
      indicesList[i],
    ];
  }
  return indicesList;
};

const calculateCascadeOrderStep = (
  index: number,
  totalWidth: number,
  order: SplitFlapOrder,
  shuffledOrderList: number[] | null
) => {
  if (order === 'right') return totalWidth - 1 - index;
  if (order === 'center')
    return Math.floor(Math.abs(index - (totalWidth - 1) / 2));
  if (order === 'random' && shuffledOrderList) return shuffledOrderList[index];
  return index;
};

const clampUnitRange = (val: number) =>
  Math.min(1, Math.max(0, Number(val) || 0));

const roundPrecision = (val: number) => Number(val.toFixed(3));

const checkPrefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

const useReducedMotionHook = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    checkPrefersReducedMotion
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleMotionChange();
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return prefersReducedMotion;
};

export const SplitFlapText: React.FC<SplitFlapTextProps> = ({
  words = DEFAULT_SPLIT_FLAP_WORDS,
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  charset = 'alphanumeric',
  flipsPerChar = 8,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  loop = true,
  padTo = 12,
  align = 'left',
  intro = true,
  glare = 0,
  depth = 0.5,
  order = 'left',
  tileStyle = 'board',
  className = '',
  style = {},
  ...props
}) => {
  const prefersReducedMotion = useReducedMotionHook();
  const animationFrameRef = useRef<number | null>(null);
  const currentlyDisplayedWordRef = useRef<string | null>(null);
  const transitionSourceWordRef = useRef<string | null>(null);
  const currentWordIndexRef = useRef(0);
  const cachedPhrasesRef = useRef<string[] | null>(null);

  const resolvedWordsList =
    Array.isArray(words) && words.length > 0 ? words : DEFAULT_SPLIT_FLAP_WORDS;
  const rawPhrasesKey =
    typeof text === 'string'
      ? text
      : resolvedWordsList.map((word) => String(word ?? '')).join('\u001f');
  const phraseItemsList = useMemo(
    () => rawPhrasesKey.split('\u001f'),
    [rawPhrasesKey]
  );

  const boardWidth = useMemo(() => {
    const longestWordLength = phraseItemsList.reduce(
      (max, phrase) => Math.max(max, phrase.length),
      1
    );
    return Math.max(1, Math.ceil(Number(padTo) || 0), longestWordLength);
  }, [padTo, phraseItemsList]);

  const normalizedPhrasesList = useMemo(
    () =>
      phraseItemsList.map((phrase) =>
        padAndAlignPhrase(phrase, boardWidth, align)
      ),
    [phraseItemsList, boardWidth, align]
  );

  const timingConfig = useMemo<AnimationTimingConfig>(
    () => ({
      flipDurationMs: Math.max(40, (Number(flipDuration) || 0.12) * 1000),
      staggerDelayMs: Math.max(0, (Number(stagger) || 0) * 1000),
      holdDelayMs: Math.max(400, Number(cycleDelay) || 2400),
      flipsCount: Math.max(0, Math.floor(Number(flipsPerChar) || 0)),
      glyphSet: resolveCharacterSet(charset),
      transitionOrder: order,
    }),
    [flipDuration, stagger, cycleDelay, flipsPerChar, charset, order]
  );

  const timingConfigRef = useRef(timingConfig);

  const [activeTileStates, setActiveTileStates] = useState<FlapTileState[]>(() =>
    initializeTileStates(
      intro ? ' '.repeat(boardWidth) : normalizedPhrasesList[0]
    )
  );
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    timingConfigRef.current = timingConfig;
  }, [timingConfig]);

  useEffect(() => {
    let isCancelled = false;
    let cycleTimer: ReturnType<typeof setTimeout> | undefined;

    const stopRunningAnimation = () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };

    const animateToTargetPhrase = (targetPhrase: string) => {
      const {
        flipDurationMs,
        staggerDelayMs,
        flipsCount,
        glyphSet,
        transitionOrder,
      } = timingConfigRef.current;
      const sourcePhrase = padAndAlignPhrase(
        currentlyDisplayedWordRef.current ?? targetPhrase,
        targetPhrase.length
      );
      const shuffledIndices =
        transitionOrder === 'random'
          ? generateShuffledIndices(targetPhrase.length)
          : null;

      stopRunningAnimation();
      currentlyDisplayedWordRef.current = targetPhrase;
      transitionSourceWordRef.current = null;

      const animationPlans: TileAnimationPlan[] = [];
      if (!prefersReducedMotion) {
        for (let index = 0; index < targetPhrase.length; index += 1) {
          if (sourcePhrase[index] === targetPhrase[index]) continue;
          animationPlans.push({
            tileIndex: index,
            sourceGlyph: sourcePhrase[index],
            targetGlyph: targetPhrase[index],
            flipGlyphSequence: generateFlipSequence(
              targetPhrase[index],
              flipsCount,
              glyphSet
            ),
            startTimeMs:
              calculateCascadeOrderStep(
                index,
                targetPhrase.length,
                transitionOrder,
                shuffledIndices
              ) * staggerDelayMs,
            currentStep: -1,
            isFinished: false,
          });
        }
      }

      if (!animationPlans.length) {
        setActiveTileStates(initializeTileStates(targetPhrase));
        return 0;
      }

      transitionSourceWordRef.current = sourcePhrase;
      setActiveTileStates(initializeTileStates(sourcePhrase));

      const totalAnimationDuration = animationPlans.reduce(
        (max, plan) =>
          Math.max(
            max,
            plan.startTimeMs + plan.flipGlyphSequence.length * flipDurationMs
          ),
        0
      );
      const animationStartTime = performance.now();

      const onFrameTick = (currentTime: number) => {
        if (isCancelled) return;

        const elapsedTime = currentTime - animationStartTime;
        const pendingUpdates: TileStateUpdate[] = [];
        let isAnimationActive = false;

        animationPlans.forEach((plan) => {
          const localElapsed = elapsedTime - plan.startTimeMs;

          if (localElapsed < 0) {
            isAnimationActive = true;
            return;
          }

          const step = Math.floor(localElapsed / flipDurationMs);

          if (step < plan.flipGlyphSequence.length) {
            isAnimationActive = true;

            if (step !== plan.currentStep) {
              plan.currentStep = step;
              pendingUpdates.push({
                tileIndex: plan.tileIndex,
                currentGlyph:
                  step === 0
                    ? plan.sourceGlyph
                    : plan.flipGlyphSequence[step - 1],
                nextGlyph: plan.flipGlyphSequence[step],
                isFinished: false,
              });
            }
          } else if (!plan.isFinished) {
            plan.isFinished = true;
            pendingUpdates.push({
              tileIndex: plan.tileIndex,
              currentGlyph: plan.targetGlyph,
              nextGlyph: plan.targetGlyph,
              isFinished: true,
            });
          }
        });

        if (pendingUpdates.length > 0) {
          setActiveTileStates((previousTiles) => {
            const nextTiles = [...previousTiles];
            pendingUpdates.forEach((update) => {
              const tile = nextTiles[update.tileIndex];
              if (!tile) return;

              nextTiles[update.tileIndex] = {
                currentGlyph: update.currentGlyph,
                nextGlyph: update.nextGlyph,
                isFlipping: !update.isFinished,
                animationTick: tile.animationTick + 1,
              };
            });
            return nextTiles;
          });
        }

        if (isAnimationActive) {
          animationFrameRef.current = requestAnimationFrame(onFrameTick);
        } else {
          animationFrameRef.current = null;
          transitionSourceWordRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(onFrameTick);
      return totalAnimationDuration;
    };

    const triggerWordTransition = (index: number) => {
      currentWordIndexRef.current = index;
      setActiveWordIndex(index);
      return animateToTargetPhrase(normalizedPhrasesList[index]);
    };

    const scheduleNextWordTransition = (delayMs: number) => {
      cycleTimer = setTimeout(() => {
        if (isCancelled) return;

        if (document.hidden) {
          scheduleNextWordTransition(timingConfigRef.current.holdDelayMs);
          return;
        }

        const nextWordIndex = currentWordIndexRef.current + 1;
        if (nextWordIndex >= normalizedPhrasesList.length && !loop) return;

        const transitionDuration = triggerWordTransition(
          nextWordIndex % normalizedPhrasesList.length
        );
        scheduleNextWordTransition(
          timingConfigRef.current.holdDelayMs + transitionDuration
        );
      }, delayMs);
    };

    const hasMatchingPhrases =
      cachedPhrasesRef.current === normalizedPhrasesList;
    cachedPhrasesRef.current = normalizedPhrasesList;

    if (currentlyDisplayedWordRef.current === null) {
      currentlyDisplayedWordRef.current = intro
        ? ' '.repeat(boardWidth)
        : normalizedPhrasesList[0];
    }

    if (
      !hasMatchingPhrases ||
      currentWordIndexRef.current >= normalizedPhrasesList.length
    ) {
      currentWordIndexRef.current = 0;
    } else if (transitionSourceWordRef.current !== null) {
      currentlyDisplayedWordRef.current = transitionSourceWordRef.current;
    }

    let initialTransitionDuration = 0;
    if (
      currentlyDisplayedWordRef.current ===
      normalizedPhrasesList[currentWordIndexRef.current]
    ) {
      stopRunningAnimation();
      transitionSourceWordRef.current = null;
      setActiveWordIndex(currentWordIndexRef.current);
      setActiveTileStates(
        initializeTileStates(currentlyDisplayedWordRef.current)
      );
    } else {
      initialTransitionDuration = triggerWordTransition(
        currentWordIndexRef.current
      );
    }

    if (normalizedPhrasesList.length > 1) {
      scheduleNextWordTransition(
        timingConfigRef.current.holdDelayMs + initialTransitionDuration
      );
    }

    return () => {
      isCancelled = true;
      clearTimeout(cycleTimer);
      stopRunningAnimation();
    };
  }, [normalizedPhrasesList, boardWidth, loop, intro, prefersReducedMotion]);

  const accessibleLabel = String(
    phraseItemsList[activeWordIndex] ?? phraseItemsList[0] ?? ''
  ).trim();
  const isMinimalStyle = tileStyle === 'minimal';
  const depthFactor = clampUnitRange(depth);
  const flatIntensity = Math.min(1, depthFactor * 2);
  const deepIntensity = Math.max(0, depthFactor - 0.5) * 2;
  const glareIntensity = isMinimalStyle ? 0 : clampUnitRange(glare);
  const isShadedSurface = !isMinimalStyle && deepIntensity > 0;

  const rootElementClasses = [
    'split-flap-text',
    isMinimalStyle && 'split-flap-text--minimal',
    glareIntensity > 0 && 'split-flap-text--glare',
    'relative inline-flex items-center whitespace-pre select-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const componentCustomStyles: CSSProperties &
    Record<string, string | number | undefined> = {
    '--split-flap-tile-color': resolveCssColor(tileColor),
    '--split-flap-text-color': resolveCssColor(textColor),
    '--split-flap-radius': formatCssDimension(tileRadius),
    '--split-flap-gap': formatCssDimension(gap),
    '--split-flap-font-size': formatCssDimension(fontSize),
    '--split-flap-flip-duration': `${Math.max(
      0.04,
      Number(flipDuration) || 0.12
    )}s`,
    '--split-flap-front-from': roundPrecision(1 + 0.08 * flatIntensity),
    '--split-flap-front-to': roundPrecision(
      1 - 0.48 * flatIntensity - 0.3 * deepIntensity
    ),
    '--split-flap-back-from': roundPrecision(
      1 - 0.42 * flatIntensity - 0.3 * deepIntensity
    ),
    '--split-flap-hinge': `calc(1px + ${roundPrecision(
      deepIntensity * 0.05
    )}em)`,
    '--split-flap-hinge-shade': roundPrecision(
      0.25 + 0.39 * flatIntensity + 0.21 * deepIntensity
    ),
    '--split-flap-drop': roundPrecision(
      0.28 * flatIntensity + 0.2 * deepIntensity
    ),
    '--split-flap-lift': roundPrecision(
      0.4 + 0.6 * flatIntensity + 0.7 * deepIntensity
    ),
    '--split-flap-cast': roundPrecision(deepIntensity * 0.62),
    '--split-flap-edge': `${roundPrecision(deepIntensity * 0.035)}em`,
    '--split-flap-split': `${roundPrecision(0.015 + depthFactor * 0.06)}em`,
    '--split-flap-glare': roundPrecision(glareIntensity * 0.55),
    ...style,
  };

  return (
    <>
      <style>{SPLIT_FLAP_STYLES}</style>
      <div className={rootElementClasses} style={componentCustomStyles} {...props}>
        <span className="sr-only">{accessibleLabel}</span>
        {activeTileStates.map((tile, index) => (
          <span
            className={`split-flap-text__tile${
              tile.isFlipping ? ' is-flipping' : ''
            }`}
            aria-hidden="true"
            key={`${index}-${activeTileStates.length}`}
          >
            <span
              className="split-flap-text__half split-flap-text__half--top"
              key={isMinimalStyle ? `top-${tile.animationTick}` : 'top'}
            >
              <span className="split-flap-text__char">
                {formatDisplayGlyph(
                  tile.isFlipping ? tile.nextGlyph : tile.currentGlyph
                )}
              </span>
            </span>

            <span
              className="split-flap-text__half split-flap-text__half--bottom"
              key={isMinimalStyle ? `bottom-${tile.animationTick}` : 'bottom'}
            >
              <span className="split-flap-text__char">
                {formatDisplayGlyph(tile.currentGlyph)}
              </span>
            </span>

            {tile.isFlipping && (
              <>
                {isShadedSurface && (
                  <>
                    <span
                      className="split-flap-text__shade split-flap-text__shade--top"
                      key={`shade-top-${tile.animationTick}`}
                    />
                    <span
                      className="split-flap-text__shade split-flap-text__shade--bottom"
                      key={`shade-bottom-${tile.animationTick}`}
                    />
                  </>
                )}
                <span
                  className="split-flap-text__flap split-flap-text__flap--front"
                  key={`front-${index}-${tile.animationTick}`}
                >
                  <span className="split-flap-text__char">
                    {formatDisplayGlyph(tile.currentGlyph)}
                  </span>
                </span>
                <span
                  className="split-flap-text__flap split-flap-text__flap--back"
                  key={`back-${index}-${tile.animationTick}`}
                >
                  <span className="split-flap-text__char">
                    {formatDisplayGlyph(tile.nextGlyph)}
                  </span>
                </span>
              </>
            )}
          </span>
        ))}
      </div>
    </>
  );
};

export { SplitFlapText as SplitFlap };
export default SplitFlapText;
