import express from "express";
import { createItem, deleteItem, editItem, getItems } from "../handlers/items-handler";
export const itemsRouter = express.Router();
itemsRouter
    .route('')
    .get(async (req, res) => await getItems(req, res))
    .post(async (req, res) => await createItem(req, res))
    .put(async (req, res) => await editItem(req, res))
    .delete(async (req, res) => await deleteItem(req, res));
