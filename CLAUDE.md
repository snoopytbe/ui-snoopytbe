# @snoopytbe/ui — Instructions pour Claude

Package npm `@snoopytbe/ui`. Bibliothèque de composants React 18 partagés, TypeScript strict, bundlée avec tsup (ESM + CJS + DTS), stylisée avec Tailwind CSS (fourni par l'hôte), testée avec Vitest.

---

## Architecture

Chaque composant dans `src/components/ComponentName/` :
- `ComponentName.tsx` — composant principal
- `types.ts` — types du composant
- `styles.ts` — classes Tailwind (omis si composant délégateur pur)
- `ComponentName.test.tsx` — tests unitaires

Hooks dans `src/hooks/`. Styles partagés entre composants dans `src/styles/`.

---

## Conventions de nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composant (dossier + fichier) | PascalCase | `BalanceCard/BalanceCard.tsx` |
| Hook | `camelCase` préfixé `use` | `useToast.ts` |
| Types composant | `types.ts` | `types.ts` |
| Types hook | `useHookName.types.ts` | `useContextMenu.types.ts` |
| Styles locaux | `styles.ts` | `styles.ts` |
| Styles partagés | `camelCaseStyles.ts` | `buttonStyles.ts` |

---

## Ordre des imports (obligatoire)

```typescript
// 1. React
import React from "react";
// 2. Bibliothèques externes
import { format } from "date-fns";
// 3. Composants / hooks frères (../) — 1 niveau max
import { ProgressBarCard } from "../ProgressBarCard/ProgressBarCard";
// 4. Styles partagés
import { buttonStyles } from "../../styles";
// 5. Types et styles locaux
import type { BalanceCardProps } from "./types";
import { balanceCardStyles } from "./styles";
```

Règles :
- Imports relatifs uniquement — pas d'aliases TypeScript (`@calendar`, `@ui`…)
- `import type {}` toujours séparé des imports de valeurs
- Jamais plus de 2 niveaux vers le haut (`../../..` interdit)
- Jamais d'`export default` — toujours `export const`

---

## Styles

```typescript
// styles.ts — toujours avec as const
export const balanceCardStyles = {
  container: "bg-white rounded-lg p-4",
} as const;
```

- Ne jamais importer le `styles.ts` d'un autre composant
- Utiliser `src/styles/` pour les tokens partagés entre composants
- Composant délégateur (aucune classe Tailwind propre) : omettre `styles.ts` et documenter avec `@remarks Composant délégateur — pas de styles propres`

---

## Règles strictes

- Pas d'`any` sans `// @ts-expect-error: raison` explicite
- Tous les commentaires et JSDoc en **français**
- JSDoc obligatoire sur tous les exports publics
- Fichiers < 300 lignes — au-delà, diviser en unités plus petites
- Pas de `console.log` — uniquement `console.error` / `console.warn`

---

## Checklist pré-commit

Avant tout commit, vérifier :

```bash
npm run typecheck   # zéro erreur TypeScript
npm run build       # ESM, CJS et DTS générés sans erreur
npm test            # tous les tests passent
npm run lint        # zéro avertissement
```

- Nouveaux exports ajoutés dans `src/index.ts`
- JSDoc présent sur tous les exports publics
- Pas de `console.log` introduit

---

## Versioning et publication

- **Créer une entrée de changelog + bumper la version :**
  ```bash
  npm run change    # appelle changeset puis changeset version
  ```
- **Tester localement dans un autre projet avant publication (yalc) :**
  ```bash
  npm run build && yalc push
  # dans le projet consommateur : yalc add @snoopytbe/ui
  ```
- **Publier sur npm :**
  ```bash
  npm run release   # build + yalc push + changeset publish
  ```
