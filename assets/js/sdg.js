/**
 * This function returns a javascript object containing autotrack.js properties.
 *
 * These properties can be added to an element with jQuery: $(element).attr(props)
 *
 * See _includes/autotrack.html for parameter descriptions.
 */
opensdg.autotrack = function(preset, category, action, label) {
  var presets = {};var params = {
    category: category,
    action: action,
    label: label
  };
  if (presets[preset]) {
    params = presets[preset];
  }
  var obj = {
    'data-on': 'click'
  };
  if (params.category) {
    obj['data-event-category'] = params.category;
  }
  if (params.action) {
    obj['data-event-action'] = params.action;
  }
  if (params.label) {
    obj['data-event-label'] = params.label;
  }

  return obj;
};
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-array"),require("d3-axis"),require("d3-dispatch"),require("d3-drag"),require("d3-ease"),require("d3-scale"),require("d3-selection")):"function"==typeof define&&define.amd?define(["exports","d3-array","d3-axis","d3-dispatch","d3-drag","d3-ease","d3-scale","d3-selection"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,e,a,r,n,l,i,s){"use strict";function c(){function t(t){z=t.selection?t.selection():t,M=h[0]instanceof Date?i.scaleTime():i.scaleLinear(),M=M.domain(h).range([0,m]).clamp(!0),D=i.scaleLinear().range(M.range()).domain(M.range()).clamp(!0),q=q||M.tickFormat(),z.selectAll(".axis").data([null]).enter().append("g").attr("transform","translate(0,7)").attr("class","axis");var e=z.selectAll(".slider").data([null]),r=e.enter().append("g").attr("class","slider").attr("cursor","ew-resize").attr("transform","translate(0,0)").call(n.drag().on("start",function(){s.select(this).classed("active",!0);var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("start",e,a),d(a)}).on("drag",function(){var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("drag",e,a),d(a)}).on("end",function(){s.select(this).classed("active",!1);var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("end",e,a),d(a)}));r.append("line").attr("class","track").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","#bbb").attr("stroke-width",6).attr("stroke-linecap","round"),r.append("line").attr("class","track-inset").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","#eee").attr("stroke-width",4).attr("stroke-linecap","round"),r.append("line").attr("class","track-overlay").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","transparent").attr("stroke-width",40).attr("stroke-linecap","round").merge(e.select(".track-overlay"));var l=r.append("g").attr("class","parameter-value").attr("transform","translate("+M(p)+",0)").attr("font-family","sans-serif").attr("text-anchor","middle");l.append("path").attr("d",g).attr("fill","white").attr("stroke","#777"),x&&l.append("text").attr("font-size",10).attr("y",27).attr("dy",".71em").text(q(p)),t.select(".track").attr("x2",M.range()[1]),t.select(".track-inset").attr("x2",M.range()[1]),t.select(".track-overlay").attr("x2",M.range()[1]),t.select(".axis").call(a.axisBottom(M).tickFormat(q).ticks(w).tickValues(y)),z.select(".axis").select(".domain").remove(),t.select(".axis").attr("transform","translate(0,7)"),t.selectAll(".axis text").attr("fill","#aaa").attr("y",20).attr("dy",".71em").attr("text-anchor","middle"),t.selectAll(".axis line").attr("stroke","#aaa"),t.select(".parameter-value").attr("transform","translate("+M(p)+",0)"),c()}function c(){if(x){var t=[];z.selectAll(".axis .tick").each(function(e){t.push(Math.abs(e-p))});var a=e.scan(t);z.selectAll(".axis .tick text").attr("opacity",function(t,e){return e===a?0:1})}}function u(t){if(k){var a=(t-h[0])%k,r=t-a;return 2*a>k&&(r+=k),t instanceof Date?new Date(r):r}if(b){var n=e.scan(b.map(function(e){return Math.abs(t-e)}));return b[n]}return t}function d(e){p!==e&&(p=e,A.call("onchange",t,e),c())}function f(t,e){e=void 0!==e&&e;var a=z.select(".parameter-value");e&&(a=a.transition().ease(l.easeQuadOut).duration(o)),a.attr("transform","translate("+M(t)+",0)"),x&&z.select(".parameter-value text").text(q(t))}var p=0,v=0,h=[0,10],m=100,x=!0,g="M-5.5,-5.5v10l6,5.5l6,-5.5v-10z",k=null,y=null,b=null,q=null,w=null,A=r.dispatch("onchange","start","end","drag"),z=null,M=null,D=null;return t.min=function(e){return arguments.length?(h[0]=e,t):h[0]},t.max=function(e){return arguments.length?(h[1]=e,t):h[1]},t.domain=function(e){return arguments.length?(h=e,t):h},t.width=function(e){return arguments.length?(m=e,t):m},t.tickFormat=function(e){return arguments.length?(q=e,t):q},t.ticks=function(e){return arguments.length?(w=e,t):w},t.value=function(e){if(!arguments.length)return p;var a=D(M(e)),r=u(M.invert(a));return f(r,!0),d(r),t},t.default=function(e){return arguments.length?(v=e,p=e,t):v},t.step=function(e){return arguments.length?(k=e,t):k},t.tickValues=function(e){return arguments.length?(y=e,t):y},t.marks=function(e){return arguments.length?(b=e,t):b},t.handle=function(e){return arguments.length?(g=e,t):g},t.displayValue=function(e){return arguments.length?(x=e,t):x},t.on=function(){var e=A.on.apply(A,arguments);return e===A?t:e},t}var o=200;t.sliderHorizontal=function(){return c()},Object.defineProperty(t,"__esModule",{value:!0})});/**
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
    //--------------------------------------------------
    this.init();
  }


  Plugin.prototype = {

    // Add time series to GeoJSON data and normalize the name and geocode.
    prepareGeoJson: function(geoJson, idProperty, nameProperty, cat, exp) {
      var geoData = this.geoData;
      geoJson.features.forEach(function(feature) {
        var geocode = feature.properties[idProperty];
        var name = feature.properties[nameProperty];


        // First add the time series data.
        var records = _.where(geoData, { GeoCode: geocode, [cat]: exp[0] });
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
    findCat: function(){
      var category = 'sex';
      return category;
    },

    findDisagg: function(){
      var expressions = ['female', 'male'];
      var expression = 'female';
      return expressions;
    },
    getExpression: function(){
      var expression = $('input[name="disagg"]:checked').val();
    },
    /*
    makeBtns: function(){
      var disaggs = plugin.findDisagg()

      for (var i = 0; i<2; i++) {
        var command = L.control({position: 'bottomright'});
        command.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'command');
            div.innerHTML = '<form><input id="command'+i+'" type="checkbox" /> '+disaggs[i]+'</form>';
            return div;
        };
        command.addTo(this.map);
        //document.getElementById ("command").addEventListener ("click", handleCommand(disaggs[i]), false);
      };
    },


    // add the event handler
    function handleCommand(disagg) {
       //alert("Clicked, title = " + this.title + ' active = '+ this.checked);
       window.disagg = disagg
    },

    */
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
      this.map.setView([0, 0], 0);
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

      // Add the year slider.
      this.map.addControl(L.Control.yearSlider({
        years: this.years,
        yearChangeCallback: function(e) {
          plugin.currentYear = new Date(e.time).getFullYear();
          plugin.updateColors();
          plugin.selectionLegend.update();

        }
      }));


      //------------------------------------------------------------------------------------------------------------------------
      var exp = plugin.findDisagg();
      for (var i = 0; i<2; i++) {
        var command = L.control({position: 'bottomright'});
        command.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'command');
            div.innerHTML = '<input id="command'+i+'" type="radio" name="disagg" value="'+exp[i]+'"> '+exp[i]+'<br>';
            return div;
        };
        command.addTo(this.map);
        //document.getElementById ("command").addEventListener ("click", handleCommand(disaggs[i]), false);
      };
      var expression = 'male' //$('input[name="disagg"]:checked').val();
      //------------------------------------------------------------------------------------------------------------------------



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
          var exp = plugin.findDisagg();
          //var expression = plugin.getExpression();

          var geoJson = plugin.prepareGeoJson(geoJsons[i][0], idProperty, nameProperty, cat, plugin.expression);
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
Chart.plugins.register({
  id: 'rescaler',
  beforeInit: function (chart, options) {
    chart.config.data.allLabels = chart.config.data.labels.slice(0);
  },
  afterDatasetsUpdate: function (chart) {
    _.each(chart.data.datasets, function (ds) {
      if (!ds.initialised) {
        ds.initialised = true;
        ds.allData = ds.data.slice(0);
      }
    });
  },
  afterUpdate: function (chart) {

    if (chart.isScaleUpdate) {
      chart.isScaleUpdate = false;
      return;
    }

    var datasets = _.filter(chart.data.datasets, function (ds, index) {
      var meta = chart.getDatasetMeta(index).$filler;
      return meta && meta.visible;
    });

    var ranges = _.chain(datasets).pluck('allData').map(function (data) {
      return {
        min: _.findIndex(data, function(val) { return val !== null }),
        max: _.findLastIndex(data, function(val) { return val !== null })
      };
    }).value();

    var dataRange = ranges.length ? {
      min: _.chain(ranges).pluck('min').min().value(),
      max: _.chain(ranges).pluck('max').max().value()
    } : undefined;

    if (dataRange) {
      chart.data.labels = chart.data.allLabels.slice(dataRange.min, dataRange.max + 1);

      chart.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.allData.slice(dataRange.min, dataRange.max + 1);
      });

      chart.isScaleUpdate = true;
      chart.update();
    }
  }
});
function event(sender) {
  this._sender = sender;
  this._listeners = [];
}

