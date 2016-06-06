// Represents an edge from source to sink with capacity

var fs = require('fs');
var checknodes =[];



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
    var resultedges=[];
    
    function findMin(g) {
        var min = [999999,null];
        for(var i=0;i<result.length;i++) 
            for(var n=0;n<g.edges[result[i]].length;n++) 
                if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                    min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink,g.edges[result[i]][n].source];
        return min;
    }
    
    function checknodeindex(node){     
        for(var i=0;i<checknodes.length;i++){
            if(checknodes[i]==node){
                return i;
            }
        }
        return -1;
    }

    function removefrom_checknodes(node){
        var in1 = checknodeindex(node);
        if(in1!=-1)
        checknodes.splice(in1,1);
    }

    function edge_exists(min){
        for(var i=0;i<resultedges.length;i++){
            if(resultedges[i]==min)
                return 1;
        }
        return 0;
    }

    function do_parallel_thing(min1,min2,min3,min4){

    }

    // Pick random start point
    var node = checknodes[Math.round(Math.random()*(checknodes.length-1))];
    result.push(node);
    removefrom_checknodes(node);
    usedNodes[node] = true;
    
    var min = findMin(graph);
    while(min[1] != null) {
        resultedges.push(min);
        result.push(min[1]);
        removefrom_checknodes(min[1]);
        usedNodes[min[1]] = true;
        min = findMin(graph);
    }
    
    return resultedges;
};


function printedges(array){
    var totwt = 0;
    for(var i in array){
       // console.log(array[i][2]+" - "+array[i][1]+"   "+array[i][0]);
        totwt=totwt+array[i][0];
    }
    console.log("\ntotal weight of tree is "+totwt);
}





var g = new Graph();


fs.readFile('data/fb_nodes.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    vert_numb = array.length;
    for(i in array) {
        g.addNode(array[i]);
    }
    fs.readFile('data/fb_edges.txt', function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");

        for(i in array) {;
            var fst = array[i].split(" ")[0];
            var snd = array[i].split(" ")[1];
            var thrd =parseInt(array[i].split(" ")[2]);
            g.addEdge(fst,snd,thrd);  
        }
        checknodes = g.nodes;

        var result = Prim(g);
        printedges(result);

    });
});