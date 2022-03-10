    /** Ejemplo de uso de la funcion 
  
     document.getElementById("btn").addEventListener("click",_ =>{
       recibir("prueba.php", (data) => {
         document.querySelector("#datos").innerHTML = data
       });
     });
  */
  //Funcion para recibir datos con fetch
  const recibir = function (
    urlPHP /* Aqui se coloca el document de php que se debe colocar */,
    func   /* Aqui se coloca la funcion con la que actuara los datos traidos  */
    ){
      fetch(urlPHP)
      .then(response => response.json())
      .then(data => {if (func != "") func(data); })
      .catch((error) => { console.error('Hubo un problema con la petición Fetch:' + error.message) })
  }
  // Funcion para enviar datos con fetch

  const enviar = function (
  urlPHP /*Documento Php que hara comunicacion*/,
  paquete /*Informacion que sera pasada al PHP en formato de JSON*/,
  func /*Funcion que realizara*/
  ){

  // Aqui la informacion la coloca en un formulario para poder enviarla  
  let json = JSON.stringify(paquete);
  let form = new FormData();
  form.append("data" , json);

  // segundo parametro editable de fetch
  let init = {
    method: "post",
    body: form   
  }

  fetch(urlPHP, init)
  .then(response => response.json())
  .then(data =>  {if (func != "") func(data) })
  .catch((error) => { console.error('Hubo un problema con la petición Fetch:' + error.message) })

}
 
const enviarImg = function (
  urlPHP /*Documento Php que hara comunicacion*/,
  nombre /*nombre de la imagen*/,
  img /*Informacion que sera pasada al PHP en formato de imagen*/,
  func /*Funcion que realizara*/
  ){

  // Aqui la informacion la coloca en un formulario para poder enviarla  
  let form = new FormData();
  if (nombre == "") {
    nombre = "Sin Titulo"
  };
  form.append("nombre" , nombre);
  form.append("data" , img);

  // segundo parametro editable de fetch
  let init = {
    method: "PUT",
    body: form   
  }

  fetch(urlPHP, init)
  .then(response => response.json())
  .then(data =>  {if (func != "") func(data) })
  .catch((error) => { console.error('Hubo un problema con la petición Fetch:' + error.message) })

}



const formPrueba = async (  
  urlPHP /*Documento Php que hara comunicacion*/,
  form /*nombre de la imagen*/,
  func /*Funcion que realizara*/,
  key = false
  ) =>
{
  let init = {
    method: "POST",
    body: new FormData(form)
  }
  let res = await fetch(urlPHP,init);
  let data;
  if(key){
    data = await res.text();
  }else{
    data = await res.json();
  }
  func(data);
}