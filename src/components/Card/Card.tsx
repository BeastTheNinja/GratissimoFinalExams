import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  onClick?: () => void
};

function Card({ children, title, onClick }: CardProps) {
  return (
    <article onClick={onClick}>
      
      {title && <h2>{title}</h2>}

      {children}
    </article>
  );
}

export default Card;
