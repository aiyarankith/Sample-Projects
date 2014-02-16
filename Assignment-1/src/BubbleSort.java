import java.util.*;

public class BubbleSort<E> {

    public static <E> void bubbleSort(E[] unsorted) {
        for(int iter =1; iter< unsorted.length; iter++){
            for(int inner = 0; inner < (unsorted.length - iter); inner ++){
                if((((Comparable) (unsorted[inner])).compareTo(unsorted[inner+1])) > 0){
                    E tmp = unsorted[inner];
                    unsorted[inner] = unsorted[inner + 1];
                    unsorted[inner + 1] = tmp;
                }                
            }
        }
    }

    public static <E> void display(E[] unsorted) {
        for(E i : unsorted){
            System.out.print(i + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
    	Scanner sc = new Scanner(System.in);
        Integer[] unsorted = new Integer[10];
        for(int i = 0; i < unsorted.length; i++)
        {
        	System.out.println("Enter value of array :");
        	unsorted[i] = sc.nextInt();
        }
        display(unsorted);
        bubbleSort(unsorted);
        display(unsorted);
    }
}