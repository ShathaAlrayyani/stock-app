import Link from "next/link";
import Image from "next/image";
import { UserDropdown } from "../UserDropdown";
import { NavItems } from "../NavItems";
export const Header = ({ user }: { user: User }) => {
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
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
