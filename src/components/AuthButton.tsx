import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return user ? (
    <Button 
      onClick={handleSignOut}
      className={cn("bg-[#ea384c] hover:bg-[#ea384c]/90", className)}
    >
      Sign Out
    </Button>
  ) : (
    <Button 
      onClick={() => navigate("/auth")}
      className={cn("bg-[#ea384c] hover:bg-[#ea384c]/90", className)}
    >
      Sign In
    </Button>
  );
}