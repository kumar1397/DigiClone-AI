"use client";
import { useEffect, useState } from "react";
import CloneCreatorDashboard from "@/components/dashboard/clonecreator";
import NonCloneUserDashboard from "@/components/dashboard/nonclonecreator";

const Dashboard = () => {
  const [hasClone, setHasClone] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [cloneId, setCloneId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId ?? null);
      setCloneId(user.cloneId ?? null);
      setHasClone(!!user.cloneId);
    } 
    setLoading(false);
  }, []);



  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!hasClone) {
    return <NonCloneUserDashboard userId={userId} />;
  }

  return (
    <CloneCreatorDashboard userId={userId} cloneId={cloneId} />
  );
};

export default Dashboard;
