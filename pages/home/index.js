function buscarArrayLocalStorage(){
  return JSON.parse(localStorage.getItem("@vagas:vagaselecionada")) || []
}

function renderizarCards(array){
    const ul = document.querySelector(".ulCards")
    ul.innerHTML =""
    array.forEach(elemento => {
        const li = criarCard(elemento)
        ul.appendChild(li)
    });
}
renderizarCards(jobsData)

function criarCard(objeto){
    const {id, title, enterprise, location, descrition, modalities} = objeto

    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const div1 = document.createElement("div")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")
    const p3 = document.createElement("p")
    const div2 = document.createElement("div")
    const divModalidades = document.createElement("div")
    const button = document.createElement("button")

    li.className = "card"
    h2.innerText = title
    div1.className = "empresaCidade"
    p1.innerText = enterprise
    p2.innerText = location
    p3.innerText = descrition
    p3.className = "texto"
    div2.className = "divFlex"
    divModalidades.className = "divFlexModalidades"

    modalities.forEach(modalidade =>{
        const p = document.createElement("p")
        p.className = "modalidade"
        p.innerText = modalidade
        
        divModalidades.append(p)
    })

    button.className = "botaoRoxo botaoCard"
    
    if(existeVagaSelecionada(objeto) >= 0){
      button.innerText = "Remover Candidatura"
    }else{
      button.innerText = "Candidatar"
    }

    button.addEventListener("click", ()=>{
      excluirCandidatar(objeto, button)
    })

    li.append(h2, div1, p3, div2)
    div1.append(p1, p2)
    div2.append(divModalidades, button)
    return li
}

function excluirCandidatar(objeto, botao){
    const listaVagasSelecionadas = buscarArrayLocalStorage()
    const index = existeVagaSelecionada(objeto)
    if(index === -1){
      listaVagasSelecionadas.push(objeto)
      localStorage.setItem("@vagas:vagaselecionada", JSON.stringify(listaVagasSelecionadas))
      renderizarCardsSelecionados(listaVagasSelecionadas)
      botao.innerText = "Remover Candidatura"
    }else{
      excluirVaga(index)
      botao.innerText = "Candidatar"
    }
    mensagemPadrao()
}

function existeVagaSelecionada(objeto){
  const listaVagasSelecionadas = buscarArrayLocalStorage()
  const index = listaVagasSelecionadas.findIndex((elemento) =>{
    if(elemento.id === objeto.id){
        return elemento
    }
  })
  return index
}





