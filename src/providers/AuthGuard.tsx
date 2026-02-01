"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const isAuthPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/reset-password") ||
      pathname.startsWith("/change-password") ||
      pathname.startsWith("/verify");

    if (!isLoggedIn && !isAuthPage) {
      router.replace("/login");
    }

    if (isLoggedIn && isAuthPage) {
      router.replace("/");
    }
    // nothing

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecking(false);
  }, [pathname, router]);

  if (checking) return null;

  return <>{children}</>;
}
