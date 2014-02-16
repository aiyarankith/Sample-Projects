import java.io.*;

public class ReadFile {

    public static void main(String[] args){
        String string="";
        String file ="textFile.txt";
        String path = "C:\\Users\\Ankith\\Desktop\\Ankith.txt";
       
        //reading   
        try{
            InputStream is=new FileInputStream(path); 
            InputStreamReader isr=new InputStreamReader(is);
            BufferedReader br=new BufferedReader(isr);
            String line;
            
            while ((line=br.readLine())!=null){
                System.out.println(line);
                string+=line+"\n";
            }
            br.close(); 
            
        }       
        catch (Exception e){
            System.out.println(e.toString());
        }

        //writing
        try {
            FileWriter fw = new FileWriter (file);
            BufferedWriter bw = new BufferedWriter (fw);
            PrintWriter fileOut = new PrintWriter (bw); 
                fileOut.println (string+"\n test of read and write !!"); 
            fileOut.close();
            System.out.println("the file " + file + " is created!"); 
        }
        catch (Exception e){
            System.out.println(e.toString());
        }       
    }
}