"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";
import useApiMutation from "@/hooks/useApiMutation";
import useRenameModal from "@/hooks/useRenameModal";
import { IBoardUpdateRequest } from "@/types/board";

const RenameModal = () => {
  const { isOpen, initialState, onClose } = useRenameModal();

  const [title, setTitle] = useState<string>("");

  const { mutate, isPending } = useApiMutation<IBoardUpdateRequest>(
    api.board.update
  );

  useEffect(() => {
    setTitle(initialState.title);
  }, [initialState]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === initialState.title) {
      onClose();
      return;
    }

    mutate({ id: initialState.id, title })
      .then(() => {
        toast.success("Board updated!");
        onClose();
      })
      .catch(() => toast.error("Update board failure!"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogClose className="absolute top-2 right-2 p-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            value={title}
            maxLength={60}
            placeholder="Enter board title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit">Save</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>

        {isPending ? (
          <Loading className="fixed inset-0 bg-black/10 z-[999]" />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
