"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export const NavItems = () => {
  const pathName = usePathname();
  console.log("🚀 ~ NavItems ~ pathName:", pathName);

  const isActive = (path: string) => {
    return pathName.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, title }) => (
        <li key={href}>
          <Link
            href={href}
            className={classNames("hover:text-yellow-500 transition-colors", {
              "text-gray-100": isActive(href),
            })}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
