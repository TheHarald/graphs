import { generateJSONFile, addNode, deleteGraph, loadSelet, addLink } from "./editor.js";
import { createGraph } from './generator.js'




async function load() {
    try {
        const response = await fetch('data.json');
        return await response.json();
    } catch (e) {
        console.log(e)
    }

}

load().then((value) => {

    createGraph(value)
    loadSelet(value)
    const btn = document.querySelector('#delete-grapth')
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

    document.querySelector('#debug').addEventListener('click', () => {
        console.log(document.getElementById('source').value)
    })

    btn.addEventListener('click', deleteGraph)

});