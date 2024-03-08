"use client";

import { PointerEvent, WheelEvent, useCallback, useState } from "react";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "../../../../liveblocks.config";

import CanvaInfo from "./Info";
import CanvaParticipant from "./Participant";
import CanvaToolbar from "./Toolbar";
import CursorPresence from "./CursorsPresence";
import { ECanvasMode } from "@/constants/canvas";
import { canvasPointerEvent } from "@/lib/utils";
import { TCamera, TCanvasState } from "@/types/canvas";

const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.NONE,
  });
  const [camera, setCamera] = useState<TCamera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleWheel = useCallback((e: WheelEvent) => {
    setCamera((prev) => ({
      x: prev.x - e.deltaX,
      y: prev.y - e.deltaY,
    }));
  }, []);

  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: PointerEvent) => {
      e.preventDefault();

      const cursor = canvasPointerEvent(e, camera);

      setMyPresence({ cursor });
    },
    []
  );

  const handlePointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

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
      <svg
        className="w-screen h-screen"
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <g>
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
