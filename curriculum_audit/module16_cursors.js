// Module 16: Collection Cursors (Topics 155-160)

module.exports = [
  {
    topicId: 155,
    slug: 'collection-cursors-overview',
    title: 'Overview of Collection Cursors in Java',
    definition: `- **Collection Cursor**: An iterator construct in Java used to step through elements of a collection object sequentially one by one.
- **The 3 Primary Cursors in Java**:
  1. **\`Enumeration\` (Java 1.0)**: Legacy, read-only, forward-only traversal for legacy classes (\`Vector\`, \`Hashtable\`).
  2. **\`Iterator\` (Java 1.2)**: Universal forward-only cursor supporting safe element removal for all Collection implementations.
  3. **\`ListIterator\` (Java 1.2)**: Advanced bidirectional cursor tailored exclusively for \`List\` implementations, supporting reading, removing, replacing, and adding elements.`,
    simpleExplanation: `- **The Movie Reel Projector**: A cursor is like the projector light head on a film reel. It points to one frame at a time, plays that frame, and moves forward. A simple projector only runs forward (Iterator), an antique projector cannot touch the film (Enumeration), and an editing projector can rewind backwards and splice new frames in place (ListIterator).`,
    importantConcepts: `- **Cursor Positioning Concept**:
  • A cursor sits **between** elements, not directly on an element!
  • Calling \`hasNext()\` checks if an element exists after the cursor.
  • Calling \`next()\` jumps the cursor past the element and returns it.`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CursorOverviewDemo {
    public static void main(String[] args) {
        List<String> frameworks = new ArrayList<>();
        frameworks.add("Spring Boot");
        frameworks.add("Micronaut");
        frameworks.add("Quarkus");

        // Universal Iterator cursor traversal
        Iterator<String> it = frameworks.iterator();
        while (it.hasNext()) {
            String item = it.next();
            System.out.println("Processing framework: " + item);
        }
    }
}`,
    outputExplanation: `- Demonstrates the fundamental loop idiom for cursors: \`while (cursor.hasNext()) { cursor.next(); }\`.`,
    interviewReadyAnswer: `- "Java provides three collection cursors: Enumeration (legacy, read-only), Iterator (universal, forward-only, supports removal), and ListIterator (bidirectional, List-only, supports full CRUD)."`,
    quickRevisionPoints: `- Cursors traverse collections element-by-element.
- 3 Cursors: Enumeration, Iterator, ListIterator.
- Cursor sits conceptually between elements.
- Always check \`hasNext()\` before calling \`next()\`.`
  },
  {
    topicId: 156,
    slug: 'enumeration-cursor-traversal',
    title: 'Enumeration Cursor (Legacy Traversal)',
    definition: `- **Enumeration Interface (\`java.util.Enumeration<E>\`)**: The original cursor introduced in Java 1.0 to traverse legacy collection classes.
- **Core Methods**:
  1. \`boolean hasMoreElements()\`: Tests if the enumeration contains more elements.
  2. \`E nextElement()\`: Returns the next element of the enumeration.`,
    simpleExplanation: `- Like an old read-only cassette tape. You can only press Play and fast-forward; you cannot record or delete a track while listening.`,
    importantConcepts: `- **Limitations of Enumeration**:
  • Works **ONLY** with legacy collections (\`Vector\`, \`Hashtable\`, \`Properties\`); cannot traverse modern \`ArrayList\`, \`HashSet\`, etc.
  • **Read-Only**: Has no method to remove or modify elements during iteration.
  • Method names are overly verbose compared to modern \`Iterator\`.`,
    javaCodeExamples: `import java.util.Enumeration;
import java.util.Vector;

public class EnumerationDemo {
    public static void main(String[] args) {
        Vector<String> legacyVector = new Vector<>();
        legacyVector.add("JDK 1.0");
        legacyVector.add("JDK 1.1");
        legacyVector.add("JDK 1.2");

        // Obtaining Enumeration cursor
        Enumeration<String> en = legacyVector.elements();

        while (en.hasMoreElements()) {
            String version = en.nextElement();
            System.out.println("Legacy element: " + version);
        }
    }
}`,
    outputExplanation: `- Illustrates legacy traversal using \`hasMoreElements()\` and \`nextElement()\`.`,
    interviewReadyAnswer: `- "Enumeration is a legacy Java 1.0 cursor applicable only to legacy classes like Vector and Hashtable. It is read-only and lacks element removal capabilities."`,
    quickRevisionPoints: `- Introduced in Java 1.0 for legacy classes.
- Methods: \`hasMoreElements()\` and \`nextElement()\`.
- Read-only; cannot remove elements.
- Superseded by \`Iterator\`.`
  },
  {
    topicId: 157,
    slug: 'iterator-cursor-safe-removal',
    title: 'Iterator Cursor & Safe Element Removal',
    definition: `- **Iterator Interface (\`java.util.Iterator<E>\`)**: The universal cursor in Java 1.2 that allows traversal across **any** collection implementing \`Collection<E>\`.
- **Core Methods**:
  1. \`boolean hasNext()\`: Returns true if the iteration has more elements.
  2. \`E next()\`: Returns the next element in the iteration.
  3. \`default void remove()\`: Removes the last element returned by \`next()\` from the underlying collection safely.`,
    simpleExplanation: `- Removing an item from a list while looping over it with an enhanced for-each loop is like pulling a rug out from under your own feet: it triggers \`ConcurrentModificationException\`. The \`Iterator.remove()\` method politely pauses the clock, removes the element safely, and updates its internal counters so you never fall.`,
    howItWorks: `- When you modify a collection directly (e.g. \`list.remove()\`) during traversal, the collection's \`modCount\` changes without the iterator knowing, triggering **\`ConcurrentModificationException\`**.
- Calling **\`iterator.remove()\`** safely removes the element from the backing data structure AND synchronizes the iterator's expected \`expectedModCount = modCount\`.`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class SafeRemovalDemo {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(10, 15, 20, 25, 30));

        // SAFE: Using Iterator's remove() method
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            Integer val = it.next();
            if (val % 2 != 0) {
                it.remove(); // Safely removes odd numbers!
            }
        }
        System.out.println("Remaining even numbers: " + numbers);

        // Modern Java 8+ equivalent:
        numbers.removeIf(n -> n > 25);
        System.out.println("After removeIf (>25): " + numbers);
    }
}`,
    outputExplanation: `- Removes odd numbers without triggering \`ConcurrentModificationException\`.
- Highlights Java 8 \`removeIf()\` as the modern syntactic shorthand.`,
    interviewReadyAnswer: `- "Iterator is the universal collection cursor in Java. Its remove() method is the only safe way to delete elements during traversal without throwing ConcurrentModificationException."`,
    quickRevisionPoints: `- Universal cursor for all Collections.
- Methods: \`hasNext()\`, \`next()\`, and \`remove()\`.
- \`iterator.remove()\` avoids \`ConcurrentModificationException\`.
- Modern alternative is \`Collection.removeIf()\`.`
  },
  {
    topicId: 158,
    slug: 'listiterator-cursor-bidirectional',
    title: 'ListIterator Cursor (Bidirectional Navigation)',
    definition: `- **ListIterator Interface (\`java.util.ListIterator<E>\`)**: An extended cursor interface designed **exclusively for \`List\` implementations** that provides bidirectional traversal (forward and backward) and full element modification.
- **Key Methods**:
  • Forward: \`hasNext()\`, \`next()\`, \`nextIndex()\`.
  • Backward: \`hasPrevious()\`, \`previous()\`, \`previousIndex()\`.
  • Modification: \`remove()\`, \`set(E e)\` (replace), \`add(E e)\` (insert).`,
    simpleExplanation: `- A modern DJ turntable: you can spin the record forward (\`next\`), spin it in reverse (\`previous\`), replace a scratch track (\`set\`), or splice in a brand-new audio sample (\`add\`).`,
    importantConcepts: `- **Exclusivity**: Can only be obtained from \`List\` objects (via \`list.listIterator()\`); cannot be used on \`Set\` or \`Queue\` because sets have no directional index or ordering.
- **Starting Position**: Can instantiate at any specific index: \`list.listIterator(startIndex)\`.`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorDemo {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry"));

        ListIterator<String> lit = fruits.listIterator();

        System.out.println("--- Forward Traversal ---");
        while (lit.hasNext()) {
            String fruit = lit.next();
            if (fruit.equals("Banana")) {
                lit.set("Blueberry"); // Replaces element safely
            }
        }

        System.out.println("--- Backward Traversal ---");
        while (lit.hasPrevious()) {
            System.out.println("Index " + lit.previousIndex() + ": " + lit.previous());
        }
    }
}`,
    outputExplanation: `- Illustrates forward inspection with in-place \`set()\` replacement and subsequent reverse traversal.`,
    interviewReadyAnswer: `- "ListIterator is a bidirectional cursor exclusive to Lists that supports forward and backward traversal (previous()) as well as adding, setting, and removing elements during iteration."`,
    quickRevisionPoints: `- Exclusive to \`List\` implementations.
- Bidirectional: \`next()\` and \`previous()\`.
- Supports CRUD: \`add()\`, \`set()\`, and \`remove()\`.
- Exposes index positions: \`nextIndex()\` and \`previousIndex()\`.`
  },
  {
    topicId: 159,
    slug: 'enumeration-vs-iterator-vs-listiterator',
    title: 'Enumeration vs Iterator vs ListIterator (Direct Comparison)',
    definition: `- **Cursor Comparative Analysis**: A structural evaluation of all three collection cursors in Java to understand architectural evolution and proper use cases.`,
    importantDifferences: `| Property | Enumeration | Iterator | ListIterator |
|---|---|---|---|
| **Introduced In** | Java 1.0 (Legacy) | Java 1.2 | Java 1.2 |
| **Applicable To** | Legacy classes (\`Vector\`, \`Hashtable\`) | Any \`Collection\` (\`List\`, \`Set\`, \`Queue\`) | \`List\` implementations only |
| **Movement Direction** | Forward only | Forward only | Bidirectional (Forward & Backward) |
| **Read Operations** | \`hasMoreElements()\`, \`nextElement()\` | \`hasNext()\`, \`next()\` | \`hasNext()\`, \`next()\`, \`hasPrevious()\`, \`previous()\` |
| **Remove Element?** | NO (Read-only) | YES (\`remove()\`) | YES (\`remove()\`) |
| **Add / Replace?** | NO | NO | YES (\`add()\`, \`set()\`) |
| **Index Access?** | NO | NO | YES (\`nextIndex()\`, \`previousIndex()\`) |`,
    javaCodeExamples: `import java.util.*;

public class CursorComparisonDemo {
    public static void main(String[] args) {
        List<String> languages = new ArrayList<>(Arrays.asList("Java", "Kotlin", "Scala"));

        // 1. Iterator: Forward only, universal, removal supported
        Iterator<String> it = languages.iterator();
        while (it.hasNext()) {
            if (it.next().equals("Scala")) it.remove();
        }

        // 2. ListIterator: Bidirectional, List only, modification supported
        ListIterator<String> lit = languages.listIterator();
        while (lit.hasNext()) {
            if (lit.next().equals("Kotlin")) lit.add("Groovy"); // Insert Groovy
        }

        System.out.println("Modified list: " + languages);
    }
}`,
    outputExplanation: `- Proves that Iterator removes items, while ListIterator can inject new elements during iteration.`,
    interviewReadyAnswer: `- "Enumeration is a legacy read-only forward cursor; Iterator is a universal forward cursor supporting element removal; ListIterator is a List-exclusive bidirectional cursor supporting add, set, and remove."`,
    quickRevisionPoints: `- Enumeration = legacy, forward only, read only.
- Iterator = universal, forward only, supports remove.
- ListIterator = List only, bidirectional, full modification.
- Always use Iterator or ListIterator in modern code.`
  },
  {
    topicId: 160,
    slug: 'fail-fast-vs-fail-safe-iterators',
    title: 'Fail-Fast vs Fail-Safe Iterators',
    definition: `- **Fail-Fast Iterators**: Iterators that immediately throw **\`java.util.ConcurrentModificationException\`** if the underlying collection is structurally modified (added, removed, or cleared) at any time during iteration (except via the iterator's own \`remove()\` method).
- **Fail-Safe Iterators (Weakly Consistent)**: Iterators that operate on a **clone or snapshot** of the underlying collection, never throwing \`ConcurrentModificationException\` even if the collection is modified during iteration.`,
    simpleExplanation: `- **Live Document vs Printed Photocopy**:
  • **Fail-Fast**: You are reading a live shared Google Doc. If someone suddenly deletes a paragraph while your eyes are scanning it, the screen flashes an error and locks up (\`ConcurrentModificationException\`).
  • **Fail-Safe**: You print a paper photocopy of the document and read it at your desk. People can edit the live document all they want; your paper copy remains stable and undisturbed.`,
    importantDifferences: `| Dimension | Fail-Fast Iterators | Fail-Safe Iterators |
|---|---|---|
| **Exception Thrown** | Throws \`ConcurrentModificationException\` | Never throws \`ConcurrentModificationException\` |
| **Memory & Performance**| Memory efficient (operates on actual collection) | Higher memory overhead (operates on clone/snapshot) |
| **Modification Visibility**| Instant awareness | Does not see modifications made after iterator creation |
| **Mechanism** | Checks \`modCount != expectedModCount\` | Iterates over \`volatile\` array snapshot |
| **Implementations** | Standard collections: \`ArrayList\`, \`HashMap\`, \`HashSet\` | Concurrent collections: \`CopyOnWriteArrayList\`, \`ConcurrentHashMap\` |`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class FailFastVsFailSafeDemo {
    public static void main(String[] args) {
        // 1. Fail-Fast Demonstration
        List<String> failFastList = new ArrayList<>(List.of("A", "B", "C"));
        try {
            for (String item : failFastList) {
                if (item.equals("B")) {
                    failFastList.add("D"); // Direct modification -> CME!
                }
            }
        } catch (Exception e) {
            System.out.println("Fail-Fast Caught: " + e.getClass().getSimpleName());
        }

        // 2. Fail-Safe Demonstration
        List<String> failSafeList = new CopyOnWriteArrayList<>(List.of("A", "B", "C"));
        for (String item : failSafeList) {
            if (item.equals("B")) {
                failSafeList.add("D"); // Operates on snapshot; no exception!
            }
        }
        System.out.println("Fail-Safe succeeded without error! Final list: " + failSafeList);
    }
}`,
    outputExplanation: `- \`ArrayList\` fails fast with \`ConcurrentModificationException\`.
- \`CopyOnWriteArrayList\` successfully completes iteration over its snapshot array.`,
    interviewReadyAnswer: `- "Fail-fast iterators (standard collections like ArrayList) throw ConcurrentModificationException immediately upon detecting structural modifications via modCount mismatch."
- "Fail-safe iterators (concurrent collections like CopyOnWriteArrayList) traverse a snapshot of the collection, avoiding exceptions at the cost of extra memory."`,
    quickRevisionPoints: `- Fail-Fast: throws \`ConcurrentModificationException\` via \`modCount\`.
- Fail-Safe: iterates on snapshot; no exception thrown.
- Standard collections are fail-fast.
- Concurrent collections (\`java.util.concurrent\`) are fail-safe.`
  }
];

