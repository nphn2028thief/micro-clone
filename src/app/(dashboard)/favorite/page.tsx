"use client";

import { useOrganization } from "@clerk/nextjs";

import BoardList from "@/components/features/BoardList";
import EmptyOrg from "@/components/features/EmptyOrg";
import { IParams } from "@/types/params";

const FavoritePage = ({ searchParams }: { searchParams: IParams }) => {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%_-_64px)] p-3">
      {organization ? (
        <BoardList orgId={organization.id} search={searchParams.search} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
};

export default FavoritePage;
