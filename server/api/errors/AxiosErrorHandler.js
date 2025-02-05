// filepath: /c:/Users/USER/Desktop/NODE_APPS/RECT_APPS/donate-app/server/api/middlewares/axiosErrorHandler.js
import axios from 'axios';

const axiosErrorHandler = (error) => {
//   if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred with the request';
    const errorMessages = error.response?.data?.errors || [
      {
        path: '',
        message: message,
      },
    ];

    return { statusCode, message, errorMessages };
//   }

//   return null;
};

export default axiosErrorHandler;