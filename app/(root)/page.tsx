import TradingViewWidget from "@/components/features/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  const baseUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            className="custom-chart"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            scriptUrl={`${baseUrl}market-overview.js`}
            title="Market Overview"
          />
        </div>
        <div className="md:col-span xl:col-span-2">
          <TradingViewWidget
            config={HEATMAP_WIDGET_CONFIG}
            scriptUrl={`${baseUrl}stock-heatmap.js`}
            title="Stock Heatmap"
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            className="custom-chart"
            config={TOP_STORIES_WIDGET_CONFIG}
            scriptUrl={`${baseUrl}timeline.js`}
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            config={MARKET_DATA_WIDGET_CONFIG}
            scriptUrl={`${baseUrl}market-quotes.js`}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
