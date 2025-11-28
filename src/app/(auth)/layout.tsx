import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <main className="w-full h-full ">{children}</main>
      {/* <aside className="w-full h-full relative bg-primary/5"></aside> */}
    </div>
  );
};

export default AuthLayout;
