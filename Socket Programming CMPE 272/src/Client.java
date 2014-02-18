import java.io.*;
import java.net.*;

public class Client {

	String hostname;
	int port;
	Socket s;
	
	public Client(String hostname, int port)
	{
		this.hostname = hostname;
		this.port = port;
	}
	
	public void connect() throws IOException, UnknownHostException
	{
		System.out.println("Attempting to connect the host "+hostname+":"+port);
		s = new Socket(hostname,port);
		System.out.println("Connected");
	}
	
	public void read() throws IOException
	{
		String input;
		String server_reply;
		BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));
		DataOutputStream outToServer = new DataOutputStream(s.getOutputStream());
		BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
		
		System.out.println("Server Response");
		input = inFromUser.readLine();
		
		outToServer.writeBytes(input + '\n');
		server_reply = br.readLine();
		
		System.out.println(server_reply);
		s.close();
	}
	
	public static void main (String arg[])
	{
		Client client = new Client("localhost",2000);
		try
		{
			client.connect();
			client.read();
		}
		catch(UnknownHostException e)
		{
			System.err.println("Unknown Host Connection Error");			
		}
		catch(IOException e)
		{
			System.err.println("IO Exception Error");			
		}
	}
}
