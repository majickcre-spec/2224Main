import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, Check, Linkedin, Instagram, Facebook, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedContent {
  content: string;
  platform: string;
  contentType: string;
}

export default function SocialContentGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("linkedin");
  const [contentType, setContentType] = useState<string>("announcement");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const platforms = [
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-[#0077B5]" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-[#1877F2]" },
  ];

  const contentTypes = [
    { id: "announcement", name: "Property Announcement", description: "New listing excitement" },
    { id: "investment", name: "Investment Focus", description: "ROI and financial benefits" },
    { id: "lifestyle", name: "Lifestyle Appeal", description: "Location and amenities" },
    { id: "marketUpdate", name: "Market Update", description: "Santa Monica market insights" },
    { id: "openHouse", name: "Open House/Viewing", description: "Exclusive viewing invitation" },
    { id: "priceReduction", name: "Urgency/Limited Time", description: "Create FOMO" },
  ];

  async function generateContent() {
    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const response = await fetch('/api/generate-social-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          platform: selectedPlatform,
          contentType,
          customPrompt: customPrompt.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data);
      toast({
        title: "Content Generated",
        description: `Your ${selectedPlatform} post is ready!`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyToClipboard() {
    if (!generatedContent) return;
    
    try {
      await navigator.clipboard.writeText(generatedContent.content);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      });
    }
  }

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Generate Social Media Content
          </CardTitle>
          <CardDescription>
            Use AI to create engaging posts for 2224 Main Street across different platforms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Select Platform</Label>
            <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <TabsList className="grid grid-cols-3 w-full">
                {platforms.map((platform) => (
                  <TabsTrigger 
                    key={platform.id} 
                    value={platform.id}
                    className="flex items-center gap-2"
                    data-testid={`tab-${platform.id}`}
                  >
                    <platform.icon className="w-4 h-4" />
                    {platform.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Label>Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger data-testid="select-content-type">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="customPrompt">Additional Instructions (Optional)</Label>
            <Textarea
              id="customPrompt"
              placeholder="Add any specific details or tone preferences... e.g., 'Mention the ocean views' or 'Make it more casual'"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-custom-prompt"
            />
          </div>

          <Button 
            onClick={generateContent} 
            disabled={isGenerating}
            className="w-full"
            size="lg"
            data-testid="button-generate"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate {selectedPlatformData?.name} Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="border-accent/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {selectedPlatformData && (
                  <div className={`p-2 rounded-lg ${selectedPlatformData.color}`}>
                    <selectedPlatformData.icon className="w-5 h-5 text-white" />
                  </div>
                )}
                Your {selectedPlatformData?.name} Post
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateContent}
                  disabled={isGenerating}
                  data-testid="button-regenerate"
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={copyToClipboard}
                  data-testid="button-copy"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm leading-relaxed border"
              data-testid="text-generated-content"
            >
              {generatedContent.content}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Platform: {generatedContent.platform}</span>
              <span>Type: {contentTypes.find(t => t.id === generatedContent.contentType)?.name || generatedContent.contentType}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>LinkedIn:</strong> Posts perform best with professional insights and market data. Include specific investment metrics.</p>
          <p><strong>Instagram:</strong> Focus on lifestyle and visual appeal. Use emojis naturally and mention experiences over numbers.</p>
          <p><strong>Facebook:</strong> Encourage community engagement. Ask questions and invite discussion.</p>
        </CardContent>
      </Card>
    </div>
  );
}
