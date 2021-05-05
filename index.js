//Create a node.js app to take simple command inputsfrom the terminal, and respond withtext.

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

function onErr(err) {
    console.log(err);
    return 1;
}