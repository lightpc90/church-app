import Link, { LinkProps } from "next/link";
import { FC, ReactNode } from "react";
import classNames from 'classnames';

interface ScrollLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const ScrollLink: FC<ScrollLinkProps> = ({ children, className, ...props }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link {...props} onClick={handleScrollToTop} scroll={false} className={className} >
      {children}
    </Link>
  );
};

export default ScrollLink;
