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
