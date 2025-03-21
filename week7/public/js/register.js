const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
        fetchData1(event)
    })
}

const fetchData1 = async (event) => {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value,
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
            window.location.href = "/login.html"
        }

    } catch (error) {
        console.log(`Error while trying to register: ${error.message}`)
    }

}

initializeRegister()