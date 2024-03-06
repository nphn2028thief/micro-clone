import Canva from "@/components/features/Canva";
import Room from "@/components/features/Room";
import { IParams } from "@/types";

const BoardDetailPage = ({ params }: { params: IParams }) => {
  return (
    <Room roomId={params.id}>
      <Canva id={params.id} />
    </Room>
  );
};

export default BoardDetailPage;
