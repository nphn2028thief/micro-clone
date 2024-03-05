"use client";

import { ReactNode, useLayoutEffect, useState } from "react";

const CheckScreen = ({ children }: { children: ReactNode }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  if (windowWidth < 600) {
    return (
      <div className="flex justify-center items-center text-center fixed inset-0 px-4 bg-white">
        <h2 className="text-sm text-[#565872] tracking-[2px] uppercase">
          Sorry! Currently this screen size is not supported!
        </h2>
      </div>
    );
  }

  return children;
};

export default CheckScreen;
