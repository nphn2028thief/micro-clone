import CanvaInfo from "./Info";
import CanvaParticipant from "./Participant";
import CanvaToolbar from "./Toolbar";

const Canva = ({ id }: { id: string }) => {
  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <CanvaInfo />
      <CanvaParticipant />
      <CanvaToolbar />
    </main>
  );
};

export default Canva;
