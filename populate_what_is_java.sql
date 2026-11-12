
USE interviewpocket_db;

-- 1. UPDATE NOTES FOR TOPIC 47 (What is Java?)
UPDATE notes SET
  definition = 'Java is a high-level, robust, class-based, object-oriented, concurrent, secure, and general-purpose programming language. Originally developed by Sun Microsystems (led by James Gosling) in 1995 and now stewarded by Oracle Corporation, Java follows the foundational philosophy: **"Write Once, Run Anywhere" (WORA)**. This means compiled Java code can execute on all platforms that support the Java Virtual Machine (JVM) without the need for recompilation.',
  simple_explanation = 'Imagine buying an electronic device with a universal power adapter. Regardless of whether you plug it into an electrical socket in the US, Europe, or India, the adapter translates the local power voltage into the exact format your device requires.
In this analogy:
- Your written program is the electronic device.
- The compiled bytecode is the universal cable.
- The **JVM (Java Virtual Machine)** is the platform-specific adapter installed on each operating system (Windows, macOS, Linux).
You write the source code once, compile it into universal bytecode, and the target machine''s JVM executes it flawlessly.',
  why_needed = 'Before Java''s arrival in the mid-1990s, languages like C and C++ dominated enterprise and systems programming. However, developers faced severe operational challenges:
1. **Platform Dependency**: C/C++ source code had to be recompiled separately for each operating system and processor architecture, producing platform-locked machine binaries.
2. **Manual Memory Management**: Explicit memory allocation and deallocation (using `malloc`/`free` in C or `new`/`delete` in C++) frequently led to memory leaks, dangling pointers, and catastrophic buffer overflows.
3. **Security Vulnerabilities**: Raw memory access through explicit pointers allowed malicious memory corruption and exploits.
4. **Lack of Internet-First Architecture**: As the World Wide Web emerged, distributed networking required a secure, architecture-neutral runtime that could safely transmit executable programs across heterogeneous networks. Java was engineered from the ground up to solve these exact problems.',
  how_it_works = 'The execution lifecycle of a Java application follows a disciplined 5-stage pipeline:
1. **Source Code Creation**: The developer writes human-readable Java instructions in a `.java` text file (e.g., `Main.java`).
2. **Compilation**: The Java Compiler (`javac`) parses the source code, validates syntax and static types, and compiles it into an intermediate binary representation called **Bytecode** stored in a `.class` file.
3. **Class Loading**: When the application runs, the JVM''s **ClassLoader Subsystem** dynamically loads the required `.class` files into memory, links dependencies, and initializes static members.
4. **Bytecode Verification**: The **Bytecode Verifier** inspects the loaded bytecode instructions before execution to guarantee memory safety, verifying that code does not violate access rules, forge pointers, or overflow operand stacks.
5. **Execution & JIT Optimization**: The JVM''s **Execution Engine** executes bytecode using an interpreter for fast startup. Frequently invoked "hotspot" loops and methods are simultaneously compiled into native processor machine instructions by the **Just-In-Time (JIT) Compiler** for near-native hardware execution speed.',
  important_concepts = 'Key architectural pillars of Java:
- **WORA (Write Once, Run Anywhere)**: Intermediate bytecode decouples the developer''s source code from underlying operating system architectures.
- **Automatic Garbage Collection (GC)**: Background JVM daemon threads continually track object references in Heap memory and reclaim memory occupied by unreferenced objects, eliminating manual memory deallocation bugs.
- **Strict Static Typing**: Variable data types and method contracts are rigorously validated at compile-time, catching type incompatibilities early.
- **Pure Object-Oriented Blueprint**: Almost everything in Java is encapsulated inside classes and objects (with the pragmatic exception of primitive data types for high arithmetic performance).
- **Zero Explicit Pointer Arithmetic**: Java maintains memory addresses internally while concealing raw pointer arithmetic from developers, preventing memory hacking and segmentation faults.',
  real_world_examples = 'Where Java powers modern technology:
- **Enterprise Financial Systems**: Over 90% of Fortune 500 banks and investment firms (including JPMorgan Chase, Citigroup, and Goldman Sachs) run high-throughput transaction ledgers and algorithmic trading pipelines on Java.
- **Android Operating System**: The core Android framework and millions of mobile applications are compiled to run on Android Run Time (ART) using Java semantics.
- **Big Data Infrastructure**: Industry-standard data processing frameworks including Apache Hadoop, Apache Spark, Apache Kafka, and Apache Cassandra are built in Java.
- **Enterprise Microservices**: Scalable backend architectures powered by Spring Boot, Quarkus, and Micronaut serve mission-critical cloud backends globally.',
  java_code_examples = '### Standard Hello World Program

