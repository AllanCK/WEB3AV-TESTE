const corpoTabela = document.querySelector("#corpoTabela");
const lerDados = async () => {
  const resultado = await fetch(
    "https://intwebav3-default-rtdb.firebaseio.com/produtos.json",
    {
      method: "GET",
    }
  );
  if (resultado.ok) {
    corpoTabela.innerHTML = ""; // limpa o corpo da tabela
    console.log(resultado)
    // converter os dados de json para objeto js
    const dados = await resultado.json();
    for (let id in dados) {
      const tr = document.createElement("tr");
      const produtos = dados[id];
      tr.innerHTML = `<td>${id}</td><td>${produtos.nome}</td><td>${produtos.quantidade}</td>
      <td>${produtos.setor}</td><td>${produtos.valor}</td>`;
      tr.innerHTML += `<td><button onclick="editar('${id}')">Editar</button>
      <button onclick="remover('${id}')">Excluir</button></td>`;
      corpoTabela.appendChild(tr);
    }
  }
};
lerDados();

const editar = async (id) => {
  const produto = {};
  produto.nome = prompt("Novo nome");
  produto.quantidade = prompt("Nova quantidade");
  produto.setor = prompt("Novo setor");
  produto.valor = prompt("Novo valor");
  const resultado = await fetch(`https://intwebav3-default-rtdb.firebaseio.com/produtos/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify(produto),
    headers: {
        "Content-Type": "application/json",
    }
  });
  if(resultado.ok){
    lerDados();
  }
};

const remover = async (id) => {
  const resultado = await fetch(`https://intwebav3-default-rtdb.firebaseio.com/produtos/${id}.json`, {
    method: "DELETE",
  });
  if(resultado.ok){
    lerDados();
  }
};

document.getElementById("btnImprimir").addEventListener("click", function() {
  window.print();
});