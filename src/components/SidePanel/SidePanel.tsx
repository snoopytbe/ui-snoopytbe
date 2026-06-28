/**
 * @fileoverview Composant SidePanel - Panneau latéral avec poignée escamotable
 * @module ui/components/SidePanel
 */

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { sidePanelStyles } from "./styles";
import type { SidePanelProps } from "./types";

/**
 * Panneau latéral escamotable avec poignée et animation.
 * Basé sur le design du ControlCenter.
 * @returns Panneau latéral animé avec poignée et contenu optionnel
 */
export const SidePanel: React.FC<SidePanelProps> = ({
    children,
    title,
    label,
    isOpen,
    onToggle,
    closeOnClickOutside = true,
    width = "370px",
    footer,
    handleColor = "from-violet-400 to-violet-500",
    handlePosition = "center",
    hidden = false,
    handleStyle,
}) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const isOpenRef = useRef(isOpen);

    // Mettre à jour la ref pour l'event listener
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    // Gestion du clic en dehors pour fermer
    useEffect(() => {
        if (!closeOnClickOutside) return;

        const handleClickOutside = (event: MouseEvent) => {
            // Ignorer les clics autres que le bouton principal (gauche)
            if (event.button !== 0) return;

            // Ignorer les clics dans les portals Radix UI (Select, Dialog, etc.)
            // qui sont rendus hors du DOM du panel mais appartiennent logiquement à son contenu
            const target = event.target as HTMLElement;
            const isRadixPortal =
                target.closest('[data-radix-popper-content-wrapper]') !== null ||
                target.closest('[role="listbox"]') !== null ||
                target.closest('[role="option"]') !== null ||
                target.closest('[data-radix-select-content]') !== null;
            if (isRadixPortal) return;

            if (
                isOpenRef.current &&
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                handleRef.current &&
                !handleRef.current.contains(event.target as Node)
            ) {
                onToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onToggle, closeOnClickOutside]);

    if (hidden) return null;

    const positionClass = sidePanelStyles.handlePosition[handlePosition];

    return (
        <div className={sidePanelStyles.container}>
            {/* Poignée + panneau réunis dans le même motion.div pour se déplacer ensemble */}
            <motion.div
                className={`${sidePanelStyles.motionWrapper} ${positionClass}`}
                initial={{ x: "calc(100% - 2.5rem)" }}
                animate={{ x: isOpen ? 0 : "calc(100% - 2.5rem)" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                {/* Poignée : bord gauche du bloc animé */}
                <div
                    ref={handleRef}
                    className={`${sidePanelStyles.handle.base} ${handleColor}`}
                    style={handleStyle}
                    onClick={() => onToggle(!isOpen)}
                    role="button"
                    tabIndex={0}
                    aria-label={isOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onToggle(!isOpen);
                        }
                    }}
                >
                    <span className={sidePanelStyles.handle.label}>{label}</span>
                </div>

                {/* Contenu du panneau */}
                <div
                    ref={panelRef}
                    className={sidePanelStyles.panel.base}
                    style={{ width }}
                >
                    {/* Header */}
                    <div className={sidePanelStyles.panel.header}>
                        <h2 className={sidePanelStyles.panel.title}>{title}</h2>
                    </div>

                    {/* Contenu */}
                    <div className={sidePanelStyles.panel.content}>
                        {children}
                    </div>

                    {/* Footer optionnel */}
                    {footer && (
                        <div className={sidePanelStyles.panel.footer}>
                            {footer}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
