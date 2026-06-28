Analyse les changements git en cours et crée un commit avec un message bien rédigé.

## Étapes

0. Demande si les contrôles qualité doivent tourner. Si oui, lance successivement : `fix-tests`, `check-components`, `fix-tests`, `update-docs`.

1. En parallèle :
   - `git status`
   - `git diff` (staged + unstaged)
   - `git log --oneline -5`

2. Rédige le message de commit :
   - Type conventionnel (feat/fix/refactor/docs/chore) + titre ≤ 72 caractères
   - Corps uniquement si les changements sont complexes
   - Respecte le style des commits récents

3. Affiche le message et demande : confirmation + si une **release** est souhaitée.

4. **Release** : `git add` (fichiers pertinents, pas de secrets) → `npm run release` (interactif : version, CHANGELOG, tag).

5. **Commit simple** : `git add` → `git commit` via HEREDOC → demande si push → `git push` si confirmé.
