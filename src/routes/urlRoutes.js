import express from "express";
import urlController from "../controllers/urlController.js";

const routes = express.Router();

routes.post("/urls", urlController.CriarUrl);
// TODO: ordenar por cliques via query string (/urls?ordenar=cliques), lida dentro do getUrls com req.query
routes.get("/urls", urlController.getUrls);
// /urls/buscar precisa vir antes de /urls/:id, senão "buscar" seria tratado como id
routes.get("/urls/buscar", urlController.SearchUrl);
routes.get("/urls/:id", urlController.getUrlById);
routes.delete("/urls/:id", urlController.deleteUrl);
// por último: /:codigo captura qualquer caminho de um nível
routes.get("/:codigo", urlController.getCodigo);

export default routes;
