/* */ 
var simpleLayoutHelper = require('./simpleLayoutHelper');
var simpleLayoutEdge = require('./simpleLayoutEdge');
module.exports = function(ecModel, api) {
  ecModel.eachSeriesByType('graph', function(seriesModel) {
    var layout = seriesModel.get('layout');
    var coordSys = seriesModel.coordinateSystem;
    if (coordSys && coordSys.type !== 'view') {
      var data = seriesModel.getData();
      data.each(coordSys.dimensions, function(x, y, idx) {
        if (!isNaN(x) && !isNaN(y)) {
          data.setItemLayout(idx, coordSys.dataToPoint([x, y]));
        } else {
          data.setItemLayout(idx, [NaN, NaN]);
        }
      });
      simpleLayoutEdge(data.graph);
    } else if (!layout || layout === 'none') {
      simpleLayoutHelper(seriesModel);
    }
  });
};
