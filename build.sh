#!/bin/bash

# Force using npm instead of bun
export CI=true
export NPM_FLAGS="--legacy-peer-deps"

# Create .env file from environment variables
echo "VITE_SUPABASE_URL=$VITE_SUPABASE_URL" > .env
echo "VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY" >> .env

# Install dependencies using npm
npm install $NPM_FLAGS

# Run the build
npm run build 