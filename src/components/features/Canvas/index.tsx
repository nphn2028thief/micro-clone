"use client";

import { useState } from "react";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
} from "../../../../liveblocks.config";

import CanvaInfo from "./Info";
import CanvaParticipant from "./Participant";
import CanvaToolbar from "./Toolbar";
import { ECanvasMode } from "@/constants/canvas";
import { TCanvasState } from "@/types/canvas";

const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.NONE,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <CanvaInfo boardId={boardId} />
      <CanvaParticipant />
      <CanvaToolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        onUndo={history.undo}
        onRedo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  );
};

export default Canvas;
