// superclass Person
class Person {
   // Instance variables
   private String name;
   private String address;
   
   public Person(String name, String address) {
      this.name = name;
      this.address = address;
   }
   
   public String getName() {
      return name;
   }
   public String getAddress() {
      return address;
   }
   
   public String toString() {
      return name + "(" + address + ")";
   }
}
// Define Student class, subclass of Person
class Student extends Person 
{
   private int numCourses;   
   private String[] courses; 
   private int[] grades;     
   private static final int MAX_COURSES = 30; 
   
   public Student(String name, String address) {
      super(name, address);
      numCourses = 0;
      courses = new String[MAX_COURSES];
      grades = new int[MAX_COURSES];
   }
   
   @Override
   public String toString() {
      return "Student: " + super.toString();
   }
   
   // Add a course and its grade 
   public void addCourseGrade(String course, int grade) {
      courses[numCourses] = course;
      grades[numCourses] = grade;
      ++numCourses;
   }
   
   // Print all courses taken and their grade
   public void printGrades() {
      System.out.print(this);
      for (int i = 0; i < numCourses; ++i) {
         System.out.print(" " + courses[i] + ":" + grades[i]);
      }
      System.out.println();
   }
   
   // Compute average grade
   public double getAverageGrade() {
      int sum = 0;
      for (int i = 0; i < numCourses; i++ ) {
         sum += grades[i];
      }
      return (double)sum/numCourses;
   }
}
// Define class Teacher, subclass of Person
class Teacher extends Person 
{
   private int numCourses;   
   private String[] courses; 
   private static final int MAX_COURSES = 10;
   
   public Teacher(String name, String address) {
      super(name, address);
      numCourses = 0;
      courses = new String[MAX_COURSES];
   }
   
   @Override
   public String toString() {
      return "Teacher: " + super.toString();
   }
   
   // Return false if duplicate courses are added
   public boolean addCourse(String course) {
      // Check if the course already is in the course list
      for (int i = 0; i < numCourses; i++) {
         if (courses[i].equals(course)) return false;
      }
      courses[numCourses] = course;
      numCourses++;
      return true;
   }
   
   // Return false if the course does not exist in the course list
   public boolean removeCourse(String course) {
      // Look for the course index
      int courseIndex = numCourses;
      for (int i = 0; i < numCourses; i++) {
         if (courses[i].equals(course)) {
            courseIndex = i;
            break;
         }
      }
      if (courseIndex == numCourses) { // cannot find the course to be removed
         return false;   
      } else {  // remove the course and re-arrange for courses array
         for (int i = courseIndex; i < numCourses-1; i++) {
            courses[i] = courses[i+1];
         }
         numCourses--;
         return true;
      }
   }
}

public class Test {
   public static void main(String[] args) {
      // Test Student class
      Student s1 = new Student("Ankith", "Spring");
      s1.addCourseGrade("CMPE 273", 97);
      s1.addCourseGrade("CMPE 202", 82);
      s1.printGrades();
      System.out.println("Average is " + s1.getAverageGrade());
      
      // Test Teacher class
      Teacher t1 = new Teacher("ABC", "8 sunset way");
      System.out.println(t1);
      String[] courses = {"CMPE 273", "CMPE 202", "CMPE 272"};
      for (String course: courses) {
         if (t1.addCourse(course)) {
            System.out.println(course + " added.");
         } else {
            System.out.println(course + " cannot be added.");
         }
      }
      for (String course: courses) {
         if (t1.removeCourse(course)) {
            System.out.println(course + " removed.");
         } else {
            System.out.println(course + " cannot be removed.");
         }
      }
   }
}