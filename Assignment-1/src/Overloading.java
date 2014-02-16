
public class Overloading {
	
	public <K> MyContainer <K> pack (K key, String... values)
	{
		return new MyContainer <> (key);
	}
	public MyContainer <Wrapper> pack (int key, String... values)
	{
		return new MyContainer<>(new Wrapper(key));
	}
	
	public static final class MyContainer <T>
	{
		public MyContainer (T object)
		{
			System.out.println("class 1");
		}
	}
	public static final class Wrapper 
	{
		public Wrapper (int i)
		{
			System.out.println("Class 2");
		}
	}
	
	public static void main(String args[])
	{
		Overloading overload = new Overloading();
		MyContainer<Wrapper> test1 = overload.pack(1, new String[]{"Test1", "Test2"}); //case 1
		MyContainer<Wrapper> test2 = overload.<Float>pack(10, "demo"); //case 1
		MyContainer<Wrapper> test3 = overload.<Wrapper>pack(1, "Test"); //case 2
	}

}
