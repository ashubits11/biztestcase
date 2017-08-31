#!/bin/bash
cat src/index.html
if [ "$DEPLOYED" ]; then 
  sed -i -e 's/base href="\/"/base href="\/admin\/ui\/"/g' src/index.html
fi
cat src/index.html
if [ "$RELEASE_BUILD" ]; then
  node_modules/@angular/cli/bin/ng build --prod --aot
else
  node_modules/@angular/cli/bin/ng build
fi