import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Please enter a valid age"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  experience: z.enum(["none", "some", "experienced"], {
    required_error: "Please select your experience level",
  }),
})

interface FreeClassFormProps {
  onSuccess?: () => void;
}

export function FreeClassForm({ onSuccess }: FreeClassFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      phone: "",
      email: "",
      experience: "none",
    },
  })

  async function checkEmailClaimed(email: string) {
    try {
      const { data, error } = await supabase
        .from('free_class_claims')
        .select('email')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }

      return !!data; // Returns true if email found, false if not
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Check if email has already claimed a free class
      const isEmailClaimed = await checkEmailClaimed(values.email);
      
      if (isEmailClaimed) {
        toast({
          title: "Already Claimed",
          description: "This email has already claimed a free class.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Record the claim in the database
      const { error: claimError } = await supabase
        .from('free_class_claims')
        .insert([{ email: values.email }]);

      if (claimError) throw claimError;

      // Proceed with the free class function call
      const { error } = await supabase.functions.invoke('free-class', {
        body: values
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Check your email for your free class pass!",
      });
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 555-5555" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No Experience
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="some" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Some Experience
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="experienced" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Experienced
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Get Your Free Class Pass
        </Button>
      </form>
    </Form>
  )
}