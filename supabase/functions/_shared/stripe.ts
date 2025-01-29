import Stripe from 'https://esm.sh/stripe@14.21.0';

if (!Deno.env.get('STRIPE_SECRET_KEY')) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16', // Use the latest API version
  httpClient: Stripe.createFetchHttpClient(),
});

// CORS headers for browser requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};