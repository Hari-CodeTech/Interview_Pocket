// Module 12: Exception Handling (Topics 121-130)

module.exports = [
  {
    topicId: 121,
    slug: 'introduction-to-exception-handling',
    title: 'Introduction to Exception Handling & Robustness',
    definition: `- **Exception**: An abnormal event or condition that occurs during program execution and disrupts the normal flow of instructions.
- **Exception Handling**: A structured mechanism in Java to intercept runtime errors, gracefully handle failure scenarios, and prevent abrupt program termination.
- **Robustness**: One of Java's foundational design goals—ensuring applications handle edge cases and external faults without crashing.`,
    simpleExplanation: `- **The Highway Detour Analogy**: When a tree falls across a highway (an unexpected exception), traffic doesn't crash into it and disintegrate. Highway patrol sets up orange cones and signs directing traffic onto a detour route (the \`catch\` block) so cars continue their journey safely.`,
    whyNeeded: `- **Separation of Concerns**: Separates regular business logic from error-handling logic.
- **Prevents Abrupt JVM Crashes**: Catches runtime faults (e.g., file not found, network timeouts) and executes fallback recovery logic.
- **Resource Cleanup**: Ensures open file handles, database connections, and network sockets are closed even when errors strike.`,
    howItWorks: `- When an error occurs inside a method:
  1. The method constructs an **Exception Object** containing error type, message, and call-stack trace.
  2. The method hands the object over to the JVM runtime (throws the exception).
  3. The JVM searches the call stack backwards for a matching \`catch\` block capable of handling that exception type.
  4. If a handler is found, control branches to the handler.
  5. If no handler exists across the entire call stack, the **Default Exception Handler** prints the stack trace and terminates the thread.`,
    syntax: `try {
    // Code that might throw an exception
} catch (SpecificException e) {
    // Graceful recovery handling
} finally {
    // Mandatory cleanup code (always runs)
}`,
    javaCodeExamples: `public class ExceptionIntroductionDemo {
    public static void main(String[] args) {
        System.out.println("Application starting...");

        try {
            int numerator = 100;
            int denominator = 0; // Triggers ArithmeticException
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } catch (ArithmeticException ex) {
            System.err.println("Handled gracefully: Cannot divide by zero! Message: " + ex.getMessage());
        }

        System.out.println("Application continuing execution uninterrupted.");
    }
}`,
    outputExplanation: `- The divide-by-zero operation triggers an \`ArithmeticException\`, but the catch block intercepts it, allowing the final print statement to execute normally.`,
    interviewReadyAnswer: `- "Exception handling in Java is a robust mechanism to intercept runtime disruptions using try, catch, throw, throws, and finally."
- "It separates core business logic from error handling, maintains application stability, and prevents abrupt JVM termination."`,
    quickRevisionPoints: `- Disrupts normal sequential flow when an error occurs.
- Uses 5 keywords: \`try\`, \`catch\`, \`finally\`, \`throw\`, \`throws\`.
- Prevents abrupt termination of the JVM thread.
- Unhandled exceptions bubble up to the Default Exception Handler.`
  },
  {
    topicId: 122,
    slug: 'exception-hierarchy-throwable',
    title: 'Java Exception Hierarchy (Throwable, Exception, Error)',
    definition: `- **Throwable**: The top-level superclass of all errors and exceptions in the Java language (inherits directly from \`java.lang.Object\`).
- **Two Direct Subclasses of Throwable**:
  1. **\`java.lang.Error\`**: Severe hardware/JVM-level failures that applications cannot reasonably anticipate or recover from.
  2. **\`java.lang.Exception\`**: Conditions that a reasonable application should anticipate and handle.
- **The RuntimeException Branch**: Direct subclass of \`Exception\` representing unchecked programming bugs (e.g., \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`).`,
    simpleExplanation: `- **The Tree of Troubles**:
  • Root: \`Throwable\` (anything that can be thrown).
  • Left Branch: \`Error\` (catastrophic infrastructure failures like a power blackout—cannot be fixed in software).
  • Right Branch: \`Exception\` (software problems like an empty gas tank—can be refilled and recovered from).
    - Sub-branch: \`RuntimeException\` (careless driver errors like driving without shoes—preventable with better code).`,
    importantDifferences: `| Class | Recoverable? | Checked by Compiler? | Examples |
|---|---|---|---|
| **Throwable** | Top root | N/A | Root class of everything throwable |
| **Error** | No; fatal JVM state | Unchecked | \`OutOfMemoryError\`, \`StackOverflowError\` |
| **Exception (Checked)** | Yes; recoverable | Checked at compile-time | \`IOException\`, \`SQLException\`, \`ClassNotFoundException\` |
| **RuntimeException** | Yes; avoidable | Unchecked (Runtime) | \`NullPointerException\`, \`ArithmeticException\` |`,
    javaCodeExamples: `public class HierarchyDemo {
    public static void main(String[] args) {
        // Checking inheritance relationships
        Exception ex = new NullPointerException("NPE demo");

        System.out.println("Is NPE an instance of RuntimeException? " + (ex instanceof RuntimeException));
        System.out.println("Is NPE an instance of Exception? " + (ex instanceof Exception));
        System.out.println("Is NPE an instance of Throwable? " + (ex instanceof Throwable));
        System.out.println("Is NPE an instance of Object? " + (ex instanceof Object));
    }
}`,
    outputExplanation: `- Evaluates all assertions to \`true\`, demonstrating the direct class hierarchy leading up to \`java.lang.Object\`.`,
    interviewReadyAnswer: `- "The Java exception hierarchy begins with java.lang.Throwable as the root, dividing into Error (severe, unrecoverable system failures) and Exception (recoverable application issues)."
- "Exception is subdivided into checked exceptions (verified at compile-time) and unchecked RuntimeExceptions (logic bugs at runtime)."`,
    quickRevisionPoints: `- \`Throwable\` is root; inherits from \`Object\`.
- \`Error\` represents unrecoverable system/JVM failures.
- \`Exception\` represents recoverable application scenarios.
- \`RuntimeException\` represents unchecked programming defects.`
  },
  {
    topicId: 123,
    slug: 'error-vs-exception-differences',
    title: 'Errors vs Exceptions (Critical Distinctions)',
    definition: `- **Error (\`java.lang.Error\`)**: Represents serious internal faults occurring in the JVM or underlying operating system that an application should not attempt to catch or recover from.
- **Exception (\`java.lang.Exception\`)**: Represents condition-driven events caused by application code or environment (missing files, network glitches) that an application should catch and recover from.`,
    importantDifferences: `| Dimension | Error | Exception |
|---|---|---|
| **Class Type** | Subclass of \`Throwable\` | Subclass of \`Throwable\` |
| **Nature** | Hardware/JVM resource exhaustion | Application design or runtime condition |
| **Recovery Possibility** | Irrecoverable; application should shut down | Recoverable; application can retry or handle fallback |
| **Compiler Enforcement** | Always unchecked | Divided into checked and unchecked |
| **Typical Catching Policy** | Should NEVER be caught in business code | Routinely caught and handled in \`catch\` blocks |
| **Key Examples** | \`OutOfMemoryError\`, \`StackOverflowError\`, \`VirtualMachineError\` | \`IOException\`, \`SQLException\`, \`NullPointerException\` |`,
    javaCodeExamples: `public class ErrorVsExceptionDemo {
    // Demonstration of catching a recoverable Exception
    public static void testException() {
        try {
            String s = null;
            s.length(); // Throws NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Recovered from standard Exception: " + e);
        }
    }

    // Demonstration of an unrecoverable Error (StackOverflowError)
    public static void triggerRecursiveError() {
        // Infinite recursion exhausts thread Stack memory
        triggerRecursiveError();
    }

    public static void main(String[] args) {
        testException();
        // triggerRecursiveError(); // Do not call: exhausts JVM stack!
    }
}`,
    outputExplanation: `- Exceptions can be intercepted and recovered from cleanly.
- Errors indicate fundamental resource failures (e.g. stack exhaustion) and should never be caught in regular business logic.`,
    interviewReadyAnswer: `- "Errors indicate severe system-level resource problems like OutOfMemoryError and StackOverflowError that code cannot recover from."
- "Exceptions indicate application-level conditions like IOException or NullPointerException that can and should be caught and handled gracefully."`,
    quickRevisionPoints: `- Error = Fatal JVM problem; irrecoverable.
- Exception = Application problem; recoverable.
- Do not write \`catch (Error e)\` in business code.
- OutOfMemoryError and StackOverflowError are Errors, not Exceptions.`
  },
  {
    topicId: 124,
    slug: 'checked-vs-unchecked-exceptions',
    title: 'Checked Exceptions vs Unchecked Exceptions',
    definition: `- **Checked Exceptions**: Exceptions checked at compile-time by the Java compiler. The compiler forces the developer to either handle them with a \`try-catch\` block or declare them with the \`throws\` keyword.
- **Unchecked Exceptions (Runtime Exceptions)**: Exceptions that inherit from \`RuntimeException\` or \`Error\`. The compiler does NOT verify or enforce handling; they typically represent preventable programming bugs.`,
    simpleExplanation: `- **Checked Exception**: Boarding an airplane with an international passport. Airport security (the compiler) checks your passport at the gate before letting you board.
- **Unchecked Exception**: Tripping over your own shoelaces while walking down the aisle. No airport gate can check if your shoes are tied; it happens at runtime due to careless walking.`,
    importantDifferences: `| Dimension | Checked Exceptions | Unchecked Exceptions |
|---|---|---|
| **Inheritance Hierarchy** | Inherits from \`Exception\` (excluding \`RuntimeException\`) | Inherits from \`RuntimeException\` or \`Error\` |
| **Compiler Check** | Enforced at compile-time | Not checked at compile-time |
| **Mandatory Handling** | Must use \`try-catch\` or declare with \`throws\` | Optional; usually solved by bug fixes |
| **Primary Cause** | External environment faults (file missing, network drop) | Programming logic flaws (null dereference, index error) |
| **Key Examples** | \`IOException\`, \`SQLException\`, \`ClassNotFoundException\` | \`NullPointerException\`, \`ArithmeticException\`, \`IllegalArgumentException\` |`,
    javaCodeExamples: `import java.io.FileReader;
import java.io.IOException;

public class CheckedUncheckedDemo {
    // Checked Exception: Compiler FORCES 'throws' declaration or try-catch
    public static void readConfigFile(String path) throws IOException {
        FileReader reader = new FileReader(path); // FileReader constructor throws FileNotFoundException (checked)
        reader.close();
    }

    // Unchecked Exception: Compiler does NOT enforce handling
    public static int divide(int a, int b) {
        return a / b; // Can throw ArithmeticException (unchecked)
    }

    public static void main(String[] args) {
        // Handling checked exception
        try {
            readConfigFile("config.json");
        } catch (IOException e) {
            System.out.println("Caught checked exception: " + e.getMessage());
        }

        // Unchecked exceptions should be prevented with defensive checks:
        int b = 0;
        if (b != 0) {
            divide(10, b);
        } else {
            System.out.println("Defensively avoided divide by zero!");
        }
    }
}`,
    outputExplanation: `- Checked exceptions guarantee compile-time error awareness.
- Unchecked exceptions should be handled via defensive programming checks.`,
    interviewReadyAnswer: `- "Checked exceptions inherit from Exception (excluding RuntimeException) and are enforced at compile time via try-catch or throws."
- "Unchecked exceptions inherit from RuntimeException or Error and represent preventable logic bugs not enforced by the compiler."`,
    quickRevisionPoints: `- Checked = verified by compiler at compile-time.
- Unchecked = subclasses of \`RuntimeException\` / \`Error\`.
- Checked examples: \`IOException\`, \`SQLException\`.
- Unchecked examples: \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`.`
  },
  {
    topicId: 125,
    slug: 'try-catch-finally-blocks',
    title: 'try, catch, and finally Blocks & Flow Control',
    definition: `- **\`try\` block**: Encloses code that might throw an exception.
- **\`catch\` block**: Intercepts and handles specific exceptions thrown by the enclosing \`try\` block.
- **\`finally\` block**: Guarantees execution of critical cleanup operations regardless of whether an exception occurred, was caught, or was returned.`,
    simpleExplanation: `- **The Construction Contract**:
  • \`try\`: "Try to build this bridge according to plans."
  • \`catch\`: "If bad weather occurs, follow emergency safety protocol."
  • \`finally\`: "No matter what happens—whether the bridge succeeded or collapsed—return the rented construction cranes."`,
    importantConcepts: `- **Order of Catch Blocks**: Catch blocks must be arranged from **Most Specific (Child)** to **Most General (Parent)**. Placing \`catch (Exception e)\` before \`catch (IOException e)\` causes a compilation error ("unreachable code").
- **Multi-Catch (Java 7+)**: Can catch multiple unrelated exceptions in a single catch block using the pipe operator: \`catch (IOException | SQLException e)\`. The parameter \`e\` is implicitly \`final\`.
- **When Does \`finally\` NOT Execute?**:
  1. When \`System.exit(0)\` is called.
  2. If the JVM crashes (e.g. fatal native error or sudden power cutoff).`,
    javaCodeExamples: `public class TryCatchFinallyDemo {
    public static int testExecutionFlow() {
        try {
            System.out.println("Inside try block");
            int val = 10 / 2;
            return val; // Returns 5, but finally still executes before exit!
        } catch (ArithmeticException e) {
            System.out.println("Inside catch block");
            return 0;
        } finally {
            System.out.println("Inside finally block (Guaranteed Execution)");
        }
    }

    public static void main(String[] args) {
        int result = testExecutionFlow();
        System.out.println("Returned result: " + result);
    }
}`,
    outputExplanation: `- Output order:
  \`\`\`
  Inside try block
  Inside finally block (Guaranteed Execution)
  Returned result: 5
  \`\`\`
- Proves that \`finally\` executes even when a \`return\` statement is present inside the \`try\` block.`,
    interviewReadyAnswer: `- "The try block wraps risky operations, catch handles specific exceptions in child-to-parent order, and finally executes cleanup logic unconditionally."
- "Finally executes even if try or catch returns, unless System.exit(0) is called or the JVM crashes."`,
    quickRevisionPoints: `- Catch order: child exception before parent exception.
- Multi-catch syntax: \`catch (A | B e)\` with implicitly final \`e\`.
- \`finally\` always runs, even after \`return\`.
- Only \`System.exit()\` or JVM crash stops \`finally\`.`
  },
  {
    topicId: 126,
    slug: 'try-with-resources-autocloseable',
    title: 'Automatic Resource Management: try-with-resources',
    definition: `- **try-with-resources (Java 7+)**: A try statement that declares one or more resources. A resource is an object that must be closed after the program is finished with it.
- **AutoCloseable Contract**: Any class that implements **\`java.lang.AutoCloseable\`** or **\`java.io.Closeable\`** can be managed automatically by try-with-resources, eliminating manual \`finally\` cleanup.`,
    simpleExplanation: `- **Self-Returning Library Books**: In traditional Java, you had to manually return every book to the shelf inside a cumbersome \`finally\` block with nested try-catches. With try-with-resources, the books are equipped with digital timers that automatically check themselves back into the library the moment you leave the reading room.`,
    whyNeeded: `- **Eliminates Boilerplate**: Traditional resource closing required deeply nested \`try-finally\` blocks prone to leaks.
- **Suppressed Exceptions**: If both the \`try\` block and the automatic \`close()\` method throw exceptions, try-with-resources preserves the primary exception from \`try\` and attaches the closing exception as a **suppressed exception** (retrievable via \`getSuppressed()\`).`,
    syntax: `try (BufferedReader br = new BufferedReader(new FileReader("file.txt"));
     Connection conn = DriverManager.getConnection(url)) {
    // Use resources
} // Both br and conn are closed automatically here in reverse order of declaration!`,
    javaCodeExamples: `// Custom resource implementing AutoCloseable
class DatabaseConnection implements AutoCloseable {
    public DatabaseConnection() {
        System.out.println("1. Database Connection opened.");
    }

    public void executeQuery(String sql) {
        System.out.println("2. Executing query: " + sql);
    }

    @Override
    public void close() {
        System.out.println("3. Database Connection automatically closed!");
    }
}

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        // Resource initialized inside try parentheses
        try (DatabaseConnection db = new DatabaseConnection()) {
            db.executeQuery("SELECT * FROM users");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("4. Work completed safely.");
    }
}`,
    outputExplanation: `- The \`close()\` method is called automatically when exiting the try block, before any catch or finally blocks run.`,
    interviewReadyAnswer: `- "try-with-resources ensures that every resource implementing AutoCloseable is closed automatically at the end of the statement."
- "It eliminates boilerplate finally blocks, closes resources in reverse order of declaration, and retains primary exceptions while capturing close errors as suppressed exceptions."`,
    quickRevisionPoints: `- Introduced in Java 7; requires \`AutoCloseable\`.
- Closes resources automatically in reverse order of declaration.
- Replaces verbose nested \`finally\` blocks.
- Captures secondary close errors as suppressed exceptions.`
  },
  {
    topicId: 127,
    slug: 'throw-vs-throws-keywords',
    title: 'throw vs throws Keywords (Usage & Differences)',
    definition: `- **\`throw\` Keyword**: Used inside a method body to explicitly instantiate and throw an exception object into the runtime.
- **\`throws\` Keyword**: Used in a method signature to declare that this method might throw one or more exceptions, delegating handling responsibility to the calling method.`,
    simpleExplanation: `- **throw**: Throwing a physical grenade out the window: \`throw new BoomException();\`.
- **throws**: Putting a warning label on the door: "Caution: This room might throw BoomException; callers enter at your own risk."`,
    importantDifferences: `| Dimension | \`throw\` Keyword | \`throws\` Keyword |
|---|---|---|
| **Location** | Inside method body | In method signature / header |
| **Purpose** | Explicitly instantiates and triggers an exception | Declares potential exceptions to caller |
| **Followed By** | An instance of \`Throwable\` (\`new MyException()\`) | Class names separated by commas (\`throws IOException, SQLException\`) |
| **Quantity** | Can throw only ONE exception instance at a time | Can declare MULTIPLE exception classes |
| **Usage** | Works for both checked and unchecked exceptions | Primarily used for checked exceptions |`,
    javaCodeExamples: `public class ThrowVsThrowsDemo {
    // 'throws' in method header declares potential checked exception
    public static void validateAge(int age) throws IllegalArgumentException {
        if (age < 18) {
            // 'throw' explicitly creates and throws exception instance
            throw new IllegalArgumentException("Age " + age + " is below minimum voting age of 18!");
        }
        System.out.println("Age validated successfully. Welcome to voting!");
    }

    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (IllegalArgumentException ex) {
            System.err.println("Exception caught: " + ex.getMessage());
        }
    }
}`,
    outputExplanation: `- \`throw\` creates the \`IllegalArgumentException\` object when condition fails.
- \`throws\` documents the method contract for caller handling.`,
    interviewReadyAnswer: `- "'throw' is used inside a method to explicitly throw an exception object."
- "'throws' is used in the method signature to declare that the method might throw certain exceptions, delegating handling to its callers."`,
    quickRevisionPoints: `- \`throw\` = triggers an exception instance (inside method).
- \`throws\` = declares exception classes (in method header).
- \`throw\` takes an object; \`throws\` takes class names.
- \`throws\` can list multiple comma-separated exception types.`
  },
  {
    topicId: 128,
    slug: 'exception-propagation-stack-trace',
    title: 'Exception Propagation & Stack Trace Unwinding',
    definition: `- **Exception Propagation**: The process by which an unhandled exception travels backward through the call stack from the method where it was thrown to preceding calling methods.
- **Stack Unwinding**: As the exception bubbles up, active stack frames are popped off the thread stack one by one until an appropriate \`catch\` block is encountered.
- **Unchecked vs Checked Propagation**: Unchecked exceptions propagate automatically down the stack; checked exceptions must be declared at each hop with \`throws\` or caught.`,
    simpleExplanation: `- **Passing the Hot Potato**: Method C burns its fingers and drops the hot potato. If C doesn't catch it, C's frame is popped off and the potato falls down to Method B. If B ignores it, B is popped off and it lands in Method A. If Method A doesn't catch it, the program catches fire (crashes via Default Exception Handler).`,
    javaCodeExamples: `public class PropagationDemo {
    public static void methodC() {
        System.out.println("Method C executing - throwing exception");
        int result = 50 / 0; // ArithmeticException thrown here
    }

    public static void methodB() {
        System.out.println("Method B delegating to Method C");
        methodC(); // Unhandled; propagates to methodA
    }

    public static void methodA() {
        System.out.println("Method A delegating to Method B");
        methodB(); // Unhandled; propagates to main
    }

    public static void main(String[] args) {
        try {
            methodA();
        } catch (ArithmeticException e) {
            System.out.println("Exception successfully intercepted in main!");
            System.out.println("Stack trace call path:");
            for (StackTraceElement element : e.getStackTrace()) {
                System.out.println("  at " + element.getMethodName() + " (" + element.getFileName() + ":" + element.getLineNumber() + ")");
            }
        }
    }
}`,
    outputExplanation: `- Shows execution traveling \`main -> methodA -> methodB -> methodC\`.
- When the exception occurs, stack frames are popped in reverse order until caught in \`main\`.`,
    interviewReadyAnswer: `- "Exception propagation is the bubbling of an uncaught exception up the call stack through stack unwinding until a matching catch block is located."
- "Unchecked exceptions propagate automatically; checked exceptions require throws declarations along the propagation path."`,
    quickRevisionPoints: `- Unhandled exceptions propagate down the call stack (LIFO).
- Each hop pops that method's stack frame off the stack.
- Unchecked exceptions propagate automatically.
- Checked exceptions must be declared with \`throws\` at each level.`
  },
  {
    topicId: 129,
    slug: 'custom-user-defined-exceptions',
    title: 'Custom / User-Defined Exceptions Creation',
    definition: `- **Custom Exceptions**: Application-specific exception classes created by extending existing Java exception classes to represent precise domain-specific business failure conditions.
- **Classification Choice**:
  • Extend **\`java.lang.Exception\`** to create a **Custom Checked Exception** (caller must handle or declare).
  • Extend **\`java.lang.RuntimeException\`** to create a **Custom Unchecked Exception** (standard for modern APIs and Spring microservices).`,
    simpleExplanation: `- Standard Java exceptions like \`IllegalArgumentException\` are generic. In a banking application, throwing \`InsufficientFundsException\` with the current balance and attempted withdrawal amount communicates the exact domain failure instantly to API consumers.`,
    syntax: `// Checked Custom Exception
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}

// Unchecked Custom Exception (Recommended in modern Spring Boot)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String msg) { super(msg); }
}`,
    javaCodeExamples: `// Domain-specific custom unchecked exception
class InsufficientBalanceException extends RuntimeException {
    private final double requested;
    private final double available;

    public InsufficientBalanceException(double requested, double available) {
        super(String.format("Withdrawal of $%.2f failed! Available balance is only $%.2f.", requested, available));
        this.requested = requested;
        this.available = available;
    }

    public double getRequested() { return requested; }
    public double getAvailable() { return available; }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) { this.balance = balance; }

    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientBalanceException(amount, balance);
        }
        balance -= amount;
        System.out.println("Withdrew $" + amount + ". Remaining: $" + balance);
    }
}

public class CustomExceptionDemo {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500.0);
        try {
            acc.withdraw(800.0);
        } catch (InsufficientBalanceException ex) {
            System.err.println("Transaction Blocked: " + ex.getMessage());
            System.err.println("Shortage: $" + (ex.getRequested() - ex.getAvailable()));
        }
    }
}`,
    outputExplanation: `- Illustrates how custom exceptions carry rich domain-specific state and provide expressive error diagnostics.`,
    interviewReadyAnswer: `- "Custom exceptions are created by extending Exception (for checked) or RuntimeException (for unchecked) to provide domain-specific error handling."
- "Modern Java and Spring applications prefer extending RuntimeException to avoid verbose boilerplate and integrate with global exception handlers like @ControllerAdvice."`,
    quickRevisionPoints: `- Extend \`Exception\` for checked custom exceptions.
- Extend \`RuntimeException\` for unchecked custom exceptions.
- Provide constructors passing messages and cause throwables to \`super()\`.
- Modern frameworks favor unchecked custom exceptions.`
  },
  {
    topicId: 130,
    slug: 'exception-handling-tricky-questions',
    title: 'Top Exception Handling Tricky Questions & Rules',
    definition: `- **Critical Exception Edge Cases**: A compilation of the most frequent technical interview traps involving return values, overriding rules, and JVM lifecycle in exception handling.`,
    importantConcepts: `- **Trap 1: Returning from both try and finally**:
  • If both \`try\` (or \`catch\`) and \`finally\` contain \`return\` statements, the \`finally\` return value **overrides** the try return value! (Compiler suppresses the earlier return).
- **Trap 2: System.exit() halts finally**:
  • If \`System.exit(0)\` is called inside \`try\` or \`catch\`, the JVM terminates immediately; the \`finally\` block will **NOT** execute.
- **Trap 3: Overriding Method Exception Rules**:
  • If superclass method does NOT declare a checked exception, subclass overridden method CANNOT declare any checked exception.
  • Subclass overridden methods can declare narrower, fewer, or no checked exceptions, and any unchecked exceptions.`,
    javaCodeExamples: `public class TrickyExceptionInterviewDemo {
    // Tricky Case 1: Finally return overriding try return
    public static int trickyReturn() {
        try {
            return 10;
        } finally {
            return 20; // Silently swallows 10 and returns 20!
        }
    }

    // Tricky Case 2: Mutating returned primitive vs object in finally
    public static int mutatePrimitive() {
        int x = 100;
        try {
            return x; // Evaluates x = 100 on operand stack
        } finally {
            x = 200; // Mutates local variable x, but returned value is already 100!
        }
    }

    public static void main(String[] args) {
        System.out.println("trickyReturn: " + trickyReturn());       // 20
        System.out.println("mutatePrimitive: " + mutatePrimitive()); // 100
    }
}`,
    outputExplanation: `- \`trickyReturn()\` returns 20 because the \`finally\` return overwrites the operand stack.
- \`mutatePrimitive()\` returns 100 because primitive return values are placed onto the stack before \`finally\` executes.`,
    interviewReadyAnswer: `- "Top exception traps: returning in finally overrides try returns; primitive return values are locked in before finally runs; and overridden subclass methods cannot declare broader checked exceptions than their superclass."`,
    quickRevisionPoints: `- Finally return overrides try/catch return (anti-pattern).
- Mutating primitive local variables in finally does not alter the already evaluated return value.
- \`System.exit()\` prevents finally from executing.
- Overridden methods cannot add new or broader checked exceptions.`
  }
];

