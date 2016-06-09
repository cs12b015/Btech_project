import java.io.*;
import java.util.*;
 
class SccGraph
{
    private int V;   // No. of vertices
    private LinkedList<Integer> adj[]; //Adjacency List
 
    //Constructor
    SccGraph(int v)
    {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }
    void addEdge(int v, int w)  { adj[v].add(w); }
    void DFSUtil(int v,boolean visited[])
    {
        visited[v] = true;
        System.out.print(v + " ");
 
        int n;
 
        // Recur for all the vertices adjacent to this vertex
        Iterator<Integer> i =adj[v].iterator();
        while (i.hasNext())
        {
            n = i.next();
            if (!visited[n])
                DFSUtil(n,visited);
        }
    }
    SccGraph getTranspose()
    {
        SccGraph g = new SccGraph(V);
        for (int v = 0; v < V; v++)
        {
            // Recur for all the vertices adjacent to this vertex
            Iterator<Integer> i =adj[v].listIterator();
            while(i.hasNext())
                g.adj[i.next()].add(v);
        }
        return g;
    }
 
    void fillOrder(int v, boolean visited[], Stack stack)
    {
        visited[v] = true;
         Iterator<Integer> i = adj[v].iterator();
        while (i.hasNext())
        {
            int n = i.next();
            if(!visited[n])
                fillOrder(n, visited, stack);
        }
        stack.push(new Integer(v));
    }
 
    // The main function that finds and prints all strongly connected components
    void printSCCs()
    {
        Stack stack = new Stack();
        boolean visited[] = new boolean[V];
        for(int i = 0; i < V; i++)
            visited[i] = false;
 
        for (int i = 0; i < V; i++)
            if (visited[i] == false)
                fillOrder(i, visited, stack);
 
        SccGraph gr = getTranspose();
 
        for (int i = 0; i < V; i++)
            visited[i] = false;
 
        while (stack.empty() == false)
        {
            int v = (int)stack.pop();
             if (visited[v] == false)
            {
                gr.DFSUtil(v, visited);
                System.out.println();
            }
        }
    }
 
    // Driver method
    public static void main(String args[]) throws IOException
    {
        int num_nodes =0;
        BufferedReader br = new BufferedReader(new FileReader("data/fb_nodes.txt"));
        String line= null;
        while((line = br.readLine()) != null){
            num_nodes++;
        }
      //System.out.println(num_nodes);
        SccGraph g = new SccGraph(num_nodes);;
        br = new BufferedReader(new FileReader("data/fb_edges.txt"));
        line= null;
        while((line = br.readLine()) != null){
            line=line.trim();

            int fst = Integer.parseInt(line.split(" ")[0].trim());
            int snd = Integer.parseInt(line.split(" ")[1].trim());
            int w= Integer.parseInt(line.split(" ")[2]);        
            g.addEdge(fst, snd);
            g.addEdge(snd,fst);
        }

 
        System.out.println("Following are strongly connected components in given graph ");
        g.printSCCs();
        Runtime runtime = Runtime.getRuntime();
        // Run the garbage collector
        runtime.gc();
        // Calculate the used memory
        long memory = runtime.totalMemory() - runtime.freeMemory();
        System.out.println("Used memory is bytes: " + memory);
        //System.out.println("Used memory is megabytes: "++ bytesToMegabytes(memory));
    }
}