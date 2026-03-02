import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-my-green-light max-w-[90vw] w-full h-full min-h-[90vh]  rounded-xl p-5 sm:p-10 lg:flex lg:items-center lg:justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
