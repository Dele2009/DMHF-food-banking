/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
// import config from "../../config";
import fs from 'fs';
import path from 'path';
import ApiError from "../errors/ApiError.js";
import axiosErrorHandler from "../errors/AxiosErrorHandler.js";



const globalErrorHandler = (error, req, res, next) => {
  const isProd = process.env.NODE_ENV == "production";
  console.error(`globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages = [];
  if (error?.name === "AxiosError") {
    const axiosError = axiosErrorHandler(error);
    statusCode = axiosError.statusCode;
    message = axiosError.message;
    errorMessages = axiosError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  const isApiError = req.originalUrl.startsWith("/api");

  if (!isApiError) {
    if (!isProd) {
      const templatePath = path.join(
        process.cwd(),
        "server/api/templates/errorTemplate.html"
      );
      fs.readFile(templatePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading error template:", err);
          res
            .status(statusCode)
            .send("Something went wrong! Please try again later.");
          return;
        }
        const html = data
          .replace("{{message}}", message)
          .replace("{{stack}}", error.stack || "");
        res.status(statusCode).setHeader("Content-Type", "text/html").send(html);
      });
    }
  } else {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: !isProd ? error?.stack : undefined,
    });
  }

};

export default globalErrorHandler;
