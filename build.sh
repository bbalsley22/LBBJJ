#!/bin/bash

# Force using npm instead of bun
export CI=true
export NPM_FLAGS="--legacy-peer-deps"

# Install dependencies using npm
npm install $NPM_FLAGS

# Run the build
npm run build 