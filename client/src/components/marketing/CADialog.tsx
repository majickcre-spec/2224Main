import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface CADialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CADialog({ open, onOpenChange }: CADialogProps) {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSign = async () => {
    if (signature.length > 2 && agreed && email && name) {
      try {
        const response = await fetch('/api/ca-signatures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            signature
          })
        });

        if (response.ok) {
          setStep(2);
          setTimeout(() => {
            onOpenChange(false);
            setLocation("/portal");
          }, 1500);
        } else {
          const data = await response.json();
          toast({
            title: "Error",
            description: data.error || "Failed to sign agreement",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit signature. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Confidentiality Agreement</DialogTitle>
          <DialogDescription>
            Please sign the NDA to access the Broker/Investor Due Diligence Room for 2224 Main Street.
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 py-4">
            <div className="h-64 overflow-y-auto border border-border p-4 text-sm text-muted-foreground bg-gray-50 rounded-sm">
              <p className="mb-4"><strong>CONFIDENTIALITY AGREEMENT</strong></p>
              <p className="mb-4">
                This Confidentiality Agreement (the "Agreement") is entered into by and between the undersigned ("Prospective Purchaser/Broker Representative") 
                and Lee & Associates ("Listing Broker") regarding the property located at 2224 Main Street, Santa Monica, CA (the "Property").
              </p>
              <p className="mb-4">
                1. <strong>Confidential Information.</strong> Prospective Purchaser acknowledges that all information provided by Broker 
                or Owner regarding the Property is confidential and shall be used solely for the purpose of evaluating the potential purchase of the Property.
              </p>
              <p className="mb-4">
                2. <strong>Non-Disclosure.</strong> Prospective Purchaser agrees not to disclose any Confidential Information to any third party 
                without the prior written consent of Owner, except to its employees, legal counsel, and financial advisors who need to know such information.
              </p>
              <p className="mb-4">
                3. <strong>Return of Materials.</strong> Upon request, Prospective Purchaser shall return or destroy all written Confidential Information 
                provided by Broker or Owner.
              </p>
              <p>
                [... Full legal text would appear here ...]
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ca-name">Full Name</Label>
                <Input 
                  id="ca-name" 
                  data-testid="input-ca-name"
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ca-email">Email Address</Label>
                <Input 
                  id="ca-email" 
                  data-testid="input-ca-email"
                  type="email"
                  placeholder="john@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                data-testid="checkbox-terms"
                checked={agreed} 
                onCheckedChange={(c) => setAgreed(c === true)} 
              />
              <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the terms and conditions of the Confidentiality Agreement.
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature">Digital Signature (Type Full Name)</Label>
              <Input 
                id="signature" 
                data-testid="input-ca-signature"
                placeholder="John Doe" 
                value={signature} 
                onChange={(e) => setSignature(e.target.value)}
                className="font-serif italic text-lg"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-ca-cancel">Cancel</Button>
              <Button 
                onClick={handleSign} 
                disabled={!agreed || signature.length < 3 || !name || !email} 
                className="bg-primary text-white"
                data-testid="button-ca-sign"
              >
                Sign & Enter Portal
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-foreground">Agreement Signed</h3>
            <p className="text-muted-foreground">Redirecting you to the secure portal...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
