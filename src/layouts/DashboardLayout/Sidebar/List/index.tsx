"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import Hint from "@/components/common/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SidebarList = () => {
  const { organization } = useOrganization();

  // Get all user in organization
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
      keepPreviousData: true,
    },
  });

  if (userMemberships.isLoading || userMemberships.isFetching) {
    return (
      <ul className="flex flex-col gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="aspect-square relative">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        ))}
      </ul>
    );
  }

  if (!userMemberships.data || !userMemberships.data.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-4">
      {userMemberships.data.map((item) => {
        const isActive = organization?.id === item.organization.id;

        return (
          <div key={item.organization.id} className="aspect-square relative">
            <Hint label={item.organization.name} side="right" sideOffset={8}>
              <Image
                src={item.organization.imageUrl}
                alt={`org-img-${item.organization.id}`}
                className={cn(
                  "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                  isActive && "opacity-100"
                )}
                loading="lazy"
                fill
                onClick={() => {
                  if (!setActive) return;
                  setActive({ organization: item.organization.id });
                }}
              />
            </Hint>
          </div>
        );
      })}
    </ul>
  );
};

export default SidebarList;
