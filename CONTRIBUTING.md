# Contributing

## Commits

Commit messages are validated by commitlint through a husky `commit-msg` hook.
Every commit must follow the conventional commit format, in lower case, with a
scope, and with no body or footer:

```
type(scope): short natural language description
```

Rules enforced by commitlint:

- allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`,
  `refactor`, `revert`, `style`, `test`
- the scope is required and lower case
- the type, scope, and subject are lower case
- the header is at most 100 characters and does not end with a period
- the body and footer must be empty

Examples:

```
feat(site): add landing page hero
fix(ci): run the build with the bun lockfile
chore(tooling): update biome to the latest release
```

## Local checks

```bash
bun run check      # biome lint, format, and import checks
bun run check:fix  # apply biome fixes
bun run typecheck  # typescript
bun run build      # production build
```

A husky `pre-commit` hook runs biome on staged files through `lint-staged`, so
formatting fixes are included in the commit.

## Changesets

Add a changeset for user facing changes:

```bash
bun run changeset
```

The release workflow opens a version pull request. Merging it tags the release
and creates a GitHub release from the changelog entry. It uses the workflow
`GITHUB_TOKEN` provided by GitHub Actions.

In repository settings under Actions > General, enable "Allow GitHub Actions
to create and approve pull requests" so the version pull request can be
opened. Pull requests created with `GITHUB_TOKEN` do not trigger workflows, so
their checks may need a manual run.
