"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loading from "../Loading";
import ConfirmModal from "@/components/modals/Confirm";
import { EPath } from "@/constants/path";
import useApiMutation from "@/hooks/useApiMutation";
import useRenameModal from "@/hooks/useRenameModal";

interface IProps {
  id: Id<"boards">;
  title: string;
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const Actions = (props: IProps) => {
  const { id, title, children, side, sideOffset } = props;

  const pathname = usePathname();
  const router = useRouter();

  const { onOpen } = useRenameModal();

  const { mutate, isPending } = useApiMutation<{ id: Id<"boards"> }>(
    api.board.remove
  );

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}${EPath.BOARD}/${id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Copy link failure!"));
  };

  const handleDeleteBoard = () => {
    mutate({ id })
      .then(() => {
        toast.success("Board deleted!");
        if (pathname !== EPath.DASHBOARD) {
          router.push(EPath.DASHBOARD);
        }
      })
      .catch(() => toast.error("Delete board failure!"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem
          className="flex gap-2 px-3 py-2 cursor-pointer"
          onClick={handleCopyLink}
        >
          <Link2 className="w-4 h-4" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 px-3 py-2 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="w-4 h-4" />
          Rename board
        </DropdownMenuItem>

        <Separator className="my-1" />

        <ConfirmModal
          title="Delete this board?"
          description="This will delete the board and all of its contents!"
          onConfirm={handleDeleteBoard}
        >
          <Button
            variant="ghost"
            className="w-full h-auto flex justify-start gap-2 px-3 py-2 text-red-600 hover:!text-red-600 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>

      {isPending ? (
        <Loading className="fixed inset-0 bg-black/10 z-[999]" />
      ) : null}
    </DropdownMenu>
  );
};

export default Actions;
