import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { genericErrorHandle } from "./error/genericError.js";
import { createInvoice, invoice } from "./controllers/pdfController.js";

// dotenv.config();
const app = express();
app.use(
  cors({
    origin: true,
    // credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/user", userRouter);

// error handle
app.use(genericErrorHandle);

const PORT = 3600;
app.listen(PORT, () => {
  connectDb();
  console.log(`server is running at http://localhost:${PORT}`);
});

// =================== Handle invoice ============================


createInvoice(invoice, 'doc/nvoice.pdf');