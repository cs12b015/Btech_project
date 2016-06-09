import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;

public class KGraph {
   public HashMap<String, ArrayList<Edge>> edges;
   public ArrayList<String> nodes;
   public ArrayList<Edge> edgearray;
   public HashMap<String, String> lookup;

   public KGraph (int n) {
	   edges = new HashMap<String, ArrayList<Edge>>();
	   nodes = new ArrayList<String>();
	   edgearray = new ArrayList<Edge>();
	   lookup = new HashMap<String,String>();
   }

   public int size() { return edges.size(); }

   public void addNode(String node){
	   nodes.add(node);
	   edges.put(node, new ArrayList<Edge>());	   
	   lookup.put(node, node);
   }
   public void    addEdge    (String source, String target, int w)  { 
	   edges.get(source).add(new Edge(source, target, w));
	   edges.get(target).add(new Edge(target, source, w));
	   edgearray.add(new Edge(target, source, w));
   }
   public Edge isEdge (String source, String target)  { 
     ArrayList<Edge> e = edges.get(source);
     for(int i=0;i<e.size();i++){
    	 if(e.get(i).target.equals(target)){
    		 return e.get(i);
    	 }
     }
     return null;
   }
   
   public int node_number(String node){
	   return nodes.indexOf(node);   
   }
   
   public int [] neighbors (String vertex) {
      ArrayList<Edge> e = edges.get(vertex);
      final int[]answer= new int[e.size()];
      for(int i=0;i<e.size();i++){
    	  answer[i]=node_number(e.get(i).target);
    	  //System.out.print(e.get(i).target+" ");
      }
      return answer;
   }

   public static void main (String args[]) throws IOException{
      ArrayList<String> nodelabels = new ArrayList<String>();
      BufferedReader br = new BufferedReader(new FileReader("data/fb_nodes.txt"));
      String line= null;
      while((line = br.readLine()) != null){
         nodelabels.add(line.trim());
      }
      int num_nodes = nodelabels.size();
      //System.out.println(num_nodes);
	  final KGraph t = new KGraph (num_nodes);

      for(int i=0;i<num_nodes;i++){
         t.addNode(nodelabels.get(i));
      }
      br = new BufferedReader(new FileReader("data/fb_edges.txt"));
      line= null;
      while((line = br.readLine()) != null){
    	  line=line.trim();

    	  String source_str = line.split(" ")[0].trim();
    	  String target_str = line.split(" ")[1].trim();
    	  int w= Integer.parseInt(line.split(" ")[2]);    	  
          t.addEdge(source_str, target_str, w);
      }
      
      Collections.sort(t.edgearray, new Comparator<Edge>(){
       public int compare(Edge e1, Edge e2){
           return e1.capacity-e2.capacity;
	        }
	  });
 
      
      final ArrayList<Edge> pred = Kruskal.kruskal(t);
      
      int totalwt=0;
      for(int i=0;i<pred.size();i++){
     	  totalwt=totalwt+pred.get(i).capacity;
      }
      System.out.println("Total wt of tree is "+totalwt);
   }

}