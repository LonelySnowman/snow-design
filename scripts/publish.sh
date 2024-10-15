#!/bin/sh

set -e

cd packages/components
npm publish --access public
cd -

cd packages/vue3
npm publish --access public
cd -

cd packages/foundation
npm publish --access public
cd -

cd packages/locale
npm publish --access public
cd -

cd packages/theme-default
npm publish --access public
cd -

cd packages/vite-plugin
npm publish --access public
cd -

cd packages/webpack-plugin
npm publish --access public
cd -

echo "✅ Publish completed"
