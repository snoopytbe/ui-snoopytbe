# 📚 ui-snoopytbe — Guide de Contribution

> Package npm `@snoopytbe/ui` — Bibliothèque de composants React partagés.

---

## 🛠️ Stack

| Outil | Version | Rôle |
|-------|---------|------|
| React | 18.3+ | Peer dependency |
| TypeScript | 5.8+ | Typage strict |
| tsup | 8+ | Bundler ESM + CJS + DTS |
| Tailwind CSS | 4.1+ | Styling (fourni par l'hôte) |
| Vitest | 1.3+ | Tests unitaires |
| @radix-ui | latest | Primitives UI accessibles |

---

## 📐 Architecture

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── types.ts
│       ├── styles.ts          # Omis si composant délégateur pur
│       └── ComponentName.test.tsx
├── hooks/
│   ├── useHookName.ts
│   ├── useHookName.types.ts
│   └── useHookName.test.ts
├── services/                  # Logique métier pure (optionnel)
│   ├── monService.ts
│   └── monService.test.ts
├── styles/                    # Styles partagés entre composants
│   ├── buttonStyles.ts
│   └── index.ts
└── index.ts                   # API publique du package
```

---

## 📝 Conventions de Nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composant (dossier/fichier) | `PascalCase` | `BalanceCard/BalanceCard.tsx` |
| Hook | `camelCase` + `use` | `useToast.ts` |
| Types de composant | `types.ts` | `types.ts` |
| Types de hook | `useHookName.types.ts` | `useContextMenu.types.ts` |
| Styles locaux | `styles.ts` | `styles.ts` |
| Styles partagés | `camelCase` + `Styles` | `buttonStyles.ts` |
| Service | `camelCase` + `Service` | `calendarCellService.ts` |
| Tests | Nom source + `.test` | `BalanceCard.test.tsx` |
| JSDoc @module | `ui/[chemin]` | `ui/components/BalanceCard` |

---

## 📦 Règles d'Imports

Ce package **n'a pas d'aliases TypeScript**. Seuls les imports relatifs sont utilisés.

### Ordre obligatoire

```typescript
// 1. React
import React from "react";
// 2. Bibliothèques externes
import { format } from "date-fns";
// 3. Composants / hooks frères (../)  ← autorisé à 1 niveau
import { ProgressBarCard } from "../ProgressBarCard/ProgressBarCard";
// 4. Styles partagés
import { buttonStyles } from "../../styles";
// 5. Types et styles locaux
import type { BalanceCardProps } from "./types";
import { balanceCardStyles } from "./styles";
```

### Règles

| Cas | Statut |
|-----|--------|
| Import même dossier `./` | ✅ Toujours |
| Import frère `../Component/` | ✅ 1 niveau max |
| Plus de 2 niveaux `../../..` | ❌ Interdit |
| Aliases de l'hôte (`@calendar`, `@ui`…) | ❌ Interdit |
| `export default` | ❌ Interdit |
| `import type {}` séparé | ✅ Obligatoire |

---

## 🎨 Styles

```typescript
// styles.ts — toujours avec as const
export const balanceCardStyles = {
  container: "bg-white rounded-lg p-4",
} as const;
```

**Exception composant délégateur** : si le composant n'applique aucune classe Tailwind, `styles.ts` peut être omis. Documenter avec `@remarks Composant délégateur — pas de styles propres`.

> ⚠️ Ne jamais importer le `styles.ts` d'un autre composant. Passer par `src/styles/` pour les tokens partagés.

---

## 🔒 Règles Strictes

| Règle | ✅ | ❌ |
|-------|---|---|
| Types composant | `types.ts` | `Component.types.ts` |
| Types hook | `useHookName.types.ts` | `types.ts` |
| Styles | `styles.ts` | `Component.styles.ts` |
| Exports | `export const` | `export default` |
| `any` | avec `// @ts-expect-error: raison` | sans justification |
| Commentaires | Français | Anglais |
| JSDoc | Obligatoire sur exports publics | — |
| Taille fichier | < 300 lignes | Au-delà → diviser |

---

## 🧪 Tests

Co-localisation obligatoire : le test est toujours à côté du fichier source.

```bash
npm test                  # Tous les tests
npx vitest --changed      # Fichiers modifiés seulement
npm run test:coverage     # Couverture
```

---

## 🔧 Checklist avant de commiter

- [ ] `npm run typecheck` — zéro erreur TypeScript
- [ ] `npm run build` — ESM, CJS et DTS générés
- [ ] `npm test` — tous les tests passent
- [ ] `npm run lint` — zéro avertissement
- [ ] Nouveaux exports ajoutés dans `src/index.ts`
- [ ] JSDoc présent sur tous les exports publics
- [ ] Pas de `console.log` (seulement `console.error` / `console.warn`)

---

## 🚀 Versioning (SemVer)

| Changement | Bump |
|------------|------|
| Correctif sans impact API | `patch` → `npm version patch` |
| Nouvelle feature rétrocompatible | `minor` → `npm version minor` |
| Changement cassant / suppression export | `major` → `npm version major` |

Publier : `npm run typecheck && npm run build && npm test && npm publish`

---

**Version** : 1.0.0 · **Package** : `@snoopytbe/ui` · **Mis à jour** : 2026-03-11
