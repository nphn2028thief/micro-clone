import Image from "next/image";

const EmptyFavorite = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src="/icons/empty-favorite.svg"
        alt="empty search"
        width={140}
        height={140}
      />
      <h2 className="text-2xl font-semibold mt-6">No favorite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favoriting a board
      </p>
    </div>
  );
};

export default EmptyFavorite;
