/**
 * @fileoverview Composant AccordionSection - Section accordéon pliable
 * @module ui/components/AccordionSection
 */

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { accordionStyles } from "./styles";
import type { AccordionSectionProps } from "./types";

/**
 * Section accordéon avec en-tête cliquable et contenu pliable.
 */
export const AccordionSection: React.FC<AccordionSectionProps> = ({
    titre,
    sousTitre,
    icone,
    children,
    estOuvert: estControleOuvert,
    auChangement,
    ouvertParDefaut = false,
}) => {
    const estControle = estControleOuvert !== undefined;
    const [estOuvertInterne, setEstOuvertInterne] = useState(ouvertParDefaut);

    const estOuvertLocal = estControle ? estControleOuvert : estOuvertInterne;

    const gererBascule = () => {
        if (estControle) {
            auChangement?.(!estOuvertLocal);
        } else {
            setEstOuvertInterne(!estOuvertLocal);
            auChangement?.(!estOuvertLocal);
        }
    };

    return (
        <div className={accordionStyles.section}>
            <button
                type="button"
                className={accordionStyles.button}
                onClick={gererBascule}
                aria-expanded={estOuvertLocal}
            >
                <div className="flex items-center gap-3">
                    {icone && (
                        <div
                            className={`${accordionStyles.iconContainer.base} ${estOuvertLocal
                                ? accordionStyles.iconContainer.open
                                : accordionStyles.iconContainer.closed
                                }`}
                        >
                            {icone}
                        </div>
                    )}
                    <div>
                        <h3 className={accordionStyles.title}>{titre}</h3>
                        {sousTitre && !estOuvertLocal && (
                            <div className={accordionStyles.subtitle}>{sousTitre}</div>
                        )}
                    </div>
                </div>
                <ChevronDown
                    size={20}
                    className={`${accordionStyles.chevron} ${estOuvertLocal ? "rotate-180" : ""}`}
                />
            </button>

            {estOuvertLocal && (
                <div className={accordionStyles.content}>
                    <div className={accordionStyles.contentInner}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
