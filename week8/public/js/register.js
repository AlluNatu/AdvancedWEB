const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
        fetchData1(event)
    })
}

const fetchData1 = async (event) => {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
        isAdmin: event.target.isAdmin.checked
    }

    try {
        const response = await fetch("/api/user/register",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            console.log(response);
            
        } else {
            window.location.href = "/index.html"
        }

    } catch (error) {
        console.log(`Error while trying to register: ${error.message}`)
    }

}

initializeRegister()