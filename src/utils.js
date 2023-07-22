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
