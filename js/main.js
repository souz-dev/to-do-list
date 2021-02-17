var listas = [
  {
    titulo: 'A fazer',
    todos: [
      {
        titulo: 'Arrumar a casa',
        status: 0,
        descricao: 'Começar limpando a cozinha',
      },
    ],
  },
  {
    titulo: 'A fazer 2',
    todos: [
      {
        titulo: 'Arrumar a casa',
        status: 0,
        descricao: 'Começar limpando a cozinha',
      },
    ],
  },
];
var statusTodo = ['A fazer', 'Fazendo', 'Feito'];
// console.log(listas);
// var novoArray = listas.map((value, index) => {
//   console.log("lista", value);
//   console.log("titulo", value.titulo);
//   value.todos.map((val, idx) => {
//     console.log("todo", val);
//   });
//   return `Sou o index: ${index}`;
// });
// console.log(novoArray);
/**
 * Função que renderiza as listas
 */
function render() {
  let container = document.getElementsByClassName('to-do-container')[0];
  let novoConteudo = listas.map((lista, idxLista) => {
    let template =
      `<div class="col-sm-12 col-md-6 col-lg-4 mx-2 shadow-sm d-block to-do-list" data-key="${idxLista}">` +
      ' <div class="row mx-2">' +
      '   <div class="col-12 to-do-list-header">' +
      '     <div class="to-do-list-title text-center">' +
      `       <h4 id="lista-Title">${lista.titulo}</h4>` +
      '     </div>' +
      '     <div class="to-do-list-config to-do-icons">' +
      `       <div class="to-do-icon-btn remove-list" data-key="${idxLista}">` +
      '         <i class="fas fa-minus align-middle"></i>' +
      '       </div>' +
      `       <div class="to-do-icon-btn add-to-do" data-key="${idxLista}">` +
      '         <i class="fas fa-plus align-middle"></i>' +
      '       </div>' +
      `       <div class="to-do-icon-btn config-list" data-key="${idxLista}">` +
      '         <i class="fas fa-cog align-middle"></i>' +
      '       </div>' +
      '     </div>' +
      '   </div>' +
      ' <div class="col-12 to-do-list-body">';
    let todoHTML = lista.todos.map((todo, idxTodo) => {
      let todoAux = statusTodo[todo.status];
      return (
        '<div class="row to-do aligin-items-center shadow-sm">' +
        '<div class="col-6">' +
        '<div class="status-container">' +
        '<p class="to-do-text">Status:' +
        `<span class="status">${todoAux}</span>` +
        '</p>' +
        '</div>' +
        '</div>' +
        '<div class="col-6 to-do-icons">' +
        '<div class="to-do-icon-btn config-to-do">' +
        '<i class="fas fa-cog aligin-middle"></i>' +
        '</div>' +
        '<div class="to-do-icon-btn remove-to-do">' +
        '<i class="fas fa-minus aligin-middle"></i>' +
        '</div>' +
        '</div>' +
        '<div class="col-12">' +
        `<p class="to-do-text">${todo.titulo}</p>` +
        '</div>' +
        '</div>'
      );
    });
    template += todoHTML.join('');
    template += '</div>' + '</div>' + '</div>';
    return template;
  });
  container.innerHTML = novoConteudo.join('');
}
function addTodoList() {
  let titleInput = document.getElementById('title-list-name');
  listas.push({
    titulo: titleInput.value,
    todos: [],
  });
  titleInput.value = '';
  resetContainer();
}
function removeTodoList() {
  delete listas[this.dataset.key];
  resetContainer();
}
function openModalAddTodo() {
  $('#add-todo').modal('show');
  document.getElementById('add-todo-label').innerHTML = `${
    listas[this.dataset.key].titulo
  } - Novo to do`;
  document.getElementById('add-to-do').dataset.key = this.dataset.key;
}
function addEvents() {
  let removeLists = document.getElementsByClassName('remove-list');
  for (var i = 0; i < removeLists.length; i++) {
    removeLists[i].addEventListener('click', removeTodoList);
  }
  let addTodo = document.getElementsByClassName('add-to-do');
  for (var i = 0; i < addTodo.length; i++) {
    addTodo[i].addEventListener('click', openModalAddTodo);
  }
}

function addTodo() {
  let titleInput = document.getElementById('todo-title-input');
  let descriptionInput = document.getElementById('todo-description-input');
  let statusInput = document.getElementById('status-select');
  // adicionar

  listas[this.dataset.key].todos.push({
    titulo: titleInput.value,
    descricao: descriptionInput.value,
    status: statusInput.value,
  });
  (titleInput.value = ''),
    (descriptionInput = ''),
    (statusInput = 0),
    resetContainer();
}
function gettitle() {
  let titleLis = document.querySelector('#lista-Title');
  console.log(titleLis.innerText);

}
function configTodo() {
  let configInput =   
          document.querySelector('.to-do-list-config');

  configInput.addEventListener('click', gettitle);
}

function resetContainer() {
  render();
  addEvents();
}
document
  .getElementById('add-to-do-list')
  .addEventListener('click', addTodoList);
document.getElementById('add-to-do').addEventListener('click', addTodo);
resetContainer();

window.onload = function () {
  configTodo();
};
// removwer
// alterar nome
