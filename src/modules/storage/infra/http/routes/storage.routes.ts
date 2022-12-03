import { Router } from "express";
import multer from "multer";
import uploadConfig from "@modules/storage/config/upload";
import CreateFileController from "../controllers/CreateFileController";

const upload = multer(uploadConfig.multer);
const storageController = new CreateFileController();

const storageRouter = Router();

storageRouter.post("/file", upload.single("file"), storageController.create);

export default storageRouter;
