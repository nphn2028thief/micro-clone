import { Skeleton } from "@/components/ui/skeleton";

const CanvaToolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      <div className="flex flex-col items-center bg-white px-4 py-1.5 rounded-md shadow-md">
        <div className="">Pencil</div>
        <div className="">Square</div>
        <div className="">Circle</div>
        <div className="">Ellipsis</div>
      </div>
      <div className="flex flex-col items-center bg-white px-4 py-1.5 rounded-md shadow-md">
        <div className="">Undo</div>
        <div className="">Redo</div>
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
