import { HeroSection } from "@/components/HeroSection";
import { MembershipSection } from "@/components/MembershipSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { MapSection } from "@/components/MapSection";
import { MainNav } from "@/components/NavigationMenu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StripeCheckoutResponse } from "@/utils/stripe";

const Index = () => {
  const handleSubscribe = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to subscribe");
        return;
      }

      const { data, error } = await supabase.functions.invoke<StripeCheckoutResponse>('create-checkout', {
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

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <HeroSection />
      <MembershipSection onSubscribe={handleSubscribe} />
      <ScheduleSection />
      <MapSection />
    </div>
  );
};

export default Index;