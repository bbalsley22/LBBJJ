import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get checkout parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const isCheckout = searchParams.get('checkout') === 'true';
  const priceId = searchParams.get('priceId');

  const handleSuccessfulAuth = async () => {
    if (isCheckout && priceId) {
      // Redirect to checkout with the stored priceId
      const { data, error } = await supabase.functions.invoke<{ url: string }>('create-checkout', {
        body: { priceId }
      });

      if (error) {
        toast.error('Failed to create checkout session');
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } else {
      navigate("/");
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await handleSuccessfulAuth();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Check your email for the confirmation link!");
      // Note: We don't redirect to checkout here because the user needs to verify their email first
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectTo = isCheckout && priceId 
        ? `${window.location.origin}/LBBJJ/#/auth?checkout=true&priceId=${priceId}`
        : `${window.location.origin}/LBBJJ/#/`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await handleSuccessfulAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[350px] bg-[#222222] border-[#ea384c]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#ea384c]">Welcome</CardTitle>
          <CardDescription>
            {isCheckout 
              ? "Create an account to continue with your membership purchase" 
              : "Sign in to your account or create a new one"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90"
                disabled={loading}
              >
                Sign In
              </Button>
              <Button 
                type="button"
                onClick={handleEmailSignUp}
                variant="outline" 
                className="w-full"
                disabled={loading}
              >
                Sign Up
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#222222] px-2">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full"
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}