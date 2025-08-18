// export const BASE_URL = 'http://localhost:4000/api/v1';

export const BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api/v1"
        : "https://your-backend.vercel.app/api/v1"; 