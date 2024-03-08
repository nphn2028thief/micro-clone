import { MousePointer2 } from "lucide-react";

import { useOther } from "../../../../../../../liveblocks.config";

import { generateColorWithConnectionId } from "@/lib/utils";

const Cursor = ({ connectionId }: { connectionId: number }) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || "Anonymous";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      width={name.length * 10 + 48}
      height={50}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        style={{
          fill: generateColorWithConnectionId(connectionId),
          color: generateColorWithConnectionId(connectionId),
        }}
        className="w-5 h-5"
      />
      <div
        style={{
          backgroundColor: generateColorWithConnectionId(connectionId),
        }}
        className="absolute left-5 rounded-md text-xs px-2 py-1.5 text-white font-semibold"
      >
        {name}
      </div>
    </foreignObject>
  );
};

export default Cursor;
