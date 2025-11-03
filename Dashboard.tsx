import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DialerInterface } from "@/components/dashboard/DialerInterface";

const Dashboard = () => {
  return (
    <DashboardLayout activeTab="dialer">
      <div className="max-w-4xl">
        <DialerInterface />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;