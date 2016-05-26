
d3.xhr('/data', function(XMLReq){
  dataSet = JSON.parse(XMLReq.response);
  //var d = d3.select("div#result-card");
  var card = document.getElementById('result-card');
  console.log(card.offsetWidth);
  var width = card.offsetWidth;
  var height = card.offsetHeight;
  var svgArr = d3.selectAll("div.card-content").append("div")
   .classed("svg-container", true) //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("viewBox", "0 0 " + card.offsetWidth  + " " + (card.offsetHeight))
   .classed("svg-content-responsive", true); //.append("svg").attr("width", width).attr("height", height);
  for(var i = 1; i < Object.keys(dataSet[0]).length; i++)
  {
    var svg = d3.select(svgArr[0][i-1]);
    var field = Object.keys(dataSet[0])[i];

    var average = 0;
    for(var j = 0; j < dataSet.length; j++)
    {
      average += dataSet[j][field];
    }
    average = average / dataSet.length;

    var circle = svg.selectAll(field).data(dataSet).enter().append("circle");
    var r = width / (2 * (dataSet.length + 2));

    var origin = height;

    if(field == "google")
    {
      circle.attr("fill", "red");
    }
    else if(field == "apple")
    {
      circle.attr("fill", "green");
    }else if(field == "samsung")
    {
      circle.attr("fill", "blue");
    }


    circle.attr("cx", function(d,i){
        return ((i + 0.5) * 2 * r);
    }).attr("cy", function(d,i){
        console.log(d["date"]);
        yLoc = origin - height/2 - (d[field] - average);
        return yLoc;
    }).attr("r", r);

  }
});
