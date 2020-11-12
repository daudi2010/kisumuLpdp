<?php
require 'db.php';
if (isset($_POST['bld_id']) && $_POST['bld_id'] 
     && isset($_POST['wallmat']) && $_POST['wallmat']
	 && isset($_POST['roofmat']) && $_POST['roofmat']
	 && isset($_POST['floors']) && $_POST['floors']
	 && isset($_POST['occupancy']) && $_POST['occupancy']
	 && isset($_POST['typology']) && $_POST['typology'])
	  
	{
				
		$bld_id= $_POST['bld_id'] ;
		$bld_name= trim($_POST['bldname']);
		$wallmat=  $_POST['wallmat'];
		$roofmat= $_POST['roofmat'];
		$floors=(int) $_POST['floors'];
		$occupancy=	 $_POST['occupancy'];
		$typology= $_POST['typology'];
		
		
	   
		//update  db
		


        $sql="UPDATE lpdp1.\"buildings\" SET (floors,occupancy,roof_mat,wall_mat,name,typology) ".
		                                 "= ($floors,'$occupancy','$roofmat','$wallmat','$bld_name','$typology') WHERE building_id=$bld_id;";
		
					
		$result = pg_query($db, $sql);
        if (!$result){			
           echo json_encode(array('success' => 0));
          } else {
            echo json_encode(array('success' => 1));
          }

} else {
  echo json_encode(array('success' => 0));
}

 
?>