import java.io.*;
import java.net.*;

public class Server {

	ServerSocket ss;
	int port;
	
	public Server(int port)
	{
		this.port = port;
	}
	
	public void start() throws Exception
	{
		System.out.println("Starting Server Socket at port "+port);
		ss = new ServerSocket(port);
		
		System.out.println("Waiting for Clients to communicate");
		
		Socket client = ss.accept();
		String clientSentence;
		
		BufferedReader inFromClient = new BufferedReader(new InputStreamReader(client.getInputStream()));
		DataOutputStream outToClient = new DataOutputStream(client.getOutputStream());
		
		clientSentence = inFromClient.readLine();
		System.out.println("client sentence: "+clientSentence);
		
		String welcome = "Heya, connected to the Server";
		outToClient.writeBytes(welcome + "\n");
	}
	
	
	
	public static void main(String args[])
	{
		int portno = 2000;
		try
		{
			Server ss = new Server(portno);
			ss.start();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
}
