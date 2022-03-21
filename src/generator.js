// import * as d3 from "http://d3js.org/d3.v3.min.js";

const width = 900,
    height = 600;

const nodeSize = 16

let svg = d3.select('body').select('svg')
    .attr('width', width)
    .attr('height', height);

export function createGraph(cValue) {
    let value = JSON.parse(JSON.stringify(cValue))
    let links = value.links
    let nodes = value.nodes

    links.forEach(function (link) {
        link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
        link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
    });


    let force = d3.layout.force()
        .size([width, height])
        .nodes(d3.values(nodes))
        .links(links)
        .on('tick', tick)
        .linkDistance(nodeSize * 7)
        .gravity(.15)
        .friction(.9)
        .linkStrength(1)
        .charge(-700)
        .chargeDistance(600)
        .start();


    let link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');


    let node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(force.drag);


    let defs = node.append("defs").attr("id", "imgdefs")

    let cicrclePattern = defs.append("pattern")
        .attr("id", (d) => {
            return `cicrclePattern${d.index}`
        })
        .attr("height", 1)
        .attr("width", 1)
        .attr("x", "0")
        .attr("y", "0")

    cicrclePattern.append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 2 * nodeSize)
        // .attr("width", 2 * nodeSize)
        .attr("xlink:href", function (d) { return d.icon; })

    node.append("circle")
        .attr("r", nodeSize)
        .attr("cy", 0)
        .attr("cx", 0)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", (d) => {
            return `url(#cicrclePattern${d.index})`
        })

    node.append("text")
        .attr('class', 'text')
        .attr("x", -3 * nodeSize)
        .attr("y", -3 * nodeSize)
        .attr("dy", "30")
        .text(function (d) { return d.name; });

    node.append("a")
        .attr("xlink:href", function (d) { return d.url })
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", nodeSize)
        .style("opacity", 0.0);

    function tick() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    function mouseover() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 2 * nodeSize)

        d3.select(this).select("a").select("circle").transition()
            .duration(750)
            .attr("r", 2 * nodeSize)


        d3.select(this).select("defs").select("pattern").select("image").transition()
            .duration(750)
            .attr("height", 4 * nodeSize)

        d3.select(this).select("text").transition()
            .duration(750)
            .attr("y", -4 * nodeSize)
    }

    function mouseout() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", nodeSize)

        d3.select(this).select("a").select("circle").transition()
            .duration(750)
            .attr("r", nodeSize)

        d3.select(this).select("defs").select("pattern").select("image").transition()
            .duration(750)
            .attr("height", 2 * nodeSize)

        d3.select(this).select("text").transition()
            .duration(750)
            .attr("y", -3 * nodeSize)
    }

}