event.prototype = {
  attach: function (listener) {
    this._listeners.push(listener);
  },
  notify: function (args) {
    var index;

    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};
var accessibilitySwitcher = function() {

  var contrastIdentifiers = ['default', 'high'];

  function setActiveContrast(contrast) {
    var contrastType = ""
    _.each(contrastIdentifiers, function(id) {
      $('body').removeClass('contrast-' + id);
    });
    if(contrastType === "long"){
	    $("body").addClass("long");
    }
    $('body').addClass('contrast-' + contrast);

    createCookie("contrast", contrast, 365);
  }

  function getActiveContrast() {
    var contrast = _.filter(contrastIdentifiers, function(id) {
      return $('body').hasClass('contrast-' + id);
    });

    return contrast ? contrast : contrastIdentifiers[0];
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  window.onload = function(e) {
    var cookie = readCookie("contrast");
    var contrast = cookie ? cookie : contrastIdentifiers[0];
    setActiveContrast(contrast);
    imageFix(contrast);
  }

  window.onunload = function(e) {
    var contrast = getActiveContrast();
    createCookie("contrast", contrast, 365);
  }

  var cookie = readCookie("contrast");
  var contrast = cookie ? cookie : contrastIdentifiers[0];
  setActiveContrast(contrast);

  ////////////////////////////////////////////////////////////////////////////////////

  _.each(contrastIdentifiers, function(contrast) {
    var gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', contrast);
    $('.contrast-switcher').append($('<li />').attr({
      'class': 'nav-link contrast contrast-' + contrast
    }).html($('<a />').attr(gaAttributes).attr({
      'href': 'javascript:void(0)',
      'title': getContrastToggleTitle(contrast),
      'data-contrast': contrast,
    }).html(getContrastToggleLabel(contrast).replace(" ", "<br/>")).click(function() {
      setActiveContrast($(this).data('contrast'));
      imageFix(contrast);
    })));
  });
  
function getContrastToggleLabel(identifier){
  var contrastType = ""
  if(contrastType === "long") {
    if(identifier === "default"){	
      return translations.header.default_contrast; 	
    }	
    else if(identifier === "high"){	
      return translations.header.high_contrast;	
    }
  }
  else {
    return 'A'
  }
}

function getContrastToggleTitle(identifier){	
  if(identifier === "default"){	
    return translations.header.disable_high_contrast; 	
  }	
  else if(identifier === "high"){	
    return translations.header.enable_high_contrast;	
  }	
}
  
  
function imageFix(contrast) {
  if (contrast == 'high')  {
    _.each($('img:not([src*=high-contrast])'), function(goalImage){
      if ($(goalImage).attr('src').slice(0, 35) != "https://platform-cdn.sharethis.com/") {
      $(goalImage).attr('src', $(goalImage).attr('src').replace('img/', 'img/high-contrast/'));
      }})
  } else {
    // Remove high-contrast
    _.each($('img[src*=high-contrast]'), function(goalImage){
      $(goalImage).attr('src', $(goalImage).attr('src').replace('high-contrast/', ''));
    })
  }
};

};
var indicatorDataStore = function(dataUrl) {
  this.dataUrl = dataUrl;

  this.getData = function() {
    that = this;
    return new Promise(function(resolve, reject) {
      $.getJSON(that.dataUrl, function(data) {
        resolve(data);
      }).fail(function(err) {
        reject(Error(err));
      });      
    });
  };
};var indicatorModel = function (options) {

  Array.prototype.containsValue = function(val) {
    return this.indexOf(val) != -1;
  };

  // events:
  this.onDataComplete = new event(this);
  this.onSeriesComplete = new event(this);
  this.onSeriesSelectedChanged = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);
  this.onNoHeadlineData = new event(this);

  // json conversion:
  var convertJsonFormat = function(data) {
    var keys = _.keys(data);

    return _.map(data[keys[0]], function(item, i) {
      return _.object(keys, _.map(keys, function(k) {
        return data[k][i];
      }));
    });
  }

  // general members:
  var that = this;
  this.data = convertJsonFormat(options.data);
  this.edgesData = convertJsonFormat(options.edgesData);
  this.hasHeadline = true;
  this.country = options.country;
  this.indicatorId = options.indicatorId;
  this.shortIndicatorId = options.shortIndicatorId;
  this.chartTitle = options.chartTitle;
  this.graphType = options.graphType;
  this.measurementUnit = options.measurementUnit;
  this.copyright = options.copyright;
  this.dataSource = options.dataSource;
  this.geographicalArea = options.geographicalArea;
  this.footnote = options.footnote;
  this.startValues = options.startValues;
  this.showData = options.showData;
  this.selectedFields = [];
  this.allowedFields = [];
  this.selectedUnit = undefined;
  this.fieldsByUnit = undefined;
  this.dataHasUnitSpecificFields = false;
  this.fieldValueStatuses = [];
  this.validParentsByChild = {};
  this.hasGeoData = false;
  this.geoData = [];
  this.geoCodeRegEx = options.geoCodeRegEx;
  this.showMap = options.showMap;

  // initialise the field information, unique fields and unique values for each field:
  (function initialise() {

    var extractUnique = function(prop) {
      return _.chain(that.data).pluck(prop).uniq().sortBy(function(year) {
        return year;
      }).value();
    };

    that.years = extractUnique('Year');

    if(that.data[0].hasOwnProperty('GeoCode')) {
      that.hasGeoData = true;

      // Year, GeoCode, Value
      that.geoData = _.filter(that.data, function(dataItem) {
        return dataItem.GeoCode;
      });
    }

    if(that.data[0].hasOwnProperty('Units')) {
      that.units = extractUnique('Units');
      that.selectedUnit = that.units[0];

      // what fields have values for a given unit?
      that.fieldsByUnit = _.chain(_.map(that.units, function(unit) {
        return _.map(_.filter(Object.keys(that.data[0]), function (key) {
              return ['Year', 'Value', 'Units'].indexOf(key) === -1;
          }), function(field) {
          return {
            unit: unit,
            field: field,
            fieldData: !!_.find(_.where(that.data, { Units: unit }), function(d) { return d[field]; })
          };
        });
      })).map(function(r) {
        return r.length ? {
          unit: r[0].unit,
          fields: _.pluck(_.where(r, { fieldData: true }), 'field')
        } : {};
      }).value();

      // determine if the fields vary by unit:
      that.dataHasUnitSpecificFields = !_.every(_.pluck(that.fieldsByUnit, 'fields'), function(fields) {
        return _.isEqual(_.sortBy(_.pluck(that.fieldsByUnit, 'fields')[0]), _.sortBy(fields));
      });
    }

    that.fieldItemStates = _.map(_.filter(Object.keys(that.data[0]), function (key) {
        return ['Year', 'Value', 'Units', 'GeoCode', 'Observation status', 'Unit multiplier', 'Unit measure'].indexOf(key) === -1;
      }), function(field) {
      return {
        field: field,
        hasData: true,
        values: _.map(_.chain(that.data).pluck(field).uniq().filter(function(f) { return f; }).sort().value(),
          function(f) { return {
            value: f,
            state: 'default',
            hasData: true
          };
        })
      };
    });

    // Set up the validParentsByChild object, which lists the parent field
    // values that should be associated with each child field value.
    var parentFields = _.pluck(that.edgesData, 'From');
    var childFields = _.pluck(that.edgesData, 'To');
    that.validParentsByChild = {};
    _.each(childFields, function(childField, fieldIndex) {
      var fieldItemState = _.findWhere(that.fieldItemStates, {field: childField});
      var childValues = _.pluck(fieldItemState.values, 'value');
      var parentField = parentFields[fieldIndex];
      that.validParentsByChild[childField] = {};
      _.each(childValues, function(childValue) {
        var rowsWithParentValues = _.filter(that.data, function(row) {
          var childMatch = row[childField] == childValue;
          var parentNotEmpty = row[parentField];
          return childMatch && parentNotEmpty;
        });
        var parentValues = _.pluck(rowsWithParentValues, parentField);
        parentValues = _.uniq(parentValues);
        that.validParentsByChild[childField][childValue] = parentValues;
      });
    });

    that.selectableFields = _.pluck(that.fieldItemStates, 'field');

    // determine if there are any 'child' fields: those that can
    // only be selected if their parent has one or more selections:
    that.allowedFields = _.difference(that.selectableFields, _.pluck(that.edgesData, 'To'));

    // prepare the data according to the rounding function:
    that.data = _.map(that.data, function(item) {

      // only apply a rounding function for non-zero values:
      if(item.Value != 0) {
        // For rounding, use a function that can be set on the global opensdg
        // object, for easier control: opensdg.dataRounding()
        if (typeof opensdg.dataRounding === 'function') {
          item.Value = opensdg.dataRounding(item.Value);
        }
      }

      // remove any undefined/null values:
      _.each(Object.keys(item), function(key) {
        if(_.isNull(item[key]) || _.isUndefined(item[key])) {
          delete item[key];
        }
      });

      return item;
    });

    that.datasetObject = {
      fill: false,
      pointHoverRadius: 5,
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 1,
      tension: 0,
      spanGaps: false
    };

    that.footerFields = {};
    that.footerFields[translations.indicator.source] = that.dataSource;
    that.footerFields[translations.indicator.geographical_area] = that.geographicalArea;
    that.footerFields[translations.indicator.unit_of_measurement] = that.measurementUnit;
    that.footerFields[translations.indicator.copyright] = that.copyright;
    that.footerFields[translations.indicator.footnote] = that.footnote;
    // Filter out the empty values.
    that.footerFields = _.pick(that.footerFields, _.identity);
  }());

  var headlineColor = '777777';
  if (this.indicatorId.includes('_1-')){
    var colors = ['e5243b', '891523', 'ef7b89', '2d070b', 'f4a7b0', 'b71c2f', 'ea4f62', '5b0e17', 'fce9eb'];
  }
  else if(this.indicatorId.includes('_2-')){
    var colors = ['e5b735', '896d1f', 'efd385', '2d240a', 'f4e2ae', 'b7922a', 'eac55d', '5b4915', 'f9f0d6'];
  }
  else if(this.indicatorId.includes('_3-')){
    var colors = ['4c9f38', '2d5f21', '93c587', '0f1f0b', 'c9e2c3', '3c7f2c', '6fb25f', '1e3f16', 'a7d899'];
  }
  else if(this.indicatorId.includes('_4-')){
    var colors = ['c5192d', '760f1b', 'dc7581', '270509', 'f3d1d5', '9d1424', 'd04656', '4e0a12', 'e7a3ab'];
  }
  else if(this.indicatorId.includes('_5-')){
    var colors = ['ff3a21', 'b22817', 'ff7563', '330b06', 'ffd7d2', 'cc2e1a', 'ff614d', '7f1d10', 'ff9c90'];
  }
  else if(this.indicatorId.includes('_6-')){
    var colors = ['26bde2', '167187', '7cd7ed', '07252d', 'd3f1f9', '1e97b4', '51cae7', '0f4b5a', 'a8e4f3'];
  }
  else if(this.indicatorId.includes('_7-')){
    var colors = ['fcc30b', '977506', 'fddb6c', '322702', 'fef3ce', 'c99c08', 'fccf3b', '644e04', 'fde79d'];
  }
  else if(this.indicatorId.includes('_8-')){
    var colors = ['a21942', '610f27', 'c7758d', '610F28', 'ecd1d9', '811434', 'b44667', '400a1a', 'd9a3b3'];
  }
  else if(this.indicatorId.includes('_9-')){
    var colors = ['fd6925', '973f16', 'fda57c', '321507', 'fee1d3', 'ca541d', 'fd8750', '652a0e', 'fec3a7'];
  }
  else if(this.indicatorId.includes('_10-')){
    var colors = ['dd1367', '840b3d', 'ea71a3', '2c0314', 'f8cfe0', 'b00f52', 'd5358b', '580729', 'f1a0c2'];
  }
  else if(this.indicatorId.includes('_11-')){
    var colors = ['fd9d24', '653e0e', 'fed7a7', 'b16d19', 'fdba65', 'b14a1e', 'fd976b', '000000', 'fed2bf'];
  }
  else if(this.indicatorId.includes('_12-')){
    var colors = ['c9992d', '785b1b', 'dec181', '281e09', 'f4ead5', 'a07a24', 'd3ad56', '503d12', 'e9d6ab'];
  }
  else if(this.indicatorId.includes('_13-')){
    var colors = ['3f7e44', '254b28', '8bb18e', '0c190d', 'd8e5d9', '326436', '659769', '19321b', 'b2cbb4'];
  }
  else if(this.indicatorId.includes('_14-')){
    var colors = ['0a97d9', '065a82', '6cc0e8', '021e2b', 'ceeaf7', '0878ad', '3aabe0', '043c56', '9dd5ef'];
  }
  else if(this.indicatorId.includes('_15-')){
    var colors = ['56c02b', '337319', '99d97f', '112608', 'ddf2d4', '449922', '77cc55', '224c11', 'bbe5aa'];
  }
  else if(this.indicatorId.includes('_16-')){
    var colors = ['00689d', '00293e', '99c2d7', '00486d', '4c95ba', '126b80', 'cce0eb', '5a9fb0', 'a1c8d2'];
  }
  else if(this.indicatorId.includes('_17-')){
    var colors = ['19486a', '0a1c2a', '8ca3b4', '16377c', 'd1dae1', '11324a', '466c87', '5b73a3', '0f2656'];
  };
  //SDG goal colors
  //['e5243b', 'e5b735', '4c9f38', 'c5192d', 'ff3a21', '26bde2', 'fcc30b', 'a21942', 'fd6925', 'dd1367'];
  var headlinePointstyle = 'circle';
  var pointStyles = ['circle', 'triangle', 'cross', 'crossRot', 'dash', 'line', 'rect', 'rectRounded', 'rectRot', 'star', 'triangle'];

  // allow headline + (2 x others)
  var maxDatasetCount = 2 * colors.length;

  this.getHeadline = function(fields) {
    var that = this, allUndefined = function (obj) {
      for (var loop = 0; loop < that.selectableFields.length; loop++) {
        if (obj[that.selectableFields[loop]])
          return false;
      }
      return true;
    };

    return _.chain(that.data)
      .filter(function (i) {
        return allUndefined(i);
      })
      .sortBy(function (i) {
        return that.selectedUnit ? i.Units : i.Year;
      })
      .map(function (d) {
        return _.pick(d, function(val) { return val !== null });
      })
      .value();
  };

  this.clearSelectedFields = function() {
    this.selectedFields = [];
    this.getData();
    this.onFieldsCleared.notify();
  };

  this.updateSelectedFields = function (fields) {
    this.selectedFields = fields;

    // update parent/child statuses:
    var selectedFields = _.pluck(this.selectedFields, 'field');
    _.each(this.edgesData, function(edge) {
      if(!_.contains(selectedFields, edge.From)) {
        // don't allow any child fields of this association:
        this.selectedFields = _.without(this.selectedFields, _.findWhere(this.selectedFields, {
          field: edge.From
        }));
      }
    });

    // reset the allowedFields:
    this.allowedFields = _.difference(this.selectableFields, _.pluck(this.edgesData, 'To'));

    // and reinstate based on selectedFields:
    var parentFields = _.pluck(this.edgesData, 'From');
    _.each(parentFields, function(parentField) {
      if(_.contains(selectedFields, parentField)) {
        // resinstate
        var childFields = _.chain(that.edgesData).where({ 'From' : parentField }).pluck('To').value();
        that.allowedFields = that.allowedFields.concat(childFields);
        // check each value in the child fields to see if it has data in common
        // with the selected parent value.
        var selectedParent = _.find(that.selectedFields, function(selectedField) {
          return selectedField.field == parentField;
        });
        _.each(that.fieldItemStates, function(fieldItem) {
          // We only care about child fields.
          if (_.contains(childFields, fieldItem.field)) {
            var fieldHasData = false;
            _.each(fieldItem.values, function(childValue) {
              var valueHasData = false;
              _.each(selectedParent.values, function(parentValue) {
                if (_.contains(that.validParentsByChild[fieldItem.field][childValue.value], parentValue)) {
                  valueHasData = true;
                  fieldHasData = true;
                }
              });
              childValue.hasData = valueHasData;
            });
            fieldItem.hasData = fieldHasData;
          }
        });
      }
    });

    // remove duplicates:
    that.allowedFields = _.uniq(that.allowedFields);

    this.getData();
    this.onSelectionUpdate.notify({
      selectedFields: fields,
      allowedFields: that.allowedFields
    });
  };

  this.updateSelectedUnit = function(selectedUnit) {
    this.selectedUnit = selectedUnit;

    // if fields are dependent on the unit, reset:
    this.getData({
      unitsChangeSeries: this.dataHasUnitSpecificFields
    });

    this.onUnitsSelectedChanged.notify(selectedUnit);
  };

  this.getCombinationData = function(obj) {
    var getCombinations = function(fields, arr, n) {
      var index = 0, ret = [];
      for(var i = 0; i < arr.length; i++) {
        var elem = (n == 1) ? arr[i] : arr.shift();
        var field = (n == 1) ? fields[i] : fields.shift();
        for(var j = 0; j < elem.length; j++) {
          if(n == 1) {
            ret.push({
              value: elem[j],
              field: field
            });
          } else {
            var childperm = getCombinations(fields.slice(), arr.slice(), n-1);
            for(var k = 0; k < childperm.length; k++) {
              ret.push([{
                value: elem[j],
                field: field
              }].concat(childperm[k]));
            }
          }
        }
      }
      return ret;
    };

    var	loop = 1,
        res = [],
        src = JSON.parse(JSON.stringify(obj));

    for(; loop <= src.length; loop++) {
      obj = JSON.parse(JSON.stringify(src));
      res = res.concat(getCombinations(_.pluck(obj, 'field'), _.pluck(obj, 'values'), loop));
    }

    return _.map(res, function(r) {
      if(!_.isArray(r)) {
        r = [r];
      }
      return _.object(
        _.pluck(r, 'field'),
        _.pluck(r, 'value')
      );
    });
  };

  this.getData = function(options) {
    // field: 'Grade'
    // values: ['A', 'B']
    var options = _.defaults(options || {}, {
        initial: false,
        unitsChangeSeries: false
      }),
      fields = this.selectedFields,
      selectedFieldTypes = _.pluck(fields, 'field'),
      datasets = [],
      that = this,
      seriesData = [],
      headlineTable = undefined,
      datasetIndex = 0,

      //-----------------
      nameList = []
      indexList = []
      //----------------



      getCombinationDescription = function(combination) {
        return _.map(Object.keys(combination), function(key) {
          return translations.t(combination[key]);
          //return key + ' ' + combination[key];
        }).join(', ');
      },

      getColor = function(datasetIndex) {

        // offset if there is no headline data:
        if(!that.hasHeadline) {
          datasetIndex += 1;
        }

        if(datasetIndex === 0) {
          return headlineColor;
        } else {
          if(datasetIndex > colors.length) {
            return colors[datasetIndex - 1 - colors.length];
          } else {
            return colors[datasetIndex - 1];
          }
        }

        return datasetIndex === 0 ? headlineColor : colors[datasetIndex];
      },

      getPointStyle = function (combinationDescription) {
        if (String(combinationDescription).substr(0,4) == 'Ziel' || String(combinationDescription).substr(0,6) == 'Target'){
          return 'rect';
        }
        else {
          return 'circle';
        }
      },

      getBorderDash = function(datasetIndex) {
        // offset if there is no headline data:
        if(!this.hasHeadline) {
          datasetIndex += 1;
        }

        // 0 -
        // the first dataset is the headline:
        return datasetIndex > colors.length ? [5, 5] : undefined;
      },
      convertToDataset = function (data, combinationDescription /*field, fieldValue*/) {
        // var fieldIndex = field ? _.findIndex(that.selectedFields, function (f) {
        //     return f === field;
        //   }) : undefined,

        //--------------------

        var categ = combinationDescription.substring(0, 4)
        if (categ == 'Ziel' || categ == 'Zeit') {
          if (combinationDescription.indexOf(',') != -1){
            if (!nameList.includes(combinationDescription.substring(combinationDescription.indexOf(','), combinationDescription.length))) {
              // Ziel oder Zeitreihe - Mit Disaggregationen - Pendant ist noch nicht aufgerufen worden
              // Schreibe den Index auf die Liste, damit dieser beim Aufruf des Pendants gefunden werden kann
              nameList.push(combinationDescription.substring(combinationDescription.indexOf(','), combinationDescription.length));
              indexList.push(datasetIndex);
              var datasetIndexMod = datasetIndex;
            }
            else {
              // Ziel oder Zeitreihe - Mit Disaggregationen - Pendant ist schon aufgerufen worden
              // --> finde den Index des Pendants
              var tempIndex = nameList.indexOf(combinationDescription.substring(combinationDescription.indexOf(','), combinationDescription.length));
              var datasetIndexMod = indexList[tempIndex];
            }
          }
          else {
            // Ziel oder Zeitreihe - Keine weiteren Disaggregationen
            // Nimm die erste farbe aus der Liste
            var datasetIndexMod = 0;
          }
        }
        else {
          // Keine Ziel-/Zeitreihen-Unterteilung
          // Nimm den normalen Indexwert
          var datasetIndexMod = datasetIndex;
        }

        var fieldIndex,
          ds = _.extend({

            label: combinationDescription ? combinationDescription : that.country,
            borderColor: '#' + getColor(datasetIndexMod),
            backgroundColor: '#' + getColor(datasetIndexMod),
            pointStyle: getPointStyle(combinationDescription),
            radius: 6,
            pointBorderColor: '#' + getColor(datasetIndexMod),
            borderDash: getBorderDash(datasetIndex),
            data: _.map(that.years, function (year) {
              var found = _.findWhere(data, {
                Year: year
              });
              return found ? found.Value : null;
            }),
            type: 'line',
            borderWidth: combinationDescription ? 2 : 4
          }, that.datasetObject);
        //----------------------------------


        datasetIndex++;
        return ds;
      };

    if (fields && !_.isArray(fields)) {
      fields = [].concat(fields);
    }

    var isSingleValueSelected = function() { return that.selectedFields.length === 1 && that.selectedFields[0].values.length === 1; },
        matchedData = that.data;

    // filter the data:
    //if(!isSingleValueSelected()) {
    if(that.selectedUnit) {
      matchedData = _.where(matchedData, { Units: that.selectedUnit});
    }

    matchedData = _.filter(matchedData, function(rowItem) {
      var matched = false;
      for(var fieldLoop = 0; fieldLoop < that.selectedFields.length; fieldLoop++) {
        if(that.selectedFields[fieldLoop].values.containsValue(rowItem[that.selectedFields[fieldLoop].field])) {
          matched = true;
          break;
        }
      }
      return matched;
    });

    var fieldSelectionInfo = [];

    this.onFieldsStatusUpdated.notify({
      data: this.fieldItemStates,
      selectionStates: fieldSelectionInfo
    });

    // get the headline data:
    var headline = this.getHeadline();

    // Catch the case where this is the initial display, there is a default
    // selected unit (the first one), there is a headline, and this headline
    // uses another unit.
    if (options.initial && headline.length && this.selectedUnit && this.selectedUnit != headline[0]['Units']) {
      // In this scenario we need to correct the selected unit here.
      this.selectedUnit = headline[0]['Units'];
    }

    // all units for headline data:
    if(headline.length) {
      headlineTable = {
        title: 'Headline data',
        headings: that.selectedUnit ? ['Year', 'Units', 'Value'] : ['Year', 'Value'],
        data: _.map(headline, function (d) {
          return that.selectedUnit ? [d.Year, d.Units, d.Value] : [d.Year, d.Value];
        })
      };
    }

    // headline plot should use the specific unit, if any,
    // but there may not be any headline data at all, or for the
    // specific unit:
    if(that.selectedUnit) {
      headline = _.where(headline, { Units : that.selectedUnit });
    }

    // only add to the datasets if there is any headline data:
    if(headline.length) {
      datasets.push(convertToDataset(headline));
    } else {
      this.hasHeadline = false;
    }

    // extract the possible combinations for the selected field values
    var combinations = this.getCombinationData(this.selectedFields);

    var filteredDatasets = [];
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    _.each(combinations, function(combination) {
      var filtered = _.filter(matchedData, function(dataItem) {
        var matched = true;
        for (var loop = 0; loop < that.selectableFields.length; loop++) {
          if (dataItem[that.selectableFields[loop]] !== combination[that.selectableFields[loop]])
            matched = false;
        }
        return matched;
      });

      if(filtered.length) {
        // but some combinations may not have any data:
        filteredDatasets.push({
          data: filtered,
          combinationDescription: getCombinationDescription(combination)
        });
      }
    });

    var datasetCountExceedsMax = false;
    // restrict count if it exceeds the limit:
    if(filteredDatasets.length > maxDatasetCount) {
      datasetCountExceedsMax = true;
    }

    _.chain(filteredDatasets)
      .sortBy(function(ds) { return ds.combinationDescription; })
      .each(function(ds) { datasets.push(convertToDataset(ds.data, ds.combinationDescription)); });

    // convert datasets to tables:
    var selectionsTable = {
      data: []
    };
    selectionsTable.headings = ['Year'].concat(_.pluck(datasets, 'label'));
    _.each(this.years, function(year, yearIndex) {
      selectionsTable.data.push([year].concat(_.map(datasets, function(ds) {
        return ds.data[yearIndex]
      })));
    });

    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasetCountExceedsMax ? datasets.slice(0, maxDatasetCount) : datasets,
      labels: this.years,
      headlineTable: headlineTable,
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      footerFields: this.footerFields
    });

    if(options.initial || options.unitsChangeSeries) {

      if(options.initial) {
        // order the fields based on the edge data, if any:
        if(this.edgesData.length) {
          var orderedEdges = _.chain(this.edgesData)
            .groupBy('From')
            .map(function(value, key) { return [key].concat(_.pluck(value, 'To')); })
            .flatten()
            .value();

          var customOrder = orderedEdges.concat(_.difference(_.pluck(this.fieldItemStates, 'field'), orderedEdges));

          // now order the fields:
          this.fieldItemStates = _.sortBy(this.fieldItemStates, function(item) {
            return customOrder.indexOf(item.field);
          });
        }

        this.onUnitsComplete.notify({
          units: this.units,
          selectedUnit: this.selectedUnit
        });
      }

      // update the series:
      this.onSeriesComplete.notify({
        series: that.dataHasUnitSpecificFields ? _.filter(that.fieldItemStates, function(fis) {
          return _.findWhere(that.fieldsByUnit, { unit : that.selectedUnit }).fields.indexOf(fis.field) != -1;
        }) : this.fieldItemStates,
        allowedFields: this.allowedFields,
        edges: this.edgesData,
        hasGeoData: this.hasGeoData,
        geoData: this.geoData,
        geoCodeRegEx: this.geoCodeRegEx,
        showMap: this.showMap,

        indicatorId: this.indicatorId,
        title: this.chartTitle,
      });


    } else {
      this.onSeriesSelectedChanged.notify({
        series: this.selectedFields
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    if((options.initial || options.unitsChangeSeries) && !this.hasHeadline) {
      // if there is no initial data, select some:

      var minimumFieldSelections = {},
          forceUnit = false;
      // First, do we have some already pre-configured from data_start_values?
      if (this.startValues) {
        // We need to confirm that these values are valid, and pair them up
        // with disaggregation categories. The value, at this point, is a string
        // which we assume to be pipe-delimited.
        var valuesToLookFor = this.startValues.split('|');
        // Match up each field value with a field.
        _.each(this.fieldItemStates, function(fieldItem) {
          _.each(fieldItem.values, function(fieldValue) {
            if (_.contains(valuesToLookFor, fieldValue.value)) {
              minimumFieldSelections[fieldItem.field] = fieldValue.value;
            }
          });
        });
      }
      if (_.size(minimumFieldSelections) == 0) {
        // If we did not have any pre-configured start values, we calculate them.
        // We have to decide what filters will be selected, and in some cases it
        // may need to be multiple filters. So we find the smallest row (meaning,
        // the row with the least number of disaggregations) and then sort it by
        // it's field values. This should have the affect of selecting the first
        // value in each drop-down, up until there are enough selected to display
        // data on the graph. First we get the number of fields:
        var fieldNames = _.pluck(this.fieldItemStates, 'field');
        // Manually add "Units" so that we can check for required units.
        fieldNames.push('Units');
        // We filter our full dataset to only those fields.
        var fieldData = _.map(this.data, function(item) { return _.pick(item, fieldNames); });
        // We then sort the data by each field. We go in reverse order so that the
        // first field will be highest "priority" in the sort.
        _.each(fieldNames.reverse(), function(fieldName) {
          fieldData = _.sortBy(fieldData, fieldName);
        });
        // But actually we want the top-priority sort to be the "size" of the
        // rows. In other words we want the row with the fewest number of fields.
        fieldData = _.sortBy(fieldData, function(item) { return _.size(item); });
        minimumFieldSelections = fieldData[0];
        // If we ended up finding something with "Units", we need to remove it
        // before continuing and then remember to force it later.
        if ('Units' in minimumFieldSelections) {
          forceUnit = minimumFieldSelections['Units'];
          delete minimumFieldSelections['Units'];
        }
      }

      // Ensure that we only force a unit on the initial load.
      if (!options.initial) {
        forceUnit = false;
      }

      // Now that we are all sorted, we notify the view that there is no headline,
      // and pass along the first row as the minimum field selections.
      this.onNoHeadlineData.notify({
        minimumFieldSelections: minimumFieldSelections,
        forceUnit: forceUnit
      });
    }
  };
};

indicatorModel.prototype = {
  initialise: function () {
    this.getData({
      initial: true
    });
  },
  getData: function () {
    this.getData();
  }
};
var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx, goal, title) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      mapOptions: {"tileURL":"https://api.mapbox.com/styles/v1/mobosse/cjzmrn62k0ek11cmgea7a1i1h/tiles/256/{z}/{x}/{y}?&access_token={accessToken}","tileOptions":{"id":"mapbox.light","accessToken":"pk.eyJ1IjoibW9ib3NzZSIsImEiOiJjanplNTNhMmQwMTFjM21wNHEzazRlejhwIn0.ecHE5G83cklfW5AXYjI_0A","attribution":"<a href=\"https://www.mapbox.com\">Mapbox</a> | <a href=\"https://www.bkg.bund.de\">&copy; GeoBasis-De / BKG 2019</a> | <a href=\"https://www.destatis.de/DE/Home/_inhalt.html\">&copy; Statistisches Bundesamt (Destatis), 2019</a>"},"colorRange":[["#FCE9EB","#F7BDC4","#F2929D","#ED6676","#E83A4F","#E5243B","#B71D2F","#891623","#5C0E18","#2E070C"],["#FCF8EB","#F7E9C2","#F2DB9A","#EDCD72","#E8BE49","#E5B735","#CEA530","#A08025","#735C1B","#453710"],["#EDF5EB","#C9E2C3","#A6CF9C","#82BC74","#5EA94C","#4C9F38","#3D7F2D","#2E5F22","#1E4016","#0F200B"],["#F9E8EA","#EEBAC0","#E28C96","#D65E6C","#CB3042","#C5192D","#9E1424","#760F1B","#4F0A12","#270509"],["#FFEBE9","#FFC4BC","#FF9D90","#FF7564","#FF4E37","#FF3A21","#CC2E1A","#992314","#66170D","#330C07"],["#E9F8FB","#BEEBF6","#93DEF0","#67D1EA","#3CC4E5","#26BDE2","#1E97B5","#177188","#0F4C5A","#08262D"],["#FFF9E7","#FEEDB6","#FEE185","#FDD554","#FCC923","#FCC30B","#CA9C09","#977507","#654E04","#322702"],["#F6E8EC","#E3BAC6","#D18CA1","#BE5E7B","#AB3055","#A21942","#821435","#610F28","#410A1A","#20050D"],["#FFF0E9","#FED2BE","#FEB492","#FE9666","#FD783B","#FD6925","#CA541E","#983F16","#652A0F","#331507"],["#FCE7F0","#F5B8D1","#EE89B3","#E75A95","#E02B76","#DD1367","#B10F52","#850B3E","#580829","#2C0415"],["#FFF5E6","#FEE2B3","#FECE80","#FEBA4D","#FDA71A","#FD9D00","#CA7E00","#985E00","#653F00","#331F00"],["#FAF5EA","#EFE0C0","#E4CC96","#D9B86C","#CEA342","#C9992D","#A17A24","#795C1B","#503D12","#281F09"],["#ECF2EC","#C5D8C7","#9FBFA2","#79A57C","#528B57","#3F7E44","#326536","#264C29","#19321B","#0D190E"],["#E7F5FB","#B6E0F4","#85CBEC","#54B6E4","#23A1DD","#0A97D9","#0879AE","#065B82","#043C57","#021E2B"],["#EEF9EA","#CCECBF","#ABE095","#89D36B","#67C640","#56C02B","#459A22","#34731A","#224D11","#112609"],["#E6F0F5","#B3D2E2","#80B4CE","#4D95BA","#1A77A7","#00689D","#00537E","#003E5E","#002A3F","#00151F"],["#E8EDF0","#BAC8D2","#8CA4B5","#5E7F97","#305A79","#19486A","#143A55","#0F2B40","#0A1D2A","#050E15"]],"noValueColor":"#f0f0f0"},
      mapLayers: [{"min_zoom":5,"max_zoom":15,"serviceUrl":"https://g205sdgs.github.io/sdg-indicators/assets/maps/Ländergrenzen_ohne_Seegrenzen.geojson","nameProperty":"GEN","idProperty":"AGS","staticBorders":false}],
      goal: goal,
      title: title
    });
  };
};
var indicatorView = function (model, options) {

  "use strict";

  var view_obj = this;
  this._model = model;

  this._chartInstance = undefined;
  this._rootElement = options.rootElement;
  this._tableColumnDefs = options.tableColumnDefs;
  this._mapView = undefined;
  this._legendElement = options.legendElement;

  var chartHeight = screen.height < options.maxChartHeight ? screen.height : options.maxChartHeight;

  $('.plot-container', this._rootElement).css('height', chartHeight + 'px');

  $(document).ready(function() {
    $(view_obj._rootElement).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      if($(e.target).attr('href') == '#tableview') {
        setDataTableWidth($(view_obj._rootElement).find('#selectionsTable table'));
      } else {
        $($.fn.dataTable.tables(true)).css('width', '100%');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
      }
    });

    $(view_obj._legendElement).on('click', 'li', function(e) {
      $(this).toggleClass('notshown');

      var ci = view_obj._chartInstance,
          index = $(this).data('datasetindex'),
          meta = ci.getDatasetMeta(index);

      meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
      ci.update();
    });

    // Provide the hide/show functionality for the sidebar.
    $('.data-view .nav-link').on('click', function(e) {
      var $sidebar = $('#indicator-sidebar'),
          $main = $('#indicator-main'),
          hideSidebar = $(this).data('no-disagg'),
          mobile = window.matchMedia("screen and (max-width: 990px)");
      if (hideSidebar) {
        $sidebar.addClass('indicator-sidebar-hidden');
        $main.addClass('indicator-main-full');
        // On mobile, this can be confusing, so we need to scroll to the tabs.
        if (mobile.matches) {
          $([document.documentElement, document.body]).animate({
            scrollTop: $("#indicator-main").offset().top - 40
          }, 400);
        }
      }
      else {
        $sidebar.removeClass('indicator-sidebar-hidden');
        $main.removeClass('indicator-main-full');
      }
    });
  });

  this._model.onDataComplete.attach(function (sender, args) {

    if(view_obj._model.showData) {

      $('#dataset-size-warning')[args.datasetCountExceedsMax ? 'show' : 'hide']();

      if(!view_obj._chartInstance) {
        view_obj.createPlot(args);
      } else {
        view_obj.updatePlot(args);
      }
    }

    view_obj.createSelectionsTable(args);
  });

  this._model.onNoHeadlineData.attach(function(sender, args) {
    // Force a unit if necessary.
    if (args && args.forceUnit) {
      $('#units input[type="radio"]')
        .filter('[value="' + args.forceUnit + '"]')
        .first()
        .click();
    }
    // Force particular minimum field selections if necessary. We have to delay
    // this slightly to make it work...
    if (args && args.minimumFieldSelections && _.size(args.minimumFieldSelections)) {
      function getClickFunction(fieldToSelect, fieldValue) {
        return function() {
          $('#fields .variable-options input[type="checkbox"]')
            .filter('[data-field="' + fieldToSelect + '"]')
            .filter('[value="' + fieldValue + '"]')
            .filter(':not(:checked)')
            .first()
            .click();
        }
      }
      for (var fieldToSelect in args.minimumFieldSelections) {
        var fieldValue = args.minimumFieldSelections[fieldToSelect];
        setTimeout(getClickFunction(fieldToSelect, fieldValue), 500);
      }
    }
    else {
      // Fallback behavior - just click on the first one, whatever it is.
      // Also needs to be delayed...
      setTimeout(function() {
        $('#fields .variable-options :checkbox:eq(0)').trigger('click');
      }, 500);
    }
  });

  this._model.onSeriesComplete.attach(function(sender, args) {
    view_obj.initialiseSeries(args);

    //--------------------------------
    if (args.indicatorId.includes('_1-')){var goalNr = 0;}
    else if (args.indicatorId.includes('_2-')) {var goalNr = 1;}
    else if (args.indicatorId.includes('_3-')) {var goalNr = 2;}
    else if (args.indicatorId.includes('_4-')) {var goalNr = 3;}
    else if (args.indicatorId.includes('_5-')) {var goalNr = 4;}
    else if (args.indicatorId.includes('_6-')) {var goalNr = 5;}
    else if (args.indicatorId.includes('_7-')) {var goalNr = 6;}
    else if (args.indicatorId.includes('_8-')) {var goalNr = 7;}
    else if (args.indicatorId.includes('_9-')) {var goalNr = 8;}
    else if (args.indicatorId.includes('_10-')) {var goalNr = 9;}
    else if (args.indicatorId.includes('_11-')) {var goalNr = 10;}
    else if (args.indicatorId.includes('_12-')) {var goalNr = 11;}
    else if (args.indicatorId.includes('_13-')) {var goalNr = 12;}
    else if (args.indicatorId.includes('_14-')) {var goalNr = 13;}
    else if (args.indicatorId.includes('_15-')) {var goalNr = 14;}
    else if (args.indicatorId.includes('_16-')) {var goalNr = 15;}
    else if (args.indicatorId.includes('_17-')) {var goalNr = 16;}

    if(args.hasGeoData && args.showMap) {
      view_obj._mapView = new mapView();
      view_obj._mapView.initialise(args.geoData, args.geoCodeRegEx, goalNr, args.title);
    }
  });

  this._model.onSeriesSelectedChanged.attach(function(sender, args) {
    // var selector;
    // if (args.series.length === view_obj._fieldLimit) {
    //   selector = $('#fields input:not(:checked)');
    //   selector.attr('disabled', true);
    //   selector.parent().addClass('disabled').attr('title', 'Maximum of ' + view_obj._fieldLimit + ' selections; unselect another to select this field');
    // } else {
    //   selector = $('#fields input');
    //   selector.removeAttr('disabled');
    //   selector.parent().removeClass('disabled').removeAttr('title');
    // }
  });

  this._model.onUnitsComplete.attach(function(sender, args) {
    view_obj.initialiseUnits(args);
  });

  this._model.onUnitsSelectedChanged.attach(function(sender, args) {
    // update the plot's y axis label
    // update the data
  });

  this._model.onFieldsCleared.attach(function(sender, args) {
    $(view_obj._rootElement).find(':checkbox').prop('checked', false);
    $(view_obj._rootElement).find('#clear').addClass('disabled');

    // reset available/unavailable fields
    updateWithSelectedFields();

    // #246
    $(view_obj._rootElement).find('.selected').css('width', '0');
    // end of #246
  });

  this._model.onSelectionUpdate.attach(function(sender, args) {
    $(view_obj._rootElement).find('#clear')[args.selectedFields.length ? 'removeClass' : 'addClass']('disabled');

    // loop through the available fields:
    $('.variable-selector').each(function(index, element) {
      var currentField = $(element).data('field');

      // any info?
      var match = _.findWhere(args.selectedFields, { field : currentField });
      var element = $(view_obj._rootElement).find('.variable-selector[data-field="' + currentField + '"]');
      var width = match ? (Number(match.values.length / element.find('.variable-options label').length) * 100) + '%' : '0';

      $(element).find('.bar .selected').css('width', width);

      // is this an allowed field:
      $(element)[_.contains(args.allowedFields, currentField) ? 'removeClass' : 'addClass']('disallowed');
    });
  });

  this._model.onFieldsStatusUpdated.attach(function (sender, args) {
    //console.log('updating field states with: ', args);

    // reset:
    $(view_obj._rootElement).find('label').removeClass('selected possible excluded');

    _.each(args.data, function(fieldGroup) {
      _.each(fieldGroup.values, function(fieldItem) {
        var element = $(view_obj._rootElement).find(':checkbox[value="' + fieldItem.value + '"][data-field="' + fieldGroup.field + '"]');
        element.parent().addClass(fieldItem.state).attr('data-has-data', fieldItem.hasData);
      });
      // Indicate whether the fieldGroup had any data.
      var fieldGroupElement = $(view_obj._rootElement).find('.variable-selector[data-field="' + fieldGroup.field + '"]');
      fieldGroupElement.attr('data-has-data', fieldGroup.hasData);

      // Re-sort the items.
      view_obj.sortFieldGroup(fieldGroupElement);
    });

    _.each(args.selectionStates, function(ss) {
      // find the appropriate 'bar'
      var element = $(view_obj._rootElement).find('.variable-selector[data-field="' + ss.field + '"]');
      element.find('.bar .default').css('width', ss.fieldSelection.defaultState + '%');
      element.find('.bar .possible').css('width', ss.fieldSelection.possibleState + '%');
      element.find('.bar .excluded').css('width', ss.fieldSelection.excludedState + '%');
    });
  });

  $(this._rootElement).on('click', '#clear', function() {
    view_obj._model.clearSelectedFields();
  });

  $(this._rootElement).on('click', '#fields label', function (e) {

    if(!$(this).closest('.variable-options').hasClass('disallowed')) {
      $(this).find(':checkbox').trigger('click');
    }

    e.preventDefault();
    e.stopPropagation();
  });

  $(this._rootElement).on('change', '#units input', function() {
    view_obj._model.updateSelectedUnit($(this).val());
  });

  // generic helper function, used by clear all/select all and individual checkbox changes:
  var updateWithSelectedFields = function() {
    view_obj._model.updateSelectedFields(_.chain(_.map($('#fields input:checked'), function (fieldValue) {
      return {
        value: $(fieldValue).val(),
        field: $(fieldValue).data('field')
      };
    })).groupBy('field').map(function(value, key) {
      return {
        field: key,
        values: _.pluck(value, 'value')
      };
    }).value());
  }

  $(this._rootElement).on('click', '.variable-options button', function(e) {
    var type = $(this).data('type');
    var $options = $(this).closest('.variable-options').find(':checkbox');

    // The clear button can clear all checkboxes.
    if (type == 'clear') {
      $options.prop('checked', false);
    }
    // The select button must only select checkboxes that have data.
    if (type == 'select') {
      $options.parent().not('[data-has-data=false]').find(':checkbox').prop('checked', true)
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', ':checkbox', function(e) {

    // don't permit excluded selections:
    if($(this).parent().hasClass('excluded') || $(this).closest('.variable-selector').hasClass('disallowed')) {
      return;
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', '.variable-selector', function(e) {
    var currentSelector = e.target;

    var currentButton = getCurrentButtonFromCurrentSelector(currentSelector);

    var options = $(this).find('.variable-options');
    var optionsAreVisible = options.is(':visible');
    $(options)[optionsAreVisible ? 'hide' : 'show']();
    currentButton.setAttribute("aria-expanded", optionsAreVisible ? "true" : "false");

    var optionsVisibleAfterClick = options.is(':visible');
    currentButton.setAttribute("aria-expanded", optionsVisibleAfterClick ? "true" : "false");

    e.stopPropagation();
  });

  function getCurrentButtonFromCurrentSelector(currentSelector){
    if(currentSelector.tagName === "H5"){
      return currentSelector.parentElement;
    }
    else if(currentSelector.tagName === "BUTTON"){
      return currentSelector;
    }
  }

  this.initialiseSeries = function(args) {
    if(args.series.length) {
      var template = _.template($("#item_template").html());

      if(!$('button#clear').length) {
        $('<button id="clear" class="disabled">' + translations.indicator.clear_selections + ' <i class="fa fa-remove"></i></button>').insertBefore('#fields');
      }

      $('#fields').html(template({
        series: args.series,
        allowedFields: args.allowedFields,
        edges: args.edges
      }));

      $(this._rootElement).removeClass('no-series');

    } else {
      $(this._rootElement).addClass('no-series');
    }
  };

  this.initialiseUnits = function(args) {
    var template = _.template($('#units_template').html()),
        units = args.units || [],
        selectedUnit = args.selectedUnit || null;

    $('#units').html(template({
      units: units,
      selectedUnit: selectedUnit
    }));

    if(!units.length) {
      $(this._rootElement).addClass('no-units');
    }
  };

  this.updatePlot = function(chartInfo) {
    view_obj._chartInstance.data.datasets = chartInfo.datasets;

    if(chartInfo.selectedUnit) {
      view_obj._chartInstance.options.scales.yAxes[0].scaleLabel.labelString = translations.t(chartInfo.selectedUnit);
    }

    // Create a temp object to alter, and then apply. We go to all this trouble
    // to avoid completely replacing view_obj._chartInstance -- and instead we
    // just replace it's properties: "type", "data", and "options".
    var updatedConfig = opensdg.chartConfigAlter({
      type: view_obj._chartInstance.type,
      data: view_obj._chartInstance.data,
      options: view_obj._chartInstance.options
    });
    view_obj._chartInstance.type = updatedConfig.type;
    view_obj._chartInstance.data = updatedConfig.data;
    view_obj._chartInstance.options = updatedConfig.options;

    view_obj._chartInstance.update(1000, true);

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
  };


  this.createPlot = function (chartInfo) {

    var that = this;

    var chartConfig = {
      type: this._model.graphType,
      data: chartInfo,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
        scrollX: true,
        scrollCollapse: true,
        sScrollXInner: '150%',
        scales: {
          xAxes: [{
            maxBarThickness: 150,
            gridLines: {
              color: '#ddd',
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0
            },
            scaleLabel: {
              display: this._model.selectedUnit ? translations.t(this._model.selectedUnit) : this._model.measurementUnit,
              labelString: this._model.selectedUnit ? translations.t(this._model.selectedUnit) : this._model.measurementUnit
            }
          }]
        },
        legendCallback: function(chart) {
            var text = ['<ul id="legend">'];

            _.each(chart.data.datasets, function(dataset, datasetIndex) {
              text.push('<li data-datasetindex="' + datasetIndex + '">');
              if (dataset.label.substr(0,4) == 'Ziel' || dataset.label.substr(0,6) == 'Target'){
                text.push('<span class="swatchTgt' + '" style="background-color: ' + dataset.backgroundColor + '">');
              }
              else{
                text.push('<span class="swatchTsr' + (dataset.borderDash ? ' dashed' : '') + '" style="background-color: ' + dataset.backgroundColor + '">');
              }

              text.push('</span>');
              text.push(translations.t(dataset.label));
              text.push('</li>');
            });

            text.push('</ul>');
            return text.join('');
        },
        legend: {
          display: false,
        },
        title: {
          display: false
        },
        plugins: {
          scaler: {}
        }
      }
    };
    chartConfig = opensdg.chartConfigAlter(chartConfig);


    this._chartInstance = new Chart($(this._rootElement).find('canvas'), chartConfig);

    Chart.pluginService.register({
      afterDraw: function(chart) {
        var $canvas = $(that._rootElement).find('canvas'),
        font = '12px Arial',
        canvas = $canvas.get(0),
        textRowHeight = 20,
        ctx = canvas.getContext("2d");

        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#6e6e6e';
      }
    });

    this.createTableFooter('selectionChartFooter', chartInfo.footerFields, '#chart-canvas');
    this.createDownloadButton(chartInfo.selectionsTable, 'Chart', chartInfo.indicatorId, '#selectionsChart');
    this.createSourceButton(chartInfo.shortIndicatorId, '#selectionsChart');

    $("#btnSave").click(function() {
      var filename = chartInfo.indicatorId + '.png',
          element = document.getElementById('chart-canvas'),
          height = element.clientHeight + 25,
          width = element.clientWidth + 25;
      var options = {
        // These options fix the height, width, and position.
        height: height,
        width: width,
        windowHeight: height,
        windowWidth: width,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        // Allow a chance to alter the screenshot's HTML.
        onclone: function(clone) {
          // Add a body class so that the screenshot style can be custom.
          clone.body.classList.add('image-download-in-progress');
        },
        // Decide which elements to skip.
        ignoreElements: function(el) {
          // Keep all style, head, and link elements.
          var keepTags = ['STYLE', 'HEAD', 'LINK'];
          if (keepTags.indexOf(el.tagName) !== -1) {
            return false;
          }
          // Keep all elements contained by (or containing) the screenshot
          // target element.
          if (element.contains(el) || el.contains(element)) {
            return false;
          }
          // Leave out everything else.
          return true;
        }
      };
      // First convert the target to a canvas.
      html2canvas(element, options).then(function(canvas) {
        // Then download that canvas as a PNG file.
        canvas.toBlob(function(blob) {
          saveAs(blob, filename);
        });
      });
    });

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
  };

  this.toCsv = function (tableData) {
    var lines = [],
    headings = _.map(tableData.headings, function(heading) { return '"' + translations.t(heading) + '"'; });

    lines.push(headings.join(','));

    _.each(tableData.data, function (dataValues) {
      var line = [];

      _.each(headings, function (heading, index) {
        line.push(dataValues[index]);
      });

      lines.push(line.join(','));
    });

    return lines.join('\n');
  };

  var setDataTableWidth = function(table) {
    table.find('thead th').each(function() {
      var textLength = $(this).text().length;
      for(var loop = 0; loop < view_obj._tableColumnDefs.length; loop++) {
        var def = view_obj._tableColumnDefs[loop];
        if(textLength < def.maxCharCount) {
          if(!def.width) {
            $(this).css('white-space', 'nowrap');
          } else {
            $(this).css('width', def.width + 'px');
            $(this).data('width', def.width);
          }
          break;
        }
      }
    });

    table.removeAttr('style width');

    var totalWidth = 0;
    table.find('thead th').each(function() {
      if($(this).data('width')) {
        totalWidth += $(this).data('width');
      } else {
        totalWidth += $(this).width();
      }
    });

    // ascertain whether the table should be width 100% or explicit width:
    var containerWidth = table.closest('.dataTables_wrapper').width();

    if(totalWidth > containerWidth) {
      table.css('width', totalWidth + 'px');
    } else {
      table.css('width', '100%');
    }
  };

  var initialiseDataTable = function(el) {
    var datatables_options = options.datatables_options || {
      paging: false,
      bInfo: false,
      bAutoWidth: false,
      searching: false,
      responsive: false,
      order: [[0, 'asc']]
    }, table = $(el).find('table');

    datatables_options.aaSorting = [];

    table.DataTable(datatables_options);

    setDataTableWidth(table);
  };

  this.createSelectionsTable = function(chartInfo) {
    this.createTable(chartInfo.selectionsTable, chartInfo.indicatorId, '#selectionsTable', true);
    this.createTableFooter('selectionTableFooter', chartInfo.footerFields, '#selectionsTable');
    this.createDownloadButton(chartInfo.selectionsTable, 'Table', chartInfo.indicatorId, '#selectionsTable');
    this.createSourceButton(chartInfo.shortIndicatorId, '#selectionsTable');
  };


  this.createDownloadButton = function(table, name, indicatorId, el) {
    if(window.Modernizr.blobconstructor) {
      var downloadKey = 'download_csv';
      if (name == 'Chart') {
        downloadKey = 'download_chart';
      }
      if (name == 'Table') {
        downloadKey = 'download_table';
      }
      var gaLabel = 'Download ' + name + ' CSV: ' + indicatorId.replace('indicator_', '');
      $(el).append($('<a />').text(translations.indicator[downloadKey])
      .attr(opensdg.autotrack('download_data_current', 'Downloads', 'Download CSV', gaLabel))
      .attr({
        'href': URL.createObjectURL(new Blob([this.toCsv(table)], {
          type: 'text/csv'
        })),
        'download': indicatorId + '.csv',
        'title': translations.indicator.download_csv_title,
        'class': 'btn btn-primary btn-download',
        'tabindex': 0
      })
      .data('csvdata', this.toCsv(table)));
    } else {
      var headlineId = indicatorId.replace('indicator', 'headline');
      var id = indicatorId.replace('indicator_', '');
      var gaLabel = 'Download Headline CSV: ' + id;
      $(el).append($('<a />').text(translations.indicator.download_headline)
      .attr(opensdg.autotrack('download_data_headline', 'Downloads', 'Download CSV', gaLabel))
      .attr({
        'href': opensdg.remoteDataBaseUrl + '/headline/' + id + '.csv',
        'download': headlineId + '.csv',
        'title': translations.indicator.download_headline_title,
        'class': 'btn btn-primary btn-download',
        'tabindex': 0
      }));
    }
  }

  this.createSourceButton = function(indicatorId, el) {
    var gaLabel = 'Download Source CSV: ' + indicatorId;
    $(el).append($('<a />').text(translations.indicator.download_source)
    .attr(opensdg.autotrack('download_data_source', 'Downloads', 'Download CSV', gaLabel))
    .attr({
      'href': opensdg.remoteDataBaseUrl + '/data/' + indicatorId + '.csv',
      'download': indicatorId + '.csv',
      'title': translations.indicator.download_source_title,
      'class': 'btn btn-primary btn-download',
      'tabindex': 0
    }));
  }

  this.createTable = function(table, indicatorId, el) {

    options = options || {};
    var that = this,
    csv_path = options.csv_path,
    allow_download = options.allow_download || false,
    csv_options = options.csv_options || {
      separator: ',',
      delimiter: '"'
    },
    table_class = options.table_class || 'table table-hover';

    // clear:
    $(el).html('');

    if(table && table.data.length) {
      var currentTable = $('<table />').attr({
        'class': /*'table-responsive ' +*/ table_class,
        'width': '100%'
        //'id': currentId
      });

      currentTable.append('<caption>' + that._model.chartTitle + '</caption>');

      var table_head = '<thead><tr>';

      var getHeading = function(heading, index) {
        var span = '<span class="sort" />';
        var span_heading = '<span>' + translations.t(heading) + '</span>';
        return (!index || heading.toLowerCase() == 'units') ? span_heading + span : span + span_heading;
      };

      table.headings.forEach(function (heading, index) {
        table_head += '<th' + (!index || heading.toLowerCase() == 'units' ? '': ' class="table-value"') + ' scope="col">' + getHeading(heading, index) + '</th>';
      });

      table_head += '</tr></thead>';
      currentTable.append(table_head);
      currentTable.append('<tbody></tbody>');

      table.data.forEach(function (data) {
        var row_html = '<tr>';
        table.headings.forEach(function (heading, index) {
          // For accessibility set the Year column to a "row" scope th.
          var isYear = (index == 0 || heading.toLowerCase() == 'year');
          var isUnits = (heading.toLowerCase() == 'units');
          var cell_prefix = (isYear) ? '<th scope="row"' : '<td';
          var cell_suffix = (isYear) ? '</th>' : '</td>';
          row_html += cell_prefix + (isYear || isUnits ? '' : ' class="table-value"') + '>' + (data[index] !== null ? data[index] : '-') + cell_suffix;
        });
        row_html += '</tr>';
        currentTable.find('tbody').append(row_html);
      });

      $(el).append(currentTable);

      // initialise data table
      initialiseDataTable(el);

    } else {
      $(el).append($('<p />').text('There is no data for this breakdown.'));
    }
  };

  this.createTableFooter = function(divid, footerFields, el) {
    var footdiv = $('<div />').attr({
      'id': divid,
      'class': 'table-footer-text'
    });

    _.each(footerFields, function(val, key) {
      footdiv.append($('<p />').text(key + ': ' + val));
    });

    $(el).append(footdiv);
  };


  this.sortFieldGroup = function(fieldGroupElement) {
    var sortLabels = function(a, b) {
      var aObj = { hasData: $(a).attr('data-has-data'), text: $(a).text() };
      var bObj = { hasData: $(b).attr('data-has-data'), text: $(b).text() };
      if (aObj.hasData == bObj.hasData) {
        return (aObj.text > bObj.text) ? 1 : -1;
      }
      return (aObj.hasData < bObj.hasData) ? 1 : -1;
    };
    fieldGroupElement.find('label')
    .sort(sortLabels)
    .appendTo(fieldGroupElement.find('#indicatorData .variable-options'));
  }
};
var indicatorController = function (model, view) {
  this._model = model;
  this._view = view;
};

