"use client";

import { useSelf } from "../../../../liveblocks.config";

import CanvaInfo from "./Info";
import CanvaParticipant from "./Participant";
import CanvaToolbar from "./Toolbar";

const Canvas = ({ id }: { id: string }) => {
  const info = useSelf((me) => me.info);

  console.log({ info });

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <CanvaInfo />
      <CanvaParticipant />
      <CanvaToolbar />
    </main>
  );
};

export default Canvas;
