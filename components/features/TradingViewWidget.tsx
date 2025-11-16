"use client";
import { useTradingViewWidget } from "@/hooks/useTradingViewWidget";
import classNames from "classnames";
import { memo } from "react";

interface ITradingViewWidgetProps {
  className?: string;
  config: Record<string, unknown>;
  height?: number;
  scriptUrl: string;
  title?: string;
}

const TradingViewWidget = ({
  className='',
  config,
  height = 600,
  scriptUrl,
  title,
}: ITradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget({ config, height, scriptUrl });

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={classNames("tradingview-widget-container", className)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
