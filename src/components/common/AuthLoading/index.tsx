import Image from "next/image";

const AuthLoading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999999]">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default AuthLoading;
