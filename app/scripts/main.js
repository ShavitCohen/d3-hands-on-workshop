(function(){
    "use strict";

    d3.json("data/github-javascript-starred-rank.json",function(data){
        draw(data);
    })

    function draw(data){
        console.log(data);
    }
})();