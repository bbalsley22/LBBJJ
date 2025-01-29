import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MyAccountButtonProps {
  className?: string;
}

export function MyAccountButton({ className }: MyAccountButtonProps) {
  const [user, setUser] = useState<User | null>(null);
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

  const { data: subscriptionStatus, isLoading } = useQuery({
    queryKey: ['subscription-status'],
    queryFn: async () => {
      if (!user) return null;
      const response = await fetch('/api/is-subscribed', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }
      return response.json();
    },
    enabled: !!user,
    meta: {
      onError: () => {
        console.error('Error fetching subscription status');
        toast.error('Failed to fetch subscription status');
      }
    }
  });

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          onClick={() => navigate("/manage-subscription")}
          className={cn("bg-[#ea384c] hover:bg-[#ea384c]/90", className)}
        >
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-default">
          Email: {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/manage-subscription')}
          className="cursor-pointer"
        >
          Status: {isLoading ? "Loading..." : subscriptionStatus?.subscribed ? "Active" : "No active subscription"}
          <span className="ml-2 text-sm text-muted-foreground">(Click to manage)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}