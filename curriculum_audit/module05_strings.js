// Module 5: Strings – Complete Concepts (Topics 72-78)

module.exports = [
  {
    topicId: 72,
    slug: 'strings-immutability',
    title: 'Introduction to Strings & String Immutability',
    definition: `- **Definition**: A **String** in Java is an object that represents a sequence of characters. It is backed internally by a byte array (\`byte[]\` with compact strings encoding in modern Java) and is strictly **Immutable**.
- **Immutability Defined**: Once a \`String\` object is created on the Heap, its internal character state **cannot be changed**. Any operation that appears to modify a String (e.g. \`concat()\`, \`toUpperCase()\`) actually instantiates and returns a brand **new String object**.`,
    simpleExplanation: `- **The Inscribed Stone Tablet Analogy**: Think of a String like words carved into a granite stone tablet. You cannot edit the carving. If you want to change "Java" to "Java 21", you must carve an entirely new granite tablet and set your hands on the new one.`,
    whyNeeded: `- **Why Did Java Designers Make String Immutable?**:
  • **1. String Constant Pool (SCP) Sharing**: If strings were mutable, changing a string through one reference would corrupt the value for all other references pointing to that shared literal!
  • **2. Security**: Strings are used for sensitive system parameters (database connection URLs, file paths, network sockets, usernames, passwords). If mutable, a malicious thread could alter a verified file path between authorization and execution.
  • **3. Thread Safety**: Because immutable objects cannot change their state, String instances are inherently thread-safe and can be shared across multiple threads without synchronization locks.
  • **4. HashCode Caching**: A string's \`hashCode()\` is computed once and cached (\`hash\` field). This makes String the ideal key for \`HashMap\` and \`HashSet\` lookups in constant O(1) time.`,
    howItWorks: `- When you execute:
  \`String s = "Hello";\`
  \`s = s.concat(" World");\`
  • The original \`"Hello"\` object remains unchanged in memory.
  • A new object \`"Hello World"\` is created in the Heap.
  • The variable \`s\` stops pointing to \`"Hello"\` and now points to \`"Hello World"\`.
  • If no other reference points to \`"Hello"\`, it becomes eligible for garbage collection.`,
    javaCodeExamples: `public class StringImmutabilityDemo {
    public static void main(String[] args) {
        String original = "Interview";
        // concat() returns a new object, leaving 'original' unchanged
        original.concat("Pocket");

        System.out.println("Original String after concat: " + original); // Still "Interview"

        // To reflect change, reference must explicitly reassign
        original = original.concat("Pocket");
        System.out.println("Reassigned Reference: " + original); // "InterviewPocket"
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Original String after concat: Interview
  Reassigned Reference: InterviewPocket
  \`\`\`
- Proves that \`original.concat("Pocket")\` had zero effect on the original string because String is immutable.`,
    commonMistakes: `- Believing calling methods like \`trim()\` or \`replace()\` modifies the string in place.
- Using \`String\` concatenation (\`+\`) inside a large loop (creates thousands of temporary garbage objects). Use \`StringBuilder\` instead!`,
    trickyInterviewConcepts: `- **Can we make String mutable using Reflection?** Yes, by accessing the private \`value\` field using reflection, but this violates JVM safety, causes security manager exceptions, and breaks HashMaps relying on cached hash codes.`,
    interviewReadyAnswer: `- "Strings in Java are immutable objects representing character sequences. Once instantiated, their internal character data cannot be modified."
- "Immutability enables the String Constant Pool for memory optimization, ensures thread safety without synchronization, guarantees security for network/database credentials, and allows caching of the string's hashcode for high-performance HashMap operations."`,
    quickRevisionPoints: `- Strings are immutable (cannot be altered after creation).
- Operations return a new String object.
- Enables: SCP, Security, Thread Safety, HashCode Caching.
- Loops should use \`StringBuilder\` to prevent object churn.`
  },
  {
    topicId: 73,
    slug: 'string-constant-pool-heap',
    title: 'String Constant Pool (SCP) & Heap Allocation',
    definition: `- **Definition**: The **String Constant Pool (SCP)** is a specialized memory cache within the **JVM Heap** where the JVM stores a single copy of each unique string literal.
- **Relocation History**: Prior to Java 7, SCP was located in the **PermGen (Permanent Generation)** space. Since Java 7, SCP was relocated directly to the **main JVM Heap** so that unused string literals can be reclaimed by standard Garbage Collection.`,
    simpleExplanation: `- **The Community Library Book Analogy**: Instead of every student buying their own identical copy of the textbook, the university library holds one copy on the shared shelf (SCP). When multiple students ask for "Java Basics", they all point to that single shared textbook.`,
    importantConcepts: `- **Literal vs \`new String()\` Creation**:
  • **String Literal**: \`String s1 = "Java";\`
    - JVM checks SCP. If \`"Java"\` already exists, it returns the pooled reference. If not, it creates it in SCP.
    - Creates **0 or 1 object**.
  • **\`new String()\`**: \`String s2 = new String("Java");\`
    - ALWAYS allocates a **new object in the Heap outside the SCP**, and also ensures the literal is present in SCP.
    - Creates **1 or 2 objects**.
- **\`==\` vs \`equals()\`**:
  • \`==\`: Checks **reference equality** (memory address).
  • \`equals()\`: Checks **content / value equality** (character-by-character).
- **The \`intern()\` Method**:
  • Calling \`s.intern()\` searches the SCP. If the string exists in SCP, it returns the pooled reference. If not, it puts the string in SCP and returns the reference.`,
    javaCodeExamples: `public class StringPoolDemo {
    public static void main(String[] args) {
        // Literals point to the exact same pooled object in SCP
        String s1 = "Hello";
        String s2 = "Hello";

        // 'new' explicitly creates a new object in general Heap
        String s3 = new String("Hello");

        // Reference comparison (==)
        System.out.println("s1 == s2 (Both in SCP): " + (s1 == s2)); // true
        System.out.println("s1 == s3 (SCP vs Heap): " + (s1 == s3)); // false

        // Content comparison (equals)
        System.out.println("s1.equals(s3) (Content): " + s1.equals(s3)); // true

        // Using intern()
        String s4 = s3.intern();
        System.out.println("s1 == s4 (After intern): " + (s1 == s4)); // true
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  s1 == s2 (Both in SCP): true
  s1 == s3 (SCP vs Heap): false
  s1.equals(s3) (Content): true
  s1 == s4 (After intern): true
  \`\`\`
- Illustrates how \`intern()\` returns the canonical reference from the String Constant Pool.`,
    trickyInterviewConcepts: `- **How many objects are created by: \`String s = new String("Hello");\`?**
  • Two objects: One in the String Constant Pool (if not already present), and one in the general JVM Heap.`,
    interviewReadyAnswer: `- "The String Constant Pool is a memory caching area in the JVM Heap designed to optimize memory by sharing immutable string literals."
- "Literals reuse existing pool instances, whereas new String() always forces a new heap allocation. Comparing strings must always use .equals() for content verification, as == checks reference identity."`,
    quickRevisionPoints: `- SCP is inside JVM Heap (moved from PermGen in Java 7).
- Literals share references in SCP.
- \`new String()\` creates object outside SCP on Heap.
- Always compare strings with \`.equals()\`, never \`==\`.
- \`intern()\` fetches pooled canonical reference.`
  },
  {
    topicId: 74,
    slug: 'string-class-methods',
    title: 'Essential String Class Methods & Manipulation',
    definition: `- **Definition**: The \`java.lang.String\` class provides rich built-in utility methods for inspection, comparison, searching, extraction, and transformation of character sequences.`,
    importantConcepts: `- **Essential String Methods**:
  • \`length()\`: Returns number of characters (UTF-16 code units).
  • \`charAt(index)\`: Returns character at specified 0-based index.
  • \`substring(beginIndex, endIndex)\`: Extracts sub-string from \`beginIndex\` (inclusive) to \`endIndex\` (exclusive).
  • \`indexOf(str)\` / \`lastIndexOf(str)\`: Returns index of first/last occurrence, or \`-1\` if not found.
  • \`contains(CharSequence)\`: Returns \`true\` if sequence exists.
  • \`equals(str)\` / \`equalsIgnoreCase(str)\`: Content comparison.
  • \`compareTo(str)\`: Lexicographical comparison (returns 0, positive, or negative).
  • \`toUpperCase()\` / \`toLowerCase()\`: Returns converted copy.
  • \`trim()\` / \`strip()\` (Java 11+): Removes leading and trailing whitespace.
  • \`replace(oldChar, newChar)\`: Replaces occurrences.
  • \`split(regex)\`: Splits string into an array based on regex delimiter.
  • \`isEmpty()\` (length == 0) / \`isBlank()\` (Java 11+, checks if empty or all whitespace).`,
    javaCodeExamples: `public class StringMethodsDemo {
    public static void main(String[] args) {
        String text = "  InterviewPocket Core Java  ";

        // Trimming whitespace
        String clean = text.trim();
        System.out.println("Cleaned: '" + clean + "'");

        // Substring & character inspection
        System.out.println("Length: " + clean.length());
        System.out.println("Char at index 0: " + clean.charAt(0));
        System.out.println("Substring (0 to 15): " + clean.substring(0, 15));

        // Searching & Replacing
        System.out.println("Contains 'Core'? " + clean.contains("Core"));
        String replaced = clean.replace("Core", "Advanced");
        System.out.println("Replaced: " + replaced);

        // Splitting by spaces
        String[] words = clean.split(" ");
        System.out.println("Word count: " + words.length);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Cleaned: 'InterviewPocket Core Java'
  Length: 25
  Char at index 0: I
  Substring (0 to 15): InterviewPocket
  Contains 'Core'? true
  Replaced: InterviewPocket Advanced Java
  Word count: 3
  \`\`\``,
    commonMistakes: `- Confusing \`isEmpty()\` with \`isBlank()\`:
  \`"   ".isEmpty()\` returns \`false\` (length is 3), while \`"   ".isBlank()\` returns \`true\` (all whitespace).`,
    interviewReadyAnswer: `- "The String class provides methods for searching (indexOf, contains), extraction (substring, charAt), transformation (replace, toLowerCase, trim/strip), and inspection (length, isBlank)."
- "Because strings are immutable, transformation methods return newly allocated String objects."`,
    quickRevisionPoints: `- \`length()\` is a method on String (not a field like in arrays).
- \`substring(start, end)\`: end index is exclusive.
- \`strip()\` (Java 11) is Unicode-aware, preferred over \`trim()\`.
- \`split(regex)\`: uses regex delimiter.`
  },
  {
    topicId: 75,
    slug: 'stringbuffer-class',
    title: 'StringBuffer Class & Mutable Strings',
    definition: `- **Definition**: **\`java.lang.StringBuffer\`** is a peer class of \`String\` that represents a **mutable**, **thread-safe** sequence of characters.
- **Key Characteristics**:
  • Mutable: Its character sequence and capacity can be modified in-place without creating new objects.
  • Thread-Safe: All public methods are synchronized with \`synchronized\` keyword.`,
    simpleExplanation: `- **The Whiteboard Analogy**: A \`String\` is a printed sheet of paper; to change a word, you throw it away and print a new sheet. A \`StringBuffer\` is an erasable whiteboard with an armed guard standing by (synchronization). You erase and rewrite letters on the same board, and only one person can touch the board at a time.`,
    importantConcepts: `- **Thread Safety Overhead**:
  • Methods like \`append()\`, \`insert()\`, \`delete()\`, and \`reverse()\` are \`synchronized\`.
  • Guarantees thread safety across concurrent threads, but incurs locking overhead in single-threaded execution.
- **Dynamic Capacity Growth**:
  • Initial default capacity is **16 characters** plus length of string.
  • When capacity is exceeded, it grows automatically: \`newCapacity = (oldCapacity * 2) + 2\`.`,
    javaCodeExamples: `public class StringBufferDemo {
    public static void main(String[] args) {
        // Initializing StringBuffer with initial content
        StringBuffer sb = new StringBuffer("Interview");

        // Mutating in-place using append()
        sb.append("Pocket");
        System.out.println("After append: " + sb); // InterviewPocket

        // Inserting text at index
        sb.insert(9, " Core ");
        System.out.println("After insert: " + sb); // Interview Core Pocket

        // Reversing character sequence in-place
        sb.reverse();
        System.out.println("After reverse: " + sb);
    }
}`,
    outputExplanation: `- Demonstrates in-place modification of character sequence without creating intermediate Heap garbage objects.`,
    interviewReadyAnswer: `- "StringBuffer represents a mutable, thread-safe character sequence where all public methods are synchronized."
- "It is preferred over String when frequent modifications are made in multi-threaded environments, but has performance overhead compared to StringBuilder in single-threaded code."`,
    quickRevisionPoints: `- Mutable: Modifies in-place.
- Thread-safe: Methods are \`synchronized\`.
- Growth formula: \`(oldCapacity * 2) + 2\`.
- Slower than \`StringBuilder\` due to synchronization locks.`
  },
  {
    topicId: 76,
    slug: 'stringbuilder-class',
    title: 'StringBuilder Class & High-Performance Strings',
    definition: `- **Definition**: **\`java.lang.StringBuilder\`** (introduced in Java 5) is a **mutable**, **non-thread-safe** sequence of characters designed as a high-performance drop-in replacement for \`StringBuffer\` in single-threaded scenarios.
- **Primary Benefit**: Zero synchronization lock overhead, providing significantly higher throughput and speed.`,
    simpleExplanation: `- If \`StringBuffer\` is a whiteboard with a slow security guard locking the door for every visitor, \`StringBuilder\` is the exact same whiteboard without the guard. In single-threaded operations (which account for 99% of string construction), \`StringBuilder\` is drastically faster.`,
    javaCodeExamples: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();

        long startTime = System.nanoTime();
        for (int i = 0; i < 1000; i++) {
            sb.append("id=").append(i).append(";");
        }
        long duration = System.nanoTime() - startTime;

        System.out.println("Constructed string length: " + sb.length());
        System.out.println("Completed in: " + duration + " ns (High Performance)");
    }
}`,
    outputExplanation: `- Constructs a 1,000-element concatenated string in nanoseconds with zero synchronization lock contention.`,
    commonMistakes: `- Using \`StringBuilder\` across multiple threads without external synchronization, leading to race conditions and corrupted character arrays.`,
    interviewReadyAnswer: `- "StringBuilder is a mutable character sequence introduced in Java 5 to replace StringBuffer in single-threaded code."
- "Because its methods are not synchronized, it eliminates locking overhead, making it the fastest option for string manipulation, loops, and building dynamic SQL or JSON."`,
    quickRevisionPoints: `- Mutable & NOT thread-safe.
- Introduced in Java 5.
- Faster than \`StringBuffer\` (no synchronization).
- Standard choice for single-threaded string building.`
  },
  {
    topicId: 77,
    slug: 'string-vs-stringbuffer-vs-stringbuilder',
    title: 'String vs StringBuffer vs StringBuilder (Deep Comparison)',
    definition: `- **Comprehensive Architectural Comparison**: An essential Core Java interview comparison evaluating mutability, thread safety, memory allocation, and performance across Java's three string abstractions.`,
    importantDifferences: `| Evaluation Dimension | String | StringBuffer | StringBuilder |
|---|---|---|---|
| **Mutability** | **Immutable** (cannot be modified) | **Mutable** (modified in-place) | **Mutable** (modified in-place) |
| **Thread Safety** | **Thread-Safe** (due to immutability) | **Thread-Safe** (all methods synchronized) | **Not Thread-Safe** (no synchronization) |
| **Performance** | Slow for frequent modifications | Moderate (lock overhead) | **Fastest** (zero lock overhead) |
| **Memory Storage** | String Constant Pool & Heap | Heap only | Heap only |
| **Introduced In** | Java 1.0 | Java 1.0 | Java 5.0 |
| **Primary Use Case** | Fixed text, Map keys, entity fields | Multi-threaded shared text buffers | Loops, JSON/SQL dynamic query builders |`,
    javaCodeExamples: `public class StringComparisonBenchmarkDemo {
    public static void main(String[] args) {
        int iterations = 10000;

        // 1. String Concatenation (+) -> Creates thousands of Heap objects
        long start = System.currentTimeMillis();
        String str = "";
        for (int i = 0; i < iterations; i++) str += "A";
        long stringTime = System.currentTimeMillis() - start;

        // 2. StringBuilder -> Single mutable buffer
        start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) sb.append("A");
        long builderTime = System.currentTimeMillis() - start;

        System.out.println("String (+) time: " + stringTime + " ms");
        System.out.println("StringBuilder time: " + builderTime + " ms");
    }
}`,
    outputExplanation: `- Typically outputs:
  \`String (+) time: ~85 ms\`
  \`StringBuilder time: ~1 ms\`
- Demonstrates an ~85x speedup using \`StringBuilder\` by eliminating intermediate object allocations on the Heap.`,
    interviewReadyAnswer: `- "String is immutable and thread-safe, best for constants and Map keys. StringBuffer is mutable and thread-safe via synchronized methods, best for shared multi-threaded buffers."
- "StringBuilder is mutable and non-synchronized, offering the highest performance for loops, single-threaded operations, and dynamic string construction."`,
    quickRevisionPoints: `- String: Immutable, SCP, thread-safe.
- StringBuffer: Mutable, synchronized, thread-safe, slower.
- StringBuilder: Mutable, non-synchronized, fastest.
- Never use String \`+\` in loops; always use StringBuilder.`
  },
  {
    topicId: 78,
    slug: 'top-string-interview-programs',
    title: 'Top String Interview Coding Questions & Algorithms',
    definition: `- **Definition**: A curated collection of the most frequently asked String algorithmic interview problems, testing character array manipulation, two-pointer techniques, and frequency counting.`,
    importantConcepts: `- **Essential String Problem Patterns**:
  • **1. Palindrome Verification**: Checking if a string reads the same forwards and backwards using two pointers in O(n) time.
  • **2. Anagram Check**: Verifying if two strings contain the identical character frequencies using a fixed 256-element integer frequency array in O(n) time.
  • **3. String Reversal Without Built-in Methods**: Swapping characters in a \`char[]\` array using two pointers.
  • **4. First Non-Repeating Character**: Finding the first unique character using LinkedHashMap or count array.`,
    javaCodeExamples: `import java.util.Arrays;

public class TopStringAlgorithmsDemo {
    // 1. Palindrome Check using Two Pointers: O(n) time, O(1) space
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }

    // 2. Anagram Check using Frequency Array: O(n) time, O(1) auxiliary space
    public static boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int[] counts = new int[256];
        for (int i = 0; i < s1.length(); i++) {
            counts[s1.charAt(i)]++;
            counts[s2.charAt(i)]--;
        }
        for (int c : counts) {
            if (c != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("Is 'radar' palindrome? " + isPalindrome("radar")); // true
        System.out.println("Is 'silent' & 'listen' anagram? " + isAnagram("silent", "listen")); // true
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Is 'radar' palindrome? true
  Is 'silent' & 'listen' anagram? true
  \`\`\`
- Validates optimal algorithmic patterns with minimal time and space overhead.`,
    interviewReadyAnswer: `- "Key string interview problems rely on the two-pointer technique for palindromes and reversals in O(n) time and O(1) space, and integer frequency arrays (size 26 or 256) for anagrams and duplicate detection to avoid O(n log n) sorting."`,
    quickRevisionPoints: `- Palindrome: Two pointers converging from edges.
- Anagram: Count array of size 256; increment for s1, decrement for s2.
- In-place string reversal requires converting to \`char[]\` or using \`StringBuilder\`.`
  }
];

