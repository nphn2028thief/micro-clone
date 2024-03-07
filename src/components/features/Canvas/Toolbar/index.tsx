"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import ToolbarButton from "./Button";
import { ECanvasMode, ELayerType } from "@/constants/canvas";
import { TCanvasState } from "@/types/canvas";

interface IProps {
  canvasState: TCanvasState;
  setCanvasState: Dispatch<SetStateAction<TCanvasState>>;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const CanvaToolbar = (props: IProps) => {
  const { canvasState, setCanvasState, onUndo, onRedo, canUndo, canRedo } =
    props;

  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 bg-white p-2 rounded-md shadow-md">
        <ToolbarButton
          label="Select"
          icon={MousePointer2}
          isActive={
            canvasState.mode === ECanvasMode.NONE ||
            canvasState.mode === ECanvasMode.PRESSING ||
            canvasState.mode === ECanvasMode.SELECTION_NET ||
            canvasState.mode === ECanvasMode.TRANSLATING ||
            canvasState.mode === ECanvasMode.RESIZING
          }
          onClick={() => setCanvasState({ mode: ECanvasMode.NONE })}
        />
        <ToolbarButton
          label="Text"
          icon={Type}
          isActive={
            canvasState.mode === ECanvasMode.INSERTING &&
            canvasState.layerType === ELayerType.Text
          }
          onClick={() =>
            setCanvasState({
              mode: ECanvasMode.INSERTING,
              layerType: ELayerType.Text,
            })
          }
        />
        <ToolbarButton
          label="Sticky note"
          icon={StickyNote}
          isActive={
            canvasState.mode === ECanvasMode.INSERTING &&
            canvasState.layerType === ELayerType.Note
          }
          onClick={() =>
            setCanvasState({
              mode: ECanvasMode.INSERTING,
              layerType: ELayerType.Note,
            })
          }
        />
        <ToolbarButton
          label="Squares"
          icon={Square}
          isActive={
            canvasState.mode === ECanvasMode.INSERTING &&
            canvasState.layerType === ELayerType.Squares
          }
          onClick={() =>
            setCanvasState({
              mode: ECanvasMode.INSERTING,
              layerType: ELayerType.Squares,
            })
          }
        />
        <ToolbarButton
          label="Circle"
          icon={Circle}
          isActive={
            canvasState.mode === ECanvasMode.INSERTING &&
            canvasState.layerType === ELayerType.Circle
          }
          onClick={() =>
            setCanvasState({
              mode: ECanvasMode.INSERTING,
              layerType: ELayerType.Circle,
            })
          }
        />
        <ToolbarButton
          label="Pencil"
          icon={Pencil}
          isActive={canvasState.mode === ECanvasMode.PENCIL}
          onClick={() =>
            setCanvasState({
              mode: ECanvasMode.PENCIL,
            })
          }
        />
      </div>
      <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-md shadow-md">
        <ToolbarButton
          label="Undo"
          icon={Undo2}
          isActive={false}
          disabled={!canUndo}
          onClick={onUndo}
        />
        <ToolbarButton
          label="Redo"
          icon={Redo2}
          isActive={false}
          disabled={!canRedo}
          onClick={onRedo}
        />
      </div>
    </div>
  );
};

CanvaToolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="w-[80px] h-[360px] absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white rounded-md shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CanvaToolbar;
