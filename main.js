
const elform = document.querySelector(".form")
const elsearch = document.querySelector(".search")
const ellist = document.querySelector(".list")
const elbox = document.querySelector(".box")
const elinbox = document.querySelector(".input-box")

const elTemplate = document.querySelector(".movies-template").content

let number = 1
// console.log(elTemplate);
//5
let elitem = document.querySelector(".boxs")
let elitembtnnext = document.createElement("button")
let elitembtnprev = document.createElement("button")
elitembtnnext.textContent = "<="
elitembtnnext.type = "button"
elitembtnnext.classList.add("btn", "text-white", "btn-pagination", "w-50")
elitembtnprev.textContent = "=>"
elitembtnprev.type = "button"
elitembtnprev.classList.add("btn", "text-white", "btn-pagination", "w-50")

elitembtnprev.addEventListener("click", function() {
  addsearch()
  number += 1
})
elitembtnnext.addEventListener("click", function() {
  addsearch()
  if (number >= 1) {
    number -= 1
  }
})
elitem.appendChild(elitembtnnext)
elitem.appendChild(elitembtnprev)

//8



let frogmentTemplate = new DocumentFragment()
let frogment = new DocumentFragment()

let num = true
elsearch.addEventListener("keyup", function () {
  addsearch()
})
window.addEventListener("click", (evt) => {
  if (evt.target.cloneNode != "search") {
    ellist.innerHTML = ""
    // elsearch.value = ""
  }
})





function addsearch() {
  fetch(`https://www.omdbapi.com/?apikey=76541293&s='${elsearch.value}'&page=${number}`)
  .then(res => res.json())
  .then(data => {

    ellist.innerHTML= ""
    if (data.Search != undefined) {
      data.Search.forEach(itm => {
 
        if (itm.Poster != "N/A") {
          let elitem = document.createElement("li")
          let elboxid= document.createElement("div")
          let eltitle = document.createElement("p")
          let eltype = document.createElement("div")
          let elyear = document.createElement("p")
          let elimg = document.createElement("img")
          elitem.classList.add("list-item")
          elboxid.classList.add("list-item-box")
          eltype.classList.add("list-box")
          eltitle.classList.add("search-title")
          elimg.classList.add("img-kino", "card-img-top")
         
          elimg.src = itm.Poster
          elimg.alt = itm.Title
          eltitle.textContent = itm.Title
          elyear.textContent = itm.Year
          elboxid.dataset.imgid = itm.imdbID
          elitem.appendChild(elboxid)
          elitem.appendChild(elimg)
          eltype.appendChild(eltitle)
          eltype.appendChild(elyear)
          elitem.appendChild(eltype)
          frogment.appendChild(elitem)
        }
       
      })
    }
    elitem.classList.remove("d-none")
    ellist.appendChild(frogment)
    ellist.appendChild(elitem)
  })

  
  
  ellist.addEventListener("click", function (evt) {
  if (num == true) {
    if (evt.target.matches(".list-item-box")) {
      num = false
      setTimeout(() => {
        num = true
      })
      elsearch.value =""
      ellist.innerHTML =""
    let elitemid = evt.target.dataset.imgid
    fetch(`http://www.omdbapi.com/?apikey=76541293&i=${elitemid}`)
    .then(res => res.json())
      .then(data => {
        elbox.innerHTML= ""
        let clonedTemplate = elTemplate.cloneNode(true)

        clonedTemplate.querySelector(".img-link").href = data.Poster
        clonedTemplate.querySelector(".img-url").src = data.Poster
        clonedTemplate.querySelector(".movies-title").textContent = data.Title
        clonedTemplate.querySelector(".movies-year").textContent = data.Year
        clonedTemplate.querySelector(".movies-reiting").textContent = `PG-${data.imdbRating}`
        clonedTemplate.querySelector(".movies-actors").textContent = data.Actors
        clonedTemplate.querySelector(".movies-plot").textContent = data.Plot
        clonedTemplate.querySelector(".movies-released").textContent = data.Released
        clonedTemplate.querySelector(".movies-writer").textContent = data.Writer
        clonedTemplate.querySelector(".movies-language").textContent = data.Language
        clonedTemplate.querySelector(".movies-awards").textContent = data.Awards
        clonedTemplate.querySelector(".movies-genre").textContent = data.Genre

        clonedTemplate.querySelector(".movies-link").href = `https://www.imdb.com/title/${data.imdbID}`

        elbox.appendChild(clonedTemplate)
        // console.log(data);
    
      })
    
  }
  }
  })
}
