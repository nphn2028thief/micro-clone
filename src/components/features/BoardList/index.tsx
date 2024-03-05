"use client";

import { usePathname } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import EmptySearch from "@/components/common/EmptySearch";
import EmptyFavorite from "@/components/common/EmptyFavorite";
import EmptyBoard from "@/components/common/EmptyBoard";
import NewBoardButton from "../NewBoardButton";
import BoardItem from "./BoardItem";
import { EPath } from "@/constants/path";

interface IProps {
  orgId: string;
  search?: string;
}

const BoardList = (props: IProps) => {
  const { orgId, search } = props;

  const pathname = usePathname();

  const boards = useQuery(api.boards.get, { orgId });

  if (!boards) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl">
          {pathname.includes(EPath.FAVORITE)
            ? "Favorite boards"
            : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-10">
          {Array.from({ length: 10 }, (_, index) => (
            <BoardItem.Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!boards.length && search && pathname.includes(EPath.FAVORITE)) {
    return <EmptyFavorite />;
  }

  if (!boards.length && search) {
    return <EmptySearch />;
  }

  if (!boards.length) {
    return <EmptyBoard />;
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl">
        {pathname.includes(EPath.FAVORITE) ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-10">
        <NewBoardButton orgId={orgId} />
        {boards.map((item) => (
          <BoardItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
