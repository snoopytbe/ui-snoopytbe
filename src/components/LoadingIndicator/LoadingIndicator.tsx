/**
 * @fileoverview Indicateur de chargement par points animés
 * @module LoadingIndicator
 */

import React from "react";
import { loadingStyles } from "./styles";
import type { LoadingIndicatorProps } from "./types";

/**
 * Indicateur de chargement par points animés
 * Accessible, moderne, stylé Tailwind
 * @example <LoadingIndicator />
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => (
    <div
        className={loadingStyles.containerEyeLevel} 
        role="status"
        aria-label="Chargement en cours"
    >
        <span className={loadingStyles.text}>Chargement en cours</span>
        <div className={loadingStyles.dotsContainer}>
            <span className={loadingStyles.dotFirst}></span>
            <span className={loadingStyles.dotSecond}></span>
            <span className={loadingStyles.dotThird}></span>
        </div>
    </div>
);
