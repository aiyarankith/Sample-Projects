import java.util.*;


public class QueueWithTwoStacks<Item> {
    private Stack<Item> stack1;    // back of queue
    private Stack<Item> stack2;    // front of queue

    // create an empty queue
    public QueueWithTwoStacks() {
        stack1 = new Stack<Item>();
        stack2 = new Stack<Item>();
    }

    // move all items from stack1 to stack2
    private void moveStack1ToStack2() {
        while (!stack1.isEmpty())
            stack2.push(stack1.pop());
    }

    public boolean isEmpty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }


    // return the number of items in the queue.
    public int size() {
        return stack1.size() + stack2.size();     
    }

    // return the item least recently added to the queue.
    public Item peek() {
        if (isEmpty()) throw new NoSuchElementException("Queue underflow");
        if (stack2.isEmpty()) moveStack1ToStack2();
        return stack2.peek();
    }

    // add the item to the queue
    public void enqueue(Item item) {
        stack1.push(item);
    }

    // remove items from the queue
    public Item dequeue() {
        if (isEmpty()) throw new NoSuchElementException("Queue underflow");
        if (stack2.isEmpty()) moveStack1ToStack2();
        return stack2.pop();
    }

    public static void main(String[] args) {
        QueueWithTwoStacks<String> q = new QueueWithTwoStacks<String>();
        Scanner sc = new Scanner(System.in);
        int i = 0;
        while (i < 3) {
        	
            String item = sc.nextLine();
        	
            if (!item.equals("-")) q.enqueue(item);
            else if (!q.isEmpty()) System.out.print(q.dequeue() + " ");
            i++;
        }
        System.out.println("(" + q.size() + " left on queue)");
    }
}
