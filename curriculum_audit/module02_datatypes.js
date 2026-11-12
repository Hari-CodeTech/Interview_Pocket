// Module 2: Data Types, Variables and Type Casting (Topics 56-60)

module.exports = [
  {
    topicId: 56,
    slug: 'data-types-primitive-non-primitive',
    title: 'Data Types in Java (Primitive vs Non-Primitive)',
    definition: `- **Definition**: A **Data Type** in Java specifies the size, type, and nature of values that can be stored in a variable, as well as the operations that can be performed on it.
- **Classification**: Java enforces a two-tier type system:
  1. **Primitive Data Types** (8 predefined value types).
  2. **Non-Primitive / Reference Data Types** (Objects, Classes, Interfaces, Arrays, Enums).`,
    simpleExplanation: `- **The Direct Cash vs Bank Check Analogy**:
  • **Primitive**: Like holding cash in your pocket. The variable holds the actual raw value directly on the Stack.
  • **Non-Primitive (Reference)**: Like holding a bank check or voucher. The variable does not hold the actual gold in your hands; it holds a reference (memory address) pointing to the object stored in the bank vault (the JVM Heap).`,
    importantConcepts: `- **The 8 Primitive Data Types**:
  • **Numeric Integers**:
    - \`byte\`: 1 byte (8 bits), range: \`-128\` to \`127\`, default: \`0\`.
    - \`short\`: 2 bytes (16 bits), range: \`-32,768\` to \`32,767\`, default: \`0\`.
    - \`int\`: 4 bytes (32 bits), range: \`-2,147,483,648\` to \`2,147,483,647\` (~ -2B to 2B), default: \`0\`.
    - \`long\`: 8 bytes (64 bits), range: \`-9,223,372,036,854,775,808\` to \`9,223,372,036,854,775,807\`, default: \`0L\`.
  • **Floating-Point Numbers**:
    - \`float\`: 4 bytes (32-bit IEEE 754 single precision), default: \`0.0f\`.
    - \`double\`: 8 bytes (64-bit IEEE 754 double precision), default: \`0.0d\`.
  • **Text & Logic**:
    - \`char\`: 2 bytes (16 bits unsigned Unicode UTF-16), range: \`0\` to \`65,535\` (\`'\\u0000'\` to \`'\\uffff'\`), default: \`'\\u0000'\`.
    - \`boolean\`: JVM-dependent (typically 1 byte in memory), values: \`true\` or \`false\`, default: \`false\`.`,
    importantDifferences: `| Dimension | Primitive Data Types | Non-Primitive (Reference) Types |
|---|---|---|
| **Definition** | Built-in predefined value types | User-defined or library reference types |
| **Number of Types** | Exactly 8 predefined types | Unlimited (Classes, Interfaces, Arrays) |
| **Memory Location** | Stored directly on the Stack (or inside object on Heap) | Reference on Stack; actual object instance on the Heap |
| **Default Value** | Assigned default (0, 0.0, false, '\\u0000') | Default value is always \`null\` |
| **Methods & Operations** | Cannot call methods (e.g. \`int.toString()\` is illegal) | Can invoke methods (e.g. \`str.toUpperCase()\`) |
| **Memory Size** | Fixed size defined by language specification | Varies based on object fields and JVM headers (16+ bytes) |
| **Nullability** | Cannot hold \`null\` value | Can hold \`null\` |`,
    javaCodeExamples: `public class DataTypesDemo {
    public static void main(String[] args) {
        // Primitive variables (Direct values)
        byte age = 25;
        int salary = 85000;
        double rating = 4.85;
        char grade = 'A';
        boolean isEmployed = true;

        // Non-primitive variables (References to Heap objects)
        String company = "Google";
        int[] scores = {98, 92, 95};

        System.out.println("Employee: Age=" + age + ", Salary=" + salary + ", Rating=" + rating);
        System.out.println("Company (Object): " + company + ", Top Score: " + scores[0]);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Employee: Age=25, Salary=85000, Rating=4.85
  Company (Object): Google, Top Score: 98
  \`\`\`
- Illustrates primitives holding raw numbers while \`company\` references a String object in the String Constant Pool.`,
    commonMistakes: `- Assuming \`boolean\` in Java can be \`0\` or \`1\` like in C/C++. In Java, \`boolean\` is strictly \`true\` or \`false\`. \`if (1)\` will NOT compile!
- Forgetting the \`L\` suffix on large numbers: \`long num = 10000000000;\` fails to compile because integer literals default to 32-bit \`int\`. Must write \`10000000000L\`.`,
    trickyInterviewConcepts: `- **Why is \`char\` 2 bytes in Java instead of 1 byte like in C?** Because C uses the 8-bit ASCII character set (128 characters), whereas Java uses the 16-bit **Unicode** character set to support international languages and scripts worldwide.`,
    interviewReadyAnswer: `- "Java's type system consists of 8 primitive types (byte, short, int, long, float, double, char, boolean) and non-primitive reference types (classes, arrays, interfaces)."
- "Primitives store raw values directly on the stack for high computational performance without object overhead, while reference types store memory references pointing to objects allocated on the JVM Heap."`,
    quickRevisionPoints: `- 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B), boolean.
- \`char\` is 2 bytes (Unicode UTF-16).
- \`boolean\` accepts ONLY \`true\` or \`false\` (not 0 or 1).
- Non-primitive default is \`null\`.`
  },
  {
    topicId: 57,
    slug: 'variables-local-instance-static',
    title: 'Variables in Java (Local, Instance and Static Variables)',
    definition: `- **Definition**: A **Variable** is a reserved memory location identified by a name that stores data that can be manipulated during program execution.
- **Classification**: Java variables are classified into **3 distinct scopes**:
  1. **Local Variables**
  2. **Instance Variables (Non-Static Fields)**
  3. **Static Variables (Class Variables)**`,
    simpleExplanation: `- **The Company Analogy**:
  • **Local Variable**: A post-it note on a developer's desk. Valid only while the developer works on a specific task; thrown in the trash when the task finishes.
  • **Instance Variable**: A company employee badge. Unique to each individual employee (object). If Bob updates his badge, Alice's badge does not change.
  • **Static Variable**: The company name on the building entrance. Shared equally by all employees (all instances of the class). If the company rebrands, every employee sees the new name.`,
    importantConcepts: `- **1. Local Variables**:
  • Declared inside a method, constructor, or code block (\`{}\`).
  • Created when the method is invoked; destroyed when the method returns.
  • Stored on the **JVM Stack** in the active stack frame.
  • **MUST BE INITIALIZED**: Java does NOT provide default values for local variables. Accessing an uninitialized local variable causes a compile-time error.
- **2. Instance Variables**:
  • Declared in a class outside of any method or block, without the \`static\` keyword.
  • Created when an object is instantiated with \`new\`; destroyed when the object is garbage-collected.
  • Stored on the **JVM Heap** as part of the object.
  • Automatically initialized with default values (\`0\`, \`0.0\`, \`false\`, \`null\`).
- **3. Static Variables**:
  • Declared with the \`static\` keyword inside a class outside of methods.
  • Loaded once when the class is loaded by the ClassLoader; exists until class unloads.
  • Stored in **Metaspace / Class Metadata Area** (Heap in modern JVMs).
  • Exactly ONE copy shared across all instances of the class. Accessed via \`ClassName.variableName\`.`,
    importantDifferences: `| Dimension | Local Variable | Instance Variable | Static Variable |
|---|---|---|---|
| **Declaration Scope** | Inside method/constructor/block | Inside class, outside methods | Inside class with \`static\` keyword |
| **Memory Location** | JVM Stack (Stack Frame) | JVM Heap (inside Object) | Metaspace / Class Area (Heap) |
| **Creation Timing** | When method execution starts | When object is created via \`new\` | When class is loaded by ClassLoader |
| **Destruction Timing** | When method execution ends | When object is garbage-collected | When class is unloaded |
| **Default Values?** | **NO** (must initialize manually) | **YES** (0, false, null) | **YES** (0, false, null) |
| **Access Modifiers** | Cannot use public/private/protected | Can use all access modifiers | Can use all access modifiers |
| **Number of Copies** | One per method invocation | One per object instance | Exactly ONE per class |`,
    javaCodeExamples: `public class VariableTypesDemo {
    // Static Variable (Shared across all students)
    static String university = "Stanford University";

    // Instance Variable (Unique to each student object)
    String studentName;
    int rollNumber;

    public VariableTypesDemo(String name, int roll) {
        this.studentName = name;
        this.rollNumber = roll;
    }

    public void displayStudent() {
        // Local Variable (Exists only during this method call)
        int examPassingMarks = 40; 

        System.out.println(studentName + " (Roll " + rollNumber + ") - " 
            + university + " [Passing: " + examPassingMarks + "]");
    }

    public static void main(String[] args) {
        VariableTypesDemo s1 = new VariableTypesDemo("Alice", 101);
        VariableTypesDemo s2 = new VariableTypesDemo("Bob", 102);

        s1.displayStudent();
        s2.displayStudent();

        // Modifying static variable affects all instances
        VariableTypesDemo.university = "Stanford Advanced Institute";
        System.out.println("--- After University Name Change ---");
        s1.displayStudent();
        s2.displayStudent();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Alice (Roll 101) - Stanford University [Passing: 40]
  Bob (Roll 102) - Stanford University [Passing: 40]
  --- After University Name Change ---
  Alice (Roll 101) - Stanford Advanced Institute [Passing: 40]
  Bob (Roll 102) - Stanford Advanced Institute [Passing: 40]
  \`\`\`
- Changing \`university\` once immediately reflects on both \`s1\` and \`s2\`.`,
    commonMistakes: `- Trying to access an uninitialized local variable:
  \`int x; System.out.println(x);\` -> Compile Error: \`variable x might not have been initialized\`.
- Applying access modifiers like \`public\` or \`private\` to local variables -> Compile Error: \`illegal start of expression\`.`,
    trickyInterviewConcepts: `- **Can we make a local variable static?** No! \`static int x = 10;\` inside a method causes a compile-time error. Static belongs to class-level scope, not method-level stack frames.
- **Can a local variable have the same name as an instance variable?** Yes! This is called **Shadowing**. Use \`this.variableName\` to disambiguate the instance variable from the local variable.`,
    interviewReadyAnswer: `- "Java variables are categorized into three types based on scope and lifecycle: Local, Instance, and Static."
- "Local variables reside on the stack during method execution and require manual initialization. Instance variables belong to objects on the heap and have default values. Static variables are loaded once per class in class metadata and are shared across all instances."`,
    quickRevisionPoints: `- Local: Stack, method scope, NO default value.
- Instance: Heap, object scope, has default value.
- Static: Class area, shared copy, \`ClassName.var\`.
- Local variables cannot be \`static\`, \`public\`, or \`private\`.`
  },
  {
    topicId: 58,
    slug: 'literals-in-java',
    title: 'Literals in Java',
    definition: `- **Definition**: A **Literal** is a source code representation of a constant, fixed value that is directly assigned to a variable without computation.
- **Classification**:
  1. Integer Literals (Decimal, Octal, Hexadecimal, Binary)
  2. Floating-Point Literals (\`float\`, \`double\`)
  3. Character Literals (Single character, Unicode, Escape sequences)
  4. String Literals (Sequences of characters in quotes)
  5. Boolean Literals (\`true\`, \`false\`)
  6. Null Literal (\`null\`)`,
    simpleExplanation: `- If a variable is a label on a cardboard box, the literal is the actual physical item you place inside that box. In \`int age = 25;\`, \`age\` is the variable identifier and \`25\` is the numeric literal.`,
    importantConcepts: `- **1. Integer Literal Bases**:
  • **Decimal (Base 10)**: Default (e.g. \`100\`).
  • **Octal (Base 8)**: Prefix with \`0\` (e.g. \`012\` = \`1 * 8^1 + 2 * 8^0 = 10\`).
  • **Hexadecimal (Base 16)**: Prefix with \`0x\` or \`0X\` (e.g. \`0x1A\` = 26).
  • **Binary (Base 2, Java 7+)**: Prefix with \`0b\` or \`0B\` (e.g. \`0b1010\` = 10).
- **2. Underscores in Numeric Literals (Java 7+)**:
  • Used to improve readability: \`int million = 1_000_000;\`, \`long card = 1234_5678_9012_3456L;\`.
  • Rule: Underscore cannot be placed at the start, end, adjacent to decimal point, or before \`L\`/\`F\`.
- **3. Character Literals**:
  • Single quote enclosed: \`'A'\`, \`'9'\`.
  • Escape sequences: \`'\\n'\` (newline), \`'\\t'\` (tab), \`'\\\\'\` (backslash), \`'\\''\` (single quote).
  • Unicode: \`'\\u0041'\` (evaluates to 'A').`,
    javaCodeExamples: `public class LiteralsDemo {
    public static void main(String[] args) {
        // Different numeric bases representing the value 10
        int dec = 10;
        int oct = 012;     // Octal 12 = 10 in decimal
        int hex = 0xA;     // Hex A = 10 in decimal
        int bin = 0b1010;  // Binary 1010 = 10 in decimal

        System.out.println("Dec: " + dec + ", Oct: " + oct + ", Hex: " + hex + ", Bin: " + bin);

        // Underscore in literal
        int creditLimit = 5_000_000;
        char heart = '\\u2764'; // Unicode heart symbol

        System.out.println("Credit Limit: " + creditLimit + " " + heart);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Dec: 10, Oct: 10, Hex: 10, Bin: 10
  Credit Limit: 5000000 ❤
  \`\`\`
- Shows all 4 bases outputting standard decimal \`10\`, and Unicode literal rendering.`,
    commonMistakes: `- Putting a leading zero accidentally: \`int code = 050;\`. Because of leading \`0\`, Java treats it as octal \`050\`, resulting in decimal \`40\` instead of \`50\`!
- Forgetting that floating-point literal defaults to \`double\`: \`float f = 3.14;\` causes compile error. Must be \`3.14f\`.`,
    trickyInterviewConcepts: `- **What is the default type of an integer literal and a floating literal?**
  • Integer literals default to \`int\` (32-bit).
  • Floating literals default to \`double\` (64-bit).`,
    interviewReadyAnswer: `- "A literal is a source code representation of a fixed value assigned to a variable."
- "Java supports integer literals across decimal, octal (0), hex (0x), and binary (0b) bases, floating literals with 'f' or 'd' suffixes, character/Unicode literals, String literals in the SCP, boolean literals, and the null literal."`,
    quickRevisionPoints: `- Octal prefix: \`0\`.
- Hex prefix: \`0x\` or \`0X\`.
- Binary prefix: \`0b\` or \`0B\`.
- Underscore \`_\` permitted between digits for readability.
- Float requires \`f\`/\`F\` suffix.`
  },
  {
    topicId: 59,
    slug: 'type-casting-implicit-explicit',
    title: 'Type Casting (Implicit and Explicit Casting)',
    definition: `- **Definition**: **Type Casting** is the process of converting a variable of one data type into another data type.
- **Classification**:
  1. **Widening Casting (Implicit / Automatic)**
  2. **Narrowing Casting (Explicit / Manual)**`,
    simpleExplanation: `- **The Water Container Analogy**:
  • **Widening (Implicit)**: Pouring water from a 1-liter bottle into a 5-liter bucket. It fits automatically with zero spillage (no data loss).
  • **Narrowing (Explicit)**: Pouring water from a 5-liter bucket into a 1-liter bottle. It requires manual intervention (explicit cast operator) and will overflow and lose water (data loss / truncation).`,
    howItWorks: `- **1. Widening Casting (Automatic)**:
  • Converts a smaller data type to a larger data type.
  • Safe, automatic, no syntax needed.
  • Conversion Order:
    \`byte -> short -> int -> long -> float -> double\`
    \`char -> int\`
- **2. Narrowing Casting (Manual)**:
  • Converts a larger data type to a smaller data type.
  • Requires cast operator: \`(targetType) value\`.
  • Potential data loss or binary overflow.
  • Conversion Order:
    \`double -> float -> long -> int -> short -> byte\`
    \`int -> char\``,
    importantDifferences: `| Dimension | Widening (Implicit) Casting | Narrowing (Explicit) Casting |
|---|---|---|
| **Direction** | Smaller type -> Larger type | Larger type -> Smaller type |
| **Automation** | Automatic by the Java compiler | Requires explicit cast operator: \`(type)\` |
| **Data Loss Risk** | Zero data loss (safe) | Risk of truncation and binary overflow |
| **Performance** | Native register promotion | Truncation / bitwise masking |
| **Example** | \`int i = 10; double d = i;\` | \`double d = 9.99; int i = (int) d;\` |`,
    javaCodeExamples: `public class TypeCastingDemo {
    public static void main(String[] args) {
        // 1. Widening (Implicit) Casting: int to double
        int myInt = 100;
        double myDouble = myInt; // Automatic
        System.out.println("Widening: int=" + myInt + " -> double=" + myDouble);

        // 2. Narrowing (Explicit) Casting: double to int (Truncation)
        double price = 99.85;
        int roundedPrice = (int) price; // Fractional part dropped
        System.out.println("Narrowing: double=" + price + " -> int=" + roundedPrice);

        // 3. Overflow Scenario: int to byte (-128 to 127)
        int largeVal = 130;
        byte byteVal = (byte) largeVal; // 130 overflows byte range
        System.out.println("Byte Overflow: int=" + largeVal + " -> byte=" + byteVal);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Widening: int=100 -> double=100.0
  Narrowing: double=99.85 -> int=99
  Byte Overflow: int=130 -> byte=-126
  \`\`\`
- \`130\` in binary is \`00000000 00000000 00000000 10000010\`. Truncating to 8 bits gives \`10000010\`, which is \`-126\` in signed 2's complement.`,
    commonMistakes: `- Assuming narrowing rounds to the nearest integer. Narrowing simply **truncates** the decimal part (\`9.99\` becomes \`9\`).
- Forgetting that arithmetic on \`byte\` and \`short\` automatically promotes to \`int\`:
  \`byte a = 10; byte b = 20; byte c = a + b;\` -> Compile Error! Must cast: \`byte c = (byte)(a + b);\`.`,
    trickyInterviewConcepts: `- **What happens when you do: \`short s = 5; s = s + 5;\` vs \`s += 5;\`?**
  • \`s = s + 5;\` fails to compile because \`s + 5\` produces an \`int\`.
  • \`s += 5;\` compiles successfully because compound assignment operators perform an implicit cast: \`s = (short)(s + 5)\`.`,
    interviewReadyAnswer: `- "Type casting in Java is either Widening (implicit) or Narrowing (explicit)."
- "Widening converts smaller types to larger types automatically with no data loss (e.g., int to double). Narrowing converts larger types to smaller types using the cast operator (e.g., (int) 9.99), which causes truncation and potential binary overflow."`,
    quickRevisionPoints: `- Widening: automatic, smaller -> larger, safe.
- Narrowing: manual \`(type)\`, larger -> smaller, data loss.
- Byte arithmetic automatically promotes to \`int\`.
- Compound operators (\`+=\`) include built-in implicit cast.`
  },
  {
    topicId: 60,
    slug: 'scanner-class-console-input',
    title: 'Scanner Class & Standard Console Input',
    definition: `- **Definition**: **\`java.util.Scanner\`** is a utility class introduced in Java 5 designed to parse primitive types and strings using regular expressions from standard input streams, files, or strings.
- **Package**: Belongs to the **\`java.util\`** package; requires an explicit import: \`import java.util.Scanner;\`.
- **Underlying Stream**: Typically instantiated wrapping **\`System.in\`** (standard keyboard input stream).`,
    simpleExplanation: `- **The Sorter at a Mailbox Analogy**: \`System.in\` is the raw mail chute bringing in raw bytes. \`Scanner\` is the trained postal clerk standing at the chute who inspects incoming letters, translates them into integers, words, or full sentences, and hands them to you in the exact format you asked for.`,
    whyNeeded: `- Prior to Java 5, reading console input required verbose boilerplate using \`BufferedReader\`, \`InputStreamReader\`, and manual parsing:
  \`int x = Integer.parseInt(new BufferedReader(new InputStreamReader(System.in)).readLine());\`
- \`Scanner\` simplified console I/O into intuitive one-line method calls: \`int x = sc.nextInt();\`.`,
    syntax: `import java.util.Scanner;

// Create Scanner object wrapping standard input
Scanner scanner = new Scanner(System.in);

// Read data
int age = scanner.nextInt();
String name = scanner.nextLine();

// Close scanner to release underlying resource
scanner.close();`,
    importantConcepts: `- **Core Scanner Methods**:
  • \`nextInt()\`: Scans the next token as an \`int\`.
  • \`nextDouble()\`: Scans the next token as a \`double\`.
  • \`next()\`: Reads the next single word (stops at whitespace or newline).
  • \`nextLine()\`: Reads the entire line including spaces up to the newline character \`\\n\`.
  • \`nextBoolean()\`: Reads a boolean token (\`true\` or \`false\`).
  • \`hasNextInt()\`: Checks if the next token can be parsed as an int (prevents \`InputMismatchException\`).
- **THE CRITICAL NEWLINE BUFFER TRAP**:
  • When a user enters \`25\` and presses Enter, \`System.in\` receives: \`"25\\n"\`.
  • \`sc.nextInt()\` reads only the digits \`25\` and leaves the trailing newline \`\\n\` sitting in the buffer!
  • If you immediately call \`sc.nextLine()\`, it consumes that leftover \`\\n\` and returns an empty string without waiting for user input!
  • **Solution**: Call an extra \`sc.nextLine()\` immediately after \`nextInt()\`/\`nextDouble()\` to clear the buffer.`,
    javaCodeExamples: `import java.util.Scanner;

public class ScannerInputDemo {
    public static void main(String[] args) {
        // String simulated input demonstrating the buffer issue & fix
        String simulatedInput = "101\\nAlex Mercer\\n88.5\\n";
        Scanner sc = new Scanner(simulatedInput);

        System.out.println("=== Reading Console Input ===");
        
        // 1. Read integer
        int id = sc.nextInt();
        
        // 2. Clear trailing newline from buffer before reading nextLine
        sc.nextLine(); 
        
        // 3. Read full string line
        String fullName = sc.nextLine();
        
        // 4. Read double
        double score = sc.nextDouble();

        System.out.println("ID: " + id);
        System.out.println("Full Name: " + fullName);
        System.out.println("Score: " + score);

        sc.close();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  === Reading Console Input ===
  ID: 101
  Full Name: Alex Mercer
  Score: 88.5
  \`\`\`
- Because \`sc.nextLine()\` cleared the newline after \`nextInt()\`, \`fullName\` correctly received \`"Alex Mercer"\` instead of an empty string.`,
    commonMistakes: `- Omitting \`sc.nextLine()\` buffer flush between \`nextInt()\` and \`nextLine()\`, causing the name input to be skipped completely.
- Entering non-numeric text when calling \`nextInt()\`, which throws \`java.util.InputMismatchException\`. Always guard with \`hasNextInt()\` in production.
- Forgetting to import \`java.util.Scanner;\`.`,
    trickyInterviewConcepts: `- **What happens if you close a Scanner wrapped around System.in?**
  • Calling \`sc.close()\` closes the underlying \`System.in\` stream!
  • If you attempt to open a new \`Scanner(System.in)\` later in the program, you cannot read any further input because \`System.in\` cannot be reopened once closed.`,
    interviewReadyAnswer: `- "Scanner is a utility class in java.util used to parse primitive types and strings from input streams using regular expressions."
- "A classic interview trap is the newline buffer problem: methods like nextInt() read only numeric characters, leaving the trailing newline in the buffer. Calling nextLine() immediately afterward consumes that leftover newline unless cleared with an intermediate sc.nextLine() call."`,
    quickRevisionPoints: `- Package: \`java.util.Scanner\`.
- \`next()\`: reads single word; \`nextLine()\`: reads full sentence.
- Always clear buffer with \`sc.nextLine()\` after \`nextInt()\`.
- Guard inputs with \`hasNextInt()\` to prevent \`InputMismatchException\`.
- Closing scanner closes underlying \`System.in\`.`
  }
];

