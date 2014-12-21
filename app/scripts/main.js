(function(){
  "use strict";

  d3.json("data/github-javascript-starred-rank.json",function(data){
    drawList(data.children);
    drawTable(data.children);
    drawPie(data.children);
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

  function drawPie(data){

    var w = document.getElementById("pieChart").clientWidth,
    h = 400,
    r = w/ 4,
    color = d3.scale.category20b(),
      top = r + 60,
      left = r + (w-r)/4;

    var vis = d3.select("#pieChart")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([data])                   //associate our data with the document
      .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + (left) + "," + (top) + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function(d) { return d.stargazers_count; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
      .attr("transform", function(d) {                    //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = r*1.5;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle")                          //center the text on it's origin
      .text(function(d, i) { return data[i].name; });        //get the label from our original data array

    var text = arcs.append("svg:text")                                     //add a label to each slice
      .attr("transform", function(d) {                    //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = r*1.5;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle")                          //center the text on it's origin
      .text(function(d, i) { return data[i].name; });        //get the label from our original data array


  }

  function drawBars(data){
    var w = document.getElementById("bars").clientWidth,
      h = 400,
      margin = {top:20, right: 20, bottom: 35, left:35};

    data.sort(function(a,b){
      return a.stargazers_count - b.stargazers_count;
    });

    var maxValue = d3.max(data,function(d){return d.stargazers_count});
    var minValue = d3.min(data,function(d){return d.stargazers_count});

    console.log(maxValue,minValue, margin.bottom, h - margin.top);

    var scaleY = d3.scale.linear()
                  .domain([minValue, maxValue])
                  .range([margin.bottom, h - margin.top - margin.bottom]);

    var colorScale = d3.scale.linear()
      .domain([minValue,maxValue])
      .range(["#bcb5b5","#ff0000"]);

    console.log(maxValue);

    var vis = d3.select("#bars")
      .append("svg")
      .attr({
        width:w,
        height:h
      });

    var barsGroup = vis.append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    barsGroup.selectAll(".bar")
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
        width:20,
        x:function(d,i){
          return 22 * i;
        },
        y:function(d){
          return h - margin.bottom - this.height.baseVal.value;
        }
      })








  }
})();
