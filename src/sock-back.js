import {
  adicionarDocumento,
  atualizaDocumento,
  encontraDocumento,
  excluirDocumento,
  obter_documentos,
} from "./documentos-db.js";
import { io } from "./servidor.js";

io.on("connection", (socket) => {
  console.log("1 cliente se conectou!", socket.id);
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obter_documentos();
    devolverDocumentos(documentos);
  });

  socket.on("adicionar_documento", async (nome) => {
    const documentoExiste = (await encontraDocumento(nome)) !== null;
    if (documentoExiste) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);
      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nome);
      }
    }
  });

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);
    const documento = await encontraDocumento(nomeDocumento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });

  socket.on("excluir_documento", async (nome) => {
    const result = await excluirDocumento(nome);
    if(result.deletedCount){
      io.emit("excluir_documento_sucesso")
    }
    
  });
});
