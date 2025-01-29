import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FreeClassForm } from "@/components/FreeClassForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./NavigationMenu";
import { MembershipSection } from "./MembershipSection";
import { MapSection } from "./MapSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ListItem = ({ className, title, href }: { className?: string; title: string; href: string }) => {
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(href)} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer", className)}>
      <div className="text-sm font-medium leading-none">{title}</div>
    </li>
  );
};

export const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSubscribe = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthDialogOpen(true);
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

  return (
    <div>
      <div className="relative h-screen">
        <MainNav />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <div 
              className="w-full max-w-[600px] mb-8 cursor-pointer"
              onClick={handleLogoClick}
            >
              <img 
                src="/LBBJJ/lovable-uploads/aaec84e9-ec37-427c-b25d-3ead642e4096.png" 
                alt="Lost Boys Brazilian Jiu Jitsu"
                className="w-full h-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-xl md:text-2xl mb-8 font-bold">SHOW UP</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white px-8 py-6 text-lg"
                >
                  Claim Your Free Class Today
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Get Your Free Class</DialogTitle>
                </DialogHeader>
                  <FreeClassForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div id="membership-section">
        <MembershipSection onSubscribe={handleSubscribe} />
      </div>
      <MapSection />

      {/* Authentication Required Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to be signed in to purchase a membership. Would you like to sign in or create an account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAuthDialogOpen(false);
                navigate("/auth");
              }}
              className="w-full sm:w-auto"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setIsAuthDialogOpen(false);
                navigate("/auth");
              }}
              className="w-full sm:w-auto bg-[#ea384c] hover:bg-[#ea384c]/90"
            >
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};