
UPDATE interview_questions SET
  simple_answer = '- **High-Level Definition**: Java is a class-based, object-oriented language that compiles to platform-neutral bytecode.
- **Runtime Execution**: Executes on the Java Virtual Machine (JVM), enabling "Write Once, Run Anywhere" (WORA).
- **Core Attributes**: Inherently secure, robust, multithreaded, and garbage-collected.',
  detailed_explanation = '- **The 12 Java Buzzwords**:
  • **Simple**: Clean syntax derived from C++ without dangerous pointers or operator overloading.
  • **Object-Oriented**: Everything is modeled as classes and objects adhering to OOP principles.
  • **Platform-Independent**: Bytecode (.class) runs identically across Windows, Linux, and macOS.
  • **Robust**: Strong type checking, explicit exception handling, and automatic garbage collection.
  • **Secure**: ClassLoader sandboxing and Bytecode Verifier protect runtime integrity.
  • **Architecture-Neutral**: Primitive sizes and data representations are fixed across all CPU architectures.
- **Key Architectural Decoupling**: javac compiles source to bytecode; the target JVM translates bytecode to native machine code.',
  interview_answer = '- "Java is a high-level, class-based, object-oriented programming language designed around the WORA philosophy."
- "Source code is compiled into platform-neutral bytecode by javac, which the JVM executes via an interpreter and JIT compiler."
- "Key advantages include automatic memory management via garbage collection, strong type safety, and built-in multithreading primitives."'
WHERE id = 4;

UPDATE interview_questions SET
  simple_answer = '- **Source to Bytecode**: The `javac` compiler compiles `.java` source files into `.class` files containing bytecode.
- **Target-Specific JVM**: While bytecode is 100% platform-independent, the JVM itself is platform-specific (installed per OS).
- **Execution Translation**: The JVM interprets or JIT-compiles bytecode into native CPU assembly at runtime.',
  detailed_explanation = '- **Step-by-Step Architecture**:
  • 1. **Compilation**: Developer writes `App.java`; `javac App.java` creates `App.class` with bytecode.
  • 2. **Verification**: JVM Bytecode Verifier checks for buffer overflows and illegal stack operations.
  • 3. **Execution**: JIT compiler dynamically converts hot bytecode sequences directly into CPU instructions.
- **Why C/C++ is not platform independent**: C/C++ compilers compile directly to target-specific machine code, requiring recompilation for every OS.',
  interview_answer = '- "Java achieves platform independence by introducing an abstraction layer: bytecode."
- "The compiler produces intermediate bytecode rather than native machine code."
- "Any operating system with an installed JVM can execute this bytecode without modifying or recompiling the original source code."'
WHERE id = 5;

UPDATE interview_questions SET
  simple_answer = '- **Primitive Types**: Java retains 8 primitive types (`int`, `char`, `boolean`, `double`, etc.) that are NOT objects.
- **Direct Value Storage**: Primitives hold raw binary values directly on the stack for performance, without object overhead.
- **Wrapper Workaround**: Wrapper classes (`Integer`, `Double`) exist to bridge primitives into the object world when needed (e.g. Collections).',
  detailed_explanation = '- **Criteria for a 100% Pure OOP Language**:
  • 1. Every variable must be an object.
  • 2. Every operation must be a message passed to an object (method invocation).
  • 3. Predefined types must be classes.
- **Why Java Retained Primitives**:
  • Allocation efficiency: An `int` requires exactly 4 bytes with zero heap header overhead.
  • Arithmetic throughput: CPU math instructions operate directly on registers without pointer dereferencing.',
  interview_answer = '- "Java is not 100% pure object-oriented because it retains 8 primitive data types for computational performance."
- "In a pure OOP language like Smalltalk, everything is an object; in Java, primitives bypass object headers and heap allocation."'
WHERE id = 6;
