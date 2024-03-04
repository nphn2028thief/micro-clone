import { CreateOrganization } from "@clerk/nextjs";
import { Plus, X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Hint from "@/components/common/Hint";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create organization" side="right" sideOffset={8}>
            <button className="w-full h-full flex justify-center items-center text-white bg-white/25 opacity-60 hover:opacity-100 transition rounded-md">
              <Plus />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none">
        <div className="relative">
          <CreateOrganization />
          <DialogClose className="absolute right-4 xs:right-10 top-4 p-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
