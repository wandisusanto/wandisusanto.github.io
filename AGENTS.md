# AGENTS.md

This repository is **public** (GitHub Pages site for wandisusanto.github.io). Everything committed, including git history, is visible to anyone.

## Rule: no secrets or confidential information

Never write, place, or commit any of the following in this repo, in any file, commit message, or branch:

- API keys, tokens, passwords, private keys, certificates, OAuth/client secrets, webhook URLs with credentials
- `.env` files or any local config containing credentials
- Client names, contracts, pricing, invoices, or project details not already public
- Personal data: private email addresses, phone numbers, home address, ID numbers, financial details
- Internal documents, unpublished screenshots, or logs that may contain any of the above

If a feature needs a secret, it does not belong in this static site. Use GitHub Actions secrets (`${{ secrets.NAME }}`) and never echo them.

If a secret is committed by mistake: stop, tell the owner, and treat it as leaked — rotate it first. Removing it from the latest commit does not remove it from history.

Before committing, check `git diff --staged` for anything that matches the list above.
