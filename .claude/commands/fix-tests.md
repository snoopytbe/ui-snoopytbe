---
model: claude-sonnet-4-6
---

# /fix-tests

Objectif 1 — Écrire les tests du nouveau code ; diagnostiquer les tests cassés sur le code modifié.
Objectif 2 — Ne pas faire régresser la couverture de tests.
Objectif 3 — Laisser la suite de tests entièrement verte.

## Usage

```
/fix-tests        # mode récent (par défaut) — seulement les fichiers modifiés dans les 3 derniers commits + arbre de travail
/fix-tests full    # mode complet — tous les fichiers source de src/, sans tenir compte de l'historique récent
```

`$ARGUMENTS` — si `full` ou `all` est présent, utiliser le mode complet (étape 0b). Sinon, mode récent (étape 0a). Le mode complet coûte plus cher — à réserver aux cas où la couverture a dérivé largement, pas comme habitude par défaut.

---

## 0. Classifier les fichiers source

**0a. Mode récent (par défaut)** :

```bash
# Fichiers ajoutés dans les 3 derniers commits ou non suivis (nouveau code, pas encore de test)
git diff --name-only --diff-filter=A HEAD~3...HEAD -- 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.' || true
git ls-files --others --exclude-standard -- 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.' || true
```

Collecter les résultats dédupliqués dans **new_files**.

```bash
# Fichiers modifiés (pas ajoutés) dans les 3 derniers commits + arbre de travail
git diff --name-only --diff-filter=M HEAD~3...HEAD -- 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.' || true
git diff --name-only HEAD -- 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.' || true
```

Collecter les résultats dédupliqués dans **modified_files**.

Si les deux listes sont vides, rapporter « aucun changement source — rien à faire » et arrêter.

**0b. Mode complet** (`full` ou `all` dans `$ARGUMENTS`) :

```bash
# Tout fichier source sans fichier de test correspondant (File.ts(x) → File.test.ts(x))
for f in $(git ls-files 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.'); do
  stem="${f%.*}"; ext="${f##*.}"
  [[ -f "${stem}.test.${ext}" ]] || echo "$f"
done
```

Collecter les résultats dans **new_files** — ces fichiers n'ont aucun test, quelle que soit l'historique récente.

```bash
# Tout fichier source qui a déjà un fichier de test (le complément de new_files)
for f in $(git ls-files 'src/**/*.ts' 'src/**/*.tsx' | grep -v '\.test\.'); do
  stem="${f%.*}"; ext="${f##*.}"
  [[ -f "${stem}.test.${ext}" ]] && echo "$f"
done
```

Collecter les résultats dans **modified_files** — relancer leur suite de tests complète (pas juste un diff récent) pour rattraper toute dérive.

Si les deux listes sont vides, rapporter « aucun fichier source — rien à faire » et arrêter.

---

## 1. Écrire les tests du nouveau code (Objectif 1a)

Pour chaque fichier de **new_files** :

