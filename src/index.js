import { generateJSONFile, addNode, deleteGraph, loadSelet, addLink } from "./editor.js";
import { createGraph } from './generator.js'




// async function load() {
//     try {
//         const response = await fetch('./data.json');
//         return await response.json();
//     } catch (e) {
//         console.log(e)
//     }

// }

// load().then((value) => {

let value = {
    "links": [],
    "nodes": {}
}

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


// const dropArea = document.getElementById('json-file')
// dropArea.addEventListener('dragover', (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     // Style the drag-and-drop as a "copy file" operation.
//     event.dataTransfer.dropEffect = 'copy';
// });

// dropArea.addEventListener('drop', (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const fileList = event.dataTransfer.files;
//     // console.log(fileList[0].name)
//     dropArea.value = fileList[0].name
// });

document.querySelector('#debug').addEventListener('click', () => {
    const file = document.getElementById('json-file')
    console.log(file)
    // console.log(fetch(file[0]));


})
// fileToJSON()
async function fileToJSON() {
    var reader = new FileReader();
    var fileToRead = document.getElementById('json-file').files[0];

    // attach event, that will be fired, when read is end
    reader.addEventListener("loadend", function () {
        // reader.result contains the contents of blob as a typed array
        // we insert content of file in DOM here
        document.getElementById('file').innerText = reader.result;
    });

    // start reading a loaded file
    console.log(reader.readAsText(fileToRead));
}

btn.addEventListener('click', deleteGraph)

// });