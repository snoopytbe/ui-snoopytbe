/**
 * @fileoverview Types pour Pill
 */

export type PillVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type PillSize = 'small' | 'medium' | 'large';

export interface PillProps {
  children: React.ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  icon?: React.ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}
