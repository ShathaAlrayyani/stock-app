import Link from "next/link";
import Image from "next/image";
import { UserDropdown } from "../UserDropdown";
import { NavItems } from "../NavItems";
import { searchStocks } from "@/lib/actions/finnhub.actions";
export const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            alt="Signalist logo"
            className="h-8 w-auto cursor-pointer"
            height={140}
            src="/assets/icons/logo.svg"
            width={140}
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};
