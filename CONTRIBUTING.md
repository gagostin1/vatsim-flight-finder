# Contributing

## The everyday workflow

1. Start from an up-to-date `main` branch.
2. Create a focused branch such as `feat/live-atc-matching` or `fix/empty-results`.
3. Make one coherent change and add or update tests.
4. Run `npm run lint`, `npm run typecheck`, and `npm test`.
5. Commit with a descriptive message such as `feat: rank routes by live ATC coverage`.
6. Push the branch, open a pull request, and let CI finish.
7. Review the diff, merge the pull request, then delete the branch.

Keep pull requests small enough that their purpose is obvious from the title and diff.
