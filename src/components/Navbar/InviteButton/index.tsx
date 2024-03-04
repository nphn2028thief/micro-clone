import { OrganizationProfile } from "@clerk/nextjs";
import { Plus, X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[880px] p-0 bg-transparent border-none">
        <div className="relative">
          <OrganizationProfile
            appearance={{
              elements: {
                rootBox: {
                  margin: "0 auto",
                },
              },
            }}
          />
          <DialogClose className="absolute right-10 top-4 p-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
