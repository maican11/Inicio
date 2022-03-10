const pagination = (pages,active) =>{
    page.innerHTML = "";

    for (var i = 0; i < pages; i++) {
        var a = crearNode("a",[["class","page-link"]],i+1);
        if(active == i){
            var li = crearNode("li",[["class","page-item active"]],"");
        }else{
            var li = crearNode("li",[["class","page-item"]],"");
        }
        li.appendChild(a);
        let clone= li.cloneNode(true);
        clone.addEventListener("click",function(){
            maximo = (this.innerText - 1) * limite ;
            paginaActual = (this.innerText-1);
            if(paginaActual == Math.ceil(lista.length/limite)-1){
                next.classList.add("disabled");
                prev.classList.remove("disabled");
            }else if(paginaActual == 0){
                prev.classList.add("disabled");
                next.classList.remove("disabled");
            }else{
                prev.classList.remove("disabled");
                next.classList.remove("disabled");
            }
            pageNext(maximo,limite,lista,tabla,(this.innerText-1));
        });
        page.appendChild(clone);
    }
}

const pageNext = (max,limit,info,html,active) =>{
    minimo = max;
    maximo = minimo + limit;
    tableFill(info,html,active); 
}

const pagePrev = (max,limit,info,html,active) =>{
    if( 0 <= minimo - limit){
        minimo = minimo - limit;
        maximo = max    - limit;
    }
    tableFill(info,html,active); 
}

next.addEventListener("click",() => {
    paginaActual +=1; 
    if(Math.ceil(lista.length/limite) > paginaActual){
        pageNext(maximo,limite,lista,tabla,(paginaActual));
        prev.classList.remove("disabled");
    }
    if(Math.ceil(lista.length/limite) == paginaActual){
        next.classList.add("disabled");
        prev.classList.remove("disabled");
    }
})

prev.addEventListener("click",() => {
    paginaActual -=1; 
    if(-1 < paginaActual){
        pagePrev(maximo,limite,lista,tabla,(paginaActual));
        next.classList.remove("disabled");
    }
    if(-1 == paginaActual-1){
        prev.classList.add("disabled");
        next.classList.remove("disabled");
    }
})