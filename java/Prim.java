import java.util.ArrayList;

public class Prim {
   public static int count=0;
   public static int totaln=0;
   // Prim-Jarník's algorithm to find MST rooted at s
   public static int [] prim (Graph G, int s) {
	  ArrayList<String> graph_nodes = G.nodes;
	  int size = graph_nodes.size();
     totaln=size;
	  
      final int [] dist = new int [G.size()];  // shortest known distance to MST
      final int [] pred = new int [G.size()];  // preceeding node in tree
      final boolean [] visited = new boolean [G.size()]; // all false initially
      final String [] resedges = new String [G.size()];

      for (int i=0; i<dist.length; i++) {
         dist[i] = Integer.MAX_VALUE;
      }
      dist[s] = 0;

      for (int i=0; i<dist.length; i++) {
         final int next = minVertex (dist, visited);
         visited[next] = true;
         
         // The edge from pred[next] to next is in the MST (if next!=s)
         final int [] n = G.neighbors (graph_nodes.get(next));
         for (int j=0; j<n.length; j++) {
            final int v = n[j];
            
            final int d = G.isEdge(graph_nodes.get(next), graph_nodes.get(v)).capacity;
            if (dist[v] > d) {
            	resedges[v]=next+" "+v+" "+d;
            	dist[v] = d;
               pred[v] = next;
            }
         }
      }
      for(int i=1;i<resedges.length;i++){
    	  //System.out.println(resedges[i]);
      }
      return dist;  // (ignore pred[s]==0!)
      
   }

   private static int minVertex (int [] dist, boolean [] v) {
      int x = Integer.MAX_VALUE;
      int y = -1;   // graph not connected, or no unvisited vertices
      for (int i=0; i<dist.length; i++) {
         if (!v[i] && dist[i]<x) {y=i; x=dist[i];}
      }
      count++;
      System.out.print(((count*100)/totaln)+"  percent completed");
      return y;
   }
}