import java.util.ArrayList;

public class Kruskal {
	public static ArrayList<Edge> kruskal (KGraph G) {
		ArrayList<Edge> resedges= new ArrayList<Edge>();
		int num_nodes = G.nodes.size();
		ArrayList<String> nodes_array = G.nodes;
		int ind=0;
		while(resedges.size()<num_nodes-1){
			Edge curedge = G.edgearray.get(ind);
			String srclookup = G.lookup.get(curedge.source);
			String snklookup = G.lookup.get(curedge.target);
			if(!(srclookup.equals(snklookup))){
				for(int i=0;i<num_nodes;i++){
					if(G.lookup.get(nodes_array.get(i)).equals(snklookup)){
						G.lookup.put(nodes_array.get(i),G.lookup.get(curedge.source));
					}
				}
				resedges.add(curedge);
			}
			ind++;
		}
		return resedges;
	}
}