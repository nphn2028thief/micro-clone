"use client";

import { useOthers, useSelf } from "../../../../../liveblocks.config";

import UserAvatar from "../../UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_SHOW_USERS } from "@/constants/user";
import { generateColorWithConnectionId } from "@/lib/utils";

const CanvaParticipant = () => {
  const currentUser = useSelf();
  const users = useOthers();

  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute top-3 right-2 bg-white rounded-md px-4 py-1.5 shadow-md">
      <div className="flex gap-2">
        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            label={info?.name || "Anonymous"}
            sideOffset={10}
            src={info?.picture}
            fallback="A"
            style={{
              borderColor: `${generateColorWithConnectionId(connectionId)}`,
            }}
          />
        ))}

        {currentUser ? (
          <UserAvatar
            label={`${currentUser.info?.name} (You)` || "Anonymous"}
            sideOffset={10}
            src={currentUser.info?.picture}
            fallback="A"
            style={{
              borderColor: `${generateColorWithConnectionId(
                currentUser.connectionId
              )}`,
            }}
          />
        ) : null}

        {hasMoreUsers ? (
          <UserAvatar
            label={`${users.length - MAX_SHOW_USERS} more`}
            sideOffset={10}
            fallback={`+${users.length - MAX_SHOW_USERS}`}
          />
        ) : null}
      </div>
    </div>
  );
};

CanvaParticipant.Skeleton = function ParticipantSkeleton() {
  return (
    <div className="w-[120px] h-9 absolute top-2 right-2 bg-white rounded-md shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CanvaParticipant;
