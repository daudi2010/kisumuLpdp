<?php

require 'db.php';
if (isset($_POST['road_id']) && $_POST['road_id'] 
    && isset($_POST['surfacetype']) && $_POST['surfacetype']
	&& isset($_POST['condition']) && $_POST['condition']
	)
	  
	{		
		$road_id= (int)$_POST['road_id'] ;
		$roadname=	 $_POST['roadname'];
		$condition= $_POST['condition'];
		$surfacetype= $_POST['surfacetype'];			
	   

        $sql="UPDATE lpdp1.\"mergedRoads\" SET (rdname,rdcondition,surface_type) = ('$roadname','$condition','$surfacetype') WHERE rd_id=$road_id;";
				
		
	
	   $result = pg_query($db, $sql );
			
       if ($result){			
			   echo json_encode(array('success' => 1));
		} else {
			
			echo json_encode(array('success' => 0));
			
		}

} else {
    echo json_encode(array('success' => 0));
}
  
 
?>