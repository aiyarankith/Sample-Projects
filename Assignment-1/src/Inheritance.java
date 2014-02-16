
public class Inheritance {

	public static void main (String args[])
	{
		(new Thread(new A("USA", "Grade A", true, true))).start();
	}
}

class Demo
{
	public Demo()
	{
		System.out.println("Demo Constructor");
	}
}

class A extends Demo implements Runnable 
{
	volatile String country;
	volatile String category;
	volatile Boolean donotset;
	volatile Boolean flag;
	
	public A (String country, String category, Boolean donotset, Boolean flag)
	{
		this.country = country;
		this.category = category;
		this.donotset = donotset;
		this.flag = flag;
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		Thread t = Thread.currentThread();
		String name = t.getName();
		System.out.println("Name : " +name);
		
	}
	
}