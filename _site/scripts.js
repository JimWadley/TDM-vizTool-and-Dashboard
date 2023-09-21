let globalTemplates = [];

require(["esri/config",
         "esri/Map",
         "esri/views/MapView",
         "esri/Basemap",
         "esri/widgets/BasemapToggle",
         "esri/layers/GeoJSONLayer",
         "esri/widgets/Home",
         "esri/widgets/Search",
         "esri/layers/TileLayer",
         "esri/Graphic",
         "esri/geometry/Point",
         "esri/geometry/Polygon",
         "esri/geometry/Polyline",
         "esri/layers/FeatureLayer",
         "esri/widgets/LayerList",
         "esri/renderers/ClassBreaksRenderer",
         "esri/renderers/UniqueValueRenderer",
         "esri/renderers/SimpleRenderer",
         "esri/widgets/Legend",
         "esri/PopupTemplate",
         "esri/symbols/TextSymbol",
         "esri/rest/support/Query",
         "esri/WebMap"
        ],
function(esriConfig, Map, MapView, Basemap, BasemapToggle, GeoJSONLayer, Home, Search, TileLayer, Graphic, Point, Polygon, Polyline, FeatureLayer, LayerList, ClassBreaksRenderer, UniqueValueRenderer, SimpleRenderer, Legend, PopupTemplate, TextSymbol, Query, WebMap) {

  esriConfig.apiKey = "AAPK5f27bfeca6bb49728b7e12a3bfb8f423zlKckukFK95EWyRa-ie_X31rRIrqzGNoqBH3t3Chvz2aUbTKiDvCPyhvMJumf7Wk";



  async function fetchMenuData() {
    const response = await fetch('config.json');
    const data = await response.json();
    return data;
  }

  async function loadMenuAndItems() {
    const menuJson = await fetchMenuData();
    const menuData = menuJson.map(item => new MenuItem(item));
    
    const calciteMenu = document.querySelector('calcite-menu[slot="content-start"]');

    // Clear existing menu items
    calciteMenu.innerHTML = '';

    // Render each menu item and log (or insert into the DOM)
    menuData.forEach(menuItem => {
      calciteMenu.appendChild(menuItem.createMenuItemElement());
    });
  }

  async function init() {
    const menuStructure = await loadMenuAndItems();
  }

  function populateTemplates() {
    const container = document.getElementById('main'); // Assuming your templates will be children of a div with the id "main".

    globalTemplates.forEach(template => {
        const div = document.createElement('div');
        div.id = template.templateType + 'Template'; 
        div.classList.add('template');
        div.hidden = true;
        div.innerHTML = template.layoutDivs;
        container.appendChild(div);
    });

    document.getElementById('toggleOverlay').addEventListener('click', function() {
      var overlay = document.getElementById('overlay');
      if (overlay.classList.contains('collapsed')) {
        overlay.classList.remove('collapsed');
        this.innerText = 'Collapse';
      } else {
        overlay.classList.add('collapsed');
        this.innerText = 'Expand';
      }
    });

    const map = new Map({
      basemap: "gray-vector" // Basemap layerSegments service
    });
  
    
    const view = new MapView({
      map: map,
      center: [-111.8910, 40.7608], // Longitude, latitude
      zoom: 10, // Zoom level
      container: "mapView" // Div element
    });


    // ADD GEOJSONS
    
    const geojsonSegments = new GeoJSONLayer({
      url: "data/segments.geojson",
      renderer: {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: 'simple-line',
          color: [150, 150, 200],
          width: 1
        }
      }
    });

    map.add(geojsonSegments);
    const geojsonCities = new GeoJSONLayer({
      url: "data/city.geojson",
      renderer: {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color: [0, 0, 0, 0],  // transparent fill
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 4,
            color: [255, 255, 255]
          }
        }
      }
    });
    map.add(geojsonCities);

    const geojsonCitiesWhite = new GeoJSONLayer({
      url: "data/city.geojson",
      renderer: {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color: [0, 0, 0, 0],  // transparent fill
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 1,
            color: [100, 100, 100]
          }
        }
      }
    });  
    map.add(geojsonCitiesWhite);

    // Define the layer selection widget
    const layerList = new LayerList({
      view: view,
      // Optional: Specify the title for the widget
      container: document.createElement('div'),
      // Optional: Expand the widget by default
      listItemCreatedFunction: function(event) {
        const item = event.item;
        item.panel = {
          content: 'legend',
          open: true
        };
      }
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(layerList, {
      position: 'bottom-left'
    });

    // add basemap toggle
    const basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: "arcgis-imagery"
    });
    
    view.ui.add(basemapToggle,"bottom-right");


    // initialize map
    init();
  }

  fetch('templates.json')
  .then(response => response.json())
  .then(data => {
    globalTemplates = data;
    // Optionally, initialize your classes or do other tasks here, 
    // once the data is fetched and assigned.
    populateTemplates();
  })
  .catch(error => {
    console.error("Error fetching templates:", error);
  });

});