import scores from '../data/scores.json';

var s1x = d3.axisBottom().scale(satmScale).ticks(10);
var s1y = d3.axisLeft().scale(satvScale).ticks(10);
var scatter1 = d3.select("#scatterplot-1")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

scatter1.append("g")
    .attr("transform", "translate(" + 0 + "," + 470 + ")")
    .call(s1x);
scatter1.append("g")
    .attr("transform", "translate(" + 45 + "," + 0 + ")")
    .call(s1y);
scatter1.append("g")
    .attr("class", "brush")
    .call(d3.brush().on("brush", moveSAT).on("end", end));

scatter1.selectAll("circle")
    .data(scores).enter().append("circle")
    .attr("fill", "green").attr("r", 5)
    .attr("stroke", "white")
    .attr("cx", row => satmScale(row.SATM))
    .attr("cy", row => satvScale(row.SATV))
    .on("click", function (r) {
        updateTable(r);
        d3.selectAll("circle").classed("special", function (row) {
            return r.SATM == row.SATM && r.SATV == row.SATV;
        });
    });

scatter1.append("g")
    .attr("transform", "translate(" + 210 + ", " + 500 + ")")
    .append("text")
    .text("SATM Score");
scatter1.append("g")
    .attr("transform", "translate(" + 15 + ", " + 290 + ")")
    .append("text")
    .attr("transform", "rotate(-90)").text("SATV Score");


var s2x = d3.axisBottom()
    .scale(actScale)
    .ticks(10);
var s2y = d3.axisLeft()
    .scale(gpaScale)
    .ticks(10);
var scatter2 = d3.select("#scatterplot-2")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

scatter2.append("g")
    .attr("transform", "translate(" + 0 + "," + 470 + ")")
    .call(s2x);
scatter2.append("g")
    .attr("transform", "translate(" + 45 + "," + 0 + ")")
    .call(s2y);
scatter2.append("g")
    .attr("class", "brush")
    .call(d3.brush().on("brush", moveACT).on("end", end));

scatter2.selectAll("circle")
    .data(scores).enter().append("circle")
    .attr("fill", "green")
    .attr("r", 5)
    .attr("stroke", "white")
    .attr("cx", row => actScale(row.ACT))
    .attr("cy", row => gpaScale(row.GPA))
    .on("click", function (r) {
        updateTable(r);
        d3.selectAll("circle").classed("special", function (row) {
            return r.ACT == row.ACT && r.GPA == row.GPA;
        });
    });

scatter2.append("g")
    .attr("transform", "translate(" + 225 + ", " + 500 + ")")
    .append("text")
    .text("ACT Score");
scatter2.append("g")
    .attr("transform", "translate(" + 15 + ", " + 275 + ")")
    .append("text")
    .attr("transform", "rotate(-90)")
    .text("GPA Score");
