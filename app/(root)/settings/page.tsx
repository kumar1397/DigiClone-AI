"use client";
import { useEffect, useState } from "react";
import CloneCreatorDashboard from "@/components/dashboard/clonecreator";
import NonCloneUserDashboard from "@/components/dashboard/nonclonecreator";

const Dashboard = () => {
  const [hasClone, setHasClone] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [cloneId, setCloneId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email) {
        setUserEmail(userData.email);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCloneInfo = async () => {
      if (!userEmail) return;

      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          }
        );

        const userData = await userRes.json();

        if (userData.cloneId) {
          setHasClone(true);
          setCloneId(userData.cloneId);
        }

        if (userData._id) {
          setUserId(userData._id);
          localStorage.setItem("userId", userData._id);
        }
      } catch (err) {
        console.error("Error fetching clone info:", err);
      } finally {
        setLoading(false); // ✅ stop loading after fetch
      }
    };

    fetchCloneInfo();
  }, [userEmail]);

  // ✅ Wait until loading finishes
  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!hasClone) {
    return <NonCloneUserDashboard userId={userId ?? ""} />;
  }

  return (
    <CloneCreatorDashboard userId={userId || ""} cloneId={cloneId || ""} />
  );
};

export default Dashboard;
