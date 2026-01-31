#!/bin/sh
# Check if new commit - if there is, pull new changes and rebuild

git fetch origin astro-ver
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/astro-ver)" ]; then
    echo "new commit detected!! pulling changes and rebuilding :3"
    git reset --hard origin/astro-ver
    echo "$PWD"
    cd site/
    echo "$PWD"
    killall MainThread
    pnpm install
    pnpm run build
    echo "new site built!!1!1! lets hope prod didn't break"
    HOST=0.0.0.0 PORT=8080 /root/.nvm/versions/node/v25.2.1/bin/node ./dist/server/entry.mjs
else
    echo "no new commits detected D:"
fi