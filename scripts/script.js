const cursos = [
  {
    curso: "HTML e CSS",
    descricao:
      "Aprenda HTML5 e CSS3 com a melhor plataforma de ensino do país!",
    duracao: "1 mês",
    valor: 500,
  },
  {
    curso: "Javascript",
    descricao: "Aprenda Javascript com a melhor plataforma de ensino do país!",
    duracao: "2 meses",
    valor: 900,
  },
  {
    curso: "APIs REST",
    descricao: "Aprenda APIs REST com a melhor plataforma de ensino do país!",
    duracao: "6 meses",
    valor: 2000,
  },
];

const turmas = [
  {
    turma: "Hipátia",
    curso: "Javascript",
    inicio: "30/11/2022",
    termino: "30/01/2023",
    numeroAlunos: 150,
    periodo: "noturno",
    concluido: false,
  },
  {
    turma: "Sibyla",
    curso: "Javascript",
    inicio: "30/10/2022",
    termino: "30/12/2022",
    numeroAlunos: 200,
    periodo: "integral",
    concluido: false,
  },
  {
    turma: "Curie",
    curso: "HTML e CSS",
    inicio: "15/09/2022",
    termino: "15/10/2022",
    numeroAlunos: 180,
    periodo: "noturno",
    concluido: true,
  },
  {
    turma: "Zhenyi",
    curso: "HTML e CSS",
    inicio: "01/12/2022",
    termino: "01/01/2023",
    numeroAlunos: 180,
    periodo: "integral",
    concluido: false,
  },
  {
    turma: "Clarke",
    curso: "HTML e CSS",
    inicio: "04/07/2022",
    termino: "04/08/2022",
    numeroAlunos: 200,
    periodo: "noturno",
    concluido: true,
  },
  {
    turma: "Blackwell",
    curso: "APIsRest",
    inicio: "20/03/2022",
    termino: "20/09/2022",
    numeroAlunos: 100,
    periodo: "integral",
    concluido: true,
  },
  {
    turma: "Elion",
    curso: "APIsRest",
    inicio: "12/01/2022",
    termino: "12/07/2022",
    numeroAlunos: 200,
    periodo: "noturno",
    concluido: true,
  },
  {
    turma: "Burnell",
    curso: "APIsRest",
    inicio: "18/10/2022",
    termino: "18/04/2023",
    numeroAlunos: 90,
    periodo: "integral",
    concluido: false,
  },
];

let estudantes = [
  {
    estudante: "Chris Evans",
    turma: "Hipátia",
    curso: "JavaScript",
    valor: 900,
    nParcelas: 9,
    desconto: false,
    parcelas: 100,
  },
  {
    estudante: "Halle Berry",
    turma: "Burnell",
    curso: "APIsRest",
    valor: 2000,
    nParcelas: 4,
    desconto: false,
    parcelas: 500,
  },
  {
    estudante: "Lashana Lynch",
    turma: "Zhenyi",
    curso: "HTML e CSS",
    valor: 500,
    nParcelas: 1,
    desconto: true,
    parcelas: 500,
  },
];

const carrinhoCursos = [];
let htmlCode = ``;

//Verifica se já está salvo no localStora, caso não esteja, salva
if (localStorage.getItem("cursos") === null) localStorage.setItem("cursos", JSON.stringify(cursos));
if (localStorage.getItem("turmas") === null) localStorage.setItem("turmas", JSON.stringify(turmas));

//Caso já tenha salvo, joga o valor salvo no array de Estudantes
if (localStorage.getItem("estudantes") === null) {
  localStorage.setItem("estudantes", JSON.stringify(estudantes));
} else {
  estudantes = JSON.parse(localStorage.getItem("estudantes"));
}

//Constantes dos elementos HTML
const btns = document.getElementsByClassName("btn");
const buscaTurma = document.getElementById("buscaTurma");
const gallery = document.getElementById("gallery");
const buscaCurso = document.getElementById("buscaCurso");
const cursoValor = document.getElementById("curso_valor");
const listaCurso = document.getElementById("lista_cursos");
const listaCursoBody = document.getElementById("lista_cursos_body");
const matriculaMsg = document.getElementById("matricula-msg");
const matriculaMsgText = document.getElementById("matricula-msg-text");
const form = document.getElementById("form");
const buscaAluno = document.getElementById("buscaAluno");
const relatorioMsg = document.getElementById("relatorio-msg");

//Busca a turma pelo nome completo ou parte do nome
const buscarTurma = (nome) => {
  if (nome.length === 0) {
    return turmas;
  }

  const query = turmas.filter((e) =>
    e.turma.toLowerCase().includes(nome.toLowerCase())
  );

  if (query.length > 0) return query;
};

