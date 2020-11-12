  $(document).ready(function () {


            $('#submit_buildings').click(function () {

                //validate inuts
                if ($('#bld_id').val().length < 1) {

                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Click on a Building to get<strong> Building ID</strong>.</div>");
                }

                else if ($('#wallmat').val().length < 1) {
                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Wall Material</strong>.</div>");
                } else if ($('#roofmat').val().length < 1) {

                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Roof Material</strong>.</div>");


                } else if ($('#floors').val().length < 1) {

                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please enter  No of <strong>Floors</strong>.</div>");

                }

                else if ($('#occupancy').val().length < 1) {

                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong> Occupancy</strong>.</div>");

                } else if ($('#typology').val().length < 1) {

                    $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Typology</strong>.</div>");
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: 'UpdateBuildings.php',
                        data: $('#bldform').serialize(),
                        success: function (response) {

                            var jsonData = JSON.parse(response);

                            if (jsonData.success == "1") {

                                $('#bld_error').html("<div class=\"alert alert-success\"><strong>Success!</strong> Building Updated.</div>");
                                $('#bldform :input').attr('value', '');
                                $('#typology').prop('selectedIndex', 0);
                                $('#occupancy').prop('selectedIndex', 0);
                                $('#roofmat').prop('selectedIndex', 0);
                                $('#wallmat').prop('selectedIndex', 0);

                                $('select').prop('selectedIndex', 0);

                                document.getElementById('bldname').value = '';
                                document.getElementById('floors').value = '';
                                document.getElementById('bld_id').value = '';
                            } else {
                                $('#bld_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong>Failed to Update Building info.</div>");
                            }
                        }
                    });
                }

            });


            $('#submit_roads').click(function () {

                //validate inuts
                if ($('#road_id').val().length < 1) {

                    $('#road_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Click on a Road to get <strong>Road ID</strong>.</div>");
                }

                else if ($('#roadname').val().length < 1) {

                    $('#road_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Road Name required.</div>");
                }
                else if ($('#surfacetype').val().length < 1) {
                    $('#road_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Surface Type</strong>.</div>");
                } else if ($('#condition').val().length < 1) {

                    $('#road_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Condition</strong>.</div>");
                } else {

                    $.ajax({
                        type: "POST",
                        url: 'UpdateRoads.php',
                        data: $('#roadform').serialize(),
                        success: function (response) {

                            var jsonData = JSON.parse(response);


                            if (jsonData.success == "1") {

                                $('#road_error').html("<div class=\"alert alert-success\"><strong>Success!</strong> Record Updated.</div>");
                                $('#roadform :input').attr('value', '');
                                $('#surfacetype').prop('selectedIndex', 0);
                                $('#condition').prop('selectedIndex', 0);
                                $('#road_id').attr('value', '');
                                $('#roadname').attr('value', '');
                                document.getElementById('roadname').value = '';
                                document.getElementById('road_id').value = '';
                                $('select').prop('selectedIndex', 0);
                            }
                            else {
                                $('#road_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Updating Road Failed.</div>");
                            }
                        }
                    });

                }
            });


            $('#submit_parcels').click(function () {
               
                //validate inputs
                if ($('#parcel_id').val().length < 1) {

                    $('#parcel_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Click on a Parcel to get <strong>ParcelID</strong>.</div>");
                } else if ($('#p_occupancy').val().length < 1) {
                    $('#parcel_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Occupancy</strong>.</div>");
                } else if ($('#landuse').val().length < 1) {

                    $('#parcel_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Land Use</strong>.</div>");

                } else {

                    $.ajax({
                        type: "POST",
                        url: 'UpdateParcels.php',
                        data: $('#parcelform').serialize(),
                        success: function (response) {
                            var jsonData = JSON.parse(response);


                            if (jsonData.success == "1") {
                                $('#parcel_error').html("<div class=\"alert alert-success\"><strong>Success!</strong> Parcel Updated.</div>");
                                $('#parcelform :input').attr('value', '');
                                $('#landuse').prop('selectedIndex', 0);
                                $('#p_occupancy').prop('selectedIndex', 0);
                                $('input[type="checkbox"]').prop('checked', false);
                                $('input:checkbox').removeAttr('checked');
                                $('#parcel_id').attr('value', '');

                                $('#parcelform :input[type="checkbox"]').prop('checked', false);
                                $('select').prop('selectedIndex', 0);
                                document.getElementById('parcel_id').value = '';
                            }
                            else {
                                $('#parcel_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Parcel Update Failed.</div>");
                            }
                        }
                    });

                }
            });

            //points
            $('#submit_points').click(function () {


                if ($('#pt_coord').val().length < 10) {

                    $('#pt_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Click Once on the Blue Marker to get <strong>Coordinates</strong>.</div>");
                } else if ($('#pt_landuse').val().length < 1) {

                    $('#pt_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Please select <strong>Land Use</strong>.</div>");

                } else {

                    $.ajax({
                        type: "POST",
                        url: 'PointData.php',
                        data: $('#pointform').serialize(),
                        success: function (response) {

                            var jsonData = JSON.parse(response);

                            if (jsonData.success == "1") {
                                $('#pt_error').html("<div class=\"alert alert-success\"><strong>Success!</strong> Point Saved. :)</div>");


                                $('#pt_landuse').prop('selectedIndex', 0);
                                document.getElementById('pt_name').value = '';
                                document.getElementById('pt_coord').value = '';
                            }
                            else {
                                $('#pt_error').html("<div class=\"alert alert-warning\"><strong>Fail!</strong> Point Not Saved. ):</div>");
                            }
                        }
                    });

                }
            });

        
        });