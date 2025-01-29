import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, age, experience } = await req.json()
    console.log('Received free class request:', { name, email, phone, age, experience })

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store the free class request in the database
    const { data, error } = await supabase
      .from('free_class_requests')
      .insert([
        { name, email, phone, age: parseInt(age), experience }
      ])

    if (error) throw error

    // Send confirmation email to the user
    const emailResponse = await resend.emails.send({
      from: "Lost Boys BJJ <onboarding@resend.dev>",
      to: [email],
      subject: "Your Free Class Pass - Lost Boys BJJ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="font-size: 32px; color: #2b2b2b; text-align: center; margin-bottom: 30px;">Welcome to Lost Boys BJJ, ${name}!</h1>
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Thank you for requesting a free class with us! We're excited to have you join our community.</p>
          
          <div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; margin: 30px 0;">
            <h2 style="font-size: 24px; color: #2b2b2b; margin-bottom: 20px;">What to Bring:</h2>
            <ul style="font-size: 18px; line-height: 1.8; padding-left: 20px;">
              <li>Comfortable workout clothes</li>
              <li>Water bottle</li>
              <li>Towel</li>
            </ul>
          </div>
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Our team will contact you shortly at ${phone} to schedule your free class and answer any questions you might have.</p>
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">We recommend arriving 15 minutes before your scheduled class time for a proper introduction to our facility and team.</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <p style="font-size: 20px; font-weight: bold; color: #2b2b2b;">See you on the mats!</p>
            <p style="font-size: 18px; color: #666;">The Lost Boys BJJ Team</p>
          </div>
        </div>
      `,
    })

    console.log("Free class confirmation email sent successfully:", emailResponse)

    return new Response(
      JSON.stringify({ message: 'Free class request received successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error processing free class request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})