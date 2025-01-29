import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MembershipSection } from "@/components/MembershipSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { MainNav } from "@/components/NavigationMenu";

export default function ManageSubscription() {
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/');
        return;
      }
      setUser(session.user);
    });
  }, [navigate]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/is-subscribed', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch subscription status');
        
        const data = await response.json();
        setIsSubscribed(data.subscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast.error('Failed to check subscription status');
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? You'll continue to have access until the end of your billing period.")) {
      return;
    }

    setIsCancelling(true);
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');

      toast.success('Your subscription has been cancelled. You will continue to have access until the end of your billing period.');
      setSubscriptionDetails(prev => prev ? { ...prev, subscribed: false } : null);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubscribe = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to subscribe");
        return;
      }

      const { data, error } = await supabase.functions.invoke<{ url: string }>('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
      toast.error(errorMessage);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-[#ea384c]">Manage Your Subscription</h1>
        
        {isLoading ? (
          <Card className="bg-[#222222] border-[#ea384c]">
            <CardContent className="pt-6 flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-[#ea384c]" />
            </CardContent>
          </Card>
        ) : subscriptionDetails?.subscribed ? (
          <Card className="bg-[#222222] border-[#ea384c]">
            <CardHeader>
              <CardTitle>Active Subscription</CardTitle>
              <CardDescription>
                You're currently subscribed to our {subscriptionDetails.membershipType || 'membership'} plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionDetails.nextBillingDate && (
                <p className="text-sm text-gray-400">
                  Next billing date: {new Date(subscriptionDetails.nextBillingDate).toLocaleDateString()}
                </p>
              )}
              <div className="flex flex-col gap-4">
                <p>
                  Your membership gives you access to all our facilities and classes. 
                  Thank you for being a valued member of Lost Boys BJJ!
                </p>
                <Button 
                  onClick={handleCancelSubscription}
                  variant="destructive"
                  disabled={isCancelling}
                  className="w-fit"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    'Cancel Subscription'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-[#222222] border-[#ea384c]">
              <CardHeader>
                <CardTitle>No Active Subscription</CardTitle>
                <CardDescription>
                  Choose a membership plan below to get started with Lost Boys BJJ.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MembershipSection onSubscribe={handleSubscribe} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}