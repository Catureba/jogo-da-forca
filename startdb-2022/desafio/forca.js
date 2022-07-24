class Forca {
  gameStateDictionary = {
    win: "ganhou",
    lose: "perdeu",
    waiting: "aguardando chute",
  };

  word = [];
  currentState = {
    letrasChutadas: [], // Deve conter todas as letras chutadas
    vidas: 6, // Quantidade de vidas restantes
    palavra: [], // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
  };
  gameState = this.gameStateDictionary.waiting;

  constructor(word) {
    this.word = word.toLowerCase().split("");

    this.currentState = {
      letrasChutadas: [],
      vidas: 6,
      palavra: word.split("").map((letter) => {
        return "_";
      }),
    };
  }

  chutar(letra) {
    const sanitizedLetter = letra.replace(/\s*/g, "").toLowerCase();
    if (sanitizedLetter.length > 1) {
      return;
    }
    const hasBeenTried = this.buscarDadosDoJogo().letrasChutadas.includes(sanitizedLetter);
    if (hasBeenTried) {
      return;
    }

    const isInWord = this.word.includes(sanitizedLetter);

    if (isInWord) {
      this.word.filter((letter, index) => {
        if (letter === sanitizedLetter) {
          this.currentState.palavra[index] = letter;
        }
      });
    } else {
      this.currentState.vidas--;
    }

    this.currentState.letrasChutadas.push(sanitizedLetter);

    this.atualizarEstado();
  }

  buscarEstado() {
    return this.gameState;
  }

  buscarDadosDoJogo() {
    return this.currentState;
  }

  atualizarEstado() {
    const currentState = this.buscarDadosDoJogo();
    if (currentState.letrasChutadas.length === 0) {
      this.gameState = this.gameStateDictionary.waiting;
      return;
    }
    const hasAttempts = this.buscarDadosDoJogo().vidas > 0;

    if (!hasAttempts) {
      this.gameState = this.gameStateDictionary.lose;
      return;
    }

    if (this.currentState.palavra.every((letter) => letter !== "_")) {
      this.gameState = this.gameStateDictionary.win;
      return;
    }

    this.gameState = this.gameStateDictionary.waiting;
  }
}

module.exports = Forca;
