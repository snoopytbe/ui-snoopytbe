/**
 * @fileoverview Types pour le composant AppBar
 * @module AppBar/types
 */

import type { ReactNode } from "react";

/**
 * Props du composant AppBar
 */
export interface AppBarProps {
    logo?: ReactNode;
    rightActions?: ReactNode;
    children?: ReactNode;
    className?: string;
}
