import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from './App'

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
};
