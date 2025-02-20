import axios from "axios";
import catchAsync from "../../shared/catchAsync.js";
import { getMonnifyToken, verifyNinWithMonnify } from "./auth.service.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const verifyNin = catchAsync(async (req, res) => {
  const { nin } = req.body;

  const token = await getMonnifyToken();
  console.log(token);
  const data = await verifyNinWithMonnify(nin, token);
  console.log(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Nin Verfified",
    success: true,
    data,
  });
});


const testdata = [
  {
    id: 1,
    title: "Request 1",
    details: "Details of request 1",
    request_date: "01/03/2025",
    pickup_date: "01/03/2025",
    status: "approved",
  },
  {
    id: 2,
    title: "Request 2",
    details: "Details of request 2",
    request_date: "01/04/2025",
    pickup_date: "01/03/2025",
    status: "pending",
  },
  {
    id: 3,
    title: "Request 3",
    details: "Details of request 3",
    request_date: "01/03/2025",
    pickup_date: "01/03/2025",
    status: "rejected",
  },
  {
    id: 4,
    title: "Request 4",
    details: "Details of request 4",
    request_date: "01/03/2025",
    pickup_date: "01/03/2025",
    status: "approved",
  },
  {
    id: 5,
    title: "Request 5",
    details: "Details of request 5",
    request_date: "01/06/2025",
    pickup_date: "01/03/2025",
    status: "pending",
  },
  {
    id: 6,
    title: "Request 6",
    details: "Details of request 6",
    request_date: "01/07/2025",
    pickup_date: "01/03/2025",
    status: "rejected",
  },
  {
    id: 7,
    title: "Request 7",
    details: "Details of request 7",
    request_date: "01/07/2025",
    pickup_date: "01/07/2025",
    status: "approved",
  },
 
];

const addRequest = catchAsync(async (req, res)=> {
  console.log(req.body)
  const {title, details, date} = req.body

  await new Promise((resolve) => setTimeout(() => resolve("ok"), 4000));
  testdata.push({
    id: testdata.length + 1,
    title,
    details,
    request_date: new Date().toLocaleDateString(),
    pickup_date: date,
    status: "pending"
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Request Submitted Successfullly",
    success: true,
    data: null,
  });
})
const testFetch = catchAsync(async (req, res) => {
  const { status, search, page, rowsPerPage } = req.query;
  let filteredrequests = [...testdata];

  const hasSearch = Boolean(search);

  if (hasSearch) {
    console.log(hasSearch)
    filteredrequests = filteredrequests.filter((req) =>
      req.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status && status !== "all") {
    console.log(status);
    filteredrequests = filteredrequests.filter((req) => req.status === status);
  }

  const pages = Math.ceil(filteredrequests.length / rowsPerPage);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const items = filteredrequests.slice(start, end);
  // console.log(items)
  const data = {
    totalPages: pages,
    requests: items,
  };
  await new Promise(resolve=> setTimeout(()=> resolve("ok"), 4000))
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "ok",
    success: true,
    data,
  });
});

export { verifyNin, testFetch, addRequest };
