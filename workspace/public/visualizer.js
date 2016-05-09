/*
d3.json("./custom.geo.json", function(json){
  var w = 1000;
  var h = 500;
  var projection = d3.geo.azimuthalEqualArea().translate([w/2,h/2]);
  var path = d3.geo.path().projection(projection);
  var svg = d3.select("body").append("svg")
                            .attr("width", w)
                            .attr("height", h);

  svg.selectAll("path")
  .data(json.features)
  .enter().append("path")
  .attr("d", path);
});

d3.csv("./apple.csv", function(error, data) {
  dataSet = data;
  console.log(dataSet);
  d3.select("body").data(dataSet).enter().append("div").classed("bar", true).text(function(d){ return d.Date; }).style("height", function(d){
    return d.Close*2 + "px";
  });
});
*/

d3.xhr('/data', function(XMLReq){
  dataSet = JSON.parse(XMLReq.response);
  d3.select("body").data(dataSet).enter().append("div").classed("bar", true).text(function(d){ console.log(d.Date); return d.Date; }).style("height", function(d){

    return d.Price / 10 + "px";
  });
});
