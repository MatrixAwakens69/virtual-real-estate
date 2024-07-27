import express from "express";
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/properties.js";

const router = express.Router();

router.post("/new", createProperty);
router.get("/get", getProperties);
router.patch("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);

export default router;
