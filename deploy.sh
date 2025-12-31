#!/bin/sh
# Check if new commit - if there is, pull new changes and rebuild

git fetch origin main
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
    echo "new commit detected!! pulling changes and rebuilding :3"
    git pull origin main
    cd site
    npm run build
    echo "new site built!!1!1! lets hope prod didn't break"
else
    echo "no new commits detected D:"
fi