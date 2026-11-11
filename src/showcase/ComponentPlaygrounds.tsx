import React from 'react';
import {
  TextLoopPlayground,
  SplitFlapTextPlayground,
  TextRevealPlayground,
  StreamingTextPlayground,
  MarkdownEditorPlayground,
  MarkdownRendererPlayground,
  ParameterSliderPlayground,
  ElasticSliderPlayground,
  WakeSliderPlayground,
  SliderPlayground,
  SliderDetentsPlayground,
  BranchedMenuPlayground,
  TabsPlayground,
  SegmentedControlPlayground,
  WizardStepsPlayground,
  PaginationPlayground,
  TreeViewPlayground,
  StickyHeaderPlayground,
  ReadingProgressPlayground,
  ScrollSpyPlayground,
  HideOnScrollPlayground,
  ButtonPlayground,
  BadgePlayground,
  PeekRatingPlayground,
  FloatingInputPlayground,
  InlineValidationPlayground,
  OtpInputPlayground,
  TagInputPlayground,
  PasswordInputPlayground,
  ExpandingSearchPlayground,
  InputPlayground,
  TextareaPlayground,
  DropdownPlayground,
  SelectPlayground,
  SwitchPlayground,
  CheckboxPlayground,
  DialogPlayground,
  AlertPlayground,
  ToastPlayground,
  SpinnerPlayground,
  ModalPlayground,
  TooltipPlayground,
  CommandPalettePlayground,
  CollapsibleBannerPlayground,
  LightboxPlayground,
  AiApprovalCardPlayground,
  AiPromptBarPlayground,
  AiCodeBlockPlayground,
  AiFineTuneCardPlayground,
  TaskStepsPlayground,
  CardPlayground,
  AvatarPlayground,
  StatPlayground,
  LiquidGlassSheetPlayground,
  CardCoverflowPlayground,
  CardCarouselPlayground,
  PresenceAvatarsPlayground,
  AccordionPlayground,
  FilterGridPlayground,
  PollResultsPlayground,
  ReorderListPlayground,
  LogoMarqueePlayground,
  BlurUpImagePlayground,
  ShowMorePlayground,
  SegmentedABTabsPlayground,
  QuantityCounterPlayground,
  SearchButtonPlayground,
  SquishSwitchPlayground,
  ArcadeButtonPlayground,
  ArcadeSwitchPlayground,
  LeaderboardTablePlayground,
  MotionLoadersPlayground,
  LoadMorePlayground,
  MonoChartsPlayground
} from './playgrounds';

export interface ComponentPlaygroundsProps {
  componentId: string;
}

