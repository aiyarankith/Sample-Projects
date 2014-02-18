import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;

public class IP_Address {
	public static void main (String args[]) 
	{
		try
		{
			InetAddress add = InetAddress.getLocalHost();
			String hostname = "localhost";
			
			System.out.println(add);
			System.out.println("Enter the URL");
			BufferedReader br = new BufferedReader (new InputStreamReader(System.in));	
			String url = br.readLine();
			InetAddress address = InetAddress.getByName(url);
			System.out.println("IP address of entered URL " +url +" is " +address);
			
		}
		catch(Exception e)
		{
			System.err.println("Error");
		}
	}

}
