// Represents an edge from source to sink with capacity

var fs = require('fs');
var vert_numb=0;
var curnum=0;
var os = require('os');



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

function Prim(graph){
    var graph_nodes = graph.nodes;
    var size = graph_nodes.length;
    var dist=[];
    var pred=[];
    var visited = [];
    var caparray =[];
    var resedges =[];
    for(var i=0;i<size;i++){
        dist[i]=9999;
        pred[i]="";
        visited[i]=0;
    }
    var s= Math.round(Math.random()*(graph.nodes.length-1));
    dist[s]=0;
    for(var i=0;i<size;i++){
        var next = minVertex(dist,visited);
        visited[next]=1;
        if(i>0){
        	var d1 = graph.edgeExists(graph_nodes[pred[next]],graph_nodes[next]).capacity;
        	caparray.push(d1);
        	resedges.push(graph_nodes[pred[next]]+" "+graph_nodes[next]+" "+d1);
        }
        var n = graph.neighbours(graph_nodes[next]);
        for(var j=0;j<n.length;j++){
            var v = n[j];
            var d = graph.edgeExists(graph_nodes[next],graph_nodes[v]).capacity;
            if(dist[v]>d){
                dist[v]=d;
                pred[v]=graph_nodes[next];
            }
        }
    }

    for(var i=0;i<resedges.length;i++){
      console.log(resedges[i]);
    }
    return caparray;
}
function minVertex(dist,v){
    var x=9999;
    var y= -1;
    for (var i=0;i<dist.length;i++){
        if(v[i]==0 && dist[i]<x){
            y=i;
            x=dist[i];
        }
    }
    curnum++;
    var percent=(curnum/vert_numb)*10000;
    percent=Math.ceil(percent);
    percent=percent/100;
    //process.stdout.write( percent + " percent completed\r");
    return y;
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

        var result = Prim(g);
        printresult(result);
        
        //console.log(os.totalmem()-os.freemem());
    });
});
function printresult(dist){
    var totwt=0;
    for(var i=0;i<dist.length;i++){
        totwt+=dist[i];
    }
    console.log("total weight of tree is "+totwt);

}