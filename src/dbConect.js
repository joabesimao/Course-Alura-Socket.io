import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://user:123@cluster0.l3qxy4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

let documentosColecao;

try {
  await cliente.connect();
  const db = cliente.db("alura-web-sockets");
  documentosColecao = db.collection("documentos");
  console.log("conectado com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao };
