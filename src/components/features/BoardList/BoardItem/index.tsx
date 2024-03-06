import Link from "next/link";
import Image from "next/image";
import { MouseEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Star } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../../../../../convex/_generated/api";

import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/common/Actions";
import Loading from "@/components/common/Loading";
import { EPath } from "@/constants/path";
import useApiMutation from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { IBoardResponse, IFavoriteRequest } from "@/types/board";

const BoardItem = ({ data }: { data: IBoardResponse }) => {
  const { userId } = useAuth();

  const authorLabel = userId === data.authorId ? "You" : data.authorName;
  const createdAtLabel = formatDistanceToNow(data._creationTime, {
    addSuffix: true,
  });

  const { mutate: addFavorite, isPending: isPendingAddFavorite } =
    useApiMutation<IFavoriteRequest>(api.board.favorite);
  const { mutate: removeFavorite, isPending: isPendingRemoveFavorite } =
    useApiMutation<IFavoriteRequest>(api.board.unfavorite);

  const handleFavorite = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (data.isFavorite) {
      removeFavorite({ id: data._id, orgId: data.orgId })
        .then(() => toast.success("Remove board from favorite successfully!"))
        .catch(() => toast.error("Remove board from favorite failure!"));
    } else {
      addFavorite({ id: data._id, orgId: data.orgId })
        .then(() => toast.success("Add board to favorite successfully!"))
        .catch(() => toast.error("Add board to favorite failure!"));
    }
  };

  return (
    <Link key={data._id} href={`${EPath.BOARD}/${data._id}`}>
      <div className="flex flex-col justify-between group aspect-[100/127] border rounded-lg overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={data.imageUrl}
            alt={`board-${data.title}`}
            fill
            className="p-3 object-fit"
          />
          {/* Overlay */}
          <div className="w-full h-full opacity-0 group-hover:opacity-10 transition-opacity bg-black"></div>
          <Actions id={data._id} title={data.title} side="right">
            <button className="absolute top-0 right-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        {/* Footer */}
        <div className="flex flex-col gap-0.5 relative p-3 bg-white">
          <p className="text-sm truncate">{data.title}</p>
          <p className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground transition-opacity truncate">
            {authorLabel}, {createdAtLabel}
          </p>
          <button
            className="opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600"
            onClick={handleFavorite}
          >
            <Star
              className={cn(
                "w-4 h-4",
                data.isFavorite && "fill-blue-600 text-blue-600"
              )}
            />
          </button>
        </div>

        {isPendingAddFavorite || isPendingRemoveFavorite ? (
          <Loading className="fixed inset-0 bg-black/10 z-[999]" />
        ) : null}
      </div>
    </Link>
  );
};

BoardItem.Skeleton = function BoardItemSkeleton() {
  return (
    <div className="flex flex-col justify-between group aspect-[100/127] border rounded-lg">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default BoardItem;
