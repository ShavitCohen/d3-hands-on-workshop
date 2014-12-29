(function(){
  "use strict";

  d3.json("data/github-javascript-starred-rank.json",function(data){
    drawList(data.children);
    drawTable(data.children);
    drawBars(data.children);
  })

  function drawList(data){
    /**
     * Follow the instruction in order to create a list
     *
     * 1.select the #regularList and append ol
     * 2.selectAll li
     * 3.bind the data --> .data(data)
     * 4.on the .enter() append an li
     * 5.change the text of the li to d.name - d.stargazers_count
     */

    d3.select("#regularList").append("ol")
      .selectAll("li")
      .data(data)
      .enter()
      .append("li")
      .text(function(d){return d.name + " - " + d.stargazers_count;});

  }

  function drawTable(data){

    /**
     * Follow the instruction in order to create an html table
     * 1. select #regularTable and append a table to it (save the table in a variable)
     * 2. append <thead> and append to it <tr>
     * 3. to the tr append all <th> with text of (#, Project Name, Author, Status)
     * 4. append to the table <tbody>, use the .enter() for appending the rows (<tr>)
     * 5. append the all <td> and set the text accordingly
     * 6. set the classes of "table table-striped" to the table (those classes are bootstrap classes which make the
     *    table to be prettier
     */

    var table = d3.select("#regularTable")
      .append("table")
      .classed({"table":true, "table-striped":true});
    var thTr = table.append("thead").
      append("tr");

    thTr.append("th").text("#");
    thTr.append("th").text("Project Name");
    thTr.append("th").text("Author");
    thTr.append("th").text("Stars");

    var tdTr = table.append("tbody")
      .selectAll("tr.data")
      .data(data)
      .enter()
      .append("tr");


    tdTr.append("td").text(function(d,i){return (i+1) + "."});
    tdTr.append("td").text(function(d){return d.name});
    tdTr.append("td").text(function(d){return d.user});
    tdTr.append("td").text(function(d){return d.stargazers_count});
  }

  function drawBars(data){

    /**
     * follow the instructions in order to create vertical bars graph
     *
     * 1. create the config variables (width, height, margin, minValue, maxValue)
     *    1.1 margin = {top:20, right: 20, bottom: 180, left:60}
     * 2. sort the data according to stargazers_count (data.sort(function(a,b){...})
     * 3. append a <svg> to the #bars.
     * 4. append a <g>  which will used as a container for the bars
     *    4.1 position the group according the margin.left & margin.top (use transform attribute)
     * 5. append the bars to the <g> (use data().enter())
     *    5.1 height - add linear scale which calculate the height of the bar according the data.stargazers_count
     *    5.2 width - use the width of 20 (temp)
     *    5.3 add #ff0000 color to the bars
     *    5.3 x - use the index of the data
     *    5.4 y - fix the bars position to the bottom of the graph
     *    5.5 fill - add additional linear scale for calculating the fill of each bar according the d.stargazers_count (["#bcb5b5","#ff0000"])
     *    5.6 fix width and the position of the bars by adding ordinal scale (with rangeRoundBands) - use gap of 0.1
     * 6. add transition to animate the bars (start with position the bars below the graph, or above it and then change the bars position with a transition().duration(1500).delay(500)
     * 7. add mouseover & mouseout events to change the bar color to #c4af46 (use a global variable for saving the bar color)
     * 8. Add a tooltip on mouse over
     *    8.0 add the class 'tooltip' to the div (there is a class ready at the css file)
     *    8.1 append a div to the body and assign it opacity of 0
     *    8.2 on mouseover assign the data to the div (use .html)
     *    8.3 change the position (left & top) of the div according to d3.event.pageX * d3.event.pageY
     * 9. add horizontal axis:
     *    9.1 add xAxis - use d3.svg.axis().scale(xScale).orient('bottom')
     *    9.2 append a <g> to the svg and call the xAxis you created
     *    9.3 select all text in of the axis and add the flowing attributes - x:0, y:10, transform:rotate(75)
     *    9.4 add the fallowing style - text-anchor:start, font-size:20
     * 10.add vertical axis:
     *    10.1 add yAxis - use d3.svg.axis().scale(yScale).orient('left').ticks(10);
     *    10.2 append a <g> to the svg and call the yAxis you created
     *    10.3 position the yAxis
     *    10.4 fix the direction of the yAxis by creating a scale similar to yScale, but with switch values.
     */



  }
})();













































































/*var xScale = d3.scale.ordinal()
  .domain(data.map(function(d){return d.name;}))
  .rangeRoundBands([margin.left, w-margin.right-margin.left], .1);*/

/*bar.transition()
  .duration(1500)
  .delay(500)
  .attr({
    y: function(d){ return h - margin.bottom - yScale(d.stargazers_count) - margin.top;}
  })
  .ease("elastic")*/


/*
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");


vis.append("g")
  .call(xAxis)
  .attr("transform",function(){
    return "translate(" + margin.left + "," + (h - margin.bottom) + ")";
  })
  .selectAll("text")
  .attr("y", 0)
  .attr("x", 10)
  .attr("transform", "rotate(75)")
  .style({
    "text-anchor":"start",
    "font-size":20
  });

var yAxisScale = d3.scale.linear()
  .domain([maxValue, minValue])
  .range([margin.bottom, h - margin.top]);

var yAxis = d3.svg.axis()
  .scale(yAxisScale)
  .ticks(10)
  .orient("left");

vis.append("g")
  .call(yAxis)
  .attr("transform",function(){
    return "translate(" + (margin.left) + "," + (-1* margin.bottom + margin.top) + ")";
  });*/
