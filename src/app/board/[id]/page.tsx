import Canvas from "@/components/features/Canvas";
import Room from "@/components/features/Room";
import { IParams } from "@/types";

const BoardDetailPage = ({ params }: { params: IParams }) => {
  return (
    <Room roomId={params.id}>
      <Canvas id={params.id} />
    </Room>
  );
};

export default BoardDetailPage;
