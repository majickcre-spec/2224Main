import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { PROPERTY_DATA } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
});

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "I am interested in 2224 Main Street. Please send me more information.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source: 'website',
          status: 'new'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      toast({
        title: "Inquiry Sent",
        description: "We have received your message and will contact you shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
              Acquisition Opportunity
            </span>
            <h2 className="font-serif text-4xl text-primary mb-8">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              For more information, to schedule a private viewing, or to request due diligence materials, please contact the exclusive listing agents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {PROPERTY_DATA.contacts.map((contact) => (
                <div key={contact.name} className="space-y-2">
                  <h4 className="font-serif text-xl font-bold text-foreground">{contact.name}</h4>
                  <p className="text-sm text-accent font-medium uppercase tracking-wide">{contact.role}</p>
                  <p className="text-sm text-muted-foreground">DRE {contact.dre}</p>
                  <div className="pt-2 space-y-1">
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-accent" />
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-accent" />
                      {contact.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-secondary/30 border border-border rounded-sm">
              <h4 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Lee & Associates | Los Angeles West
              </h4>
              <p className="text-muted-foreground">
                1508 17th Street<br />
                Santa Monica, California 90404
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 border border-border shadow-lg rounded-sm">
            <h3 className="font-serif text-2xl text-primary mb-6">Register Interest</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input data-testid="input-name" placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input data-testid="input-company" placeholder="Your Company" {...field} className="bg-gray-50 border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input data-testid="input-email" placeholder="john@company.com" {...field} className="bg-gray-50 border-gray-200" />
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
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input data-testid="input-phone" placeholder="(555) 123-4567" {...field} className="bg-gray-50 border-gray-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          data-testid="input-message"
                          placeholder="I am interested in..." 
                          className="min-h-[120px] bg-gray-50 border-gray-200 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button data-testid="button-submit" type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-serif tracking-wide py-6 text-lg">
                  Submit Inquiry
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By submitting this form, you agree to our Terms of Use and Privacy Policy.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
