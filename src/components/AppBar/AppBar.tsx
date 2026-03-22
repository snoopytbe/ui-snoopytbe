/**
 * @fileoverview Barre d'application principale
 * @module AppBar
 */

import * as Toolbar from '@radix-ui/react-toolbar';
import { appBarStyles } from "./styles";
import type { AppBarProps } from "./types";

export const AppBar: React.FC<AppBarProps> = ({
    logo,
    rightActions,
    children,
    className = "",
}) => {
    return (
        <div className={className}>
            {/* Barre d'application principale */}
            <Toolbar.Root
                className={appBarStyles.bar}
                aria-label="Barre d'application principale"
            >
                <div className={appBarStyles.barContent}>
                    <div className={appBarStyles.barContainer}>
                        <div className={appBarStyles.logo}>
                            {logo}
                        </div>
                        <div className="flex-grow">
                            {children}
                        </div>
                        <div className={appBarStyles.actions}>
                            {rightActions}
                        </div>
                    </div>
                </div>
            </Toolbar.Root>
        </div>
    );
};
