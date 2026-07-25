import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-text-primary hover:opacity-[0.9] font-display uppercase tracking-wide text-sm"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-full left-0 pt-6 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-surface-elevated backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-2xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-border bg-surface shadow-input flex justify-center items-center space-x-6 px-12 py-4 h-full"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link to={href} className="flex flex-col space-y-3 hover:bg-surface-highlight p-3 rounded-xl transition-colors group">
      <div className="overflow-hidden rounded-lg shadow-xl">
        <img
          src={src}
          alt={title}
          className="w-full h-[120px] object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div>
        <h4 className="text-[16px] font-bold mb-1 text-text-primary font-display uppercase tracking-wide leading-tight">
          {title}
        </h4>
        <p className="text-text-muted text-[13px] font-body leading-snug">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-text-muted hover:text-accent-primary transition-colors block text-sm font-body py-1"
    >
      {children}
    </Link>
  );
};
