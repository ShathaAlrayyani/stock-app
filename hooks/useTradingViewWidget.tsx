"use client";
import { useEffect, useRef } from "react";
interface useTradingViewWidgetProps {
  config: Record<string, unknown>;
  height: number;
  scriptUrl: string;
}

export const useTradingViewWidget = ({
  config,
  height = 600,
  scriptUrl
}: useTradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width:100%; height:${height}px"></div>`;
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [config, height, scriptUrl]);

  return containerRef;
};
