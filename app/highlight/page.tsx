"use client";

import { useEffect, useState } from "react";
import Highlight, { type HighlightContext } from "@highlight-ai/app-runtime";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const onContext = (context: HighlightContext) => {
      setSelectedItem(context.suggestion ?? "");
    };

    Highlight.addEventListener("onContext", onContext);

    return () => {
      Highlight.removeEventListener("onContext", onContext);
    };
  }, []);

  return <p>Selected item: {selectedItem}</p>;
}
