async function coolFunction() {
    const divfortext = document.getElementById("divForText")
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = '/login.html'
        } else {
            const response = await fetch('/api/private', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
    
            if (!response.ok) {
                const text = document.createElement("h1")
                text.textContent = `Error`
                divfortext.appendChild(text)

            } else {
                const text = document.createElement("h1")
                text.textContent = data.message
                divfortext.appendChild(text)
            }
    
            }
} 

coolFunction()

const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login.html'
}

document.getElementById("logout").addEventListener("click", logout)