1. Lire le fichier source en entier.
2. Dériver le chemin du fichier de test attendu : `src/path/File.ts(x)` → `src/path/File.test.ts(x)` (co-localisé, cf. `CLAUDE.md`).
3. Si le fichier de test existe déjà, passer (traité à l'étape 3 — couverture).
4. Créer le fichier de test et écrire des cas couvrant :
   - Cas nominal pour chaque export public
   - Entrée vide / nulle
   - Valeurs limites
   - Cas d'erreur (exceptions, promesses rejetées)

### Règles de test
- `vitest` + `@testing-library/react`.
- `vi.mock(...)` en haut du fichier pour les modules externes.
- Noms : `it('fait X quand Y')` décrivant le comportement, pas l'implémentation.
- JSDoc et commentaires en français (cf. `CLAUDE.md`).

Après avoir écrit chaque fichier de test, le lancer immédiatement pour confirmer qu'il passe :

```bash
npx vitest run src/path/to/File.test.tsx
```

Corriger tout échec avant de passer au fichier suivant.

---

## 2. Diagnostiquer les tests cassés sur le code modifié (Objectif 1b)

Pour chaque fichier de **modified_files**, trouver son fichier de test correspondant (même convention de nommage). Collecter les correspondances dans **modified_test_files**. Si aucune trouvée, le noter et passer.

```bash
npx vitest run <modified_test_files>
```

Si tout passe, passer à l'étape 3.

Pour chaque test en échec, lire le fichier de test et le diff source pour comprendre ce qui a changé :

```bash
git diff HEAD~3...HEAD -- <source_file>
```

**Mode complet** : le fichier peut ne pas avoir changé dans les 3 derniers commits — dans ce cas, lire directement le source et le test actuels et juger l'échec sur le contrat actuel uniquement.

Puis classifier chaque échec :

**[TEST OBSOLÈTE]** — Le changement source était intentionnel et le test ne correspond plus au nouveau contrat (fonction renommée, signature changée, comportement retiré). Le test doit être mis à jour.

**[CODE SUSPECT]** — Le test décrit une attente valide que le nouveau code viole. Possible régression introduite par le changement récent.

Afficher la classification complète de chaque test en échec avant de toucher à quoi que ce soit :

```
DIAGNOSTIC
  src/hooks/useBar.test.ts::renders without crash → [CODE SUSPECT] useBar lève une exception quand input est undefined
```

Puis :

- Appliquer les corrections pour tous les cas **[TEST OBSOLÈTE]**. Relancer chaque fichier après correction pour confirmer qu'il passe au vert.
- **S'il existe des cas [CODE SUSPECT] : arrêter immédiatement. Les rapporter à l'utilisateur et attendre une décision. Ne pas poursuivre aux étapes 3-5.**

---

## 3. Mesurer la couverture (Objectif 2)

> Atteint uniquement si l'étape 2 n'a produit aucun cas [CODE SUSPECT] (ou si l'utilisateur les a explicitement validés).

```bash
npm run test:coverage 2>&1 | tail -50
```

Aucun seuil minimal n'est imposé par la config (`vitest.config.ts` ne définit pas de `coverage.thresholds`). Comparer le pourcentage global (« All files ») avant/après le changement : si la couverture **baisse** sur les fichiers touchés, ajouter les tests manquants. Les fichiers `types.ts` à 0 % sont normaux (interfaces pures, aucune instruction exécutable) — ne pas chercher à les « couvrir ».

---

## 4. Ajouter les tests manquants

Pour chaque fichier dont la couverture a régressé :

1. Lire le fichier source en entier.
2. Identifier les lignes non couvertes dans le rapport (`npm run test:coverage`, colonne « Uncovered Line #s »).
3. Ajouter les cas de test manquants au fichier de test existant.

Après chaque mise à jour, relancer immédiatement le fichier pour confirmer l'absence de nouvel échec :

```bash
npx vitest run src/path/to/File.test.tsx
```

---

## 5. Suite complète — tout au vert (Objectif 3)

```bash
npm test
```

Si un test échoue, appliquer la correction minimale et relancer. Ne pas déclarer le succès avant que la commande sorte en code 0.

---

## 6. Rapport

```
OBJECTIF 1a — NOUVEAU CODE
  src/hooks/useBar.ts → useBar.test.ts créé (5 cas)

OBJECTIF 1b — CODE MODIFIÉ
  [TEST OBSOLÈTE] src/components/Pill/Pill.test.tsx::affiche le label — mis à jour (signature changée)
  [CODE SUSPECT]  src/hooks/useBaz.test.ts::renders without crash
                  ↳ BLOQUÉ — en attente d'une décision de l'utilisateur

OBJECTIF 2 — COUVERTURE
  Avant : 93.08 % lignes · Après : 94.1 % lignes — pas de régression ✓

OBJECTIF 3 — SUITE FINALE
  N tests passés en X s ✓

ÉCARTS (non résolus automatiquement)
  src/components/Foo — exclu (raison)
```
