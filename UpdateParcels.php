<?php
require 'db.php';
if (isset($_POST['parcel_id']) && $_POST['parcel_id'] 
    && isset($_POST['p_occupancy']) && $_POST['p_occupancy']
	&& isset($_POST['landuse']) && $_POST['landuse']
	)
	  
	{		
		$parcel_id= (int)$_POST['parcel_id'] ;
		$occupancy=	 $_POST['p_occupancy'];
		$landuse= $_POST['landuse'];
		
		//Set default
		$electricity='false';
		$water= 'false';
		$sewage= 'false';
		
		//Set booleans
		if( isset($_POST['electricity'] )&& $_POST['electricity']=='electricity'){
			 $electricity='true';
			 
		  } 
		if(isset($_POST['water']) && $_POST['water']=='water'){
			 $water='true';
			 
		  }
		if(isset($_POST['sewage'])&& $_POST['sewage']=='sewage' ){
			$sewage='true';
		   }	
		
		
		//update  db
		

        $sql="UPDATE lpdp1.\"Cadastre\" SET (occupancy,landuse,electricity,water,sewage) = ('$occupancy','$landuse',$electricity,$water,$sewage) WHERE parcel_id=$parcel_id;";
		
			
		$result = pg_query($db,$sql);
			
     if ($result){			
          echo json_encode(array('success' => 1));
     
	   } else {
		   
        echo json_encode(array('success' => 0));
         }

} else {
    echo json_encode(array('success' => 0));
}

 
?>