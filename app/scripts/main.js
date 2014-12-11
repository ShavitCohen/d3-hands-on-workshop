(function(){
  "use strict";

  d3.json("data/github-javascript-starred-rank.json",function(data){
    drawList(data);
    drawTable(data);
    drawPie(data);
    drawBars(data);
  })

  function drawList(data){
      var ul = d3.select("#RegularList").append("ul");
      var li = ul.select("li")
          .data(data.children)
          .enter()
          .append("li");
      li.text(function(d){return d.name + " - " + d.stargazers_count;})
  }

  function drawTable(data){
  }

  function drawPie(data){
  }

  function drawBars(data){
  }
})();
