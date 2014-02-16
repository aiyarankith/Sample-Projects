import java.io.IOException;

public class Flow_Control {

	public static void main (String args[])
	{
		char choice;
		try {	
		do {
			System.out.println("Help Topics");
			System.out.println("1. If Statement");
			System.out.println("2. Switch Case");
			System.out.println("3. While Loop");
			System.out.println("4. do-while");
			System.out.println("5. for\n");
			System.out.println("Choose Any One\n");
			
			choice = (char) System.in.read();
			
			
		} while (choice < '1' || choice > '5');
		
		switch (choice) {
		
		case '1': 
			System.out.println("The IF Statement\n");
			System.out.println("if (condition) statement;\n");
			System.out.println("else statement\n");
			break;
		
		case '2': 
			System.out.println("The Switch Case Statement\n");
			System.out.println("switch(expression)\n");
			System.out.println("cases\n");
			break;
		
		case '3': 
			System.out.println("The While Loops\n");
			System.out.println("while (condition)\n");
			System.out.println("body\n");
			break;
		
		case '4': 
			System.out.println("The do-while loop\n");
			System.out.println("do {\n");
			System.out.println("body\n");
			System.out.println("} while (condition)\n");
			break;
			
		case '5':
			System.out.println("The For loop\n");
			System.out.println("for (initialization, condition, iteration)\n");
			break;
			
		}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