```java
package com.interviewpocket.demo;

/**
 * Standard Entry Point Demonstration
 */
public class HelloWorld {
    
    // The JVM looks for this exact method signature to launch execution
    public static void main(String[] args) {
        // Output greeting to standard console stream
        System.out.println("Hello, Welcome to Java with InterviewPocket!");
        
        // Demonstrating basic object instantiation and state
        Language javaLang = new Language("Java", 1995, "James Gosling");
        javaLang.displayInfo();
    }
}

class Language {
    private final String name;
    private final int releaseYear;
    private final String creator;

    public Language(String name, int releaseYear, String creator) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.creator = creator;
    }

    public void displayInfo() {
        System.out.printf("%s was created by %s in the year %d.%n", 
                          this.name, this.creator, this.releaseYear);
    }
}
```

#### Anatomy of `public static void main(String[] args)`:
- **`public`**: An access modifier that makes the method globally accessible to the external JVM runtime.
- **`static`**: Allows the JVM to invoke the method directly on the class without needing to instantiate an object first.
- **`void`**: Indicates the method returns no value to the operating system after completion.
- **`main`**: The predefined entry point identifier recognized by the JVM''s execution engine.
- **`String[] args`**: An array of string arguments supplied to the program from the command line.',
  internal_working = '### Bytecode & The Virtual Machine Engine
When you compile `HelloWorld.java`, the generated `HelloWorld.class` file begins with the hexadecimal magic number:
```
0xCAFEBABE
```
This 4-byte sequence identifies the binary stream to the JVM as an authentic compiled Java class file.

#### The Three Core ClassLoaders:
1. **Bootstrap ClassLoader**: Loads core JDK runtime classes from the `java.base` module (such as `java.lang.Object`, `java.lang.String`).
2. **Platform / Extension ClassLoader**: Loads platform extension libraries.
3. **Application / System ClassLoader**: Loads application-specific classes located on the environment `CLASSPATH`.

#### JIT Compilation Mechanics:
The JVM begins execution in interpreted mode for instantaneous startup. A built-in profiler counts method invocations and loop iterations. When an execution count crosses a predefined threshold (e.g., 10,000 invocations), that block is marked as a **Hotspot**. The JIT compiler then compiles that bytecode into native CPU assembly, caches it in the Code Cache area of Metaspace, and subsequent invocations execute directly at raw processor speeds.',
  advantages_disadvantages = '### Advantages of Java
- **Platform Independence**: Bytecode runs seamlessly on any hardware architecture equipped with a JVM.
- **Memory Safety**: Automated Garbage Collection prevents memory leaks, double-free vulnerabilities, and dangling references.
- **Rich Standard Ecosystem**: Decades of mature, battle-tested open-source libraries (Spring, Apache Commons, Jackson, Guava, JUnit).
- **Robust Multithreading**: Built-in language primitives (`synchronized`, `volatile`, `wait`/`notify`) and the high-performance `java.util.concurrent` package.
- **Backward Compatibility**: Code compiled on older Java versions runs reliably on modern JVM releases without breaking changes.

### Disadvantages / Trade-offs of Java
- **Memory Footprint**: JVM memory management and object headers consume more RAM than bare-metal C/C++ or Rust binaries.
- **Warm-up Time**: JIT compilation and class loading introduce a minor startup latency compared to ahead-of-time compiled binaries (partially mitigated by GraalVM Native Image).
- **Verbosity**: Traditional Java syntax requires more boilerplate than Python or Kotlin (significantly streamlined in modern Java 17-21 with records, pattern matching, and var).',
  important_differences = '### Comprehensive Comparison: Java vs C++ vs Python

| Criteria | Java | C++ | Python |
| :--- | :--- | :--- | :--- |
| **Language Paradigm** | Object-Oriented, Class-Based | Multi-paradigm (Procedural, OOP, Generic) | Multi-paradigm, Dynamic Scripting |
| **Execution Model** | Compiled to Bytecode, executed by JVM with JIT | Compiled directly to native machine code | Interpreted line-by-line via bytecode in CPython |
| **Platform Independence** | High (WORA across any OS with JVM) | Low (must recompile per OS/CPU target) | High (runs on any OS with Python interpreter) |
| **Memory Management** | Automatic Garbage Collection | Manual (`new`/`delete`, smart pointers) | Automatic Reference Counting & Cyclic GC |
| **Pointers Support** | No explicit pointer arithmetic | Direct pointer arithmetic supported | No explicit pointers |
| **Multiple Inheritance** | Classes: No; Interfaces: Yes | Supported for classes (Diamond Problem) | Supported for classes via C3 MRO |
| **Performance Speed** | High (near-native after JIT compilation) | Maximum (direct bare-metal execution) | Moderate / Slower due to dynamic interpretation |
| **Type System** | Statically Typed (verified at compile-time) | Statically Typed | Dynamically Typed (verified at runtime) |',
  common_tricky_questions = '### Top Tricky Interview Questions on "What is Java?"
