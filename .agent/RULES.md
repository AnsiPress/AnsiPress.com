# AnsiPress Agent Rules

## General Behavior

- You must always read the `.agent/AI_CONTEXT.md` file at the beginning of every session to understand the architecture, tech stack, and project structure.
- This file is the source of truth for high-level decisions.

## Maintenance

- If we make significant architectural changes, add new libraries, or change the roadmap, you MUST run the `/update_context` workflow or update `.agent/AI_CONTEXT.md` manually to reflect these changes.
- Do not ask for permission to update it; treat it as a living document that must stay synchronized with the code.

## Skills & Best Practices

- You MUST use the `next-best-practices` skill (located in `.agent/skills/next-best-practices/SKILL.md`) when writing or reviewing any Next.js code.
- Always check the detailed markdown files in that directory for specific patterns (RSC, data fetching, etc.) before implementing new features.
