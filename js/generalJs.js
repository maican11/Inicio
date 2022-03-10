const  getUser = () =>{
	return new Promise(res=>{
		recibir("../phpFunc/login.php",function(data){res(data);});
	});
};

const justNumber = (input)=>{input.value = input.value.replace(/[A-Za-z]/gi,"");}

const justLetra = (input) =>{input.value = input.value.replace(/\d/gi,"").toString();}

const noSpecial = (input) =>{input.value = input.value.replace(/[^a-zA-Z ]/g, "").toString();}

const WithoutSpace = (input) =>{input.value = input.value.replace(/\s/g,"").toString();}

const CapitalLetter = (input) =>{input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);}

const inputLimit =  (input,limit) =>{input.value = input.value.slice(0,limit);}

const redLighter = (input,bool=true) =>{if(bool){input.classList.add("border-danger"); setTimeout(()=>{input.classList.remove("border-danger"); },3500); }else{input.classList.remove("border-danger"); } }

const cerrarModals = () => {document.querySelectorAll(".btn-close").forEach(x => {x.click();})}

const format = (input) => {let num = input.value.replace(/\./g,''); if( !isNaN(num) ){num = num.replace(/^0+/, ''); num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.'); num = num.split('').reverse().join('').replace(/^[\.]/,''); input.value = num; }else{input.value = input.value.replace(/[^\d\.]*/g,''); } }


const pressKey = (input,keyCode,limit,func) => {
	if(keyCode.keyCode == limit){
		func();
	}
}
let cienAños = [];

window.onload = () => {
	if(document.getElementById("btnPass")){
	let btnPass = document.getElementById("btnPass");
	btnPass.addEventListener("click",() => {	
		let pass = document.getElementById("password").querySelectorAll(".input");
		let key = true;
		let json = [];
		let msg;
		pass.forEach( (x,y) => {
			if(x.value == ""){
				key = false;
				msg = "Rellene todos los campos";
				redLighter(x);
			}else{
				json.push(x.value);
			}

		});
		if(!key){
			alert(1,msg);
		}else{
			if(json[1] != json[0]){
				key = false;
				msg = "Las contraseñas no coinciden";
			}
			if(!key){
				alert(1,msg);
			}else{
				enviar("../phpFunc/setPass.php",[json], (data) => {
					if(data == 1){
						alert(2,"Seguridad Configurada");
						document.getElementsByName("closeBPass")[0].click()
					}else if(data == 2){;
						alert(1, "Error en la actualización");
					}else if(data == 3){
						alert(1, "la contraseña no es valida");
					}else if(data == 4){
						alert(1, "ERROR");
					}
				});
			}
		}
	});
	}
}


const getPreguntas = () => {
	return new Promise(res => {
		recibir("../phpFunc/getPreguntas.php",data => {
			let pregunta1 = document.getElementById("pregunta1");
			let pregunta2 = document.getElementById("pregunta2");
			let pregunta3 = document.getElementById("pregunta3");
			if(pregunta1 || pregunta2 || pregunta3){
				let array = [pregunta1, pregunta2, pregunta3];
				array.forEach(x =>{
					let optionDefault = crearNode("option",[["value"]],"Seleccione una pregunta");
					x.appendChild(optionDefault);
					data.map((y,z) => {
						let option = crearNode("option",[["value",(z+1)]],y['pregunta']);
						x.appendChild(option);
					});			
			});
			}
		});
	});
}

/*const tableFill = async (info,html,active) =>{
	html.innerHTML 	= "";
	let data 		= info;
	pagination(Math.ceil(info.length/limite),active);
	Fill(data,html);
	if(html.querySelectorAll('tr').length != limite){
		let falta = limite - html.querySelectorAll('tr').length;
		for (var i = 0; i < falta; i++) {
			var td 		= crearNode("td",[["class","text-center text-white"],["colspan",espacio]],".");
			var tr 		= crearNode("tr",[],td);
			var clone 	= tr.cloneNode(true);
			html.appendChild(clone);
		}
	}
}*/

const contadorVacio = (number) => {
	let json = [];
	for (var i = number - 1; i >= 0; i--) {
		json.push("");
	}
	return json;
}

const alert = (type,text,id,data) =>{
	switch(true){
		case 1 == type:
			Swal.fire({
			  icon: 'error',
			  title: text,
			  showConfirmButton: false,
			  timer: 1500
			})
		break;
		case 2 == type:
			var timerInterval
			Swal.fire({
			  icon: 'success',
			  title: text,
			  html: '',
			  timer: 2000,
			  didOpen: () => {
			    Swal.showLoading()
			  },
			  willClose: () => {
			    clearInterval(timerInterval)
			  }
			})
		break;
		case 3 == type:
			Swal.fire({
			  title: '¿Esta seguro?',
			  text: text,
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Si'
			}).then((result) => {
			  if (result.isConfirmed) {
    			id();
			  }
			});
		break;
		case 4 == type:
			var end
			Swal.fire({
			  icon: 'success',
			  title: text,
			  html: '',
			  timer: 3000,
			  didOpen: () => {
			    // Swal.showLoading()
			  },
			  willClose: () => {
			    clearInterval(end)
			  }
			})
		break;
		case 5 == type:
			Swal.fire({
			  title: '<strong><u>Informacion</u></strong>',
			  icon: 'info',
			  html:
			    `
				<p>El Usuario <strong>${lista[id]["name"]} ${lista[id]["lname"]}</strong> de Genero ${lista[id]["genero"]}</p>
				<p>del piso <strong>${lista[id]["piso"]}-${lista[id]["apartamento"]}</strong> que mide ${lista[id]["mc"]} M<sup>2</sup></p>
				<p>Su tipo de usuario es ${lista[id]["tipo_user"]} </p>
				<p>Contacto:  </p>
				<p><li>telefono:<strong>${lista[id]["telefono"] || "sin telefono"}</strong></li></p><p><li>celular: <strong>${lista[id]["celular"] || "sin celular"}</strong></li></p><p><li>correo: <strong>${lista[id]["correo"] || "sin correo"}</strong></li></p>
				`,
			  showCloseButton: true,
			  showCancelButton: false,
			  focusConfirm: false
			});
		break;
		case 6 == type:
			Swal.fire({
			  title: 'Informacion',
			  text: text,
			  icon: 'info',
			  showCancelButton: false,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'ok',
			  showCloseButton: false
			}).then((result) => {
    			id();
			});
		break;
		case 7 == type:
			var timerInterval
			Swal.fire({
			  icon: 'info',
			  title: text,
			  html: '',
			  timer: 2000,
			  didOpen: () => {
			    Swal.showLoading()
			  },
			  willClose: () => {
			    clearInterval(timerInterval)
			  }
			})
		break;
	}
}

const ActivarFomulario = (btnName,func) => {
	//Nombre
	let name = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let nameLabel = crearNode("label",[["class","form-label text-center"]],"Nombre");
	let nameInput = crearNode("input",[["type","text"],["class","form-control form-control-sm  input"],["autocomplete","off"],["placeholder","Nombre"]],"");
	nameInput.addEventListener("keyup",function () {
		justLetra(this);
		CapitalLetter(this)
	});
	name.appendChild(nameLabel);
	name.appendChild(nameInput);
	//apellido
	let lname = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let lnameLabel = crearNode("label",[["class","form-label text-center"]],"Apellido");
	let lnameInput = crearNode("input",[["type","text"],["class","form-control form-control-sm  input"],["autocomplete","off"],["placeholder","Apellido"]],"");
	lnameInput.addEventListener("keyup",function(){
		justLetra(this);
		CapitalLetter(this)
	});
	lname.appendChild(lnameLabel);
	lname.appendChild(lnameInput);
	//fecha de nacimiento
	let date = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let dateLabel = crearNode("label",[["class","form-label text-center"]],"Fecha de nacimiento");
	let dateInput = crearNode("input",[["type","date"],["min",cienAños[1]],["max",cienAños[0]],["class","text-black form-control form-control-sm  input"],["autocomplete","off"]],"");
	date.appendChild(dateLabel);
	date.appendChild(dateInput);
	//genero
	let select = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let selectLabel = crearNode("label",[["class","form-label text-center"]],"Genero");
	let selectInput = crearNode("select",[["aria-label","Default select example"],["class","form-control form-control-sm  input"]],"");
	let option1 = crearNode("option",[["value",""]],"Seleccion un genero");
	let option2 = crearNode("option",[["value","1"]],"Masculino");
	let option3 = crearNode("option",[["value","2"]],"Femenino");
	selectInput.appendChild(option1);
	selectInput.appendChild(option2);
	selectInput.appendChild(option3);
	select.appendChild(selectLabel);
	select.appendChild(selectInput);
	//telefono
	let telefono = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let telefonoLabel = crearNode("label",[["class","form-label text-center"]],"Telefono");
	let telefonoInput = crearNode("input",[["type","text"],["class","form-control form-control-sm  input"],["autocomplete","off"],["placeholder","Telefono"]],"");
	telefonoInput.addEventListener("keyup",function(){
		justNumber(this);
		inputLimit(this, 11);
	});

	telefono.appendChild(telefonoLabel);
	telefono.appendChild(telefonoInput);
	//celular
	let celular = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let celularLabel = crearNode("label",[["class","form-label text-center"]],"Celular");
	let celularInput = crearNode("input",[["type","text"],["class","form-control form-control-sm  input"],["autocomplete","off"],["placeholder","Celular"]],"");
	celularInput.addEventListener("keyup",function(){
		justNumber(this);
		inputLimit(this, 11);
	});

	celular.appendChild(celularLabel);
	celular.appendChild(celularInput);
	//correo
	let correo = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let correoLabel = crearNode("label",[["class","form-label text-center"]],"Correo Electronico");
	let correoInput = crearNode("input",[["type","text"],["class","form-control form-control-sm  input"],["autocomplete","off"],["placeholder","correo"]],"");
	correoInput.addEventListener("keyup",function(){
		WithoutSpace(this);
	});

	correo.appendChild(correoLabel);
	correo.appendChild(correoInput);
	//piso
	let Piso = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let PisoLabel = crearNode("label",[["class","form-label text-center"]],"Piso");
	let PisotInput = crearNode("select",[["aria-label","Default select example"],["class","form-control form-control-sm  input"]],"");
	let Pisooption1 = crearNode("option",[["value",""]],"Seleccion un piso");
	PisotInput.appendChild(Pisooption1);
	pisos.forEach(x => {
		let optionPiso = crearNode("option",[["value",x['piso']]],x['piso']);
		PisotInput.appendChild(optionPiso);
	});
	Piso.appendChild(PisoLabel);
	Piso.appendChild(PisotInput);
	//Apartamento
	let apt = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let aptLabel = crearNode("label",[["class","form-label text-center"]],"Apartamento");
	let apttInput = crearNode("select",[["aria-label","Default select example"],["class","form-control form-control-sm  input"]],"");
	let aptoption1 = crearNode("option",[["value",""]],"Seleccion el numero de Apartamento");
	let aptoption2 = crearNode("option",[["value","1"]],"1");
	let aptoption3 = crearNode("option",[["value","2"]],"2");
	apttInput.appendChild(aptoption1);
	apttInput.appendChild(aptoption2);
	apttInput.appendChild(aptoption3);
	apt.appendChild(aptLabel);
	apt.appendChild(apttInput);
	//Tipo de usuario
	let user = crearNode("div",[["class","col-6 m-0 row mb-3"]],"");
	let userLabel = crearNode("label",[["class","form-label text-center"]],"Tipo de usuario");
	let usertInput = crearNode("select",[["aria-label","Default select example"],["class","form-control form-control-sm  input"]],"");
	let useroption1 = crearNode("option",[["value",""]],"Seleccion el tipo de usuario");
	let useroption2 = crearNode("option",[["value","1"]],"Administrador");
	let useroption3 = crearNode("option",[["value","2"]],"Usuario");
	usertInput.appendChild(useroption1);
	usertInput.appendChild(useroption2);
	usertInput.appendChild(useroption3);
	user.appendChild(userLabel);
	user.appendChild(usertInput);
	//Boton
	let btn = crearNode("div",[["class","col-12 m-0 row mb-3 d-flex justify-content-center"]],"");
	let btnDiv = crearNode("div",[["class","col-4 m-0 row mb-3"]],"");
	let btnInput = crearNode("input",[["type","button"],["class","btn btn-success btn-sm col-12"],["value",btnName]],"");
	btnInput.addEventListener("click",func);
	btnDiv.appendChild(btnInput);
	btn.appendChild(btnDiv);


	dataLoad.appendChild(name);
	dataLoad.appendChild(lname);
	dataLoad.appendChild(date);
	dataLoad.appendChild(select);
	dataLoad.appendChild(celular);
	dataLoad.appendChild(telefono);
	dataLoad.appendChild(correo);
	dataLoad.appendChild(Piso);
	dataLoad.appendChild(apt);
	dataLoad.appendChild(user);
	dataLoad.appendChild(btn);
}


const isMobile = () => {
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

const Fecha = (dato) => {
	return new Promise(res => {
		enviar("../phpFunc/Fecha.php",[dato],function(data){
			res(data);
		});
	});
}

const inputDate = async () => {
	cienAños = [];
	cienAños.push(await Fecha(1) );
	cienAños.push(await Fecha(2) );
}

const PisoAvaiable = () => {
	return new Promise(res => {
		recibir("../phpFunc/getListPiso.php",data => {
			pisos = data;
		})
	});
}

const logout = () => {
	 return new Promise(res => {
	 	recibir("../phpFunc/logout.php",(data) => {
	 		token();
	 	});
	 });
}

const token = () => {
	return new Promise (res => {
		recibir("../phpFunc/token.php",(data) => {
			if(data != 1){
				if(location.pathname.search("main") == -1){
					location.href = "../main";
				}
			}else{
				passwordChange();
			}
		})
	});
}

const quitarAcentos = (cadena) =>{
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

		
const dashboardNoticias = (x,y,z,input) => {
	// Imagen
	let img = crearNode("img",[["src",x.url_img],["class","rounded"],["draggable" ,"false"],["style","width: inherit;box-shadow: 8px 4px 13px;"]],"");
	let divImg = crearNode("div",[["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"]],img);
	let divdivImg =  crearNode("div",[["class","col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 row mb-2 d-flex justify-content-center align-items-center"]],divImg);
	// titular
	let u = crearNode("u",[],x.titulo);
	let h3 = crearNode("h3",[["class","text-center"]],u);
	let divh3 = crearNode("div",[["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"]],h3);

	// Cuerpo
	let  p = crearNode("p",[["class","text-justify"]],x.texto);
	let divp = crearNode("div",[["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"]],p);


	let divTexto = crearNode("div",[["class","col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12"]],divh3);
	divTexto.appendChild(divp);
	let div;
	if((z.length-1) == y){
		div = crearNode("div",[["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 row m-0 p-0   p-2 mb-2 d-flex justify-content-center"]],divdivImg);
	}else{
		div = crearNode("div",[["class","col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 row m-0 p-0 border-bottom border-muted p-2 mb-2 d-flex justify-content-center"]],divdivImg);
	}
	div.appendChild(divTexto);
	input.appendChild(div);
}


const getNoticias = () => {
	return new Promise(res => {
		recibir("../phpFunc/getNoticias.php",(data) => {
			res(data);
		});
	});
}

const passwordChange = () => {
	recibir("../phpFunc/getSecure.php",(data) => {
		if(data == 1) { btnPassword.click()};
	});
}

//getPreguntas();
token();