export const ComponentPlaygrounds: React.FC<ComponentPlaygroundsProps> = ({ componentId }) => {
  switch (componentId) {
    case 'text-loop':
      return <TextLoopPlayground />;
    case 'split-flap-text':
      return <SplitFlapTextPlayground />;
    case 'text-reveal':
      return <TextRevealPlayground />;
    case 'streaming-text':
      return <StreamingTextPlayground />;
    case 'markdown-editor':
      return <MarkdownEditorPlayground />;
    case 'markdown-renderer':
      return <MarkdownRendererPlayground />;
    case 'parameter-slider':
      return <ParameterSliderPlayground />;
    case 'elastic-slider':
      return <ElasticSliderPlayground />;
    case 'wake-slider':
      return <WakeSliderPlayground />;
    case 'slider':
      return <SliderPlayground />;
    case 'slider-detents':
      return <SliderDetentsPlayground />;
    case 'branched-menu':
      return <BranchedMenuPlayground />;
    case 'tabs':
      return <TabsPlayground />;
    case 'segmented-control':
      return <SegmentedControlPlayground />;
    case 'wizard-steps':
      return <WizardStepsPlayground />;
    case 'pagination':
      return <PaginationPlayground />;
    case 'tree-view':
      return <TreeViewPlayground />;
    case 'sticky-header':
      return <StickyHeaderPlayground />;
    case 'reading-progress':
      return <ReadingProgressPlayground />;
    case 'scroll-spy':
      return <ScrollSpyPlayground />;
    case 'hide-on-scroll':
      return <HideOnScrollPlayground />;
    case 'button':
      return <ButtonPlayground />;
    case 'badge':
      return <BadgePlayground />;
    case 'peek-rating':
      return <PeekRatingPlayground />;
    case 'floating-input':
    case 'floating-label-input':
      return <FloatingInputPlayground />;
    case 'inline-validation':
    case 'inline-validation-input':
      return <InlineValidationPlayground />;
    case 'otp-input':
      return <OtpInputPlayground />;
    case 'tag-input':
      return <TagInputPlayground />;
    case 'password-input':
      return <PasswordInputPlayground />;
    case 'expanding-search':
      return <ExpandingSearchPlayground />;
    case 'input':
      return <InputPlayground />;
    case 'textarea':
      return <TextareaPlayground />;
    case 'dropdown':
      return <DropdownPlayground />;
    case 'select':
      return <SelectPlayground />;
    case 'switch':
      return <SwitchPlayground />;
    case 'checkbox':
      return <CheckboxPlayground />;
    case 'dialog':
      return <DialogPlayground />;
    case 'alert':
      return <AlertPlayground />;
    case 'toast':
      return <ToastPlayground />;
    case 'spinner':
      return <SpinnerPlayground />;
    case 'modal':
      return <ModalPlayground />;
    case 'tooltip':
      return <TooltipPlayground />;
    case 'command-palette':
      return <CommandPalettePlayground />;
    case 'collapsible-banner':
      return <CollapsibleBannerPlayground />;
    case 'lightbox':
      return <LightboxPlayground />;
    case 'ai-approval-card':
      return <AiApprovalCardPlayground />;
    case 'ai-prompt-bar':
      return <AiPromptBarPlayground />;
    case 'ai-code-block':
      return <AiCodeBlockPlayground />;
    case 'ai-fine-tune-card':
      return <AiFineTuneCardPlayground />;
    case 'task-steps':
      return <TaskStepsPlayground />;
    case 'card':
      return <CardPlayground />;
    case 'avatar':
      return <AvatarPlayground />;
    case 'stat':
      return <StatPlayground />;
    case 'liquid-glass-sheet':
      return <LiquidGlassSheetPlayground />;
    case 'card-coverflow':
      return <CardCoverflowPlayground />;
    case 'card-carousel':
      return <CardCarouselPlayground />;
    case 'presence-avatars':
      return <PresenceAvatarsPlayground />;
    case 'accordion':
      return <AccordionPlayground />;
    case 'filter-grid':
      return <FilterGridPlayground />;
    case 'poll-results':
      return <PollResultsPlayground />;
    case 'reorder-list':
      return <ReorderListPlayground />;
    case 'logo-marquee':
      return <LogoMarqueePlayground />;
    case 'blur-up-image':
      return <BlurUpImagePlayground />;
    case 'show-more':
      return <ShowMorePlayground />;
    case 'segmented-ab-tabs':
      return <SegmentedABTabsPlayground />;
    case 'quantity-counter':
      return <QuantityCounterPlayground />;
    case 'search-button':
      return <SearchButtonPlayground />;
    case 'squish-switch':
    case 'on-off-switch':
      return <SquishSwitchPlayground />;
    case 'arcade-button':
      return <ArcadeButtonPlayground />;
    case 'arcade-switch':
      return <ArcadeSwitchPlayground />;
    case 'leaderboard-table':
      return <LeaderboardTablePlayground />;
    case 'motion-loaders':
      return <MotionLoadersPlayground />;
    case 'load-more':
      return <LoadMorePlayground />;
    case 'mono-charts':
      return <MonoChartsPlayground />;
    default:
      return null;
  }
};
