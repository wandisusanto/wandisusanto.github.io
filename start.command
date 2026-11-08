#!/bin/sh
# Run the site locally and open it in the browser. Double-click in Finder or run: ./start.command
cd "$(dirname "$0")" || exit 1
[ -d node_modules ] || npm install || exit 1
exec npm run dev -- --open
