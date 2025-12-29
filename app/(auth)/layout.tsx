import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) redirect("/");

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            alt="Signalist Logo"
            className="h-8 w-auto"
            height={32}
            src="/assets/icons/logo.svg"
            width={140}
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">— Ethan R.</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  alt="Star"
                  className="w-5 h-5"
                  height={20}
                  key={star}
                  src="/assets/icons/star.svg"
                  width={20}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            alt="Dashboard Preview"
            className="auth-dashboard-preview absolute top-0"
            height={1150}
            src="/assets/images/dashboard.png"
            width={1440}
          />
        </div>
      </section>
    </main>
  );
};

export default layout;
