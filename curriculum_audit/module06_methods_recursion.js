// Module 6: Methods and Recursion (Topics 79-84)

module.exports = [
  {
    topicId: 79,
    slug: 'methods-in-java-anatomy',
    title: 'Methods in Java & Anatomy of a Method',
    definition: `- **Definition**: A **Method** is a block of code or collection of statements grouped together to perform a specific operation, achieve code reusability, and modularize logic.
- **Anatomy**: A complete method declaration consists of:
  1. Access Modifier (\`public\`, \`protected\`, \`default\`, \`private\`)
  2. Optional Specifiers (\`static\`, \`final\`, \`synchronized\`, \`abstract\`)
  3. Return Type (Primitive, Object type, or \`void\`)
  4. Method Name (Verb, camelCase by convention)
  5. Parameter List (enclosed in parentheses \`()\`)
  6. Optional Throws Clause (Checked exceptions)
  7. Method Body (enclosed in braces \`{}\`)`,
    simpleExplanation: `- **The Kitchen Appliance Analogy**: A microwave is a method. It has an input tray (parameter list), a start button (invocation), internal heating logic (method body), and a bell that dings to return your heated meal (return value). You don't need to know how the magnetron works to use it; you just call \`microwave.heat(food)\`.`,
    syntax: `// General Method Syntax
[accessModifier] [static/final] returnType methodName(parameterList) [throws Exception] {
    // Method body
    return value; // (if returnType is not void)
}`,
    javaCodeExamples: `public class MethodAnatomyDemo {
    // Fully specified method
    public static int calculateTax(int income, double rate) throws IllegalArgumentException {
        if (income < 0) {
            throw new IllegalArgumentException("Income cannot be negative");
        }
        return (int) (income * rate);
    }

    public static void main(String[] args) {
        int tax = calculateTax(100000, 0.20);
        System.out.println("Calculated Tax: $" + tax);
    }
}`,
    outputExplanation: `- Outputs: \`Calculated Tax: $20000\`
- Demonstrates access modifier (\`public\`), static specifier, return type (\`int\`), method name (\`calculateTax\`), parameters, exception declaration, and return statement.`,
    interviewReadyAnswer: `- "A Java method is a modular block of statements composed of access modifiers, return type, name, parameter list, optional throws clause, and body."
- "Methods enforce encapsulation and DRY (Don't Repeat Yourself) principles across class boundaries."`,
    quickRevisionPoints: `- Methods define behavior in classes.
- Return type is mandatory (\`void\` if nothing returned).
- \`public static void main(String[] args)\` is the entry method.`
  },
  {
    topicId: 80,
    slug: 'user-defined-methods-classification',
    title: 'Classification of User-Defined Methods',
    definition: `- **Classification**: User-defined methods are categorized by:
  1. **Invocation Scope**: Instance Methods (require object instance) vs Static Methods (invoked via \`ClassName.method()\`).
  2. **Parameter Signature & Return Value**:
     • No arguments, no return value (\`void run()\`)
     • With arguments, no return value (\`void print(String s)\`)
     • No arguments, with return value (\`int getCount()\`)
     • With arguments, with return value (\`int add(int a, int b)\`)`,
    importantDifferences: `| Dimension | Instance Method | Static Method |
|---|---|---|
| **Belongs to** | Object instance on the Heap | Class metadata in Metaspace |
| **Invocation** | \`objectRef.method()\` | \`ClassName.method()\` |
| **Can access \`this\` & \`super\`?** | **YES** | **NO** (no \`this\` in static context) |
| **Can access instance variables?** | **YES** directly | **NO** (must instantiate object first) |
| **Polymorphic Overriding?** | **YES** (Dynamic Method Dispatch) | **NO** (Static methods are hidden, not overridden) |`,
    javaCodeExamples: `public class MethodClassificationDemo {
    // Static utility method
    public static double celsiusToFahrenheit(double c) {
        return (c * 9 / 5) + 32;
    }

    // Instance method operating on object state
    private String userEmail;
    public MethodClassificationDemo(String email) { this.userEmail = email; }

    public void sendWelcomeEmail() {
        System.out.println("Sending welcome email to: " + this.userEmail);
    }

    public static void main(String[] args) {
        // Calling static method without creating object
        double f = MethodClassificationDemo.celsiusToFahrenheit(25.0);
        System.out.println("25C in F: " + f);

        // Calling instance method on instantiated object
        MethodClassificationDemo user = new MethodClassificationDemo("alex@example.com");
        user.sendWelcomeEmail();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  25C in F: 77.0
  Sending welcome email to: alex@example.com
  \`\`\``,
    interviewReadyAnswer: `- "Methods are classified into Static (class-level, no 'this' context) and Instance (object-level, operates on heap state)."
- "Static methods are used for stateless utilities and mathematical functions, while instance methods define behavior on encapsulated object state."`,
    quickRevisionPoints: `- Static methods belong to Class; called via \`ClassName.method()\`.
- Instance methods belong to Object; have access to \`this\`.
- Static methods CANNOT access instance variables directly.`
  },
  {
    topicId: 81,
    slug: 'method-parameters-call-by-value-mechanics',
    title: 'Method Parameters, Return Types & Call-by-Value Mechanics',
    definition: `- **THE CARDINAL RULE**: **Java is strictly 100% PASS-BY-VALUE (Call-by-Value)**. Java NEVER supports Pass-by-Reference.
- **What is Passed**:
  • For Primitives: A direct bitwise **copy of the value** is passed. Modifying the parameter inside the method has zero effect on the caller's variable.
  • For Objects: A **copy of the reference address** is passed. Both caller and callee reference the same object on the Heap, so mutating object fields persists, but reassigning the reference variable itself has zero effect on the caller!`,
    simpleExplanation: `- **The House Key Copy Analogy**:
  • When you pass an object to a method, you make a duplicate key (copy of reference address) and hand it to the method.
  • The method uses that duplicate key to open the house and paint the walls blue (mutating internal fields). When you return, the house is indeed blue.
  • However, if the method throws away that key and buys a new house (reassigning the reference: \`param = new House()\`), your original key still points to your original house!`,
    javaCodeExamples: `class Person {
    String name;
    Person(String name) { this.name = name; }
}

public class CallByValueDemo {
    public static void modifyPrimitive(int x) {
        x = 100; // Modifies only local copy on stack
    }

    public static void modifyObject(Person p) {
        p.name = "Updated Name"; // Mutates object on Heap
        p = new Person("Brand New Person"); // Reassigning reference does NOT affect caller!
    }

    public static void main(String[] args) {
        int num = 10;
        modifyPrimitive(num);
        System.out.println("Primitive after method: " + num); // Still 10

        Person person = new Person("Original Name");
        modifyObject(person);
        System.out.println("Person name after method: " + person.name); // "Updated Name"
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Primitive after method: 10
  Person name after method: Updated Name
  \`\`\`
- Proves Java passed the reference by value: mutating fields succeeded, but reassigning \`p = new Person()\` did not alter the original caller's reference.`,
    trickyInterviewConcepts: `- **Does Java have Pass-by-Reference?** NO! Answering "Java passes objects by reference" in an interview is an immediate red flag. Java passes the **reference by value** (a copy of the memory address pointer).`,
    interviewReadyAnswer: `- "Java is strictly pass-by-value for both primitives and objects."
- "For primitives, a copy of the raw value is passed. For objects, a copy of the reference address is passed by value. This allows mutating the object's internal state on the heap, but reassigning the reference variable inside the method has zero effect on the caller."`,
    quickRevisionPoints: `- Java is strictly 100% Pass-By-Value.
- Primitives: Copy of value.
- Objects: Copy of reference address.
- Reassigning reference parameter inside method does not change caller.`
  },
  {
    topicId: 82,
    slug: 'method-overloading-rules',
    title: 'Method Overloading & Overloading Resolution Rules',
    definition: `- **Definition**: **Method Overloading** occurs when a class has multiple methods with the **exact same name** but **different parameter lists** (different number of parameters, different data types, or different order of types).
- **Type of Polymorphism**: Represents **Compile-Time (Static) Polymorphism**. Method resolution is determined at compile-time by the \`javac\` compiler.`,
    importantConcepts: `- **Overloading Rules**:
  • **MUST DIFFER**: Parameter list MUST differ in count, types, or order.
  • **INSUFFICIENT**: Changing ONLY the return type, access modifier, or \`throws\` clause is **NOT** method overloading and causes a compile error (\`method already defined\`).
- **Method Resolution Hierarchy (Priority Order)**:
  1. Exact type match.
  2. Widening primitive promotion (\`int -> long -> float -> double\`).
  3. Autoboxing (\`int -> Integer\`).
  4. Varargs (\`int... args\`) (Lowest priority!).`,
    javaCodeExamples: `public class OverloadingDemo {
    // 1. Two int parameters
    public static int add(int a, int b) {
        System.out.print("[int, int] ");
        return a + b;
    }

    // 2. Three int parameters
    public static int add(int a, int b, int c) {
        System.out.print("[int, int, int] ");
        return a + b + c;
    }

    // 3. Two double parameters
    public static double add(double a, double b) {
        System.out.print("[double, double] ");
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("Result: " + add(10, 20));
        System.out.println("Result: " + add(10, 20, 30));
        System.out.println("Result: " + add(10.5, 20.5));
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  [int, int] Result: 30
  [int, int, int] Result: 60
  [double, double] Result: 31.0
  \`\`\`
- Shows the compiler binding calls to the correct overloaded method based on parameter types.`,
    commonMistakes: `- Attempting to overload by changing only the return type:
  \`int compute(int x); double compute(int x);\` -> Compile Error: \`method compute(int) is already defined\`.`,
    trickyInterviewConcepts: `- **Can we overload \`main()\` method?** YES! You can overload \`main(int x)\` or \`main(String s)\`. However, the JVM launcher looks specifically for \`public static void main(String[] args)\` as the initial application entry point.`,
    interviewReadyAnswer: `- "Method overloading is compile-time polymorphism where methods share the same name with different parameter signatures."
- "Changing only the return type is invalid because the compiler cannot determine the target method when invoked without an assignment."`,
    quickRevisionPoints: `- Same method name, different parameter signature.
- Return type change alone is NOT overloading.
- Compile-time (static) polymorphism.
- Resolution: Exact -> Widening -> Autoboxing -> Varargs.`
  },
  {
    topicId: 83,
    slug: 'method-recursion-base-conditions',
    title: 'Function / Method Recursion & Base Conditions',
    definition: `- **Definition**: **Recursion** is a programming technique in which a method calls itself directly or indirectly to solve a smaller sub-problem of the original problem.
- **The Two Mandatory Components**:
  1. **Base Condition (Base Case)**: The terminating condition where the method stops calling itself and returns a value.
  2. **Recursive Step**: The progression where the problem size shrinks toward the base condition.`,
    simpleExplanation: `- **The Russian Nesting Doll Analogy**: Opening a Matryoshka doll reveals a smaller doll inside (recursive step). You keep opening smaller dolls until you reach the smallest solid doll that cannot be opened (the base condition). You then assemble the dolls back up to complete the task.`,
    internalWorking: `- **Stack Frame Mechanics**:
  • Every recursive call pushes a new activation frame onto the thread's **JVM Stack**.
  • The frame holds local variables, parameter values, and return address.
  • When base condition is reached, frames pop in reverse order (LIFO) returning values up the chain.
  • **StackOverflowError**: If the base condition is missing or unreachable, infinite recursive calls exhaust the thread stack size (\`-Xss\`), throwing \`java.lang.StackOverflowError\`.`,
    javaCodeExamples: `public class RecursionDemo {
    // Factorial calculation: n! = n * (n - 1)!
    public static long factorial(int n) {
        // 1. Base Condition (Stops recursion)
        if (n <= 1) {
            return 1;
        }
        // 2. Recursive Step (Shrinks toward base condition)
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int num = 5;
        long result = factorial(num);
        System.out.println("Factorial of " + num + " = " + result); // 120
    }
}`,
    outputExplanation: `- Outputs: \`Factorial of 5 = 120\`.
- Stack execution: \`factorial(5)\` calls 4 -> 3 -> 2 -> 1 (base hit: returns 1) -> multiplies back: \`1 * 2 * 3 * 4 * 5 = 120\`.`,
    commonMistakes: `- Omitting the base condition, causing \`java.lang.StackOverflowError\`.
- Failing to ensure progress toward the base condition (e.g. \`factorial(n)\` instead of \`factorial(n - 1)\`).`,
    interviewReadyAnswer: `- "Recursion is a technique where a method calls itself to solve smaller sub-problems. It requires a base condition to terminate and a recursive step moving toward that base."
- "Each invocation allocates a stack frame on the JVM Stack; missing base cases exhaust memory and trigger a StackOverflowError."`,
    quickRevisionPoints: `- Requires Base Case + Recursive Step.
- Pushes stack frames on JVM Stack.
- Missing base condition causes \`StackOverflowError\`.
- Useful for tree traversals, DFS, and divide-and-conquer.`
  },
  {
    topicId: 84,
    slug: 'constructor-vs-method',
    title: 'Constructor vs Method (Comprehensive Differences)',
    definition: `- **Architectural Distinction**: A constructor is a specialized block invoked automatically during object instantiation to initialize state, whereas a method defines operational behavior called explicitly on an object.`,
    importantDifferences: `| Dimension | Constructor | Method |
|---|---|---|
| **Primary Purpose** | Initializes an object's instance state | Performs specific actions or computations |
| **Invocation** | Invoked automatically via \`new\` keyword | Invoked explicitly via method call (\`obj.doWork()\`) |
| **Name Rule** | **MUST match class name exactly** | Can be any valid identifier (camelCase) |
| **Return Type** | **NO return type** (not even \`void\`) | **MUST have a return type** (\`void\` if none) |
| **Inheritance** | **NOT inherited** by subclasses | Inherited by subclasses (if accessible) |
| **Default Provision** | Compiler provides default no-arg constructor if none defined | Compiler NEVER provides default methods |
| **this / super calls** | \`this()\` and \`super()\` can chain constructors | Cannot use \`this()\` or \`super()\` constructor calls |`,
    javaCodeExamples: `public class ConstructorVsMethodDemo {
    private String name;

    // Constructor: No return type, matches class name exactly
    public ConstructorVsMethodDemo(String name) {
        this.name = name;
        System.out.println("[Constructor Invoked] Initialized name: " + this.name);
    }

    // Method: Has return type (void), defines behavior
    public void printGreeting() {
        System.out.println("[Method Invoked] Hello, " + this.name);
    }

    public static void main(String[] args) {
        // Constructor executes automatically during 'new'
        ConstructorVsMethodDemo obj = new ConstructorVsMethodDemo("Alice");

        // Method executed only when called explicitly
        obj.printGreeting();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  [Constructor Invoked] Initialized name: Alice
  [Method Invoked] Hello, Alice
  \`\`\`
- Clearly contrasts the automatic initialization of constructors with explicit method execution.`,
    commonMistakes: `- Putting a return type on a constructor: \`public void MyClass() {}\`. Java treats this as a regular method that happens to have the class name, NOT a constructor!`,
    interviewReadyAnswer: `- "A constructor is an initialization block invoked automatically by the 'new' keyword to prepare object state, has no return type, and must match the class name."
- "A method defines callable behavior, must declare a return type, is inherited by child classes, and can have any valid name."`,
    quickRevisionPoints: `- Constructor: No return type, matches class name, invoked via \`new\`.
- Method: Has return type, callable anytime, defines behavior.
- Adding \`void\` to a constructor turns it into a method!`
  }
];

