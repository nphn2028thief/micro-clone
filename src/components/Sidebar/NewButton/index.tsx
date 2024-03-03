import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Hint from "@/components/Hint";

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
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
