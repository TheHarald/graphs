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

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function addNode(newValue) {

    const name = document.getElementById('node-name')
    const icon = document.getElementById('node-icon')
    const url = document.getElementById('node-url')
    if (name.value === '') {
        alert('Название не должно быть пустым')
    } else {
        newValue.nodes[uuidv4()] = {
            "name": name.value,
            "icon": icon.value === '' ? defaultIcon : icon.value,
            "url": url.value
        }
        deleteGraph()
        loadSelet(newValue)
        createGraph(newValue)

        name.value = ''
        icon.value = ''
        url.value = ''
    }
}


function fileToJSON() {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        var fileToRead = document.getElementById('json-file').files[0];
        reader.onload = () => {

            resolve(JSON.parse(reader.result))
        };
        reader.onerror = reject;
        reader.readAsText(fileToRead);
    })

}




function loadSelet(value) {

    const sources = (document.querySelectorAll('#source > *'))
    const targets = (document.querySelectorAll('#target > *'))
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

export { generateJSONFile, addNode, deleteGraph, loadSelet, addLink, fileToJSON }