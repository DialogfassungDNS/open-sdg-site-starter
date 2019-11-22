/**
 * TODO:
 * Integrate with high-contrast switcher.
 */
(function($, L, chroma, window, document, undefined) {

  // Create the defaults once
  var defaults = {

    // Options for using tile imagery with leaflet.
    tileURL: '[replace me]',
    tileOptions: {
      id: '[relace me]',
      accessToken: '[replace me]',
      attribution: '[replace me]',
    },
    // Zoom limits.
    minZoom: 5,
    maxZoom: 15,
    // Visual/choropleth considerations.
    colorRange: chroma.brewer.BuGn,
    noValueColor: '#f0f0f0',
    styleNormal: {
      weight: 1,
      opacity: 1,
      color: '#888',
      fillOpacity: 0.7
    },
    styleHighlighted: {
      weight: 1,
      opacity: 1,
      color: '#111',
      fillOpacity: 0.7
    },
    styleStatic: {
      weight: 2,
      opacity: 1,
      fillOpacity: 0,
      color: '#172d44',
      dashArray: '5,5',
    },
  };

  // Defaults for each map layer.
  var mapLayerDefaults = {
    min_zoom: 0,
    max_zoom: 10,
    serviceUrl: '[replace me]',
    nameProperty: '[replace me]',
    idProperty: '[replace me]',
    staticBorders: false,
  };

  function Plugin(element, options) {

    this.element = element;
    this.options = $.extend(true, {}, defaults, options.mapOptions);
    this.mapLayers = [];
    this.geoData = options.geoData;
    this.geoCodeRegEx = options.geoCodeRegEx;
    this.goalNr = options.goal;
    this.title = options.title;

    // Require at least one geoLayer.
    if (!options.mapLayers.length) {
      console.log('Map disabled, no mapLayers in options.');
      return;
    }

    // Apply geoLayer defaults.
    for (var i = 0; i < options.mapLayers.length; i++) {
      this.mapLayers[i] = $.extend(true, {}, mapLayerDefaults, options.mapLayers[i]);
    }

    this._defaults = defaults;
    this._name = 'sdgMap';

    this.valueRange = [_.min(_.pluck(this.geoData, 'Value')), _.max(_.pluck(this.geoData, 'Value'))];
    this.colorScale = chroma.scale(this.options.colorRange[this.goalNr])
      .domain(this.valueRange)
      .classes(this.options.colorRange[this.goalNr].length);

    this.years = _.uniq(_.pluck(this.geoData, 'Year')).sort();
    this.currentYear = this.years[0];

    //----------------------------------------------
    this.title = translations.t(this.title)
    this.timeSeries = _.pluck(this.geoData, 'title');
    this.timeSeriesName = translations.t(this.timeSeries[this.timeSeries.length -1]);
    this.sex = _.pluck(this.geoData, 'sex');
    this.sexName = translations.t(this.sex[this.sex.length -1]);
    this.age = _.pluck(this.geoData, 'age');
    this.ageName = translations.t(this.age[this.age.length -1]);
    this.typification = _.pluck(this.geoData, 'typification');
    this.typificationName = translations.t(this.typification[this.typification.length -1]);
    this.criminalOffence = _.pluck(this.geoData, 'criminal offences');
    this.criminalOffenceName = translations.t(this.criminalOffence[this.criminalOffence.length -1]);
    this.unit = _.pluck(this.geoData, 'Units');
    this.unitName = translations.t(this.unit[this.unit.length -1]);

    this.startExp = 0;
    this.reloadCounter = 0; // to avoid multiple search buttons
    //---------------------------------------------------

    this.init();
  }


  Plugin.prototype = {



    // Add time series to GeoJSON data and normalize the name and geocode.
    prepareGeoJson: function(geoJson, idProperty, nameProperty, cat, exp) { //--------------------------------added cat & exp
      var geoData = this.geoData;
      geoJson.features.forEach(function(feature) {
        var geocode = feature.properties[idProperty];
        var name = feature.properties[nameProperty];

        //-----------------------------------------------------------------------
        // First add the time series data.
        if (plugin.findCat() == ''){
          var records = _.where(geoData, { GeoCode: geocode});
        }
        else{
          var records = _.where(geoData, { GeoCode: geocode, [cat]: exp });
        },
        //-----------------------------------------------------------------------
        //var records = _.where(geoData, { GeoCode: geocode, cat: exp });
        records.forEach(function(record) {
          // Add the Year data into the properties.
          feature.properties[record.Year] = record.Value;
        });

        // Next normalize the geocode and name.
        feature.properties.name = translations.t(name);
        feature.properties.geocode = geocode;
        delete feature.properties[idProperty];
        delete feature.properties[nameProperty];
      });
      return geoJson;
    },

    //---------------------------
    //Find those disaggregation-categories that have more then one expression in all lines that have geoData
    findCat: function(){
      var categories = ['title','sex','age'];
      var category = '';

      for (var i = 0; i<categories.length; i++){
        if (this.findDisagg(categories[i]).length>1){ //if more then one expression for this categorie exists...
          var category = categories[i];
        }
      };
      return category;
    },

    // Get the found category and return an array with the corresponding expressions
    findDisagg: function(category){
      var expressions = _.pluck(this.geoData, category);
      unique = [ ...new Set(expressions) ];
      return unique;
    },

    getExpression: function(){
      var expression = $('input[name="disagg"]:checked').val();
      return expression;
    },

    //---------------------------

    // Zoom to a feature.
    zoomToFeature: function(layer) {
      this.map.fitBounds(layer.getBounds());
    },

    // Select a feature.
    highlightFeature: function(layer) {
      // Abort if the layer is not on the map.
      if (!this.map.hasLayer(layer)) {
        return;
      }
      // Update the style.
      layer.setStyle(this.options.styleHighlighted);
      // Add a tooltip if not already there.
      if (!layer.getTooltip()) {
        var tooltipContent = layer.feature.properties.name;
        var tooltipData = this.getData(layer.feature.properties);
        if (tooltipData) {
          tooltipContent += ': ' + tooltipData;
        }
        layer.bindTooltip(tooltipContent, {
          permanent: true,
        }).addTo(this.map);
      }
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      this.updateStaticLayers();
    },

    // Unselect a feature.
    unhighlightFeature: function(layer) {

      // Reset the feature's style.
      layer.setStyle(this.options.styleNormal);

      // Remove the tooltip if necessary.
      if (layer.getTooltip()) {
        layer.unbindTooltip();
      }

      // Make sure other selections are still highlighted.
      var plugin = this;
      this.selectionLegend.selections.forEach(function(selection) {
        plugin.highlightFeature(selection);
      });
    },

    // Get all of the GeoJSON layers.
    getAllLayers: function() {
      return L.featureGroup(this.dynamicLayers.layers);
    },

    // Get only the visible GeoJSON layers.
    getVisibleLayers: function() {
      // Unfortunately relies on an internal of the ZoomShowHide library.
      return this.dynamicLayers._layerGroup;
    },

    updateStaticLayers: function() {
      // Make sure the static borders are always visible.
      this.staticLayers._layerGroup.eachLayer(function(layer) {
        layer.bringToFront();
      });
    },

    // Update the colors of the Features on the map.
    updateColors: function() {
      var plugin = this;
      this.getAllLayers().eachLayer(function(layer) {
        layer.setStyle(function(feature) {
          return {
            fillColor: plugin.getColor(feature.properties),
          }
        });
      });
    },

    // Get the data from a feature's properties, according to the current year.
    getData: function(props) {
      if (props[this.currentYear]) {
        return props[this.currentYear];
      }
      return false;
    },

    // Choose a color for a GeoJSON feature.
    getColor: function(props) {
      var data = this.getData(props);
      if (data) {
        return this.colorScale(data).hex();
      }
      else {
        return this.options.noValueColor;
      }
    },

    // Initialize the map itself.
    init: function() {
      // Create the map.
      this.map = L.map(this.element, {
        minZoom: this.options.minZoom,
        maxZoom: this.options.maxZoom,
        zoomControl: false,
      });
      this.map.setView([51.9, 10.26],0);
      this.dynamicLayers = new ZoomShowHide();
      this.dynamicLayers.addTo(this.map);
      this.staticLayers = new ZoomShowHide();
      this.staticLayers.addTo(this.map);

      // Add zoom control.
      this.map.addControl(L.Control.zoomHome());

      // Add full-screen functionality.
      this.map.addControl(new L.Control.Fullscreen());

      // Add scale.
      this.map.addControl(L.control.scale({position: 'bottomright'}));

      // Add tile imagery.
      L.tileLayer(this.options.tileURL, this.options.tileOptions).addTo(this.map);

      // Because after this point, "this" rarely works.
      var plugin = this;


      //Add the radio buttons------------------------------------------------------------------------------------------------------------------------
      var exp = plugin.findDisagg(plugin.findCat());
      for (var i = 0; i<exp.length; i++) {
        if (!exp[i]){
          var label = 'total';
        }
        else{
          var label = exp[i];
        }
        var command = L.control({position: 'bottomright'});
        command.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'command');
            //set the Button on position 'startExp' to status checked
            if (i == plugin.startExp){
              div.innerHTML = '<label><input id="command'+toString(i)+'" type="radio" name="disagg" value="'+i+'" checked> '+translations.t(label)+'</label><br>';
            }
            else{
              div.innerHTML = '<label><input id="command'+toString(i)+'" type="radio" name="disagg" value="'+i+'"> '+translations.t(label)+'</label><br>';
            }
            return div;
        };
        command.addTo(this.map);
      };

      //set var expression to the array(exp) value at position of checked button
      this.expression = exp[$('input[name="disagg"]:checked').val()];
      this.reloadCounter ++;


      //action, when click:
      $('input[type="radio"]').on('click change', function(e) {
        console.log(e.type, plugin.startExp);
        //change var startExp to position in array exp
        plugin.startExp = $('input[name="disagg"]:checked').val();
        //alert('You clicked radio!');
        //reload the map with different startExp
        plugin.map.remove();
        plugin.init();
      });
      //------------------------------------------------------------------------------------------------------------------------



      // Add the year slider.
      this.map.addControl(L.Control.yearSlider({
        years: this.years,
        yearChangeCallback: function(e) {
          plugin.currentYear = new Date(e.time).getFullYear();
          plugin.updateColors();
          plugin.selectionLegend.update();

        }
      }));





      // Add the selection legend.
      this.selectionLegend = L.Control.selectionLegend(plugin);
      this.map.addControl(this.selectionLegend);

      // Add the download button.
      this.map.addControl(L.Control.downloadGeoJson(plugin));

      // At this point we need to load the GeoJSON layer/s.
      var geoURLs = this.mapLayers.map(function(item) {
        return $.getJSON(item.serviceUrl);
      });
      $.when.apply($, geoURLs).done(function() {

        // Apparently "arguments" can either be an array of responses, or if
        // there was only one response, the response itself. This behavior is
        // odd and should be investigated. In the meantime, a workaround is a
        // blunt check to see if it is a single response.
        var geoJsons = arguments;
        // In a response, the second element is a string (like 'success') so
        // check for that here to identify whether it is a response.
        if (arguments.length > 1 && typeof arguments[1] === 'string') {
          // If so, put it into an array, to match the behavior when there are
          // multiple responses.
          geoJsons = [geoJsons];
        }

        for (var i = 0; i < geoJsons.length; i++) {
          // First add the geoJson as static (non-interactive) borders.
          if (plugin.mapLayers[i].staticBorders) {
            var staticLayer = L.geoJson(geoJsons[i][0], {
              style: plugin.options.styleStatic,
              interactive: false,
            });
            // Static layers should start appear when zooming past their dynamic
            // layer, and stay visible after that.
            staticLayer.min_zoom = plugin.mapLayers[i].max_zoom + 1;
            staticLayer.max_zoom = plugin.options.maxZoom;
            plugin.staticLayers.addLayer(staticLayer);
          }
          // Now go on to add the geoJson again as choropleth dynamic regions.
          var idProperty = plugin.mapLayers[i].idProperty;
          var nameProperty = plugin.mapLayers[i].nameProperty;

          //----------------------------------------------------------------------------------------------------------------------
          var cat = plugin.findCat();
          var expression = plugin.expression;

          var geoJson = plugin.prepareGeoJson(geoJsons[i][0], idProperty, nameProperty, cat, expression);
          //----------------------------------------------------------------------------------------------------------------------

          var layer = L.geoJson(geoJson, {
            style: plugin.options.styleNormal,
            onEachFeature: onEachFeature,
          });
          // Set the "boundaries" for when this layer should be zoomed out of.
          layer.min_zoom = plugin.mapLayers[i].min_zoom;
          layer.max_zoom = plugin.mapLayers[i].max_zoom;
          // Listen for when this layer gets zoomed in or out of.
          layer.on('remove', zoomOutHandler);
          layer.on('add', zoomInHandler);
          // Save the GeoJSON object for direct access (download) later.
          layer.geoJsonObject = geoJson;
          // Add the layer to the ZoomShowHide group.
          plugin.dynamicLayers.addLayer(layer);
        }





        plugin.updateColors();

        // Now that we have layers, we can add the search feature.
        if (plugin.reloadCounter == 1){
          plugin.searchControl = new L.Control.Search({
            layer: plugin.getAllLayers(),
            propertyName: 'name',
            marker: false,
            moveToLocation: function(latlng) {
              plugin.zoomToFeature(latlng.layer);
              if (!plugin.selectionLegend.isSelected(latlng.layer)) {
                plugin.highlightFeature(latlng.layer);
                plugin.selectionLegend.addSelection(latlng.layer);
              }
            },
            autoCollapse: true,
          });

        }
        plugin.map.addControl(plugin.searchControl);
        // The search plugin messes up zoomShowHide, so we have to reset that
        // with this hacky method. Is there a better way?
        var zoom = plugin.map.getZoom();
        plugin.map.setZoom(plugin.options.maxZoom);
        plugin.map.setZoom(zoom);

        // The list of handlers to apply to each feature on a GeoJson layer.
        function onEachFeature(feature, layer) {
          layer.on('click', clickHandler);
          layer.on('mouseover', mouseoverHandler);
          layer.on('mouseout', mouseoutHandler);
        }
        // Event handler for click/touch.
        function clickHandler(e) {
          var layer = e.target;
          if (plugin.selectionLegend.isSelected(layer)) {
            plugin.selectionLegend.removeSelection(layer);
            plugin.unhighlightFeature(layer);
          }
          else {
            plugin.selectionLegend.addSelection(layer);
            plugin.highlightFeature(layer);
            plugin.zoomToFeature(layer);
          }
        }
        // Event handler for mouseover.
        function mouseoverHandler(e) {
          var layer = e.target;
          if (!plugin.selectionLegend.isSelected(layer)) {
            plugin.highlightFeature(layer);
          }
        }
        // Event handler for mouseout.
        function mouseoutHandler(e) {
          var layer = e.target;
          if (!plugin.selectionLegend.isSelected(layer)) {
            plugin.unhighlightFeature(layer);
          }
        }
        // Event handler for when a geoJson layer is zoomed out of.
        function zoomOutHandler(e) {
          var geoJsonLayer = e.target;
          // For desktop, we have to make sure that no features remain
          // highlighted, as they might have been highlighted on mouseover.
          geoJsonLayer.eachLayer(function(layer) {
            if (!plugin.selectionLegend.isSelected(layer)) {
              plugin.unhighlightFeature(layer);
            }
          });
          plugin.updateStaticLayers();
        }
        // Event handler for when a geoJson layer is zoomed into.
        function zoomInHandler(e) {
          plugin.updateStaticLayers();
        }
      });

      // Perform some last-minute tasks when the user clicks on the "Map" tab.
      $('.map .nav-link').click(function() {
        setTimeout(function() {
          $('#map #loader-container').hide();
          // Leaflet needs "invalidateSize()" if it was originally rendered in a
          // hidden element. So we need to do that when the tab is clicked.
          plugin.map.invalidateSize();
          // Also zoom in/out as needed.
          plugin.map.fitBounds(plugin.getVisibleLayers().getBounds());
          // Limit the panning to what we care about.
          plugin.map.setMaxBounds(plugin.getVisibleLayers().getBounds());
          // Make sure the info pane is not too wide for the map.
          var $legendPane = $('.selection-legend.leaflet-control');
          var widthPadding = 20;
          var maxWidth = $('#map').width() - widthPadding;
          if ($legendPane.width() > maxWidth) {
            $legendPane.width(maxWidth);
          }
          // Make sure the map is not too high.
          var heightPadding = 75;
          var maxHeight = $(window).height() - heightPadding;
          if ($('#map').height() > maxHeight) {
            $('#map').height(maxHeight);
          }
        }, 500);
      });
    },
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn['sdgMap'] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_sdgMap')) {
        $.data(this, 'plugin_sdgMap', new Plugin(this, options));
      }
    });
  };
})(jQuery, L, chroma, window, document);