//Busca o curso pelo nome exato (sem diferença de maiúsculo para minúsculo)
const buscarCurso = (nome) => {
  return cursos.find((e) => e.curso.toLowerCase() === nome.toLowerCase());
};

//Busca o aluno pelo nome exato (sem diferença de maiúsculo para minúsculo)
const buscarEstudante = (nome) => {
  return estudantes.filter(
    (e) => e.estudante.toLowerCase() === nome.toLowerCase()
  );
};

//Mostra o(s) resultado(s) da busca pela Turma. Caso o usuário busca "em branco" irá resetar a lista para o estado inicial
const gridCards = (nome) => {
  const turmaBuscada = buscarTurma(nome);
  buscaTurma.value = "";

  if (turmaBuscada === undefined) {
    sweetAlert("Turma não encontrada!", "error");
    return;
  }

  htmlCode = ``;

  for (let value of turmaBuscada) {
    htmlCode += `
    <div class="card">
      <h4 class="title">${value.turma}</h4>
      <div class="body">
        <p><span>Curso:</span> ${value.curso} </p>
        <p><span>Início:</span> ${value.inicio} </p>
        <p><span>Término:</span> ${value.termino} </p>
        <p><span>Número de Alunos:</span> ${value.numeroAlunos} </p>
        <p><span>Período:</span> ${value.periodo} </p>
        <p><span>Concluído:</span> ${value.concluido ? "Sim" : "Não"} </p>
      </div>
    </div>
  `;
  }

  gallery.innerHTML = htmlCode;
};

//Coloca os cards da Área ADM - Tela de Turmas na página
for (let value of turmas) {
  gallery.innerHTML += `
  <div class="card">
    <h4 class="title">${value.turma}</h4>
    <div class="body">
      <p><span>Curso:</span> ${value.curso} </p>
      <p><span>Início:</span> ${value.inicio} </p>
      <p><span>Término:</span> ${value.termino} </p>
      <p><span>Número de Alunos:</span> ${value.numeroAlunos} </p>
      <p><span>Período:</span> ${value.periodo} </p>
      <p><span>Concluído:</span> ${value.concluido ? "Sim" : "Não"} </p>
    </div>
  </div>
`;
}

//Realiza a matricula do aluno checando se o curso e a turma escolhidos existem e mostra a mensagem de Aluno Matriculado, em caso de sucesso
const matricular = (nome, curso, turma, nParcelas) => {
  const estudanteBuscado = buscarEstudante(nome);
  const cursoBuscado = buscarCurso(curso);
  const turmaBuscada = buscarTurma(turma);
  matriculaMsg.style.visibility = "hidden";

  if (cursoBuscado === undefined) {
    sweetAlert("Curso não encontrado!", "error");
    return;
  }

  if (turmaBuscada === undefined) {
    sweetAlert("Turma não encontrada!", "error");
    return;
  }

  if (estudanteBuscado.length > 0) {
    sweetAlert("Aluno já cadastrado!", "warning");
    return;
  }

  matriculaMsg.style.visibility = "visible";
  const valorCurso = cursoBuscado.valor;
  let valorTotal = 0;

  nParcelas > 0 && nParcelas <= 2
    ? (valorTotal = valorCurso - valorCurso * 0.2)
    : (valorTotal = valorCurso);

  const novoAluno = {
    estudante: nome,
    turma: turma,
    curso: curso,
    valor: valorCurso,
    nParcelas: nParcelas,
    desconto: nParcelas <= 2 ? true : false,
    parcelas: valorTotal / nParcelas,
  };

  estudantes.push(novoAluno);
  localStorage.setItem("estudantes", JSON.stringify(estudantes));

  matriculaMsgText.innerHTML = `
    <p><span>Nome:</span> ${nome}</p>
    <p><span>Curso:</span> ${curso}</p>
    <p><span>Turma:</span> ${turma}</p>
`;

  form.reset();
};

//Mostra a lista dos cursos disponíveis
const mostrarCursos = () => {
  listaCurso.style.display = "flex";
  listaCursoBody.innerHTML = "";

  for (let value of cursos) {
    listaCursoBody.innerHTML += `
      <div class="top">
        <p>Curso</p>
        <p>Duração</p>
        <p>Valor</p>
        <p>Opção</p>
      </div>
      <div class="body">
        <p>${value.curso}</p>
        <p>${value.duracao} </p>
        <p>R$ ${value.valor}</p>
        <p><button onclick="addCarrinhoCurso('${value.curso}')">Adicionar</button></p>
      </div>
    `;
  }
};

//Esconde a tela do Curso
const esconderCursos = () => {
  listaCurso.style.display = "none";
};

