const initializeLogin = () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        fetchData(event)
    })
}

const register = () => {
    document.getElementById("registerButton").addEventListener("click", (event) => {
        event.preventDefault()
        window.location.href = "/register.html"
    })
}

const fetchData = async (event) => {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value,
    }

    try {
        const response = await fetch("/api/user/login",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            console.log(response);
            
        } else {
            const data = await response.json()
            console.log(data)
            
            if(data.token) {
                localStorage.setItem('token', data.token)
                makeTopicForm()
            }
            
        }

    } catch (error) {
        console.log(`Error while trying to login: ${error.message}`)
    }
}


const makeTopicForm = () => {
    const token = localStorage.getItem("token")
    const topicForm = document.getElementById("topicForm")

    if (token) {
        topicForm.innerHTML = `
                <div class="input-field">
                    <input id="topicTitle" type="text" placeholder="Topic Title" required>
                </div>
                <div class="input-field">
                    <textarea id="topicText" class="materialize-textarea" placeholder="Topic Content" required></textarea>
                </div>
                <button id="postTopic" class="btn waves-effect waves-light" type="submit">Post Topic</button>
        `

        document.getElementById("postTopic").addEventListener("click", async (event) => {
                event.preventDefault()
                const title = document.getElementById("topicTitle").value
                const content = document.getElementById("topicText").value

            try {
                const response = await fetch('/api/topic', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({title, content}),
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.message);
                    coolFunction()
                    
                } else {
                    console.error("Failed to post topic")
                }
            } catch (error) {
                console.error(`Error posting topic: ${error.message}`)
            }
        })
    }
}

async function coolFunction() {
    const topicsDiv = document.getElementById("topics")
    const token = localStorage.getItem('token')
        try{
            const response = await fetch("/api/topics")
            const data = await response.json()
            console.log(data);

            data.forEach(element => {
                let topicDiv = document.createElement('div')
                topicDiv.classList.add("card")
                topicDiv.classList.add("z-depth-2")
                topicDiv.classList.add("hoverable")
                topicDiv.classList.add("grey")
                topicDiv.classList.add("lighten-2")
                topicDiv.innerHTML = `
                <div class="card-content">
                    <span class="card-title">
                        ${element.title}
                    </span>
                    <p>
                        ${element.content}
                    </p>
                    <p class="grey-text text-darken-2" >
                        ${element.username} - ${element.createdAt}
                    </p>
                    <div class="card-action">
                         <button class="btn waves-effect waves-light" id="deleteTopic-${element._id}">
                            Delete
                        </button>
                    </div>
                </div>
            `
                topicsDiv.appendChild(topicDiv)

                const deleteButton = topicDiv.querySelector(`#deleteTopic-${element._id}`)
                deleteButton.addEventListener('click', async () => {
                    if (token) {
                        try {
                            const Response = await fetch(`/api/topic/${element._id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            
                            if (Response.ok) {
                                topicDiv.remove()
                                alert('Topic deleted successfully!')
                            } else {
                                console.error("Failed to delete topic")
                                alert("Topic deletion not succesful")
                            }
                        } catch (error) {
                            console.log(`Error while trying to delete topic: ${error.message}`)
                        }
                    } else {
                        alert("You must be logged in to delete a topic.")
                    }
                })
                
            })
            
        } catch (error){
            console.log("Error while trying to get topics: ${error.message}")
        }
} 


initializeLogin()
register()
makeTopicForm()
coolFunction()