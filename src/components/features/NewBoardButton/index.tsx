import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";

import Loading from "@/components/common/Loading";
import useApiMutation from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { IBoardCreateRequest } from "@/types/board";
import { EPath } from "@/constants/path";

interface IProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = (props: IProps) => {
  const { orgId, disabled = false } = props;

  const router = useRouter();

  const { mutate, isPending } = useApiMutation<IBoardCreateRequest>(
    api.board.create
  );

  const handleCreateBoard = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created!");
        router.push(`${EPath.BOARD}/${id}`);
      })
      .catch(() => toast.error("Create board failure!"));
  };

  return (
    <>
      <button
        disabled={disabled}
        className={cn(
          "flex flex-col justify-center items-center aspect-[100/127] p-6 border hover:border-2 border-blue-600 rounded-lg hover:border-blue-700",
          disabled && "cursor-default opacity-75 hover:border-blue-600"
        )}
        onClick={handleCreateBoard}
      >
        <Plus className="w-12 h-12 text-blue-600 stroke-1" />
        <p className="text-sm text-blue-600 font-light">New board</p>
      </button>

      {isPending ? (
        <Loading className="fixed inset-0 bg-black/10 z-[999]" />
      ) : null}
    </>
  );
};

export default NewBoardButton;
