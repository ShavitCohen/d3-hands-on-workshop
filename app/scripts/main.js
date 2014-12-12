(function(){
  "use strict";

  d3.json("data/github-javascript-starred-rank.json",function(data){
    drawList(data);
    drawTable(data);
    drawPie(data);
    drawBars(data);
  })

  function drawList(data){
      d3.selectAll("#RegularList").append("ol")
        .selectAll("li")
        .data(data.children)
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
          .data(data.children)
          .enter()
          .append("tr")
          .classed({"data":true});

      tdTr.append("td").text(function(d,i){return (i+1) + "."});
      tdTr.append("td").text(function(d){return d.name});
      tdTr.append("td").text(function(d){return d.user});
      tdTr.append("td").text(function(d){return d.stargazers_count});
  }

  function drawPie(data){
  }

  function drawBars(data){
  }
})();
