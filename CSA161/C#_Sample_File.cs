/*
 * C# Program to Display All the Prime Numbers Between 1 to 100
 */
using System;                                       // Give us access to a lot of system specific type groups. In particular, the Console type
using System.Collections.Generic;                   
using System.Linq;
using System.Text;
namespace PrimeNumber                               // Program name
{
    class Program                                   // Main program class
    {
        static void Main(string[] args)             // Static -> we don't need an object to run this method. void -> the method returns nothing.
        {                                               // Main -> method name. string[] args -> takes an array of strings as a command line iput.
                                                        // although this is superfluos since this program takes no arguments.
            bool isPrime = true;                    // Declare a boolean and set it to true
            Console.WriteLine("Prime Numbers : ");  // Start the list in the command line output with a header "Prime Numbers : "
            for (int i = 2; i <= 100; i++)
            {
                for (int j = 2; j <= 100; j++)
                {
 
                    if (i != j && i % j == 0)
                    {
                        isPrime = false;
                        break;
                    }
 
                }
                if (isPrime)
                {
                    Console.Write("\t" +i);
                }
                isPrime = true;
            }
            Console.ReadKey();                      // Waits for the user to press a key and end the program
        }
    }
}