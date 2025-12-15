var minZoom = 6;
var maxZoom = 16;

var map = L.map('map', {
    zoomControl: false,
    fullscreenControl: true,
    tap: true,
    preferCanvas: true,
    drawControl: false,
    minZoom: minZoom,
    maxZoom: maxZoom + 1
});

map.createPane('base');
map.createPane('rasters');
map.createPane('polygons');
map.createPane('points');

map.getPane('base').style.zIndex = 100;
map.getPane('rasters').style.zIndex = 400
map.getPane('polygons').style.zIndex = 375;
map.getPane('points').style.zIndex = 600;

var margin = 2;
var corner1 = L.latLng(41.984225 - margin, -124.885486 - margin),
    corner2 = L.latLng(46.321187 + margin, -123.205398 + margin),
    bounds = L.latLngBounds(corner1, corner2);

map.options.maxBounds = bounds;

function home() {
    map.setView(new L.LatLng(bounds.getCenter().lat, bounds.getCenter().lng), minZoom + 1);
};
home();

L.control.zoom({position: "bottomright"}).addTo(map);

L.control.scale({position: 'bottomright'}).addTo(map);

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var pH_climate = L.tileLayer('assets/pH/{z}/{x}/{y}.png', {
	attribution: 'Hauri et al., 2013',
	opacity: 0.95,
	transparent: true,
	format: 'image/png',
	detectRetina: true,
	pane: 'rasters'
});

var legend_pH = L.control({position: 'bottomleft'});
legend_pH.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend-custom');
    div.innerHTML += '<p><b class="legend-title">Change in pH<sup>*</sup></b></p>';
    div.innerHTML += '<p>(modeled, 1995-2025 vs. 2020-2050)</p>';
    div.innerHTML += '<div class="bar-YlOrRd"><div>';
    div.innerHTML += '<div class="row"><div class="col-4 text-left">≥ -0.06</div><div class="col-4"></div><div class="col-4 text-right">≤ -0.08</div><div>';
    div.innerHTML += '<small class="reference"><sup>*</sup>pH measures the acidity of seawater (low pH = more acidic)</small>';
    div.innerHTML += '<br>';
    div.innerHTML += '<small class="reference">Data: <a href="https://www.biogeosciences.net/10/193/2013/bg-10-193-2013.html" target="_blank">Hauri et al., 2013</a></small>';
    return div;
};

var salt_climate = L.tileLayer('assets/salt/{z}/{x}/{y}.png', {
	attribution: 'Hauri et al., 2013',
	opacity: 0.95,
	transparent: true,
	format: 'image/png',
	detectRetina: true,
	pane: 'rasters'
});

var legend_salt = L.control({position: 'bottomleft'});
legend_salt.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend-custom');
    div.innerHTML += '<p><b class="legend-title">Change in salinity (ppt)<sup>*</sup></b></p>';
    div.innerHTML += '<p>(modeled, 1995-2025 vs. 2020-2050)</p>';
    div.innerHTML += '<div class="bar-RdBu"><div>';
    div.innerHTML += '<div class="row"><div class="col-4 text-left">≤ -0.03</div><div class="col-4"></div><div class="col-4 text-right">≥ +0.03</div><div>';
    div.innerHTML += '<small class="reference"><sup>*</sup>Salinity measures how much salt is dissolved in seawater</small>';
    div.innerHTML += '<br>';
    div.innerHTML += '<small class="reference">Data: <a href="https://www.biogeosciences.net/10/193/2013/bg-10-193-2013.html" target="_blank">Hauri et al., 2013</a></small>';
    return div;
};

var temp_climate = L.tileLayer('assets/temp/{z}/{x}/{y}.png', {
	attribution: 'Hauri et al., 2013',
	opacity: 0.95,
	transparent: true,
	format: 'image/png',
	detectRetina: true,
	pane: 'rasters'
});

var legend_temp = L.control({position: 'bottomleft'});
legend_temp.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend-custom');
    div.innerHTML += '<p><b class="legend-title">Change in ocean temperature (°F)<sup>*</sup></b></p>';
    div.innerHTML += '<p>(modeled, 1995-2025 vs. 2020-2050)</p>';
    div.innerHTML += '<div class="bar-RdBu"><div>';
    div.innerHTML += '<div class="row"><div class="col-4 text-left">≤ -0.09</div><div class="col-4"></div><div class="col-4 text-right">≥ +0.09</div><div>';
    div.innerHTML += '<small class="reference"><sup>*</sup>Ocean temperature measures the thermal energy of water molecules</small>';
    div.innerHTML += '<br>';
    div.innerHTML += '<small class="reference">Data: <a href="https://www.biogeosciences.net/10/193/2013/bg-10-193-2013.html" target="_blank">Hauri et al., 2013</a></small>';
    return div;
};

var omega_arag_climate = L.tileLayer('assets/omega_arag/{z}/{x}/{y}.png', {
	attribution: 'Hauri et al., 2013',
	opacity: 0.95,
	transparent: true,
	format: 'image/png',
	detectRetina: true,
	pane: 'rasters'
});

var legend_omega_arag = L.control({position: 'bottomleft'});
legend_omega_arag.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend-custom');
    div.innerHTML += '<p><b class="legend-title">Change in saturation state<sup>*</sup></b></p>';
    div.innerHTML += '<p>(modeled, 1995-2025 vs. 2020-2050)</p>';
    div.innerHTML += '<div class="bar-YlOrRd"><div>';
    div.innerHTML += '<div class="row"><div class="col-4 text-left">≥ -0.19</div><div class="col-4"></div><div class="col-4 text-right">≤ -0.28</div><div>';
    div.innerHTML += '<small class="reference"><sup>*</sup>Aragonite saturation state (Ω<sub>ar</sub>) is a measurement of ocean acidification, indicating if marine organisms\' shells are more likely to form (Ω<sub>ar</sub> > 1) or dissolve (Ω<sub>ar</sub> < 1) in seawater</small>';
    div.innerHTML += '<br>';
    div.innerHTML += '<small class="reference">Data: <a href="https://www.biogeosciences.net/10/193/2013/bg-10-193-2013.html" target="_blank">Hauri et al., 2013</a></small>';
    return div;
};

