import { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload;

    // Handle different types of errors
    if (error.status === 401) {
      // Handle unauthorized access
      toast.error("Session expired. Please log in again.");
      // You might want to dispatch a logout action here
    } else if (error.status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (error.status === 404) {
      toast.error("The requested resource was not found.");
    } else if (error.status === 422) {
      toast.error("Please check your input and try again.");
    } else if (error.status >= 500) {
      toast.error("An unexpected error occurred. Please try again later.");
    } else {
      // Handle other errors
      toast.error(error.message || "An error occurred");
    }

    // Log error for debugging
    console.error("API Error:", {
      status: error.status,
      message: error.message,
      data: error.data,
      endpoint: action.meta.arg?.endpoint,
    });
  }

  return next(action);
};
