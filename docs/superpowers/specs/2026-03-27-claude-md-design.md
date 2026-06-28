# Design — CLAUDE.md pour @snoopytbe/ui

**Date** : 2026-03-27
**Sujet** : Initialisation du fichier CLAUDE.md à partir de CONTRIBUTE.md

---

## Objectif

Créer un fichier `CLAUDE.md` à la racine du projet qui encode les conventions de `CONTRIBUTE.md` sous forme de directives directement actionnables par Claude. Le fichier est auto-suffisant (pas de référence à `CONTRIBUTE.md`).

---

## Sections

### 1. Identité du projet
- Nom du package : `@snoopytbe/ui`
- Bibliothèque de composants React 18, TypeScript strict
- Bundler : tsup (ESM + CJS + DTS)
- Styles : Tailwind CSS (fourni par l'hôte)
- Tests : Vitest

### 2. Architecture
Chaque composant dans `src/components/ComponentName/` avec :
- `ComponentName.tsx`
- `types.ts`
- `styles.ts` (omis si composant délégateur pur)
- `ComponentName.test.tsx`

Hooks dans `src/hooks/`. Styles partagés dans `src/styles/`.

### 3. Conventions de nommage
- Composants (dossier + fichier) : PascalCase
- Hooks : `camelCase` préfixé `use`
- Types composant : `types.ts`
- Types hook : `useHookName.types.ts`
- Styles locaux : `styles.ts`
- Styles partagés : `camelCaseStyles.ts`

### 4. Ordre des imports (obligatoire)
1. React
2. Bibliothèques externes
3. Composants/hooks frères (`../`, 1 niveau max)
4. Styles partagés (`../../styles`)
5. Types et styles locaux (`./`)

Règles : imports relatifs uniquement, pas d'aliases, `import type {}` séparé, pas d'`export default`.

### 5. Styles
- Toujours `as const`
- Ne jamais importer le `styles.ts` d'un autre composant
- Utiliser `src/styles/` pour les tokens partagés
- Composant délégateur : omettre `styles.ts`, ajouter `@remarks Composant délégateur — pas de styles propres`

### 6. Règles strictes
- Pas d'`any` sans `// @ts-expect-error: raison`
- Commentaires et JSDoc en **français**
- JSDoc obligatoire sur tous les exports publics
- Fichiers < 300 lignes
- Pas de `console.log` (uniquement `console.error` / `console.warn`)

### 7. Checklist pré-commit
- `npm run typecheck` — zéro erreur TypeScript
- `npm run build` — ESM, CJS et DTS générés
- `npm test` — tous les tests passent
- `npm run lint` — zéro avertissement
- Nouveaux exports ajoutés dans `src/index.ts`
- JSDoc présent sur tous les exports publics

### 8. Versioning et publication
- **Changeset** : utiliser `npm run change` pour créer une entrée de changelog et bumper la version (appelle `changeset` + `changeset version`)
- **yalc** : utilisé pour tester le package localement dans d'autres projets avant publication
- **Release** : `npm run release` — build + `yalc push` (diffusion locale) + `changeset publish` (npm)

---

## Périmètre

Un seul fichier à créer : `CLAUDE.md` à la racine.
Aucune modification du code source existant.
