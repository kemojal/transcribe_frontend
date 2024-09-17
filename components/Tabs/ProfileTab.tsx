"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BASEURL } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import ProfileDialog from "../Dialogues/ProfileDialog";
import { DownloadIcon } from "lucide-react";

export const ProfileTab = () => {
  const [activeSettingsTab, setActiveSettingsTab] = useState("Details");
  const settingsTabs = [
    "Details",
    "Personal",
    "Account",
    "Profile",
    "Security",
    "Appearance",
    "API",
  ];

  const [userData, setUserData] = useState(null);
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    last_four: "",
    brand: "",
    exp_month: "",
    exp_year: "",
  });

  const [connectedProviders, setConnectedProviders] = useState([]);
  const router = useRouter();
  const { toast } = useToast();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchCards();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${BASEURL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASEURL}/users/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast({
        title: "Error",
        description: "Failed to fetch cards.",
        variant: "destructive",
      });
    }
  };

  const handleAddCard = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASEURL}/users/cards`, newCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCards();
      setNewCard({ last_four: "", brand: "", exp_month: "", exp_year: "" });
      toast({
        title: "Success",
        description: "Card added successfully.",
      });
    } catch (error) {
      console.error("Error adding card:", error);
      toast({
        title: "Error",
        description: "Failed to add card.",
        variant: "destructive",
      });
    }
  };

  const handleEditCard = async (cardId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASEURL}/users/cards/${cardId}`, editingCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCards();
      setEditingCard(null);
      toast({
        title: "Success",
        description: "Card updated successfully.",
      });
    } catch (error) {
      console.error("Error updating card:", error);
      toast({
        title: "Error",
        description: "Failed to update card.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASEURL}/users/cards/${cardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCards();
      toast({
        title: "Success",
        description: "Card removed successfully.",
      });
    } catch (error) {
      console.error("Error removing card:", error);
      toast({
        title: "Error",
        description: "Failed to remove card.",
        variant: "destructive",
      });
    }
  };

  const fetchConnectedProviders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASEURL}/users/connected-providers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnectedProviders(response.data.providers);
    } catch (error) {
      console.error("Error fetching connected providers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch connected providers.",
        variant: "destructive",
      });
    }
  };

  const handleConnect = async (provider) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASEURL}/users/connect-provider`,
        { provider },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchConnectedProviders();
      toast({
        title: "Success",
        description: `Successfully connected ${provider} account.`,
      });
    } catch (error) {
      console.error(`Error connecting ${provider} account:`, error);
      toast({
        title: "Error",
        description: `Failed to connect ${provider} account. ${
          error.response?.data?.detail || error.message
        }`,
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async (provider) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASEURL}/users/disconnect-provider`,
        { provider },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchConnectedProviders();
      toast({
        title: "Success",
        description: `Successfully disconnected ${provider} account.`,
      });
    } catch (error) {
      console.error(`Error disconnecting ${provider} account:`, error);
      toast({
        title: "Error",
        description: `Failed to disconnect ${provider} account. ${
          error.response?.data?.detail || error.message
        }`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASEURL}/users/delete-account`,
        { password: deletePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Success",
        description: "Your account has been deleted successfully.",
      });
      // Clear local storage and redirect to home page or login page
      localStorage.removeItem("token");
      router.push("/login");
      console.log("deleteAccount");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.detail || "Failed to delete account.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletePassword("");
    }
  };

  if (!userData) {
    return (
      <p className="text-center text-gray-500 mt-8">Loading your profile...</p>
    );
  }

  return (
    <div className="w-full px-4 py-8 bg-white">
      <Tabs defaultValue="personal-info" className="space-y-8 w-full ">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent max-w-lg">
          {[
            "personal-info",
            "sign-in-methods",
            "billing",
            "delete-account",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all
                         data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal-info" className="bg-white">
          <div className="flex justify-between items-center p-4 border-b-[1px] border-gray-100">
            <div>
              <h1 className="">Profile details</h1>
              <p className="text-sm text-gray-500 mt-1">
                You can change your profile details here
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="flex gap-1 items-center bg-red-500">
                <span>
                  <DownloadIcon className="w-6 h-6" />
                </span>
                <span className="sr-only">Export data</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-8 items-center p-4 border-b-[1px] border-gray-100">
            <div>
              <h1 className="">Profile details</h1>
              <p className="text-sm text-gray-500 mt-1">
                You can change your profile details here
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20 rounded-full border-4 border-primary">
                  <AvatarImage
                    src={userData.profileImage}
                    alt={userData.username}
                  />
                  <AvatarFallback className="text-xl">
                    {userData.username[0]}
                  </AvatarFallback>
                </Avatar>
                <Button className="rounded-full px-6">Change Picture</Button>
              </div>
            </div>
          </div>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24 rounded-full border-4 border-primary">
                  <AvatarImage
                    src={userData.profileImage}
                    alt={userData.username}
                  />
                  <AvatarFallback className="text-xl">
                    {userData.username[0]}
                  </AvatarFallback>
                </Avatar>
                <Button className="rounded-full px-6">Change Picture</Button>
              </div> */}
              <div className="grid grid-cols-2 gap-6">
                {["firstName", "lastName", "email"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-600"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Input
                      id={field}
                      value={userData[field]}
                      disabled={field === "email"}
                      className="rounded-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
              <Button className="rounded-full px-8 w-full sm:w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sign-in-methods">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Sign-in Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["google.com", "apple.com", "password"].map((providerId) => {
                  const isConnected = connectedProviders?.includes(providerId);
                  const providerName =
                    providerId === "google.com"
                      ? "Google"
                      : providerId === "apple.com"
                      ? "Apple"
                      : "Email";
                  return (
                    <div
                      key={providerId}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium">{providerName}</span>
                      <Button
                        variant={isConnected ? "secondary" : "outline"}
                        className="rounded-full px-6"
                        onClick={() =>
                          isConnected
                            ? handleDisconnect(providerId)
                            : handleConnect(providerName)
                        }
                        disabled={providerId === "password"}
                      >
                        {isConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Billing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium">
                      {card.brand} •••• {card.last_four}
                      {card.is_default && " (Default)"}
                    </span>
                    {editingCard && editingCard.id === card.id ? (
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          value={editingCard.exp_month}
                          onChange={(e) =>
                            setEditingCard({
                              ...editingCard,
                              exp_month: e.target.value,
                            })
                          }
                          placeholder="MM"
                          className="w-16"
                        />
                        <Input
                          type="text"
                          value={editingCard.exp_year}
                          onChange={(e) =>
                            setEditingCard({
                              ...editingCard,
                              exp_year: e.target.value,
                            })
                          }
                          placeholder="YYYY"
                          className="w-20"
                        />
                        <Button
                          onClick={() => handleEditCard(card.id)}
                          className="rounded-full px-4"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingCard(null)}
                          variant="outline"
                          className="rounded-full px-4"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <Button
                          onClick={() => setEditingCard(card)}
                          variant="outline"
                          className="rounded-full px-4"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteCard(card.id)}
                          variant="destructive"
                          className="rounded-full px-4"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 space-y-2">
                  <Input
                    type="text"
                    value={newCard.last_four}
                    onChange={(e) =>
                      setNewCard({ ...newCard, last_four: e.target.value })
                    }
                    placeholder="Last 4 digits"
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={newCard.brand}
                    onChange={(e) =>
                      setNewCard({ ...newCard, brand: e.target.value })
                    }
                    placeholder="Card brand"
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={newCard.exp_month}
                      onChange={(e) =>
                        setNewCard({ ...newCard, exp_month: e.target.value })
                      }
                      placeholder="MM"
                      className="w-1/2"
                    />
                    <Input
                      type="text"
                      value={newCard.exp_year}
                      onChange={(e) =>
                        setNewCard({ ...newCard, exp_year: e.target.value })
                      }
                      placeholder="YYYY"
                      className="w-1/2"
                    />
                  </div>
                  <Button
                    onClick={handleAddCard}
                    className="rounded-full px-6 w-full"
                  >
                    Add New Card
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete-account">
          <Card className="border-none shadow-lg bg-red-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600">
                Delete Your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-red-700">
                Warning: This action is irreversible. All your data will be
                permanently deleted.
              </p>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="rounded-full px-8 bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProfileDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        deletePassword={deletePassword}
        setDeletePassword={setDeletePassword}
        handleDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};
