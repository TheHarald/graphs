var width = 900,
    height = 600;

var nodeSize = 16


// var links = []
// var nodes = {}


// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//         console.log('data', data)
//         links = data.links
//         nodes = data.nodes
//         console.log(links)
//     })


var links = [
    { source: 'anna', target: 'rtuitlab' },
    { source: 'rtuitlab', target: 'egor' },
    { source: 'egor', target: 'dima' },
    { source: 'rtuitlab', target: 'andrew' },
    { source: 'egor', target: 'ivan' }
]

var nodes = {
    andrew: { name: 'Андрей Петров', icon: './images/one1.png', url: 'https://www.google.ru/' },
    anna: { name: 'Анна Иванова', icon: './images/one2.png', url: 'https://www.google.ru/' },
    dima: { name: 'Дмитрий Малов', icon: './images/one3.png', url: 'https://www.google.ru/' },
    egor: { name: 'Егор Смирнов', icon: './images/one4.png', url: 'https://www.google.ru/' },
    rtuitlab: { name: 'RTU IT Lab', icon: './images/logo.png', url: 'https://rtuitlab.dev/' },
    ivan: { name: 'Иван Иванов', icon: './images/one6.png', url: 'https://www.google.ru/' },
}


links.forEach(function (link) {
    link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
    link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
});


console.log('links', links)
console.log('nodes', nodes)

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var force = d3.layout.force()
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


var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');


var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);


node.append("image")
    .attr("xlink:href", function (d) { return d.icon; })
    .attr("x", -nodeSize)
    .attr("y", -nodeSize)
    .attr("width", 2 * nodeSize)
    .attr("height", 2 * nodeSize);


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
    .style("fill", "blue")
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
    d3.select(this).select("image").transition()
        .duration(750)
        .attr("width", 4 * nodeSize)
        .attr("height", 4 * nodeSize)
        .attr("x", -2 * nodeSize)
        .attr("y", -2 * nodeSize)

    d3.select(this).select("text").transition()
        .duration(750)
        .attr("y", -4 * nodeSize)
}

function mouseout() {
    d3.select(this).select("image").transition()
        .duration(750)
        .attr("width", 2 * nodeSize)
        .attr("height", 2 * nodeSize)
        .attr("x", -nodeSize)
        .attr("y", -nodeSize)

    d3.select(this).select("text").transition()
        .duration(750)
        .attr("y", -3 * nodeSize)
}