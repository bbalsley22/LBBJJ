import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WelcomeEmailRequest {
  name: string
  email: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email }: WelcomeEmailRequest = await req.json()

    const emailResponse = await resend.emails.send({
      from: "Lost Boys BJJ <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Lost Boys BJJ!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="font-size: 32px; color: #2b2b2b; text-align: center; margin-bottom: 30px;">Welcome to Lost Boys BJJ, ${name}!</h1>
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">We're thrilled to welcome you to our community! Your journey in Brazilian Jiu-Jitsu begins now, and we're here to support you every step of the way.</p>
          
          <div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; margin: 30px 0;">
            <h2 style="font-size: 24px; color: #2b2b2b; margin-bottom: 20px;">Next Steps:</h2>
            <ul style="font-size: 18px; line-height: 1.8; padding-left: 20px;">
              <li>Check out our class schedule</li>
              <li>Join our community on social media</li>
              <li>Reach out if you have any questions</li>
            </ul>
          </div>
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Remember, everyone starts somewhere, and our experienced instructors are dedicated to helping you achieve your goals.</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <p style="font-size: 20px; font-weight: bold; color: #2b2b2b;">Welcome to the family!</p>
            <p style="font-size: 18px; color: #666;">The Lost Boys BJJ Team</p>
          </div>
        </div>
      `,
    })

    console.log("Welcome email sent successfully:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error: any) {
    console.error("Error sending welcome email:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
}

serve(handler)