var pCO2_climate = L.tileLayer('assets/pCO2/{z}/{x}/{y}.png', {
	attribution: 'Hauri et al., 2013',
	opacity: 0.95,
	transparent: true,
	format: 'image/png',
	detectRetina: true,
	pane: 'rasters'
});

var legend_pCO2 = L.control({position: 'bottomleft'});
legend_pCO2.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend-custom');
    div.innerHTML += '<p><b class="legend-title">Change in pCO<sub>2</sub><sup>*</sup> (µatm)</b></p>';
    div.innerHTML += '<p>(modeled, 1995-2025 vs. 2020-2050)</p>';
    div.innerHTML += '<div class="bar-YlOrRd"><div>';
    div.innerHTML += '<div class="row"><div class="col-4 text-left">≤ 66</div><div class="col-4"></div><div class="col-4 text-right">≥ 78</div><div>';
    div.innerHTML += '<small class="reference"><sup>*</sup>pCO<sub>2</sub> measures how much carbon dioxide is dissolved in seawater</small>';
    div.innerHTML += '<br>';
    div.innerHTML += '<small class="reference">Data: <a href="https://www.biogeosciences.net/10/193/2013/bg-10-193-2013.html" target="_blank">Hauri et al., 2013</a></small>';
    return div;
};

var slrRenderingRule = {
  rasterFunction: "Colormap",
  rasterFunctionArguments: {
    Colormap: [
      [1, 0, 112, 255]
    ],
    Raster: "$$"
  },
  outputPixelType: "U8"
};

var slr = L.esri.imageMapLayer({
    url: "https://landscape12.arcgis.com/arcgis/rest/services/US_Sea_Level_Rise_Intermediate_High_2050/ImageServer",
    attribution: "Sweet et al., 2022",
    renderingRule: slrRenderingRule
});

var legend_slr = L.control({ position: 'bottomleft' });

legend_slr.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend-custom');
    var ruleParam = encodeURIComponent(JSON.stringify(slrRenderingRule));
    fetch('https://landscape12.arcgis.com/arcgis/rest/services/US_Sea_Level_Rise_Intermediate_High_2050/ImageServer/legend?f=pjson' + '&renderingRule=' + ruleParam)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (!data.layers || !data.layers.length) { return; }
            var layerLegend = data.layers[0].legend || [];
            layerLegend.forEach(function (item) {
                var img = document.createElement('img');
                img.src = 'data:' + item.contentType + ';base64,' + item.imageData;
                img.width = item.width;
                img.height = item.height;
                var label = document.createElement('p');
                label.style.marginLeft = '8px';
                label.innerHTML = '<b class="legend-title">Change in sea level<sup>*</sup></b>' || '';
                var line = document.createElement('div');
                line.appendChild(img);
                line.appendChild(label);
                div.appendChild(line);
            });
            div.innerHTML += '<p>(modeled, 2050 vs. 2020 baseline)</p>';
            div.innerHTML += '<small class="reference"><sup>*</sup>Inundated areas estimated to be below the future mean higher high water (MHHW) level</small>';
            div.innerHTML += '<br>';
            div.innerHTML += '<small class="reference">Data: <a href="https://earth.gov/sealevel/us/internal_resources/756/noaa-nos-techrpt01-global-regional-SLR-scenarios-US.pdf" target="_blank">Sweet et al., 2022</a></small>';
        })
        .catch(function (err) {
            console.error('Error loading legend', err);
        });
    return div;
};

dc.config.defaultColors(d3.schemePaired);

var container = document.getElementById('concerns-chart').parentElement;
var containerWidth = container.clientWidth / 4;

const month      = d3.utcMonth;
const parseMonth = d3.utcParse("%Y-%m");
const scale      = d3.scaleUtc();
const fmtMonth   = d3.utcFormat("%b %Y");
const fmtYear   = d3.utcFormat("%Y");

