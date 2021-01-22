const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];
let idNumbers = 1;

function deleteToDo(event) {
    // target: We don't know which one is clicked so it hlep to know.
    const btn = event.target;
    // parents of button is li, li have id
    const li = btn.parentNode;
    // remove the li
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    // Without refresh order = id
    while(toDoList.firstChild) {
            toDoList.removeChild(toDoList.firstChild);
    }
    idNumbers = 1;
    cleanToDos.forEach(function(toDo){
        toDo.id = idNumbers;
        paintToDo(toDo.text); // 내부 id도 idNum으로 지정됨.
    // paintToDo가 실행된 후 idNumbers += 1;이 실행되기 때문에 추가로 실행하지 않음.
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // Need to make an object to string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    // toDos length of array + 1 ( to find next id) - bug (x) : id will overlap
    const newId = idNumbers;
    idNumbers += 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    // when Delete, need to know for finding id of li(list) 
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadTodos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();