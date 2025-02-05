import axios from "axios";
import catchAsync from "../../shared/catchAsync.js";
import { getMonnifyToken, verifyNinWithMonnify } from "./auth.service.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from 'http-status'

const verifyNin = catchAsync(
     async (req, res) => {
          const { nin } = req.body
          
          const token = await getMonnifyToken()
          console.log(token)
          const data = await verifyNinWithMonnify(nin, token)
          console.log(data)

          sendResponse(res, {
               statusCode: httpStatus.OK,
               message: 'Nin Verfified',
               success: true,
               data
          })
     }
)

export {verifyNin}
