(function(){
  "use strict";

  d3.json("data/github-javascript-starred-rank.json",function(data){
    /*drawList(data.children);
    drawTable(data.children);*/
    drawBars(data.children);
  })

  function drawList(data){
    d3.selectAll("#RegularList").append("ol")
      .selectAll("li")
      .data(data)
      .enter()
      .append("li")
      .text(function(d){return d.name + " - " + d.stargazers_count;});

  }

  function drawTable(data){
    var table = d3.selectAll("#RegularTable")
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
      .append("tr")
      .classed({"data":true});

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
     * 2. sort the data according to stargazers_count (use data.sort)
     * 3. create your svg according the width and the height
     * 4. create a group for the bars
     *    4.1 position the group according the margin.left & margin.top (use transform css style)
     * 5. add to the group the bars
     *    5.1 height - add linear scale for the bars height
     *    5.2 width - use the width of 20 (temp)
     *    5.3 add #ff0000 color to the bars
     *    5.3 x - use the index of the data
     *    5.4 y - fix the bars - make them be at the bottom
     *    5.5 fill - add additional linear scale for the colors range = ["#bcb5b5","#ff0000"]
     *    5.6 fix width and the position of the bars by adding ordinal scale (with rangeRoundBands) - use gap of 0.1
     * 6. add transition to animate the bars (use the y attribute)
     * 7. add mouseover & mouseout events to change the bar color to #c4af46 (use a global variable for saving the bar color);
     * 8. Add tooltip on mouse over
     *    8.0 add the class 'tooltip' to the div (look at the css file)
     *    8.1 append a div to the body and add a style to it of the opacity of 0
     *    8.2 on mouseover assign the data to the div (use html)
     *    8.3 change the position (left & top) of the div according to d3.event.pageX * d3.event.pageY
     * 9. add axes:
     *    9.1 add x axis - use
     */

    var w = document.getElementById("bars").clientWidth,
      h = 500,
      margin = {top:20, right: 20, bottom: 180, left:50};

    data.sort(function(a,b){
      return a.stargazers_count - b.stargazers_count;
    });
    var maxValue = d3.max(data,function(d){return d.stargazers_count});
    var minValue = d3.min(data,function(d){return d.stargazers_count});

    var scaleY = d3.scale.linear()
      .domain([minValue, maxValue])
      .range([margin.bottom, h - margin.top]);

    var colorScale = d3.scale.linear()
      .domain([minValue,maxValue])
      .range(["#bcb5b5","#ff0000"]);

    var scaleX = d3.scale.ordinal()
      .domain(data.map(function(d){return d.name;}))
      .rangeRoundBands([margin.left, w-margin.right-margin.left], .1);

    var vis = d3.select("#bars")
      .append("svg")
      .attr({
        width:w,
        height:h
      });

    var graph = vis.append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var bar = graph.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar",true)
      .attr({
        height:function(d){
          return scaleY(d.stargazers_count);
        },
        fill:function(d){
          return colorScale(d.stargazers_count);
        },
        width:function(d){
          return scaleX.rangeBand();
        },
        x:function(d,i){
          return scaleX(d.name);
        },
        y:h
      });

    bar.transition()
      .attr({
        y: function(d){ return h - margin.bottom - scaleY(d.stargazers_count) - margin.top;}
      })
      .duration(1500)
      .delay(500)
      .ease("elastic")

    var tooltip = d3.select("body")
      .append("div")
      .classed("tooltip",true)
      .style("opacity",0);

    var lastBarColor = "";
    bar.on("mouseover",function(d){
      lastBarColor = d3.select(this).attr("fill");
      d3.select(this).attr("fill","#c4af46");

      d3.select(".tooltip")
        .style({
          top: d3.event.pageY + "px",
          left: (d3.event.pageX + 30) + "px",
          opacity:1
        })
        .html(
        "<div>Name: " + d.name + "</div>" +
        "<div>Author: " + d.user + "</div>" +
        "<div>Stars: " + d.stargazers_count + "</div>"
      )
    })
      .on("mouseout",function(){
        d3.select(this).attr("fill",lastBarColor);
        d3.select(".tooltip")
          .style("opacity",0);
      })


    var xAxis = d3.svg.axis()
      .scale(scaleX)
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
      .tickSize(1)
      .orient("left");

    vis.append("g")
      .call(yAxis)
      .attr("transform",function(){
        return "translate(" + (margin.left) + "," + (-1* margin.bottom + margin.top) + ")";
      });




  }
})();
