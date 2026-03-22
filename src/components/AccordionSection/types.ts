/**
 * @fileoverview Types pour le composant AccordionSection
 * @module ui/components/AccordionSection/types
 */

import type { ReactNode } from "react";

export interface AccordionSectionProps {
    /**
     * Titre de la section
     */
    titre: string;

    /**
     * Sous-titre affiché quand la section est fermée (optionnel)
     */
    sousTitre?: string | ReactNode;

    /**
     * Icône affichée à gauche du titre (composant React ou élément SVG)
     */
    icone?: ReactNode;

    /**
     * Contenu de la section (affiché quand ouvert)
     */
    children: ReactNode;

    /**
     * Clé unique pour l'état d'ouverture (si contrôlé par parent)
     */
    id?: string;

    /**
     * État d'ouverture (si contrôlé)
     */
    estOuvert?: boolean;

    /**
     * Callback de changement d'état (si contrôlé)
     * @param estOuvert Le nouvel état d'ouverture
     */
    auChangement?: (estOuvert: boolean) => void;

    /**
     * État initial si non contrôlé
     * @default false
     */
    ouvertParDefaut?: boolean;
}
