let pontuacoes = Array(numJogadores).fill(0);

function valorCarta(carta) {
  if (typeof carta.valor === 'number') return carta.valor;
  if (['Pular', 'Inverter', '+2'].includes(carta.valor)) return 20;
  if (['Coringa', '+4'].includes(carta.valor)) return 50;
  return 0;
}

function calcularPontuacaoVencedor(vencedor) {
  let total = 0;
  for (let i = 0; i < numJogadores; i++) {
    if (i !== vencedor) {
      total += maos[i].reduce((soma, carta) => soma + valorCarta(carta), 0);
    }
  }
  pontuacoes[vencedor] += total;
  return total;
}

function mostrarPontuacoes() {
  let texto = 'Pontuação: ';
  for (let i = 0; i < numJogadores; i++) {
    texto += `J${i + 1}: ${pontuacoes[i]} `;
  }
  infoDiv.textContent += '\n' + texto;
}

// No momento que o jogador vence, altere:

if (mao.length === 0) {
  const pts = calcularPontuacaoVencedor(jogadorAtual);
  alert(`Jogador ${jogadorAtual + 1} venceu!\nGanhou ${pts} pontos nesta rodada.`);
  mostrarPontuacoes();
  resetarJogo();
  return;
}
 
function comprarCartas(num) {
  for (let i=0; i<num; i++) {
    if (baralho.length === 0) break;
    maos[jogadorAtual].push(baralho.pop());
  }
  atualizarMao();
}

comprarBtn.onclick = () => {
  if (esperandoCompra) return;
  esperandoCompra = true;
  comprarCartas(2); // Compra 2 cartas agora
  esperandoCompra = false;
  proximoJogador();
  turno();
};
