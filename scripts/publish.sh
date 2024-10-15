#!/bin/sh

set -e

cd packages/components
pnpm publish --access public
cd -

cd packages/vue3
pnpm publish --access public
cd -

cd packages/foundation
pnpm publish --access public
cd -

cd packages/locale
pnpm publish --access public
cd -

cd packages/theme-default
pnpm publish --access public
cd -

cd packages/vite-plugin
pnpm publish --access public
cd -

cd packages/webpack-plugin
pnpm publish --access public
cd -

echo "✅ Publish completed"
