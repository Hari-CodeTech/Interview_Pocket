// Module 4: Arrays and Random Class (Topics 66-71)

module.exports = [
  {
    topicId: 66,
    slug: 'introduction-to-arrays',
    title: 'Introduction to Arrays & Memory Representation',
    definition: `- **Definition**: An **Array** is a fixed-size, indexed data structure that stores a collection of elements of the same data type in contiguous memory locations.
- **Key Characteristics**:
  • Homogeneous (all elements share identical data type).
  • Fixed length (size cannot grow or shrink after instantiation).
  • Zero-indexed (first element at index \`0\`, last at \`length - 1\`).
  • In Java, arrays are full first-class **Objects** allocated on the JVM Heap.`,
    simpleExplanation: `- **The Pill Organizer Box Analogy**: A 7-day pill organizer has 7 fixed slots numbered Sunday (0) to Saturday (6). Each slot is identically sized and holds the same type of medication. You cannot add an 8th slot without buying an entirely new organizer box.`,
    internalWorking: `- **Heap Allocation**: The array object resides in JVM Heap memory, containing:
  • Object header (mark word + class pointer).
  • Array length field (accessed via \`arr.length\`).
  • Contiguous memory elements.
- **Reference Variable on Stack**: The array variable (e.g. \`int[] arr\`) is a reference stored in the current thread's Stack frame pointing to the Heap object.
- **Index Calculation**: Address of element at index \`i\` is computed in O(1) constant time:
  \`Address = BaseAddress + (i * elementSizeInBytes)\`.`,
    javaCodeExamples: `public class ArrayIntroductionDemo {
    public static void main(String[] args) {
        // Declaring and instantiating an integer array of size 4
        int[] scores = new int[4];

        // Default values in Java arrays are automatically 0
        System.out.println("Default initial element: " + scores[0]);

        // Populating array elements
        scores[0] = 85;
        scores[1] = 92;
        scores[2] = 78;
        scores[3] = 95;

        // Array property length (note: length is a final field, NOT a method)
        System.out.println("Array Length: " + scores.length);
        System.out.println("First element (index 0): " + scores[0]);
        System.out.println("Last element (index 3): " + scores[scores.length - 1]);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Default initial element: 0
  Array Length: 4
  First element (index 0): 85
  Last element (index 3): 95
  \`\`\`
- Proves zero-indexing and instant O(1) random access by index.`,
    commonMistakes: `- Writing \`scores.length()\` with parentheses. In Java, \`length\` on arrays is a **field**, whereas \`length()\` on String is a method!
- Accessing an invalid index: \`scores[4]\` throws \`java.lang.ArrayIndexOutOfBoundsException\`.`,
    interviewReadyAnswer: `- "An array in Java is an indexed collection of homogeneous elements stored in contiguous heap memory."
- "Arrays are full objects in Java with a final length field. They offer O(1) random access time via base address pointer arithmetic, but have a fixed size that cannot be resized after allocation."`,
    quickRevisionPoints: `- Arrays are Objects on the Heap.
- Fixed size; homogeneous elements.
- \`arr.length\` is a field, not a method.
- Access time is O(1); Out-of-bounds throws \`ArrayIndexOutOfBoundsException\`.`
  },
  {
    topicId: 67,
    slug: 'array-declaration-instantiation-initialization',
    title: 'Array Declaration, Instantiation and Initialization',
    definition: `- **The 3 Stages of Array Creation**:
  1. **Declaration**: Informs the compiler of the array reference name and element type.
  2. **Instantiation**: Allocates memory on the JVM Heap with \`new\` keyword and sets fixed size.
  3. **Initialization**: Assigns actual values to array indices.`,
    simpleExplanation: `- **The Parking Spot Reservation Analogy**:
  • Declaration: Placing a sign saying "Reserved for Fleet Vehicles" (creating the reference).
  • Instantiation: Paving and marking exactly 5 physical parking bays (allocating heap memory).
  • Initialization: Driving specific cars into bay #0, #1, #2 (assigning values).`,
    syntax: `// 1. Declaration
int[] arr;      // Preferred standard Java syntax
int arr2[];     // C-style syntax (legal but discouraged)

// 2. Instantiation (Size must be specified)
arr = new int[5];

// 3. Declaration, Instantiation, and Initialization combined
int[] numbers = {10, 20, 30, 40, 50}; // Array literal syntax
int[] data = new int[]{1, 2, 3};      // Anonymous array syntax`,
    importantConcepts: `- **Default Values upon Instantiation**:
  • Integers (byte, short, int, long): \`0\`
  • Floating-point (float, double): \`0.0\`
  • Boolean: \`false\`
  • Characters: \`'\\u0000'\` (null character)
  • Object References (String, custom objects): \`null\`
- **Anonymous Arrays**:
  • Arrays instantiated and initialized inline without assigning to a reference variable: \`printScores(new int[]{90, 85, 95});\`.`,
    javaCodeExamples: `public class ArrayCreationDemo {
    public static void main(String[] args) {
        // Approach A: Explicit Instantiation
        String[] fruits = new String[3];
        fruits[0] = "Apple";
        fruits[1] = "Banana";
        fruits[2] = "Mango";

        // Approach B: Array Literal (Compiler infers size = 4)
        int[] primes = {2, 3, 5, 7};

        // Approach C: Anonymous Array passed to method
        int total = calculateSum(new int[]{10, 20, 30});

        System.out.println("First Fruit: " + fruits[0]);
        System.out.println("Primes count: " + primes.length);
        System.out.println("Calculated Sum: " + total);
    }

    private static int calculateSum(int[] values) {
        int sum = 0;
        for (int v : values) sum += v;
        return sum;
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  First Fruit: Apple
  Primes count: 4
  Calculated Sum: 60
  \`\`\`
- Demonstrates array literal and anonymous array creation patterns.`,
    commonMistakes: `- Specifying size during declaration: \`int[5] arr;\` -> Compile Error! Size belongs to instantiation, not declaration.
- Specifying size when using array literal: \`int[] arr = new int[3]{1, 2, 3};\` -> Compile Error!`,
    interviewReadyAnswer: `- "Array creation involves declaration (naming the reference), instantiation (allocating heap memory with a specified size using new), and initialization (assigning values)."
- "Java supports array literal syntax {1, 2, 3} for inline creation and automatically initializes unassigned elements to type defaults (0, false, or null)."`,
    quickRevisionPoints: `- Syntax: \`int[] arr = new int[5];\`
- Size cannot be specified in declaration (\`int[5] a;\` is illegal).
- Literal syntax: \`int[] arr = {1, 2, 3};\`.
- Anonymous array: \`new int[]{1, 2, 3}\`.`
  },
  {
    topicId: 68,
    slug: 'types-of-arrays-multidimensional',
    title: 'Types of Arrays (Single & Multi-Dimensional, Jagged Arrays)',
    definition: `- **Array Types**:
  1. **Single-Dimensional Arrays**: Linear vector of elements (\`int[]\`).
  2. **Multi-Dimensional Arrays**: An array of arrays (e.g. 2D grid \`int[][]\`).
  3. **Jagged (Ragged) Arrays**: A multi-dimensional array where member sub-arrays have **different lengths**.`,
    simpleExplanation: `- **The Spreadsheet vs Stadium Seating Analogy**:
  • Standard 2D Array: A standard Excel grid where every row has exactly 5 columns.
  • Jagged Array: A stadium auditorium where Row 1 has 10 seats, Row 2 has 15 seats, and Row 3 has 20 seats. In Java, 2D arrays are actually arrays of references, allowing each row to be an independently sized array!`,
    howItWorks: `- **How 2D Arrays Reside in Memory**:
  • In Java, \`int[][] matrix = new int[3][4];\` does NOT allocate a single monolithic 12-slot memory block.
  • Instead, it creates 1 top-level array of length 3 containing references. Each reference points to an independent 4-element array in the Heap.
  • This is why **Jagged Arrays** are natively supported: each row reference can point to an array of different size!`,
    javaCodeExamples: `public class JaggedArrayDemo {
    public static void main(String[] args) {
        // Declaring a 2D jagged array with 3 rows
        int[][] jagged = new int[3][];

        // Instantiating each row with a different column count
        jagged[0] = new int[2]; // Row 0 has 2 columns
        jagged[1] = new int[4]; // Row 1 has 4 columns
        jagged[2] = new int[3]; // Row 2 has 3 columns

        // Populating and printing the jagged array
        int count = 1;
        for (int r = 0; r < jagged.length; r++) {
            for (int c = 0; c < jagged[r].length; c++) {
                jagged[r][c] = count++;
                System.out.print(jagged[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  1 2 
  3 4 5 6 
  7 8 9 
  \`\`\`
- Clearly shows Row 0 has 2 elements, Row 1 has 4 elements, and Row 2 has 3 elements.`,
    commonMistakes: `- Trying to access elements of an uninstantiated jagged row:
  \`int[][] arr = new int[2][]; arr[0][0] = 5;\` -> Throws \`NullPointerException\` because row \`arr[0]\` is still \`null\`!`,
    interviewReadyAnswer: `- "Java represents 2D arrays as 'arrays of arrays'. Rather than a contiguous matrix, a top-level array stores references to independent heap arrays."
- "This architecture allows Jagged Arrays, where each row array can have a distinct length, optimizing memory when rows represent varying dataset sizes."`,
    quickRevisionPoints: `- 2D arrays are arrays of array references.
- Jagged array: Rows have different column lengths.
- Must instantiate sub-arrays before accessing: \`arr[i] = new int[len];\`.
- Prevents wasted memory on sparse matrices.`
  },
  {
    topicId: 69,
    slug: 'array-operations-traversal',
    title: 'Array Operations & Common Interview Traversal Patterns',
    definition: `- **Definition**: Standard algorithmic techniques to traverse, search, reverse, filter, and manipulate array elements efficiently.
- **Key Patterns**:
  1. Sequential Traversal (Forward & Reverse).
  2. Two-Pointer Technique (In-place reversal, pair sum).
  3. Finding Minimum and Maximum in O(n) time.
  4. Linear Search vs Binary Search.`,
    simpleExplanation: `- Array traversal is like reading a ledger line by line. The **Two-Pointer technique** is like two detectives starting from opposite ends of a street and walking toward each other, checking houses simultaneously until they meet in the middle.`,
    javaCodeExamples: `public class ArrayOperationsDemo {
    public static void main(String[] args) {
        int[] numbers = {14, 7, 32, 9, 45, 18};

        // 1. Finding Min and Max in a single pass O(n)
        int min = numbers[0];
        int max = numbers[0];
        for (int num : numbers) {
            if (num < min) min = num;
            if (num > max) max = num;
        }
        System.out.println("Min: " + min + ", Max: " + max);

        // 2. In-Place Reversal using Two-Pointer Technique (O(n) time, O(1) space)
        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int temp = numbers[left];
            numbers[left] = numbers[right];
            numbers[right] = temp;
            left++;
            right--;
        }

        System.out.print("Reversed Array: ");
        for (int n : numbers) System.out.print(n + " ");
        System.out.println();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Min: 7, Max: 45
  Reversed Array: 18 45 9 32 7 14 
  \`\`\`
- Demonstrates optimal in-place swapping with zero extra memory allocation.`,
    trickyInterviewConcepts: `- **What is the time complexity of searching an unsorted array vs a sorted array?**
  • Unsorted: Linear search = O(n).
  • Sorted: Binary search = O(log n).`,
    interviewReadyAnswer: `- "Common array operations include traversal, extremum search (min/max in O(n)), and the two-pointer technique for in-place modifications like reversing or partition."
- "The two-pointer technique achieves O(n) time complexity with O(1) auxiliary space by maintaining pointers at both ends converging toward the center."`,
    quickRevisionPoints: `- Min/Max search: O(n) time, O(1) space.
- Two-pointer technique: In-place array reversal in O(n/2) swaps.
- Binary search requires array to be sorted first.`
  },
  {
    topicId: 70,
    slug: 'arrays-utility-class',
    title: 'java.util.Arrays Utility Class',
    definition: `- **Definition**: **\`java.util.Arrays\`** is a standard library utility class containing static helper methods for manipulating arrays (sorting, searching, filling, comparing, and converting to String).
- **Package**: \`java.util.Arrays\` (Requires import).`,
    simpleExplanation: `- Instead of manually writing 30 lines of code to bubble-sort an array, print its elements with brackets, or compare two arrays for equality, the \`Arrays\` utility provides battle-tested, highly optimized one-line static methods.`,
    importantConcepts: `- **Core Utility Methods**:
  • \`Arrays.toString(arr)\`: Converts 1D array into human-readable string: \`"[1, 2, 3]"\`.
  • \`Arrays.deepToString(matrix)\`: Converts multi-dimensional arrays to string.
  • \`Arrays.sort(arr)\`: Sorts primitives using Dual-Pivot Quicksort (O(n log n)); sorts objects using TimSort.
  • \`Arrays.binarySearch(arr, key)\`: Finds element index using binary search in O(log n); **array MUST be sorted first**!
  • \`Arrays.equals(arr1, arr2)\`: Returns true if both arrays contain equal elements in the exact same order.
  • \`Arrays.fill(arr, val)\`: Fills entire array with a specified value.
  • \`Arrays.copyOf(arr, newLength)\`: Truncates or pads array into a newly allocated copy.
  • \`Arrays.asList(T... a)\`: Wraps an array into a fixed-size \`List\` view.`,
    javaCodeExamples: `import java.util.Arrays;

public class ArraysUtilityDemo {
    public static void main(String[] args) {
        int[] scores = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 45, 8};

        // 1. Sort using Dual-Pivot Quicksort
        Arrays.sort(scores);
        System.out.println("Sorted: " + Arrays.toString(scores));

        // 2. Binary search on sorted array
        int target = 44;
        int foundIndex = Arrays.binarySearch(scores, target);
        System.out.println("Element " + target + " found at sorted index: " + foundIndex);

        // 3. Array Equality
        int[] copy = Arrays.copyOf(scores, scores.length);
        System.out.println("Arrays equal? " + Arrays.equals(scores, copy));
    }
}`,
    outputExplanation: `- Demonstrates sorting, binary searching, and array formatting in 3 lines of code without manual loops.`,
    commonMistakes: `- Calling \`Arrays.binarySearch()\` on an unsorted array (returns undefined/negative incorrect results).
- Printing an array directly with \`System.out.println(arr)\`, which prints the object hash code (e.g. \`[I@1b6d3586\`) instead of elements. Always use \`Arrays.toString(arr)\`!`,
    interviewReadyAnswer: `- "java.util.Arrays provides static utility methods for arrays including sort(), binarySearch(), toString(), equals(), and copyOf()."
- "Primitives are sorted via Dual-Pivot Quicksort while objects use TimSort. Arrays.toString() is the standard way to inspect array elements without writing manual loops."`,
    quickRevisionPoints: `- Use \`Arrays.toString(arr)\` to print arrays.
- \`Arrays.sort()\`: Dual-Pivot Quicksort (primitives), TimSort (objects).
- \`Arrays.binarySearch()\`: requires sorted array.
- \`Arrays.copyOf()\`: creates resized clone.`
  },
  {
    topicId: 71,
    slug: 'random-class-in-java',
    title: 'java.util.Random Class in Java',
    definition: `- **Definition**: **\`java.util.Random\`** is a utility class that generates streams of pseudorandom numbers (integers, doubles, booleans, floats, longs) based on a 48-bit seed and linear congruential formula.
- **Alternatives**: \`Math.random()\` and \`ThreadLocalRandom\` (for multi-threaded environments).`,
    simpleExplanation: `- **The Rolling Dice Analogy**: \`Random\` is an automated pair of dice. Every time you roll it (\`random.nextInt(6) + 1\`), it gives you a number between 1 and 6. If you initialize the dice with the exact same "seed" (starting state), it rolls the exact same sequence of numbers every single time.`,
    importantConcepts: `- **Core Methods**:
  • \`nextInt(bound)\`: Returns random integer between \`0\` (inclusive) and \`bound\` (exclusive).
  • \`nextDouble()\`: Returns random double between \`0.0\` (inclusive) and \`1.0\` (exclusive).
  • \`nextBoolean()\`: Returns random \`true\` or \`false\`.
- **Pseudorandom vs Cryptographic**:
  • \`java.util.Random\` is **pseudorandom** (deterministic based on seed).
  • For security tokens and passwords, use **\`java.security.SecureRandom\`**!
- **Multithreading Consideration**:
  • \`Random\` is thread-safe using atomic compare-and-swap (CAS), but causes thread contention under high concurrency.
  • In multi-threaded applications, always use **\`ThreadLocalRandom.current()\`**!`,
    javaCodeExamples: `import java.util.Random;

public class RandomDemo {
    public static void main(String[] args) {
        Random rand = new Random();

        // 1. Simulating 6-sided dice rolls (1 to 6)
        int diceRoll = rand.nextInt(6) + 1;
        System.out.println("Dice Roll (1-6): " + diceRoll);

        // 2. Generating a 4-digit OTP (1000 to 9999)
        int otp = 1000 + rand.nextInt(9000);
        System.out.println("Generated 4-digit OTP: " + otp);

        // 3. Random boolean
        boolean coinFlip = rand.nextBoolean();
        System.out.println("Coin Flip: " + (coinFlip ? "Heads" : "Tails"));
    }
}`,
    outputExplanation: `- Outputs randomized values within the bounded ranges for gaming, simulation, and OTP generation.`,
    interviewReadyAnswer: `- "java.util.Random generates pseudorandom numbers across various primitive types using a linear congruential generator."
- "For security applications like password hashing or token generation, SecureRandom must be used. In high-concurrency multi-threaded environments, ThreadLocalRandom avoids thread contention."`,
    quickRevisionPoints: `- \`nextInt(n)\`: generates \`0\` to \`n-1\`.
- Range \`min\` to \`max\`: \`min + rand.nextInt(max - min + 1)\`.
- Multithreading: Use \`ThreadLocalRandom.current()\`.
- Cryptographic security: Use \`SecureRandom\`.`
  }
];

