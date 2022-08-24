class Forca {

  gameStateDictionary = { //objeto para armazenar os valores dos estados do jogo e comunicar ao usuario
    win: "ganhou",
    lose: "perdeu",
    waiting: "aguardando chute",
  };

  word = [];

  chutar(letra) {
    const sanitizedLetter = letra.replace(/\s*/g, "").toLowerCase(); // tratando os dados

    if (sanitizedLetter.length > 1) { // conferindo se foi digitado apenas um caracter
      return;
    }

    const hasBeenTried = this.buscarDadosDoJogo().letrasChutadas.includes(sanitizedLetter); // conferindo se o caracter digitado está dentro dos já digitados anteriormente

    if (hasBeenTried) { //saindo da função caso esteja tentando um caracter já utilizado nese game
      return;
    }

    const isInWord = this.word.includes(sanitizedLetter); // conferindo se o caracter digitado está presente na palavra chave e salvando como "true" ou "false"

    if (isInWord) { 
      this.word.filter((letter, index) => { 
        if (letter === sanitizedLetter) { // filtrando quais index tem o mesmo valor de letter (o caracter digitado) e dando a eles o valor de letter (o caracter digitado)
          this.currentState.palavra[index] = letter;
        }
      });
    } else { // como não foi encontrado nenhum index com o mesmo valor que letter (o caracter digitado) uma vida foi decrementada do total de vidas atual
      this.currentState.vidas--;
    }

    this.currentState.letrasChutadas.push(sanitizedLetter); // adicionando a letra que foi digitada a lista de letras chutadas

    this.atualizarEstado(); 
  }

  currentState = {       // objeto que salva as variaveis do jogo

    letrasChutadas: [], // Deve conter todas as letras chutadas
    vidas: 6, // Quantidade de vidas restantes
    palavra: [], // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas

  };

  gameState = this.gameStateDictionary.waiting; // iniciando o jogo no estado de espera do input do usuario (desnecessário  )
  
  
  constructor(word) {
    
    this.word = word.toLowerCase().split(""); // tratando os dados para evitar que letras maiusculas e minusculas sejam identificadas como diferentes, além disso usei o .split("") para realocar cada letra da palavra em uma posição no array

    this.currentState = {
      letrasChutadas: [],
      vidas: 6,
      palavra: word.split("").map((letter) => { //exibindo o valor "_" em vez das letras da palavra chave
        return ("_");
      }),
    };
  }

  

  buscarEstado() { // retorna em que estado o jogo se encontra
    return this.gameState;
  }

  buscarDadosDoJogo() {
    return this.currentState;  // retornando o objeto com os dados do jogo
  }

  atualizarEstado() {  // atualizando estado do jogo checando se o jogador, ganhou ou perdeu o game
    const currentState = this.buscarDadosDoJogo();
    
    const hasAttempts = this.buscarDadosDoJogo().vidas > 0;  // validando se o jogador ainda tem vidas

    if (!hasAttempts) {  // se o jogador não tem vidas restantes o jogo é finalizado
      this.gameState = this.gameStateDictionary.lose; 
      return;
    }

    if (this.currentState.palavra.every((letter) => letter !== "_")) {  // conferindo se todas as posições do array diferem de "_" e assim validando se todas as letras foram descobertas
      this.gameState = this.gameStateDictionary.win;
      return;
    }

    this.gameState = this.gameStateDictionary.waiting;  // se nenhum dos ifs foi atendido então o jogo deve continuar
  }
}

module.exports = Forca;
