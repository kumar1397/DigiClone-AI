"use client";
import { useEffect, useState } from "react";
import CloneCreatorDashboard from "@/components/dashboard/clonecreator";
import NonCloneUserDashboard from "@/components/dashboard/nonclonecreator";

const Dashboard = () => {
  // Simulating user state - in real app, this would come from authentication
  const [hasClone, setHasClone] = useState(false); 
  const [userId, setUserId] = useState<string | null>(null);
  const [cloneId, setCloneId] = useState<string | null>(null);
  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchCloneInfo = async () => {
      try {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`);
        const userData = await userRes.json();
        if (userData.cloneId) {
          setHasClone(true);
          setCloneId(userData.cloneId);
        } 
      } catch (err) {
        
        console.error("Error fetching clone info:", err);
      } 
    };
    fetchCloneInfo();
  }, [userId]);
  // Non-clone user dashboard
  if (!hasClone) {
    return (
      <NonCloneUserDashboard userId={userId ?? ''} />
    );
  }
  return (
    <CloneCreatorDashboard userId={userId || ""} cloneId={cloneId || ""}/>
  );
};

export default Dashboard;
