
public class String_Reverse {
public static String merge(String first, String second) 
{
	if(first ==null || first.equals(""))
		return second==null? first:second;
	else if (second == null || second.equals(""))
		return first;
	else if(first.charAt(0) < second.charAt(0))
		return first.charAt(0) + merge( first.substring(1, first.length()), second);
	else
		return second.charAt(0) + merge(first, second.substring(1, second.length()));
	   }
public static void main(String args[])
{
	String result =  merge("abc", "xyz");
	System.out.println("String : " + result);
}
}
