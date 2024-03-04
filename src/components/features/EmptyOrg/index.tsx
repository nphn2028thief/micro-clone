import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image src="/icons/elements.svg" alt="empty" width={200} height={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to board</h2>
      <p className="text-muted-foreground mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create organization</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[480px] p-0 bg-transparent border-none">
            <div className="relative">
              <CreateOrganization />
              <DialogClose className="absolute right-4 xs:right-10 top-4 p-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
