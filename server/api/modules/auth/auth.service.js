import axios from "axios";
import ApiError from "../../errors/ApiError.js";
import httpStatus from "http-status";
import { env } from "../../../config/index.js";

const getMonnifyToken = async () => {
  const username = "MK_TEST_072244Y072";
  const password = "YW61FAEJSAJDG4NMTESHYJSG3PENY28T";
  const encodedCredentials = Buffer.from(`${env.monnifyApiKey}:${env.monnifyApiSecret}`).toString(
    "base64"
  );

  const {
    data: { responseBody },
  } = await axios.post(
    "https://sandbox.monnify.com/api/v1/auth/login",
    {}, // Request body (if any)
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    }
  );
  const { accessToken } = responseBody;
  console.log(accessToken);
  return accessToken;
};

const verifyNinWithMonnify = async (nin, token) => {
  if (!nin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "NIN is required");
  }
  const response = await axios.post(
    "https://sandbox.monnify.com/api/v1/vas/nin-details",
    { nin }, // Request body (if any)
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export { getMonnifyToken, verifyNinWithMonnify };
