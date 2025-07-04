import "./socket-front-index.js";
import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAdicionarDocumento(inputDocumento.value);
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action id="documento-${nomeDocumento}">
        ${nomeDocumento}
      </a>`;
}

function removerLinkDocumento(nomeDocumento) {
  const doc = document.getElementById(`documento-${nomeDocumento}`);

  listaDocumentos.removeChild(doc);
}

export { inserirLinkDocumento, removerLinkDocumento };
