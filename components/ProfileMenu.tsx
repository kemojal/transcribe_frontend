"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
// "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CreditCard,
  DollarSign,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfileMenu = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      router.push("/login");
    } else {
      try {
        const decoded: { name: string; email: string } = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return null; // or a loading spinner
  }

  const menuItems = [
    {
      label: "Your profile",
      icon: <User className="w-4 h-4 mr-2" />,
      disabled: false,
      onclick: () => {
        router.push("/profile");
      },
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      disabled: true,
      onclick: () => {},
    },
    {
      label: "Team",
      icon: <Users className="w-4 h-4 mr-2" />,
      disabled: true,
      onclick: () => {},
    },
    {
      label: "Subscription",
      icon: <DollarSign className="w-4 h-4 mr-2" />,
      disabled: true,
      onclick: () => {},
    },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4 mr-2" />,
      disabled: false,
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full"
      >
        <div
          className={`flex items-center gap-2 bg-gray-50 rounded-xl p-1 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <div className="rounded-full h-[2.25rem] w-[2.25rem] shrink-0 bg-gray-50 bg-gray-500 flex items-center justify-center text-white">
            xc
          </div>
          <div className="flex items-center justify-between w-[calc(100%-2.25rem)]">
            <div
              className={`py-4 text-muted-foreground space-y-1 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              <h3 className="text-sm font-medium leading-none text-left">
                John Doe
              </h3>
              <p className="text-xs leading-none">wz5Y9@example.com</p>
            </div>
            <div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[230px] mr-2">
        <DropdownMenuLabel>
          {/* {
            JSON.stringify(userInfo)
          } */}
          Account profile
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem
            onClick={item?.onClick}
            disabled={item.disabled}
            key={item.label}
            className="flex items-center hover:bg-gray-200  "
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
