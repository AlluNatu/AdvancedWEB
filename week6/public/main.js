const offersContainer = document.getElementById('offersContainer')

document.getElementById("offerForm").addEventListener("submit", async function(event) {
    event.preventDefault()


    let formData = new FormData(this);
    if (!formData.has("price")) {
        formData.append("price", document.getElementById("price").value);
    }
    if (!formData.has("description")) {
        formData.append("description", document.getElementById("description").value);
    }
    console.log(formData);
    try {
        const res = await fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        if (!res.ok) {
            throw new Error("Upload failed")
        }
        const result = await res.json()
    } catch(error) {
        console.log("ERROR ", error)
    } finally {
        fetchdata()
    }

    
})
// 
const fetchdata = async() => {
    try {
        const response = await fetch('/offers');
        if(!response.ok) {
            throw new Error("Failed to fetch images")
        }
        const offers = await response.json();
        loadCoolOffers(offers)

    } catch(error) {
        console.error("Error", error)
    }
}

  const loadCoolOffers = async(offers) => {
    offersContainer.innerHTML = ''
    offersContainer.classList.add("row")

    offers.forEach(offer => {
        const Div = document.createElement('div');
        Div.classList.add('col', 's12', 'm6', 'l4', 'offerDiv');
    
        let imageHTML = '';
        if (offer.imagePath) {
            imageHTML = `<img class="responsive-img" src="./${offer.imagePath}">`;

        }
    
        Div.innerHTML = `
            <div class="card hoverable">
                <div class="card-image">
                    ${imageHTML}
                    <span class="card-title">${offer.title}</span>
                </div> 
                <div class="card-content">
                    <p>${offer.description}</p>
                    <p>Price: ${offer.price}€</p>
                </div>
            </div>`
        offersContainer.appendChild(Div);
        console.log(Div)
    })
    
}

fetchdata()