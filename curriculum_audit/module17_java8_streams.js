// Module 17: Java 8 Features and Stream API (Topics 161-170)

module.exports = [
  {
    topicId: 161,
    slug: 'java-8-features-overview',
    title: 'Overview of Java 8 Paradigm Shift',
    definition: `- **Java 8 (March 2014)**: The most monumental release in Java history, transitioning Java from a purely imperative, object-oriented language to a **Functional-Object Hybrid Paradigm**.
- **Core Pillars of Java 8**:
  1. **Lambda Expressions**: Treating code/functions as first-class method arguments.
  2. **Functional Interfaces**: Single Abstract Method (SAM) contracts.
  3. **Stream API**: Declarative, pipeline-based data processing with seamless parallelism.
  4. **Interface Enhancements**: Default and static methods enabling API evolution without breaking backward compatibility.
  5. **java.time API**: Completely overhauled, immutable, thread-safe date/time management.
  6. **Optional<T>**: Container object for expressing optionality and mitigating \`NullPointerException\`.
  7. **Metaspace**: Elimination of PermGen in favor of native OS-backed Metaspace.`,
    simpleExplanation: `- **Imperative vs Declarative Cooking**:
  • **Imperative (Java 7)**: Telling the chef: "Open fridge, check egg 1, check egg 2, crack egg into bowl, whisk 50 times, heat pan to 200 degrees, pour egg." (Focuses on HOW).
  • **Declarative (Java 8)**: Telling the waiter: "I'd like scrambled eggs, please." (Focuses on WHAT you want; the runtime optimizes the how).`,
    javaCodeExamples: `import java.util.Arrays;
import java.util.List;

public class Java8OverviewDemo {
    public static void main(String[] args) {
        List<String> skills = Arrays.asList("Java", "Spring Boot", "Docker", "Kubernetes", "AWS");

        // Declarative Java 8 pipeline: Filter -> Transform -> Print
        skills.stream()
              .filter(s -> s.startsWith("D") || s.startsWith("K"))
              .map(String::toUpperCase)
              .forEach(System.out::println);
    }
}`,
    outputExplanation: `- Demonstrates the concise, readable nature of Java 8 functional pipelines replacing verbose nested loops.`,
    interviewReadyAnswer: `- "Java 8 introduced functional programming to Java through Lambda expressions, the Stream API, Functional Interfaces, and Method References."
- "It replaced PermGen with Metaspace, introduced the java.time API, and added default/static interface methods for backward-compatible evolution."`,
    quickRevisionPoints: `- Introduced functional programming to Java.
- Lambdas treat code as data.
- Stream API enables declarative bulk data processing.
- Metaspace replaced PermGen.
- Optional<T> provides explicit null handling.`
  },
  {
    topicId: 162,
    slug: 'lambda-expressions-syntax',
    title: 'Lambda Expressions & Syntax Simplification',
    definition: `- **Lambda Expression**: An anonymous function (a method without a name, return type, or access modifier) that can be passed around as if it were an object.
- **Syntax Anatomy**: \`(parameters) -> { body }\`
  • **Parameter list**: Left side of the arrow operator.
  • **Arrow token (\`->\`)**: Separates parameters from the body.
  • **Body**: Expression or statement block executed when invoked.`,
    simpleExplanation: `- **Writing a Letter vs Texting**: Traditional anonymous inner classes required 6 lines of ceremony just to send a one-line command (creating a full class, method header, and closing braces). A Lambda expression is like sending a quick text message: \`() -> doSomething()\`.`,
    syntax: `// 1. Zero arguments
() -> System.out.println("Hello");

// 2. Single argument (parentheses optional)
x -> x * x;

// 3. Multiple arguments with block body
(int a, int b) -> {
    int sum = a + b;
    return sum;
};`,
    javaCodeExamples: `public class LambdaSyntaxDemo {
    public static void main(String[] args) {
        // Java 7 Anonymous Inner Class (Verbose)
        Runnable oldRunner = new Runnable() {
            @Override
            public void run() {
                System.out.println("Old style execution");
            }
        };

        // Java 8 Lambda (Concise)
        Runnable modernRunner = () -> System.out.println("Modern Lambda execution");

        oldRunner.run();
        modernRunner.run();
    }
}`,
    outputExplanation: `- Illustrates boiler-plate reduction from 6 lines of code to a single readable line.`,
    interviewReadyAnswer: `- "A Lambda expression is an anonymous function enabling code to be passed as data to methods and constructors."
- "Lambdas can only be assigned to Functional Interfaces and eliminate the boilerplate of anonymous inner classes."`,
    quickRevisionPoints: `- Anonymous function: \`(params) -> { body }\`.
- Target type must be a Functional Interface.
- Types of parameters can be inferred by compiler.
- Does not create an extra \`.class\` file like anonymous inner classes.`
  },
  {
    topicId: 163,
    slug: 'functional-interfaces-annotation',
    title: 'Functional Interfaces (@FunctionalInterface)',
    definition: `- **Functional Interface**: An interface that contains **exactly ONE abstract method (Single Abstract Method - SAM)**.
- **The \`@FunctionalInterface\` Annotation**: An informative annotation used to declare that an interface type is intended to be a functional interface, instructing the compiler to generate an error if more than one abstract method is present.
- **Permitted Additions**: A functional interface CAN have any number of **\`default\`** methods, **\`static\`** methods, and public methods matching methods of **\`java.lang.Object\`** (e.g. \`equals()\`).`,
    simpleExplanation: `- **Single-Button Remote**: A remote with exactly one action button ("Trigger"). It doesn't matter what you wire the trigger to (a light, a horn, a rocket); as long as there is only one trigger button, pressing it is completely unambiguous.`,
    javaCodeExamples: `@FunctionalInterface
interface MathematicalOperation {
    // Exactly ONE abstract method
    int compute(int a, int b);

    // Default methods do NOT invalidate SAM status
    default void printInfo() {
        System.out.println("Executing custom mathematical operation.");
    }

    // Static methods do NOT invalidate SAM status
    static void help() {
        System.out.println("Helper utility.");
    }

    // java.lang.Object methods do NOT count toward SAM count
    @Override
    boolean equals(Object obj);
}

public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        // Implementing the single abstract method via lambda
        MathematicalOperation add = (x, y) -> x + y;
        MathematicalOperation multiply = (x, y) -> x * y;

        System.out.println("Addition: " + add.compute(10, 20));
        System.out.println("Multiplication: " + multiply.compute(10, 20));
    }
}`,
    outputExplanation: `- Demonstrates valid functional interface structure and assignment to multiple distinct lambda expressions.`,
    interviewReadyAnswer: `- "A Functional Interface contains exactly one abstract method (Single Abstract Method / SAM)."
- "It can contain multiple default, static, and Object-override methods. The @FunctionalInterface annotation enforces this contract at compile time."`,
    quickRevisionPoints: `- Contains exactly 1 abstract method.
- Target type for Lambda expressions and Method References.
- Can have multiple default and static methods.
- \`@FunctionalInterface\` annotation is optional but recommended.`
  },
  {
    topicId: 164,
    slug: 'builtin-functional-interfaces',
    title: 'Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier)',
    definition: `- **java.util.function Package**: The standard library package introduced in Java 8 housing 40+ pre-built functional interfaces.
- **The 4 Foundational Interfaces**:
  1. **\`Predicate<T>\`**: Takes one argument of type \`T\`, returns a \`boolean\` (\`boolean test(T t)\`). Used for filtering and conditions.
  2. **\`Function<T, R>\`**: Takes an argument of type \`T\`, transforms it, and returns a result of type \`R\` (\`R apply(T t)\`). Used for mapping.
  3. **\`Consumer<T>\`**: Takes an argument of type \`T\`, performs an operation, and returns \`void\` (\`void accept(T t)\`). Used for printing/logging.
  4. **\`Supplier<T>\`**: Takes NO arguments, returns a result of type \`T\` (\`T get()\`). Used for factory creation and lazy loading.`,
    importantDifferences: `| Interface | Functional Method | Input Parameter | Return Type | Common Usage |
|---|---|---|---|---|
| **\`Predicate<T>\`** | \`test(T t)\` | 1 object (\`T\`) | \`boolean\` | \`.filter(p)\` |
| **\`Function<T, R>\`**| \`apply(T t)\` | 1 object (\`T\`) | \`R\` | \`.map(f)\` |
| **\`Consumer<T>\`** | \`accept(T t)\` | 1 object (\`T\`) | \`void\` | \`.forEach(c)\` |
| **\`Supplier<T>\`** | \`get()\` | None | \`T\` | \`Optional.orElseGet(s)\` |`,
    javaCodeExamples: `import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class BuiltinFunctionalInterfacesDemo {
    public static void main(String[] args) {
        // 1. Predicate: Checks a condition
        Predicate<Integer> isAdult = age -> age >= 18;
        System.out.println("Age 20 is adult? " + isAdult.test(20)); // true

        // 2. Function: Transforms data (String -> Integer)
        Function<String, Integer> lengthFinder = str -> str.length();
        System.out.println("Length of 'Java': " + lengthFinder.apply("Java")); // 4

        // 3. Consumer: Consumes without returning
        Consumer<String> printer = msg -> System.out.println("LOG: " + msg);
        printer.accept("Application booted cleanly");

        // 4. Supplier: Supplies/produces a value
        Supplier<Double> randomGenerator = () -> Math.random();
        System.out.println("Generated value: " + randomGenerator.get());
    }
}`,
    outputExplanation: `- Illustrates practical usage of the four fundamental functional interface patterns in \`java.util.function\`.`,
    interviewReadyAnswer: `- "The 4 core functional interfaces are Predicate (tests a condition, returns boolean), Function (transforms input T to output R), Consumer (accepts input, returns void), and Supplier (takes nothing, returns T)."
- "They serve as standard parameter contracts throughout the Stream API and standard library."`,
    quickRevisionPoints: `- \`Predicate<T>\`: \`boolean test(T)\`.
- \`Function<T, R>\`: \`R apply(T)\`.
- \`Consumer<T>\`: \`void accept(T)\`.
- \`Supplier<T>\`: \`T get()\`.`
  },
  {
    topicId: 165,
    slug: 'default-static-methods-interfaces',
    title: 'Default and Static Methods in Interfaces',
    definition: `- **Default Methods (Defender Methods)**: Methods declared in interfaces with the **\`default\`** keyword that supply a concrete implementation body.
- **Static Methods in Interfaces**: Utility methods declared with the **\`static\`** keyword that belong directly to the interface and cannot be overridden by implementing classes.
- **Primary Need**: Enabled Java designers to enrich core interfaces (like adding \`forEach()\` and \`stream()\` to \`Collection\`) without breaking existing code implementations across billions of lines of legacy Java.`,
    simpleExplanation: `- **Updating a Smartphone Operating System**: If Apple adds a new "Dark Mode" setting to iOS, every app installed gets a default behavior automatically. App developers don't have to rewrite their code from scratch just because the OS interface evolved.`,
    importantConcepts: `- **The Diamond Problem Resolution Rules**:
  • If a class implements two interfaces that declare the identical default method signature:
  1. **Class Wins Rule**: Superclass methods always beat interface default methods.
  2. **Sub-interface Wins Rule**: A more specific child interface beats a parent interface.
  3. **Explicit Disambiguation**: If neither applies, the compiler requires the class to explicitly override the method and specify which one to invoke: \`InterfaceA.super.method();\`.`,
    javaCodeExamples: `interface NotificationService {
    // Abstract method
    void sendNotification(String message);

    // Default method: provides backward-compatible fallback
    default void logAudit(String user) {
        System.out.println("Default Audit: Notification dispatched to " + user);
    }

    // Static utility method
    static boolean isChannelActive() {
        return true;
    }
}

class EmailService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending Email: " + message);
    }
    // logAudit() is inherited automatically without compile errors!
}

public class DefaultMethodsDemo {
    public static void main(String[] args) {
        EmailService service = new EmailService();
        service.sendNotification("Welcome to InterviewPocket");
        service.logAudit("User101");

        System.out.println("Is channel active? " + NotificationService.isChannelActive());
    }
}`,
    outputExplanation: `- Illustrates default method inheritance and static method invocation directly on the interface.`,
    interviewReadyAnswer: `- "Default methods allow adding new concrete methods to interfaces without breaking implementing classes, solving the interface evolution problem."
- "Diamond problem conflicts are resolved by explicit override using 'InterfaceName.super.method()' syntax."`,
    quickRevisionPoints: `- Declared with \`default\` keyword inside interfaces.
- Allows backward-compatible interface evolution.
- Static interface methods belong to interface and cannot be overridden.
- Resolve conflicts with \`InterfaceName.super.method()\`.`
  },
  {
    topicId: 166,
    slug: 'method-references-constructor-references',
    title: 'Method References & Constructor References',
    definition: `- **Method Reference**: A compact syntactic shorthand for a lambda expression that simply delegates to an existing named method.
- **Syntax**: \`Target::methodName\` using the double colon **\`::\`** operator.
- **The 4 Types of Method References**:
  1. **Reference to a Static Method**: \`ClassName::staticMethod\` (e.g. \`Math::abs\`).
  2. **Reference to an Instance Method of a Specific Object**: \`instance::instanceMethod\` (e.g. \`System.out::println\`).
  3. **Reference to an Instance Method of an Arbitrary Object of a Given Type**: \`ClassName::instanceMethod\` (e.g. \`String::toUpperCase\`).
  4. **Constructor Reference**: \`ClassName::new\` (e.g. \`ArrayList::new\`).`,
    importantDifferences: `| Type | Lambda Equivalent | Method Reference |
|---|---|---|
| **Static Method** | \`(x) -> Math.sqrt(x)\` | \`Math::sqrt\` |
| **Specific Object Method** | \`(s) -> System.out.println(s)\` | \`System.out::println\` |
| **Arbitrary Object Method** | \`(s) -> s.toLowerCase()\` | \`String::toLowerCase\` |
| **Constructor Reference** | \`() -> new ArrayList<>()\` | \`ArrayList::new\` |`,
    javaCodeExamples: `import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

class User {
    private String name;
    public User() { this.name = "Anonymous"; }
    public User(String name) { this.name = name; }
    public String getName() { return name; }
}

public class MethodReferencesDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob");

        // 1. Arbitrary Object Instance Method: String::toUpperCase
        names.stream()
             .map(String::toUpperCase)
             // 2. Specific Object Instance Method: System.out::println
             .forEach(System.out::println);

        // 3. Constructor Reference: User::new
        Function<String, User> userFactory = User::new;
        User user = userFactory.apply("InterviewPocket Admin");
        System.out.println("Created User: " + user.getName());
    }
}`,
    outputExplanation: `- Demonstrates replacing verbose lambdas with concise method and constructor references.`,
    interviewReadyAnswer: `- "Method references are syntactic sugar for lambdas calling existing methods using the double-colon '::' operator."
- "The 4 forms are static method references, specific instance references, arbitrary type instance references, and constructor references (ClassName::new)."`,
    quickRevisionPoints: `- Double-colon operator \`::\`.
- Shorthand for lambdas that only invoke an existing method.
- 4 forms: Static, Bound Instance, Unbound Instance, Constructor.
- \`ClassName::new\` invokes matching constructors.`
  },
  {
    topicId: 167,
    slug: 'optional-class-null-safety',
    title: 'Optional Class & Eliminating NullPointerExceptions',
    definition: `- **Optional<T> (\`java.util.Optional\`)**: A container object introduced in Java 8 that may or may not contain a non-null value of type \`T\`.
- **Primary Design Purpose**: Provides a clean type-level mechanism for representing optional return values in APIs, forcing callers to explicitly contemplate and handle the absence of a value without crashing into **\`NullPointerException\`**.`,
    simpleExplanation: `- **The Sealed Amazon Delivery Box**: Instead of handing you a raw item that might evaporate into thin air (returning \`null\`), the store hands you a sealed box labeled "Amazon Package". You use safe tools to check if the box contains an item before opening it (\`isPresent()\`, \`ifPresent()\`, \`orElse()\`).`,
    importantConcepts: `- **Instantiation Methods**:
  • \`Optional.of(value)\`: Wraps non-null value; throws NPE immediately if value is null!
  • \`Optional.ofNullable(value)\`: Wraps value if present; returns \`Optional.empty()\` if null.
  • \`Optional.empty()\`: Represents an empty Optional.
- **Consumption Best Practices**:
  • Avoid calling \`.get()\` directly without checking; calling \`.get()\` on an empty Optional throws \`NoSuchElementException\`!
  • Use \`orElse(defaultVal)\`, \`orElseGet(supplier)\`, or \`orElseThrow(exceptionSupplier)\`.`,
    javaCodeExamples: `import java.util.Optional;

public class OptionalDemo {
    public static Optional<String> findUserById(int id) {
        if (id == 101) return Optional.of("Alice");
        return Optional.empty(); // No user found
    }

    public static void main(String[] args) {
        // Querying with safe fallback
        Optional<String> userOpt = findUserById(999);

        // Safe consumption with orElse
        String username = userOpt.orElse("Guest User");
        System.out.println("Active user: " + username);

        // Functional processing with ifPresent
        findUserById(101).ifPresent(name -> System.out.println("Found user: " + name));

        // orElseThrow pattern (Standard in Spring Boot REST APIs)
        try {
            findUserById(999).orElseThrow(() -> new RuntimeException("User not found in database!"));
        } catch (RuntimeException ex) {
            System.err.println("Safely handled: " + ex.getMessage());
        }
    }
}`,
    outputExplanation: `- Demonstrates defensive retrieval and exception throwing patterns using \`Optional\`.`,
    interviewReadyAnswer: `- "Optional<T> is a container object for representing the presence or absence of a value, eliminating unexpected NullPointerExceptions in API return types."
- "Prefer ofNullable(), orElse(), orElseGet(), and map() over raw get() calls."`,
    quickRevisionPoints: `- Container object: value present or empty.
- \`Optional.ofNullable()\` handles null values safely.
- Never call \`.get()\` without checking; prefer \`orElse()\` or \`orElseThrow()\`.
- Designed for method return types, NOT as class field members.`
  },
  {
    topicId: 168,
    slug: 'stream-api-introduction-lifecycle',
    title: 'Stream API Introduction & Stream Pipeline Lifecycle',
    definition: `- **Stream API (\`java.util.stream\`)**: A powerful functional data processing framework introduced in Java 8 for declarative querying, filtering, transforming, and aggregating sequences of elements.
- **A Stream is NOT a Data Structure**: It does not store elements; it conveys elements from a data source (collection, array, I/O channel) through a computational pipeline.
- **Stream Pipeline Lifecycle**:
  1. **Source**: Origin of data (e.g., \`list.stream()\`, \`Arrays.stream(arr)\`).
  2. **Zero or More Intermediate Operations**: Transforms stream into another stream (e.g., \`filter\`, \`map\`). **LAZY evaluation**.
  3. **Exactly One Terminal Operation**: Triggers computation and produces a result or side-effect (e.g., \`collect\`, \`count\`, \`forEach\`). Closes the stream.`,
    simpleExplanation: `- **The Factory Assembly Conveyor Belt**: Elements ride along a conveyor belt from a hopper (Source). Along the belt, robot arms inspect products (filter) and paint them (map). Nothing moves until the packaging station at the very end of the line (Terminal Operation) turns on the master switch.`,
    importantConcepts: `- **Streams are Consumable (Single-Use)**: A Stream cannot be reused once a terminal operation has been executed! Attempting to operate on a closed stream throws **\`IllegalStateException: stream has already been operated upon or closed\`**.
- **Lazy Evaluation**: Intermediate operations do NOT execute when defined; they only execute when the terminal operation is invoked, allowing optimizations like loop fusion and short-circuiting.`,
    javaCodeExamples: `import java.util.Arrays;
import java.util.List;

public class StreamLifecycleDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("David", "Alice", "Bob", "Charlie");

        // Complete 3-stage stream pipeline
        long count = names.stream()                               // 1. Source
                          .filter(s -> {                          // 2. Intermediate (Lazy)
                              System.out.println("Filtering: " + s);
                              return s.length() > 3;
                          })
                          .map(String::toUpperCase)               // 2. Intermediate (Lazy)
                          .count();                               // 3. Terminal (Triggers pipeline)

        System.out.println("Total names longer than 3 chars: " + count);
    }
}`,
    outputExplanation: `- Illustrates that intermediate filter operations only run because \`count()\` triggered execution.`,
    interviewReadyAnswer: `- "A Java Stream is a sequence of elements supporting declarative functional operations. A stream pipeline consists of a Source, lazy Intermediate operations, and a Terminal operation that executes the pipeline."
- "Streams are single-use; once closed by a terminal operation, they cannot be reused."`,
    quickRevisionPoints: `- Streams do not store data; they convey elements from a source.
- Lifecycle: Source -> Intermediate Operations (Lazy) -> Terminal Operation.
- Cannot be reused after terminal operation executes.
- Intermediate operations are executed lazily.`
  },
  {
    topicId: 169,
    slug: 'stream-intermediate-operations',
    title: 'Intermediate Operations (filter, map, sorted, distinct, flatMap)',
    definition: `- **Intermediate Operations**: Operations that transform an input Stream into another Stream.
- **Two Categories**:
  1. **Stateless Operations**: Each element is processed independently without relying on other elements (e.g. \`filter\`, \`map\`, \`flatMap\`, \`peek\`).
  2. **Stateful Operations**: Processing requires knowledge of all elements across the entire stream (e.g. \`sorted\`, \`distinct\`, \`limit\`, \`skip\`).`,
    importantDifferences: `| Operation | Purpose | Signature Pattern |
|---|---|---|
| **\`filter(Predicate)\`** | Keeps elements that satisfy boolean condition | Stream<T> -> Stream<T> |
| **\`map(Function)\`** | Transforms elements (1-to-1 mapping) | Stream<T> -> Stream<R> |
| **\`flatMap(Function)\`**| Flattens nested streams (1-to-many mapping) | Stream<Collection<T>> -> Stream<T> |
| **\`distinct()\`** | Removes duplicates using \`equals()\` | Stream<T> -> Stream<T> |
| **\`sorted()\`** | Sorts elements by natural or custom comparator | Stream<T> -> Stream<T> |`,
    javaCodeExamples: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class IntermediateOperationsDemo {
    public static void main(String[] args) {
        List<List<String>> nestedSkills = Arrays.asList(
            Arrays.asList("Java", "Spring"),
            Arrays.asList("Docker", "Kubernetes", "Java")
        );

        // Demonstrating flatMap, distinct, sorted, and filter
        List<String> result = nestedSkills.stream()
            .flatMap(List::stream)             // 1. Flatten nested lists into single stream
            .filter(s -> !s.equals("Docker"))  // 2. Filter out Docker
            .distinct()                        // 3. Remove duplicate "Java"
            .sorted()                          // 4. Sort alphabetically
            .collect(Collectors.toList());

        System.out.println("Processed unique skills: " + result);
    }
}`,
    outputExplanation: `- Flattens nested collections, filters items, removes duplicates, and sorts remaining strings in a single pipeline.`,
    interviewReadyAnswer: `- "Intermediate stream operations transform streams lazily. They are divided into stateless operations (filter, map, flatMap) and stateful operations (sorted, distinct) that require full stream awareness."
- "flatMap is crucial for transforming 1-to-many relationships and flattening nested collections."`,
    quickRevisionPoints: `- Intermediate operations return a new Stream and evaluate lazily.
- \`map\`: 1-to-1 transformation; \`flatMap\`: 1-to-many flattening.
- \`distinct()\` and \`sorted()\` are stateful operations.
- \`filter()\` takes a \`Predicate<T>\`.`
  },
  {
    topicId: 170,
    slug: 'stream-terminal-operations',
    title: 'Terminal Operations (collect, forEach, reduce, count, anyMatch)',
    definition: `- **Terminal Operations**: The concluding operation in a stream pipeline that traverses the stream, produces a non-stream result (primitive, Collection, Optional) or side effect, and terminates the stream.
- **Two Categories**:
  1. **Standard Reductions**: Traverses all elements (e.g. \`collect\`, \`reduce\`, \`count\`, \`forEach\`, \`toArray\`).
  2. **Short-Circuiting Operations**: Can terminate early without evaluating the entire stream (e.g. \`anyMatch\`, \`allMatch\`, \`noneMatch\`, \`findFirst\`, \`findAny\`).`,
    importantDifferences: `| Operation | Return Type | Short-Circuiting? | Description |
|---|---|---|---|
| **\`collect(Collector)\`** | Container (\`List\`, \`Set\`, \`Map\`) | No | Gathers stream elements into collections |
| **\`reduce()\`** | \`Optional<T>\` or \`T\` | No | Folds stream elements into a single aggregate value |
| **\`forEach(Consumer)\`** | \`void\` | No | Performs side-effect action for each element |
| **\`anyMatch(Predicate)\`**| \`boolean\` | **YES** | Returns true as soon as one match is found |
| **\`findFirst()\`** | \`Optional<T>\` | **YES** | Returns first element and stops processing |`,
    javaCodeExamples: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TerminalOperationsDemo {
    public static void main(String[] args) {
        List<String> items = Arrays.asList("Apple", "Avocado", "Banana", "Apricot", "Blueberry");

        // 1. collect: Grouping by starting character
        Map<Character, List<String>> grouped = items.stream()
            .collect(Collectors.groupingBy(s -> s.charAt(0)));
        System.out.println("Grouped by initial: " + grouped);

        // 2. reduce: Computing sum of string lengths
        int totalChars = items.stream()
            .mapToInt(String::length)
            .reduce(0, (sum, len) -> sum + len);
        System.out.println("Total character count: " + totalChars);

        // 3. short-circuiting: anyMatch stops early!
        boolean hasB = items.stream().anyMatch(s -> s.startsWith("B"));
        System.out.println("Contains fruit starting with 'B'? " + hasB);
    }
}`,
    outputExplanation: `- Illustrates grouping via \`Collectors.groupingBy\`, numeric folding via \`reduce\`, and short-circuit evaluation via \`anyMatch\`.`,
    interviewReadyAnswer: `- "Terminal operations trigger the execution of a stream pipeline and close the stream, returning a result or side effect."
- "Key terminal operations include collect() for collection gathering, reduce() for aggregation, and short-circuiting operations like anyMatch() and findFirst()."`,
    quickRevisionPoints: `- Terminal operation triggers execution and consumes the stream.
- \`collect()\` uses \`Collectors\` to build Lists, Sets, and Maps.
- Short-circuit operations (\`anyMatch\`, \`findFirst\`) terminate early.
- Stream is permanently closed after terminal execution.`
  }
];

