function convertToBinaryArray(temperature) {
    var tempInBinary = temperature.toString(2); 
    if(tempInBinary.length > 7)
    {
        return [1,1,1,1,1,1,1];
    }
    while(tempInBinary.length < 7)
    { 
        tempInBinary = "0" + tempInBinary;
    }
    return tempInBinary.split("").map(function(i){return parseInt(i);});
}
var myDeepNetwork = new synaptic.Architect.Perceptron(7,3,3,4);
var trainingData = []; 
for(var i = 1;i < 75; i++) {
    var input = convertToBinaryArray(i);
    var output = [0,0,0,0];
 
    if(i <= 10)
    {
        output = [1,0,0,0];
    }
    else if(i > 10 && i <= 15)
    {
        output = [0,1,0,0];
    }
    else if(i > 15 && i <= 40)
    {
        output = [0,0,1,0];
    }
    else
    {
        output = [0,0,0,1];
    }
 
    trainingData.push({
        input: input,
        output: output
    });
}
var myTrainer = new synaptic.Trainer(myDeepNetwork);
myTrainer.train(trainingData, {
    rate: 0.1,
    iterations: 10000,
    shuffle: true
});
var rnd = Math.floor(Math.random() * (1 - 30)+30);
var cTemp = convertToBinaryArray(rnd);
var recommendations = myDeepNetwork.activate(cTemp);
let jacket = Math.floor(recommendations[0] * 100);
let sweater = Math.floor(recommendations[1] * 100);
let tShirt = Math.floor(recommendations[2] * 100);
let nothing = Math.floor(recommendations[3] * 100);
jacket = 'Jaqueta ' + jacket + '%'
sweater = 'Sueter ' + sweater + '%'
tShirt = 'Camiseta ' + tShirt + '%'
nothing = 'Nada ' + nothing + '%'
let all;
if(rnd > 1)
{
    all = ['Em ' + rnd + ' Graus:',jacket,sweater,tShirt,nothing];
}
else
{
    all = ['Em ' + rnd + ' Grau:',jacket,sweater,tShirt,nothing];
}
console.log(all.join('\n'));
document.getElementById('data').innerText = all.join('\n');