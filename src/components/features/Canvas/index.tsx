import CanvaInfo from "./Info";
import CanvaParticipant from "./Participant";
import CanvaToolbar from "./Toolbar";

const Canvas = ({ boardId }: { boardId: string }) => {
  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <CanvaInfo boardId={boardId} />
      <CanvaParticipant />
      <CanvaToolbar />
    </main>
  );
};

export default Canvas;
