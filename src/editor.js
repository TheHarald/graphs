import { createGraph } from './generator.js'
const defaultIcon = 'https://is5-ssl.mzstatic.com/image/thumb/Purple115/v4/1a/09/49/1a0949f2-279e-cb45-ee85-fc1237fbf39a/source/512x512bb.jpg'

function generateJSONFile(value) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "graph.json");
    dlAnchorElem.click();
}

function deleteGraph() {
    const elements = document.querySelectorAll('svg > *')
    elements.forEach((elem) => {
        elem.remove()
    })
}


function addNode(newValue) {

    const id = document.getElementById('node-id')
    const name = document.getElementById('node-name')
    const icon = document.getElementById('node-icon')
    const url = document.getElementById('node-url')
    // console.log(icon.value)
    newValue.nodes[id.value] = {
        "name": name.value,
        "icon": icon.value === '' ? defaultIcon : icon.value,
        "url": url.value
    }
    deleteGraph()
    loadSelet(newValue)
    createGraph(newValue)

    id.value = ''
    name.value = ''
    icon.value = ''
    url.value = ''
}



function loadSelet(value) {

    const sources = (document.querySelectorAll('#source > *'))
    const targets = (document.querySelectorAll('#target > *'))
    // console.log(elements)
    sources.forEach((elem) => {
        elem.remove()
    })
    targets.forEach((elem) => {
        elem.remove()
    })
    const source = document.getElementById('source')
    const target = document.getElementById('target')
    let nodes = Object.keys(value.nodes)

    nodes.map(option => {
        let selection = document.createElement('option')
        selection.textContent = value.nodes[option].name
        selection.value = option
        source.appendChild(selection)
    })


    nodes.map(option => {
        let selection = document.createElement('option')
        selection.textContent = value.nodes[option].name
        selection.value = option
        target.appendChild(selection)
    })
}

function addLink(newValue) {
    let nodes = Object.keys(newValue.nodes)
    let source = document.getElementById('source').value
    let target = document.getElementById('target').value

    if (source === target) {
        alert("Связь не может идти к самому себе")
    } else {
        newValue.links.push({
            "source": source,
            "target": target
        })
        deleteGraph()
        createGraph(newValue)
    }



}

export { generateJSONFile, addNode, deleteGraph, loadSelet, addLink }