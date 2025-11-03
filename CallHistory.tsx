import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallLog {
  id: string;
  target_number: string;
  amd_strategy: string;
  detection_result: string | null;
  confidence: number | null;
  call_duration: number | null;
  status: string;
  created_at: string;
}

export const CallHistory = () => {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStrategy, setFilterStrategy] = useState<string>("all");
  const [filterResult, setFilterResult] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const fetchCallLogs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from("call_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (filterStrategy !== "all") {
        query = query.eq("amd_strategy", filterStrategy);
      }

      if (filterResult !== "all") {
        query = query.eq("detection_result", filterResult);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCallLogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch call history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, [filterStrategy, filterResult]);

  const getResultBadge = (result: string | null) => {
    if (!result) return <Badge variant="secondary">Pending</Badge>;

    const config = {
      human: { color: "bg-success text-success-foreground", icon: CheckCircle2 },
      machine: { color: "bg-destructive text-destructive-foreground", icon: XCircle },
      voicemail: { color: "bg-destructive text-destructive-foreground", icon: XCircle },
      undecided: { color: "bg-warning text-warning-foreground", icon: AlertCircle },
      timeout: { color: "bg-warning text-warning-foreground", icon: AlertCircle },
      error: { color: "bg-destructive text-destructive-foreground", icon: XCircle },
    };

    const resultConfig = config[result as keyof typeof config] || config.error;
    const Icon = resultConfig.icon;

    return (
      <Badge className={resultConfig.color}>
        <Icon className="w-3 h-3 mr-1" />
        {result.charAt(0).toUpperCase() + result.slice(1)}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Date", "Phone Number", "Strategy", "Result", "Confidence", "Duration"];
    const csvData = callLogs.map((log) => [
      new Date(log.created_at).toLocaleString(),
      log.target_number,
      log.amd_strategy,
      log.detection_result || "N/A",
      log.confidence ? `${(log.confidence * 100).toFixed(1)}%` : "N/A",
      log.call_duration ? `${log.call_duration}s` : "N/A",
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `call-history-${new Date().toISOString()}.csv`;
    a.click();

    toast({
      title: "Export Complete",
      description: "Call history has been exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Call History</CardTitle>
              <CardDescription>View and filter your call logs</CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                <SelectTrigger className="bg-secondary border-border">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="twilio_native">Twilio Native</SelectItem>
                  <SelectItem value="jambonz">Jambonz</SelectItem>
                  <SelectItem value="huggingface">Hugging Face</SelectItem>
                  <SelectItem value="gemini_flash">Gemini Flash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger className="bg-secondary border-border">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="human">Human</SelectItem>
                  <SelectItem value="machine">Machine</SelectItem>
                  <SelectItem value="voicemail">Voicemail</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Loading call history...
                    </TableCell>
                  </TableRow>
                ) : callLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No call logs found. Start dialing to see your history!
                    </TableCell>
                  </TableRow>
                ) : (
                  callLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono">{log.target_number}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.amd_strategy.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>{getResultBadge(log.detection_result)}</TableCell>
                      <TableCell>
                        {log.confidence ? `${(log.confidence * 100).toFixed(1)}%` : "—"}
                      </TableCell>
                      <TableCell>
                        {log.call_duration ? `${log.call_duration}s` : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};