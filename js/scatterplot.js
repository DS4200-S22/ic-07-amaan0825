/*

In-class activity 07 starter code

*/

// Set margins and dimensions 
// Appending svg to hold scatterplot
const svg2 = d3.select("#csv-scatter")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 
 


// Plotting 
d3.csv("data/scatter.csv").then((data) => {
  

  {
    let xKey1 = "day";
    let yKey1 = "score";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // X scale
    let x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    //  x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    //  max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    //  Y scale
    let y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

      /* 

  Tooltip Set-up  

*/

// Opacity
const tooltip3 = d3.select("#csv-scatter") 
.append("div") 
.attr('id', "tooltip3") 
.style("opacity", 0) 
.attr("class", "tooltip"); 

// Mousover funtion that displays data and name 
const mouseover3 = function(event, d) {
tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
.style("opacity", 1);  
}

// mouse move function 
const mousemove3 = function(event, d) {
tooltip3.style("left", (event.pageX)+"px") 
.style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// mouse leave funtion 
const mouseleave3 = function(event, d) { 
tooltip3.style("opacity", 0); 
}

/* 

Bars 

*/




    // Adding points 
    const myCircles1 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", "orange")
                              .on("mouseover", mouseover3)
                              .on("mousemove", mousemove3)
                              .on("mouseleave", mouseleave3);







  }})
