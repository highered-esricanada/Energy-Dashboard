require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Polyline",
  "esri/Graphic",
  "esri/rest/support/Query",
  "esri/widgets/Legend",
  "esri/smartMapping/renderers/color",
  "esri/geometry/Polygon",
  "esri/layers/FeatureLayer",
  "esri/smartMapping/symbology/color",

  "esri/core/watchUtils",
  "esri/layers/VectorTileLayer",
  "esri/Color",
  "dojo/NodeList-traverse",
  "dojo/domReady!"
], function(
  Map, SceneView, Polyline, Graphic, Query, Legend, colorRendererCreator, Polygon, FeatureLayer, colorSchemes, watchUtils, VectorTileLayer, Color
) {
  let objectids = [];
  let view2D = true;
  let mainChart = false;
  let detailTab = document.getElementById("details");
  let splitTab = document.getElementById("split");
  let helpTab = document.getElementById("help");
  let currGraphic;
  let currGeometry;
  let dragging = false;
  let highlight = false;
  let lastScenario = false;

  const buildingFeatureLayerURL = "https://services.arcgis.com/As5CFN3ThbQpy8Ph/arcgis/rest/services/UBC6/FeatureServer";
  const locations = {"Prince George":[{"Baseline":"E0"},{"Prevailing Policy":"E7"}, {"Neighbourhood Centre":"E5"}, {"Corridor":"E6"}], "Vancouver":[{"Baseline":"E0"},{"Dispersed":"E3"}, {"Transit-Oriented Development":"E6"}, {"Corridor": "E5"}], "Victoria":[{"Baseline":"E0"},{"Dispersed":"E1"}, {"Neighbourhood Centre":"E2"}, {"Corridor":"E3"}]};
  const coords = {"Prince George":[-122.794179, 53.917129],"Vancouver":[-123.082527, 49.227967],"Victoria":[-123.359565, 48.440955]};
  
  const sym = { 
    type: "simple-line", 
    color: "#0066cc",
    width: "6",
    style: "solid"
  }

  const ProximityLabels  = ["Open Space", "Commercial", "Civic",  "Bike", "Transit"];

  const buildingCategory = {
    2: "New Buildings",
    1: "Shell Retrofit",
    0: "Tech Retrofit"
  };

  const LANDUSE_COLORS = {
    "SFD": 'rgb(255, 248, 165)',
    "SFA": 'rgb(240, 220, 33)',
    "MFL": 'rgb(164, 126, 0)',
    "MFM": 'rgb(176, 173, 0)',
    "MFH": 'rgb(92, 76, 0)',
    "MX": 'rgb(255, 127, 0)',
    "IND": 'rgb(128, 128, 128)',
    "CM": 'rgb(200, 90, 90)',
    "CV": 'rgb(100, 172, 190)',
    "OS": 'rgb(180, 210, 180)'
  };

  const BUILDING_CATEGORY_COLORS = {
    2: 'rgb(176, 176,	232)',
    1: 'rgb(96,	96,	223)',
    0: 'rgb(5, 0, 158)'
  };
  
  const LANDUSE_LOOKUP = {
    "SFD": 'Single Family Detached',
    "SFA": 'Single Family Attached',
    "MFL": 'Multi Family Low Density',
    "MFM": 'Multi Family Medium Density',
    "MFH": 'Multi Family High Density',
    "MX": 'Mixed Use',
    "IND": 'Industrial',
    "CM": 'Commercial',
    "CV": 'Civic',
    "OS": 'Open Space'
  };
  
  const ENERGY = {
    "Heating": 'rgb(230, 150, 150)',
    "Cooling": 'rgb(210, 240, 210)',
    "Equipments": 'rgb(190, 190, 190)',
    "Hot Water": 'rgb(150, 200, 220)',
    "Light": 'rgb(230, 200, 80)'
  }

  const distanceStats = ["d2os", "d2cm", "d2cv", "d2bk", "d2tr"];
  
  const PROXIMITY = {
    "d2os": 'rgb(180, 210, 180)',
    "d2cv": 'rgb(100, 172, 190)',
    "d2cm": 'rgb(200, 90, 90)',
    "d2bk": 'rgb(240, 180, 0)',
    "d2tr": 'rgb(157, 71, 93)'
  }
  
  const PROXIMITYS = {
    "Open": 'rgb(180, 210, 180)',
    "Commercial": 'rgb(200, 90, 90)',
    "Civic": 'rgb(100, 172, 190)',
    "Bike": 'rgb(240, 180, 0)',
    "Transit": 'rgb(157, 71, 93)'
  }

  const PROXIMITYRGB = {
   "d2os":  ["#b5f1bd", "#61c66f", "#288835"],
    "d2cv": ["#eff3ff", "#6baed6", "#08519c"],
    "d2cm": ["#fee5d9", "#fb6a4a", "#a50f15"],
    "d2bk": ["#ffff00", "#a3a300", "#474700"],
    "d2tr": ["#fffcd4", "#ce6065", "#420239"]
  }
  
 
  const MOBILITY = {
    'Walk': 'rgb(180, 210, 180)',
    'Bike': 'rgb(240, 180, 0)', 
    'Transit': 'rgb(150, 172, 190)',  
    'Drive': 'rgb(200, 90, 90)'
  }

  const emissionsStatistics = [
    {
      onStatisticField: "CASE WHEN building_category = 0 THEN ann_emission_t END",  
      outStatisticFieldName: "Tech Retrofit",
      statisticType: "sum"
    },
    {
      onStatisticField: "CASE WHEN building_category = 1 THEN ann_emission_t END",  
      outStatisticFieldName: "Shell Retrofit",
      statisticType: "sum"
    },
    {
      onStatisticField: "CASE WHEN building_category = 2 THEN ann_emission_t END",  
      outStatisticFieldName: "New Buildings",
      statisticType: "sum"
    }
  ];

  const baselineEmissionsStatistics = [
    {
      onStatisticField: "ann_emission_t",  
      outStatisticFieldName: "Emissions",
      statisticType: "sum"
    }
  ];

  const energyStatistics = [
    {
      onStatisticField: "CASE WHEN building_category = 0 THEN tot_GJ END",  
      outStatisticFieldName: "Tech Retrofit",
      statisticType: "sum"
    },
    {
      onStatisticField: "CASE WHEN building_category = 1 THEN tot_GJ END",  
      outStatisticFieldName: "Shell Retrofit",
      statisticType: "sum"
    },
    {
      onStatisticField: "CASE WHEN building_category = 2 THEN tot_GJ END",  
      outStatisticFieldName: "New Buildings",
      statisticType: "sum"
    }
  ];

  const baselineEnergyStatistics = [
    {
      onStatisticField: "tot_GJ",  
      outStatisticFieldName: "Energy",
      statisticType: "sum"
    }
  ];


  const euiStatistics = [{
      onStatisticField: "tot_GJ",
      outStatisticFieldName: "totGJ",
      statisticType: "sum"
  },
  {
    onStatisticField: "eui_kwh",
    outStatisticFieldName: "euiKWH",
    statisticType: "avg"
  },
  {
    onStatisticField: "floor_area",
    outStatisticFieldName: "floorArea",
    statisticType: "sum"
  }];

  const emissionIntensityStatistics = [{
      onStatisticField: "ann_emission_t",
      outStatisticFieldName: "emissions",
      statisticType: "sum"
    },
    {
      onStatisticField: "floor_area",
      outStatisticFieldName: "floorArea",
      statisticType: "sum"
    }
  ];


  const landuseStatistics = [{
    onStatisticField: "floor_area",
    outStatisticFieldName: "floorArea",
    statisticType: "sum"
  }];

  const dwellingMixStatistics = [{
    onStatisticField: "resi_units",
    outStatisticFieldName: "landuse_count",
    statisticType: "sum"
  }];
 
  let featureLayerView = false;

  let uniqueValueInfos = [];
  for(var i in LANDUSE_COLORS){
    uniqueValueInfos.push({value:i, symbol:getSymbol(LANDUSE_COLORS[i]), label:LANDUSE_LOOKUP[i] + " (" + i + ")"});
  }

  let landuseRenderer = {
    
    type: "unique-value",
    field: "landuse",
    uniqueValueInfos: uniqueValueInfos,
    visualVariables: [
      {
        type: "size",
        field: "height",
      }
    ]
  };

  let uniqueValueInfos2 = [];
  for(var i in BUILDING_CATEGORY_COLORS){
    uniqueValueInfos2.push({value:parseInt(i), symbol:getSymbol(BUILDING_CATEGORY_COLORS[i]), label:buildingCategory[i]});
  }

  let buildingCategoryRenderer = {
    
    type: "unique-value",
    field: "building_category",
    uniqueValueInfos: uniqueValueInfos2,
    legendOptions: {
      title: "Building Category"
    },
    visualVariables: [
      {
        type: "size",
        field: "height",
      }
    ]
  };

  let civicRenderer = getBaseRenderer();
  let transitRenderer = getBaseRenderer();
  let commercialRenderer = getBaseRenderer();
  let greenspaceRenderer = getBaseRenderer();
  let bikepaceRenderer = getBaseRenderer();
  let emissionRenderer = getBaseRenderer();
  let energyRenderer = getBaseRenderer();


  function updateRenderer(renderer, expression){

    var scheme = colorSchemes.getSchemeByName({
      geometryType: "polygon",
      theme: "high-to-low",
      worldScale:false,
      name: "Red 5",
      view: this.view1,
      basemapTheme: "light"
    });
        

    var colorParams = {
      layer: this.buildingLayer,
      valueExpression: expression,
      theme: "high-to-low",
      view: this.view1,
      colorScheme : scheme
    }

    colorRendererCreator.createVisualVariable(colorParams).then(function(response){
      
      this[1].visualVariables.push({
        type: "color",
        valueExpression: this[0],
        stops: response.visualVariable.stops
      });
    }.bind([expression, renderer]));
  }

  const transitLineRenderer = {
    type: "simple", 
    symbol: {
      type: "simple-line", 
      color: "#9C4827",
      width: "4px",
      style: "solid",
    }
  };

  initializeScene();

  function checkHelpDialog(){

      if(localStorage.getItem('hideModal') == null || localStorage.getItem('hideModal') == 'false') {
        document.getElementById("helpDialog").classList.remove("invisible");
      }
 
  }

  function initializeScene(){

    initializeSplitView();
    addEventListeners();

    let city = "Vancouver";
    let experiment = "E0"
    let urlExperiment = "Baseline";
    const queryString = window.location.search;   
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('tab') && urlParams.get('tab')=="split"){
        clickSplitTab();
    }
    else{
      checkHelpDialog();
    }


    if(urlParams.has('city')){
      if (urlParams.get('city') =="Victoria") city = "Victoria"
      else if (urlParams.get('city') =="PrinceGeorge") city = "Prince George"
    }

    if(urlParams.has('experiment')){
      urlExperiment = urlParams.get('experiment');
      if (urlExperiment == "Prevailing") urlExperiment = "Prevailing Policy";
      else if (urlExperiment == "Neighbourhood") urlExperiment = "Neighbourhood Centre"
      else if (urlExperiment == "TOD") urlExperiment = "Transit-Oriented Development"
      experiment = getExperiment(urlExperiment, city, false);
    }

    let lng = coords[city][0];
    let lat = coords[city][1];

    const parcelLayer = new FeatureLayer({
      url: "https://services.arcgis.com/As5CFN3ThbQpy8Ph/arcgis/rest/services/ParcelsUBC/FeatureServer",
      title: "Parcels",
      renderer:  {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color: [ 200, 200, 200, 0.5 ],
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 1,
            color: "white"
            }
          }
        }
    });

    function calcBuildingType (feature) {
      let landuseType = "<b>Landuse: </b>" + LANDUSE_LOOKUP[feature.graphic.attributes.landuse]+ "\n";
      if (document.getElementById("growth").value == 'Baseline') return landuseType;
      let buildingType = "New Building";
      if (feature.graphic.attributes.building_category == 0) buildingType = "Tech Retrofit";
      else if (feature.graphic.attributes.building_category == 1) buildingType = "Shell Retrofit";
      return landuseType + "<br/><br/>" +  "<b>Building type: </b>" + buildingType;
    }

    let baseUrl = "https://services.arcgis.com/As5CFN3ThbQpy8Ph/ArcGIS/rest/services/Transit_Bike_WFL1/FeatureServer/";
    let transitUrl = "https://services.arcgis.com/As5CFN3ThbQpy8Ph/arcgis/rest/services/Transit/FeatureServer/1";
    this.transit = new FeatureLayer({ url: transitUrl, visible: false,  definitionExpression:"city = '" + city + "'", title: "Transit Lines", renderer:transitLineRenderer});
    this.bike = new FeatureLayer({ url: baseUrl + 1, visible: false, definitionExpression:"MERGE_SRC = '" + city + "_" + experiment + "'", title: "Bike Routes",});

    this.buildingLayer = new FeatureLayer({
      url: buildingFeatureLayerURL,
      renderer: landuseRenderer,
      title: "Buildings and Parcels",
      popupTemplate: {
        // autocasts as new PopupTemplate()
        title: "",
        content:calcBuildingType
      },
      definitionExpression: "experiment = '" + experiment + "' and city = '" + city + "'"
    });


    let queryPromises = [];

    let query = this.buildingLayer.createQuery();
    query.where = "1=1";
    query.outStatistics = [{
        onStatisticField: "d2tr",  
        outStatisticFieldName: "distance_count",
        statisticType: "count"
      },
      {
        onStatisticField: "resi_units",  
        outStatisticFieldName: "res_units_sum",
        statisticType: "sum"
      },
      {
        onStatisticField: "res_count",  
        outStatisticFieldName: "res_count_sum",
        statisticType: "sum"
      },
    ];
    query.orderByFields = ['city', 'experiment'];
    query.groupByFieldsForStatistics = ['city', 'experiment'];
   
    for (var i in distanceStats){
      dType = distanceStats[i];
      query.outStatistics.push( 
        {
          onStatisticField: "CASE WHEN " + dType + " < 400 THEN res_count ELSE 0 END",  
          outStatisticFieldName: dType,
          statisticType: "sum"
        }
      )    
    }

    queryPromises.push(this.buildingLayer.queryFeatures(query));

    let proxStats = [
      {
        onStatisticField: "landuse",  
        outStatisticFieldName: "landuse_count",
        statisticType: "count"
      },
      {
        onStatisticField: "floor_area",  
        outStatisticFieldName: "floor_area_sum",
        statisticType: "sum"
      },
      {
        onStatisticField: "tot_GJ",  
        outStatisticFieldName: "energy_avg",
        statisticType: "sum"
      },
      {
        onStatisticField: "ann_emission_t", 
        outStatisticFieldName: "emissions_avg",
        statisticType: "sum"
      }
    ]
    
    query = this.buildingLayer.createQuery();
    query.where = "1=1";
    query.outStatistics = proxStats;
    query.orderByFields = ['city', 'experiment', "landuse"];
    query.groupByFieldsForStatistics = ['city', 'experiment', "landuse"];
    queryPromises.push(this.buildingLayer.queryFeatures(query));

    function normalizeStats(data){
      var charts = ['emissions', 'energy', 'landuse'];
      for(var i in data){
        for(var j in charts){
          let numbers = data[i][charts[j]];
          let sum = numbers.reduce((partialSum, a) => partialSum + a, 0);
          let l = numbers.length;
          for (let i = 0; i < l; i++ ) {
              numbers[i] = Math.round( 100*(numbers[i] / sum) );
          }
          data[i][charts[j]] = numbers;
        }
      }
      return data;
    }

    function calcFeatures(features){
      results = [];   
      var stats = {'emissions':[], 'energy':[], 'landuse':[], 'labels':[], 'EmissionsA':[], 'EnergyA':[], 'LanduseA':[]};
      oldCity = "Prince George";
      oldExperiment = "E0";        
      for (var i in features){

        var attributes = features[i].attributes;
        if (oldCity != attributes.city || oldExperiment != attributes.experiment){
          results.push(stats);
          stats = {'emissions':[], 'energy':[], 'landuse':[], 'labels':[], 'EmissionsA':[], 'EnergyA':[], 'LanduseA':[]};
          oldCity = attributes.city;
          oldExperiment = attributes.experiment;
        }
            
        stats['emissions'].push(attributes.emissions_avg);
        stats['energy'].push(attributes.energy_avg);
        stats['landuse'].push(attributes.floor_area_sum);
        stats['EmissionsA'].push(attributes.emissions_avg);
        stats['EnergyA'].push(attributes.energy_avg);
        stats['LanduseA'].push(attributes.floor_area_sum);
        stats['labels'].push(attributes.landuse);

      }
      results.push(stats);
      results = normalizeStats(results)
      return results;
    }

    Promise.all(queryPromises).then((response) => {
      let scenarioTotals = response[0];
      let generalStats = response[1];
      let featuresTop = calcFeatures(generalStats.features);
      lookup = featuresTop;
      let results = [[],[],[],[],[],[],[],[],[],[],[],[]];       
      let features = response[0].features
      
      for (var j in features){
        var attributes = features[j].attributes;
        var scenarioTotal = attributes.res_count_sum;
        for (var i in distanceStats){
          var d = distanceStats[i];
          if (j%4 != 0){
            var index = Math.floor(j/4)*4;
            results[j].push(100*((attributes[d]/scenarioTotal - results[index][i])/(results[index][i])));
          }
          else{
            results[j].push(attributes[d]/scenarioTotal);
          }
        }
      }

      generateSplitView(results, featuresTop, scenarioTotals);
    });

    const vtLayer = new VectorTileLayer(vectorTileMap);

    const map = new Map({
      basemap: "gray-vector",
      layers: [this.buildingLayer, this.transit, this.bike, parcelLayer, vtLayer]
    });

    this.view1 = new SceneView({
      container: "view1Div",
      map: map,
      popup: {
        dockOptions :{
          buttonEnabled: false
        },
        highlightEnabled: false,
        viewModel: {
          includeDefaultActions: false
        }
      },
      camera: {
        position: {
          latitude: lat,
          longitude: lng,
          z: 2500
        },
        tilt: 0
      }
    });

    this.view1.ui.components = [ "attribution" ];

    this.view1.ui.add("resetCamera", "top-right");
    this.view1.ui.add("clearSelection", "top-right");
    let button = document.getElementById("clearSelection");
    button.addEventListener("click", function(e){
      removeSelection();
      performQuery(featureLayerView, false);
    });

    document.getElementById("gotoHub").addEventListener("click", function(e){
      location.href = "https://future-scenarios-for-municipal-climate-action-ubc.hub.arcgis.com/";
    });

    document.getElementById("resetCamera").addEventListener("click", function(e){
      resetCamera(2500);
    });



    this.view1.when(function () {

      if (city != "Vancouver"){
         document.getElementById("city").value = city;
      }
      if (urlExperiment != "Baseline"){
         changeMapLocation(city, urlExperiment);
      }

      legendContainer = document.getElementById("legend");
      new Legend({
        view: this.view1,
        container: legendContainer
      });

    let proximities = ["d2tr", "d2bk", "d2cm", "d2cv", "d2os"];
    let proximityFields = ["d2bus", "d2bike", "d2comm","d2Civ", "d2Open"];
    let proximityTitle = ["transit", "bike paths", "commercial", "civic", "open space"]
    let values = ['> 800', '<= 800', '< 400'];
    let proximityRenderers = [];
    for(var i in proximities){
      let uniqueValueInfos3 = [];
      for(var j in PROXIMITYRGB[proximities[i]]){
        uniqueValueInfos3.push({value:values[j], symbol:getSymbol(PROXIMITYRGB[proximities[i]][j], true), label:values[j]});
      }
    
      proximityRenderers.push({
        
        type: "unique-value",
        valueExpressionTitle: "Distance in metres to " + proximityTitle[i],
        valueExpression: "When($feature." + proximityFields[i] + " <= 400, '< 400', $feature." + proximityFields[i] + " > 400 && $feature." + proximityFields[i] + " <= 800, '<= 800', $feature." + proximityFields[i] + " > 800 || $feature." + proximityFields[i] + " == 0, '> 800', 'other')",
        uniqueValueInfos: uniqueValueInfos3,
        visualVariables: [
          {
            type: "size",
            field: "height",
          }
        ]
      });
    }

    
    transitRenderer = proximityRenderers[0];
    bikepaceRenderer = proximityRenderers[1];
    commercialRenderer = proximityRenderers[2];
    civicRenderer = proximityRenderers[3];
    greenspaceRenderer = proximityRenderers[4];

  

    this.buildingLayer.outFields = ["*"];
    
    this.view1.whenLayerView(this.buildingLayer).then(function (layerView) {

      updateRenderer(emissionRenderer, "$feature.ann_emission_t / Max([1, $feature.floor_area])");
      updateRenderer(energyRenderer, "$feature.eui_kwh * 0.0036");
      view1.on("immediate-click", function(event) {
          //ensure there is no highlight when a building is clicked
          if (document.getElementById("theme").value.indexOf("Intensity") == -1) event.stopPropagation();
       });



      featureLayerView = layerView;

      pausableWatchHandle = watchUtils.pausable(
        layerView,
        "updating",
        async (val) => {
          if (!val) {
            //if (!highlight){
              var theme = document.getElementById("theme").value;
              var where = "1=1";
              if (highlight) where = generateWhere();
              await calcStats(theme, true, where);
            //}
        }});
      
        this.view1.on('pointer-up', [], e => {
          if (dragging){
            if (highlight){
              highlight.remove();
              highlight = false;
            }
            dragging = false;
            
            performQuery(layerView, true);
          }
        });  
      });
    });
    
    this.view1.on('drag', e => {
      if (e.buttons == 2 && view2D){
        e.stopPropagation();
      }
    });

    this.view1.on('drag', ["Alt"], e => {
      e.stopPropagation();
      let p = this.view1.toMap(e);
      if (p){
        if (currGraphic) {
          this.view1.graphics.remove(currGraphic);
        }
        if (e.action === "start") {
          dragging = true;
          currGeometry = new Polyline({
            paths: [
              [p.x, p.y, 0]
            ],
            spatialReference: { wkid: 102100 }
          });
          
          currGraphic = new Graphic({
            geometry: currGeometry,
            symbol: sym
          });
          
        } 
        else {
          currGeometry.paths[0].push([p.x, p.y, 0]);
          currGraphic = new Graphic({
            geometry: currGeometry,
            symbol: sym
          });
          this.view1.graphics.add(currGraphic);
        }
      }
    });  
  }



  function resetCamera(z=false){
    let camera = view1.camera.clone();
    camera.tilt = 0;
    camera.heading = 0;
    if (!z) z = camera.position.z;
    let city = document.getElementById("city").value;
    let coord = coords[city];
    camera.position = {
      latitude: coord[1],
      longitude:coord[0],
      z: z
    }
    view1.camera = camera;
  }

  function addEventListeners(){

    document.getElementById("helpDialog").addEventListener("calciteModalClose", function(){
      let checked = document.getElementById("closeModal").checked;
      localStorage.setItem('hideModal',checked);
    })
    

    let dropdowns = document.getElementsByClassName("dropdownSelect");
    for (let element of dropdowns) {
  
      element.addEventListener("calciteSelectChange", function(a){
        var item = a.currentTarget.selectedOption.value;
        var parent = a.currentTarget.parentNode.innerText;
        filter(item, parent);
      });
    }
  
    let radioGroup = document.querySelectorAll("calcite-radio-group-item");
    for (let element of radioGroup) {
  
      element.addEventListener("click", function(value){
        let val = value.target.outerText;
        if (val == "2D"){
          resetCamera();
          view2D = true;
        }
        else if (val == "3D"){

          let camera = view1.camera.clone();
          camera.tilt = 45;
          let city = document.getElementById("city").value;
          let coord = coords[city];
          camera.position = {
            latitude: coord[1]-0.022,
            longitude:coord[0],
            z: 2500
          }
          view1.camera = camera;

          view2D = false;
        }
      });
    }
    
    let actions = document.getElementsByTagName("calcite-action");
    let counter = 0;
    for (let i in locations){         
      for (let j in locations[i]){
        actions[counter].addEventListener("click", function(a){
          removeSelection();
          let city = this[0];
          let growth = this[1];
          document.getElementById("city").value = city;
          changeMapLocation(city, growth);
          document.getElementById("growth").value = growth;
          clickDetailTab();
        }.bind([i, Object.keys(locations[i][j])[0]])); 
        counter++;                                                                                                                
      }
    }
  
    let yearSlider = document.getElementById("form-controls");
    yearSlider.addEventListener("calciteSliderChange", function(event){
      let city = document.getElementById("city").value;

      if (event.target.value == 2050 && city != "Prince George"){
        event.target.value = 2040;
      }
      else if (event.target.value == 2020){
        removeSelection();
        lastScenario = document.getElementById("growth").value;
        document.getElementById("growth").value = "Baseline";
        setLayerDefinition(city, "E0");
      }
      else if (event.target.value == 2040 || event.target.value == 2050){
        let growth = document.getElementById("growth").value;
        if (growth == "Baseline"){
          if (lastScenario) growth = lastScenario;
          else growth = "Corridor";
          document.getElementById("growth").value = growth;
        }
        let experiment = getExperiment(growth, city, false);
        removeSelection();
        setLayerDefinition(city, experiment);
      }
    });

    splitTab.addEventListener("click", function(){
      clickSplitTab();
    });
  
    detailTab.addEventListener("click", function(){
      clickDetailTab();
    });
  
    helpTab.addEventListener("click", function(){
      detailTab.classList.remove("active");
      splitTab.classList.remove("active");
      helpTab.classList.add("active");
      document.getElementById("splitView").classList.add("invisible");
      document.getElementById("detailsView").classList.add("invisible");
      document.getElementById("helpView").classList.remove("invisible");
    });

  }

  function clickSplitTab(){
    splitTab.classList.add("active");
    detailTab.classList.remove("active");
    helpTab.classList.remove("active");
    document.getElementById("splitView").classList.remove("invisible");
    document.getElementById("detailsView").classList.add("invisible");
    document.getElementById("helpView").classList.add("invisible");
  }

  function clickDetailTab(){
    detailTab.classList.add("active");
    splitTab.classList.remove("active");
    helpTab.classList.remove("active");
    document.getElementById("splitView").classList.add("invisible");
    document.getElementById("detailsView").classList.remove("invisible");
    document.getElementById("helpView").classList.add("invisible");
  }

  function changeGraph(theme, data, labels){
    let units = "";

    let chart = {
      type: 'bar',
      data: {
          labels: labels,
          datasets: data
      },
      options: {
        animation: false,
        plugins: {
          legend: {
              display: false,
              position: 'bottom'
          },
          tooltip: {}    
        },
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        scales: {
          y: {   
            grid: {
              display:false
            }
          },
          x: {
            grid: {
              display:false
            }
          }
        }
      }
    };

    if (theme == "Dwelling Mix"){
      units = "dwellings"
      chart.options.scales.y.title = {text:units, display:true};
    }
    else if (theme == "Land Use"){
      units = "m²"
      chart.options.scales.y.title = {text:units, display:true};
    }
    else if (theme == "Mobility"){
      chart.type = "doughnut";
      chart.options.scales.x.display =  false;
      chart.options.scales.y.display =  false;
      chart.options.plugins.legend.display = true;
      units = "%"
    }
    else if (theme == "Proximity"){
      chart.type = "violin";
      //chart.options.elements = {point:{radius: 6}};
      //chart.options.plugins.tooltip = {enabled: false};
      chart.options.scales.y.title = {text:"Distance (m)", display:true};
      /*chart.options.scales.x.ticks= {
        callback: function(val, index) {
          let distances = ["Open Space", "Commercial", "Public Space",  "Bike", "Transit"];
          return distances[val];
        },
        color: 'black',
      }*/
      chart.options.plugins.legend.display = true;
      units = "";
    }
    else if (theme == "Energy"){
      chart.options.scales.x.stacked=  true;
      chart.options.scales.y.stacked=  true;
      chart.options.plugins.legend.display = true;
      units = "GJ";
      chart.options.scales.y.title = {text:"total GJ", display:true};
    }
    else if (theme == "Emissions"){
      chart.options.scales.x.stacked=  true;
      chart.options.scales.y.stacked=  true;
      chart.options.plugins.legend.display = true;
      units = "tCO2";
      chart.options.scales.y.title = {text:"total tCO2", display:true};
    }
    else if (theme == "Energy Use Intensity"){
      units = data[0].label;
      chart.options.scales.y.title = {text:"average " + units, display:true};
    }
    else if (theme == "Emission Intensity"){
      units = data[0].label;
      chart.options.scales.y.title = {text: "average " + units, display:true};
    }

    if (units != ""){
      chart.options.plugins.tooltip.callbacks =  {
          label: (item) => `${round(item.raw, 3)} ${units}`
      };
    }

    if (mainChart) mainChart.destroy();
    const elem = document.getElementById("proximity");
    mainChart = new Chart(elem, chart);
  }



  function changeSymbology(theme, experiment = "E0"){
    let renderer = landuseRenderer;
    this.bike.visible = false;
    this.transit.visible = false;
    if (theme == "Land Use") theme = theme + " (Floor Area)"; 
    document.getElementById("graphTitle").innerText = theme;
    if (theme == "Proximity"){
      document.getElementById("proximityColour").classList.remove("invisible");
      let colourBy = document.getElementById("colourBy").value;
      if (colourBy == "Proximity to Commercial") renderer = commercialRenderer;
      else if (colourBy == "Proximity to Open Space") renderer = greenspaceRenderer;
      else if (colourBy == "Proximity to Bike Network"){
        renderer = bikepaceRenderer
        this.bike.visible = true;
      } 
      else if (colourBy == "Proximity to Civic") renderer = civicRenderer;
      else if (colourBy == "Proximity to Public Transit"){
         renderer = transitRenderer;
         this.transit.visible = true;
      }
      document.getElementById("legend").classList.remove("invisible");
      document.getElementById("landuseLegend").classList.add("invisible");     
    }
    else if (theme == "Energy Use Intensity"){
      renderer = energyRenderer;
      document.getElementById("legend").classList.remove("invisible");
      document.getElementById("landuseLegend").classList.add("invisible");
      document.getElementById("proximityColour").classList.add("invisible");
    }
    else if (theme == "Emission Intensity"){
      renderer = emissionRenderer;
      document.getElementById("legend").classList.remove("invisible");
      document.getElementById("landuseLegend").classList.add("invisible");
      document.getElementById("proximityColour").classList.add("invisible");
    }
    else if ((experiment != "E0" || document.getElementById("growth").value != "Baseline") && (theme == "Energy" || theme == "Emissions")){
      renderer = buildingCategoryRenderer;
      document.getElementById("legend").classList.remove("invisible");
      document.getElementById("landuseLegend").classList.add("invisible");
      document.getElementById("proximityColour").classList.add("invisible");
    }
    else{
      document.getElementById("legend").classList.add("invisible");
      document.getElementById("landuseLegend").classList.remove("invisible");
      document.getElementById("proximityColour").classList.add("invisible");
      this.bike.visible = false;
      this.transit.visible = false;
    }
    this.buildingLayer.renderer = renderer;
  }

  function filter(item, parent){
    if (parent == "Theme"){
      changeSymbology(item);
    }
    else if (parent == "City"){
      removeSelection();
      lastScenario = false;
      changeMapLocation(item, "Baseline");
    }
    else if (parent == "Growth Scenario"){
      removeSelection();
      changeGrowth(item);
    }
    else if (parent == "Colour By"){
      changeSymbology("Proximity");
    }


  }

  function getExperiment(growth, city, update){
    let options = locations[city];
    let option = "";
    let experiment = "E0";

    for (var i in options){
      let g = Object.keys(options[i])[0];
      //if (g != "Baseline"){
        option += "<calcite-option >" + g + "</calcite-option>";
      //}
      if (g == growth){
        experiment = options[i][g];
      }
    }
    if (update){
      document.getElementById("growth").innerHTML = option;
      if (growth) document.getElementById("growth").value = growth;
      else document.getElementById("growth").value = Object.keys(options[1])[0];
    }
    return experiment;
  }

  
  function removeSelection(){
    if (highlight){
      highlight.remove();
      highlight = false;
    }
    view1.graphics.remove(currGraphic);
    document.getElementById("clearSelection").classList.add("invisible");
  }

  function setLayerDefinition(city, experiment){

    this.buildingLayer.definitionExpression =  "experiment = '" + experiment + "' and city = '" + city + "'";
    this.transit.definitionExpression =  "city = '" + city + "'";
    this.bike.definitionExpression =  "MERGE_SRC = '" + city + "_" + experiment + "'";

    let theme = document.getElementById("theme").value;
    if (theme == "Energy" || theme == "Emissions"){
      changeSymbology(theme, experiment)
    }
    else{
      
    }
  }

  function changeGrowth(growth){
    let city = document.getElementById("city").value;
    let stepSize = 20;
    let value = 2040;
    if (city == "Prince George"){
      stepSize = 49;
      value = 2050;
    }
    if (growth == "Baseline") value = 2020;

    let slider = document.getElementById("form-controls");
    slider.value = value;
    slider.step = stepSize;

    let experiment = getExperiment(growth, city, false);
    setLayerDefinition(city, experiment);
  }

  function updateSlider(city, experiment){
    let slider = document.getElementById("form-controls");
    let stepSize = 20;
    let value = 2020;
    let enableDate = document.getElementById("2040");
    let disableDate = document.getElementById("2050");

    if (city == "Prince George"){
      disableDate = document.getElementById("2040");
      enableDate = document.getElementById("2050");
      stepSize = 49;
      if (experiment && experiment != "E0"){ 
        value = 2050;
      }   
    }
    else if (experiment && experiment != "E0"){
      value = 2040;
    }

    disableDate.classList.add("disabled");
    enableDate.classList.remove("disabled");
    slider.value = value;
    slider.step = stepSize;
  }


  function changeMapLocation(city, growth){
    let coord = coords[city]
    let experiment = getExperiment(growth , city, true);
    setLayerDefinition(city, experiment);
    this.view1.goTo({
      center: [coord[0], coord[1]]},
      {animate:false}
    );
    updateSlider(city, experiment);
  }

  function lookupBuildingIndex(field){

    for (var i in buildingCategory){
      if (buildingCategory[i] == field) return parseInt(i);
    }

  }

  function getColour(field, theme){
    if (theme == "Proximity"){
      return PROXIMITY[field];
    }
    else if (theme == "Emissions" || theme == "Energy"){
      if (document.getElementById("growth").value == "Baseline"){
        return BUILDING_CATEGORY_COLORS[0];
      }
      else return BUILDING_CATEGORY_COLORS[lookupBuildingIndex(field)];
    }
    var colour;
    if (field.indexOf("Heating") != -1){
      colour = ENERGY["Heating"];
    }
    else if (field.indexOf("Cooling") != -1){
      colour = ENERGY["Cooling"];
    }
    else if (field.indexOf("Equipment") != -1){
      colour = ENERGY["Equipment"];
    }
    else if (field.indexOf("Hot Water") != -1){
      colour = ENERGY["Hot Water"];
    }
    else if (field.indexOf("Lighting") != -1){
      colour = ENERGY["Light"];
    }
    return colour;
  }

  function getIndex(object, key){
    let ctr = 0;
    for (var i in object){
      if (i == key) return ctr;
      ctr++
    }
    return -1;

  }
  
  function calcStats(theme, change=false, where){

    let query = featureLayerView.layer.createQuery();
    query.where = where;

    let colourBy = document.getElementById("colourBy").value;
    let prox = "d2os";
    if (colourBy == "Proximity to Commercial") renderer = "d2cm";
    else if (colourBy == "Proximity to Bike Network") prox = "d2bk";
    else if (colourBy == "Proximity to Civic") prox = "d2cv";
    else if (colourBy == "Proximity to Public Transit") prox = "d2tr";

    query.outStatistics = [
      {
        onStatisticField: "resi_units",
        outStatisticFieldName: "res_units_sum",
        statisticType: "sum"
      },
      {
        onStatisticField: "res_count",  
        outStatisticFieldName: "res_count_sum",
        statisticType: "sum"
      },
      {
        onStatisticField: "floor_area",  
        outStatisticFieldName: "floor_area_sum",
        statisticType: "sum"
      },
      {
        onStatisticField: prox,  
        outStatisticFieldName: "proximity_avg",
        statisticType: "avg"
      },
      {
        onStatisticField: "CASE WHEN " + prox + " < 400 THEN res_count ELSE 0 END",  
        outStatisticFieldName: "proximity",
        statisticType: "sum"
      },
      {
        onStatisticField: "ann_emission_t",  
        outStatisticFieldName: "emissions_total",
        statisticType: "sum"
      },
      {
        onStatisticField: "tot_GJ",  
        outStatisticFieldName: "energy_total",
        statisticType: "sum"
      }
      
      
    ];
    query.orderByFields = ['landuse'];
    query.groupByFieldsForStatistics = ['landuse'];
    featureLayerView.queryFeatures(query).then(function(response){
      let residentCount = 0;
      let dwellingCount = 0;
      let nonres = 0;
      let res = 0;
      let residentProximity = 0;
      let avgDistance = 0;
      let energyTotal = 0;
      let emissionsTotal = 0;
      for(var i in response.features){
        residentCount += response.features[i].attributes.res_count_sum;
        dwellingCount += response.features[i].attributes.res_units_sum;
        avgDistance += response.features[i].attributes.proximity_avg;
        residentProximity += response.features[i].attributes.proximity;
        energyTotal += response.features[i].attributes.energy_total;
        emissionsTotal += response.features[i].attributes.emissions_total;
        let landuse = response.features[i].attributes.landuse;
        if (landuse == "IND" || landuse == "CM" || landuse == "CV" || landuse == "OS"){
          nonres += response.features[i].attributes.floor_area_sum;
        }
        else{
          res += response.features[i].attributes.floor_area_sum;
        }
      }

      residentDivisor = residentCount;
      if (residentCount == 0) residentDivisor = 1;

      avgDistance = avgDistance/response.features.length;
      Math.round(response.features[0].attributes.res_count_sum)
      let dwellingsHeading = document.getElementById('dwellingsHeading');
      let residentsHeading = document.getElementById('residentsHeading');
      let areaHeading = document.getElementById('areaHeading');
      let areaIcon = document.getElementById('areaIcon');
      let area2Heading = document.getElementById('area2Heading');
      let area2Icon = document.getElementById('area2Icon');
      residentsHeading.innerHTML = "<b>" + Math.round(residentCount) + " residents</b>";
      dwellingsHeading.innerHTML = "<b>" + dwellingCount + " dwellings</b>";
      
      document.getElementById("Smoke").classList.add("invisible");
      document.getElementById("Smoke2").classList.add("invisible");
      document.getElementById("areaIcon").classList.remove("invisible");
      document.getElementById("area2Icon").classList.remove("invisible");
      if (theme == "Dwelling Mix"){
        let diversity = 0;

        for(var i in response.features){
          let landuse = response.features[i].attributes.landuse;
          if (landuse != "IND" && landuse != "CM" && landuse != "CV" && landuse != "OS"){
            let p = response.features[i].attributes.res_units_sum / dwellingCount;
            diversity += (p * Math.log(p));
          }
        } 
        areaHeading.innerHTML = "Residential floor area:<br/><b>" + Math.round(res) + " m²</b>";
        areaIcon.icon = "measure-area"
        area2Heading.innerHTML = "Diversity index:<br/><b>" + Math.round(-diversity * 1000) / 1000 + "</b>";
        area2Icon.icon = "multiple-variables";

      }
      else if (theme == "Proximity"){
        areaHeading.innerHTML = "Residents within 400m:<br/><b>" + Math.round(100*(residentProximity/residentDivisor)) + "%</b>";
        areaIcon.icon = "percent";
        area2Heading.innerHTML = "Average distance:<br/><b>" +  Math.round(avgDistance) + " m</b>";
        area2Icon.icon = "x-bar";
      }
      else if(theme == "Energy" || theme == "Energy Use Intensity"){
        areaHeading.innerHTML = "Total Energy:<br/><b>" + Math.round(energyTotal) + " GJ per year</b>";
        areaIcon.icon = "lightbulb";
        area2Heading.innerHTML = "Per Capita<br/><b>" + Math.round(energyTotal/residentDivisor) + " GJ/person per year</b>";
        area2Icon.icon = "lightbulb";
      }
      else if (theme == "Emissions" || theme == "Emission Intensity"){
        areaHeading.innerHTML = "Total Emissions:<br/><b>"  + Math.round(emissionsTotal) + " tCO2 per year</b>";
        document.getElementById("Smoke").classList.remove("invisible");
        document.getElementById("Smoke2").classList.remove("invisible");
        document.getElementById("areaIcon").classList.add("invisible");
        document.getElementById("area2Icon").classList.add("invisible");
        area2Heading.innerHTML = "Per Capita:<br/><b>" + round(emissionsTotal/residentDivisor, 2) + " tCO2/person per year</b>";
      }
      else{
        areaHeading.innerHTML = "Residential floor area:<br/><b>" + Math.round(res) + " m²</b>";
        areaIcon.icon = "locator";
        area2Heading.innerHTML = "Non-residential floor area:<br/><b>" + Math.round(nonres) + " m²</b>";
        area2Icon.icon = "urban-model";
      }
    });

    let fields = ["landuse"];

    let statDefinitions = fields.map(function(fieldName) {
      return {
        onStatisticField: fieldName,
        outStatisticFieldName: fieldName + "_count",
        statisticType: "count"
      };
    });

    fields = ["d2os", "d2cm", "d2cv", "d2bk", "d2tr"];
    
    if (theme == "Land Use"){
      statDefinitions = landuseStatistics;
    }
    else if (theme == "Dwelling Mix"){
      statDefinitions = dwellingMixStatistics;
    }
    else if (theme == "Energy"){
      statDefinitions = energyStatistics;
      if (document.getElementById("growth").value == "Baseline"){
        statDefinitions = baselineEnergyStatistics
      }
    }
    else if (theme == "Energy Use Intensity"){
      statDefinitions = euiStatistics;
    }
    else if (theme == "Emissions"){
      statDefinitions = emissionsStatistics;
      if (document.getElementById("growth").value == "Baseline"){
        statDefinitions = baselineEmissionsStatistics
      }
    }
    else if ( theme == "Emission Intensity"){
      statDefinitions = emissionIntensityStatistics;
    }
    else if (theme == "Mobility"){
      statDefinitions = [{
        onStatisticField: "walk",
        outStatisticFieldName: "walk_avg",
        statisticType: "avg"
      },
      {
        onStatisticField: "bike",
        outStatisticFieldName: "bike_avg",
        statisticType: "avg"
      },
      {
        onStatisticField: "transit",
        outStatisticFieldName: "transit_avg",
        statisticType: "avg"
      },
      {
        onStatisticField: "drive",
        outStatisticFieldName: "drive_avg",
        statisticType: "avg"
      }];
    }

    

    let query2 = featureLayerView.layer.createQuery();


    if (theme == "Land Use" || theme == "Energy" || theme == "Emissions" || theme == "Dwelling Mix" || theme == "Energy Use Intensity" || theme == "Emission Intensity"){
      query2.groupByFieldsForStatistics = [ "landuse" ];
      query2.orderByFields = [ "landuse" ];
      query2.outStatistics = statDefinitions;
    }
    else if (theme == "Proximity"){
      query2.outFields = fields;      
    }
    else{
      query2.groupByFieldsForStatistics = [];
      query2.outStatistics = statDefinitions;
    }
    

    
    query2.where = where;
    

    return featureLayerView.queryFeatures(query2).then(function(response) {
      //const stats = response.features[0].attributes;
      let labels = [];
      let labels2 = fields;
      let landuseTypes = {"SFD":0,"SFA":0,"MFL":0,"MFM":0,"MX":0,"IND":0,"CM":0,"CV":0};
      let data = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
      let units = "GJ";
      if (theme == "Proximity"){
        data = [[],[],[],[],[]];
        labels = fields;

      }
      else if (theme == "Land Use" || theme == "Dwelling Mix"){
        data = [];
        if (theme == "Dwelling Mix"){
          landuseTypes = { "SFD":0,"SFA":0,"MFL":0, "MFM":0,"MX":0};
        }
        
      }
      else if (theme == "Energy" || theme == "Emissions"){
         labels = ["SFD", "SFA", "MFL", "MFM", "MX", "IND", "CM", "CV"];
         labels2 = ["Tech Retrofit", "Shell Retrofit", "New Buildings"];
         if (document.getElementById("growth").value == "Baseline"){
          labels2 = ["Energy"];
        }
      }
      else if (theme == "Energy Use Intensity" || theme == "Emission Intensity"){
        labels = ["SFD", "SFA", "MFL", "MFM", "MX", "IND", "CM", "CV"];
        data = [0,0,0,0,0,0,0,0];
      }
      for(var i in response.features){
        if (theme == "Energy" || theme == "Emissions"){
          let index =  getIndex(landuseTypes, response.features[i].attributes.landuse);

          for (var j in statDefinitions){
            data[j][index] = round(response.features[i].attributes[statDefinitions[j].outStatisticFieldName],0);
            labels2[j] = statDefinitions[j].outStatisticFieldName;
          }
        }
        else if (theme == "Energy Use Intensity"){
          let index =  getIndex(landuseTypes, response.features[i].attributes.landuse);
          data[index] = response.features[i].attributes.totGJ / response.features[i].attributes.floorArea;
          units = "GJ / m²";
        }
        else if (theme == "Emission Intensity"){
          let index =  getIndex(landuseTypes, response.features[i].attributes.landuse);
          data[index] = response.features[i].attributes.emissions / response.features[i].attributes.floorArea;
          units = "tCO2 / m²";
        }
        else if (theme == "Proximity"){
          data[0].push(response.features[i].attributes.d2os);
          data[1].push(response.features[i].attributes.d2cm);
          data[2].push(response.features[i].attributes.d2cv);
          data[3].push(response.features[i].attributes.d2bk);
          data[4].push(response.features[i].attributes.d2tr);
        }
        else if (theme == "Land Use"){
          landuseTypes[response.features[i].attributes.landuse] = round(response.features[i].attributes.floorArea, 0);
        }
        else if (theme == "Dwelling Mix"){
          if (!(response.features[i].attributes.landuse in {"IND":1,"CM":1,"CV":1,"OS":1})){
            landuseTypes[response.features[i].attributes.landuse] = response.features[i].attributes.landuse_count;
          }
        }
        else if (theme == "Mobility"){
          data = [];
          data.push(round(response.features[i].attributes.walk_avg*100,0));
          labels.push("Walk");
          data.push(round(response.features[i].attributes.transit_avg*100,0));
          labels.push("Transit");
          data.push(round(response.features[i].attributes.drive_avg*100,0));
          labels.push("Drive");
          data.push(round(response.features[i].attributes.bike_avg*100,0));
          labels.push("Bike");
        }
      }
            
      let dataset = [];
      if (theme == "Land Use" || theme == "Dwelling Mix"){
        backgroundColors = [];
        for (var i in landuseTypes){
          data.push(landuseTypes[i]);
          labels.push(i);
        }

        for (var i in labels){
          backgroundColors.push(LANDUSE_COLORS[labels[i]]);
        }

        dataset = [{
          fill: 'origin',
          label: labels[i],
          data: data,
          backgroundColor: backgroundColors,
        }];
      }
      else if (theme == "Mobility"){
        backgroundColors = [];
        for (var i in labels){
          backgroundColors.push(MOBILITY[labels[i]]);
        }
        dataset = [{
          label: labels,
          data: data,
          backgroundColor: backgroundColors,
        }];

      }
      else if (theme == "Energy Use Intensity" || theme == "Emission Intensity"){
       
        dataset = [{
          fill: 'origin',
          label: units,
          data: data,
          backgroundColor: ["rgb(200, 90, 90)"],
        }];
      }
      else{
        
        for (var i in labels2){
          let xyData = data[i];
          if (theme == "Proximity"){
            xyData = [xyData]
            labels = ["Proximity to:"]
            dataset.push(
              {
                label: ProximityLabels[i],
                data: xyData,
                backgroundColor: getColour(labels2[i], theme),
                borderColor: 'rgb(180, 210, 180, 0)'
              }
            )
          }
          else{
            dataset.push(
              {
                label: labels2[i],
                data: xyData,
                backgroundColor: getColour(labels2[i], theme),
                borderColor: 'rgb(180, 210, 180, 0)'
              }
            )
          }
        }
      }
      
      if (!change){
        updateGraph(mainChart, dataset, labels, theme);
      } 
      else{
        changeGraph(theme, dataset, labels);
      }
    });    
  }

  function getRGBValues(colours){
    colours = colours.replace("rgb(", "");
    colours = colours.replace(")", "");
    coloursArray = colours.split(",")
    return coloursArray;
  }

  function initializeSplitView(){
    let parentNode = document.getElementById("expCards");
    let card = "";
    let ctr = 0;
    for (let i in locations){         
      for (let j in locations[i]){
          ctr++;
          card += "<calcite-card> \
            <calcite-panel style='height: 40px;border-bottom: 1px solid;' heading='" + i + " (" + Object.keys(locations[i][j]) + ")'' height-scale='s' intl-close='Close'> \
              <calcite-action \
                id='actionButton" + ctr + "' \
                text='Action'  \
                label='Action' \
                slot='header-actions-end' \
                icon='launch' \
                appearance='solid' \
                scale='s' \
              ></calcite-action> \
            </calcite-panel> \
              <div class='stacked-left' > \
                <div class='thumbnail' > \
                <img id='densityMap" + ctr + "' class='experimentThumbnail' src='img/png/" + i + "_" + Object.keys(locations[i][j])  + ".png'/> \
                </div> \
                <h6 class='residents'>residents</h6> \
                <h6 class='dwellings'>dwellings</h6> \
              </div> \
              <div class='stacked'> \
                <div class='chart-container-card'><canvas class='sideBar'></canvas></div> \
                <div class='chart-container-card'><canvas  class='lower' height=60px></canvas></div> \
              </div> \
              <calcite-tooltip label='scenario' reference-element='actionButton" + ctr + "' placement='left-trailing'>Explore the data of this scenario</calcite-tooltip>\
              <calcite-tooltip label='scenario' reference-element='densityMap" + ctr + "' placement='left-trailing'>Distribution of new buildings within this scenario</calcite-tooltip> \
            </calcite-card>"
      }
    }
    parentNode.innerHTML = card;
    
  }

  function getBaseRenderer(){
    return {
      type: "simple", 
      symbol: {
        type: "polygon-3d", 
        symbolLayers: [
          {
            type: "extrude", 
            
            edges: {
              type: "solid", 
              color: [255, 255, 255, 0.5],
              size: 2
            }
          }
        ]
      },
      visualVariables: [
        {
          type: "size",
          field: "height",
        }
        
      ]
    }
  }


  function getSymbol(colourString, hex=false) {
    if (!hex) colour = getRGBValues(colourString);
    else colour = Color.fromHex(colourString);
    return {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "extrude",
          material: {
            color: colour
          },
          edges: {
            type: "solid", 
            color: [255, 255, 255, 0.5],
            size: 2
          }
        }
      ]
    };
  }


  let lookup = false;

  function lookupItem(val, label, index){
    let units = " m²";
    if (label == "Energy"){
      units = " GJ"
    }
    else if (label == "Emissions"){
      units = " tCO2"
    }

    let arr = lookup[index][label.toLowerCase()];
    for (var i in arr){
      if (arr[i] == val) return round(lookup[index][label + "A"][i], 2) + units;
    }
    return "";
  }

  function generateSplitView( data, dataSide, scenarioTotals){
    const labels = [ "Open", "Comm.", "Civic", "Bike", "Transit"];

    let dwellings = document.getElementsByClassName('dwellings');
    let residents = document.getElementsByClassName('residents');
    for(var i = 0; i < dwellings.length; i++){
      residents[i].innerHTML = Math.round(scenarioTotals.features[i].attributes.res_count_sum) + " residents";
      dwellings[i].innerHTML = scenarioTotals.features[i].attributes.res_units_sum + " dwellings";
    }

    backgroundColors = [];
    for (var i in PROXIMITYS){
      backgroundColors.push(PROXIMITYS[i]);
    }

    
    let minmax = [[Infinity, -Infinity],[Infinity, -Infinity],[Infinity, -Infinity]];

    for (var i in data){
      let index = Math.floor(i/4);
      let min = Math.min(...data[i]);
      let max = Math.max(...data[i]);
      if (min < minmax[index][0]) minmax[index][0] = min;
      if (max > minmax[index][1]) minmax[index][1] = max;
    }

    let elems = document.getElementsByClassName('lower');
    Chart.register({
      id: 'p1',
      beforeDraw: function(chart) {
        if (typeof chart.config.options.lineAt != 'undefined') {
          var lineAt = chart.config.options.lineAt;
          var ctxPlugin = chart.ctx;
          var xAxe = chart.scales['x'];
          var yAxe = chart.scales['y'];
          
          ctxPlugin.strokeStyle = "red";
          ctxPlugin.beginPath();
          lineAt = (lineAt - yAxe.min) * (100 / (yAxe.max - yAxe.min));
          lineAt = (100 - lineAt) / 100 * (yAxe.height) + yAxe.top;
          ctxPlugin.moveTo(xAxe.left, lineAt);
          ctxPlugin.lineTo(xAxe.right, lineAt);
          ctxPlugin.stroke();
        }
      }
    });
    for (var ctx = 0; ctx < elems.length; ctx++){
      let title = "Change from baseline:"
      let chartdata = data[ctx]
      if (ctx%4 == 0){
        title = "% of residents within 400m of:";
        chartdata = [0,0,0,0,0];
      }
     
        let index = Math.floor(ctx/4);
        new Chart(elems[ctx], {
          type: 'bar',
          data: {
          labels: labels,
          datasets: [{
            data: chartdata,
            backgroundColor: backgroundColors
          }]
        },
        options: {
          lineAt:0,
          animation: false,
          plugins: {
            title: {
              "text":title,
              "display": true
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
              label: function(item) {
                  return `${item.formattedValue}%`
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min:minmax[index][0],
              max:minmax[index][1],
              ticks: {
                stepSize: 0.1
              },
                grid:{
                
                  color: function(context) {
                    
                    if (context.tick.value == 0) {
                      return 'cccccc';
                    }

                    return '#ffffff';
                  },
                }
            },
            
            x: {
              gridLines: {
                zeroLineWidth: 3,
                zeroLineColor: "#2C292E",
              },
              display: true,
              grid: {
                display:false

              }
            }
          }
        }});
      
    }

    elems = document.getElementsByClassName('sideBar');
    let ctr = 0
    for (var ctx in elems){
      if (ctr < 12){
        let chartData = dataSide[ctr];
        let datasets = [];

        for (var i in chartData.labels){
          datasets.push(
            {
              label: chartData.labels[i],
              data: [chartData.landuse[i], chartData.energy[i], chartData.emissions[i]],
              backgroundColor: LANDUSE_COLORS[chartData.labels[i]],
            }
          )
        }

        new Chart(elems[ctx], {
            type: 'bar',
            data: {
                labels: ["Landuse", "Energy", "Emissions"],
                datasets: datasets
            },
            options: {
              
              animation: false,
              plugins: {
                legend: {
                    display: false,
                },      
                tooltip: {
                  callbacks: {
                  label: function(item){
                      return `${item.formattedValue}% ${item.dataset.label} (${lookupItem(item.raw, item.label, this.valueOf())})`
                    }.bind(ctx)
                  }
                }
              },
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                intersect: false,
              },
              scales: {
                y: {
                  stacked: true,
                  grid: {
                    display:false
                  }
                },
                
                x: {
                  max:100,
                  display: false,
                  stacked: true,
                  grid: {
                    display:false
                  }
                }
              }
            }
        });
        ctr++;  
      }
    }
  }

  function round(value, decimals) {
    if (value < 0.5 && decimals < 1){
      return Number(Math.round(value+'e'+1)+'e-'+1);
    }
    else return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
   

  }

  function updateGraph(chart, dataset, labels, theme){
    if (theme == "Land Use" || theme == "Dwelling Mix"){
      for (var i in chart.data.datasets[0].data){
        chart.data.datasets[0].data[i] = 0;
      }
      data = new Array(labels.length);

      for (var index = 0; index < labels.length; index++){
        var pos = chart.data.labels.indexOf(labels[index]);
        chart.data.datasets[0].data[pos] =  dataset[0].data[index];
      }

    }
    if (theme == "Proximity"){
      for (var i in chart.data.datasets){
        chart.data.datasets[i].data = dataset[i].data;
      }
    }
    else{
      let l = chart.data.labels.length;
      for (var i in chart.data.datasets){
        chart.data.datasets[i].data = new Array(l).fill(0);
      }
      
      for (var index = 0; index < labels.length; index++){
        var pos = chart.data.labels.indexOf(labels[index]);
        for (var i in chart.data.datasets){
          chart.data.datasets[i].data[pos] = dataset[i].data[index];
        }
      }
    }
    chart.update();
  }

  function generateWhere(){
    let where = "OBJECTID_1 in (";
    for(var i in objectids){
      where += objectids[i] + ",";
    }
    where = where.slice(0, -1);
    where += ")";
    return where;
  }
  
  function performQuery(layerView, geometry){
    var query = new Query({         
    });
    if (geometry){
      var polygonJson = {"rings":[currGeometry.paths[0]],"spatialReference":{"wkid":102100 }};
      var poly = new Polygon(polygonJson);
      query.geometry = poly;  // the point location of the pointer
      query.spatialRelationship = "intersects";
    }
    else{
      query.where = "1 = 1"
    }
    query.outFields =  ["OBJECTID_1"];
    layerView.queryFeatures(query).then(function(result) {
      if (result.features.length == 0){
        removeSelection();
        performQuery(featureLayerView, false);
        return;
      }

      objectids = [];
      
      for (var i in result.features){
        objectids.push(result.features[i].attributes.OBJECTID_1);
      }
      let where = "1=1"
      if (geometry){
        highlight = layerView.highlight(objectids); 
        document.getElementById("clearSelection").classList.remove("invisible");
        where = generateWhere();
      }
      let theme = document.getElementById("theme").value;

      calcStats(theme, false, where);    
    });
  }

});