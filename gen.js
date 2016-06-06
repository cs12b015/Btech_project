/*
var fs = require('fs');
fs.readFile('twitter_edges.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
    	//if(i!=0){
    		var randwt = Math.round(Math.random()*(49));
    		randwt++;
    		array[i]=array[i]+" "+randwt;
    	//}
    }
    var energy = array.join("\n");
    console.log(energy);
});
*/
for(var i=0;i<4039;i++){
    console.log(i);
}