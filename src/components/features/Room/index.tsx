"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "../../../../liveblocks.config";

import CanvaLoading from "@/components/common/CanvaLoading";

interface IProps {
  roomId: string;
  children: ReactNode;
}

const Room = (props: IProps) => {
  const { roomId, children } = props;

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<CanvaLoading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
