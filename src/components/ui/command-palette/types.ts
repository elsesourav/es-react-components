import type React from "react";

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  keywords?: string;
  shortcut?: string[];
};

export type UseCommandPaletteOptions = {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss?: () => void;
};

export type CommandPaletteProps = {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss?: () => void;
  open?: boolean;
  placeholder?: string;
  emptyLabel?: string;
  label?: string;
  maxRows?: number;
  autoFocus?: boolean;
  className?: string;
  scopes?: string[];
  activeScope?: string;
  onScopeChange?: (scope: string) => void;
};
