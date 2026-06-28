---
model: claude-haiku-4-5-20251001
---

# /check-components

Audite et corrige les fichiers de `src/` (composants, hooks, services, styles) par rapport aux règles de `CLAUDE.md`.

## Usage

```
/check-components        # mode récent (par défaut) — seulement les fichiers modifiés récemment
/check-components full    # mode complet — tous les fichiers source, sans tenir compte de l'historique récent
```

`$ARGUMENTS` — si `full` ou `all` est présent, utiliser le mode complet (étape 1b). Sinon, mode récent (étape 1a). Le mode complet lit beaucoup plus de fichiers et coûte plus cher — à réserver aux cas où le code a dérivé largement (plusieurs commits de features sans passage de check), pas comme habitude par défaut.

## 1. Collecter les fichiers

**1a. Mode récent (par défaut)** :
```bash
bash .claude/scripts/collect-tsx-changes.sh
```
Arrêter avec « aucun fichier source modifié » si vide.

**1b. Mode complet** (`full` ou `all` dans `$ARGUMENTS`) :
```bash
git ls-files 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.'
```
Arrêter avec « aucun fichier source — rien à vérifier » si vide.

- **tsx_files** = lignes finissant par `.tsx`
- **all_files** = toutes les lignes

## 2. Lancer ESLint et le typecheck

```bash
npm run lint
npm run typecheck
```

- **warned** = fichiers listés dans les erreurs ESLint/tsc

## 3. Corriger les avertissements

Appliquer chaque correction directement (Edit/Write). Règles non triviales du projet (cf. `CLAUDE.md`) :
- `any` sans justification → ajouter `// @ts-expect-error: <raison>` sur la ligne précédente, ou typer correctement
- fichier > 300 lignes → diviser en unités plus petites (`types.ts`, `styles.ts`, fichiers compagnons)
- `console.log` → remplacer par `console.warn`/`console.error` ou supprimer
- import à plus de 2 niveaux (`../../..`) → réécrire en import relatif ≤ 2 niveaux
- `import type {}` mélangé avec des imports de valeurs → séparer
- `export default` → remplacer par `export const`
- `styles.ts` important le `styles.ts` d'un autre composant → extraire le token partagé vers `src/styles/`

Relancer `npm run lint && npm run typecheck` — doit passer à 0 erreur/avertissement.

## 4. Revue manuelle (fichiers `tsx_files`, sauf indication contraire)

### 4a — Tous les tsx_files

- **Types** : types inline → déplacer vers `types.ts` (exports nommés) ; types de hook → `useHookName.types.ts`
- **Styles** : classes Tailwind → toujours via `styles.ts` avec `export const xxxStyles = {...} as const` ; pas de chaînes inline dans le JSX ; composant délégateur pur → pas de `styles.ts`, ajouter `@remarks Composant délégateur — pas de styles propres`
- **JSDoc** : obligatoire en français sur tous les exports publics, avec `@returns`/`@throws`/`@remarks` si pertinent

### 4b — fichiers `warned` uniquement (vide → passer) ; en mode complet, tous les `all_files`

- Ordre des imports : React → bibliothèques externes → composants/hooks frères (`../`, 1 niveau) → styles partagés (`../../styles`) → types et styles locaux (`./types`, `./styles`)
- Co-localisation : le test (`ComponentName.test.tsx`) doit être dans le même dossier que le composant
- Qualité des tests : couvrir le cas nominal, les entrées vides/nulles, et les cas d'erreur

**Mode complet uniquement** — vérifier aussi :

- **Conventions de nommage** (cf. `CLAUDE.md`) : dossiers/fichiers composants en PascalCase ; hooks préfixés `use` ; fichiers de types `types.ts` (composant) ou `useHook.types.ts` (hook) ; services en `camelCaseService.ts` — renommer les écarts
- **Nouveaux exports** : tout nouvel export public doit apparaître dans `src/index.ts`

## 5. Rapport

Une ligne par correction. Final : `N fichiers vérifiés, M modifiés`. Signaler tout ce qui nécessite une correction manuelle.
