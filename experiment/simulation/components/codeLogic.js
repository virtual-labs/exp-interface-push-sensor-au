import {rasberryPiConnectors, rasberryPiPinsMaps} from './componentList.js';

export const codeLogic = (connectedPointSequence, buttonIsPushed) => {

    if(connectedPointSequence.length==0) {
        return {
            "error": "No connection found"
        }
    }

    const requiedConnections = [
    "GPIO",
    "GND",
    "res_1",
    "res_2",
    "path26583",
    "path26585",
    ["pin1", "pin2"],
    ["pin3", "pin4"],
    ]

    let count = 0;



    connectedPointSequence.forEach(connections => {
        
        // if( requiedConnections.find( e => e == connections.connector)){
        //     count++;
        //     return;
        // }

        requiedConnections.forEach(element => {
            if(Array.isArray(element) ? element.find( e => e == connections.connector) : element == connections.connector) {
                count++;
                return;
            }
        });

        if(rasberryPiPinsMaps[connections.connector] == 'GND') {
            count++;
            return;
        }

        if(requiedConnections.find( e => (e +'1' == connections.connector || e + '2'  == connections.connector || e + '3'  == connections.connector || e + '4'  == connections.connector))){
            count++;
            return;
        }
            

        if(rasberryPiPinsMaps[connections.connector]?.includes('GPIO')) {
            if(rasberryPiPinsMaps[connections.connector].includes(document.querySelector("#ledPin").value) ) {
            count++;
            return;
            }
        }


    });

    if(!buttonIsPushed) {
        return {
            "error": "Button is not pushed"
        }
    }

    console.log(count);
    
    return  (count == 8)
}