//Adiciona o curso escolhido no carrinho de compras e mostra para o usuário no campo especificado(Curso)
const addCarrinhoCurso = (curso) => {
  const cursoBuscado = buscarCurso(curso);

  if (cursoBuscado === undefined) {
    sweetAlert("Curso não encontrado!", "error");
    return;
  }

  for (let item of carrinhoCursos) {
    if (item.curso === curso) {
      sweetAlert("Curso já adicionado!", "warning");
      return;
    }
  }

  carrinhoCursos.push(cursoBuscado);

  buscaCurso.innerHTML += `
    <span class="show_curso">
      <p>${curso === "HTML e CSS" ? "HTML" : curso}</p>
      <img src="../assets/cancel.png" alt="Cancel" onclick="removeCarrinhoCurso(this.parentElement, this.previousElementSibling.innerHTML)">
    </span>
  `;

  buscaCurso.style.borderColor = "black";
};

//Remove o curso do carrinho e da página
const removeCarrinhoCurso = (element, curso) => {
  if (curso === "HTML") curso = "HTML e CSS";
  const cursoBuscado = buscarCurso(curso);

  carrinhoCursos.pop(cursoBuscado);
  element.remove();

  if (carrinhoCursos.length === 0) {
    buscaCurso.style.borderColor = "transparent";
  }
};

//Parcela o valor total checando o(s) curso(s) escolhido(s) e o número de parcela(s) para aplicar ou não um desconto
const parcelarCurso = (arr, nParcelas) => {
  nParcelas = parseInt(nParcelas);

  if (arr.length === 0) {
    sweetAlert("Adicione um curso para prosseguir!", "error");
    return;
  } else if (isNaN(nParcelas)) {
    sweetAlert("Adicione um valor válido!", "error");
    return;
  } else if (nParcelas === 0) {
    sweetAlert("Adicione um valor acima de 0!", "error");
    return;
  }

  let descontoCursos = 0;
  const descontoAVista = 0.2;

  let total = 0;
  for (let item of arr) total += item.valor;

  switch (arr.length) {
    case 3:
      descontoCursos = 0.15;
      break;
    case 2:
      descontoCursos = 0.1;
      break;
    default:
      descontoCursos = 0;
  }

  total -= total * descontoCursos;

  if (nParcelas <= 2) {
    total -= total * descontoAVista;

    cursoValor.innerHTML = `
      <p><b>Valor</b></p>
      <p class="text">O valor do pagamento é de <b>R$ ${total
        .toFixed(2)
        .replace(
          ".",
          ","
        )}</b> com 20% desconto, parcelado em ${nParcelas}x de <b>R$ ${(
      total / nParcelas
    )
      .toFixed(2)
      .replace(".", ",")}</b></p>
      `;
  } else {
    cursoValor.innerHTML = `
    <p><b>Valor</b></p>
    <p class="text">O valor do pagamento é de <b>R$ ${total.toFixed(
      2
    )}</b>, parcelado em ${nParcelas}x de <b>R$ ${(total / nParcelas).toFixed(
      2
    )}</b></p>`;
  }
};

//Mostra o relatorio do estudante buscando pelo nome certo do Aluno
const relatorioEstudante = (nome) => {
  const estudanteBuscado = buscarEstudante(nome);
  buscaAluno.value = "";

  if (estudanteBuscado.length === 0) {
    relatorioMsg.innerHTML = "";
    sweetAlert("Aluno não encontrado!", "error");
    return;
  }

  for (let value of estudanteBuscado) {
    relatorioMsg.innerHTML = `
      <p><span>Aluno:</span> ${value.estudante} </p>
      <p><span>Turma:</span> ${value.turma} </p>
      <p><span>Curso:</span> ${value.curso} </p>
      <p><span>Valor Total:</span> R$ ${value.valor} </p>
      <p><span>Valor Parcela:</span> R$ ${value.parcelas} </p>
      <p><span>N° Parcelas:</span> ${value.nParcelas} </p>
    `;
  }
};

//Concentra todos os sweet Alert da página
const sweetAlert = (msg, icon) => {
  swal({
    title: msg,
    icon: icon,
  });
};

//Checa a tecla pressionada para realizar a busca através do Enter do teclado
const checkKeyPressed = (event, element) => {
  if (event.key === "Enter") {
    if (element === buscaTurma) gridCards(element.value);
    else if (element === buscaAluno) relatorioEstudante(element.value);
  }
};

//Menu ativo Area ADM
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("active");

    document.getElementById(
      current[0].innerHTML.toLowerCase().replace(" ", "")
    ).style.display = "none";
    current[0].className = current[0].className.replace(" active", "");

    this.className += " active";
    document.getElementById(
      this.innerHTML.toLowerCase().replace(" ", "")
    ).style.display = "block";
  });
}
