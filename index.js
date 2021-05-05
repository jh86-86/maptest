//Create a node.js app to take simple command inputsfrom the terminal, and respond withtext.
const fetch = require('node-fetch');
var inquirer = require('inquirer');

const prompt = require('prompt');

prompt.start();


console.log('Write "alive" if alive?');
prompt.get(['status'], function (err, result) {
    if (err) { return onErr(err); }
    if(result.status==='alive'){
        console.log('Hi! I’m still here!');
        }else{
        console.log('I am sorry to hear you are not alive.Maybe next time.');
        }
    });

        console.log("whats' your postcode? eg:b711bj")
        prompt.get(['postcode'], function (err, result) {
            if (err) { return onErr(err); }
                if(result.postcode.length>0){
                    console.log(result.postcode);
                    postcodeGetter(result.postcode)
               }else if(result.pstcde===undefined||result.pstcde.length>7){
                 console.log('you did not enter address');
                }
        
        
        console.log("Enter two address to find distance")
        prompt.get(['postcodeOne','postcodeTwo'], function (err, result) {
            if (err) { return onErr(err); }
            let pstOne=result.postcodeOne;
            let pstTwo= result.postcodeTwo;
            console.log(typeof(pstOne))
            if(pstOne.length<5||pstTwo<5||pstOne.length>7||pstTwo>=7){
                console.log('enter proper postcodes please');
            }else{
             getDistance(pstOne,pstTwo);
            }
            
        });
    });



async function postcodeGetter(pstcde){ 
    if(pstcde.length<=5){
        const res = await fetch(`http://postcodes.io/postcodes?q=${pstcde}`)
        const data = await res.json();
        console.log(data.result[0].admin_district);
    }else{
        const res = await fetch(`http://postcodes.io/postcodes/${pstcde}`)
        const data = await res.json();
        console.log("Home location set to "+data.result.admin_ward);
    }
    };



 async function  getDistance(pstcde, pstcdeTwo){ //take in two postcodes finds long and lat and call the distance calc
    const res = await fetch(`http://postcodes.io/postcodes/${pstcde}`)
        const data = await res.json();
    const resTwo = await fetch(`http://postcodes.io/postcodes/${pstcdeTwo}`)
        const dataTwo = await resTwo.json();
    
        let lat= data.result.latitude;
        let long= data.result.longitude;

        let latTwo=dataTwo.result.latitude;
        let longTwo= dataTwo.result.longitude;

        console.log([lat,long])
        console.log([latTwo,longTwo]);
        distanceFormula(lat,long,latTwo,longTwo);
 } 

 function distanceFormula(lat1,lon1, lat2,lon2){ //formula for calculating distance
     	
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
        selectMilesKmRadions(d);
 }

 function selectMilesKmRadions(num){
    inquirer
        .prompt([
            {
            name: "unit",
            type: "list",
            message: "Choose your your measurement for distance bewtween postcodes:",
            choices: ["Miles", "Radians", "km"],
            },
        ])
        .then((answer) => {
            if(answer.unit==='Miles'){
                console.log(Math.floor(Math.floor(num) * 0.00062137)+"miles distance between the two postcodes");
            }else if(answer.unit==="Radians"){
                console.log("why do you need to know radians????")
            }else if(answer.unit==="km"){
                console.log(Math.floor(num/1000)+"km between the two postcodes")
            }
        });
 }


function onErr(err) {
    console.log(err);
    return 1;
};


