/*Creador de nodos*/

//El creador de nodos creara los nodos que necesite pero las etiquetas con atributos que no le perteneces simplemente no
//los reconocera el navegador
/*
Ejemplo

<div name="jose">
Si llamamos por consola document.getELementByName("manuel") saldra undefined  ya que name no es un atributo 
que acepte el div

template attrib 
[["atrib","valor"] , ["atrib","valor"]]
[["atrib","valor"]]
 */
const crearNode = function (
	node /*El nombre del nodo que quieres crear */,
	attrib = []/* los atributos que tendra, deben ser montado en formato de arrays 
	[["atrib1","valor1"],["atrib2","valor2"] ,...["atribN","valorN"]]*/,
	content = "" /* Aqui colocamos un node aparte o texto */
	){

	/* Creando el node */
	let tag = document.createElement(node);

	/* Asignando atributos */	
	if (typeof attrib === "object") {
		for (var i = 0; attrib.length > i; i++) {			
			if (attrib[i][0] != undefined) {
				if (typeof attrib[i] === "object"){

					/* Aqui esta el atributo */
					let atributo = attrib[i][0];

					/* Aqui se asigna el valor del atributo */
					let valor 	 = attrib[i][1] || "";

					/* Se le accionan los atributos y su valor */
					try{
						tag.setAttribute(atributo,valor);
					}catch(e){
						console.error("Ha ocurrido un error \n el atributo " + (i+1) + " No puedo ser implementado")
					}
				}else{
					/* Error de atributos se envio un valor invalido */
					console.error ("el atributo "+ (i+1) +" que se envio, no es un array");
				}
			}else{
				/* error de atributos el primero atributo esta vacio. */
				console.error ("el atributo "+ (i+1) +" que se envio, esta vacio");
			}
		}
	}

	/* Aqui asignamos un texto o otro nodo que este disponible*/

	if (content != "") {
		if (typeof content === "string") {
			text = document.createTextNode(content);
		}else if(typeof content === "number"){
			text = document.createTextNode(content.toString());
		}
		else{
			text = content;
		}
		tag.appendChild(text);
	}

	/* se retorna el valor */
	return tag;
}



