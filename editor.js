function generateJSONFile(value) {

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "graph.json");
    dlAnchorElem.click();
}


function addNode(newValue) {
    // console.log(newValue.nodes)

    const id = document.getElementById('node-id')
    const name = document.getElementById('node-name')
    const icon = document.getElementById('node-icon')
    const url = document.getElementById('node-url')
    // console.log(name.value)
    newValue.nodes[id.value] = {
        "name": name.value,
        "icon": icon.value,
        "url": url.value
    }
    // console.log(newValue.nodes)
}


function addLink(newValue) {

}

export { generateJSONFile, addNode }