const form = document.getElementById("todoForm")
const buttonForToDoList = document.getElementById("submit-data")
const jsonSuccess = document.getElementById("ifJsonSuccess")
const searchButton = document.getElementById("search")
const deleteButton = document.getElementById("deleteUser")
const checkboxes = document.getElementsByClassName("checkBoxes")

buttonForToDoList.addEventListener("click", async (param) => {
    param.preventDefault()

    let name = document.getElementById("userInput").value
    let todos = document.getElementById("todoInput").value

    let data = {name:name, todos:todos}
    const res = await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    const result = await res.json()
    jsonSuccess.textContent = result.message
})

searchButton.addEventListener("click", async (params) => {
    params.preventDefault()
    let listTodos = document.getElementById("todoList")

    let name = document.getElementById("searchInput")
    const res = await fetch (`/todos/${name.value}`)
    const result = await res.json()
    

    if (res.status === 200){
        listTodos.innerHTML= ""
        document.getElementById("ifFoundUser").textContent = ""

        result.todos.forEach(element => {
            let listElement = document.createElement("li")
            if (element.checked) {
                listElement.innerHTML = `<label> <input type="checkbox" id="myCheckbox" class="checkBoxes" onClick="checkboxFunction(event)" checked>  <span> <a href="#" class="delete-task">${element.todo}</a> </span>  </label>`
            } else {
                listElement.innerHTML = `<label> <input type="checkbox" id="myCheckbox" class="checkBoxes" onClick="checkboxFunction(event)">  <span> <a href="#" class="delete-task">${element.todo}</a> </span>  </label>`
            }
            listTodos.appendChild(listElement)
            deleteButton.style.visibility = 'visible'
        });
    } else {
        document.getElementById("ifFoundUser").textContent = "User not found"
        listTodos.innerHTML= ""
        deleteButton.style.visibility = 'hidden'
    }
})

deleteButton.addEventListener("click", async (params) => {
    params.preventDefault()
    let listTodos = document.getElementById("todoList")
    let name = document.getElementById("searchInput")

    const res = await fetch('/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name.value}),
    })

    const result = await res.json()

    if (res.status === 200){
        document.getElementById("ifFoundUser").textContent = result.message
        deleteButton.style.visibility = 'hidden'
        listTodos.innerHTML = ""


    } else {
        document.getElementById("ifFoundUser").textContent = "User not found"
        
        deleteButton.style.visibility = 'hidden'
        listTodos.innerHTML = ""
    }
})


todoList.addEventListener('click', async function(e) {
    const tgt = e.target
    if (tgt.classList.contains('delete-task')) {
        const listItem = tgt.closest('li')
        let name = document.getElementById("searchInput").value
        let task = listItem.innerText;
        const res = await fetch('/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, todo: task }),
        })

        const result = await res.json()

        if (res.status === 200) {
            listItem.remove();
            document.getElementById("ifFoundUser").textContent = result.message
        } else {
            document.getElementById("ifFoundUser").textContent = "Error deleting task"
        }
    }
});

async function checkboxFunction(e){
    const tgt = e.target
    const listItem = tgt.closest('li')
    
    let booleanValue = listItem.children[0].children[0].checked

    let name = document.getElementById("searchInput").value
        let task = listItem.innerText;
        const res = await fetch('/updateTodo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, todo: task, checked: booleanValue }),
        })

        const result = await res.json()

        if (result.status === 200) {
            console.log("GREAT CHECK :)");
            
        } else {
            console.log(":(");
            
        }
}