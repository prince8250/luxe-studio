<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

This project is the website and admin system for **Bestman Luxe Studio**. Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, user stories, features, and scope
2. `context/architecture-context.md` — stack, data model, system boundaries, and invariants
3. `context/ui-context.md` — look and feel, tokens, mobile-first rules, and component conventions. **Also view the screenshots in `context/design-reference/` before any UI work.**
4. `context/code-standards.md` — implementation rules and conventions
5. `context/ai-workflow-rules.md` — how to work with the developer, scoping, and how to explain your work
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

## Building Features

Features are built one at a time from the numbered specs in `context/feature-specs/` (`00-...md`, `01-...md`, and so on).

- Build only the spec the developer names. Never start the next spec on your own.
- Read the named spec fully, plus every spec it lists under "Depends on", before writing code.
- Follow the workflow in `context/ai-workflow-rules.md`: plan first, build, explain, verify, update the tracker.

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.
