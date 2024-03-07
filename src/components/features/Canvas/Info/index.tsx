"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Hint from "@/components/common/Hint";
import TabSeparator from "@/components/common/TabSeparator";
import Actions from "@/components/common/Actions";
import { EPath } from "@/constants/path";
import useRenameModal from "@/hooks/useRenameModal";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const CanvaInfo = ({ boardId }: { boardId: string }) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  const { onOpen } = useRenameModal();

  if (!data) {
    return <CanvaInfo.Skeleton />;
  }

  return (
    <div className="absolute left-2 top-2 flex items-center bg-white rounded-md px-2 py-1.5 shadow-md">
      <Hint label="Go to team boards" side="bottom" sideOffset={10}>
        <Button variant="board" className="px-2" asChild>
          <Link href={EPath.DASHBOARD}>
            <Image
              src="/icons/logo.svg"
              alt="board logo"
              width={40}
              height={40}
            />
            <span
              className={cn(
                "font-semibold text-lg ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

CanvaInfo.Skeleton = function CanvaInfoSkeleton() {
  return (
    <div className="w-[300px] h-9 absolute left-2 top-2 bg-white rounded-md shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CanvaInfo;
