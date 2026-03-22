/**
 * @fileoverview Définition des types pour le composant Card
 * @module ui/components/Card/types
 */

export interface CardProps {
    /** Titre principal affiché sur la carte */
    title: string;
    /** Texte additionnel affiché sous le titre */
    subtitle?: string;
    /** Détermine si la carte est dans un état sélectionné */
    isSelected?: boolean;
    /** Classe utilitaire optionnelle pour personnaliser la couleur (ex: Tailwind) */
    colorClass?: string;
    /** Classe(s) CSS additionnelle(s) pour surcharger ou étendre le style de base */
    className?: string;
    /** Callback déclenché lors du clic sur la carte */
    onClick?: () => void;
    /** Détermine si la carte est désactivée */
    disabled?: boolean;
}
