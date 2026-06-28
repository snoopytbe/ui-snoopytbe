---
model: claude-haiku-4-5-20251001
---

# /update-docs

Garde `CLAUDE.md` et `CONTRIBUTE.md` synchronisés avec le code actuel. À lancer après tout travail de feature significatif.

## Usage

```
/update-docs        # mode récent (par défaut) — seulement les fichiers modifiés dans les 5 derniers commits
/update-docs full    # mode complet — tous les fichiers source, sans tenir compte de l'historique récent
```

`$ARGUMENTS` — si `full` ou `all` est présent, utiliser le mode complet (étape 1b). Sinon, mode récent (étape 1a). Le mode complet coûte plus cher — à réserver aux cas où la doc a dérivé largement, pas comme habitude par défaut.

## Étapes

1. **Identifier les fichiers source à lire**

   **1a. Mode récent (par défaut)** — diff depuis le dernier sync :
   ```bash
   git diff HEAD~5 --stat
   git log --oneline -10
   ```
   Collecter les fichiers modifiés dans **source_files**.

   **1b. Mode complet** (`full` ou `all` dans `$ARGUMENTS`) :
   ```bash
   git ls-files 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.'
   ```
   Collecter tous les fichiers listés dans **source_files**.

2. **Lire la doc actuelle** — `CLAUDE.md`, `CONTRIBUTE.md`, `README.md` (s'il existe).

3. **Lire les fichiers source** — pour chaque fichier de **source_files**, en extraire les faits pertinents (nouveau composant, nouveau hook, nouvelle convention, nouvelle dépendance). En mode complet, signaler aussi : tout chemin mentionné dans la doc qui n'existe plus sur disque (référence obsolète).

4. **Appliquer la politique suivante :**

   ### CLAUDE.md (racine)
   - Architecture : mettre à jour si la structure de `src/` a changé
   - Conventions de nommage : ajouter toute nouvelle convention apparue
   - Règles strictes : ne pas dupliquer ce qu'ESLint (`eslint.config.js`) applique déjà automatiquement — seulement les règles encore manuelles
   - Checklist pré-commit / versioning : garder synchronisé avec les scripts réels de `package.json`

   ### CONTRIBUTE.md
   - Doit rester cohérent avec `CLAUDE.md` (mêmes conventions, mêmes commandes) — c'est la version détaillée destinée aux contributeurs externes
   - Stack : mettre à jour les versions si `package.json` a changé
   - Workflow de versioning/publication : doit refléter exactement les scripts `npm run change` / `npm run release` du `package.json`, jamais une commande `npm publish` divergente

   ### README.md (si présent)
   - Garder en phase avec les exports publics de `src/index.ts`

5. **Éditer uniquement ce qui a changé** — utiliser des appels Edit précis, pas de réécriture complète. Si une section est encore exacte, ne pas y toucher.

6. **Rapport** — un résumé d'une ligne par fichier : ce qui a été ajouté, retiré, ou laissé inchangé.
