import { Helmet } from "react-helmet";

export const PageMetaValues = ({ children }: {children: React.ReactNode}) => {
  return <Helmet>{children}</Helmet>;
};
