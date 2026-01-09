import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Copy, Check, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareDocumentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDocumentsModal({ open, onOpenChange }: ShareDocumentsModalProps) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const createShareLink = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/share-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          recipientEmail,
          recipientName: recipientName || null,
          message: message || null,
          expiresInDays: 7
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create share link");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setShareUrl(data.shareUrl);
      toast({
        title: "Share link created!",
        description: `An email has been sent to ${recipientEmail}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create share link. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) return;
    createShareLink.mutate();
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setRecipientEmail("");
    setRecipientName("");
    setMessage("");
    setShareUrl(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Documents with Client
          </DialogTitle>
          <DialogDescription>
            Generate a secure link for your client to access due diligence documents. 
            They'll need to provide their contact details before viewing.
          </DialogDescription>
        </DialogHeader>
        
        {!shareUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Client Email *</Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="client@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
                data-testid="input-recipient-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientName">Client Name (optional)</Label>
              <Input
                id="recipientName"
                type="text"
                placeholder="John Smith"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                data-testid="input-recipient-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Here are the due diligence documents for your review..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                data-testid="input-share-message"
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                data-testid="button-cancel-share"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!recipientEmail || createShareLink.isPending}
                data-testid="button-send-share-link"
              >
                {createShareLink.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Link
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                <Check className="w-5 h-5" />
                Link Created Successfully!
              </div>
              <p className="text-sm text-green-600">
                An email has been sent to {recipientEmail} with instructions to access the documents.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="bg-gray-50"
                  data-testid="input-share-url"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                  data-testid="button-copy-share-url"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This link expires in 7 days. Share this link directly if you prefer not to use email.
              </p>
            </div>
            
            <DialogFooter>
              <Button onClick={handleClose} data-testid="button-done-share">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
