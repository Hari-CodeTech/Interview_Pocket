// Module 15: Collections Framework (Topics 144-154)

module.exports = [
  {
    topicId: 144,
    slug: 'arrays-vs-collections-framework',
    title: 'Arrays vs Collection Framework',
    definition: `- **Arrays**: Fixed-size, contiguous memory data structures built directly into the Java language syntax that store homogeneous elements (primitives or objects).
- **Java Collection Framework (JCF)**: A comprehensive, standardized architecture of interfaces, concrete implementations, and utility algorithms for storing, manipulating, and querying groups of objects dynamically.`,
    simpleExplanation: `- **Fixed Ice Cube Tray vs Expandable Suitcase**:
  • An **Array** is a 12-slot plastic ice cube tray. You cannot stretch it to hold 13 cubes, nor can you place a water bottle inside one of the slots.
  • A **Collection** is an expandable luggage bag with zippers, compartments, and sorting pouches. It expands as you add items and offers built-in search, sort, and filter tools.`,
    importantDifferences: `| Dimension | Java Arrays | Java Collection Framework |
|---|---|---|
| **Size** | Fixed length (immutable after allocation) | Dynamic and auto-resizable |
| **Data Types Supported** | Stores both primitives and objects | Stores ONLY objects (primitives require wrapper classes) |
| **Performance** | High performance; cache-friendly contiguous memory | Slight overhead due to boxing and pointer indirection |
| **Built-in Algorithms** | Minimal built-in utility (requires \`java.util.Arrays\`) | Rich API (searching, sorting, shuffling, reversing) |
| **Type Safety** | Homogeneous; checked at runtime (\`ArrayStoreException\`) | Enforced at compile-time via Generics (\`List<String>\`) |
| **Memory Layout** | Contiguous memory block | Contiguous (\`ArrayList\`) or linked node pointers (\`LinkedList\`) |`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.List;

public class ArraysVsCollectionsDemo {
    public static void main(String[] args) {
        // 1. Array: Fixed length, supports primitives
        int[] primitiveArray = new int[3];
        primitiveArray[0] = 10;
        primitiveArray[1] = 20;
        primitiveArray[2] = 30;
        // primitiveArray[3] = 40; // ArrayIndexOutOfBoundsException!

        // 2. Collection: Dynamically expanding, stores wrapper objects
        List<Integer> dynamicList = new ArrayList<>();
        dynamicList.add(10);
        dynamicList.add(20);
        dynamicList.add(30);
        dynamicList.add(40); // Automatically doubles capacity under the hood!

        System.out.println("Array length: " + primitiveArray.length);
        System.out.println("Collection size: " + dynamicList.size());
    }
}`,
    outputExplanation: `- Illustrates rigid bounds of arrays versus the dynamic, auto-resizing convenience of Collections.`,
    interviewReadyAnswer: `- "Arrays are fixed in size, store primitives and objects with maximum performance, but lack dynamic resizing."
- "The Collection Framework provides dynamic, auto-resizing object collections with rich algorithmic support and type safety through Generics."`,
    quickRevisionPoints: `- Arrays are fixed size; Collections are dynamically resizable.
- Arrays can store primitives directly; Collections store objects only.
- Arrays provide contiguous memory performance.
- Collections provide rich built-in utility algorithms.`
  },
  {
    topicId: 145,
    slug: 'collection-vs-collection-vs-collections',
    title: 'collection vs Collection vs Collections',
    definition: `- **collection (lowercase)**: The general computer science concept/abstraction of grouping multiple elements into a single container.
- **Collection (\`java.util.Collection\`)**: The root parent interface in the Java Collections Framework hierarchy from which \`List\`, \`Set\`, and \`Queue\` inherit.
- **Collections (\`java.util.Collections\`)**: An exclusively utility class consisting solely of \`static\` helper methods that operate on or return collections (e.g. \`sort()\`, \`reverse()\`, \`synchronizedList()\`, \`unmodifiableList()\`).`,
    importantDifferences: `| Dimension | collection (Concept) | Collection (Interface) | Collections (Utility Class) |
|---|---|---|---|
| **What It Is** | General programming concept | Java Interface (\`java.util.Collection\`) | Java Class (\`java.util.Collections\`) |
| **Hierarchy Level** | Abstract concept | Root interface of \`List\`, \`Set\`, \`Queue\` | Standalone utility helper class |
| **Can Instantiated?** | N/A | No (interface) | No (private constructor) |
| **Contains** | Conceptual data grouping | Abstract method contracts (\`add\`, \`size\`) | Static utility methods (\`sort\`, \`binarySearch\`) |
| **Relationship to Map** | Abstract concept | \`Map\` does NOT implement \`Collection\` | Operates on Collections and Maps |`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CollectionTerminologyDemo {
    public static void main(String[] args) {
        // 1. 'Collection' Interface used as a polymorphic reference
        Collection<String> items = new ArrayList<>();
        items.add("Java");
        items.add("Spring");
        items.add("MySQL");

        // 2. 'Collections' Utility Class used for static operations
        List<String> list = (List<String>) items;
        Collections.sort(list); // Static utility sort
        System.out.println("Sorted list via Collections: " + list);

        // Utility: Creating an unmodifiable view
        Collection<String> readOnly = Collections.unmodifiableCollection(items);
        // readOnly.add("Docker"); // UnsupportedOperationException!
    }
}`,
    outputExplanation: `- Demonstrates using the \`Collection\` interface contract and calling \`Collections\` static utility methods.`,
    interviewReadyAnswer: `- "collection is the general concept of grouping objects; Collection is the root interface for List, Set, and Queue; Collections is a utility class full of static methods like sort() and reverse()."
- "Note that Map is part of the collection framework, but does NOT inherit from the Collection interface."`,
    quickRevisionPoints: `- collection = general concept.
- \`Collection\` = root interface in \`java.util\`.
- \`Collections\` = static utility class with helper methods.
- \`Map\` does NOT implement \`Collection\`.`
  },
  {
    topicId: 146,
    slug: 'collections-hierarchy-root-interfaces',
    title: 'Collections Hierarchy & Root Interfaces',
    definition: `- **Collections Framework Hierarchy**: The structured tree of interfaces and classes in \`java.util\` designed around two independent branch roots:
  1. **\`java.util.Collection<E>\`**: Extended by \`List\`, \`Set\`, and \`Queue\`.
  2. **\`java.util.Map<K, V>\`**: Standalone root interface for key-value pair dictionaries.
- **Top Ancestor**: Both hierarchies extend \`Iterable<E>\` (for \`Collection\`), enabling the enhanced for-each loop.`,
    simpleExplanation: `- **The Two Kingdoms**:
  • Kingdom 1: **Collection**—contains individual items (e.g. a shopping list, a unique badge set, a printer queue).
  • Kingdom 2: **Map**—contains key-value pairs (e.g. a dictionary mapping words to definitions, or user IDs to user profiles). A Map is not a Collection of items, but a mapping of keys to values.`,
    importantConcepts: `- **Core Interfaces and Their Guarantees**:
  • **\`List<E>\`**: Ordered sequence, allows duplicates, positional index access.
  • **\`Set<E>\`**: Unordered (mostly), guarantees NO duplicate elements.
  • **\`Queue<E>\`**: FIFO (First-In, First-Out) processing holding elements prior to consumption.
  • **\`Deque<E>\`**: Double-ended queue supporting insertion and removal at both ends.
  • **\`Map<K, V>\`**: Unique keys mapped to values; keys cannot have duplicates.`,
    javaCodeExamples: `import java.util.*;

public class HierarchyOverviewDemo {
    public static void main(String[] args) {
        // List: Ordered, allows duplicates
        List<String> list = Arrays.asList("A", "B", "A");
        System.out.println("List (duplicates preserved): " + list);

        // Set: Unordered, eliminates duplicates
        Set<String> set = new HashSet<>(list);
        System.out.println("Set (duplicates removed): " + set);

        // Map: Key-Value association
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "Alpha");
        map.put(2, "Beta");
        System.out.println("Map (Key-Value): " + map);
    }
}`,
    outputExplanation: `- Illustrates how the distinct root interfaces enforce their behavioral contracts.`,
    interviewReadyAnswer: `- "The Java Collections Framework is organized into two distinct hierarchies: the Collection interface (extended by List, Set, Queue) and the Map interface (key-value associations)."
- "Collection inherits from Iterable, allowing for-each iteration, whereas Map operates independently on key-value pairs."`,
    quickRevisionPoints: `- \`Collection\` is extended by \`List\`, \`Set\`, \`Queue\`.
- \`Map\` does NOT inherit from \`Collection\`.
- \`Iterable\` is the super-interface of \`Collection\`.
- \`List\` preserves order; \`Set\` enforces uniqueness; \`Map\` links keys to values.`
  },
  {
    topicId: 147,
    slug: 'list-interface-arraylist-linkedlist',
    title: 'List Interface (ArrayList, LinkedList, Vector, Stack)',
    definition: `- **List Interface (\`java.util.List\`)**: An ordered collection (sequence) where elements are stored by zero-based integer index, duplicates are permitted, and multiple nulls are allowed.
- **The 4 Primary Implementations**:
  1. **\`ArrayList\`**: Resizable array implementation (Default choice for read-heavy operations).
  2. **\`LinkedList\`**: Doubly-linked list implementation (Preferred for high-frequency head/tail insertions).
  3. **\`Vector\`**: Legacy synchronized, thread-safe dynamic array (superseded by \`CopyOnWriteArrayList\`).
  4. **\`Stack\`**: Legacy subclass of \`Vector\` implementing LIFO (superseded by \`ArrayDeque\`).`,
    importantDifferences: `| Dimension | ArrayList | LinkedList | Vector |
|---|---|---|---|
| **Underlying Data Structure** | Dynamic resizable array | Doubly linked list | Synchronized resizable array |
| **Random Access \`get(index)\`** | **O(1)** Fast | **O(n)** Slow (must traverse nodes) | **O(1)** Fast |
| **Insertion / Deletion** | **O(n)** (requires array element shifting) | **O(1)** (if node is already located) | **O(n)** (shifts array) |
| **Thread Safety** | Non-synchronized (Not thread-safe) | Non-synchronized (Not thread-safe) | Synchronized (Thread-safe, high overhead) |
| **Growth Policy** | Increases by 50% (\`newCapacity = old + (old >> 1)\`) | No capacity; adds nodes dynamically | Doubles in size (100% increase) |
| **Memory Overhead** | Low (contiguous array elements) | High (each node stores item + 2 pointers) | Low |`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListImplementationsDemo {
    public static void main(String[] args) {
        // ArrayList: Optimal for fast index lookup
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Java");
        arrayList.add("Spring");
        System.out.println("Fast O(1) read: " + arrayList.get(0));

        // LinkedList: Implements both List and Deque
        LinkedList<String> linkedList = new LinkedList<>();
        linkedList.addFirst("Head-Node");
        linkedList.addLast("Tail-Node");
        System.out.println("LinkedList first: " + linkedList.getFirst());
    }
}`,
    outputExplanation: `- Demonstrates \`ArrayList\` for direct indexing and \`LinkedList\` for efficient head/tail pointer operations.`,
    interviewReadyAnswer: `- "ArrayList uses a dynamic array providing O(1) random access but O(n) worst-case insertions due to array shifting."
- "LinkedList uses a doubly linked list with O(1) insertions at ends but O(n) random access and higher node memory overhead. Vector and Stack are legacy synchronized classes."`,
    quickRevisionPoints: `- \`ArrayList\` is best for searching and index access (O(1)).
- \`LinkedList\` is best for frequent insertion/deletion at extremes.
- \`ArrayList\` grows by 50%; \`Vector\` doubles.
- Use \`ArrayDeque\` instead of legacy \`Stack\`.`
  },
  {
    topicId: 148,
    slug: 'set-interface-hashset-treeset',
    title: 'Set Interface (HashSet, LinkedHashSet, TreeSet)',
    definition: `- **Set Interface (\`java.util.Set\`)**: A collection that contains **no duplicate elements**. Models the mathematical set abstraction.
- **The 3 Primary Implementations**:
  1. **\`HashSet\`**: Backed by a \`HashMap\`; elements are completely unordered and unsorted; allows one \`null\`.
  2. **\`LinkedHashSet\`**: Backed by a hash table + doubly linked list; maintains **insertion order**; allows one \`null\`.
  3. **\`TreeSet\`**: Backed by a **Red-Black Tree** (\`NavigableMap\`); elements are **sorted** in natural ascending order or via custom \`Comparator\`; does NOT allow \`null\`.`,
    importantDifferences: `| Dimension | HashSet | LinkedHashSet | TreeSet |
|---|---|---|---|
| **Ordering** | No guarantee of order | Predictable insertion order | Sorted (Natural or Comparator) |
| **Internal Structure** | Hash table (\`HashMap\`) | Hash table + Doubly linked list | Balanced Red-Black tree (\`TreeMap\`) |
| **Performance (add/get/contains)**| **O(1)** Constant time | **O(1)** Constant time | **O(log n)** Logarithmic time |
| **Null Elements Allowed?**| Allows single \`null\` | Allows single \`null\` | **NO \`null\`** (throws \`NullPointerException\`) |
| **Comparison Mechanism** | \`hashCode()\` & \`equals()\` | \`hashCode()\` & \`equals()\` | \`compareTo()\` or \`compare()\` |`,
    javaCodeExamples: `import java.util.*;

public class SetImplementationsDemo {
    public static void main(String[] args) {
        // 1. HashSet: Unordered
        Set<String> hashSet = new HashSet<>(Arrays.asList("Banana", "Apple", "Orange", "Apple"));
        System.out.println("HashSet (no dupes, unordered): " + hashSet);

        // 2. LinkedHashSet: Insertion-ordered
        Set<String> linkedHashSet = new LinkedHashSet<>(Arrays.asList("Banana", "Apple", "Orange", "Apple"));
        System.out.println("LinkedHashSet (insertion order): " + linkedHashSet);

        // 3. TreeSet: Sorted alphabetically
        Set<String> treeSet = new TreeSet<>(Arrays.asList("Banana", "Apple", "Orange", "Apple"));
        System.out.println("TreeSet (sorted order): " + treeSet);
    }
}`,
    outputExplanation: `- All three eliminate duplicates; \`HashSet\` ignores order, \`LinkedHashSet\` retains insertion sequence, and \`TreeSet\` sorts alphabetically.`,
    interviewReadyAnswer: `- "HashSet provides O(1) lookup with no ordering guarantees; LinkedHashSet maintains insertion order via a doubly linked list; TreeSet maintains elements in sorted order via a Red-Black tree in O(log n) time."
- "TreeSet does not allow null elements because comparisons throw NullPointerException."`,
    quickRevisionPoints: `- \`HashSet\` = O(1), unordered, allows 1 null.
- \`LinkedHashSet\` = O(1), insertion order, allows 1 null.
- \`TreeSet\` = O(log n), sorted order, zero nulls.
- All 3 prohibit duplicate elements.`
  },
  {
    topicId: 149,
    slug: 'why-set-does-not-support-sort',
    title: 'Why Set Does Not Support Sorting Methods Directly',
    definition: `- **The Architectural Rationale**: Why \`Collections.sort()\` accepts only \`List<T>\` and why \`Set<T>\` lacks a direct \`.sort()\` method.
- **Core Principles**:
  1. **Absence of Positional Indexing**: Sets do not maintain integer indices (\`get(i)\` or \`set(i, val)\`); sorting algorithms fundamentally require swapping elements at specific index positions.
  2. **Violates Invariant Contracts**: \`HashSet\` positioning is strictly determined by \`hashCode() % capacity\`; sorting its internal array would completely break hash bucket lookup logic!`,
    simpleExplanation: `- **The Bowling Ball Rack vs The Coat Check**:
  • In a coat check (\`List\`), hangers are numbered 0, 1, 2, 3. You can sort the coats by color from hanger 0 to 10.
  • In a hash set, items are dropped into lockers based on their fingerprint (\`hashCode\`). If you moved a shoe to locker #1 just because you wanted it "sorted alphabetically", you could never find it again by its fingerprint!`,
    importantConcepts: `- **How to Sort a Set in Java**:
  1. **Convert to \`TreeSet\`**: Pass the set into a \`TreeSet\` to sort automatically via Red-Black Tree.
  2. **Convert to \`List\`**: Place elements in an \`ArrayList\` and invoke \`Collections.sort()\`.
  3. **Stream API**: Use \`set.stream().sorted().collect(Collectors.toList())\`.`,
    javaCodeExamples: `import java.util.*;
import java.util.stream.Collectors;

public class SortingSetDemo {
    public static void main(String[] args) {
        Set<Integer> unsortedSet = new HashSet<>(Arrays.asList(45, 12, 89, 3, 27));

        // Attempting Collections.sort(unsortedSet); // COMPILE ERROR! sort() requires List<T>

        // Solution 1: Transfer into TreeSet for automatic sorting
        Set<Integer> sortedTreeSet = new TreeSet<>(unsortedSet);
        System.out.println("Sorted via TreeSet: " + sortedTreeSet);

        // Solution 2: Transfer to List and sort
        List<Integer> sortedList = new ArrayList<>(unsortedSet);
        Collections.sort(sortedList);
        System.out.println("Sorted via Collections.sort(): " + sortedList);

        // Solution 3: Java 8 Stream API
        List<Integer> streamSorted = unsortedSet.stream()
                                                .sorted()
                                                .collect(Collectors.toList());
        System.out.println("Sorted via Stream API: " + streamSorted);
    }
}`,
    outputExplanation: `- Illustrates the compile-time prohibition and demonstrates the three standard solutions for sorting Set data.`,
    interviewReadyAnswer: `- "Collections.sort() requires positional indexing (List) to perform in-place swaps. Set does not support positional index access, and sorting a HashSet would break its hash-based bucket contract."
- "To sort a Set, copy its elements into a TreeSet or an ArrayList, or use Java 8 Stream API .sorted()."`,
    quickRevisionPoints: `- Sets have no index-based access (\`get(int)\`).
- Sorting would violate \`HashSet\` hash-bucket retrieval logic.
- \`Collections.sort()\` requires \`List<T>\`.
- Sort sets using \`TreeSet\`, \`ArrayList\`, or Streams.`
  },
  {
    topicId: 150,
    slug: 'queue-interface-priorityqueue-deque',
    title: 'Queue Interface (PriorityQueue, Deque, ArrayDeque)',
    definition: `- **Queue Interface (\`java.util.Queue\`)**: A collection designed for holding elements prior to processing, typically following First-In, First-Out (FIFO) ordering.
- **Deque Interface (\`java.util.Deque\`)**: A "Double-Ended Queue" supporting element insertion and removal at both endpoints.
- **Primary Implementations**:
  1. **\`PriorityQueue\`**: Elements are ordered according to natural priority or a custom \`Comparator\` using a min-heap data structure.
  2. **\`ArrayDeque\`**: Resizable array implementation of Deque. More efficient than \`Stack\` (for LIFO) and faster than \`LinkedList\` (for FIFO).`,
    importantDifferences: `| Operation | Throws Exception on Failure | Returns Special Value (null / false) |
|---|---|---|
| **Insert at Tail** | \`add(e)\` | \`offer(e)\` |
| **Examine & Remove Head** | \`remove()\` | \`poll()\` |
| **Examine Head without Removal** | \`element()\` | \`peek()\` |`,
    importantConcepts: `- **ArrayDeque as Modern Replacement**:
  • Replaces legacy \`Stack\` for LIFO (stack operations: \`push()\` and \`pop()\`).
  • Replaces \`LinkedList\` for FIFO queues due to lower memory overhead and better CPU cache locality.
  • Prohibits \`null\` elements.`,
    javaCodeExamples: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.PriorityQueue;
import java.util.Queue;

public class QueueDequeDemo {
    public static void main(String[] args) {
        // 1. PriorityQueue: Natural min-heap ordering
        Queue<Integer> pq = new PriorityQueue<>();
        pq.offer(50);
        pq.offer(10);
        pq.offer(30);

        System.out.println("PriorityQueue poll (smallest first): " + pq.poll()); // 10
        System.out.println("PriorityQueue poll (next smallest): " + pq.poll());  // 30

        // 2. ArrayDeque: Used as a high-performance LIFO Stack
        Deque<String> stack = new ArrayDeque<>();
        stack.push("Bottom Plate");
        stack.push("Middle Plate");
        stack.push("Top Plate");

        System.out.println("Stack Pop: " + stack.pop()); // Top Plate
    }
}`,
    outputExplanation: `- \`PriorityQueue\` yields elements in priority order (min-heap).
- \`ArrayDeque\` performs efficient stack operations without synchronization locks.`,
    interviewReadyAnswer: `- "Queue handles FIFO element processing via offer(), poll(), and peek(). PriorityQueue orders elements using a binary min-heap."
- "ArrayDeque is a double-ended queue that is faster and more memory-efficient than LinkedList for queues, and modernly replaces the synchronized Stack class."`,
    quickRevisionPoints: `- Queue methods: \`offer()\`, \`poll()\`, \`peek()\` (non-throwing).
- \`PriorityQueue\` uses a binary min-heap (O(log n) insertion).
- \`ArrayDeque\` implements double-ended queue.
- \`ArrayDeque\` is preferred over legacy \`Stack\` and \`LinkedList\`.`
  },
  {
    topicId: 151,
    slug: 'map-interface-hashmap-treemap',
    title: 'Map Interface (HashMap, LinkedHashMap, TreeMap, Hashtable)',
    definition: `- **Map Interface (\`java.util.Map\`)**: An object that maps unique keys to values. A map cannot contain duplicate keys; each key maps to at most one value.
- **The 4 Primary Implementations**:
  1. **\`HashMap\`**: Unordered, unsorted, based on hash table; permits one \`null\` key and multiple \`null\` values; O(1) average lookup.
  2. **\`LinkedHashMap\`**: Maintains predictable **insertion order** (or access order for LRU caches) via doubly linked list.
  3. **\`TreeMap\`**: Red-Black tree; sorted by key in natural ascending order or custom \`Comparator\`; O(log n); prohibits \`null\` keys.
  4. **\`Hashtable\`**: Legacy synchronized class; thread-safe with high lock contention; permits NO null keys or null values (superseded by \`ConcurrentHashMap\`).`,
    importantDifferences: `| Feature | HashMap | LinkedHashMap | TreeMap | ConcurrentHashMap |
|---|---|---|---|---|
| **Ordering** | Unordered | Insertion / Access order | Sorted by Key | Unordered |
| **Time Complexity** | O(1) average | O(1) average | O(log n) guaranteed | O(1) average |
| **Null Key Allowed?** | YES (1 null key) | YES (1 null key) | **NO** (Throws NPE) | **NO** (Throws NPE) |
| **Null Value Allowed?**| YES (Multiple) | YES (Multiple) | YES (Multiple) | **NO** (Throws NPE) |
| **Thread Safety** | Not Thread-Safe | Not Thread-Safe | Not Thread-Safe | Thread-Safe (Segment locks / CAS) |`,
    javaCodeExamples: `import java.util.*;

public class MapComparisonDemo {
    public static void main(String[] args) {
        // 1. HashMap: Fast O(1), no ordering
        Map<String, Integer> map = new HashMap<>();
        map.put("Zebra", 10);
        map.put("Ant", 50);
        map.put("Monkey", 25);
        System.out.println("HashMap: " + map);

        // 2. TreeMap: Sorted keys
        Map<String, Integer> treeMap = new TreeMap<>(map);
        System.out.println("TreeMap (sorted keys): " + treeMap);

        // Map Iteration best practice: entrySet()
        for (Map.Entry<String, Integer> entry : treeMap.entrySet()) {
            System.out.println("Key: " + entry.getKey() + " -> Value: " + entry.getValue());
        }
    }
}`,
    outputExplanation: `- Illustrates key sorting in \`TreeMap\` and demonstrates optimal map iteration using \`entrySet()\`.`,
    interviewReadyAnswer: `- "HashMap offers O(1) operations with no ordering; LinkedHashMap preserves insertion order; TreeMap maintains sorted keys in O(log n) time via a Red-Black tree."
- "Hashtable is obsolete; use ConcurrentHashMap for concurrent thread-safe scenarios."`,
    quickRevisionPoints: `- \`HashMap\` = O(1), allows 1 null key.
- \`LinkedHashMap\` = preserves insertion or LRU access order.
- \`TreeMap\` = O(log n), keys sorted, NO null keys.
- Prefer \`entrySet()\` over \`keySet()\` for loop performance.`
  },
  {
    topicId: 152,
    slug: 'hashmap-internal-working-deepdive',
    title: 'Internal Working of HashMap (Hashing, Buckets, Collisions, Treeification)',
    definition: `- **HashMap Internal Architecture**: Based on a **Hash Table** consisting of an array of \`Node<K, V>\` buckets (default capacity 16).
- **Core Parameters**:
  • **Initial Capacity**: Default is **16** (always a power of 2: $2^n$).
  • **Load Factor**: Default is **0.75** (threshold = $16 \times 0.75 = 12$). When bucket count exceeds threshold, capacity doubles to 32.
  • **Treeification Threshold**: When elements in a single bucket reach **8**, and total table capacity is at least **64**, the bucket converts from a linked list to a **Red-Black Tree** (\`TreeNode\`).
  • **Untreeification Threshold**: When nodes in a tree bucket decrease to **6**, it converts back to a linked list.`,
    simpleExplanation: `- **The Mailbox Room with Expanding Shelves**:
  • You have 16 mailboxes. You compute the mail address using a hash formula.
  • If two letters have different names but share the same mailbox number (hash collision), you hang them together on a paperclip chain (linked list).
  • If one mailbox receives 8 letters and the whole room has at least 64 boxes, you replace the messy paperclip chain with an organized indexed card catalog (Red-Black Tree) so you can search letters in O(log n) time instead of O(n).`,
    howItWorks: `- **1. Computing Hash**: Applies secondary bit-shifting hash function to minimize collisions:
  \`int hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);\`.
- **2. Index Calculation**: Uses bitwise AND instead of expensive modulo division:
  \`index = (n - 1) & hash\` (works because array capacity $n$ is always a power of 2!).
- **3. Collision Handling**:
  • Pre-Java 8: Handled purely via singly linked lists. Worst-case lookup: **O(n)**.
  • Java 8+: When linked list length reaches **8** and table capacity is $\ge 64$, converts to a balanced **Red-Black Tree**, reducing worst-case search from **O(n)** to **O(log n)**.`,
    javaCodeExamples: `public class HashMapInternalsSimulation {
    public static void main(String[] args) {
        // Simulating hash and bucket index calculation
        String key = "interview";
        int capacity = 16;

        // 1. Key hashCode
        int h = key.hashCode();

        // 2. Java 8 secondary hash spread
        int hash = h ^ (h >>> 16);

        // 3. Bucket index calculation: (n - 1) & hash
        int index = (capacity - 1) & hash;

        System.out.println("Key: " + key);
        System.out.println("HashCode: " + h);
        System.out.println("Bitwise Index for capacity " + capacity + ": " + index);
    }
}`,
    outputExplanation: `- Illustrates how HashMap computes the target bucket array slot in single CPU cycles via bitwise operations.`,
    interviewReadyAnswer: `- "HashMap uses an array of Node buckets with default capacity 16 and load factor 0.75. Bucket indices are calculated via (n - 1) & hash."
- "Collisions link nodes in a list. In Java 8, when a bucket exceeds 8 nodes and capacity is >= 64, it treeifies into a Red-Black Tree, improving lookup from O(n) to O(log n)."`,
    quickRevisionPoints: `- Default capacity = 16 (power of 2); Load factor = 0.75.
- Index formula = \`(n - 1) & hash\`.
- Treeification threshold = 8 (with capacity $\ge 64$).
- Untreeification threshold = 6.
- Reduces worst-case lookup from O(n) to O(log n).`
  },
  {
    topicId: 153,
    slug: 'generics-collections-type-safety',
    title: 'Generics in Java Collections & Type Safety',
    definition: `- **Generics (Java 5+)**: A language feature that allows types (classes and interfaces) to be parameters when defining classes, interfaces, and methods.
- **Core Purpose**: Provides **Compile-Time Type Safety**, eliminating manual type casting and preventing runtime \`ClassCastException\`.
- **Type Erasure**: The compiler enforces type safety during compilation and then **erases (removes)** all generic type parameters from bytecode for backward compatibility with pre-Java 5 JVMs.`,
    simpleExplanation: `- **Locker Label Analogy**:
  • Without Generics: A locker labeled "Stuff" (\`List\`). You can throw shoes, sandwiches, and books inside. When you pull out an item blindfolded and assume it's a sandwich, biting into a shoe causes a \`ClassCastException\`.
  • With Generics: The locker is labeled "Sandwiches Only" (\`List<Sandwich>\`). The compiler stands guard at the door and rejects shoes at compile time.`,
    importantConcepts: `- **Bounded Type Parameters & Wildcards**:
  • **Upper Bounded Wildcard (\`? extends Number\`)**: Producer Extends (read-only; allows any subtype of Number).
  • **Lower Bounded Wildcard (\`? super Integer\`)**: Consumer Super (write-friendly; allows Integer or its superclasses).
  • **PECS Principle**: **"Producer Extends, Consumer Super"**.`,
    javaCodeExamples: `import java.util.ArrayList;
import java.util.List;

public class GenericsDemo {
    // PECS: Producer Extends - reading numbers safely
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        // Compile-time type safety: no casting needed
        List<String> names = new ArrayList<>();
        names.add("Alice");
        // names.add(100); // COMPILE ERROR! Rejected immediately.
        String first = names.get(0); // No manual (String) casting required

        List<Integer> ints = List.of(10, 20, 30);
        System.out.println("Sum of ints: " + sumOfList(ints));
    }
}`,
    outputExplanation: `- Illustrates how generics guarantee type safety at compile time and demonstrates upper-bounded wildcards using PECS.`,
    interviewReadyAnswer: `- "Generics provide compile-time type safety and eliminate explicit type casting by parametrizing types."
- "Due to Type Erasure, generic types are removed at runtime. The PECS rule (Producer Extends, Consumer Super) governs wildcard usage."`,
    quickRevisionPoints: `- Introduced in Java 5.
- Catches type mismatches at compile time.
- Type Erasure removes generic type arguments from bytecode.
- PECS: Producer Extends, Consumer Super.`
  },
  {
    topicId: 154,
    slug: 'comparable-vs-comparator-sorting',
    title: 'Comparable vs Comparator for Custom Sorting',
    definition: `- **Comparable (\`java.lang.Comparable<T>\`)**: Implemented by a class to define its **Natural Ordering** via the single method \`int compareTo(T o)\`.
- **Comparator (\`java.util.Comparator<T>\`)**: A standalone interface used to define **Multiple / Custom Orderings** externally via \`int compare(T o1, T o2)\`.`,
    importantDifferences: `| Dimension | Comparable Interface | Comparator Interface |
|---|---|---|
| **Package** | \`java.lang\` | \`java.util\` |
| **Method to Implement** | \`int compareTo(T o)\` | \`int compare(T o1, T o2)\` |
| **Number of Sorts** | Single (Defines default Natural Ordering) | Multiple (Defines custom sorting sequences) |
| **Class Modification** | Must modify source code of the class | No modification required (external comparator) |
| **Sorting Invocations** | \`Collections.sort(list)\` | \`Collections.sort(list, comparator)\` or \`list.sort(comparator)\` |
| **Lambda Support** | Single method; rarely used as lambda | Functional interface; perfect for lambdas & chaining |`,
    javaCodeExamples: `import java.util.*;

class Employee implements Comparable<Employee> {
    int id;
    String name;
    double salary;

    public Employee(int id, String name, double salary) {
        this.id = id; this.name = name; this.salary = salary;
    }

    // Natural ordering: sorted by ID ascending
    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() { return name + " ($" + salary + ")"; }
}

public class ComparableComparatorDemo {
    public static void main(String[] args) {
        List<Employee> list = new ArrayList<>(Arrays.asList(
            new Employee(103, "Charlie", 70000),
            new Employee(101, "Alice", 90000),
            new Employee(102, "Bob", 60000)
        ));

        // 1. Natural Sort via Comparable (by ID)
        Collections.sort(list);
        System.out.println("Sorted by Natural ID: " + list);

        // 2. Custom Sort via Comparator lambda (by Salary descending)
        list.sort(Comparator.comparingDouble((Employee e) -> e.salary).reversed());
        System.out.println("Sorted by Salary Descending: " + list);
    }
}`,
    outputExplanation: `- Shows \`Comparable\` providing intrinsic ID ordering and \`Comparator\` supplying flexible external salary sorting.`,
    interviewReadyAnswer: `- "Comparable in java.lang defines natural ordering by implementing compareTo(obj) inside the class."
- "Comparator in java.util defines multiple external sorting strategies via compare(o1, o2) and chaining methods without modifying the target class."`,
    quickRevisionPoints: `- Comparable: \`java.lang\`, \`compareTo(o)\`, single natural ordering.
- Comparator: \`java.util\`, \`compare(o1, o2)\`, multiple custom orderings.
- Use Comparator when class source cannot be edited.
- Modern Comparator supports chaining: \`.thenComparing()\`.`
  }
];

