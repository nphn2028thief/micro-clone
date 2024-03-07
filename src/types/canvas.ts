import { ECanvasMode, ELayerType } from "@/constants/canvas";

export type TCanvasState =
  | { mode: ECanvasMode.NONE }
  | { mode: ECanvasMode.PRESSING; origin: TPoint }
  | { mode: ECanvasMode.SELECTION_NET; origin: TPoint; current?: TPoint }
  | { mode: ECanvasMode.TRANSLATING; current: TPoint }
  | {
      mode: ECanvasMode.INSERTING;
      layerType:
        | ELayerType.Text
        | ELayerType.Note
        | ELayerType.Path
        | ELayerType.Squares
        | ELayerType.Circle;
    }
  | { mode: ECanvasMode.RESIZING; initialBounds: TState; corner: TSide }
  | { mode: ECanvasMode.PENCIL };

export type TColor = {
  r: number;
  g: number;
  b: number;
};

export type TCamera = {
  x: number;
  y: number;
};

export interface BaseLayer {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  value?: string;
}

export type TTextLayer = BaseLayer & {
  type: ELayerType.Text;
};

export type TNoteLayer = BaseLayer & {
  type: ELayerType.Note;
};

export type TPathLayer = BaseLayer & {
  type: ELayerType.Path;
  points: number[][];
};

export type TSquaresLayer = BaseLayer & {
  type: ELayerType.Squares;
};

export type TCircleLayer = BaseLayer & {
  type: ELayerType.Circle;
};

export type TPoint = {
  x: number;
  y: number;
};

export type TState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum TSide {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type TLayer =
  | TTextLayer
  | TNoteLayer
  | TPathLayer
  | TSquaresLayer
  | TCircleLayer;
