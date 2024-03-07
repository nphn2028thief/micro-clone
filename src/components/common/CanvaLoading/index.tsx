import Loading from "../Loading";
import CanvaInfo from "@/components/features/Canvas/Info";
import CanvaParticipant from "@/components/features/Canvas/Participant";
import CanvaToolbar from "@/components/features/Canvas/Toolbar";

const CanvaLoading = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center bg-neutral-100 touch-none">
      <Loading />
      <CanvaInfo.Skeleton />
      <CanvaParticipant.Skeleton />
      <CanvaToolbar.Skeleton />
    </div>
  );
};

export default CanvaLoading;
