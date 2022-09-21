function dom(select) {
  return document.querySelector(select);
}

const ipList = dom("#newTask");

let todoList = [];
todoList = JSON.parse(localStorage.getItem("todolist")) || [];

console.log(typeof todoList);
display(todoList);

let doneList = [];
doneList = JSON.parse(localStorage.getItem("Done")) || [];
displayDone(doneList);

dom("#addItem").addEventListener("click", () => {
  if (!ipList) {
    alert("vui lòng không được để trống ");
    return false;
  }

  todoList.push(ipList.value);
  localStorage.setItem("todolist", JSON.stringify(todoList));
  // ipList.value = "";
  console.log(todoList);
  display(todoList);
});

function display(todolist) {
  const html = todolist.reduce((result, todo, index) => {
    return (
      result +
      `
      <li>
        <div>${todo}</div>
        <div>
          <button class="check" 
          data-type="check" 
          data-id="${index}">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="recycle"
           data-type="recycle" 
           data-id="${index}">
            <i class="fa-regular fa-trash-can"></i>
           </button>
        </div>
      </li>`
    );
  }, "");
  dom("#todo").innerHTML = html;
}

function displayDone(todolist) {
  const html = todolist.reduce((result, todo, index) => {
    return (
      result +
      `
      <li>
        <div>${todo}</div>
        <div>
          <button class="recycle"
           data-type="recycle" 
           data-id="${index}">
            <i class="fa-regular fa-trash-can"></i>
           </button>
        </div>
      </li>`
    );
  }, "");
  dom("#completed").innerHTML = html;
}
dom("#todo").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let type = evt.target.getAttribute("data-type");

  let temp = todoList.find((todo, index) => {
    //console.log(index, +id);
    return index === +id;
  });
  console.log(temp);

  if (type === "check") {
    // thêm vào mảng khi nhấn vào button check
    doneList.push(temp);
    displayDone(doneList);
    localStorage.setItem("todolist", JSON.stringify(todoList));

    // xóa phần tử trong mảng todolist
    // thêm ngược lại vào mảng done
    todoList.splice(id, 1);
    display(todoList);
    localStorage.setItem("todolist", JSON.stringify(todoList));
    localStorage.setItem("Done", JSON.stringify(doneList));
  } else if (type === "recycle") {
    // khi click vào thùng rác thì xóa ở mảng todolist
    todoList.splice(id, 1);
    display(todoList);
    localStorage.setItem("todolist", JSON.stringify(todoList));

    console.log(todoList);
  }
});

dom("#completed").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let type = evt.target.getAttribute("data-type");

  // xóa phần tử mảng done
  if (type === "recycle") {
    doneList.splice(id, 1);
    displayDone(doneList);
    localStorage.setItem("Done", JSON.stringify(doneList));
  }
});