var mile_report_layer = d3.csv('assets/coastwatch_reports.csv').then(function(data) {

    var geojsonFeatures = data.map(function(d) {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(d.X), parseFloat(d.Y)]
            },
            properties: {
                "Date and Time": parseMonth(d["z"]),
                "Mile": d["m"],
                "Wrack Line Content": d["w_1"],
                "Concerns": d["c_1"],
                "Modifications": d["m_1"],
                "Natural Changes": d["n_1"],
                "New Development": d["n"],
                "Community Science Activities": d["d_2"],
                "Photos": d["r_1"],
                "# of People": d["o"],
                "Summary": d["s_4"],
                "Protected Status": d["p_3"],
                "CoastWatcher Interview": d["i"],
                "# of Reports": d["n_0"],
                "Other Activities": d["o_2"],
                "Apparent Violations": d["a"],
                "Comments on Human Activities": d["c_5"],
                "Living Wildlife": d["l"],
                "Leg bands, species names, and counts": d["l_1"],
                "Stranded Mammals Description": d["s_3"],
                "Unusual Fish Description": d["u_1"],
                "Other Wrackline Content": d["o_3"],
                "Other Development": d["o_4"],
                "Comments on Modifications": d["c_6"],
                "Other Natural Changes": d["o_5"],
                "Actions and Comments": d["a_4"]
            }
        };
    });

    function remove_bins(source_group) {
        var bins = Array.prototype.slice.call(arguments, 1);
        return {
            all:function () {
                return source_group.all().filter(function(d) {
                    return bins.indexOf(d.key) === -1;
                });
            }
        };
    }

    function remove_empty_bins(source_group) {
        return {
            all:function () {
                return source_group.all().filter(function(d) {
                    return d.value != 0;
                });
            }
        };
    }

    const ndx = crossfilter(geojsonFeatures),
        all = ndx.groupAll(),
        everything = function(d) {return d;},
        everythingDimension = ndx.dimension(everything),
        geomKey = function(d) {return d.geometry;},
        geomDimension = ndx.dimension(geomKey),
        temporalDimension = ndx.dimension(d => month.floor(d.properties["Date and Time"])),
        temporalDimensionGroup = temporalDimension.group().reduceSum(function(d) {
            return parseInt(d.properties["# of Reports"]) || 0;
        }),
        mileDimension = ndx.dimension(function(d) {return parseInt(d.properties["Mile"]);}),
        mileDimensionGroup = mileDimension.group().reduceSum(function(d) {
            return parseInt(d.properties["# of Reports"]) || 0;
        }),
        protectedDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Protected Status"].replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["p_3"][x] || x.toString());
        }, true),
        protectedDimensionGroup = protectedDimension.group(),
        interviewDimension = ndx.dimension(function(d) {
            var attribute = d.properties["CoastWatcher Interview"];
            return (attribute > 0) ? "Yes" : "No";
        }),
        interviewDimensionGroup = interviewDimension.group().reduce(
            function(p, v) {
                const mile = v.properties["Mile"];
                if (!p.miles.has(mile)) {
                    p.miles.add(mile);
                    p.count++;
                }
                return p;
            },
            function(p, v) {
                const mile = v.properties["Mile"];
                if (p.miles.has(mile)) {
                    p.miles.delete(mile);
                    p.count--;
                }
                return p;
            },
            function() {
                return {
                    miles: new Set(),
                    count: 0
                };
            }
        ),
        interviewDimensionGroupWrapped = {
            all: function() {
                return interviewDimensionGroup.all().map(d => ({
                    key: d.key,
                    value: d.value.count
                }));
            }
        },
        wracklineDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Wrack Line Content"].replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["w_1"][x] || x.toString());
        }, true);
        wracklineDimensionGroup = wracklineDimension.group(),
        concernsDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Concerns"].replace("8", "1, 4, 5").replace("9", "1, 5").replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["c_1"][x] || x.toString());
        }, true);
        concernsDimensionGroup = concernsDimension.group(),
        modificationsDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Modifications"].replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["m_1"][x] || x.toString());
        }, true);
        modificationsDimensionGroup = modificationsDimension.group(),
        naturalChangesDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Natural Changes"].replace("7", "2, 4").replace("8", "3, 6").replace("9", "5").replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["n_1"][x] || x.toString());
        }, true);
        naturalChangesDimensionGroup = naturalChangesDimension.group(),
        newDevelopmentDimension = ndx.dimension(function(d) {
            var attribute = d.properties["New Development"].replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["n"][x] || x.toString());
        }, true);
        newDevelopmentDimensionGroup = newDevelopmentDimension.group(),
        communityScienceDimension = ndx.dimension(function(d) {
            var attribute = d.properties["Community Science Activities"].replace("[", "").replace("]", "").split(',');
            attribute = attribute.map(x => x.trim());
            attribute = attribute.filter(x => x);
            return attribute.map(x => codebook["d_2"][x] || x.toString());
        }, true);
        communityScienceDimensionGroup = communityScienceDimension.group(),

        peopleDimension = temporalDimension.group().reduce(
            function(p, v) {
                let dv = v.properties["# of People"];
                if (dv != Infinity && dv != null && dv != -9999) {
                    p.splice(d3.bisectLeft(p, dv), 0, dv);
                }
                return p;
            },
            function(p, v) {
                let dv = v.properties["# of People"];
                if (dv != Infinity && dv != null && dv != -9999) {
                    p.splice(d3.bisectLeft(p, dv), 1);
                }
                return p;
            },
            function() {
                return [];
            }
        );

    function circleStyle(feature) {
        return {
            radius: 10,
            fillColor: 'rgb(1, 97, 108)',
            fillOpacity: 0.5,
            weight: 1,
            opacity: 0.5,
            stroke: true,
            color: 'rgb(202, 240, 244)',
            interactive: true,
        };
    };

    function formatSummaryText(summary) {
        if (!summary) return "";

        const urlRegex = /https?:\/\/[^\s]+/g;

        return summary.replace(urlRegex, function(url) {
            let trimmedUrl = url.replace(/[.?!,;]+$/, '');

            let secureUrl = trimmedUrl.replace(/^http:\/\//, "https://");

            return `<a href="${secureUrl}" target="_blank" rel="noopener noreferrer">${secureUrl}</a>`;
        });
    }

    var activePopup = null;
    var activePopupFeatureId = null;

    var mileReports = L.geoJson({
        type: 'FeatureCollection',
        features: geomDimension.top(Infinity),
    }, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, circleStyle(feature));
        },
        onEachFeature: function(feature, layer) {
            var photos = feature.properties["Photos"]
                .replace(/[\[\]"]/g, '')
                .split(',')
                .map(x => x.trim())
                .filter(x => x)
                .map(x => codebook["r_1"][x] || x.toString());

            let photoHtml = "";
            if (photos.length > 0) {
                let indicators = photos.map((_, index) => `
                    <li data-target="#photoCarousel-${feature.properties["Mile"]}" data-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
                `).join('');

                let carouselItems = photos.map((url, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="https://oregonshores.org/wp-content/uploads${url}" class="d-block w-100 img-fluid" style="max-height: 400px; object-fit: contain;">
                    </div>
                `).join('');

                photoHtml = `
                    <b>Photos:</b>
                    <br>
                    <div id="photoCarousel-${feature.properties["Mile"]}" class="carousel slide" data-ride="carousel" data-interval="3000">
                        <ol class="carousel-indicators">
                            ${indicators}
                        </ol>
                        <div class="carousel-inner">
                            ${carouselItems}
                        </div>
                        <a class="carousel-control-prev" href="#photoCarousel-${feature.properties["Mile"]}" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#photoCarousel-${feature.properties["Mile"]}" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    `;
            } else {
                photoHtml = ``;
            }

            const mile = feature.properties["Mile"];
            const audioUrl = `assets/audio/Mile ${mile} Map Cut FINAL.mp3`;

            var audioHtml = `
                <div class="audio-player mt-2" style="display: none;">
                    <b>CoastWatcher Interview:</b><br>
                    <audio controls style="width: 100%;"
                        onloadeddata="this.parentElement.style.display='block';"
                        onerror="this.parentElement.remove();">
                        <source src="${audioUrl}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;

            let popupContent = `
                <div class="popup-container">
                    <b>Date:</b> ${reformatDateString(feature.properties["Date and Time"])}<br>
                    <b>Mile:</b> ${mile} - ${mile_numbers[mile]}<br>
                    <b>Reports:</b> ${feature.properties["# of Reports"]}<br>
                    ${photoHtml}
                    ${audioHtml}
                    <b>Written Details:</b>
                    <div class="popup-summary">
                        ${feature.properties["Summary"] ? `<b style="font-style: italic;">Summary:</b> ${feature.properties["Summary"]}<br>` : ''}
                        ${feature.properties["Other Activities"] ? `<b style="font-style: italic;">Other Activities:</b> ${feature.properties["Other Activities"]}<br>` : ''}
                        ${feature.properties["Apparent Violations"] ? `<b style="font-style: italic;">Apparent Violations:</b> ${feature.properties["Apparent Violations"]}<br>` : ''}
                        ${feature.properties["Comments on Human Activities"] ? `<b style="font-style: italic;">Comments on Human Activities:</b> ${feature.properties["Comments on Human Activities"]}<br>` : ''}
                        ${feature.properties["Living Wildlife"] ? `<b style="font-style: italic;">Living Wildlife:</b> ${feature.properties["Living Wildlife"]}<br>` : ''}
                        ${feature.properties["Leg bands, species names, and counts"] ? `<b style="font-style: italic;">Leg bands, species names, and counts:</b> ${feature.properties["Leg bands, species names, and counts"]}<br>` : ''}
                        ${feature.properties["Stranded Mammals Description"] ? `<b style="font-style: italic;">Stranded Mammals Description:</b> ${feature.properties["Stranded Mammals Description"]}<br>` : ''}
                        ${feature.properties["Unusual Fish Description"] ? `<b style="font-style: italic;">Unusual Fish Description:</b> ${feature.properties["Unusual Fish Description"]}<br>` : ''}
                        ${feature.properties["Other Wrackline Content"] ? `<b style="font-style: italic;">Other Wrackline Content:</b> ${feature.properties["Other Wrackline Content"]}<br>` : ''}
                        ${feature.properties["Other Development"] ? `<b style="font-style: italic;">Other Development:</b> ${feature.properties["Other Development"]}<br>` : ''}
                        ${feature.properties["Comments on Modifications"] ? `<b style="font-style: italic;">Comments on Modifications:</b> ${feature.properties["Comments on Modifications"]}<br>` : ''}
                        ${feature.properties["Other Natural Changes"] ? `<b style="font-style: italic;">Other Natural Changes:</b> ${feature.properties["Other Natural Changes"]}<br>` : ''}
                        ${feature.properties["Actions and Comments"] ? `<b style="font-style: italic;">Actions and Comments:</b> ${feature.properties["Actions and Comments"]}` : ''}
                    </div>
                </div>
            `;

            layer.on('click', function(e) {
                if (activePopup) {
                    map.closePopup(activePopup);
                    activePopup = null;
                    activePopupFeatureId = null;
                }

                activePopupFeatureId = `${feature.properties["Mile"]}_${feature.properties["Date and Time"]}`;

                activePopup = L.popup({ className: 'feature-popup', maxWidth: "auto" })
                    .setLatLng(e.latlng)
                    .setContent(popupContent)
                    .openOn(map);

                setTimeout(() => {
                    $(`#photoCarousel-${feature.properties["Mile"]}`).carousel({
                        interval: 3000,
                        wrap: true
                    });
                }, 100);
            });

        },
    });
    mileReports.getAttribution = function() { return 'Oregon Shores'; };
    mileReports.addTo(map);

    function getRadius(r) {
        return  r > 1 ? 9 :
                r < 1 ? 5 :
                        7;
    }

    var legendMileReports = L.control({position: 'bottomleft'});

    legendMileReports.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend-custom');
        div.innerHTML += '',
        labels = [],
        labels.push('<i class="fa-border-prop-radius" style="background: rgba(1, 97, 108, 1); width: ' + getRadius(0) * 2 + 'px; height: ' + getRadius(0) * 2 + 'px; border-radius: 50%; margin-top: ' + Math.max(0, (9 - getRadius(0))) + 'px;"></i> CoastWatch mile reports');
        div.innerHTML += labels.join('<br>');
        div.innerHTML += '<br><small class="reference">Data: <a href="https://oregonshores.org/programs-campaigns/coastwatch/" target="_blank">Oregon Shores</a></small>';
        return div;
    };
    legendMileReports.addTo(map);

    var charts_all = [];
    var charts_temporal = [];
    var charts_spatial = [];
    var charts_pie = [];

    const nlp_pairs_data = network_data;
    const network_ndx = crossfilter(nlp_pairs_data);
    const network_mileDimension = network_ndx.dimension(d => d.m);
    const network_temporalDimension = network_ndx.dimension(d => d3.timeMonth(new Date(d.z)));
    const network_temporalDimensionGroup = network_temporalDimension.group().reduceCount();
    const network_mileGroup = network_mileDimension.group().reduceCount();

    const network_filteredData = () => network_mileDimension.top(Infinity);

    function updateGraph(data) {
        d3.select("#network-graph").select("svg").remove();

        const svg = d3.select("#network-graph").append("svg")
            .attr("width", network_graph_width)
            .attr("height", network_graph_height);

        const nodes = {};
        const links = [];

        data.forEach(link => {
            if (!nodes[link.s]) {
                nodes[link.s] = {id: link.s, frequency: link.f};
            }
            if (!nodes[link.t]) {
                nodes[link.t] = {id: link.t, frequency: link.f};
            }
            links.push({source: link.s, target: link.t, value: link.f});
        });

        const nodeArray = Object.values(nodes);

        const simulation = d3.forceSimulation(nodeArray)
            .force("link", d3.forceLink(links).id(d => d.id).distance(network_link_distance))
            .force("charge", d3.forceManyBody().strength(network_body_charge))
            .force("center", d3.forceCenter(network_graph_width / 2, network_graph_height / 2))
            .force("collide", d3.forceCollide().radius(d => Math.sqrt(d.frequency) * 2 + network_collide));

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link");

        link
            .style("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodeArray)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", d => Math.sqrt(d.frequency) * 2)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const labels = svg.append("g")
            .selectAll("text")
            .data(nodeArray)
            .enter()
            .append("text")
            .attr("class", "label")
            .text(d => d.id);

        const margin = 0;

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            labels
                .attr("x", d => d.x + 10)
                .attr("y", d => d.y);
        });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    updateGraph(network_filteredData());

    var brand_colors = [
        'rgb(247, 230, 153)',
        'rgb(186, 130, 196)',
        'rgb(203, 221, 183)',
        'rgb(153, 195, 234)',
        'rgb(243, 217, 104)',
        'rgb(215, 183, 221)',
        'rgb(175, 203, 144)',
        'rgb(202, 224, 244)',
    ];

    var start_date_xaxis = '2006-12-01';

    const mileChartNetwork = dc.barChart("#mile-network-chart");

    mileChartNetwork
        .height(setHeight(window) * two_col_height_scale / 2)
        .width(setWidth(window) * two_col_width_scale / 2)
        .dimension(network_mileDimension)
        .group(network_mileGroup)
        .x(d3.scaleLinear().domain([1, 340.5]))
        .xUnits(dc.units.fp.precision(1))
        .elasticY(true)
        .brushOn(true);
    charts_spatial.push(mileChartNetwork);
    mileChartNetwork.on("filtered", () => {
        syncIndirectFiltersToNetwork();
    });

    const firstDate   = d3.min(geojsonFeatures, d => d.properties["Date and Time"]);
    const lastDate    = d3.max(geojsonFeatures, d => d.properties["Date and Time"]);
    const domainStart = month.floor(firstDate);
    const domainEnd   = month.offset(month.floor(lastDate), 1);

    var temporalChartNetwork = dc.barChart('#temporal-network-chart');
    temporalChartNetwork
        .height(setHeight(window) * two_col_height_scale / 2)
        .width(setWidth(window) * two_col_width_scale / 2)
        .margins({
            top: 10,
            right: 10,
            bottom: 60,
            left: 40
        })
        .dimension(network_temporalDimension)
        .group(network_temporalDimensionGroup)
        .elasticY(true)
        .elasticX(true)
        .brushOn(true)
        .renderHorizontalGridLines(false)
        .x(d3.scaleTime())
        .round(d3.timeMonth.round)
        .xUnits(d3.timeMonth)
        .xAxis()
        .tickFormat(d3.timeFormat("%Y"));
    temporalChartNetwork
        .yAxisLabel('Reports')
        .yAxis()
        .tickFormat(d3.format('d'));
    temporalChartNetwork.on("filtered", () => {
        syncIndirectFiltersToNetwork();
    });
    charts_temporal.push(temporalChartNetwork);

    var temporalChart = dc.barChart('#temporal-chart');
    temporalChart
        .height(setHeight(window) * two_col_height_scale)
        .width(setWidth(window) * two_col_width_scale * line_col_width_scale)
        .margins({
            top: 10,
            right: 10,
            bottom: 60,
            left: 40
        })
        .dimension(temporalDimension)
        .group(temporalDimensionGroup)
        .elasticY(true)
        .brushOn(true)
        .renderHorizontalGridLines(false)
        .x(scale.domain([domainStart, domainEnd]))
        .xUnits(d3.utcMonths)
        .round(month.round)
        .alwaysUseRounding(true)
        .xAxis()
        .tickFormat(fmtYear);
    temporalChart
        .yAxisLabel('Reports')
        .yAxis()
        .ticks(2)
        .tickFormat(d3.format('d'));
    charts_all.push(temporalChart);
    charts_temporal.push(temporalChart);

    var mileChart = dc.barChart('#mile-chart');
    mileChart
        .height(setHeight(window) * two_col_height_scale)
        .width(setWidth(window) * two_col_width_scale * line_col_width_scale)
        .margins({
            top: 10,
            right: 10,
            bottom: 60,
            left: 40
        })
        .dimension(mileDimension)
        .group(mileDimensionGroup)
        .elasticY(true)
        .brushOn(true)
        .x(d3.scaleLinear().domain([1, 340.5]))
        .xUnits(dc.units.integers)
        .yAxisLabel('Reports')
        .yAxis()
        .ticks(3);
    mileChart
        .xAxis()
        .tickFormat(d3.format('d'));
    mileChart
        .yAxis()
        .tickFormat(d3.format('d'));
    charts_all.push(mileChart);
    charts_spatial.push(mileChart);
    
    var interviewChart = dc.pieChart('#interview-chart');
    interviewChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(interviewDimension)
        .group(interviewDimensionGroupWrapped)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.1)
        .externalLabels(true)
        .title(d => "CoastWatcher Interview: " + d.key + "\nMiles: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(containerWidth / 2.5);
    charts_all.push(interviewChart);
    charts_pie.push(interviewChart);

    const shortProtectedLabels = {
        "N/A": "N/A",
        "Marine Reserve": "Reserve",
        "Rocky Shores Managed Area": "Rocky",
    };

    var protectedChart = dc.pieChart('#protected-chart');
    protectedChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(protectedDimension)
        .group(protectedDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortProtectedLabels[d.key] || d.key)
        .title(d => "Protected Status: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(containerWidth / 2.5);
    charts_all.push(protectedChart);
    charts_pie.push(protectedChart);

    const shortWracklineLabels = {
        "Marine debris (plastic, styrofoam, etc. washing in from the sea)": "Marine",
        "Seaweeds and seagrass": "SAV",
        "Small rocks": "Rocks",
        "Animal casings (e.g., crab, shrimp molt)": "Casings",
        "Shells": "Shells",
        "Ocean-based debris (from fishing boats, ship trash, etc.)": "Ocean",
        "Wood pieces": "Wood",
        "Land-based debris (picnics, etc.)": "Land"
    };

    var wracklineChart = dc.pieChart('#wrackline-chart');
    wracklineChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(wracklineDimension)
        .group(wracklineDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortWracklineLabels[d.key] || d.key)
        .title(d => "Wrackline Content: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(containerWidth / 2.5);
    charts_all.push(wracklineChart);
    charts_pie.push(wracklineChart);

    const shortConcernLabels = {
        "Litter": "Litter",
        "Driftwood removal": "Wood",
        "Fire": "Fire",
        "People/dogs/vehicles in closure areas": "Closure",
        "Climbing bluffs/seastacks": "Climb",
        "Kelp/algae collection": "Kelp",
        "Shellfish or invertebrate collection": "Shellfish"
    };

    var concernsChart = dc.pieChart('#concerns-chart');
    concernsChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(concernsDimension)
        .group(concernsDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortConcernLabels[d.key] || d.key)
        .title(d => "Concern: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(containerWidth / 2.5);
    charts_all.push(concernsChart);
    charts_pie.push(concernsChart);

    const shortModificationLabels = {
        "Dune modification/removal": "Dune",
        "Stream modification": "Stream",
        "Sand removal": "Sand",
        "New riprap or shoreline protection structures": "Riprap",
        "Beachgrass planting or removal": "Grass"
    };

    var modificationsChart = dc.pieChart('#modifications-chart');
    modificationsChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(modificationsDimension)
        .group(modificationsDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortModificationLabels[d.key] || d.key)
        .title(d => "Modification: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(containerWidth / 2.5);
    charts_all.push(modificationsChart);
    charts_pie.push(modificationsChart);

    const shortNaturalChangeLabels = {
        "Evidence of wave overtopping": "Waves",
        "Landslides/major boulder falls": "Slides",
        "Major cracks appearing in bluffs": "Cracks",
        "Newly exposed roots/trees falling": "Trees",
        "Visible retreat of solid bluff": "Retreat",
        "Erosion of vegetated foredune": "Erosion",
    };

    var naturalChangesChart = dc.pieChart('#natural-changes-chart');
    naturalChangesChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(naturalChangesDimension)
        .group(naturalChangesDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .title(d => "Natural Change: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(200)
        .externalLabels(true)
        .label(d => shortNaturalChangeLabels[d.key] || d.key);
    charts_all.push(naturalChangesChart);
    charts_pie.push(naturalChangesChart);

    const shortDevelopmentLabels = {
        "Drainage pipes": "Pipes",
        "Bluff development": "Bluff",
        "Steps down bluff": "Steps"
    };

    var newDevelopmentChart = dc.pieChart('#new-development-chart');
    newDevelopmentChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(newDevelopmentDimension)
        .group(newDevelopmentDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortDevelopmentLabels[d.key] || d.key)
        .title(d => "New Development: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(200);
    charts_all.push(newDevelopmentChart);
    charts_pie.push(newDevelopmentChart);

    const shortCommunityScienceLabels = {
        "Stranded Marine Mammal Report": "Mammals",
        "COASST Beached Bird Report": "Birds",
        "Marine Debris Survey": "Debris",
        "MARINe Seastar Survey": "Seastars",
        "Beachgrass Survey": "Grass"
    };

    var communityScienceChart = dc.pieChart('#community-science-chart');
    communityScienceChart
        .height(setHeight(window) * two_col_height_scale / pie_col_height_scale)
        .width(setWidth(window) * two_col_width_scale / pie_col_width_scale)
        .dimension(communityScienceDimension)
        .group(communityScienceDimensionGroup)
        .drawPaths(false)
        .innerRadius(2)
        .minAngleForLabel(0.3)
        .externalLabels(true)
        .label(d => shortCommunityScienceLabels[d.key] || d.key)
        .title(d => "Community Science Activity: " + d.key + "\nReports: " + parseInt(d.value).toLocaleString())
        .externalRadiusPadding(25)
        .ordinalColors(brand_colors)
        .radius(200);
    charts_all.push(communityScienceChart);
    charts_pie.push(communityScienceChart);

    for (const chartA of charts_all) {
        chartA.on('filtered', function(chart, filter) {
            updateMap();
            syncIndirectFiltersToNetwork();
        });
    }

    let broadcasting_temporal = false;
    for (const chartA of charts_temporal) {

        chartA.on('filtered', function(chart, filter) {
          const labelEl = document.getElementById("date-range");

          if (!(filter && filter.length === 2)) {
            labelEl.textContent = "";
            return;
          }

          const toDate = d => d instanceof Date ? d : new Date(d);
          const startDate = month.floor(toDate(filter[0]));
          const endExclusive = month.floor(toDate(filter[1]));
          const endInclusive = month.offset(endExclusive, -1);

          const startStr = fmtUTC(startDate);
          const endStr = fmtUTC(endInclusive);

          labelEl.textContent =
            startStr === endStr
              ? `(s) selected: ${startStr}`
              : `(s) selected: ${startStr} - ${endStr}`;

          if (broadcasting_temporal) return;
          broadcasting_temporal = true;
          for (const chartB of charts_temporal.filter(chartB => chartB !== chartA)) {
            chartB.replaceFilter(filter);
          }
          broadcasting_temporal = false;

          updateMap();
          syncIndirectFiltersToNetwork();
        });
    }

    let broadcasting_spatial = false;
    for (const chartA of charts_spatial) {
        chartA.on('filtered', function(chart, filter) {
            if (filter && filter.length === 2) {
                const startMile = parseInt(filter[0] + 1);
                const endMile = parseInt(filter[1]);
                document.getElementById("mile-range").textContent = `(s) selected: ${startMile} - ${endMile}`;
            } else {
                document.getElementById("mile-range").textContent = "";
            }
            if (broadcasting_spatial) {
                return;
            }
            broadcasting_spatial = true;
            for (const chartB of charts_spatial.filter(chartB => chartB !== chartA)) {
                chartB.replaceFilter(filter);
            }
            broadcasting_spatial = false;
            updateMap();
            syncIndirectFiltersToNetwork();
        });
    }

    function syncIndirectFiltersToNetwork() {
        const filteredData = everythingDimension.top(Infinity);

        if (filteredData.length === 0) {
            network_temporalDimension.filterAll();
            network_mileDimension.filterAll();
            updateGraph([]);
            return;
        }

        const activeDates = filteredData.map(d => new Date(d.properties["Date and Time"]));
        const activeMiles = filteredData.map(d => parseInt(d.properties["Mile"]));

        if (activeDates.length > 0) {
            const minDate = new Date(Math.min(...activeDates));
            const maxDate = new Date(Math.max(...activeDates));
            network_temporalDimension.filterRange([minDate, d3.timeMonth.offset(maxDate, 1)]);
        } else {
            network_temporalDimension.filterAll();
        }

        if (activeMiles.length > 0) {
            const mileSet = new Set(activeMiles);
            network_mileDimension.filterFunction(d => mileSet.has(d));
        } else {
            network_mileDimension.filterAll();
        }

        const updatedData = network_filteredData();

        if (updatedData.length === 0) {
            updateGraph([]);
        } else {
            updateGraph(updatedData);
        }
    }

    dc.renderAll();

    function marineProtectedAreasStyle(feature) {
        return {
            fillColor: 'rgb(128, 77, 1)',
            fillOpacity: 1,
            weight: 1,
            color: 'rgb(29, 33, 48)',
            opacity: 1,
        };
    }

    function marineProtectedAreasHighlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 3,
            opacity: 1,
            fillOpacity: 1
        });
        layer.bringToFront();
        rockyShoreManagedAreas.bringToFront();
        mileReports.bringToFront();
    }

    function marineProtectedAreasZoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function marineProtectedAreasResetHighlight(e) {
        marineProtectedAreas.resetStyle(e.target);
    }

    function marineProtectedAreasOnEachFeature(feature, layer) {
        layer.on({
            mouseover: marineProtectedAreasHighlightFeature,
            click: marineProtectedAreasZoomToFeature,
            mouseout: marineProtectedAreasResetHighlight
        });
        layer.bindTooltip(layer.feature.properties.NAME.toString(), {sticky: true, className: "feature-tooltip"});
    }

    var marineProtectedAreas = L.esri.featureLayer({
        url: 'https://gis.lcd.state.or.us/server/rest/services/Projects/OCMP_SeaSketch_Human/MapServer/58',
        opacity: 0.7,
        style: marineProtectedAreasStyle,
        onEachFeature: marineProtectedAreasOnEachFeature,
        attribution: 'ODFW'
    });

    var marineProtectedAreasLegend = L.control({position: 'bottomleft'});

    marineProtectedAreasLegend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend-custom');
        div.innerHTML += '<i class="fa-border-icon" style="background: rgb(128, 77, 1); opacity: 1;"></i><p><b class="legend-title">Marine reserves</b></p>';
        div.innerHTML += '<small class="reference">Data: <a href="https://oregonmarinereserves.com/" target="_blank">ODFW</a></small>';
        return div;
    };

    function rockyShoreManagedAreasStyle(feature) {
        return {
            fillColor: 'rgb(229, 229, 229)',
            fillOpacity: 1,
            weight: 1,
            color: 'rgb(29, 33, 48)',
            opacity: 1,
        };
    }

    function rockyShoreManagedAreasHighlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 3,
            opacity: 1,
            fillOpacity: 1,
        });
        layer.bringToFront();
        mileReports.bringToFront();
    }

    function rockyShoreManagedAreasZoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function rockyShoreManagedAreasResetHighlight(e) {
        rockyShoreManagedAreas.resetStyle(e.target);
    }

    function rockyShoreManagedAreasOnEachFeature(feature, layer) {
        layer.on({
            mouseover: rockyShoreManagedAreasHighlightFeature,
            click: rockyShoreManagedAreasZoomToFeature,
            mouseout: rockyShoreManagedAreasResetHighlight
        });
        layer.bindTooltip(layer.feature.properties.NAME.toString(), {sticky: true, className: "feature-tooltip"});
    }

    var rockyShoreManagedAreas = L.esri.featureLayer({
        url: 'https://gis.lcd.state.or.us/server/rest/services/Projects/OCMP_SeaSketch_Human/MapServer/59',
        opacity: 0.7,
        style: rockyShoreManagedAreasStyle,
        onEachFeature: rockyShoreManagedAreasOnEachFeature,
        attribution: 'ODFW'
    });

    var rockyShoreManagedAreasLegend = L.control({position: 'bottomleft'});

    rockyShoreManagedAreasLegend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend-custom');
        div.innerHTML += '<i class="fa-border-icon" style="background: rgb(229, 229, 229); opacity: 1;"></i><p><b class="legend-title">Rocky shores</b></p>';
        div.innerHTML += '<small class="reference">Data: <a href="https://www.oregonconservationstrategy.org/oregon-nearshore-strategy/habitats/rocky-intertidal/" target="_blank">ODFW</a></small>';
        return div;
    };

    var base_layers = {
        "Δ Sea level": L.layerGroup([slr]),
        "Δ Ocean temperature": L.layerGroup([temp_climate]),
        "Δ Salinity": L.layerGroup([salt_climate]),
        "Δ pCO<sub>2</sub>": L.layerGroup([pCO2_climate]),
        "Δ pH": L.layerGroup([pH_climate]),
        "Δ Saturation state": L.layerGroup([omega_arag_climate]),
        "Clear climate layers":  L.layerGroup([]).addTo(map)
    };

    var overlay_layers = {
        "CoastWatch mile reports": L.layerGroup([mileReports]).addTo(map),
        "Marine reserves": L.layerGroup([marineProtectedAreas]),
        "Rocky shores": L.layerGroup([rockyShoreManagedAreas]),
        "Satellite base map":  L.layerGroup([Esri_WorldImagery]),
    };

    L.control.layers(base_layers, overlay_layers, {
        position: 'topright',
        collapsed: true
    }).addTo(map);

    map.on('overlayadd', function (eventLayer) {
        if (eventLayer.name === 'CoastWatch mile reports') {
            legendMileReports.addTo(map);
        } else if (eventLayer.name === 'Marine reserves') {
            marineProtectedAreasLegend.addTo(map);
            mileReports.bringToFront();
        } else if (eventLayer.name === 'Rocky shores') {
            rockyShoreManagedAreasLegend.addTo(map);
            mileReports.bringToFront();
        }
    });

    map.on('overlayremove', function(eventLayer) {
        if (eventLayer.name === 'CoastWatch mile reports') {
            map.removeControl(legendMileReports);
            if (activePopup) {
                map.closePopup(activePopup);
                activePopup = null;
                activePopupFeatureId = null;
            }
        } else if (eventLayer.name === 'Marine reserves') {
            map.removeControl(marineProtectedAreasLegend);
        } else if (eventLayer.name === 'Rocky shores') {
            map.removeControl(rockyShoreManagedAreasLegend);
        }
    });

    map.on('baselayerchange', function(eventLayer) {
    if (eventLayer.name === 'Δ Sea level') {
        map.removeControl(legend_pH);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_temp);
        map.removeControl(legend_salt);
        legend_slr.addTo(map);
    } else if (eventLayer.name === 'Δ pH') {
        map.removeControl(legend_slr);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_temp);
        map.removeControl(legend_salt);
        legend_pH.addTo(map);
    } else if (eventLayer.name === 'Δ pCO<sub>2</sub>') {
        map.removeControl(legend_pH);
        map.removeControl(legend_slr);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_temp);
        map.removeControl(legend_salt);
        legend_pCO2.addTo(map);
    } else if (eventLayer.name === 'Δ Saturation state') {
        map.removeControl(legend_pH);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_slr);
        map.removeControl(legend_temp);
        map.removeControl(legend_salt);
        legend_omega_arag.addTo(map);
    }  else if (eventLayer.name === 'Δ Ocean temperature') {
        map.removeControl(legend_pH);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_slr);
        map.removeControl(legend_salt);
        legend_temp.addTo(map);
    }  else if (eventLayer.name === 'Δ Salinity') {
        map.removeControl(legend_pH);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_temp);
        map.removeControl(legend_slr);
        legend_salt.addTo(map);
    }  else if (eventLayer.name === 'Clear climate layers') {
        map.removeControl(legend_slr);
        map.removeControl(legend_pH);
        map.removeControl(legend_pCO2);
        map.removeControl(legend_omega_arag);
        map.removeControl(legend_temp);
        map.removeControl(legend_salt);
    }
});

    function updateMapFilter() {
        const previousData = geomDimension.top(Infinity);

        geomDimension.filter(function(d) {
            return map.getBounds().contains(L.geoJSON(d).getBounds());
        });

        dc.redrawAll();
        mileReports.bringToFront();
    }

    function updateMap() {
        let filteredFeatures = everythingDimension.top(Infinity);

        let filteredIds = new Set(
            filteredFeatures.map(f => `${f.properties["Mile"]}_${f.properties["Date and Time"]}`)
        );

        if (activePopupFeatureId !== null && !filteredIds.has(activePopupFeatureId)) {
            map.closePopup(activePopup);
            activePopup = null;
            activePopupFeatureId = null;
        }

        mileReports.clearLayers();
        mileReports.addData({
            type: 'FeatureCollection',
            features: filteredFeatures
        });
        mileReports.bringToFront();
    }

    map.on('zoomend moveend', function() {
        updateMapFilter();
        updateMap();
        syncIndirectFiltersToNetwork();
        mileReports.bringToFront();
    });

    function showLoader() {
        $("#loader").fadeIn(100);
    }

    function hideLoader() {
         $("#loader").fadeOut(200);
    }

    $('#reset-filters').click(function () {
        showLoader();

        setTimeout(() => {
            setTimeout(() => {
                map.closePopup();
                dc.filterAll();

                network_mileDimension.filterAll();
                network_temporalDimension.filterAll();

                dc.renderAll();

                hideLoader();
            }, 50);
        }, 1000);
    });

    $(document).ready(function() {
        dc.renderAll();
        $('.dc-div').show();
        hideLoader();
        $("#info-modal").modal('show');
        legendMileReports.addTo(map);
    });
});
