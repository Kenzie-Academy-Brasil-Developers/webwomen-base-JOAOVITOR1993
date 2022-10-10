
function renderizarCardsSelecionados(array){
    const ul = document.querySelector(".ulCardsSelecionados")
    ul.innerHTML =""
    array.forEach(elemento => {
        const li = criarCardSelecionado(elemento)
        ul.appendChild(li)
    });
}
renderizarCardsSelecionados(buscarArrayLocalStorage())

function criarCardSelecionado(objeto){
    const {id, title, enterprise, location, descrition, modalities} = objeto

    const li = document.createElement("li")
    const div1 = document.createElement("div")
    const h2 = document.createElement("h2")
    const button = document.createElement("button")
    const img = document.createElement("img")
    const div2 = document.createElement("div")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")

    li.className = "cardSelecionados"
    h2.innerText = title
    button.className = "botaoExcluir"

    button.addEventListener("click", ()=>{
        const listaVagasSelecionadas = buscarArrayLocalStorage()
        const vagaExcluir = listaVagasSelecionadas.findIndex((elemento) =>{
          if(elemento.id === id){
           return elemento
          }
        })
        listaVagasSelecionadas.splice(vagaExcluir, 1)
        localStorage.setItem("@vagas:vagaselecionada", JSON.stringify(listaVagasSelecionadas))
        renderizarCardsSelecionados(listaVagasSelecionadas)
        mensagemPadrao()
    })
    img.src = "./assets/img/trash.png"
    p1.innerText = enterprise
    p2.innerText = location

    li.append(div1, div2)
    div1.append(h2, button)
    button.append(img)
    div2.append(p1, p2)

    return li
}


function mensagemPadrao(){
    if(document.querySelector(".cardSelecionados") === null){
        document.querySelector(".ulCardsSelecionados").insertAdjacentHTML("beforeend", `
        <li class="mensagemPadrao">
            <p>Você ainda não aplicou para nenhuma vaga</p>
        </li>
    `)
    }else{
        const mensagem = document.querySelector(".mensagemPadrao")
        mensagem.remove()
    }   
  }
  mensagemPadrao()
  