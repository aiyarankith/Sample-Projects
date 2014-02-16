class Base
{
	protected String name;
	public Base()
	{
		this("");
		System.out.println("No argument constructor for Base class");		
	}
	public Base(String name)
	{
		this.name = name;
		System.out.println("One argument constructor for the Base class");
	}
}

class Derived extends Base
{
	public Derived() 
	{
		System.out.println("One argument constructor for Derived class");
	}
	public Derived(String name)
	{
		super(name);
		System.out.println("One argument constructor for Derived class");
	}
}

public class Constructor_Channing {

	public static void main(String args[])
	{
		Derived dv = new Derived ("Test");
	}
}
