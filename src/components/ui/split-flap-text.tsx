"use client";

import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type FlapTileState,
  type TileAnimationPlan,
  type TileStateUpdate,
  type AnimationTimingConfig,
  type SplitFlapAlign,
  type SplitFlapOrder,
  type SplitFlapTileStyle,
  type SplitFlapTextProps,
  DEFAULT_SPLIT_FLAP_WORDS,
  CHARACTER_SETS,
  SPLIT_FLAP_STYLES,
  formatCssDimension,
  resolveCssColor,
  resolveCharacterSet,
  padAndAlignPhrase,
  initializeTileStates,
  pickRandomGlyph,
  generateFlipSequence,
  formatDisplayGlyph,
  generateShuffledIndices,
  calculateCascadeOrderStep,
  clampUnitRange,
  roundPrecision,
  checkPrefersReducedMotion,
  useReducedMotionHook,
} from "./split-flap-tile";

export type {
  SplitFlapAlign,
  SplitFlapOrder,
  SplitFlapTileStyle,
  SplitFlapTextProps,
  FlapTileState,
  TileAnimationPlan,
  TileStateUpdate,
  AnimationTimingConfig,
};

export {
  DEFAULT_SPLIT_FLAP_WORDS,
  CHARACTER_SETS,
  SPLIT_FLAP_STYLES,
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
    ...(tileColor ? { '--split-flap-tile-color': resolveCssColor(tileColor) } : {}),
    ...(textColor ? { '--split-flap-text-color': resolveCssColor(textColor) } : {}),
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
