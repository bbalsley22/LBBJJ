import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  try {
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user?.email) {
      throw new Error('No email found')
    }

    // First check if user is admin
    const { data: userData } = await supabaseClient.auth.admin.getUserById(user.id)
    if (userData.user?.raw_user_meta_data?.role === 'admin') {
      return new Response(
        JSON.stringify({ 
          subscribed: true,
          membershipType: 'Admin',
          nextBillingDate: null
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // If not admin, check Stripe subscription
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // First try to find customer by email
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    })

    if (customers.data.length === 0) {
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          membershipType: null,
          nextBillingDate: null
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
      limit: 1,
      expand: ['data.items.data.price.product']
    })

    if (subscriptions.data.length === 0) {
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          membershipType: null,
          nextBillingDate: null
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const subscription = subscriptions.data[0];
    const product = subscription.items.data[0].price.product as Stripe.Product;

    return new Response(
      JSON.stringify({ 
        subscribed: true,
        membershipType: product.name,
        nextBillingDate: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error checking subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})