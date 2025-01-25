// theme/RTL.tsx
import React, { useEffect } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

function createEmotionCache(dir: "rtl" | "ltr") {
  return createCache({
    key: dir === "rtl" ? "mui-rtl" : "mui",
    // This ensures the styles are inserted at the correct place
    prepend: true,
  });
}

interface RTLProps {
  direction: "rtl" | "ltr";
  children: React.ReactNode;
}

export function RTL({ direction, children }: RTLProps) {
  const cache = createEmotionCache(direction);

  // Set <html dir="rtl"> for correct text alignment
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
