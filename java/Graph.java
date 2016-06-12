import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class Graph {
   public HashMap<String, ArrayList<Edge>> edges;
   public ArrayList<String> nodes;

   public Graph (int n) {
	   edges = new HashMap<String, ArrayList<Edge>>();
	   nodes = new ArrayList<String>();
   }

   public int size() { return edges.size(); }

   public void addNode(String node){
	   nodes.add(node);
	   edges.put(node, new ArrayList<Edge>());	   
   }
   public void    addEdge    (String source, String target, int w)  { 
	   edges.get(source).add(new Edge(source, target, w));
	   edges.get(target).add(new Edge(target, source, w));
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
	  final Graph t = new Graph (num_nodes);

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
      
     
      System.out.println("Starting");
      final ArrayList<Integer> caparray = Prim.prim (t, 0);
      int totalwt=0;
      for(int i=0;i<caparray.size();i++){
     	  totalwt=totalwt+caparray.get(i);
      }
      System.out.println("Total wt of tree is "+totalwt);
      Runtime runtime = Runtime.getRuntime();
      // Run the garbage collector
      runtime.gc();
      // Calculate the used memory
      long memory = runtime.totalMemory() - runtime.freeMemory();
      System.out.println("Used memory is bytes: " + memory);
   }

}