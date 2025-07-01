import { documentosColecao } from "./dbConect.js";

function encontraDocumento(nomeDocumento) {
  const documento = documentosColecao.findOne({
    nome: nomeDocumento,
  });
  return documento;
}

function atualizaDocumento(nome, texto) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome: nome,
    },
    {
      $set: {
        texto: texto,
      },
    }
  );
  return atualizacao;
}

function obter_documentos() {
  const doc = documentosColecao.find().toArray();
  return doc;
}

function adicionarDocumento(nome) {
  const resultado = documentosColecao.insertOne({
    nome: nome,
    texto: "",
  });
  return resultado;
}

function excluirDocumento(nome) {
  const resultados = documentosColecao.deleteOne({
    nome: nome,
  });
  return resultados;
}

export {
  encontraDocumento,
  atualizaDocumento,
  obter_documentos,
  adicionarDocumento,
  excluirDocumento,
};
