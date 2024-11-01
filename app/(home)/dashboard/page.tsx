"use client";
import OnboardingPage from "@/app/onboarding/page";
import ProjectList from "@/components/ProjectList";

const Dashboard = () => {
  return (
    <div className=" w-full h-screen overflow-y-auto">
      <ProjectList />
      {/* <div className="fixed top-0 left-0 w-screen h-screen">
        <OnboardingPage />
      </div> */}
    </div>
  );
};

export default Dashboard;
