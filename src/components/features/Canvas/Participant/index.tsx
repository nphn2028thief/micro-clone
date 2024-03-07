import { Skeleton } from "@/components/ui/skeleton";

const CanvaParticipant = () => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md px-4 py-1.5 shadow-md">
      Participant
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
