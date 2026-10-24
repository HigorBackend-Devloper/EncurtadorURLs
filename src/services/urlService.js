import mongoose from "mongoose";
import Url from "../models/Url.js";
import generateCode from "../utils/generateCode.js";

// Cria um erro com o status HTTP que o controller deve responder
function criarErro(mensagem, statusCode) {
  const erro = new Error(mensagem);
  erro.statusCode = statusCode;
  return erro;
}

export async function CriarUrl(originalUrl) {
  // 1. Validar a URL
  let url;

  try {
    url = new URL(originalUrl);
  } catch {
    throw criarErro("Essa URL não é válida", 400);
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw criarErro("Protocolo não permitido", 400);
  }

  // 2. Gerar um código e verificar colisões
  let gerarCodigo = generateCode();
  let codigoExistente = await Url.findOne({
    codigo: gerarCodigo
  });

  while (codigoExistente) {
    gerarCodigo = generateCode();

    codigoExistente = await Url.findOne({
      codigo: gerarCodigo
    });
  }

  // 3. Salvar a URL no MongoDB
  const salvarCodigo = await Url.create({
    urlOriginal: originalUrl,
    codigo: gerarCodigo,
    cliques: 0,
    pesquisas: 0
  });

  // 4. Retornar o documento criado
  return salvarCodigo;
}

export async function getCodigo(code) {
  const urlEncontrada = await Url.findOneAndUpdate(
    { codigo: code },
    { $inc: { cliques: 1 } },
    { returnDocument: "after" }
  );

  if (!urlEncontrada) {
    throw criarErro("URL não encontrada", 404);
  }

  return urlEncontrada;
}

export async function getUrls() {
  return await Url.find({});
}

export async function searchUrls(termo) {
  const filtro = {
    urlOriginal: { $regex: termo, $options: "i" }
  };

  const urlsEncontradas = await Url.find(filtro);

  if (urlsEncontradas.length === 0) {
    return [];
  }

  await Url.updateMany(filtro, {
    $inc: { pesquisas: 1 }
  });

  return await Url.find(filtro);
}
export async function getUrlById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw criarErro("ID inválido", 400);
  }

  const urlEncontrada = await Url.findById(id);

  if (!urlEncontrada) {
    throw criarErro("URL não encontrada", 404);
  }

  return urlEncontrada;
}

export async function deleteUrl(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw criarErro("ID inválido", 400);
  }

  const urlExcluida = await Url.findByIdAndDelete(id);

  if (!urlExcluida) {
    throw criarErro("URL não encontrada", 404);
  }

  return urlExcluida;
}

