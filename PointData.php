<?php

require 'db.php';

if (isset($_POST['pt_coord']) && $_POST['pt_coord'] 
    && isset($_POST['pt_landuse']) && $_POST['pt_landuse']
	
	)
	  
	{		
		$pt_coord= $_POST['pt_coord'] ;
		$landuse= $_POST['pt_landuse'];
		$ptname= trim($_POST['pt_name']);
					
	   
	   //grab inputs,clean and manipulate
	   
	    $pt_coord=   str_replace("LatLng","",$pt_coord);
		$geomString=$pt_coord ; //(-1.210778, 36.79273)
		$pt_coord=str_replace(")","",$pt_coord);//)
		$pt_coord=str_replace("(","",$pt_coord);//(
		$coords=explode(",",$pt_coord);
		
		 $lat=(double)$coords[0];
		 $lon=(double)$coords[1];
		
        $sql="INSERT INTO lpdp1.\"points\"  (pt_name,landuse,lat,lon,geom) VALUES ('$ptname','$landuse', $lat, $lon,ST_GeomFromText('POINT($lon $lat)', 4326));";
		
		 
	
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