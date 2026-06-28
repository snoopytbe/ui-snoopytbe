#!/usr/bin/env bash
# Outputs deduplicated changed .ts/.tsx files (excl. *.test.*) under src/
{
  git diff --name-only HEAD~5 HEAD -- 'src/**'
  git diff --name-only HEAD -- 'src/**'
  git diff --name-only --cached HEAD -- 'src/**'
  git ls-files --others --exclude-standard src/
} | sort -u | grep -E '\.(ts|tsx)$' | grep -v '\.test\.(ts|tsx)$'
