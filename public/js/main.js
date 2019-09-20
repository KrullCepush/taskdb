const sortFirst = document.getElementById("sort1");
const sortSecond = document.getElementById("sort2");
const sortThird = document.getElementById("sort3");
const tasklink = document.getElementsByClassName("tasklink");

sortFirst.addEventListener("click", async event => {
  event.preventDefault();
  const sort = "first";
  create(sort);
});

sortSecond.addEventListener("click", async event => {
  event.preventDefault();
  const sort = "second";
  create(sort);
});

sortThird.addEventListener("click", async event => {
  event.preventDefault();
  const sort = "third";
  create(sort);
});

async function create(sort) {
  const promise = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ sort: sort })
  });
  if (promise.ok) {
    const cont = document.getElementById("cont");
    const json = await promise.json();
    const content = document.getElementById("contant-task");

    content.remove();

    const divContant = document.createElement("div");
    cont.after(divContant);
    divContant.setAttribute("id", "contant-task");
    divContant.classList.add("container", "wrap-task-div");
    divContant.innerHTML += '<div class="row" id="row"></div>';

    const row = document.getElementById("row");

    for (let index = 0; index < json.arr.length; index++) {
      if (json.arr[index].executor === null) {
        json.arr[index].executor = " ";
      }

      row.innerHTML += `<div class="col-xl-4">
      <a href="/${json.arr[index]._id}"> 
      <div class="wrap-task tasklink ${json.arr[index].priority}">
      <div class="h3">${json.arr[index].taskName}</div>
                <div class="h4">${json.arr[index].taskDescription}</div>
                <div class="h4">${json.arr[index].executor}</div>
      </div>
      </a>
      </div>`;
    }
  } else {
    alert("Ошибка HTTP: " + promise.status);
  }
}
