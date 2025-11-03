import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CallHistory } from "@/components/dashboard/CallHistory";

const History = () => {
  return (
    <DashboardLayout activeTab="history">
      <CallHistory />
    </DashboardLayout>
  );
};

export default History;