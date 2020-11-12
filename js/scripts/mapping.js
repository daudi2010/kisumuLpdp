$(document).ready(function () {
            let parcels = L.layerGroup();
            let buildings = L.layerGroup();
            let roads = L.layerGroup();
            //Hide  Edit divs
            document.getElementById('buildings').style.display = "none";
            document.getElementById('roads').style.display = "none";
            document.getElementById('cadastre').style.display = "none";
            document.getElementById('randomPoint').style.display = "none";

            var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGF2aWRrYSIsImEiOiJjanh5bHp1cWYwYXMwM2Jtdmc4aW1pazBsIn0.EAfNj4ZRn1V5atLW75Cq8A';

            var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });

            let grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
                streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

            //Parcels
            $.ajax({
                url: "getGeoJson.php",
                contentType: "application/json; charset=utf-8",
                cache: false,
                dataType: "json",
                data: {
                },
                responseType: "json",
                success: function (geojson) {
                    L.geoJSON(geojson, {
                        style: function (feature) {
                            lu = feature.properties.landuse;
                            return !lu ? { color: '#a6a6a6', opacity: 0.4, fillColor: '#7a7a52', fillOpacity: 0.4 } : { color: ' #a6a6a6', opacity: 0.4, fillColor: '#264d00', fillOpacity: 0.4 };

                        },
                        onEachFeature: function (feature, layer) {
                            parcels.addLayer(layer);
                            layer.bindPopup("Parcel :" + feature.properties.parcel_id);
                            layer.on('click', function (e) {
                                document.getElementById('randomPoint').style.display = "none";
                                document.getElementById('edit').style.display = "none";
                                document.getElementById('cadastre').style.display = "block";
                                document.getElementById('buildings').style.display = "none";
                                document.getElementById('roads').style.display = "none";
                                document.getElementById('parcel_id').value = layer.feature.properties.parcel_id;

                            });
                        }
                    });

                },
                error: function () {
                    alert('ERROR.');
                },
            });

            // Buildings
            $.ajax({
                url: "getGeoJson_Buildings.php",
                contentType: "application/json; charset=utf-8",
                cache: false,
                dataType: "json",
                data: {
                },
                responseType: "json",
                success: function (geojson) {
                    L.geoJSON(geojson, {
                        style: function (feature) {
                            lx = feature.properties.occupancy;
                            return !lx ? { color: '#8c8c8c', opacity: 0.4, fillColor: '#7a7a52', fillOpacity: 0.4 } : { color: '#8c8c8c', opacity: 0.4, fillColor: '#408000', fillOpacity: 0.4 };

                        },
                        onEachFeature: function (feature, layer) {
                            buildings.addLayer(layer);
                            layer.bindPopup("Building :" + feature.properties.building_id);
                            layer.on('click', function (e) {
                                document.getElementById('randomPoint').style.display = "none";
                                document.getElementById('edit').style.display = "none";
                                document.getElementById('cadastre').style.display = "none";
                                document.getElementById('buildings').style.display = "block";
                                document.getElementById('roads').style.display = "none";
                                document.getElementById('bld_id').value = layer.feature.properties.building_id;

                            });
                        }
                    });

                },
                error: function () {
                    alert('ERROR.');
                },
            });

            // Roads

            $.getJSON("getGeoJson_Roads.php", function (data) {
                L.geoJson(data, {
                    style: function (feature) {

                        sf = feature.properties.surface_type;
                        return !sf ? { color: '#e6ac00', opacity: 0.4, weight: 4 } : { color: '#339933', opacity: 0.4, weight: 5 };

                    },
                    onEachFeature: function (feature, layer) {
                        roads.addLayer(layer);
                        layer.bindPopup("Road :" + feature.properties.rd_id);
                        layer.on('click', function (e) {
                            document.getElementById('randomPoint').style.display = "none";
                            document.getElementById('edit').style.display = "none";
                            document.getElementById('cadastre').style.display = "none";
                            document.getElementById('buildings').style.display = "none";
                            document.getElementById('roads').style.display = "block";
                            document.getElementById('road_id').value = layer.feature.properties.rd_id;
                        });
                        layer.bindPopup(feature.properties.rd_id);

                    }
                });

            });


            var map = L.map('map', {
                center: [-0.1009306, 34.755408],
                zoom: 15,
				//layers: [grayscale, osm, streets, parcels]// showing parcel form on default
                layers: [grayscale, osm, streets]
            });


            let baseMaps = {
                "Grayscale": grayscale,
                "Streets": streets,
                'OSM': osm

            };

            let overlayMaps = {
                "Parcels": parcels,
                "Buildings": buildings,
                "Roads": roads

            };


            L.control.layers(baseMaps, overlayMaps).addTo(map);


            //Add geolocation
            map.on('locationfound', onLocationFound);
            function onLocationFound(e) {
                
                L.marker(e.latlng).addTo(map).on('click', function (e) {
                    $("#cadastre").hide();
                    document.getElementById('cadastre').style.display = "none";
                    document.getElementById('randomPoint').style.display = "block";
                    document.getElementById('edit').style.display = "none";
                    document.getElementById('pt_coord').value = e.latlng;

                });


            }
            map.locate({ setView: true, watch: true, maxZoom: 18 });


        });//doc ready