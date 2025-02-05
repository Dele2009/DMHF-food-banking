import dotenv from "dotenv"
dotenv.config()

const {MONNIFY_API_URL, MONNIFY_API_KEY ,MONNIFY_API_SECRET} = process.env

export const env = {
     monnifyApiUrl: MONNIFY_API_URL,
     monnifyApiKey: MONNIFY_API_KEY,
     monnifyApiSecret: MONNIFY_API_SECRET
};