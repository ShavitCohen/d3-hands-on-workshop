(function(){
  "use strict";

  intro();

  function intro(){
    /***************************************************************
    //1. Select the first item and change its background to yellow
    //**************************************************************/

    /*d3.select(".item")
      .style("background-color","yellow");*/


    /***************************************************************
    //2. Select all items and change 'font-weight' style to 'bold'
    //**************************************************************/

    /*d3.selectAll(".item")
      .style("font-weight","bold");*/


    /***************************************************************
    //3. Select the third Item and change its background to red
    //**************************************************************/

    /*d3.select(".item:nth-child(3)")
      .style("background-color","yellow");*/


    /***************************************************************
    //4. Select the last Item and add a class name 'pretty'
    //**************************************************************/

    /*d3.selectAll(".item:last-child")
      .classed("pretty",true);*/


    /***************************************************************
    //5. Select only the odd items and add the fallowing classes: pretty, aligned, shadowed
    //**************************************************************/

    /*d3.selectAll(".item:nth-child(odd)")
      .classed({
        pretty:true,
        aligned:true,
        shadowed:true
      })*/


    /***************************************************************
    //6. append to the first item <strong> -- ^_^ -- </strong>
    //**************************************************************/

    /*d3.select(".item")
      .append("strong")
      .text("-- ^_^ -- ");
    */


    /***************************************************************
    //7. changed the text of the last item to [your name]
    //**************************************************************/

    /*d3.select(".item:last-child")
      .text("shavit");*/


    /***************************************************************
    //8. A click on an item will toggle the class 'pretty'
    //**************************************************************/

    /* d3.selectAll(".item")
     .on("click",function(){
     var className = "pretty";
     var hasClass = this.className.indexOf(className) === -1 ? false : true;
     d3.select(this)
     .classed(className,!hasClass);
     });*/


    /***************************************************************
    //9. change the text of the items to '777' according to the fallowing data
    //**************************************************************/

    var randomData = [true, true, true];
    /*d3.selectAll(".item")
      .data(randomData)
      .text("777");*/


    /***************************************************************
    //10. change the text of the items according to the fallowing array
    //**************************************************************/

    var names = ["this", "is", "how", "we", "do" ,"it"];
    /*d3.selectAll(".item")
      .data(names)
      .text(function(d){ return d;});*/


    /***************************************************************
    //11 Add the class 'pretty' to all items and Change the width and background color of the items according the fallowing data
    //**************************************************************/

    var styles = [
      { width:50, background:"#A57706" },
      { width:123, background:"#BD3613" },
      { width:180, background:"#D11C24" },
      { width:213, background:"#C61C6F" },
      { width:150, background:"#595AB7" },
      { width:300, background:"#2176C7" },
      { width:270, background:"#111B28" }
    ];

    /*
    d3.selectAll(".item")
      .data(styles)
      .style({
        "background-color":function(d){ return d.background;},
        "width":function(d){ return d.width + "px"; }
      })
      .classed({
        "pretty":true,
        "aligned":true,
        "shadowed":false
      }).on("click",function(d){
        styles[0].width+=50;
        console.log(this);
      });


*/
  }


})();
