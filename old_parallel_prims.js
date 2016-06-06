var Parallel = require('paralleljs');
var quickSort = require('quick-sort');
var fs = require('fs');
var node_array= new Array();
var node_numb_array=new Array();
var edge_array=new Array();



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
var g = new Graph();
function Prim(graph) {
    var result = [];
    var usedNodes = {};
    var checknodes = graph.nodes;
    
    function findMin(g) {
        var min = [999999,null,null];
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
    }
    function removefrom_checknodes(node){
        var in1 = checknodeindex(node);
        checknodes.splice(in1,1);
    }
    


    // Pick random start point
    var rand =Math.round(Math.random()*(graph.nodes.length-1))
   // console.log(rand);
    var node = graph.nodes[rand];
    result.push(node);
    removefrom_checknodes(node);
    usedNodes[node] = true;

    var resultedges=[];

    var min = findMin(graph);
    while(min[1] != null || checknodes.length !=0) {
        if(min[1] == null){
            var rand1 =Math.round(Math.random()*(checknodes.length-1));
            var node1 = checknodes[rand1];
            result.push(node1);
            removefrom_checknodes(node1);
            usedNodes[node1] = true;
            //console.log("now");
        }else{
            resultedges.push(min);
            result.push(min[1]);
            removefrom_checknodes(node);
            usedNodes[min[1]] = true;
        }
        min = findMin(graph);
       // console.log(result.length/81306);
      // percent=result.length/vert_numb;
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
	console.log("total weight of tree is "+totwt);
}


/*var g = new Graph();
*/


fs.readFile('data/fb_nodes.txt', function(err, data) {


    if(err) throw err;
    node_array = data.toString().split("\n");
    node_array  = quickSort(node_array);
    for(var i=0;i<node_array.length;i++){
        g.addNode(node_array[i]);
    }

    fs.readFile('data/fb_edges.txt', function(err, data) {
        if(err) throw err;
        edge_array = data.toString().split("\n");
        for(i in edge_array) {
            var fst = edge_array[i].split(" ")[0];
            var snd = edge_array[i].split(" ")[1];
            var thrd =parseInt(edge_array[i].split(" ")[2]);
            g.addEdge(fst,snd,thrd);
        }
        parallel_mst();
    });
});



var g1 = new Graph();
var g2 = new Graph();
var g3 = new Graph();
var g4 = new Graph();

function parallel_mst(){

    //cut the graph

    var i;
    for (i=0;i<node_array.length/4;i++){
        g1.addNode(node_array[i].toString());
        //console.log(node_array[i]);

    }
     for ( i=i;i<2*node_array.length/4;i++){
        g2.addNode(node_array[i].toString());
        //console.log(node_array[i]);
    }
     for ( i=i;i<3*node_array.length/4;i++){
        g3.addNode(node_array[i].toString());
       // console.log("g3 "+node_array[i]);
    }
     for ( i=i;i<node_array.length;i++){
        g4.addNode(node_array[i].toString());
        //console.log("g4 "+node_array[i]);
    }

    var connection = [9999,9999,9999,9999,9999,9999];
    var connection_edge = ["","","","","",""];
    var ccount=0;

    for(i=0;i<edge_array.length;i++){
        var fst = edge_array[i].split(" ")[0];
        var snd = edge_array[i].split(" ")[1];
        var thrd =parseInt(edge_array[i].split(" ")[2]);

        var graphnumb1=which_graph(fst);
        var graphnumb2=which_graph(snd);

        if(graphnumb1==1 && graphnumb2==1){
            g1.addEdge(fst,snd,thrd);
        }else if(graphnumb1==2 && graphnumb2==2){
            g2.addEdge(fst,snd,thrd);
        }else if(graphnumb1==3 && graphnumb2==3){
            g3.addEdge(fst,snd,thrd);
        }else if(graphnumb1==4 && graphnumb2==4){
            g4.addEdge(fst,snd,thrd);
        }
         else if((graphnumb1==1 && graphnumb2==2)||(graphnumb1==2 && graphnumb2==1)){
            var temp = connection[0];
            connection[0]=find_minimum(connection[0],thrd);
            if(temp!=connection[0]){
                connection_edge[0]=edge_array[i];
            }        
            ccount++;
        }else if((graphnumb1==1 && graphnumb2==3)||(graphnumb1==3 && graphnumb2==1)){
            var temp = connection[1];
            connection[1]=find_minimum(connection[1],thrd);
            if(temp!=connection[1]){
                connection_edge[1]=edge_array[i];
            }            ccount++;
            
        }else if((graphnumb1==1 && graphnumb2==4)||(graphnumb1==4 && graphnumb2==1)){
            var temp = connection[2];
            connection[2]=find_minimum(connection[2],thrd);
            if(temp!=connection[2]){
                connection_edge[2]=edge_array[i];
            }            ccount++;

        }else if((graphnumb1==2 && graphnumb2==3)||(graphnumb1==3 && graphnumb2==2)){
            var temp = connection[3];
            connection[3]=find_minimum(connection[3],thrd);
            if(temp!=connection[3]){
                connection_edge[3]=edge_array[i];
            }            ccount++;

        }else if((graphnumb1==2 && graphnumb2==4)||(graphnumb1==4 && graphnumb2==2)){
            var temp = connection[4];
            connection[4]=find_minimum(connection[4],thrd);
            if(temp!=connection[4]){
                connection_edge[4]=edge_array[i];
            }            ccount++;

        }else if((graphnumb1==3 && graphnumb2==4)||(graphnumb1==4 && graphnumb2==3)){
            var temp = connection[5];
            connection[5]=find_minimum(connection[5],thrd);
            if(temp!=connection[5]){
                connection_edge[5]=edge_array[i];
            }            ccount++;

        }
    }

    var p = new Parallel([g1,g2,g3,g4]);
    function add(d) { return d[0].concat(d[1]); }
    p.map(Prim).reduce(add).then(printedges);


}

function find_minimum(a,b){
    if(a>b){
        return b;
    }else{
        return a;
    }
}




function which_graph(string){
    if(string<node_array[Math.ceil( node_array.length/4)]){
        return 1;
    }else if(string<node_array[Math.ceil( 2*node_array.length/4)]){
        return 2;
    }else if(string<node_array[Math.ceil( 3*node_array.length/4)]){
        return 3;
    }else{
        return 4;
    }
}








/*
var p = new Parallel([1,2,2,3,4,4,5]);

function print(data){
	console.log(data);
	return data;
}

function add(d) { return d[0] + d[1]; }



p.map(print).reduce(add).then(print);*/