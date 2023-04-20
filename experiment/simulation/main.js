/* eslint-disable max-len */
import * as d3 from 'd3';
import { Component } from './Core/component.js';
import { rasberryPiConnectors, ledConnectors, resistorConnectors, rasberryPiPinsMaps, pushButtonConnectors } from './components/componentList.js';
import { contours, Path } from 'd3'
import {connectionLogs} from './Core/connectionLog.js';
import { errorThrower } from './Core/errorHandler.js';
import {codeLogic} from './components/codeLogic.js';
const svgContainer = d3.select('#svg').append('svg')
        .attr('id', 'svgContainer')
        .attr('height', window.innerHeight - document.getElementById('svg').offsetTop)
        .attr('width', document.getElementById('svg').offsetWidth);

const raspberry = new Component('raspberry', svgContainer, './assets/pi3dirk.svg', 1);
const resistorComponent = new Component('resistorComponent', svgContainer, './assets/resistor.svg', 0.1);
const led = new Component('led', svgContainer, './assets/led.svg', 0.3);
const pushButton = new Component('push_button', svgContainer, './assets/pushButton.svg', 2);

const raspberryPi = document.getElementById('rasberryPi');
const ledlight = document.getElementById('ledlight');
const resistor = document.getElementById('resistor');
const isAConnector = e => rasberryPiConnectors.includes(e.srcElement.id) || ledConnectors.includes(e.srcElement.id) || resistorConnectors.includes(e.srcElement.id) || pushButtonConnectors.includes(e.srcElement.id)
const displayInfo = document.getElementById('displayInfo');
const codeSubmit = document.getElementById('codeSubmit');
const pushButtonLoader = document.getElementById("pushButton");
let result;

raspberryPi.addEventListener('click', async() => await raspberry.load());
ledlight.addEventListener('click', () => led.load());
resistor.addEventListener('click', () => resistorComponent.load());

let buttonIsPushed = false;
pushButtonLoader.addEventListener('click', async()=> {
        await pushButton.load()
        d3.select('#push_button').on('click', () => {
           if(d3.select('#pressButton').node() != null) {
                d3.select('#pressButton').remove();
                buttonIsPushed = true;

                if(result) blink('#ledLight');

                return;
           }
           d3.select('#push_button').append('path')
        .attr('id', 'pressButton')
        .attr('d', 'M15 17C15 19.2091 13.2091 21 11 21C8.79086 21 7 19.2091 7 17C7 14.7909 8.79086 13 11 13C13.2091 13 15 14.7909 15 17Z')
        .attr('fill', 'black')
        .attr('fill-opacity', '0.54');
        buttonIsPushed = false;

        })
})     

const blink = id => {
        if(!buttonIsPushed) return;
        d3.select(id).transition().duration(1000).attr('fill', 'red').transition().duration(1000).attr('fill', 'white').on('end', () => blink(id))
};

let path = []
let pathCreator;
const connections = new connectionLogs('connectionLog');
const error = new errorThrower('errorBox', 'errorHeading', 'errorText', 'closeErrorBox');
let pathCount = 0;




svgContainer.on('dblclick', (e) => {

        if( isAConnector(e) & pathCreator==undefined) {
                pathCreator = new Path();
                pathCreator.moveTo(e.offsetX, e.offsetY);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                svgContainer.style('cursor', 'crosshair');
                return;
        }

        if(e.srcElement.id == 'svgContainer' && !rasberryPiConnectors.includes(e.srcElement.id) ) {
        // add the current point
        pathCreator.lineTo(e.offsetX, e.offsetY);
     
        // add the path to the svg
        svgContainer.append('path')
        .attr('d', pathCreator.toString())
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr('id', `path${pathCount}`);
        return;
        }

        if( isAConnector(e) && pathCreator) {
                pathCreator.lineTo(e.offsetX, e.offsetY);
                // add the path to the svg
                svgContainer.append('path')
                .attr('d', pathCreator.toString())
                .attr('stroke', 'black')
                .attr('stroke-width', '2px')
                .attr('fill', 'none')
                .attr('id', `path${pathCount}`);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                pathCount++;
                // Change the cursor back to the default
                svgContainer.style('cursor', 'default');
                pathCreator = null;
                console.log('connectedPointSequence', connectedPointSequence);
                return;
        }
});


svgContainer.on('mouseover', (e) => {
        if (rasberryPiConnectors.includes(e.srcElement.id)) {
                displayInfo.innerHTML = rasberryPiPinsMaps[e.srcElement.id];
        }
});

codeSubmit.addEventListener('click', () => {

        const result = codeLogic(connections.getConnectionLog());

        if(result==true) {
                blink("#ledLight")
                document.querySelector("#my-drawer-4").click()
        }
        else {
        
                      
        result.error ? error.throw('Error', result.error) : error.throw('Error', 'Please connect the components properly. Refer to the connection diagram.');

        }
});

