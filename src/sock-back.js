import { io } from "./servidor.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto de JavaScript",
  },
  {
    nome: "Node",
    texto: "texto de Node",
  },
  {
    nome: "Socket.io",
    texto: "texto de Socket.io",
  },
];

io.on("connection", (socket) => {
  console.log("1 cliente se conectou!", socket.id);

  socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);
    const documento = encontraDocumento(nomeDocumento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const documento = encontraDocumento(nomeDocumento);
    if (documento) {
      documento.texto = texto;
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });
});

function encontraDocumento(nomeDocumento) {
  const documento = documentos.find((a) => a.nome === nomeDocumento);
  return documento;
}
