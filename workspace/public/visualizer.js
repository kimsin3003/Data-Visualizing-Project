
d3.csv("./apple.csv", function(error, data) {
  dataSet = data;
  console.log(dataSet);
  d3.select("body").data(dataSet).enter().append("div").classed("bar", true).text(function(d){ return d.Date; }).style("height", function(d){
    return d.Close*2 + "px";
  });
});
