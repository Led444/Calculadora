(() => {
  let nAnterior = '';
  let nAtual = '';
  let Operador = '';
  let resultadoExibido = false;

  function Acrescentar(numero) {
    if (resultadoExibido) {
      nAtual = '';
      nAnterior = '';
      Operador = '';
      resultadoExibido = false;
    }

    nAtual += numero;
    document.getElementById('resultado').value = nAtual;
    if (numero === '.' && nAtual.includes('.')) {
      return;
    }
  }

  function operador(op) {
    if (nAnterior !== '' && nAtual !== '') {
      nAnterior = calcular();
    } else if (nAtual !== '') {
      nAnterior = nAtual;
    }

    Operador = op;
    nAtual = '';
    resultadoExibido = false;

    document.getElementById('resultado').value = nAnterior + Operador;
  }

  function calcular() {
    let a = Number(nAnterior);
    let b = Number(nAtual);
    let resultado;

    if (Operador === '/' && b === 0) {
      document.getElementById('resultado').value = 'Erro';
      nAnterior = '';
      nAtual = '';
      Operador = '';
      resultadoExibido = true;

      return;
    }

    switch (Operador) {
      case '+':
        resultado = a + b;
        break;
      case '-':
        resultado = a - b;
        break;
      case '*':
        resultado = a * b;
        break;
      case '/':
        resultado = a / b;
        break;
    }

    return resultado;
  }

  function oResultado() {
    if (nAnterior === '' || nAtual === '' || Operador === '') {
      return;
    }

    let resultado = calcular();
    nAnterior = String(resultado);
    nAtual = '';

    document.getElementById('resultado').value = resultado;
    resultadoExibido = true;
  }


  function limpar() {
    nAnterior = '';
    nAtual = '';
    Operador = '';
    resultadoExibido = false;
    document.getElementById('resultado').value = '';
  }

  const numeros = document.querySelectorAll('.numero');
  const operadores = document.querySelectorAll('.operador');

  numeros.forEach((botao) => {
    botao.addEventListener('click', () => {
      Acrescentar(botao.dataset.value);
    });
  });

  operadores.forEach((botao) => {
    botao.addEventListener('click', () => {
      operador(botao.dataset.value);
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
      Acrescentar(key);

    } else if (["+", "-", "*", "/"].includes(key)) {
      operador(key);

    } else if (key === "Enter" || key === "=") {
      oResultado();
    } else if (key === "Escape") {
      limpar();
    }
  });

  document
      .querySelector('.limpar')
      .addEventListener('click', limpar);

  document
      .querySelector('.resultado')
      .addEventListener('click', oResultado);

})();
