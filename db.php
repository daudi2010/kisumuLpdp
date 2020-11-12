<?php
    $db = pg_connect ("host=localhost dbname=kisumu_lpdp user=postgres password=postgres");
    if(!$db) {
       echo 'Not connected';
    } else {
      //sucees 
    } 
?>