<?php
$info = $_FILES['file'];

//datos del arhivo
$nombre_archivo = $_FILES['file']['name'];
$tipo_archivo = $_FILES['file']['type'];
$tamano_archivo = $_FILES['file']['size'];
$directorio = "../Documentos/Actas/";
//compruebo si las características del archivo son las que deseo
if (!((strpos($tipo_archivo, "pdf") || strpos($tipo_archivo, "jpeg")) && ($tamano_archivo < 1000000))) {
   	$info =  "La extensión o el tamaño de los archivos no es correcta. <br><br><table><tr><td><li>Se permiten archivos .gif o .jpg<br><li>se permiten archivos de 100 Kb máximo.</td></tr></table>";
}else{
   	if (move_uploaded_file($_FILES['file']['tmp_name'],$directorio.$nombre_archivo)){
      		$info =  "El archivo ha sido cargado correctamente.";
   	}else{
      		$info =  "Ocurrió algún error al subir el fichero. No pudo guardarse.";
   	}
}

echo json_encode($info);

