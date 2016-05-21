
d3.xhr('/data', function(XMLReq){
  dataSet = JSON.parse(XMLReq.response);

  var svg = d3.select("body").append("svg").attr("width", 1000).attr("height", 1000);

  svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
      return i *  20;
    })
    .attr("y", function(d, i){
      return d.Price;
    })
    .attr("width", 20)
    .attr("height", 100);
  /*
  var circle = svg.selectAll("circle").data(dataSet).enter().append("circle");
  circle.attr("cx", function(d,i){
      return (i * 30);
  }).attr("cy", function(d,i){
      return (50);
  }).attr("r", function(d,i){
      return (d.Price / 50);
  }).attr("fill", "yellow").attr("stroke", "orange").attr("stroke-width", function(d){
    return d.Price / 150;
  });
  */

});
