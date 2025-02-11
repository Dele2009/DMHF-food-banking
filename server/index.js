import fs from "node:fs/promises";
import express from "express";
import { createServer as createViteServer } from "vite";
import morgan from "morgan";
import appRoutes from "./api/routes/index.js";
import globalErrorHandler from "./api/middlewares/globalErrorHandler.js";

const isProduction = process.env.NODE_ENV === "production";
const Port = process.env.PORT;
const Base = process.env.BASE || "/";

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const app = express();
let vite;

// ? Add vite or respective production middlewares
if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
} else {
  const sirv = (await import("sirv")).default;
  const compression = (await import("compression")).default;
  app.use(compression());
  app.use(
    Base,
    sirv("./dist/client", {
      extensions: [],
      gzip: true,
    })
  );
}

// ? Add Your Custom Routers & Middlewares heare

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// To handle API Routes
app.use("/api", appRoutes);

// ? SSR Render - Rendering Middleware
app.use(/(.*)/, async (req, res, next) => {
  // ! SSR Render - Do not Edit if you don't know whats going on here
  let template, render;
  try {
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(req.originalUrl, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("../dist/server/entry-server.js")).render;
    }

    const rendered = await render({ path: req.originalUrl });
    const html = template.replace(`<!--app-html-->`, rendered ?? "");

    res.status(200).setHeader("Content-Type", "text/html").end(html);
  } catch (error) {
    // ? You can Add Something Went Wrong Page
    vite.ssrFixStacktrace(error);
    next(error);
  }
});

app.use(globalErrorHandler);

// ? Start http server
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});