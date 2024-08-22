"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, DollarSign, LogOut, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfileMenu = () => {
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
        router.push("/login");
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-8 h-8  rounded-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs">
        K
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[160px] mr-2">
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
