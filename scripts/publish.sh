#!/bin/sh

set -e

pnpm publish --filter @snow-design/components

pnpm publish --filter @snow-design/vue3

pnpm publish --filter @snow-design/foundation

pnpm publish --filter @snow-design/locale

pnpm publish --filter @snow-design/theme-default

pnpm publish --filter @snow-design/vite-plugin

pnpm publish --filter @snow-design/webpack-plugin

pnpm publish --filter @snow-design/tools

echo "✅ Publish completed"
