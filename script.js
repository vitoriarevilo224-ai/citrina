const precos = {
    "Anel Solar": 49.90,
    "Anel Aurora": 49.90,
    "Anel Verena": 48.90
};

let carrinho = [];

function adicionarCarrinho(produto) {
    carrinho.push(produto);

    atualizarCarrinho();
    abrirCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        const preco = precos[produto] || 0;

        total += preco;

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${produto}</strong><br>
                R$ ${preco.toFixed(2).replace(".", ",")}
            </div>

            <button onclick="removerItem(${index})"
                style="
                    background:#e74c3c;
                    color:white;
                    border:none;
                    padding:6px 10px;
                    border-radius:8px;
                    cursor:pointer;
                ">
                ❌
            </button>
        `;

        lista.appendChild(li);
    });

    document.getElementById("contador").innerText = carrinho.length;
    document.getElementById("quantidadeItens").innerText = carrinho.length;
    document.getElementById("subtotal").innerText =
        "R$ " + total.toFixed(2).replace(".", ",");
    document.getElementById("total").innerText =
        "R$ " + total.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("ativo");
}

function irParaPagamento() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let total = 0;
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";

    carrinho.forEach(produto => {

        const preco = precos[produto] || 0;

        total += preco;

        mensagem += `• ${produto} - R$ ${preco.toFixed(2).replace(".", ",")}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

    const link =
        "https://wa.me/5548988766007?text=" +
        encodeURIComponent(mensagem);

    window.open(link, "_blank");
}