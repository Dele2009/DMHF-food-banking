const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  if (data?.token) {
    responseData.token = data.token;
  }

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
