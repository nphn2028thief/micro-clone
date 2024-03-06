"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";

import { Button } from "@/components/ui/button";
import Loading from "../Loading";
import useApiMutation from "@/hooks/useApiMutation";
import { IBoardCreateRequest } from "@/types/board";
import { EPath } from "@/constants/path";

const EmptyBoard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const { mutate, isPending } = useApiMutation<IBoardCreateRequest>(
    api.board.create
  );

  const handleCreateBoard = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created!");
        router.push(`${EPath.BOARD}/${id}`);
      })
      .catch(() => toast.error("Create board failure!"));
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src="/icons/note.svg"
        alt="empty search"
        width={110}
        height={110}
      />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization{" "}
        {pathname.includes(EPath.FAVORITE) && "in Team boards"}
      </p>
      {pathname.includes(EPath.FAVORITE) ? null : (
        <div className="mt-6">
          <Button size="lg" onClick={handleCreateBoard}>
            Create board
          </Button>
        </div>
      )}

      {isPending ? (
        <Loading className="fixed inset-0 bg-black/10 z-[999]" />
      ) : null}
    </div>
  );
};

export default EmptyBoard;
