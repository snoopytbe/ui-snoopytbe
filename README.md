# @snoopytbe/ui

Bibliothèque de composants React partagés pour les projets snoopytbe. Construite avec TypeScript strict, stylisée via Tailwind CSS (fourni par l'application hôte), et bundlée en ESM + CJS.

## Prérequis

- React 18+
- Tailwind CSS configuré dans l'application hôte

## Installation

```bash
npm install @snoopytbe/ui
```

> Les styles reposent sur Tailwind CSS. La bibliothèque ne l'embarque pas — c'est à l'application hôte de le fournir et de scanner les classes générées.

### Configuration Tailwind

Ajoutez le dossier `node_modules/@snoopytbe/ui/dist` à la liste des sources à scanner dans votre `tailwind.config.js` (ou `content` en v3) :

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@snoopytbe/ui/dist/**/*.js", // <-- ajouter
  ],
};
```

## Démarrage rapide

Enveloppez votre application avec les providers globaux :

```tsx
import { ThemeProvider, ToastProvider } from "@snoopytbe/ui";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        <YourApp />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Composants

| Composant | Description |
|-----------|-------------|
| `ThemeProvider` | Contexte global clair / sombre — persiste le choix dans `localStorage`, suit les préférences système |
| `ThemeToggle` | Bouton iconique de bascule entre le thème clair et sombre |
| `ToastProvider` | Système de notifications (info, success, warning, error) |
| `AppBar` | Barre d'application supérieure |
| `UserMenu` | Menu utilisateur avec avatar et actions |
| `SidePanel` | Panneau latéral animé (drawer) |
| `AccordionSection` | Section accordéon pliable |
| `Card` | Carte générique |
| `BalanceCard` | Carte de suivi de solde (congés, quotas…) |
| `ProgressBarCard` | Carte avec barre de progression segmentée et légende |
| `PreviewCard` | Carte avec aperçu |
| `ControlCenter` | Panneau de contrôle regroupant plusieurs actions |
| `DateInput` | Champ de saisie de date |
| `SelectField` | Champ de sélection stylisé |
| `NumberStepper` | Champ numérique avec boutons +/- |
| `Pill` | Badge / étiquette colorée |
| `Legend` | Légende associée à un graphique ou une barre |
| `LoadingIndicator` | Indicateur de chargement |
| `ErrorBoundary` | Capture les erreurs React enfant |

## Hooks

| Hook | Description |
|------|-------------|
| `useTheme()` | Accède et modifie le thème courant (`light`, `dark`, `system`) |
| `useToast()` | Déclenche une notification depuis n'importe quel composant enfant |
| `useContextMenu()` | Gestion d'un menu contextuel au clic droit |

## Styles partagés

Des jetons de classes Tailwind prédéfinis sont exportés pour assurer la cohérence visuelle entre composants et applications :

```ts
import {
  buttonStyles,
  dialogStyles,
  drawerStyles,
  formStyles,
  selectStyles,
  validationStyles,
} from "@snoopytbe/ui";
```

## Exemples

### Thème

```tsx
import { useTheme } from "@snoopytbe/ui";

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      Passer en mode {resolvedTheme === "dark" ? "clair" : "sombre"}
    </button>
  );
}
```

### Notifications

```tsx
import { useToast } from "@snoopytbe/ui";

function SaveButton() {
  const { showToast } = useToast();

  const handleSave = async () => {
    await save();
    showToast({ message: "Sauvegarde réussie", severity: "success" });
  };

  return <button onClick={handleSave}>Enregistrer</button>;
}
```

### ProgressBarCard

```tsx
import { ProgressBarCard } from "@snoopytbe/ui";

<ProgressBarCard
  title="Congés annuels"
  total={25}
  segments={[
    { id: "consumed", value: 10, colorClass: "bg-sky-500", tooltipPattern: "{value} jours pris" },
    { id: "planned", value: 5, colorClass: "bg-amber-400", tooltipPattern: "{value} jours planifiés" },
  ]}
  legendItems={[
    { id: "consumed", label: "Pris", value: "10 j", colorClass: "bg-sky-500" },
    { id: "planned", label: "Planifiés", value: "5 j", colorClass: "bg-amber-400" },
    { id: "remaining", label: "Restants", value: "10 j" },
  ]}
/>
```

## Visualisation et test des composants

Storybook offre une interface interactive pour explorer et tester tous les composants :

```bash
npm run storybook
```

S'ouvre sur `http://localhost:6006/`. Chaque composant a plusieurs histoires montrant ses variantes, états et cas d'usage. Utile pour valider les changements avant publication.

## Stack technique

- **React 18** — peer dependency
- **TypeScript** strict
- **Tailwind CSS** — fourni par l'hôte
- **Radix UI** — primitives accessibles (Dialog, Select, Toast, Accordion, Dropdown…)
- **Framer Motion** — animations
- **Lucide React** — icônes
- **tsup** — bundle ESM + CJS + types
- **Vitest** + Testing Library — tests unitaires
- **Storybook** — visualisation et test interactif des composants

## Licence

MIT
