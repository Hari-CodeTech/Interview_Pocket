// Module 13: Wrapper Classes, Autoboxing and Unboxing (Topics 131-135)

module.exports = [
  {
    topicId: 131,
    slug: 'wrapper-classes-role-need',
    title: 'Role and Need of Wrapper Classes in Java',
    definition: `- **Wrapper Class**: A class in \`java.lang\` that wraps (encapsulates) a primitive data type into an object representation.
- **The 8 Primitive Wrappers**: \`Byte\`, \`Short\`, \`Integer\`, \`Long\`, \`Float\`, \`Double\`, \`Character\`, \`Boolean\`.
- **Primary Need**: Primitives in Java are not objects (for raw performance), but many enterprise frameworks, data structures, and utilities require objects.`,
    simpleExplanation: `- **Gift Wrapping Analogy**: You have a raw coin (primitive). You cannot send raw loose coins through certain courier conveyor belts that only accept standard boxed parcels (Collections/Generics). So you place the coin inside a small labeled cardboard box (Wrapper Object).`,
    whyNeeded: `- **Java Collections Framework**: Data structures like \`ArrayList<E>\`, \`HashMap<K, V>\`, and \`HashSet<E>\` only store object references, not raw primitives (\`List<int>\` is illegal; must use \`List<Integer>\`).
- **Nullability Representation**: A primitive \`int\` defaults to 0, which cannot represent "no data". An \`Integer\` can be \`null\` (crucial for database columns and JSON APIs).
- **Rich Utility Methods**: Provides conversion, parsing (\`parseInt\`), min/max constants, and bit-manipulation functions.
- **Multithreading & Synchronization**: Object references can be used as thread synchronization monitors; primitives cannot.`,
    syntax: `// Creating wrapper objects
Integer obj1 = Integer.valueOf(100); // Recommended (uses caching)
Double obj2 = Double.valueOf(45.99);`,
    importantConcepts: `- **Immutability**: All 8 wrapper classes in Java are **\`final\` and immutable**! Once created, their wrapped value cannot be modified. Any arithmetic operation creates a brand-new object on the Heap.
- **Memory Footprint**: A primitive \`int\` consumes 4 bytes. An \`Integer\` object consumes 16 to 24 bytes on the Heap due to the 12/16-byte object header and alignment padding!`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.List;

public class WrapperNeedDemo {
    public static void main(String[] args) {
        // 1. Collections cannot store primitives
        // List<int> list = new ArrayList<>(); // COMPILE ERROR!
        List<Integer> list = new ArrayList<>();
        list.add(42); // Autoboxed from int to Integer

        // 2. Nullability representation for optional data
        Integer userScore = null; // Valid: indicates user hasn't played yet
        System.out.println("Has score? " + (userScore != null));

        // 3. Constants and utilities
        System.out.println("Max Integer: " + Integer.MAX_VALUE);
        System.out.println("Min Integer: " + Integer.MIN_VALUE);
    }
}`,
    outputExplanation: `- Illustrates that collections require wrapper classes and wrappers allow representing missing (null) values.`,
    interviewReadyAnswer: `- "Wrapper classes convert primitive data types into objects to support Collections, Generics, nullability representation, and utility conversions."
- "All 8 wrappers are final and immutable, but incur significant memory overhead compared to raw primitives."`,
    quickRevisionPoints: `- Wraps primitives into objects.
- Essential for Java Collections and Generics.
- All 8 wrapper classes are immutable and \`final\`.
- Supports nullability (unlike primitives with default 0/false).`
  },
  {
    topicId: 132,
    slug: 'primitive-wrapper-mapping',
    title: 'Primitive Types to Wrapper Classes Mapping',
    definition: `- **Primitive to Wrapper Mapping**: The 1-to-1 correspondence between Java's 8 primitive types and their respective wrapper classes in the \`java.lang\` package.
- **Type Hierarchy**: 6 numeric wrappers (\`Byte\`, \`Short\`, \`Integer\`, \`Long\`, \`Float\`, \`Double\`) inherit from the abstract class **\`java.lang.Number\`**. \`Character\` and \`Boolean\` inherit directly from **\`java.lang.Object\`**.`,
    importantDifferences: `| Primitive Type | Size | Wrapper Class | Direct Superclass | Default Primitive Value |
|---|---|---|---|---|
| \`byte\` | 1 byte (8 bits) | \`java.lang.Byte\` | \`Number\` | \`0\` |
| \`short\` | 2 bytes (16 bits) | \`java.lang.Short\` | \`Number\` | \`0\` |
| \`int\` | 4 bytes (32 bits) | \`java.lang.Integer\` | \`Number\` | \`0\` |
| \`long\` | 8 bytes (64 bits) | \`java.lang.Long\` | \`Number\` | \`0L\` |
| \`float\` | 4 bytes (32 bits) | \`java.lang.Float\` | \`Number\` | \`0.0f\` |
| \`double\` | 8 bytes (64 bits) | \`java.lang.Double\` | \`Number\` | \`0.0d\` |
| \`char\` | 2 bytes (16 bits) | \`java.lang.Character\` | \`Object\` | \`'\\u0000'\` |
| \`boolean\` | 1 bit (logical) | \`java.lang.Boolean\` | \`Object\` | \`false\` |`,
    javaCodeExamples: `public class MappingHierarchyDemo {
    public static void main(String[] args) {
        Integer i = 100;
        Double d = 99.9;
        Character c = 'A';
        Boolean b = true;

        // Number inheritance verification
        System.out.println("Is Integer a Number? " + (i instanceof Number)); // true
        System.out.println("Is Double a Number? " + (d instanceof Number));   // true
        // System.out.println(c instanceof Number); // COMPILE ERROR: Character is NOT a Number!

        // Number superclass provides shared conversion methods:
        Number num = i;
        System.out.println("As float: " + num.floatValue());
        System.out.println("As byte: " + num.byteValue());
    }
}`,
    outputExplanation: `- Confirms that numeric wrappers extend \`Number\`, while \`Character\` and \`Boolean\` do not.`,
    interviewReadyAnswer: `- "Java maps its 8 primitives to 8 wrapper classes. The 6 numeric types extend java.lang.Number, while Character and Boolean inherit directly from java.lang.Object."
- "All wrappers implement Serializable and Comparable."`,
    quickRevisionPoints: `- 6 numeric wrappers extend \`java.lang.Number\`.
- \`Character\` and \`Boolean\` extend \`Object\` directly.
- All wrappers are \`final\` and \`Comparable\`.
- Wrapper default value is \`null\` when declared as an uninitialized reference.`
  },
  {
    topicId: 133,
    slug: 'autoboxing-and-unboxing-mechanics',
    title: 'Autoboxing and Auto-Unboxing',
    definition: `- **Autoboxing**: The automatic conversion that the Java compiler makes between a primitive type and its corresponding wrapper object (e.g., converting \`int\` to \`Integer\`).
- **Unboxing**: The automatic conversion of a wrapper object back to its corresponding primitive value (e.g., converting \`Integer\` to \`int\`).
- **Introduced in**: Java 5 to eliminate repetitive manual conversions like \`Integer.valueOf()\` and \`intValue()\`.`,
    simpleExplanation: `- **The Invisible Box Packer**: Whenever you pass an \`int\` where an \`Integer\` is expected, the compiler automatically calls \`Integer.valueOf(x)\`. When you use an \`Integer\` in an arithmetic expression like \`+\`, the compiler automatically inserts \`.intValue()\`.`,
    howItWorks: `- Under the hood:
  • \`Integer obj = 10;\` is compiled into: \`Integer obj = Integer.valueOf(10);\`.
  • \`int val = obj;\` is compiled into: \`int val = obj.intValue();\`.
- **The Critical Trap (NullPointerException)**: If a wrapper reference is \`null\` and unboxed, calling \`.intValue()\` throws a runtime **\`NullPointerException\`**!`,
    javaCodeExamples: `public class AutoboxingDemo {
    public static void main(String[] args) {
        // Autoboxing: compiler calls Integer.valueOf(50)
        Integer boxed = 50;

        // Auto-unboxing: compiler calls boxed.intValue()
        int unboxed = boxed;

        // Auto-unboxing in expressions
        Integer a = 10;
        Integer b = 20;
        Integer sum = a + b; // unboxes both, adds primitives, autoboxes result!

        System.out.println("Sum: " + sum);

        // The Dangerous NullPointerException trap:
        Integer nullValue = null;
        try {
            int primitive = nullValue; // Auto-unboxing attempts nullValue.intValue() -> NPE!
        } catch (NullPointerException npe) {
            System.err.println("Caught NPE during unboxing of null wrapper!");
        }
    }
}`,
    outputExplanation: `- Illustrates behind-the-scenes compiler desugaring and the common pitfall of unboxing null references.`,
    interviewReadyAnswer: `- "Autoboxing is the compiler's automatic conversion of primitives to wrapper objects via valueOf(), while unboxing is the reverse via xxxValue()."
- "A major interview trap is unboxing a null wrapper reference, which triggers an immediate NullPointerException."`,
    quickRevisionPoints: `- Autoboxing: primitive -> wrapper (\`valueOf()\`).
- Unboxing: wrapper -> primitive (\`xxxValue()\`).
- Introduced in Java 5.
- Unboxing a \`null\` wrapper throws \`NullPointerException\`.`
  },
  {
    topicId: 134,
    slug: 'wrapper-parsing-conversion-methods',
    title: 'Parsing, Conversion & Utility Methods',
    definition: `- **Utility Methods in Wrapper Classes**: Static methods provided by wrapper classes to convert between Strings, primitives, and objects, as well as to inspect binary representations.
- **Three Core Conversion Categories**:
  1. **\`parseXxx(String s)\`**: Parses String into primitive type (returns primitive).
  2. **\`valueOf(String s)\`**: Parses String into wrapper object (returns wrapper instance).
  3. **\`toString()\` / \`toBinaryString()\`**: Converts numbers to String or radix representations.`,
    simpleExplanation: `- If you need an operational primitive number for math, call \`Integer.parseInt("123")\`. If you need a wrapped object for a List, call \`Integer.valueOf("123")\`.`,
    importantDifferences: `| Method | Return Type | Caching Behavior | Error Thrown on Invalid Input |
|---|---|---|---|
| \`Integer.parseInt("42")\` | primitive \`int\` | No object created | \`NumberFormatException\` |
| \`Integer.valueOf("42")\` | wrapper \`Integer\` | Uses Integer Cache (-128 to 127) | \`NumberFormatException\` |
| \`Integer.toString(42)\` | \`String\` | Formats as text | None |`,
    javaCodeExamples: `public class WrapperUtilityDemo {
    public static void main(String[] args) {
        String numStr = "255";

        // 1. Parsing to primitive int
        int prim = Integer.parseInt(numStr);

        // 2. Parsing to Integer object
        Integer obj = Integer.valueOf(numStr);

        // 3. Radix parsing (Hex, Binary, Octal)
        int hexVal = Integer.parseInt("FF", 16); // 255
        int binVal = Integer.parseInt("11111111", 2); // 255

        // 4. Converting to Binary and Hex Strings
        System.out.println("Binary representation: " + Integer.toBinaryString(prim)); // 11111111
        System.out.println("Hex representation: " + Integer.toHexString(prim));       // ff
        System.out.println("Parsed from Hex: " + hexVal);
    }
}`,
    outputExplanation: `- Demonstrates conversion between textual representations, radix encodings, and numerical data types.`,
    interviewReadyAnswer: `- "Wrapper classes offer static utility methods: parseXxx() returns a primitive, valueOf() returns a cached wrapper object, and toString() or toBinaryString() convert numbers to strings."
- "Invalid number string arguments trigger NumberFormatException."`,
    quickRevisionPoints: `- \`parseInt()\` returns primitive \`int\`.
- \`valueOf()\` returns wrapper \`Integer\` (uses caching).
- Radix-based parsing supports binary, octal, hex.
- Invalid format throws \`NumberFormatException\`.`
  },
  {
    topicId: 135,
    slug: 'integer-cache-tricky-equality-scenarios',
    title: 'Java Integer Cache & Tricky Equality Scenarios',
    definition: `- **Java Integer Cache**: An internal caching pool in \`java.lang.Integer\` that pre-allocates and reuses \`Integer\` object instances for values in the range **\`-128\` to \`127\`** (inclusive).
- **Core Motivation**: Memory optimization and performance efficiency, since small integers are heavily reused in software.
- **Trigger**: Occurs whenever autoboxing or \`Integer.valueOf()\` is invoked; does NOT occur when using \`new Integer()\`.`,
    simpleExplanation: `- **The Locker Room Analogy**: The JVM keeps a wall of 256 pre-built metal lockers labeled from -128 to 127. When you ask for locker 100 via autoboxing, the JVM hands you a key to the existing locker. But when you ask for locker 200 (outside the range), the JVM builds a brand-new locker from scratch on the Heap.`,
    importantConcepts: `- **Equality Behavior (\`==\` vs \`equals()\`\)**:
  • \`==\` checks **memory reference equality** (whether both point to the exact same heap address).
  • \`equals()\` checks **logical value equality**.
  • For values between **-128 and 127**, autoboxing returns the identical cached instance, so \`a == b\` is **\`true\`**.
  • For values **>= 128** or **< -128**, autoboxing instantiates new objects, so \`a == b\` is **\`false\`**!
- **Configurability**: The upper bound of 127 can be increased using the JVM flag \`-XX:AutoBoxCacheMax=<size>\`, but the lower bound is fixed at -128.
- **Other Cached Wrappers**: \`Byte\`, \`Short\`, \`Long\` also cache \`-128 to 127\`; \`Character\` caches \`0 to 127\`; \`Boolean\` caches \`TRUE\` and \`FALSE\`. \`Float\` and \`Double\` do NOT have caches.`,
    javaCodeExamples: `public class IntegerCacheTrapDemo {
    public static void main(String[] args) {
        // Range within cache: -128 to 127
        Integer a = 100;
        Integer b = 100;
        System.out.println("100 == 100: " + (a == b));           // true (Same cached instance!)
        System.out.println("100.equals(100): " + a.equals(b)); // true

        // Range OUTSIDE cache: 128+
        Integer x = 200;
        Integer y = 200;
        System.out.println("200 == 200: " + (x == y));           // FALSE! (Different heap objects!)
        System.out.println("200.equals(200): " + x.equals(y)); // TRUE (Values are logically equal)

        // Golden Rule: ALWAYS use .equals() to compare wrapper objects!
    }
}`,
    outputExplanation: `- Demonstrates the classic interview pitfall where \`==\` returns true for 100 but false for 200 due to the internal Integer Cache range.`,
    interviewReadyAnswer: `- "Java caches Integer instances between -128 and 127 when using autoboxing or Integer.valueOf(). Within this range, == evaluates to true because both references share the same cached object."
- "Outside this range, new objects are instantiated, making == evaluate to false. Therefore, always use .equals() for wrapper comparisons."`,
    quickRevisionPoints: `- Default cache range is -128 to 127.
- Applies to autoboxing and \`Integer.valueOf()\`.
- Within cache: \`==\` returns \`true\`; outside cache: \`==\` returns \`false\`.
- Always use \`.equals()\` for wrapper equality checks.
- Upper bound configurable via \`-XX:AutoBoxCacheMax\`.`
  }
];

