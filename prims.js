// Represents an edge from source to sink with capacity

var fs = require('fs');
var vert_numb = 0;
var percent=0;



var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
};

// Main class to manage the network
var Graph = function() {
    this.edges = {};
    this.nodes = [];
    this.nodeMap = {};
    
    // Add a node to the graph
    this.addNode = function(node) {
        this.nodes.push(node);
        this.nodeMap[node] = this.nodes.length-1;
        this.edges[node] = [];
    };

    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other    
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
    };
    
    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if(this.edges[source] !== undefined) 
            for(var i=0;i<this.edges[source].length;i++)
                if(this.edges[source][i].sink == sink)
                    return this.edges[source][i];
        return null;
    };
};

function Prim(graph) {
    var result = [];
    var usedNodes = {};
    
    function findMin(g) {
        var min = [999999,null,null];
        for(var i=0;i<result.length;i++) 
            for(var n=0;n<g.edges[result[i]].length;n++) 
                if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                    min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink,g.edges[result[i]][n].source];
        return min;
    }

    var checknodes = g.nodes;


    function checknodeindex(node){
    	for(var i=0;i<checknodes.length;i++){
    		if(checknodes[i]==node){
    			return i;
    		}
    	}
    }

    function removefrom_checknodes(node){
    	var in1 = checknodeindex(node);
    	checknodes.splice(in1,1);
    }
    


    // Pick random start point
    var rand =Math.round(Math.random()*(g.nodes.length-1))
   // console.log(rand);
    var node = g.nodes[rand];
    result.push(node);

    removefrom_checknodes(node);
    usedNodes[node] = true;

    var resultedges=[];

    var min = findMin(g);
    while(min[1] != null || checknodes.length !=0) {
    	if(min[1] == null){
    		var rand1 =Math.round(Math.random()*(checknodes.length-1));
    		var node1 = checknodes[rand1];
    		result.push(node1);
    		removefrom_checknodes(node1);
    		usedNodes[node1] = true;
    		console.log("now");
    	}else{
    		resultedges.push(min);
    	    result.push(min[1]);
    	    removefrom_checknodes(node);
    	    usedNodes[min[1]] = true;
    	}
        min = findMin(g);
       // console.log(result.length/81306);
       percent=result.length/vert_numb;
      // process.stdout.write( (percent)*100 + " percent completed\r");
    }
    
    return resultedges;
};


function printedges(array){
	var totwt = 0;
	for(var i in array){
		//console.log(array[i][2]+" - "+array[i][1]+"   "+array[i][0]);
		totwt=totwt+array[i][0];
	}
	console.log("\ntotal weight of tree is "+totwt);
}





var g = new Graph();

fs.readFile('g2nodes.txt', function(err, data) {
	if(err) throw err;
    var array = data.toString().split("\n");
    vert_numb = array.length;
    for(i in array) {
    	g.addNode(array[i]);
    }
    fs.readFile('g2edges.txt', function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");

        for(i in array) {
        	//if(i!=0){
        		//console.log(array[i]);
        		var fst = array[i].split(" ")[0];
        		var snd = array[i].split(" ")[1];
        		var thrd =parseInt(array[i].split(" ")[2]);
        		g.addEdge(fst,snd,thrd);
        	//}
        	
        }
        var result = Prim(g);
    	printedges(result);

    });
});














/*
g.addNode("a");
g.addNode('b');
g.addNode('c');
g.addNode('d');


g.addEdge('a','d',1);
g.addEdge('b','d',2);
g.addEdge('c','d',3);
g.addEdge('a','b',2);


var result = Prim(g);
//document.write('<h2>Result</h2>');
printedges(result);*/