indicatorController.prototype = {
  initialise: function () {
    this._model.initialise();
  }
};
var indicatorSearch = function(inputElement, indicatorDataStore) {
  that = this;
  this.inputElement = inputElement;
  this.indicatorDataStore = indicatorDataStore;
  this.indicatorData = [];
  this.hasErrored = false;

  this.processData = function(data) {
    for(var goalLoop = 0; goalLoop < data.length; goalLoop++) {
      for(var indicatorLoop = 0; indicatorLoop < data[goalLoop].goal.indicators.length; indicatorLoop++) {
        var currentIndicator = data[goalLoop].goal.indicators[indicatorLoop];
        currentIndicator.goalId = data[goalLoop].goal.id;
        currentIndicator.goalTitle = data[goalLoop].goal.title;
        that.indicatorData.push(currentIndicator);
      }
    }
  };

  this.inputElement.keyup(function(e) {
    var searchValue = that.inputElement.val();
    if(e.keyCode === 13 && searchValue.length) {
      window.location.replace(that.inputElement.data('pageurl') + searchValue);
    }
  });
  
  $("#search-btn").click(function() {
    var searchValue = that.inputElement.val();
    if(searchValue.length) {
      window.location.replace(that.inputElement.data('pageurl') + searchValue);
    }
  });

  var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&");
  };

  if($('#main-content').hasClass('search-results')) {

    var results = [],
        that = this,
        searchString = decodeURIComponent(location.search.substring(1)).replace("q=", "");

    // we got here because of a redirect, so reinstate:
    this.inputElement.val(searchString);

    $('#main-content h1 span').text(searchString);
    $('#main-content h1').show();

    this.indicatorDataStore.getData().then(function(data) {

      that.processData(data);

      var searchResults = _.filter(that.indicatorData, function(indicator) {
        return indicator.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.description.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.keywords.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
      });

      // goal
      //    indicators
      // goal
      //    indicators

      _.each(searchResults, function(result) {
        var goal = _.findWhere(results, { goalId: result.goalId }),
            indicator = {
              parsedTitle: result.title.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedDescription: result.description.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedKeywords: result.keywords.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              hasKeywords: result.keywords && result.keywords.length,
              hasDescription: result.description && result.description.length,
              id: result.id,
              title: result.title,
              href: result.href,
              status: result.status
            };

        if(!goal) {
          results.push({
            goalId: result.goalId,
            goalTitle: result.goalTitle,
            indicators: [indicator]
          });
        } else {
          goal.indicators.push(indicator);
        }
      });

      $('.loader').hide();

      var template = _.template(
        $("script.results").html()
      );

      $('div.results').html(template({
        searchResults: results,
        resultsCount: searchResults.length,
        imgPath: $('.results').data('imgpath')
      }));
    });
  }
};

