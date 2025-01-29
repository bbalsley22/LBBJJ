import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface MembershipCardProps {
  title: string;
  price: string;
  benefits: string[];
  priceId: string;
  onSubscribe: (priceId: string) => Promise<void>;
}

export const MembershipCard = ({ 
  title, 
  price, 
  benefits, 
  priceId, 
  onSubscribe 
}: MembershipCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      // If user just signed in and we have a priceId in URL, trigger checkout
      if (session && window.location.search.includes('checkout=true')) {
        handleSubscribe();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribe = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (!isAuthenticated) {
        // Store priceId in URL and redirect to auth page
        navigate(`/auth?checkout=true&priceId=${priceId}`);
        return;
      }

      await onSubscribe(priceId);
    } catch (error) {
      console.error('Subscription error:', error);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-black border-[#ea384c] border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#ea384c]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">{price}</p>
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <Button 
          onClick={handleSubscribe}
          className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get Started"}
        </Button>
      </CardContent>
    </Card>
  );
};