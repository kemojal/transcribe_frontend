"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASEURL } from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProfileTab = () => {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${BASEURL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <Tabs defaultValue="account" className=" mt-2">
      <TabsList>
        <TabsTrigger value="account">Your details</TabsTrigger>
        <TabsTrigger value="password">Push notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {/* <p>Manage your account details here.</p> */}
        {userData ? (
          <div className="grid grid-cols-4 gap-10 py-4">
            <p className="flex flex-col ">
              <strong className="font-bold">Username</strong>
              <span className="text-sm text-muted-foreground">The name associated with this account</span>
              <Input type="text" value={userData.username} disabled={true} />
            </p>
            <p className="flex flex-col ">
              {/* <strong>Email:</strong> {userData.email} */}
              <strong className="font-bold">Email address</strong>
              <span className="text-sm text-muted-foreground">The email address associated with this account</span>
              <Input type="text" value={userData.email} disabled={true} />
            </p>
          </div>
        ) : (
          <p>Loading your account details...</p>
        )}
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="integrations">Integrations here.</TabsContent>
    </Tabs>
  );
};
