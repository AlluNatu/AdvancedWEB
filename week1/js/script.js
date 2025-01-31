const container = document.getElementById("container")

async function startUP(){
    let animalList = ["borzoi", "pug", "cavapoo", "shihtzu", "lhasa"]
    for (let i = 0; i < 5; i++){
        let wikiItem = document.createElement("div")
        let h1TEXT = document.createElement("h1")
        let wikiCONTENT = document.createElement("div")
        let paragraph = document.createElement("p")
        let imgCONTAINER = document.createElement("div")
        let image = document.createElement("img")

        wikiItem.classList.add("wiki-item")
        h1TEXT.classList.add("wiki-header")
        wikiCONTENT.classList.add("wiki-content")
        paragraph.classList.add("wiki-text")
        imgCONTAINER.classList.add("img-container")
        image.classList.add("wiki-img")

        h1TEXT.textContent = animalList[i].toUpperCase()
        paragraph.textContent = await getTEXT(animalList[i])

        image.src = await getPICTURE(animalList[i])
        imgCONTAINER.appendChild(image)

        wikiCONTENT.appendChild(imgCONTAINER)
        wikiCONTENT.appendChild(paragraph)

        wikiItem.appendChild(h1TEXT)
        wikiItem.appendChild(wikiCONTENT)
        container.appendChild(wikiItem)
    }
}

async function getPICTURE(breedText) {
    const URL = `https://dog.ceo/api/breed/${breedText}/images/random`
    const resIMAGE = await fetch(URL)
    const imageAPI = await resIMAGE.json()
    return imageAPI.message


}

async function getTEXT(breedText) {
    const URL = `https://en.wikipedia.org/api/rest_v1/page/summary/${breedText}`
    const resTEXT = await fetch(URL)
    const textAPI = await resTEXT.json()
    let text = textAPI.extract
    return text
    console.log(text)
}



startUP()