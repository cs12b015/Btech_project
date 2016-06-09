// Represents an edge from source to sink with capacity

var fs = require('fs');
var ksort = require('ksort'); 
var vert_numb=0;
var curnum=0;

var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
};

// Main class to manage the network
var Graph = function() {
    this.edges = {};
    this.nodes = [];
    this.edgearray =[];
    this.lookup={};
    
    // Add a node to the graph
    this.addNode = function(node) {
        this.nodes.push(node);
        this.edges[node] = [];
        this.lookup[node]=node;
    };

    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other    
        //console.log(source);
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
        this.edgearray.push(new Edge(source, sink, capacity));
    };
    
    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if(this.edges[source] !== undefined) 
            for(var i=0;i<this.edges[source].length;i++)
                if(this.edges[source][i].sink == sink)
                    return this.edges[source][i];
        return null;
    };

    this.neighbours = function(node){
        var answer=[];
        if(this.edges[node] !== undefined) {
            for(var i=0;i<this.edges[node].length;i++){
                answer.push(this.node_number(this.edges[node][i].sink));
            }
        }
        return answer;
    }

    this.node_number=function(node){
        for(var i=0;i<this.nodes.length;i++){
            if(this.nodes[i]==node){
                return i;
            }
        }
        return -1;

    }
};




var Kruskal=function(graph){
    var resedges=[];
    var numnodes=graph.nodes.length;
    var nodes_array = graph.nodes;
    var ind=0;
    while(resedges.length<numnodes-1){
        var curedge=graph.edgearray[ind];
        var srclookup = graph.lookup[curedge.source];
        var snklookup = graph.lookup[curedge.sink];
        if(srclookup != snklookup){
            for(var i=0;i<numnodes;i++){
                if(graph.lookup[nodes_array[i]]==snklookup){
                    graph.lookup[nodes_array[i]]=graph.lookup[curedge.source];
                }
            }
            resedges.push(curedge);
        }
        ind++;
    }
    return resedges;

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
            
            //console.log(fst+" "+snd+" "+thrd); 
            g.addEdge(fst,snd,thrd); 
        }

        g.edgearray=ksort(g.edgearray, function(a, b){ return a.capacity < b.capacity;});
               
        var result = Kruskal(g);
        printresult(result);
    });
});
function printresult(dist){
    var totwt=0;
    for(var i=0;i<dist.length;i++){
        totwt+=dist[i].capacity;
    }
    console.log("total weight of tree is "+totwt);
}