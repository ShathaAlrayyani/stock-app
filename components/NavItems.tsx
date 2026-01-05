"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import SearchCommand from "./SearchCommand";

export const NavItems = ({
  initialStocks,
}: {
  initialStocks: StockWithWatchlistStatus[];
}) => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => {
        if (href === "/search")
          return (
            <li key={label}>
              <SearchCommand initialStocks={initialStocks} label="Search" />
            </li>
          );
        return (
          <li key={href}>
            <Link
              href={href}
              className={classNames("hover:text-yellow-500 transition-colors", {
                "text-gray-100": isActive(href),
              })}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
