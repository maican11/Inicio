<?php 

	// Para conexiones posgresql $dsn = 'pgsql:dbname=SistemaConsejoComunal;host=localhost'; $usuario = 'postgres'; $contraseña = '1234';


  // Para conexiones mysql 
$dsn = 'mysql:dbname=consejocomunal;host=localhost'; $usuario = 'root'; $contraseña = '';


$conn = CONNECT($dsn,$usuario,$contraseña);

function CONNECT($dsn,$usuario,$contraseña){
	try {
	    return new PDO($dsn, $usuario, $contraseña);
	} catch (PDOException $e) {
	    echo 'Falló la conexión: ' . $e->getMessage();
	}
}

function SELECT($column_name,$table_name,$conn,$show = true){
	$sql = "SELECT ".$column_name." FROM ".$table_name;
	if($show){
		$query = $conn->query($sql);
		return $query->fetchAll();
	}else{ echo json_encode($sql); }
}

function SELECT_WHERE($column_name,$table_name,$where,$conn,$show = true){
	$sql = "SELECT ".$column_name." FROM ".$table_name." WHERE ".$where;
	if($show){
		$query = $conn->query($sql);
		return $query->fetchAll();
	}else{ echo json_encode($sql); }
}

function SELECT_INNER ($column_name,$table_name,$inner,$conn,$show = true){
	$sql = "SELECT ".$column_name." FROM ".$table_name." ".$inner;
	if($show){
		$query = $conn->query($sql);
		return $query->fetchAll();
	}else{ echo json_encode($sql); }
}

function DELETE($table_name,$where,$con,$show = true){
	if($where != ""){
		$sql = "DELETE FROM ". $table_name ." WHERE ".$where;
		if($show){
			return $query = $con->query($sql);
		}else{ echo json_encode($sql); }
	}
}

function INSERT($table_name,$columns,$values,$conn,$show=true){
	$sql =  "INSERT INTO " . $table_name ."(".$columns.") VALUES (".$values.")";
	if($show){
		$query = $conn->query($sql);
		return $query;
	}else{ echo json_encode($sql);
	}
}



function UPDATE ($table_name,$set,$where,$conn,$show=true){
	$sql = "UPDATE ".$table_name." SET ".$set." WHERE ". $where;
	if($show){
		return $query = $conn->query($sql);
	}else{ echo json_encode($sql); }
}




date_default_timezone_set('UTC');
$mes = date('m');
$año = date('o');

switch ($mes) {
    case 1:
    	$inicio = "$año-$mes-01";
    $fin = "$año-$mes-31";
        break;
    case 2:
    	$inicio = "$año-$mes-01";
	$fin= "$año-$mes-28";
        break;
    case 3:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-31";
        break;
    case 4:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-30";
        break;
    case 5:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-31";
        break;
    case 6:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-30";
        break;
    case 7:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-31";
        break;
    case 8:
    	$inicio = "$año-$mes-01";
        $fin= "$año-$mes-31";
        break;
    case 9:
    	$inicio = "$año-$mes-01";
		$fin= "$año-$mes-30";
        break;
    case 10:
    	$inicio = "$año-$mes-01";
		$fin= "$año-$mes-31";
        break;
    case 11:
    	$inicio = "$año-$mes-01";
		$fin= "$año-$mes-30";
        break;
    case 12:
    	$inicio = "$año-$mes-01";
		$fin= "$año-$mes-31";
        break;
}