indicatorSearch.prototype = {

};

$(function() {

  var $el = $('#indicator_search');
  new indicatorSearch($el, new indicatorDataStore($el.data('url')));

  $('#jump-to-search').show();
  $('#jump-to-search a').click(function() {
    if($el.is(':hidden')) {
      $('.navbar span[data-target="search"]').click();
    }
    $el.focus();
  });


});

$(function() {

  var topLevelSearchLink = $('.top-level span:eq(1), .top-level button:eq(1)');

  var resetForSmallerViewport = function() {
    topLevelSearchLink.text('Search');
    $('.top-level li').removeClass('active');
    $('.top-level span').removeClass('open');
  };  
  
  var topLevelMenuToggle = document.querySelector("#menuToggle");
  
  topLevelMenuToggle.addEventListener("click", function(){
    setTopLevelMenuAccessibilityActions();
  });
  function setTopLevelMenuAccessibilityActions(){
    if(topLevelMenuIsOpen()){
      setAriaExpandedStatus(true);
      focusOnFirstMenuElement();
    }
    else{
      setAriaExpandedStatus(false);
    }
    function topLevelMenuIsOpen(){
      return topLevelMenuToggle.classList.contains("active");
    }
    function setAriaExpandedStatus(expandedStatus){
      topLevelMenuToggle.setAttribute("aria-expanded", expandedStatus.toString());
    }
    function focusOnFirstMenuElement(){
      var firstMenuElement = getFirstMenuElement();
      firstMenuElement.focus();
    }
    function getFirstMenuElement(){
      return document.querySelector("#menu .nav-link:first-child a");
    }
  }

  $('.top-level span, .top-level button').click(function() {
    var target = $(this).data('target');

    $('.top-level li').removeClass('active');
    topLevelSearchLink.text('Search');

    var targetEl = $('#' + target);
    var wasVisible = targetEl.is(':visible');

    // hide everything:
    $('.menu-target').hide();
    $(".top-level li button[data-target='" + target + "']").attr("aria-expanded", "false");

    if(target === 'search') {
      $(this).toggleClass('open');
      
      if($(this).hasClass('open') || !wasVisible) {
        $(this).text('Hide');
      } else {
        $(this).text('Search');
      }
    } else {
      // menu click, always hide search:
      topLevelSearchLink.removeClass('open');
      topLevelSearchLink.text('Search');
    }

    if(!wasVisible) {
      targetEl.show();
      $(".top-level li button[data-target='" + target + "']").attr("aria-expanded", "true");
      $(this).parent().addClass('active');
    }
  });

  $(window).on('resize', function(e) {
    var viewportWidth = window.innerWidth,
        previousWidth = $('body').data('vwidth'),
        breakpointWidth = 768;

    if(viewportWidth > breakpointWidth && previousWidth <= breakpointWidth) {
      // switched to larger viewport:
      $('.menu-target').show();
    } else if(previousWidth >= breakpointWidth && viewportWidth < breakpointWidth) {
      // switched to smaller viewport:
      $('.menu-target').hide();
      resetForSmallerViewport();
    }

    // update the viewport width:
    $('body').data('vwidth', viewportWidth);
  });
});
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},a=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},c=function(t,e){if(""===e)throw new a("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(t,e)},l=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;s>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",""+this)}},u=l[n]=[],h=function(){return new l(this)};if(a[n]=Error[n],u.item=function(t){return this[t]||null},u.contains=function(t){return t+="",-1!==c(this,t)},u.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",-1===c(this,t)&&(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},u.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do for(t=n[i]+"",e=c(this,t);-1!==e;)this.splice(e,1),r=!0,e=c(this,t);while(++i<s);r&&this._updateClassName()},u.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},u.toString=function(){return this.join(" ")},s.defineProperty){var f={get:h,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,f)}catch(g){(void 0===g.number||-2146823252===g.number)&&(f.enumerable=!1,s.defineProperty(i,e,f))}}else s[n].__defineGetter__&&i.__defineGetter__(e,h)}}(self),function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}());/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-blobconstructor-localstorage-setclasses !*/
 !function(e,n,o){function s(e,n){return typeof e===n}function t(){var e,n,o,t,a,l,c;for(var f in i)if(i.hasOwnProperty(f)){if(e=[],n=i[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(t=s(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)l=e[a],c=l.split("."),1===c.length?Modernizr[c[0]]=t:(!Modernizr[c[0]]||Modernizr[c[0]]instanceof Boolean||(Modernizr[c[0]]=new Boolean(Modernizr[c[0]])),Modernizr[c[0]][c[1]]=t),r.push((t?"":"no-")+c.join("-"))}}function a(e){var n=c.className,o=Modernizr._config.classPrefix||"";if(f&&(n=n.baseVal),Modernizr._config.enableJSClass){var s=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");n=n.replace(s,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(n+=" "+o+e.join(" "+o),f?c.className.baseVal=n:c.className=n)}var r=[],i=[],l={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var o=this;setTimeout(function(){n(o[e])},0)},addTest:function(e,n,o){i.push({name:e,fn:n,options:o})},addAsyncTest:function(e){i.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr,Modernizr.addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}});var c=n.documentElement,f="svg"===c.nodeName.toLowerCase();t(),a(r),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);/*
 * Leaflet download map.
 *
 * This is a Leaflet control for downloading the current GeoJSON layer.
 */
(function () {
  "use strict";

  L.Control.DownloadGeoJson = L.Control.extend({

    initialize: function(plugin) {
      this.plugin = plugin;
      this.setPosition('topleft');
    },

    onAdd: function() {
      var div = L.DomUtil.create('div', 'download-geojson leaflet-bar');
      div.innerHTML = '<a id="download-geojson-anchor-elem" style="display:none;"></a>';
      var trigger = L.DomUtil.create('a', 'download-geojson-button leaflet-bar-part', div);
      trigger.innerHTML = '<i aria-hidden title="Download" class="fa fa-download"></i>' +
        '<span class="visuallyhidden">Download</span>';
      var plugin = this.plugin;
      L.DomEvent.on(trigger, 'click', (function(e) {
        e.preventDefault();
        e.stopPropagation();
        plugin.getVisibleLayers().eachLayer(function(layer) {
          var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(layer.geoJsonObject));
          var dlAnchorElem = document.getElementById('download-geojson-anchor-elem');
          dlAnchorElem.setAttribute('href', dataStr);
          dlAnchorElem.setAttribute('download', 'map.geo.json');
          dlAnchorElem.click();
        });
      }));

      return div;
    },

  });

  // Factory function for this class.
  L.Control.downloadGeoJson = function(plugin) {
    return new L.Control.DownloadGeoJson(plugin);
  };
}());

/*
 * Leaflet selection legend.
 *
 * This is a Leaflet control designed to keep track of selected layers on a map
 * and visualize the selections as stacked bar graphs.
 */
(function () {
  "use strict";

  L.Control.SelectionLegend = L.Control.extend({

    initialize: function(plugin) {
      this.selections = [];
      this.plugin = plugin;
    },

    addSelection: function(selection) {
      this.selections.push(selection);
      this.update();
    },

    removeSelection: function(selection) {
      var index = this.selections.indexOf(selection);
      this.selections.splice(index, 1);
      this.update();
    },

    isSelected: function(selection) {
      return (this.selections.indexOf(selection) !== -1);
    },

    onAdd: function() {
      var controlTpl = '<span id="mapHead">{title}</span>' +//<<<----------------
        '<ul id="selection-list"></ul>' +
        '<div class="legend-swatches">' + //bar
          '{legendSwatches}' +
        '</div>' +
        '<div class="legend-values">' + //values
          '<span class="legend-value left">{lowValue}</span>' +
          '<span class="arrow left"></span>' +
          '<span class="legend-value right">{highValue}</span>' +
          '<span class="arrow right"></span>' +
        '</div>';
      var swatchTpl = '<span class="legend-swatch" style="width:{width}%; background:{color};"></span>';
      var swatchWidth = 100 / this.plugin.options.colorRange[this.plugin.goalNr].length;
      var swatches = this.plugin.options.colorRange[this.plugin.goalNr].map(function(swatchColor) {
        return L.Util.template(swatchTpl, {
          width: swatchWidth,
          color: swatchColor,
        });
      }).join('');
      var div = L.DomUtil.create('div', 'selection-legend');

      //-----------------------------------------------------------------------



      var headline = this.plugin.title
      if (this.plugin.timeSeriesName){
        headline += ', <br>' + this.plugin.timeSeriesName;
      }
      if (this.plugin.sexName){
        headline += ', <br>' + this.plugin.sexName;
      }
      if (this.plugin.ageName){
        headline += ', <br>' + this.plugin.ageName;
      }
      if (this.plugin.typificationName){
        headline += ', <br>' + this.plugin.typificationName;
      }
      if (this.plugin.criminalOffenceName){
        headline += ', <br>' + this.plugin.criminalOffenceName;
      }
      headline += ', <br>' + this.plugin.unitName;


      //-----------------------------------------------------------------------

      div.innerHTML = L.Util.template(controlTpl, {
        lowValue: this.plugin.valueRange[0],
        highValue: this.plugin.valueRange[1],
        legendSwatches: swatches,

        //---
        title: headline,
        //---

      });
      return div;
    },

    update: function() {
      var selectionList = L.DomUtil.get('selection-list');
      var selectionTpl = '' +
        '<li class="{valueStatus}">' +
          '<span class="selection-name">{name}</span>' +
          //'<span class="selection-value" style="left: {percentage}%;">{value}</span>' +
          '<span class="selection-bar" style="width: {percentage}%;"></span>' +
          '<i class="selection-close fa fa-remove"></i>' +
        '</li>';
      var plugin = this.plugin;
      var valueRange = this.plugin.valueRange;
      selectionList.innerHTML = this.selections.map(function(selection) {
        var value = plugin.getData(selection.feature.properties);
        var percentage, valueStatus;
        if (value) {
          valueStatus = 'has-value';
          var fraction = (value - valueRange[0]) / (valueRange[1] - valueRange[0]);
          percentage = Math.round(fraction * 100);
        }
        else {
          value = '';
          valueStatus = 'no-value';
          percentage = 0;
        }
        return L.Util.template(selectionTpl, {
          name: selection.feature.properties.name,
          valueStatus: valueStatus,
          percentage: percentage,
          value: value,
        });
      }).join('');

      // Assign click behavior.
      var control = this;
      $('#selection-list li').click(function(e) {
        var index = $(e.target).closest('li').index()
        var selection = control.selections[index];
        control.removeSelection(selection);
        control.plugin.unhighlightFeature(selection);
      });
    }

  });

  // Factory function for this class.
  L.Control.selectionLegend = function(plugin) {
    return new L.Control.SelectionLegend(plugin);
  };
}());
/*
 * Leaflet year Slider.
 *
 * This is merely a specific configuration of Leaflet of L.TimeDimension.
 * See here: https://github.com/socib/Leaflet.TimeDimension
 */
(function () {
  "use strict";

  var defaultOptions = {
    // YearSlider options.
    yearChangeCallback: null,
    years: [],
    // TimeDimensionControl options.
    timeSliderDragUpdate: true,
    speedSlider: false,
    position: 'bottomleft',
    // Player options.
    playerOptions: {
      transitionTime: 1000,
      loop: false,
      startOver: true
    },
  };

  L.Control.YearSlider = L.Control.TimeDimension.extend({

    // Hijack the displayed date format.
    _getDisplayDateFormat: function(date){
      return date.getFullYear();
    }

  });

  // Helper function to compose the full widget.
  L.Control.yearSlider = function(options) {
    // Extend the defaults.
    options = L.Util.extend(defaultOptions, options);
    // Hardcode the timeDimension to year intervals.
    options.timeDimension = new L.TimeDimension({
      // We pad our years to at least January 2nd, so that timezone issues don't
      // cause any problems. This converts the array of years into a comma-
      // delimited string of YYYY-MM-DD dates.
      times: options.years.join('-01-02,') + '-01-02',
      currentTime: new Date(options.years[0] + '-01-02').getTime(),
    });
    // Create the player.
    options.player = new L.TimeDimension.Player(options.playerOptions, options.timeDimension);
    // Listen for time changes.
    if (typeof options.yearChangeCallback === 'function') {
      options.timeDimension.on('timeload', options.yearChangeCallback);
    };
    // Return the control.
    return new L.Control.YearSlider(options);
  };
}());
function initialiseGoogleAnalytics(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    sendPageviewToGoogleAnalytics();
}

function sendPageviewToGoogleAnalytics(){
    ga('create', '', 'auto');
    ga('require', 'eventTracker', {
        attributePrefix: 'data-'
    });
    // anonymize user IPs (chops off the last IP triplet)
    ga('set', 'anonymizeIp', true);
    // forces SSL even if the page were somehow loaded over http://
    ga('set', 'forceSSL', true);
    ga('send', 'pageview');
}


