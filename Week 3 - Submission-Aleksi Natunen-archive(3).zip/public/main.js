const form = document.getElementById("userForm")
const list = document.getElementById("userList")
const bottonforwork = document.getElementById("getUsers")

bottonforwork.addEventListener('click', async (param) => {
    
    const res = await fetch('/users');
    if (res.status === 201) {
        const result = await res.json();
        list.innerHTML = ""
        console.log(result)
        result.users.forEach(user => {
            const listElement = document.createElement("li");
            listElement.innerText = (`${user.name} - ${user.email}`);
            list.appendChild(listElement);
        });
    } else {
        throw new Error("Failed to fetch");
    }
});

form.addEventListener('click', async () => {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value

    const data = { name:name, email:email };

    console.log(data)

    const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
});