/**
 * @fileoverview Types pour le composant générique ProgressBarCard
 * @module ui/components/ProgressBarCard/types
 */

export interface ProgressBarSegment {
    /** Identifiant unique du segment */
    id: string;
    /** Valeur absolue représentant la taille du segment (ex: jours, points...) */
    value: number;
    /** Classe CSS Tailwind pour la couleur de fond (ex: "bg-sky-500") */
    colorClass: string;
    /** Texte affiché au survol du segment (optionnel) */
    tooltipPattern?: string;
}

export interface ProgressBarLegendItem {
    /** Identifiant unique de l'élément de légende */
    id: string;
    /** Libellé affiché dans la légende */
    label: string;
    /** Composant ou texte représentant la valeur */
    value: React.ReactNode;
    /** Classe CSS Tailwind pour la puce de couleur (optionnel, affichera blanc si non fourni) */
    colorClass?: string;
    /** Classe CSS Tailwind pour le texte de la valeur (optionnel) */
    valueColorClass?: string;
}

export interface ProgressBarCardProps {
    /** Titre principal de la carte */
    title: string;
    /** Sous-titre textuel ou composant affiché en haut à droite (optionnel) */
    subtitle?: React.ReactNode;
    /** Liste ordonnée des segments composant la barre de progression */
    segments: ProgressBarSegment[];
    /** 
     * Valeur totale de la barre servant de base de calcul aux pourcentages.
     * Doit être supérieure ou égale à la somme des `value` des segments.
     */
    total: number;
    /** Liste des éléments de légende à afficher en dessous de la barre */
    legendItems: ProgressBarLegendItem[];
}
