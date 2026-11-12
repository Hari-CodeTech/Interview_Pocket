// Module 10: Java Memory Management (Topics 109-116)

module.exports = [
  {
    topicId: 109,
    slug: 'jvm-runtime-data-areas-overview',
    title: 'Overview of JVM Architecture & Runtime Data Areas',
    definition: `- **JVM Architecture**: The Java Virtual Machine is an abstract computing machine that executes compiled Java bytecode (\`.class\` files).
- **Core Architecture Subsystems**:
  1. **ClassLoader Subsystem**: Loads, links, and initializes \`.class\` files.
  2. **JVM Runtime Data Areas (Memory Areas)**: Metaspace, Heap, Stack, PC Registers, and Native Method Stack.
  3. **Execution Engine (Execution Subsystem)**: Interpreter, Just-In-Time (JIT) Compiler, and Garbage Collector. **Note**: The Execution Engine is an operational subsystem, NOT a memory area!
  4. **Native Interface & Libraries (JNI)**: Bridges native C/C++ libraries.`,
    simpleExplanation: `- **The City Architecture Analogy**:
  • **Metaspace**: The City Archives storing building blueprints (class definitions, static constants).
  • **Heap**: The Construction Grounds where all physical houses (objects) stand.
  • **Stack**: The Personal Workstation of each worker (thread) tracking active tasks and local tools.
  • **PC Register**: The bookmark showing the exact page number of the blueprint currently being read.
  • **Execution Engine**: The actual power tools and bulldozers running and cleaning the site.`,
    importantConcepts: `- **Memory Area Classification**:
  • **Shared across all Threads (JVM-wide)**:
    - **Metaspace / Method Area**: Class metadata, static variables, bytecode instructions.
    - **Heap Memory**: All instantiated objects and their instance variables.
  • **Per-Thread Dedicated (Thread-Local)**:
    - **Stack Memory**: Created when a thread starts; contains stack frames for active method calls.
    - **PC Registers**: Stores the memory address of the current JVM bytecode instruction being executed.
    - **Native Method Stack**: Holds execution frames for native C/C++ methods called via JNI.`,
    importantDifferences: `| Runtime Data Area | Per-Thread or Shared? | What It Stores | Error Thrown on Exhaustion |
|---|---|---|---|
| **Metaspace** | Shared across JVM | Class metadata, static fields, method bytecode | \`java.lang.OutOfMemoryError: Metaspace\` |
| **Heap Memory** | Shared across JVM | All objects, arrays, String Constant Pool | \`java.lang.OutOfMemoryError: Java heap space\` |
| **Stack Memory** | Per-Thread | Stack frames, local variables, partial results | \`java.lang.StackOverflowError\` |
| **PC Register** | Per-Thread | Address of current bytecode instruction | None (fixed pointer size) |
| **Native Stack** | Per-Thread | Native C/C++ method frames and pointers | \`java.lang.StackOverflowError\` |`,
    javaCodeExamples: `public class MemoryOverviewDemo {
    // Stored in Metaspace (static field reference points to Heap object)
    private static final String APP_NAME = "InterviewPocket";

    // Stored in Heap Memory (as part of MemoryOverviewDemo instance)
    private int counter = 100;

    public void executeProcess() {
        // Stored in Stack Frame (local primitive and local reference)
        int localVal = 50;
        String localMsg = "Execution underway";

        System.out.println(APP_NAME + " : " + (counter + localVal));
    }

    public static void main(String[] args) {
        MemoryOverviewDemo demo = new MemoryOverviewDemo(); // 'demo' reference on Stack, Object on Heap
        demo.executeProcess();
    }
}`,
    outputExplanation: `- Illustrates how static metadata is placed in Metaspace, instance objects live in Heap, and local method variables execute in Stack frames.`,
    interviewReadyAnswer: `- "The JVM runtime data areas consist of 5 memory regions: Heap and Metaspace are shared across all threads, while Stack memory, PC Registers, and Native Method Stacks are thread-local."
- "The Execution Engine is an operational subsystem comprising the Interpreter, JIT, and GC—it is distinct from the memory data areas."`,
    quickRevisionPoints: `- 5 Runtime Data Areas: Metaspace, Heap, Stack, PC Register, Native Stack.
- Shared areas: Heap and Metaspace.
- Thread-private areas: Stack, PC Register, Native Method Stack.
- Execution Engine is an execution engine, not a memory area.`
  },
  {
    topicId: 110,
    slug: 'method-area-metaspace',
    title: 'Method Area & Metaspace',
    definition: `- **Method Area (JVM Specification)**: A logical runtime data area shared among all JVM threads that stores class structures, runtime constant pool, field and method data, and code for methods and constructors.
- **Metaspace (Java 8+ HotSpot Implementation)**: The modern replacement for the legacy **Permanent Generation (PermGen)**. Metaspace stores class metadata directly in **native off-heap OS memory**, not inside the contiguous JVM heap space.`,
    simpleExplanation: `- Before Java 8 (PermGen), the JVM forced class metadata into a fixed-size pen inside the heap. If you loaded too many classes (e.g. in Spring or Tomcat), the pen overflowed with \`java.lang.OutOfMemoryError: PermGen space\`.
- In Java 8+, Metaspace borrows RAM directly from the operating system, growing dynamically as needed.`,
    importantDifferences: `| Dimension | PermGen (Java 7 and earlier) | Metaspace (Java 8 and newer) |
|---|---|---|
| **Memory Location** | Contiguous section of JVM Heap memory | Native OS memory (Off-Heap) |
| **Default Sizing** | Fixed default size (~64MB-128MB) | Auto-expands dynamically up to available OS RAM |
| **Tuning Flags** | \`-XX:PermSize\` & \`-XX:MaxPermSize\` | \`-XX:MetaspaceSize\` & \`-XX:MaxMetaspaceSize\` |
| **String Constant Pool** | Housed inside PermGen (moved to Heap in Java 7) | Housed in JVM Heap (NOT in Metaspace) |
| **OutOfMemoryError** | \`OutOfMemoryError: PermGen space\` | \`OutOfMemoryError: Metaspace\` |`,
    importantConcepts: `- **What Exactly Lives in Metaspace**:
  1. Class metadata (name, superclass, interfaces, bytecode instructions).
  2. Method data (bytecode, access flags, exception tables).
  3. Runtime constant pool (references to symbolic constants).
  4. Static fields (note: the reference variable resides here, but object instances it points to live in the Heap).
- **String Constant Pool Location**: Moved out of PermGen into JVM Heap in Java 7 to allow standard Garbage Collection. It remains in Heap in Java 8+.`,
    javaCodeExamples: `public class MetaspaceConceptDemo {
    // Static primitive: value stored in class metadata
    public static final int CONSTANT_CODE = 404;

    // Static reference: reference pointer in Metaspace, "SystemConfig" instance on Heap
    public static final String CONFIG_KEY = "PROD_ENVIRONMENT";

    public static void main(String[] args) {
        System.out.println("Config: " + CONFIG_KEY + ", Code: " + CONSTANT_CODE);
        // Checking runtime memory properties
        long totalMemory = Runtime.getRuntime().totalMemory();
        System.out.println("Heap Total: " + (totalMemory / (1024 * 1024)) + " MB");
    }
}`,
    outputExplanation: `- Demonstrates static fields anchored in class metadata while dynamically referenced objects live on the Heap.`,
    interviewReadyAnswer: `- "Metaspace is the Java 8+ implementation of the JVM Method Area, storing class metadata, bytecode, and static variables in native memory rather than in the heap like PermGen."
- "By default, Metaspace dynamically resizes with available OS RAM, reducing OutOfMemoryError crashes."`,
    quickRevisionPoints: `- Replaced PermGen in Java 8.
- Resides in native operating system memory (off-heap).
- String Constant Pool is in Heap, NOT in Metaspace.
- Configured via \`-XX:MetaspaceSize\` and \`-XX:MaxMetaspaceSize\`.`
  },
  {
    topicId: 111,
    slug: 'heap-memory-generations',
    title: 'Heap Memory (Young Generation, Old Generation, Eden, Survivor)',
    definition: `- **Heap Memory**: The runtime data area created at JVM launch where memory for all class instances (objects) and arrays is allocated.
- **Generational Garbage Collection Hypothesis**: The observation that the vast majority of objects die shortly after creation (high infant mortality).
- **Heap Divisions**:
  1. **Young Generation**:
     • **Eden Space**: Newly allocated objects start here.
     • **Survivor Spaces (S0 / From, S1 / To)**: Objects that survive Minor GCs are copied here.
  2. **Old Generation (Tenured Generation)**: Long-lived objects that survive multiple GC cycles (e.g., threshold age 15) are promoted here.`,
    simpleExplanation: `- **The Corporate Office Analogy**:
  • **Eden**: The open lobby where new interns arrive daily. Most leave after one task (collected immediately).
  • **Survivor Spaces (S0/S1)**: The probation cubicles. Interns who survive their first review move between S0 and S1 while proving their worth.
  • **Old Generation**: The permanent executive floor. Employees who survive 15 probation cycles get tenured desks and are cleaned out only during company-wide Major GCs.`,
    howItWorks: `- **1. Allocation**: New objects are allocated in Eden space.
- **2. Minor GC**: When Eden fills up, a Minor GC triggers:
  • Live objects in Eden and active Survivor (e.g. S0) are copied to the empty Survivor space (S1).
  • Age counter of surviving objects is incremented by 1.
  • Eden and S0 are wiped clean. Roles of S0 and S1 swap.
- **3. Promotion / Tenuring**: When an object survives past the tenuring threshold (default: \`-XX:MaxTenuringThreshold=15\`), it is promoted to Old Generation.
- **4. Major / Full GC**: When Old Generation fills up, a Major/Full GC cleans dead long-lived objects.`,
    syntax: `// Common JVM Heap tuning flags
-Xms2g       // Initial Heap size (2 GB)
-Xmx8g       // Maximum Heap size (8 GB)
-XX:NewRatio=2 // Ratio between Old and Young generation (2:1)`,
    javaCodeExamples: `public class HeapGenerationDemo {
    public static void main(String[] args) {
        // High-volume short-lived objects: allocated in Eden and cleared in Minor GC
        for (int i = 0; i < 100_000; i++) {
            String temp = new String("Transaction-" + i);
        }

        // Long-lived object: survives Minor GCs and gets promoted to Old Generation
        byte[] longLivedCache = new byte[10 * 1024 * 1024]; // 10MB byte array

        System.out.println("Heap allocation demonstration completed successfully.");
    }
}`,
    outputExplanation: `- Short-lived objects are rapidly collected in Eden without promoting them to Old Gen.
- The 10MB cache persists across collections and transitions to Tenured space.`,
    interviewReadyAnswer: `- "JVM Heap is divided into Young Generation (Eden, S0, S1) and Old Generation based on the weak generational hypothesis."
- "New objects enter Eden. Survivors of Minor GCs toggle between Survivor spaces until reaching the tenuring threshold (typically 15), where they are promoted to Old Generation."`,
    quickRevisionPoints: `- Young Generation: Eden + Survivor spaces (S0 and S1).
- Minor GC cleans Young Generation; Major/Full GC cleans Old Generation.
- Default promotion threshold is 15 GC cycles.
- Tuning flags: \`-Xms\` (initial heap), \`-Xmx\` (maximum heap).`
  },
  {
    topicId: 112,
    slug: 'stack-memory-stack-frames',
    title: 'Stack Memory & Stack Frames Structure',
    definition: `- **Stack Memory**: A thread-private runtime data area created simultaneously with each Java thread. It operates on a **Last-In, First-Out (LIFO)** basis to manage method invocations.
- **Stack Frame**: A discrete data structure pushed onto the thread's stack whenever a method is invoked and popped off when the method completes (either via \`return\` or thrown exception).`,
    simpleExplanation: `- **A Stack of Dinner Plates**: Each time a method is called, a new plate (frame) is placed on top of the stack. You can only work on the top plate. When the method finishes, you remove that plate. If a method calls itself infinitely, the stack grows until it hits the ceiling and crashes with a \`StackOverflowError\`.`,
    importantConcepts: `- **Components of a Stack Frame**:
  1. **Local Variable Table (LVT)**: Array storing method parameters and local variables.
     • Primitives (\`int\`, \`boolean\`, etc.) are stored by value directly.
     • Objects are represented as 4-byte or 8-byte reference pointers to memory on the Heap.
     • \`long\` and \`double\` consume 2 consecutive slots in the LVT.
  2. **Operand Stack**: Pushdown stack used by JVM bytecode instructions to evaluate expressions, perform arithmetic, and pass method arguments.
  3. **Frame Data / Constant Pool Reference**: Holds references to the Runtime Constant Pool to resolve symbolic references dynamically and manages method return and exception dispatch tables.`,
    javaCodeExamples: `public class StackFrameDemo {
    public static int calculate(int a, int b) {
        // Pushes frame 'calculate' on top of 'main'
        // Local variables a, b, result stored in calculate's LVT
        int result = a * b;
        return result; // Frame popped off, return value delivered to caller
    }

    public static void main(String[] args) {
        // Frame 'main' pushed onto main thread's Stack
        int x = 10;
        int y = 20;
        int sum = calculate(x, y);
        System.out.println("Result: " + sum);
    }
}`,
    outputExplanation: `- Method calls push frames; method completions pop frames. Memory deallocation is instant without any Garbage Collector intervention.`,
    commonMistakes: `- Believing objects live on the Stack: only primitive values and object references live on the Stack; the actual objects always live on the Heap (unless optimized by Escape Analysis in modern JIT).`,
    interviewReadyAnswer: `- "Each Java thread has its own private Stack. Each method call pushes a Stack Frame containing a Local Variable Table, an Operand Stack, and Frame Data."
- "When the method terminates, its frame is immediately popped off. Excessive recursion causes StackOverflowError."`,
    quickRevisionPoints: `- Thread-local; managed LIFO.
- Frame components: Local Variable Table, Operand Stack, Frame Data.
- Primitives stored by value; objects stored as Heap reference pointers.
- Deallocation is instantaneous upon method return.`
  },
  {
    topicId: 113,
    slug: 'pc-registers-in-jvm',
    title: 'Program Counter (PC) Registers',
    definition: `- **Program Counter (PC) Register**: A thread-private runtime data area that holds the memory address of the JVM bytecode instruction currently being executed by that thread.
- **Thread Multiplicity**: Each Java thread has its own dedicated PC Register created when the thread is spawned.`,
    simpleExplanation: `- **The Bookmark in a Book**: When multiple people read different chapters of a book simultaneously, each reader needs their own physical bookmark to remember their current page. When context switching pauses a thread, its PC Register saves the exact instruction address so execution resumes without missing a beat.`,
    howItWorks: `- If the thread is executing a **Java method**:
  • The PC Register stores the native instruction pointer or offset of the current bytecode instruction.
- If the thread is executing a **Native Method (C/C++ via JNI)**:
  • The value of the PC Register is **undefined (null)** because native execution is managed directly by the underlying CPU program counter.
- **Memory Overhead**: Negligible; just one machine word size per thread. It never throws \`OutOfMemoryError\`.`,
    javaCodeExamples: `public class PCRegisterContextDemo {
    public static void main(String[] args) {
        Runnable task = () -> {
            for (int i = 1; i <= 3; i++) {
                // At every bytecode step, this thread's private PC register
                // tracks the active instruction offset
                System.out.println(Thread.currentThread().getName() + " -> Step: " + i);
                try {
                    Thread.sleep(50); // Context switch occurs; PC saves instruction state
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        };

        Thread t1 = new Thread(task, "Worker-1");
        Thread t2 = new Thread(task, "Worker-2");

        t1.start();
        t2.start();
    }
}`,
    outputExplanation: `- Both threads interleave during CPU time-slicing. Each thread's PC Register preserves its instruction offset across pauses.`,
    interviewReadyAnswer: `- "The PC Register is a thread-local JVM register holding the address of the bytecode instruction currently being executed by that thread."
- "It is essential for thread scheduling and context switching. For native methods, its value is undefined."`,
    quickRevisionPoints: `- Dedicated per thread (thread-safe).
- Points to the currently executing bytecode instruction.
- Value is undefined when executing native methods.
- Cannot throw \`OutOfMemoryError\`.`
  },
  {
    topicId: 114,
    slug: 'native-method-stack-jni',
    title: 'Native Method Stack & JNI',
    definition: `- **Native Method Stack (C Stack)**: A per-thread memory area dedicated to supporting the execution of native methods (methods written in non-Java languages like C, C++, or Assembly).
- **Java Native Interface (JNI)**: The programming framework that enables Java code running in the JVM to call and be called by native applications and operating system libraries.`,
    simpleExplanation: `- Imagine a foreign embassy in another country. Inside the embassy, everyone speaks Java. When you need to interact with the local host government's native legal system (Operating System), you send an ambassador (JNI) who speaks the native language (C/C++). The ambassador's private workspace is the Native Method Stack.`,
    whyNeeded: `- **Hardware Access**: Directly interacting with specific hardware peripherals, GPU acceleration, or low-level OS system calls.
- **Legacy Systems**: Reusing battle-tested legacy libraries written in C or C++.
- **Performance**: Executing computationally intense graphics or mathematical routines in compiled native machine code.`,
    importantConcepts: `- **Behavior & Limits**:
  • Created per thread alongside the JVM Stack.
  • Can throw \`StackOverflowError\` if native stack size limit is exceeded.
  • Can throw \`OutOfMemoryError\` if host OS runs out of native memory to allocate a new native stack frame.
  • Configured on many JVMs via \`-Xoss\` flag.`,
    javaCodeExamples: `public class NativeDemo {
    // Declared with the 'native' keyword (no method body)
    public native void invokeNativeHardwareCall();

    // In practical Java, System.currentTimeMillis() relies on native calls:
    public static void main(String[] args) {
        // System.currentTimeMillis() internally delegates to JVM_CurrentTimeMillis in C++
        long start = System.currentTimeMillis();
        System.out.println("Current epoch timestamp from native OS clock: " + start);
    }
}`,
    outputExplanation: `- Demonstrates how native methods bridge Java code with host OS kernel primitives.`,
    interviewReadyAnswer: `- "The Native Method Stack is a thread-local memory region supporting execution of native methods written in languages like C/C++ called via JNI."
- "It handles OS-level invocations and hardware integration, and can throw StackOverflowError or OutOfMemoryError if memory limits are exceeded."`,
    quickRevisionPoints: `- Dedicated per thread for native (C/C++) methods.
- Interacts through the Java Native Interface (JNI).
- Common example: \`System.currentTimeMillis()\` and \`Thread.sleep()\`.
- Operates in native memory managed by the OS.`
  },
  {
    topicId: 115,
    slug: 'jvm-execution-engine-jit',
    title: 'JVM Execution Engine (Interpreter, JIT Compiler, Garbage Collector)',
    definition: `- **Execution Engine**: The central operational subsystem of the JVM responsible for reading bytecode from the runtime data areas and executing it on the underlying physical hardware.
- **Three Core Components**:
  1. **Bytecode Interpreter**: Reads and executes bytecode instructions sequentially line by line (fast startup, slower repeated execution).
  2. **Just-In-Time (JIT) Compiler**: Compiles frequently executed "hot" bytecode sections directly into native machine code at runtime (slower initial warmup, near-native execution speed).
  3. **Garbage Collector (GC)**: Automatically identifies and reclaims unreferenced Heap objects.`,
    simpleExplanation: `- **The Hybrid Translation Team**:
  • The **Interpreter** is a simultaneous translator reading a book sentence by sentence into a microphone. Fast to begin, but tedious if repeating the same poem 10,000 times.
  • The **JIT Compiler** spots that a specific poem is being repeated 10,000 times ("hot spot"), writes down a permanent local translation, and hands you the native text so you can read it instantly.`,
    howItWorks: `- **Tiered Compilation (HotSpot)**:
  1. Application launches using the **Interpreter** for instant startup.
  2. **HotSpot Profiler** tracks method invocation counters and loop backedge counters.
  3. When an invocation threshold is crossed, the **C1 Compiler (Client)** applies basic optimizations (inlining, devirtualization).
  4. If execution intensity continues, the **C2 Compiler (Server)** generates heavily optimized native machine code.
  5. The native instructions are cached in the **Code Cache** region of memory for direct execution.`,
    importantDifferences: `| Dimension | Interpreter | JIT Compiler |
|---|---|---|
| **Execution Style** | Translates instruction by instruction | Compiles whole code blocks into native machine binary |
| **Startup Speed** | Instant startup | Requires warmup period to detect hotspots |
| **Execution Speed** | Slower for repetitive execution | Extremely fast (near native C/C++ performance) |
| **Memory Footprint** | Low memory overhead | Uses Code Cache memory to store compiled machine code |`,
    javaCodeExamples: `public class ExecutionEngineDemo {
    public static void main(String[] args) {
        long start = System.nanoTime();

        long sum = 0;
        // Hotspot loop: Initially interpreted, then JIT-compiled to native CPU instructions
        for (int i = 0; i < 10_000_000; i++) {
            sum += compute(i);
        }

        long durationMs = (System.nanoTime() - start) / 1_000_000;
        System.out.println("Execution finished in: " + durationMs + " ms. Sum: " + sum);
    }

    private static int compute(int x) {
        return (x * 3) ^ (x >> 2);
    }
}`,
    outputExplanation: `- The loop is identified by the HotSpot profiler as a hotspot and compiled to native machine instructions, completing 10M iterations in milliseconds.`,
    interviewReadyAnswer: `- "The JVM Execution Engine executes bytecode using an Interpreter for fast startup and a JIT Compiler that converts frequently executed hotspot code into native machine code."
- "HotSpot uses tiered compilation (C1 and C2 compilers) to balance quick startup with maximum steady-state throughput."`,
    quickRevisionPoints: `- Execution Engine is an operational subsystem, NOT a memory area.
- 3 Components: Interpreter, JIT Compiler, and Garbage Collector.
- Interpreter provides immediate startup; JIT provides peak throughput.
- JIT caches native machine instructions in the Code Cache.`
  },
  {
    topicId: 116,
    slug: 'stack-vs-heap-memory-differences',
    title: 'Stack Memory vs Heap Memory (Key Differences)',
    definition: `- **Stack vs Heap**: The two primary memory regions involved in day-to-day Java program execution:
  • **Stack Memory**: Thread-local memory holding method call frames, primitive local variables, and object reference pointers.
  • **Heap Memory**: JVM-wide shared memory holding all instantiated objects, arrays, and instance fields.`,
    importantDifferences: `| Dimension | Stack Memory | Heap Memory |
|---|---|---|
| **Scope & Access** | Private to each thread | Shared globally across all threads in the JVM |
| **What It Stores** | Primitive local variables and object reference variables | All objects, arrays, and instance variables |
| **Allocation Mechanism** | LIFO order; automatic when method is called | Dynamic allocation at runtime via \`new\` keyword |
| **Deallocation** | Instantaneous when method execution ends | Asynchronous by the Garbage Collector |
| **Size & Limits** | Small fixed size (default ~1MB per thread, via \`-Xss\`) | Large dynamic size (configured via \`-Xms\` and \`-Xmx\`) |
| **Access Speed** | Extremely fast (CPU stack pointer movement) | Slower (pointer dereferencing, cache misses) |
| **Failure Error** | \`java.lang.StackOverflowError\` | \`java.lang.OutOfMemoryError: Java heap space\` |`,
    javaCodeExamples: `public class StackVsHeapDemo {
    public static void main(String[] args) {
        // 'age' is a primitive local variable -> Stored on Stack
        int age = 25;

        // 'name' is a reference variable -> Stored on Stack
        // "InterviewPocket" String object -> Stored on Heap (String Constant Pool)
        String name = new String("InterviewPocket");

        // 'person' reference -> Stored on Stack
        // Person instance -> Stored on Heap
        Person person = new Person(name, age);

        System.out.println("Created person: " + person.getName());
    }
}

class Person {
    private String name; // Instance field reference -> Stored on Heap
    private int age;     // Instance primitive field -> Stored on Heap

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() { return name; }
}`,
    outputExplanation: `- Illustrates that local variables live on the Stack, while all objects and their internal instance fields reside on the Heap.`,
    interviewReadyAnswer: `- "Stack memory is thread-private, fast, small, and stores method frames and local variables using LIFO deallocation."
- "Heap memory is globally shared, large, stores all instantiated objects, and relies on the Garbage Collector for deallocation."`,
    quickRevisionPoints: `- Stack is thread-local; Heap is shared across threads.
- Stack stores method frames & local variables; Heap stores all objects.
- Stack deallocation is instant (LIFO); Heap deallocation requires GC.
- Stack errors: \`StackOverflowError\`; Heap errors: \`OutOfMemoryError\`.`
  }
];

