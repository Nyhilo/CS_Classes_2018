/*
 * C# Program to Display All the Prime Numbers Between 1 to 100
 */
using System;                                       // Give us access to a lot of system specific type groups. In particular, the Console class.
using System.Collections.Generic;                   // I'm actually not sure why this is here. This program doesn't use collections
using System.Linq;                                  // Same thing here. The program compiles jsut fine without Collections or Linq
using System.Text;                                  // Allows for different text encodings (such as UTF-8)
namespace PrimeNumber                               // Program name
{
    class Program                                   // Main program class
    {
        static void Main(string[] args)             // Static -> we don't need an object to run this method. void -> the method returns nothing.
        {                                               // Main -> method name. string[] args -> takes an array of strings as a command line input.
                                                        // although this is superfluous since this program takes no command line arguments.
            bool isPrime = true;                    // Declare a boolean and set it to true
            Console.WriteLine("Prime Numbers : ");  // Start the list in the command line output with a header "Prime Numbers : "
            for (int i = 2; i <= 100; i++)          // Loop through every number between 2 and 100 (we don't need to confirm that 1 is prime)
            {
                for (int j = 2; j <= 100; j++)      // For each number in the i loop, loop through 2->100 again to do operations on the numbers
                {
 
                    if (i != j && i % j == 0)       // The boolean set earlier will stay true for as long as i and j are never shown to be
                    {                                   // multiples of each other. If the modulo of i and j ever equal 0, excepting 
                        isPrime = false;                // when i == j, the boolean is set to false.
                        break;                      // and the subloop is broken.
                    }
 
                }
                if (isPrime)                        // If, after the j loop is finishes or is broken, the boolean is still true, we can 
                {                                           // confidently state that the variable in the i loop is prime.
                    Console.Write("\t" +i);         // Print the prime number, tab separated, to console.
                }
                isPrime = true;                     // Reset the boolean to true for the next loop.
            }
            Console.ReadKey();                      // Waits for the user to press a key and end the program
        }
    }
}