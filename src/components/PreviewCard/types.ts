/**
 * @fileoverview Types pour le composant PreviewCard
 */

export interface PreviewCardProps {
    title: string;
    children: React.ReactNode;
    icon?: string;
    className?: string;
    isLoading?: boolean;
    variant?: 'default' | 'info' | 'warning' | 'error';
}
