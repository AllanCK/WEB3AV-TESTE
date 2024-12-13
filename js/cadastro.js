const form = document.querySelector("#formulario");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const regexNome = /^[a-zA-Zá-óã-õâ-ôÁ-ÓÃ-ÕÂ-ÔçÇ\s]{2,50}$/; 
  const regexQuantidade = /^[0-9]+$/; 
  const regexSetor = /^[a-zA-Zá-óã-õâ-ôÁ-ÓÃ-ÕÂ-Ô\s]{3,30}$/; 
  const regexValor = /^[0-9]+(\.[0-9]{1,2})?$/; 

 
  const nome = form.nome.value.trim();
  const quantidade = form.quantidade.value.trim();
  const setor = form.setor.value.trim();
  const valor = form.valor.value.trim();

  
  if (!regexNome.test(nome)) {
    alert("O nome deve conter apenas letras e espaços (entre 2 e 50 caracteres).");
    return;
  }

  if (!regexQuantidade.test(quantidade)) {
    alert("A quantidade deve ser um número inteiro válido.");
    return;
  }

  if (!regexSetor.test(setor)) {
    alert("O setor deve conter apenas letras e espaços (entre 3 e 30 caracteres).");
    return;
  }

  if (!regexValor.test(valor)) {
    alert("O valor deve ser um número válido (exemplo: 10 ou 10.50).");
    return;
  }

  const produto = {
    nome: nome,
    quantidade: parseInt(quantidade), 
    setor: setor,
    valor: parseFloat(valor), 
  };

  
  const resultado = await fetch(
    "https://intwebav3-default-rtdb.firebaseio.com/produtos.json",
    {
      method: "POST",
      body: JSON.stringify(produto),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (resultado.ok) {
    form.reset();
    lerDados(); 
  } else {
    alert("Ocorreu um erro ao salvar os dados. Tente novamente.");
  }
});
