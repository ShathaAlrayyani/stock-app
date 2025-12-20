import Link from "next/link";

export const FooterLink = ({ href, linkText, text }: FooterLinkProps) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-500">
        {text}{` `}
        <Link className="footer-link" href={href}>{linkText}</Link>
      </p>
    </div>
  );
};
