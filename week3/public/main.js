const form = document.getElementById("userForm")
const username = document.getElementById("name")
const useremail = document.getElementById("email")
const list = document.getElementById("userList")
const bottonforwork = document.getElementById("getUsers")

form.addEventListener('submit', async (param) => {
    param.preventDefault()
    let name = username.value
    let email = useremail.value
    const data = {name, email}

    const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const result = await res.json();
    console.log(result.message);
    
})

bottonforwork.addEventListener('click', async (param) => {

    const res = await fetch('/users')
    if (res.status === 201) {
        const result = await res.json()

        result.users.forEach(user => {
            let listElement = document.createElement("li")
            listElement.append(user.name + " - " + user.email)
            list.appendChild(listElement)
        });
    }
    else {
        throw new Error("Failed to fetch")
    }
})