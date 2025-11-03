import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2, Zap, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">AMD System</h1>
          </div>
          <Button onClick={() => navigate("/auth")} variant="outline" size="lg">
            Sign In
          </Button>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
              Advanced Telephony Solution
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Answering Machine Detection
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Leverage cutting-edge AI and telephony integrations to detect answering machines
            with precision. Connect only when humans answer.
          </p>
          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Strategy AMD</h3>
            <p className="text-muted-foreground">
              Choose from Twilio Native, Jambonz SIP, Hugging Face ML, or Gemini Flash detection
            </p>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">High Accuracy</h3>
            <p className="text-muted-foreground">
              &gt;85% machine detection rate with &lt;3 second latency for optimal performance
            </p>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comprehensive Logging</h3>
            <p className="text-muted-foreground">
              Track every call with detailed logs, confidence scores, and exportable history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
