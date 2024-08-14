import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProfileTab = () => {
  return (
    <Tabs defaultValue="account" className=" mt-2">
      <TabsList>
        <TabsTrigger value="account">My account</TabsTrigger>
        <TabsTrigger value="password">Push notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="integrations">Integrations here.</TabsContent>
    </Tabs>
  );
};
