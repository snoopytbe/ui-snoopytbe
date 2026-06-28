# Référence des composants — @snoopytbe/ui

Documentation complète de tous les composants, hooks et styles exportés par la bibliothèque.

---

## Sommaire

- [Providers](#providers)
  - [ThemeProvider](#themeprovider)
  - [ThemeToggle](#themetoggle)
  - [ToastProvider](#toastprovider)
- [Layout](#layout)
  - [AppBar](#appbar)
  - [SidePanel](#sidepanel)
  - [ControlCenter](#controlcenter)
- [Données](#données)
  - [Card](#card)
  - [BalanceCard](#balancecard)
  - [ProgressBarCard](#progressbarcard)
  - [PreviewCard](#previewcard)
  - [Legend](#legend)
- [Formulaires](#formulaires)
  - [DateInput](#dateinput)
  - [SelectField](#selectfield)
  - [NumberStepper](#numberstepper)
- [Navigation et menus](#navigation-et-menus)
  - [UserMenu](#usermenu)
  - [AccordionSection](#accordionsection)
- [Feedback](#feedback)
  - [Pill](#pill)
  - [LoadingIndicator](#loadingindicator)
  - [ErrorBoundary](#errorboundary)
- [Hooks](#hooks)
  - [useTheme](#usetheme)
  - [useToast](#usetoast)
  - [useContextMenu](#usecontextmenu)
- [Styles partagés](#styles-partagés)

---

## Providers

### ThemeProvider

Contexte global de gestion du thème clair / sombre. Persiste la préférence dans `localStorage` et suit automatiquement les préférences système si `"system"` est sélectionné.

Doit être placé **au plus haut niveau** de l'arborescence pour que `useTheme` fonctionne partout.

```tsx
import { ThemeProvider } from "@snoopytbe/ui";

<ThemeProvider defaultTheme="system" storageKey="mon-app-theme">
  <App />
</ThemeProvider>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | — | Contenu de l'application |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Thème appliqué si aucune valeur n'est en `localStorage` |
| `storageKey` | `string` | `"snoopytbe-ui-theme"` | Clé `localStorage` utilisée pour la persistance |

#### Types exportés

```ts
type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;           // préférence choisie
  resolvedTheme: ResolvedTheme; // thème réellement appliqué
  setTheme: (theme: Theme) => void;
}
```

---

### ThemeToggle

Bouton iconique pour basculer entre le thème clair et sombre. Doit être placé dans un enfant de `ThemeProvider`. Affiche une icône soleil en mode clair et une icône lune en mode sombre.

```tsx
import { ThemeToggle } from "@snoopytbe/ui";

<ThemeToggle className="ml-4" data-testid="theme-btn" />
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `className` | `string` | — | Classes CSS additionnelles |
| `data-testid` | `string` | — | Identifiant pour les tests |

---

### ToastProvider

Système de notifications contextuelles. Expose `showToast` via le hook `useToast` à tous les composants enfants.

```tsx
import { ToastProvider } from "@snoopytbe/ui";

<ToastProvider>
  <App />
</ToastProvider>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Contenu de l'application |

#### Types exportés

```ts
interface ToastState {
  open: boolean;
  message: string;
  severity: "info" | "success" | "warning" | "error";
}
```

---

## Layout

### AppBar

Barre d'application supérieure. Accepte un logo à gauche, des actions à droite, et du contenu central libre.

```tsx
import { AppBar } from "@snoopytbe/ui";

<AppBar
  logo={<img src="/logo.svg" alt="Logo" />}
  rightActions={<UserMenu user={currentUser} onSignOut={handleSignOut} />}
>
  <nav>...</nav>
</AppBar>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `logo` | `ReactNode` | Composant affiché à gauche |
| `rightActions` | `ReactNode` | Composant(s) affiché(s) à droite |
| `children` | `ReactNode` | Contenu central (navigation, titre…) |
| `className` | `string` | Classes CSS additionnelles |

---

### SidePanel

Panneau latéral animé (drawer) avec poignée cliquable, header, footer sticky et fermeture au clic extérieur.

```tsx
import { SidePanel } from "@snoopytbe/ui";

const [isOpen, setIsOpen] = useState(false);

<SidePanel
  title="Filtres"
  label="Filtres"
  isOpen={isOpen}
  onToggle={setIsOpen}
  footer={<button onClick={handleApply}>Appliquer</button>}
  handleColor="from-violet-400 to-violet-500"
>
  <FilterForm />
</SidePanel>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | — | Contenu du panneau |
| `title` | `string` | — | Titre affiché dans le header |
| `label` | `string` | — | Texte de la poignée (rotatif) |
| `isOpen` | `boolean` | — | État d'ouverture (contrôlé) |
| `onToggle` | `(isOpen: boolean) => void` | — | Callback de changement d'état |
| `closeOnClickOutside` | `boolean` | `true` | Fermeture au clic hors panneau |
| `width` | `string` | `"370px"` | Largeur quand ouvert |
| `footer` | `ReactNode` | — | Contenu sticky en bas du panneau |
| `handleColor` | `string` | `"from-violet-400 to-violet-500"` | Classes Tailwind du gradient de la poignée |
| `handlePosition` | `"top" \| "center" \| "bottom"` | `"center"` | Position verticale de la poignée |
| `hidden` | `boolean` | — | Masque le panneau et sa poignée |
| `handleStyle` | `CSSProperties` | — | Styles inline pour décalage manuel de la poignée |

---

### ControlCenter

Panneau latéral composite affichant une liste de `BalanceCard`. Construit sur `SidePanel`.

```tsx
import { ControlCenter } from "@snoopytbe/ui";

<ControlCenter
  title="Suivi des soldes"
  label="Soldes"
  isOpen={isOpen}
  onToggle={setIsOpen}
  items={[
    {
      id: "ca",
      label: "Congés annuels",
      shortLabel: "CA",
      color: "bg-sky-500",
      stats: { start, end, hasQuota: true, initialBalance: 25, consumed: 10, planned: 3, remainingEndOfPeriod: 12 },
    },
  ]}
/>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | — | Titre du panneau |
| `label` | `string` | — | Texte de la poignée |
| `items` | `ControlCenterItem[]` | — | Liste des éléments à afficher |
| `isOpen` | `boolean` | — | État d'ouverture |
| `onToggle` | `(isOpen: boolean) => void` | — | Callback de changement d'état |
| `handleColor` | `string` | — | Gradient Tailwind de la poignée |
| `handlePosition` | `"top" \| "center" \| "bottom"` | — | Position verticale de la poignée |
| `hidden` | `boolean` | — | Masquer le panneau |
| `handleStyle` | `CSSProperties` | — | Styles inline de la poignée |

#### Type `ControlCenterItem`

```ts
interface ControlCenterItem {
  id: string;
  label: string;
  shortLabel?: string;
  color?: string;       // classe Tailwind (ex: "bg-sky-500")
  stats: BalanceStats;
}
```

---

## Données

### Card

Carte générique cliquable avec titre, sous-titre et état sélectionné.

```tsx
import { Card } from "@snoopytbe/ui";

<Card
  title="Projet Alpha"
  subtitle="En cours"
  isSelected={selected === "alpha"}
  colorClass="bg-sky-100"
  onClick={() => setSelected("alpha")}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Titre principal |
| `subtitle` | `string` | Texte secondaire |
| `isSelected` | `boolean` | État sélectionné |
| `colorClass` | `string` | Classe Tailwind de couleur de fond |
| `className` | `string` | Classes CSS additionnelles |
| `onClick` | `() => void` | Callback au clic |
| `disabled` | `boolean` | Désactive l'interaction |

---

### BalanceCard

Carte affichant le solde d'un type de congé ou quota pour une période donnée (initial, consommé, planifié, restant).

```tsx
import { BalanceCard } from "@snoopytbe/ui";

<BalanceCard
  label="Congés annuels"
  shortLabel="CA"
  color="bg-sky-500"
  stats={{
    start: new Date("2025-01-01"),
    end: new Date("2025-12-31"),
    hasQuota: true,
    initialBalance: 25,
    consumed: 10,
    planned: 3,
    remainingEndOfPeriod: 12,
  }}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Libellé complet |
| `shortLabel` | `string` | Abréviation (ex: "CA", "RTT") |
| `color` | `string` | Classe Tailwind de couleur de fond |
| `stats` | `BalanceStats` | Données de solde |

#### Type `BalanceStats`

```ts
interface BalanceStats {
  start: Date;
  end: Date;
  hasQuota: boolean;
  initialBalance: number;
  consumed: number;
  planned: number;
  remainingEndOfPeriod: number;
}
```

---

### ProgressBarCard

Carte avec barre de progression multi-segments et légende associée. Idéale pour visualiser une répartition (jours pris / planifiés / restants…).

```tsx
import { ProgressBarCard } from "@snoopytbe/ui";

<ProgressBarCard
  title="Congés annuels"
  subtitle="2025"
  total={25}
  segments={[
    { id: "consumed", value: 10, colorClass: "bg-sky-500", tooltipPattern: "{value} j pris" },
    { id: "planned",  value: 3,  colorClass: "bg-amber-400", tooltipPattern: "{value} j planifiés" },
  ]}
  legendItems={[
    { id: "consumed", label: "Pris",       value: "10 j", colorClass: "bg-sky-500" },
    { id: "planned",  label: "Planifiés",  value: "3 j",  colorClass: "bg-amber-400" },
    { id: "left",     label: "Restants",   value: "12 j" },
  ]}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Titre de la carte |
| `subtitle` | `ReactNode` | Sous-titre ou composant affiché en haut à droite |
| `segments` | `ProgressBarSegment[]` | Segments de la barre |
| `total` | `number` | Base de calcul des pourcentages (≥ somme des valeurs) |
| `legendItems` | `ProgressBarLegendItem[]` | Éléments de légende |

#### Types

```ts
interface ProgressBarSegment {
  id: string;
  value: number;
  colorClass: string;        // ex: "bg-sky-500"
  tooltipPattern?: string;   // ex: "{value} jours"
}

interface ProgressBarLegendItem {
  id: string;
  label: string;
  value: ReactNode;
  colorClass?: string;       // puce de couleur
  valueColorClass?: string;  // couleur du texte valeur
}
```

---

### PreviewCard

Carte avec état de chargement, variante visuelle et icône.

```tsx
import { PreviewCard } from "@snoopytbe/ui";

<PreviewCard title="Aperçu" icon="📊" variant="info" isLoading={loading}>
  <Chart />
</PreviewCard>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | — | Titre de la carte |
| `children` | `ReactNode` | — | Contenu |
| `icon` | `string` | — | Emoji ou caractère d'icône |
| `className` | `string` | — | Classes CSS additionnelles |
| `isLoading` | `boolean` | — | Affiche un indicateur de chargement |
| `variant` | `"default" \| "info" \| "warning" \| "error"` | `"default"` | Style visuel de la carte |

---

### Legend

Légende interactive pour un graphique ou une barre. Les éléments peuvent être cliquables pour masquer/afficher des séries.

```tsx
import { Legend } from "@snoopytbe/ui";

<Legend
  items={[
    { id: "ca", label: "Congés annuels", shortLabel: "CA", color: "bg-sky-500" },
    { id: "rtt", label: "RTT", shortLabel: "RTT", color: "bg-violet-500" },
  ]}
  hiddenTypes={hiddenTypes}
  onToggleType={(id) => toggleType(id)}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `LegendItem[]` | Éléments de la légende |
| `hiddenTypes` | `string[]` | IDs des éléments masqués |
| `onToggleType` | `(type: string) => void` | Callback au clic sur un élément |

#### Type `LegendItem`

```ts
interface LegendItem {
  id: string;
  label: string;
  shortLabel?: string;
  color?: string;          // classe Tailwind
  stats?: BalanceStats;
}
```

---

## Formulaires

### DateInput

Champ de saisie de date avec label, message d'aide, erreur et contraintes min/max.

```tsx
import { DateInput } from "@snoopytbe/ui";

<DateInput
  id="start-date"
  label="Date de début"
  value={value}
  onChange={setValue}
  min="2025-01-01"
  max="2025-12-31"
  required
  error={errors.startDate}
  helpText="Format JJ/MM/AAAA"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Identifiant du champ (lié au label) |
| `label` | `string` | Libellé du champ |
| `value` | `string` | Valeur ISO (`"YYYY-MM-DD"`) |
| `onChange` | `(value: string) => void` | Callback de changement |
| `error` | `string` | Message d'erreur (affiche le champ en erreur) |
| `required` | `boolean` | Marque le champ comme obligatoire |
| `min` | `string` | Date minimale (`"YYYY-MM-DD"`) |
| `max` | `string` | Date maximale (`"YYYY-MM-DD"`) |
| `disabled` | `boolean` | Désactive le champ |
| `helpText` | `string` | Texte d'aide sous le champ |
| `className` | `string` | Classes CSS additionnelles |

---

### SelectField

Liste déroulante stylisée (Radix UI) avec label, placeholder, erreur et options désactivables.

```tsx
import { SelectField } from "@snoopytbe/ui";

<SelectField
  id="status"
  label="Statut"
  value={status}
  onChange={setStatus}
  placeholder="Choisir un statut"
  options={[
    { value: "active",   label: "Actif" },
    { value: "inactive", label: "Inactif", disabled: true },
  ]}
  error={errors.status}
  required
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Identifiant du champ |
| `label` | `string` | Libellé |
| `value` | `string` | Valeur sélectionnée |
| `options` | `SelectOption[]` | Liste des options |
| `onChange` | `(value: string) => void` | Callback de sélection |
| `error` | `string` | Message d'erreur |
| `required` | `boolean` | Champ obligatoire |
| `placeholder` | `string` | Texte affiché si aucune valeur |
| `disabled` | `boolean` | Désactive le champ |
| `className` | `string` | Classes CSS additionnelles |

#### Type `SelectOption`

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

---

### NumberStepper

Champ numérique avec boutons `+` / `-` et contraintes min/max.

```tsx
import { NumberStepper } from "@snoopytbe/ui";

<NumberStepper
  value={quantity}
  onChange={(v) => setQuantity(Number(v))}
  min={1}
  max={30}
  ariaLabel="Nombre de jours"
/>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `number` | — | Valeur actuelle |
| `onChange` | `(value: string) => void` | — | Callback de changement |
| `ariaLabel` | `string` | — | Label d'accessibilité |
| `disabled` | `boolean` | — | Désactive le champ et les boutons |
| `min` | `number` | `1` | Valeur minimale |
| `max` | `number` | — | Valeur maximale |

---

## Navigation et menus

### UserMenu

Menu déroulant utilisateur avec avatar (image ou initiales), nom, email et action de déconnexion.

```tsx
import { UserMenu } from "@snoopytbe/ui";

<UserMenu
  user={{
    given_name: "Alice",
    email: "alice@example.com",
    picture: "https://example.com/avatar.jpg",
  }}
  onSignOut={() => signOut()}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `user.given_name` | `string` | Prénom affiché |
| `user.email` | `string` | Email affiché |
| `user.picture` | `string` | URL de l'avatar (optionnel — initiale sinon) |
| `onSignOut` | `() => void` | Callback de déconnexion |

---

### AccordionSection

Section pliable contrôlée ou autonome, avec titre, sous-titre et icône.

```tsx
import { AccordionSection } from "@snoopytbe/ui";

// Mode autonome (état géré en interne)
<AccordionSection
  titre="Paramètres avancés"
  sousTitre="3 options configurées"
  icone={<SettingsIcon />}
  ouvertParDefaut={false}
>
  <AdvancedSettings />
</AccordionSection>

// Mode contrôlé
<AccordionSection
  titre="Filtres"
  estOuvert={isOpen}
  auChangement={setIsOpen}
>
  <Filters />
</AccordionSection>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `titre` | `string` | — | Titre de la section |
| `sousTitre` | `string \| ReactNode` | — | Sous-titre visible quand fermé |
| `icone` | `ReactNode` | — | Icône à gauche du titre |
| `children` | `ReactNode` | — | Contenu affiché quand ouvert |
| `id` | `string` | — | Clé unique (mode contrôlé) |
| `estOuvert` | `boolean` | — | État contrôlé par le parent |
| `auChangement` | `(estOuvert: boolean) => void` | — | Callback de changement d'état |
| `ouvertParDefaut` | `boolean` | `false` | État initial si non contrôlé |

---

## Feedback

### Pill

Badge / étiquette colorée, optionnellement cliquable ou supprimable.

```tsx
import { Pill } from "@snoopytbe/ui";

<Pill variant="success" size="medium">
  Validé
</Pill>

<Pill variant="error" onRemove={() => removeTag(id)}>
  Urgent
</Pill>
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | — | Contenu de la pill |
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Style visuel |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Taille |
| `icon` | `ReactNode` | — | Icône affichée avant le texte |
| `onClick` | `() => void` | — | Rend la pill cliquable |
| `onRemove` | `() => void` | — | Affiche un bouton de suppression |
| `disabled` | `boolean` | — | Désactive les interactions |
| `className` | `string` | — | Classes CSS additionnelles |
| `aria-label` | `string` | — | Label d'accessibilité |

---

### LoadingIndicator

Indicateur de chargement animé (trois points). Peut être affiché en ligne ou en overlay plein écran.

```tsx
import { LoadingIndicator } from "@snoopytbe/ui";

{isLoading ? <LoadingIndicator /> : <Content />}

// Plein écran avec overlay fixe
<LoadingIndicator fullscreen />
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `fullscreen` | `boolean` | `false` | Affiche l'indicateur en overlay fixe couvrant tout l'écran |

---

### ErrorBoundary

Capture les erreurs React enfant et affiche un fallback. Prend en charge un callback `onError` pour le reporting.

```tsx
import { ErrorBoundary } from "@snoopytbe/ui";

<ErrorBoundary
  fallback={<p>Une erreur est survenue.</p>}
  onError={(error, info) => reportToSentry(error, info)}
>
  <RiskyComponent />
</ErrorBoundary>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Contenu protégé |
| `fallback` | `ReactNode` | UI affichée en cas d'erreur |
| `onError` | `(error: Error, errorInfo: ErrorInfo) => void` | Callback de reporting |

---

## Hooks

### useTheme

Accède au thème courant et permet de le modifier. Doit être utilisé dans un enfant de `ThemeProvider`.

```tsx
import { useTheme } from "@snoopytbe/ui";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? "Mode clair" : "Mode sombre"}
    </button>
  );
}
```

#### Valeurs retournées

| Valeur | Type | Description |
|--------|------|-------------|
| `theme` | `"light" \| "dark" \| "system"` | Préférence enregistrée |
| `resolvedTheme` | `"light" \| "dark"` | Thème réellement appliqué |
| `setTheme` | `(theme: Theme) => void` | Met à jour et persiste la préférence |

---

### useToast

Déclenche une notification depuis n'importe quel composant enfant de `ToastProvider`.

```tsx
import { useToast } from "@snoopytbe/ui";

function SaveButton() {
  const { showToast } = useToast();

  const handleSave = async () => {
    try {
      await save();
      showToast({ message: "Sauvegarde réussie", severity: "success" });
    } catch {
      showToast({ message: "Erreur lors de la sauvegarde", severity: "error" });
    }
  };

  return <button onClick={handleSave}>Enregistrer</button>;
}
```

#### Valeurs retournées

| Valeur | Type | Description |
|--------|------|-------------|
| `showToast` | `(toast: { message: string; severity: "info" \| "success" \| "warning" \| "error" }) => void` | Affiche une notification |

---

### useContextMenu

Gestion d'un menu contextuel au clic droit sur une cellule de tableau.

```tsx
import { useContextMenu } from "@snoopytbe/ui";

function TableCell() {
  const { mousePos, activeMenu, openMenu, closeMenu } = useContextMenu();

  return (
    <>
      <td onContextMenu={openMenu}>Contenu</td>
      {activeMenu && (
        <ContextMenu position={mousePos} onClose={closeMenu}>
          <MenuItem>Modifier</MenuItem>
          <MenuItem>Supprimer</MenuItem>
        </ContextMenu>
      )}
    </>
  );
}
```

#### Valeurs retournées

| Valeur | Type | Description |
|--------|------|-------------|
| `mousePos` | `{ mouseX: number; mouseY: number }` | Position du curseur au moment du clic droit |
| `activeMenu` | `boolean` | Indique si le menu est visible |
| `openMenu` | `(event: MouseEvent<HTMLTableCellElement>) => void` | Ouvre le menu et mémorise la position |
| `closeMenu` | `() => void` | Ferme le menu |

---

## Styles partagés

Des objets de classes Tailwind prédéfinis sont exportés pour assurer une cohérence visuelle entre les composants consommateurs.

### `buttonStyles`

Classes pour les boutons — variantes, tailles et états.

```ts
import { buttonStyles } from "@snoopytbe/ui";

<button className={`${buttonStyles.base} ${buttonStyles.primary}`}>
  Valider
</button>
```

Clés disponibles : `base`, `primary`, `secondary`, `danger`, `success`, `warning`, `small`, `medium`, `large`, `disabled`, `loading`, `icon`, `fab`, `nav`, `form`, `formPrimary`, `formSecondary`.

---

### `dialogStyles`

Classes pour les boîtes de dialogue et modales (overlay, conteneur, titre, boutons…).

```ts
import { dialogStyles } from "@snoopytbe/ui";

<div className={dialogStyles.overlay} />
<div className={dialogStyles.content}>
  <h2 className={dialogStyles.title}>Titre</h2>
  ...
</div>
```

---

### `formStyles`

Classes pour les formulaires (labels, inputs, selects, checkboxes, messages d'aide…).

```ts
import { formStyles } from "@snoopytbe/ui";

<label className={formStyles.label}>Nom</label>
<input className={`${formStyles.input} ${formStyles.inputNormal}`} />
<span className={formStyles.errorText}>Champ requis</span>
```

---

### `validationStyles`

Classes pour les messages de validation (erreur, avertissement, succès, information).

```ts
import { validationStyles } from "@snoopytbe/ui";

<div className={validationStyles.errorContainer}>
  <p className={validationStyles.errorText}>Valeur invalide</p>
</div>
```

---

### `drawerStyles` / `selectStyles`

Styles dédiés aux drawers et aux selects natifs. Suivent la même convention `as const`.

```ts
import { drawerStyles, selectStyles } from "@snoopytbe/ui";
```
