"use client"
import CloneCreatorDashboard from "@/components/dashboard/clonecreator";
import NonCloneUserDashboard from "@/components/dashboard/nonclonecreator";
import { useUserStore } from "@/lib/useUserStore";
const Dashboard = () => {

  const { userId, cloneId } = useUserStore();

  if (!cloneId) {
    return <NonCloneUserDashboard userId={userId} />;
  }

  return (
    <CloneCreatorDashboard userId={userId} cloneId={cloneId} />
  );
};

export default Dashboard;
