import {
  CriarUrl,
  getCodigo,
  deleteUrl,
  getUrlById,
  getUrls,
  searchUrls,
} from "../services/urlService.js";

// Erros do service trazem statusCode (400, 404); os outros são 500
class urlController {
  static async CriarUrl(req, res) {
    try {
      const newUrl = await CriarUrl(req.body.urlOriginal);
      res.status(201).json({ mensagem: "Url criada com sucesso", url: newUrl });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ mensagem: "Erro ao cadastrar a url.", erro: error.message });
    }
  }

  static async getUrls(req, res) {
    try {
      const urls = await getUrls();
      res.status(200).json({ urls });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ mensagem: "Erro ao buscar as urls.", erro: error.message });
    }
  }

  static async getUrlById(req, res) {
    try {
      const { id } = req.params;
      const url = await getUrlById(id);

      res.status(200).json(url);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        mensagem: "Erro ao buscar url por id.",
        erro: error.message,
      });
    }
  }

  static async getCodigo(req, res) {
    try {
      const { codigo } = req.params;
      const urlEncontrada = await getCodigo(codigo);

      res.status(200).json(urlEncontrada);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        mensagem: "Erro ao buscar codigo",
        erro: error.message,
      });
    }
  }

  static async deleteUrl(req, res) {
    try {
      const { id } = req.params;
      await deleteUrl(id);

      res.status(204).send();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        mensagem: "Erro ao excluir url.",
        erro: error.message,
      });
    }
  }

  static async SearchUrl(req, res) {
    try {
      const { termo } = req.query;
      const urls = await searchUrls(termo);
      res.status(200).json({ urls });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        mensagem: "Erro ao buscar a url.",
        erro: error.message,
      });
    }
  }
}

export default urlController;
