
d3.xhr('/data', function(XMLReq){
  dataSet = JSON.parse(XMLReq.response);
  //var d = d3.select("div#result-card");
  var card = document.getElementById('result-card');
  console.log(card.offsetWidth);
  debugger;
  var width = card.offsetWidth;
  var height = card.offsetHeight;
  var svg = d3.select("div.card-content").append("div")
   .classed("svg-container", true) //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("viewBox", "0 0 " + card.offsetWidth  + " " + (card.offsetHeight * 3))
   .classed("svg-content-responsive", true); //.append("svg").attr("width", width).attr("height", height);
  for(var i = 1; i < Object.keys(dataSet[0]).length; i++)
  {
    var field = Object.keys(dataSet[0])[i];

    var average = 0;
    for(var j = 0; j < dataSet.length; j++)
    {
      average += dataSet[j][field] / 2;
    }
    average = average / dataSet.length;


    var circle = svg.selectAll(field).data(dataSet).enter().append("circle");
    console.log(svg);

    var r = width / (2 * (dataSet.length + 2));

    var origin = 0;

    if(field == "google")
    {
      origin = height * i;
      circle.attr("fill", "red");
    }
    else if(field == "apple")
    {
      origin = height * i;
      circle.attr("fill", "green");
    }else if(field == "samsung")
    {
      origin = height * i;
      circle.attr("fill", "blue");
    }

    var g = svg.append("g");
    g.append("rect")
    .attr("width", 150).attr("height", 50)
    .attr("y", origin - height)
    .attr("fill", "#ff0066").attr("opacity", 1);
    g.append("text").text(field)
    .attr("width", 150).attr("height", 50)
    .attr("y", origin - height + 30)
    .attr("font-size", "35px");

  /*  <g>
  <rect x="0" y="0" width="100" height="100" fill="red" ></rect>
  <text x="0" y="10" font-family="Verdana" font-size="55" fill="blue" > Hello </text>
</g>*/

    circle.attr("cx", function(d,i){
        return ((i + 0.5) * 2 * r);
    }).attr("cy", function(d,i){
        yLoc = origin - height/2 - (d[field]/2 - average);
        return yLoc;
    }).attr("r", r);

/*
    svg.append("rect")
    .attr("width", width).attr("height", 1)
    .attr("y", origin/2)
    .attr("fill", "#ff0066").attr("opacity", 1);*/
  }
});
