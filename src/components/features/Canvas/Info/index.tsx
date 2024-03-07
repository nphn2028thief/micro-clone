import { Skeleton } from "@/components/ui/skeleton";

const CanvaInfo = () => {
  return (
    <div className="w-[300px] absolute left-2 top-2 bg-white rounded-md px-4 py-1.5 shadow-md">
      Info
    </div>
  );
};

CanvaInfo.Skeleton = function CanvaInfoSkeleton() {
  return (
    <div className="w-[300px] h-9 absolute left-2 top-2 bg-white rounded-md shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CanvaInfo;
