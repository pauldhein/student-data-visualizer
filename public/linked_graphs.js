import scores from '../data/scores.json';

var satmScale = linScale(score => score.SATM, true);
var satvScale = linScale(score => score.SATV, false);
var gpaScale = linScale(score => score.GPA, false);
var actScale = linScale(score => score.ACT, true);

function linScale(accessor, xORy) {
    return d3.scaleLinear()
        .domain([d3.min(scores, accessor), d3.max(scores, accessor)])
        .range(xORy ? [45, 490] : [470, 10]);
}

function moveSAT() {
    var e = d3.event.selection;
    d3.selectAll("circle").classed("hidden", (row) => {
        return e[0][0] > satmScale(row.SATM) || satmScale(row.SATM) > e[1][0] ||
            e[0][1] > satvScale(row.SATV) || satvScale(row.SATV) > e[1][1];
    });
}

function moveACT() {
    var e = d3.event.selection;
    d3.selectAll("circle").classed("hidden", (row) => {
        return e[0][0] > actScale(row.ACT) || actScale(row.ACT) > e[1][0] ||
            e[0][1] > gpaScale(row.GPA) || gpaScale(row.GPA) > e[1][1];
    });
}

function end() {
    var extent = d3.event.selection;
    if (extent === null) d3.selectAll("circle").classed("hidden", false);
}

function updateTable(data) {
    d3.select("#satm").text(data.SATM);
    d3.select("#satv").text(data.SATV);
    d3.select("#act").text(data.ACT);
    d3.select("#gpa").text(data.GPA);
}

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
