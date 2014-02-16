
public class String_Pool {

	public static void main(String args[])
	{
		String s1 = new String();
		String s2 = new String();
		s1 = "Dog";
		s2 = "Dog";
		String s3 = new String("Dog");
		
		System.out.println("s1 == s2 :" +(s1==s2));
		System.out.println("s1 == s3 :" +(s1==s3));
	}
}
