import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  return (
    <DashboardLayout activeTab="settings">
      <div className="max-w-4xl space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
            <CardDescription>Configure your AMD system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Integration Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Twilio</span>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      API credentials required for live calling
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Jambonz</span>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      SIP trunk setup required
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Hugging Face</span>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Python ML service connection
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Gemini Flash</span>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      API key required for LLM analysis
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                <div className="p-4 bg-card/50 rounded-lg space-y-2 text-sm text-muted-foreground">
                  <p>1. Set up Twilio account and configure API credentials</p>
                  <p>2. Configure Jambonz SIP trunk for enhanced AMD</p>
                  <p>3. Deploy Python microservice for Hugging Face integration</p>
                  <p>4. Add Gemini API key for real-time audio analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;