var fs = require('fs');
var nodearray=[];

var x = [];
for(var i=0; i<1010; i++) {
    x[i] = [];
    for(var j=0; j<1010; j++) {
        x[i][j] = 0;
    }
}
/*for(var i=0;i<1010;i++){
	for(var j=0;j<1010;j++){
		x[i][j]="0";
	}
}*/

fs.readFile('g2nodes.txt', function(err, data) {
	if(err) throw err;
    nodearray = data.toString().split("\n");
  
    fs.readFile('g2edges.txt', function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");

        for(i in array) {
    		var fst = array[i].split(" ")[0];
    		var snd = array[i].split(" ")[1];
    		var thrd =parseInt(array[i].split(" ")[2]);
    		var fstnum = find_arrayindex(fst);
    		var sndnum = find_arrayindex(snd);
    		console.log
    		x[fstnum][sndnum]=1;
    		x[sndnum][fstnum]=1;
        }
        for(var i=0;i<1010;i++){
        	 var str="";
        	for(var j=0;j<1010;j++){
        		if(j==1009)
        			str=str+x[i][j];
        		else
        			str=str+x[i][j]+",";
        	}
        	console.log(str);
        }
    });


});

function find_arrayindex(string){
	for(var i=0;i<nodearray.length;i++){
		if(nodearray[i]==string){
			return i;
		}
	}


}