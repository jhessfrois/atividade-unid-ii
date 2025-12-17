// =========================================================
// VARIÁVEIS GLOBAIS
// =========================================================

// Array que armazena os produtos adicionados ao carrinho
let carrinho = []

// Valor total da compra
let total = 0

// =========================================================
// ELEMENTOS DO DOM
// =========================================================

// Contador visual de itens no carrinho
const contadorCarrinho = document.getElementById("contador-carrinho")

// Container do modal do carrinho
const modalCarrinho = document.getElementById("modal-carrinho")

// Lista onde os itens do carrinho serão renderizados
const listaItens = document.getElementById("itens-carrinho")

// Elemento que exibe o valor total
const spanTotal = document.getElementById("total-carrinho")

// =========================================================
// 1. ADICIONAR PRODUTOS AO CARRINHO
// =========================================================

// Seleciona todos os botões de compra dos cards
const botoesComprar = document.querySelectorAll(".card-produto button")

// Adiciona o evento de clique em cada botão
botoesComprar.forEach((botao) => {
  botao.addEventListener("click", (event) => {
    // Localiza o card do produto clicado
    const card = event.target.closest(".card-produto")

    // Obtém nome e preço do produto
    const nome = card.querySelector("h3").innerText
    const precoTexto = card.querySelector(".preco").innerText

    // Converte o preço de string para número
    const preco = parseFloat(
      precoTexto.replace("R$", "").replace(",", ".").trim()
    )

    // Cria o objeto do produto
    const novoProduto = { nome: nome, preco: preco }

    // Adiciona o produto ao carrinho
    carrinho.push(novoProduto)

    // Atualiza o contador do carrinho
    atualizarCarrinho()

    // Feedback visual temporário no botão
    const textoOriginal = botao.innerText
    botao.innerText = "Adicionado! ✓"
    setTimeout(() => (botao.innerText = textoOriginal), 1000)
  })
})

// =========================================================
// 2. ATUALIZAÇÃO DA INTERFACE DO CARRINHO
// =========================================================

// Atualiza o número exibido no contador
function atualizarCarrinho() {
  contadorCarrinho.innerText = carrinho.length
}

// =========================================================
// 3. MODAL DO CARRINHO (ABRIR, FECHAR E RENDERIZAR)
// =========================================================

// Botões de controle do modal
const btnCarrinho = document.getElementById("btn-carrinho")
const btnFechar = document.getElementById("fechar-carrinho")

// Exibe o modal do carrinho
btnCarrinho.addEventListener("click", () => {
  modalCarrinho.classList.remove("hidden")
  renderizarItens()
})

// Fecha o modal do carrinho
btnFechar.addEventListener("click", () => {
  modalCarrinho.classList.add("hidden")
})

// Renderiza os itens do carrinho dentro do modal
function renderizarItens() {
  listaItens.innerHTML = "" // Limpa a lista atual
  total = 0 // Reinicia o total

  // Caso o carrinho esteja vazio
  if (carrinho.length === 0) {
    listaItens.innerHTML = "<p>Seu carrinho está vazio.</p>"
    spanTotal.innerText = "R$ 0,00"
    return
  }

  // Cria os elementos de cada item do carrinho
  carrinho.forEach((item) => {
    const divItem = document.createElement("div")
    divItem.classList.add("item-carrinho")
    divItem.innerHTML = `
      <span>${item.nome}</span>
      <span>R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
    `
    listaItens.appendChild(divItem)

    // Soma o valor do item ao total
    total += item.preco
  })

  // Atualiza o valor total no modal
  spanTotal.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`
}

// =========================================================
// FEEDBACK EXTRA AO ADICIONAR PRODUTO (ALERTA + ESTILO)
// =========================================================

// Evento adicional para feedback visual e alerta
botoesComprar.forEach((botao) => {
  botao.addEventListener("click", () => {
    // Exibe um alerta simples
    alert("O produto foi adicionado ao seu carrinho!")

    // Altera temporariamente o texto e a cor do botão
    const textoOriginal = botao.innerText
    botao.innerText = "Adicionado! ✓"
    botao.style.backgroundColor = "#27ae60"

    // Retorna ao estado original após 2 segundos
    setTimeout(() => {
      botao.innerText = textoOriginal
      botao.style.backgroundColor = ""
    }, 2000)
  })
})

// =========================================================
// 4. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
// =========================================================

// Botão de troca de tema
const botaoTema = document.getElementById("btn-tema")

// Referência ao body da página
const body = document.body

// Alterna a classe de modo escuro
botaoTema.addEventListener("click", () => {
  body.classList.toggle("dark-mode")

  // Atualiza o ícone do botão conforme o tema ativo
  if (body.classList.contains("dark-mode")) {
    botaoTema.innerText = "☀️"
  } else {
    botaoTema.innerText = "🌙"
  }
})

// =========================================================
// 5. ANO ATUAL NO RODAPÉ
// =========================================================

// Elemento que recebe o ano atual
const elementoData = document.getElementById("data-atual")

// Obtém o ano corrente
const anoAtual = new Date().getFullYear()

// Exibe o ano no rodapé
elementoData.innerText = anoAtual