import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class PrimsGraph {

   private int [][]  edges;  // adjacency matrix
   private String [] labels;

   public PrimsGraph (int n) {
      edges  = new int [n][n];
      labels = new String[n];
   }


   public int size() { return labels.length; }

   public void   setLabel (int vertex, String label) { labels[vertex]=label; }
   //public void   getVertex (String label) { labels[vertex]=label; }
   public String getLabel (int vertex)               { return labels[vertex]; }
   public int getVertex(String label){
      for(int i=0;i<labels.length;i++){
         if(labels[i].equals(label)){
            return i;
         }
      }
	return -1; 
   }
   public void    addEdge    (int source, int target, int w)  { edges[source][target] = w;edges[target][source] = w; }
   public boolean isEdge     (int source, int target)  { return edges[source][target]>0; }
   public void    removeEdge (int source, int target)  { edges[source][target] = 0; }
   public int     getWeight  (int source, int target)  { return edges[source][target]; }

   public int [] neighbors (int vertex) {
      int count = 0;
      for (int i=0; i<edges[vertex].length; i++) {
         if (edges[vertex][i]>0) count++;
      }
      final int[]answer= new int[count];
      count = 0;
      for (int i=0; i<edges[vertex].length; i++) {
         if (edges[vertex][i]>0) answer[count++]=i;
      }
      return answer;
   }

  /* public void print () {
      for (int j=0; j<edges.length; j++) {
         System.out.print (labels[j]+": ");
         for (int i=0; i<edges[j].length; i++) {
            if (edges[j][i]>0) System.out.print (labels[i]+":"+edges[j][i]+" ");
         }
         System.out.println ();
      }
   }*/

   public static void main (String args[]) throws IOException{

      ArrayList<String> nodelabels = new ArrayList<String>();
      BufferedReader br = new BufferedReader(new FileReader("data/twitter_nodes.txt"));
      String line= null;
      while((line = br.readLine()) != null){
         nodelabels.add(line.trim());
      }
      int num_nodes = nodelabels.size();
      System.out.println(num_nodes);
      final PrimsGraph t = new PrimsGraph (num_nodes);
      for(int i=0;i<num_nodes;i++){
         t.setLabel(i,nodelabels.get(i));
      }
      br = new BufferedReader(new FileReader("data/twitter_edges.txt"));
      line= null;
      while((line = br.readLine()) != null){
    	  line=line.trim();

    	  String source_str = line.split(" ")[0].trim();
    	  String target_str = line.split(" ")[1].trim();
    	  
        int source = t.getVertex(source_str);
        int target = t.getVertex(target_str);
    	  int w= Integer.parseInt(line.split(" ")[2]);
          t.addEdge(source, target, w);
      }
      
      final int [] pred = Prim.prim (t, 0);
      int totalwt=0;
      for(int i=0;i<pred.length;i++){
     	totalwt=totalwt+pred[i];
      	//System.out.println (pred[i]);
      }
      System.out.println("Total wt of tree is "+totalwt);
   }

}