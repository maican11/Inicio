let sidebarButton = document.getElementById('sidebarButton');
let sidebarContent = document.getElementById("sidebarContent");
let cover = document.getElementById("cover");
let tipUser = 0;
sidebarButton.addEventListener("click",()=>{
	anime({targets:"#sidebar",left:0,easing:"linear",duration:500})
	anime({targets:"#cover",opacity:1,zIndex:1,easing:"linear",duration:500})
})

cover.addEventListener("click",() => {
	anime({targets:"#sidebar",left:-500,easing:"linear",duration:500})
	anime({targets:"#cover",opacity:0,zIndex:-2,easing:"linear",duration:500})
});

const userName = (solicitudCantidad) => {
	new Promise(res => {
		recibir("../phpFunc/getDataUser.php", (data) => {
			user_name.innerText = data[0]['name']+" "+data[0]['lname'];
			if(document.getElementById("tablaDeudas")){
				tipUser = data[0]['id_tip'];
				if(data[0]['id_tip'] == 1 && !!document.getElementById("tablaDeudas")){
					tablaDeudas.removeChild(tablaDeudas.querySelector(".box3"))
				}else{
					tablaDeudas.removeChild(tablaDeudas.querySelector(".box1"))
					tablaDeudas.removeChild(tablaDeudas.querySelector(".box2"))
				}
				tablaDeudas.classList.remove("d-none");
			}
			data[1].forEach((x, y) => {
					let i = crearNode("i",[["class","fas fa-caret-right"]]," "+x[1]);
					// let li =  crearNode("li",[["class","list-group-item list-group-item-action pl-4 liSidebar"]],a);
					let a;
					let badge;
					if(x[2]){
						a = crearNode("div",[["href",x[0]],["class","aSidebar list-group-item list-group-item-action pl-4"]],i);
						a.addEventListener("click",() => {
							logout(a);
						});
					}else{
						if(y != 6){
							a = crearNode("a",[["href",x[0]],["class","aSidebar list-group-item list-group-item-action pl-4"]],i);
						}else{
							a = crearNode("a",[["href",x[0]],["class","aSidebar list-group-item list-group-item-action pl-4 d-flex justify-content-between"]],i);
							if(solicitudCantidad != 0){
								badge = crearNode("span",[["class","badge rounded-pill  bg-danger"]],solicitudCantidad);
								a.appendChild(badge);
							}
						}
					}
					sidebarContent.appendChild(a);
			});
		});
	});
}


const solicitudesToday = () => {
	return new Promise(res => {
		recibir("../phpFunc/solicitudesToday.php", (data) => {
			res(data)
		})
	});
}


solicitudesToday().then(v => {
	userName(v);
})


