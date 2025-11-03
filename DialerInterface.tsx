import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AMD_STRATEGIES = [
  { value: "twilio_native", label: "Twilio Native AMD", description: "Built-in Twilio detection" },
  { value: "jambonz", label: "Jambonz SIP", description: "Enhanced SIP-based detection" },
  { value: "huggingface", label: "Hugging Face ML", description: "AI model detection" },
  { value: "gemini_flash", label: "Gemini Flash", description: "Real-time LLM analysis" },
];

const TEST_NUMBERS = [
  { number: "1-800-774-2678", name: "Costco (Voicemail)" },
  { number: "1-800-806-6453", name: "Nike (Voicemail)" },
  { number: "1-888-221-1161", name: "PayPal (Voicemail)" },
];

type CallStatus = "idle" | "dialing" | "ringing" | "detecting" | "completed" | "error";
type DetectionResult = "human" | "machine" | "voicemail" | "undecided" | null;

export const DialerInterface = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amdStrategy, setAmdStrategy] = useState("twilio_native");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [detectionResult, setDetectionResult] = useState<DetectionResult>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const { toast } = useToast();

  const handleDial = async () => {
    if (!phoneNumber || !amdStrategy) {
      toast({
        title: "Missing Information",
        description: "Please enter a phone number and select an AMD strategy.",
        variant: "destructive",
      });
      return;
    }

    setCallStatus("dialing");
    setDetectionResult(null);
    setConfidence(null);

    // Simulate call flow
    setTimeout(() => setCallStatus("ringing"), 1000);
    setTimeout(() => setCallStatus("detecting"), 3000);
    setTimeout(() => {
      const mockResults: DetectionResult[] = ["human", "machine", "voicemail"];
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetectionResult(result);
      setConfidence(Math.random() * 0.3 + 0.7); // 0.7 - 1.0
      setCallStatus("completed");
      
      toast({
        title: "Detection Complete",
        description: `Detected: ${result.toUpperCase()} (${((confidence || 0) * 100).toFixed(0)}% confidence)`,
      });
    }, 7000);
  };

  const getStatusBadge = () => {
    const statusConfig = {
      idle: { label: "Ready", variant: "secondary" as const, icon: null },
      dialing: { label: "Dialing...", variant: "default" as const, icon: Loader2 },
      ringing: { label: "Ringing", variant: "default" as const, icon: Loader2 },
      detecting: { label: "Detecting AMD", variant: "default" as const, icon: Loader2 },
      completed: { label: "Completed", variant: "secondary" as const, icon: CheckCircle2 },
      error: { label: "Error", variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[callStatus];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="px-4 py-2">
        {Icon && <Icon className={`w-4 h-4 mr-2 ${callStatus === "dialing" || callStatus === "ringing" || callStatus === "detecting" ? "animate-spin" : ""}`} />}
        {config.label}
      </Badge>
    );
  };

  const getResultBadge = () => {
    if (!detectionResult) return null;

    const resultConfig = {
      human: { color: "bg-success", icon: CheckCircle2, label: "Human Detected" },
      machine: { color: "bg-destructive", icon: XCircle, label: "Machine Detected" },
      voicemail: { color: "bg-destructive", icon: XCircle, label: "Voicemail Detected" },
      undecided: { color: "bg-warning", icon: AlertCircle, label: "Undecided" },
    };

    const config = resultConfig[detectionResult];
    const Icon = config.icon;

    return (
      <div className={`${config.color} text-white px-6 py-4 rounded-lg flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6" />
          <div>
            <p className="font-semibold text-lg">{config.label}</p>
            {confidence && (
              <p className="text-sm opacity-90">Confidence: {(confidence * 100).toFixed(1)}%</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>Outbound Dialer</span>
            {getStatusBadge()}
          </CardTitle>
          <CardDescription>
            Configure and initiate calls with AMD detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Target Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (800) 555-0123"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={callStatus !== "idle"}
              className="bg-secondary border-border font-mono"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {TEST_NUMBERS.map((test) => (
                <Button
                  key={test.number}
                  variant="outline"
                  size="sm"
                  onClick={() => setPhoneNumber(test.number)}
                  disabled={callStatus !== "idle"}
                  className="text-xs"
                >
                  {test.name}
                </Button>
              ))}
            </div>
          </div>

          {/* AMD Strategy Selection */}
          <div className="space-y-2">
            <Label htmlFor="amdStrategy">AMD Strategy</Label>
            <Select value={amdStrategy} onValueChange={setAmdStrategy} disabled={callStatus !== "idle"}>
              <SelectTrigger id="amdStrategy" className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AMD_STRATEGIES.map((strategy) => (
                  <SelectItem key={strategy.value} value={strategy.value}>
                    <div>
                      <p className="font-medium">{strategy.label}</p>
                      <p className="text-xs text-muted-foreground">{strategy.description}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Detection Result */}
          {detectionResult && (
            <div className="space-y-2">
              {getResultBadge()}
            </div>
          )}

          {/* Dial Button */}
          <Button
            onClick={handleDial}
            disabled={callStatus !== "idle"}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            {callStatus === "idle" ? (
              <>
                <Phone className="mr-2 h-5 w-5" />
                Dial Now
              </>
            ) : (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Call in Progress
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Testing Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use the provided test numbers to simulate voicemail detection</p>
          <p>• Test with your own number to verify human detection</p>
          <p>• Expected accuracy: &gt;85% for machine detection</p>
          <p>• Detection typically completes in &lt;3 seconds</p>
        </CardContent>
      </Card>
    </div>
  );
};