1. **Is Java 100% pure object-oriented?**
   * *Answer*: No. Java is not 100% pure object-oriented because it retains 8 primitive data types (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`) that are not objects and do not inherit from `java.lang.Object`. To treat them as objects, Java provides wrapper classes.
2. **Can a Java program execute without a `main()` method?**
   * *Answer*: In Java 6 and earlier, one could execute code without `main` by using a static initializer block (`static { ... }`). However, starting from Java 7, the JVM explicitly verifies the existence of the `public static void main(String[] args)` method before initializing the class, terminating with `Error: Main method not found` if absent.
3. **What happens if you remove `static` from the `main` method signature?**
   * *Answer*: The code compiles without errors, but at runtime the JVM throws `NoSuchMethodError: main` because the JVM is programmed to call `MainClass.main()` statically without creating an instance.
4. **Why doesn''t Java support explicit pointers?**
   * *Answer*: Pointers allow direct address manipulation, leading to memory overwrites, buffer overflows, and security vulnerabilities. Eliminating pointer arithmetic makes Java inherently memory-safe and simplifies developer debugging.',
  interview_ready_answer = '> "Java is a high-level, class-based, object-oriented programming language designed around the ''Write Once, Run Anywhere'' philosophy. When we write Java source code, the javac compiler transforms it into platform-neutral bytecode (.class file). This bytecode is executed by the Java Virtual Machine (JVM), which is specific to each operating system.
> 
> Java eliminates explicit pointer arithmetic and provides automated Garbage Collection for robust memory management. It is widely chosen for enterprise backends, financial trading systems, and Android mobile development because of its platform independence, strong static type safety, built-in concurrency model, and unmatched ecosystem maturity."',
  quick_revision_points = '- **Creator & Year**: Created by James Gosling at Sun Microsystems in 1995; currently owned by Oracle.
- **Core Philosophy**: WORA (Write Once, Run Anywhere) enabled by intermediate Bytecode and the JVM.
- **Magic Number**: Every valid Java class file begins with `0xCAFEBABE`.
- **Memory Safety**: Automatic Garbage Collection reclaims unreferenced Heap memory; no manual `free()` needed.
- **Purity**: Not 100% pure object-oriented due to 8 primitive types.
- **Execution Mechanism**: Hybrid execution—initial Bytecode Interpretation combined with JIT compilation for hotspot methods.
- **Security**: Bytecode Verifier prevents unauthorized memory access before instructions reach the CPU.',
  what_is_it = 'Java is a high-level, robust, class-based, object-oriented, concurrent, secure, and general-purpose programming language. Originally developed by Sun Microsystems (led by James Gosling) in 1995 and now stewarded by Oracle Corporation, Java follows the foundational philosophy: **"Write Once, Run Anywhere" (WORA)**. This means compiled Java code can execute on all platforms that support the Java Virtual Machine (JVM) without the need for recompilation.',
  simple_meaning = 'Imagine buying an electronic device with a universal power adapter. Regardless of whether you plug it into an electrical socket in the US, Europe, or India, the adapter translates the local power voltage into the exact format your device requires.
In this analogy:
- Your written program is the electronic device.
- The compiled bytecode is the universal cable.
- The **JVM (Java Virtual Machine)** is the platform-specific adapter installed on each operating system (Windows, macOS, Linux).
You write the source code once, compile it into universal bytecode, and the target machine''s JVM executes it flawlessly.',
  why_use_it = 'Before Java''s arrival in the mid-1990s, languages like C and C++ dominated enterprise and systems programming. However, developers faced severe operational challenges:
1. **Platform Dependency**: C/C++ source code had to be recompiled separately for each operating system and processor architecture, producing platform-locked machine binaries.
2. **Manual Memory Management**: Explicit memory allocation and deallocation (using `malloc`/`free` in C or `new`/`delete` in C++) frequently led to memory leaks, dangling pointers, and catastrophic buffer overflows.
3. **Security Vulnerabilities**: Raw memory access through explicit pointers allowed malicious memory corruption and exploits.
4. **Lack of Internet-First Architecture**: As the World Wide Web emerged, distributed networking required a secure, architecture-neutral runtime that could safely transmit executable programs across heterogeneous networks. Java was engineered from the ground up to solve these exact problems.',
  real_world_example = 'Where Java powers modern technology:
- **Enterprise Financial Systems**: Over 90% of Fortune 500 banks and investment firms (including JPMorgan Chase, Citigroup, and Goldman Sachs) run high-throughput transaction ledgers and algorithmic trading pipelines on Java.
- **Android Operating System**: The core Android framework and millions of mobile applications are compiled to run on Android Run Time (ART) using Java semantics.
- **Big Data Infrastructure**: Industry-standard data processing frameworks including Apache Hadoop, Apache Spark, Apache Kafka, and Apache Cassandra are built in Java.
- **Enterprise Microservices**: Scalable backend architectures powered by Spring Boot, Quarkus, and Micronaut serve mission-critical cloud backends globally.',
  practical_code = '### Standard Hello World Program

```java
package com.interviewpocket.demo;

/**
 * Standard Entry Point Demonstration
 */
public class HelloWorld {
    
    // The JVM looks for this exact method signature to launch execution
    public static void main(String[] args) {
        // Output greeting to standard console stream
        System.out.println("Hello, Welcome to Java with InterviewPocket!");
        
        // Demonstrating basic object instantiation and state
        Language javaLang = new Language("Java", 1995, "James Gosling");
        javaLang.displayInfo();
    }
}

class Language {
    private final String name;
    private final int releaseYear;
    private final String creator;

    public Language(String name, int releaseYear, String creator) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.creator = creator;
    }

    public void displayInfo() {
        System.out.printf("%s was created by %s in the year %d.%n", 
                          this.name, this.creator, this.releaseYear);
    }
}
```

#### Anatomy of `public static void main(String[] args)`:
- **`public`**: An access modifier that makes the method globally accessible to the external JVM runtime.
- **`static`**: Allows the JVM to invoke the method directly on the class without needing to instantiate an object first.
- **`void`**: Indicates the method returns no value to the operating system after completion.
- **`main`**: The predefined entry point identifier recognized by the JVM''s execution engine.
- **`String[] args`**: An array of string arguments supplied to the program from the command line.',
  important_points = 'Key architectural pillars of Java:
- **WORA (Write Once, Run Anywhere)**: Intermediate bytecode decouples the developer''s source code from underlying operating system architectures.
- **Automatic Garbage Collection (GC)**: Background JVM daemon threads continually track object references in Heap memory and reclaim memory occupied by unreferenced objects, eliminating manual memory deallocation bugs.
- **Strict Static Typing**: Variable data types and method contracts are rigorously validated at compile-time, catching type incompatibilities early.
- **Pure Object-Oriented Blueprint**: Almost everything in Java is encapsulated inside classes and objects (with the pragmatic exception of primitive data types for high arithmetic performance).
- **Zero Explicit Pointer Arithmetic**: Java maintains memory addresses internally while concealing raw pointer arithmetic from developers, preventing memory hacking and segmentation faults.',
  interview_answer = '> "Java is a high-level, class-based, object-oriented programming language designed around the ''Write Once, Run Anywhere'' philosophy. When we write Java source code, the javac compiler transforms it into platform-neutral bytecode (.class file). This bytecode is executed by the Java Virtual Machine (JVM), which is specific to each operating system.
> 
> Java eliminates explicit pointer arithmetic and provides automated Garbage Collection for robust memory management. It is widely chosen for enterprise backends, financial trading systems, and Android mobile development because of its platform independence, strong static type safety, built-in concurrency model, and unmatched ecosystem maturity."',
  comparison_table = '### Comprehensive Comparison: Java vs C++ vs Python

| Criteria | Java | C++ | Python |
| :--- | :--- | :--- | :--- |
| **Language Paradigm** | Object-Oriented, Class-Based | Multi-paradigm (Procedural, OOP, Generic) | Multi-paradigm, Dynamic Scripting |
| **Execution Model** | Compiled to Bytecode, executed by JVM with JIT | Compiled directly to native machine code | Interpreted line-by-line via bytecode in CPython |
| **Platform Independence** | High (WORA across any OS with JVM) | Low (must recompile per OS/CPU target) | High (runs on any OS with Python interpreter) |
| **Memory Management** | Automatic Garbage Collection | Manual (`new`/`delete`, smart pointers) | Automatic Reference Counting & Cyclic GC |
| **Pointers Support** | No explicit pointer arithmetic | Direct pointer arithmetic supported | No explicit pointers |
| **Multiple Inheritance** | Classes: No; Interfaces: Yes | Supported for classes (Diamond Problem) | Supported for classes via C3 MRO |
| **Performance Speed** | High (near-native after JIT compilation) | Maximum (direct bare-metal execution) | Moderate / Slower due to dynamic interpretation |
| **Type System** | Statically Typed (verified at compile-time) | Statically Typed | Dynamically Typed (verified at runtime) |',
  updated_at = NOW()
WHERE topic_id = 47;

-- 2. INSERT INTERVIEW QUESTIONS FOR TOPIC 47
DELETE FROM interview_questions WHERE topic_id = 47;

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'What is Java and what are its core architectural features?',
  'Java is an object-oriented, platform-independent, secure, and robust programming language that compiles to bytecode and runs on the Java Virtual Machine (JVM).',
  'Java was designed with 12 foundational features known as the Java Buzzwords: Simple, Object-Oriented, Platform-Independent, Robust, Secure, Architecture-Neutral, Portable, High-Performance, Multithreaded, Distributed, Dynamic, and Interpreted. Its core architectural advantage is the decoupling of source code from underlying operating systems through bytecode and the JVM.',
  'Enterprise banking applications use Java because the exact same business logic can run securely on Windows developer workstations, Linux server clusters, and IBM mainframe backends without rewriting code.',
  'Remember ''PORSH'': Platform-independent, Object-oriented, Robust, Secure, High-performance.',
  'Java is a high-level, class-based, object-oriented programming language designed for platform independence. It uses a two-step execution process: the javac compiler compiles source code into platform-neutral bytecode, and the JVM interprets and JIT-compiles this bytecode into native machine instructions on the target OS. Key features include automatic garbage collection, lack of explicit pointers, and strong type checking.',
  'BEGINNER',
  1,
  1,
  1
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'Why is Java platform independent, but the JVM is platform dependent?',
  'Java source code compiles to platform-neutral bytecode (.class) which can run anywhere. However, each operating system requires a custom JVM built specifically to translate that bytecode into its unique machine instructions.',
  'Platform independence refers to the ability of the same compiled code (.class file) to execute on Windows, macOS, Linux, and Solaris without recompilation. The JVM itself is a native program compiled in C/C++ specifically for each operating system and CPU architecture (x86, ARM, Apple Silicon). Hence, while the bytecode is universally portable, the JVM translating it is operating-system specific.',
  'A PDF document is platform independent—the same PDF file can be read anywhere. But Adobe Acrobat Reader must be downloaded specifically for Windows, macOS, or Android. In this analogy, the PDF is Java Bytecode and the Reader is the JVM.',
  'Bytecode is Universal; JVM is Local.',
  'Java achieves platform independence through its intermediate bytecode. When we compile Java source code, javac produces a .class file containing bytecode instructions that are independent of any CPU architecture. However, the JVM must interact directly with the underlying operating system and hardware to execute these instructions. Therefore, Oracle and OpenJDK provide different JVM binaries for Windows, Linux, and macOS. The bytecode is platform-independent, while the JVM is platform-dependent.',
  'BEGINNER',
  1,
  1,
  2
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'Explain the purpose of each keyword in: public static void main(String[] args)',
  'It is the predefined entry point where the JVM begins executing any standalone Java application.',
  'Each keyword serves a specific JVM operational requirement:
- public: Access modifier making the entry point callable from outside the package by the JVM runtime.
- static: Allows the JVM to invoke the method directly using ClassName.main() without creating an instance of the class first.
- void: Indicates that the method returns no value to the operating system upon termination.
- main: The exact method identifier searched for by the JVM during startup.
- String[] args: Command-line arguments passed as an array of String tokens.',
  'When you run ''java MyApp server 8080'', ''server'' and ''8080'' are captured in the String[] args array as args[0] and args[1].',
  'P-S-V-M: Public to world, Static for no object, Void for no return, Main as entry point.',
  'The public static void main(String[] args) method is the standardized entry point for Java applications. ''public'' allows the JVM to access the method from outside the class. ''static'' allows the JVM to execute the method without allocating an instance of the class, saving memory at startup. ''void'' means the method does not return a value when execution completes. ''main'' is the identifier hardcoded into the JVM launcher specification. Finally, ''String[] args'' accepts optional command-line parameters passed by the user.',
  'BEGINNER',
  1,
  1,
  3
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'Why is Java not considered a 100% pure object-oriented language?',
  'Because Java supports 8 primitive data types (like int, boolean, double) that are not objects and do not inherit from java.lang.Object.',
  'In a 100% pure object-oriented language (such as Smalltalk), every piece of data is an object, and every operation is a method invocation. Java retains primitive data types (byte, short, int, long, float, double, char, boolean) for performance and arithmetic efficiency. Primitives are stored directly as raw values on the stack rather than heap-allocated objects with metadata headers.',
  'Performing millions of arithmetic calculations using primitive ''int'' is 10x faster and requires 4x less memory than using the wrapper object ''Integer''.',
  'Primitives prevent Pure OOP.',
  'Java is not 100% pure object-oriented because it retains eight primitive data types: byte, short, int, long, float, double, char, and boolean. These primitive types do not inherit from java.lang.Object and do not have methods. James Gosling retained primitives to avoid the memory overhead and performance penalties of object allocation for basic arithmetic. However, Java provides Wrapper Classes (Integer, Double, etc.) and Autoboxing to bridge the gap when object representations are required.',
  'INTERMEDIATE',
  1,
  1,
  4
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'What is the difference between JDK, JRE, and JVM?',
  'JDK is for developers to build programs; JRE is for users to run programs; JVM is the virtual machine that actually executes bytecode.',
  'The relationship follows a nested containment hierarchy:
1. JVM (Java Virtual Machine): The abstract runtime environment that loads, verifies, and executes bytecode.
2. JRE (Java Runtime Environment): JVM + Core Java Class Libraries (rt.jar, java.base) required to run Java applications.
3. JDK (Java Development Kit): JRE + Development Tools (javac compiler, debugger jdb, archiver jar, disassembler javap).',
  'A software developer needs the full JDK to write, compile, and debug code. An end-user or client only needs the JRE (or bundled runtime) to run the compiled application.',
  'JDK = JRE + Tools; JRE = JVM + Libraries.',
  'JDK, JRE, and JVM form the three tiers of Java execution. The JVM is the virtual execution engine responsible for loading bytecode, verifying it, and executing it via an interpreter and JIT compiler. The JRE is the physical implementation of the JVM bundled with standard core libraries needed to run compiled Java applications. The JDK is the complete development kit containing the JRE plus developer tools such as the javac compiler, javadoc, and jar packaging utilities. Developers need the JDK, whereas deployment runtimes require only the JRE.',
  'INTERMEDIATE',
  1,
  1,
  5
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'Can we execute a Java program without the main() method?',
  'In modern Java (Java 7 and above), no. In older Java versions (Java 6 and below), one could execute code using a static initialization block.',
  'In Java 6 and earlier, the JVM would load the class and execute static initializer blocks (static { ... }) before checking for the presence of the main method. By placing System.exit(0) inside the static block, a program could run and exit cleanly without main. However, starting from Java 7, the JVM explicitly validates that public static void main(String[] args) exists in the class before triggering class initialization, throwing ''Error: Main method not found in class'' if absent.',
  'Modern test frameworks like JUnit execute test methods without writing a traditional main method, but behind the scenes the test runner itself contains a main method that drives execution.',
  'Java 6 allowed static trick; Java 7+ requires main.',
  'In modern Java (version 7 and above), a standalone application cannot execute without a main method. In Java 6 and earlier, developers could execute code inside a static block because the JVM loaded and initialized static members before checking for main. However, Java 7 enhanced the class launcher to explicitly verify the main method''s signature before executing static blocks. While frameworks like Spring Boot or JUnit appear to run without main, their underlying launchers invoke main under the hood.',
  'INTERMEDIATE',
  1,
  1,
  6
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'How does the JIT (Just-In-Time) compiler optimize Java bytecode execution?',
  'The JIT compiler profiles running bytecode, identifies frequently executed ''hotspots'', and compiles them directly into native machine code to bypass interpreter overhead.',
  'The JVM Execution Engine employs a hybrid execution model. At startup, the interpreter interprets bytecode line-by-line for fast application launch. Meanwhile, a built-in profiler monitors method call counters and loop back-edge counters. When a code block exceeds invocation thresholds, the JIT compiler compiles the bytecode into optimized native processor instructions and caches them in Metaspace Code Cache. Subsequent executions execute native CPU code directly. JIT also applies advanced optimizations like Method Inlining, Dead Code Elimination, and Escape Analysis.',
  'A financial trading loop processing millions of orders starts in interpreted mode and is JIT-compiled within milliseconds to execute at C++ comparable speeds directly on the CPU registers.',
  'Interpreter starts fast; JIT makes it fly.',
  'The JIT (Just-In-Time) compiler is a key component of the JVM Execution Engine that eliminates the performance penalty of interpretation. The JVM uses an adaptive compilation strategy: it begins by interpreting bytecode for rapid startup while profiling runtime behavior. When it identifies ''hotspot'' methods that execute repeatedly, the JIT compiler translates that bytecode directly into native machine code. It performs advanced compiler optimizations such as method inlining, loop unrolling, and escape analysis for stack allocation. This allows Java applications to approach native C/C++ execution performance over time.',
  'ADVANCED',
  1,
  1,
  7
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'Why does Java not support explicit pointer arithmetic?',
  'To ensure memory security, prevent accidental memory corruption, and make automatic garbage collection possible.',
  'Pointers in languages like C/C++ allow direct manipulation of physical memory addresses. While powerful, pointer arithmetic leads to common bugs: accessing unallocated memory, dangling pointers after deallocation, memory leaks, and buffer overflow exploits. Furthermore, Java''s Garbage Collector moves objects in Heap memory during compaction; if developers held direct raw memory addresses, those pointers would become invalid after every GC sweep.',
  'Classic software vulnerabilities like Heartbleed and buffer overflow exploits happen when pointers read beyond allocated buffer bounds. Java''s reference model prevents this entire class of security vulnerabilities.',
  'No pointers = No memory corruption + Safe Garbage Collection.',
  'Java eliminated explicit pointers primarily for security, robustness, and to enable automatic garbage collection. Direct pointer manipulation allows programs to access unauthorized memory addresses, causing segmentation faults and security vulnerabilities like buffer overflows. By using references instead of raw memory pointers, the JVM can safely manage memory and move objects during garbage collection compaction without breaking application state. All pointer dereferencing is handled safely and internally by the JVM.',
  'ADVANCED',
  1,
  1,
  8
);

INSERT INTO interview_questions (
  subject_id, topic_id, question, simple_answer, detailed_explanation,
  real_world_example, memory_trick, interview_answer, difficulty,
  is_frequently_asked, is_important, display_order
) VALUES (
  1, 47,
  'What is the internal structure of a compiled Java .class file and how does the Bytecode Verifier ensure security?',
  'A .class file contains a magic number, version numbers, constant pool, access flags, and bytecode instructions, verified by the Bytecode Verifier before execution.',
  'A compiled .class file follows a strictly defined binary specification:
1. Magic Number (4 bytes): 0xCAFEBABE identifying valid Java class files.
2. Minor & Major Version (4 bytes): Indicates the compiler version (e.g., Major 65 for Java 21).
3. Constant Pool: Table of literal constants, class names, method signatures, and field descriptors.
4. Access Flags: Public, abstract, final, interface markers.
5. Interfaces, Fields, and Methods tables (containing raw bytecode instructions).
Before execution, the Bytecode Verifier inspects this structure to ensure type safety, stack integrity, and that bytecode does not violate access rules.',
  'If a malicious actor modifies a .class file with a hex editor to bypass a private method access check, the Bytecode Verifier detects the stack violation and throws a java.lang.VerifyError before any code executes.',
  'Magic (CAFEBABE) → Version → Constant Pool → Bytecode Verifier check.',
  'A Java .class file is a standardized binary stream starting with the 4-byte magic number 0xCAFEBABE, followed by the compiler version, constant pool table, access flags, superclass references, field/method tables, and bytecode attributes. Before the JVM executes any loaded class, the Bytecode Verifier performs rigorous static analysis on the instructions: it ensures operand stack will not overflow or underflow, verifies parameter type matching for all instructions, checks that private members are not accessed illegally, and ensures no forged pointers exist. If any constraint fails, a VerifyError is thrown immediately.',
  'ADVANCED',
  1,
  1,
  9
);

-- 3. INSERT QUIZ QUESTIONS & OPTIONS FOR TOPIC 47 (quiz_id: 14)
DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE topic_id = 47);
DELETE FROM quiz_questions WHERE topic_id = 47;

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'What does the ''Write Once, Run Anywhere'' (WORA) philosophy in Java specifically signify?', NULL, 'Java source code is compiled by javac into platform-independent intermediate Bytecode (.class file). This bytecode can run on any device or operating system that has an installed Java Virtual Machine (JVM).', 'Think about the role of intermediate Bytecode and the JVM.', 'CONCEPTUAL', 'BEGINNER');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'Java source code files (.java) can be executed directly by the operating system CPU.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Compiled Java bytecode (.class) can run on any platform that has a compatible JVM installed without recompilation.', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Java applications do not require a compiler and run exclusively in web browsers.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'A Java program compiled on Windows will produce a native .exe binary that runs on Linux.', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'Why is Java NOT considered a 100% pure object-oriented programming language?', NULL, 'Java is not 100% pure object-oriented because it retains eight primitive data types (int, float, boolean, char, etc.) that do not inherit from java.lang.Object and are not objects.', 'Consider primitive data types like int and boolean.', 'CONCEPTUAL', 'BEGINNER');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'Because it does not support multiple inheritance through interfaces.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Because it supports primitive data types (like int, char, boolean) which are not objects.', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Because all classes in Java must belong to a package.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'Because Java does not allow operator overloading.', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'What are the first 4 bytes (magic number) present in every compiled Java .class file?', NULL, 'Every valid Java bytecode file begins with the 4-byte hexadecimal magic number 0xCAFEBABE, which the JVM ClassLoader verifies to recognize genuine class files.', 'It is a famous coffee-themed hexadecimal sequence.', 'TRICKY', 'INTERMEDIATE');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', '0xDEADBEEF', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', '0xCAFEBABE', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', '0xBAADF00D', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', '0xFEEDFACE', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'Which JVM execution engine component dynamically translates frequently executed ''hot'' bytecode methods into native machine instructions?', NULL, 'The Just-In-Time (JIT) compiler profiles bytecode at runtime and compiles frequently executed methods (''hotspots'') into native machine code, caching them for direct hardware execution.', 'It compiles code ''just in time'' during runtime.', 'CONCEPTUAL', 'INTERMEDIATE');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'Just-In-Time (JIT) Compiler', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Bytecode Verifier', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Bootstrap ClassLoader', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'Garbage Collector', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'What will happen if you attempt to compile and run the following Java class?', 'public class TestLauncher {
    public void main(String[] args) {
        System.out.println("Launching Application...");
    }
}', 'The code will compile without errors because any method can be named ''main''. However, when attempting to run it with ''java TestLauncher'', the JVM will throw a runtime NoSuchMethodError / MainMethodNotFound because the main method is not declared ''static''.', 'Notice the missing static modifier on the main method.', 'OUTPUT_BASED', 'INTERMEDIATE');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'Compile-time error: ''main method must be static''.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Compiles successfully, but throws a runtime error indicating main method is not static.', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Executes and prints ''Launching Application...'' successfully.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'JVM creates an instance automatically and invokes main.', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'Which tool included in the Java Development Kit (JDK) is used to disassemble compiled bytecode files into human-readable instructions?', NULL, 'The ''javap'' command is the official Java Class File Disassembler. Running ''javap -c ClassName'' prints the readable JVM bytecode instructions.', 'It has ''p'' at the end for print/disassemble.', 'MOST_ASKED', 'INTERMEDIATE');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'javadoc', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'javap', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'jar', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'jdb', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'Why does Java strictly avoid supporting explicit pointer arithmetic like C/C++?', NULL, 'Eliminating explicit pointers prevents unauthorized physical memory access, buffer overflows, and dangling pointer bugs. It also enables the Garbage Collector to safely relocate objects in memory during compaction.', 'Think about security, memory corruption, and garbage collection.', 'CONCEPTUAL', 'ADVANCED');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'To prevent security vulnerabilities, avoid memory corruption, and allow the Garbage Collector to move objects safely.', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Because modern CPU architectures do not have memory pointers.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Because pointers cannot be stored in 64-bit operating systems.', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'To ensure that Java programs cannot connect to network sockets.', 0);

INSERT INTO quiz_questions (quiz_id, subject_id, topic_id, question_text, code_snippet, explanation, hint, category, difficulty)
VALUES (14, 1, 47, 'Which JVM memory area is shared across all threads and stores loaded class structures, method data, and the runtime constant pool?', NULL, 'The Method Area (implemented as Metaspace in Java 8+) is shared across all JVM threads and stores class metadata, static fields, and the runtime constant pool. Stack memory and PC registers are private per thread.', 'In Java 8+, it is hosted in native memory called Metaspace.', 'CONCEPTUAL', 'ADVANCED');
SET @last_q_id = LAST_INSERT_ID();


INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'A', 'Program Counter (PC) Register', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'B', 'Method Area (Metaspace)', 1);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'C', 'Native Method Stack', 0);

INSERT INTO quiz_options (question_id, option_label, option_text, is_correct)
VALUES (@last_q_id, 'D', 'JVM Thread Stack', 0);
