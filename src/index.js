import { generateJSONFile, addNode, deleteGraph, loadSelet, addLink, fileToJSON } from "./editor.js";
import { createGraph } from './generator.js';


let value = {
    "links": [],
    "nodes": {}
}

createGraph(value)
loadSelet(value)
document.querySelector('#delete-grapth').addEventListener('click', deleteGraph)
document.querySelector('#generate').addEventListener('click', () => {
    createGraph(value)
})
document.querySelector('#download').addEventListener('click', () => {
    generateJSONFile(value)
})
document.querySelector('#add-node').addEventListener('click', () => {
    addNode(value)
})
document.querySelector('#add-link').addEventListener('click', () => {
    addLink(value)
})


document.getElementById('json-file').addEventListener('change', () => {

    fileToJSON().then((data) => {
        value = data
        createGraph(value)
        loadSelet(value)
    })

})

