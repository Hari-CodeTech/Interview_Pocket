// Module 9: Advanced OOP Concepts (Topics 98-108)

module.exports = [
  {
    topicId: 98,
    slug: 'method-overriding-rules',
    title: 'Method Overriding & Rules for Overriding',
    definition: `- **Definition**: **Method Overriding** occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.
- **Purpose**: Enables runtime polymorphism, allowing subclasses to redefine or tailor behaviors while preserving a uniform API interface.
- **The \`@Override\` Annotation**: Informs the compiler of the overriding intent; produces a compilation error if no matching superclass method is found.`,
    simpleExplanation: `- **The Animal Speech Analogy**: A generic \`Animal\` superclass declares a \`makeSound()\` method. A \`Dog\` subclass overrides it to bark ("Woof!"), while a \`Cat\` subclass overrides it to meow ("Meow!"). The caller simply asks any animal to make sound, and the specific subclass responds in its unique way.`,
    whyNeeded: `- **Behavioral Specialization**: Superclasses define generic contracts; subclasses provide domain-specific execution.
- **Open-Closed Principle (OCP)**: Software entities should be open for extension (new subclasses overriding behavior) but closed for modification.`,
    howItWorks: `- When a method is called on a reference:
  1. The compiler verifies that the method signature exists in the reference type.
  2. At runtime, the JVM inspects the actual object type in Heap memory using its virtual method table (vtable).
  3. The JVM invokes the subclass's overridden implementation instead of the superclass method.`,
    syntax: `class Parent {
    void display() { System.out.println("Parent"); }
}
class Child extends Parent {
    @Override
    void display() { System.out.println("Child"); }
}`,
    importantConcepts: `- **Strict Overriding Rules (JLS)**:
  1. **Method Signature**: Method name, parameter types, and parameter order must be identical.
  2. **Return Type**: Must be identical OR a **covariant return type** (subclass of the superclass return type).
  3. **Access Modifiers**: Cannot assign weaker access privileges (e.g. \`protected\` can become \`public\`, but \`public\` cannot become \`protected\`).
  4. **Exception Handling**: Overriding method cannot declare newer or broader checked exceptions than the overridden method (it can declare fewer, narrower checked exceptions, or any unchecked exceptions).
  5. **Non-Overridable Methods**:
     • \`private\` methods cannot be overridden (not visible in subclass).
     • \`static\` methods cannot be overridden (they undergo method hiding, bound at compile-time).
     • \`final\` methods cannot be overridden (marked immutable).
     • Constructors cannot be overridden (they are not inherited).`,
    javaCodeExamples: `class Vehicle {
    protected Vehicle startEngine() throws Exception {
        System.out.println("Vehicle engine started.");
        return this;
    }
}

class ElectricCar extends Vehicle {
    // Covariant return type (ElectricCar is a subtype of Vehicle)
    // Broader access modifier (public > protected)
    // Narrower checked exception (no exception thrown)
    @Override
    public ElectricCar startEngine() {
        System.out.println("Electric motor silently activated.");
        return this;
    }
}

public class OverridingDemo {
    public static void main(String[] args) {
        Vehicle myVehicle = new ElectricCar();
        // Dynamic dispatch: executes ElectricCar implementation
        try {
            myVehicle.startEngine();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
    outputExplanation: `- Output: \`Electric motor silently activated.\`
- Demonstrates dynamic method dispatch and covariant return types.`,
    commonMistakes: `- Changing parameter types: this creates an overload rather than an override.
- Attempting to override a \`static\` method expecting polymorphic behavior.
- Narrowing visibility (e.g., trying to override \`public void run()\` with \`void run()\` triggers compile error: "attempting to assign weaker access privileges").`,
    interviewReadyAnswer: `- "Method overriding allows a subclass to provide a specialized implementation of an inherited method with identical name and parameters."
- "Key rules: return type must be invariant or covariant; visibility cannot be reduced; checked exceptions cannot be broader; static, final, and private methods cannot be overridden."`,
    quickRevisionPoints: `- Subclass redefines superclass method with same signature.
- Covariant returns permitted (subtype of parent return type).
- Cannot reduce method visibility (private < default < protected < public).
- Static methods are hidden, not overridden.`
  },
  {
    topicId: 99,
    slug: 'method-overloading-vs-overriding',
    title: 'Method Overloading vs Method Overriding',
    definition: `- **Method Overloading**: Defining multiple methods within the same class with identical names but different parameter lists (Compile-Time Polymorphism).
- **Method Overriding**: Redefining an inherited superclass method inside a subclass with an identical signature (Runtime Polymorphism).`,
    simpleExplanation: `- **Overloading**: Like a power strip with ports for 2-prong plugs, 3-prong plugs, and USB cables. Same device name ("Charge"), but different inputs accepted.
- **Overriding**: Upgrading a thermostat in a home. The label "Set Temperature" stays identical, but the new smart thermostat adjusts heat differently from the old manual dial.`,
    importantDifferences: `| Feature | Method Overloading | Method Overriding |
|---|---|---|
| **Scope** | Within the same class | Between Superclass and Subclass |
| **Method Name** | Must be identical | Must be identical |
| **Parameter List** | Must be different (type, count, or order) | Must be identical |
| **Return Type** | Can be identical or different | Must be identical or covariant |
| **Access Modifiers** | Can be freely changed | Cannot assign weaker privileges |
| **Exception Thrown** | No restrictions | Cannot declare broader checked exceptions |
| **Binding Mechanism** | Early Binding (Compile-Time) | Late Binding (Runtime / Dynamic) |
| **Private/Static/Final** | Can be overloaded freely | Cannot be overridden |`,
    javaCodeExamples: `class Calculator {
    // Overloading: Same name, different parameter signatures
    public int multiply(int a, int b) { return a * b; }
    public double multiply(double a, double b) { return a * b; }
    public int multiply(int a, int b, int c) { return a * b * c; }
}

class SuperPrinter {
    public void print() { System.out.println("Generic Print"); }
}

class ModernPrinter extends SuperPrinter {
    // Overriding: Same signature in subclass
    @Override
    public void print() { System.out.println("High-Resolution Color Print"); }
}

public class ComparisonDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.multiply(4, 5));        // resolved at compile-time: 20
        System.out.println(calc.multiply(2.5, 4.0));    // resolved at compile-time: 10.0

        SuperPrinter p = new ModernPrinter();
        p.print(); // resolved at runtime: High-Resolution Color Print
    }
}`,
    outputExplanation: `- \`calc.multiply\` routes to specific overloaded methods based on argument types during compilation.
- \`p.print()\` routes to \`ModernPrinter.print()\` at runtime through dynamic dispatch.`,
    interviewReadyAnswer: `- "Method overloading is compile-time polymorphism within a single class where method signatures differ by arguments."
- "Method overriding is runtime polymorphism across an inheritance hierarchy where signature is identical and the subclass provides a specific implementation."`,
    quickRevisionPoints: `- Overloading: same class, different parameters, compile-time binding.
- Overriding: inheritance hierarchy, identical parameters, runtime dynamic dispatch.
- Overloading return type alone does NOT suffice.
- Overriding cannot restrict visibility or add broader checked exceptions.`
  },
  {
    topicId: 100,
    slug: 'dynamic-method-dispatch',
    title: 'Dynamic Method Dispatch (Runtime Polymorphism)',
    definition: `- **Dynamic Method Dispatch**: The mechanism by which a call to an overridden method is resolved at runtime rather than compile-time.
- **Core Engine of Runtime Polymorphism**: Allows Java to invoke the correct subclass method implementation using a superclass reference variable pointing to a subclass object.`,
    simpleExplanation: `- **The TV Remote Analogy**: The remote control has a universal "Power" button. When aimed at a Sony TV, it powers on Sony circuits. When aimed at a LG TV, it powers on LG circuits. The remote button is the superclass reference; the actual television in front is the heap object.`,
    whyNeeded: `- Decouples code from concrete implementations, supporting extensible architectures (e.g., dependency injection and plugin systems).
- Allows collections of diverse subclasses to be treated uniformly through their shared superclass interface.`,
    howItWorks: `- **1. Compile Time**: Compiler checks if the method exists in the **reference type** (left side of assignment).
- **2. Runtime**: When invoked, the JVM looks at the **actual object type** in Heap memory (right side of \`new\`).
- **3. Virtual Method Table (vtable)**: The JVM uses the object's class vtable pointer to find the target method address and executes the subclass code.`,
    syntax: `SuperClass ref = new SubClass();
ref.overriddenMethod(); // Executes SubClass implementation`,
    javaCodeExamples: `abstract class PaymentGateway {
    abstract void processPayment(double amount);
}

class PayPalGateway extends PaymentGateway {
    @Override
    void processPayment(double amount) {
        System.out.println("Processing $" + amount + " securely via PayPal API.");
    }
}

class StripeGateway extends PaymentGateway {
    @Override
    void processPayment(double amount) {
        System.out.println("Processing $" + amount + " through Stripe Credit Card Engine.");
    }
}

public class DynamicDispatchDemo {
    public static void main(String[] args) {
        // Polymorphic reference assignment
        PaymentGateway gateway;

        gateway = new PayPalGateway();
        gateway.processPayment(150.00); // Dispatches to PayPalGateway

        gateway = new StripeGateway();
        gateway.processPayment(320.50); // Dispatches to StripeGateway
    }
}`,
    outputExplanation: `- The variable \`gateway\` has type \`PaymentGateway\`, but dynamic dispatch ensures each call executes the appropriate concrete implementation at runtime.`,
    interviewReadyAnswer: `- "Dynamic Method Dispatch is the mechanism enabling runtime polymorphism in Java."
- "A superclass reference invokes an overridden method, and the JVM resolves the exact target implementation at runtime based on the actual object instantiated on the Heap."`,
    quickRevisionPoints: `- Reference type determines what methods can be called (compile-time).
- Object type determines which implementation executes (runtime).
- Implemented via JVM Virtual Method Tables (vtables).
- Does NOT apply to static methods, private methods, or member variables.`
  },
  {
    topicId: 101,
    slug: 'method-hiding-static-methods',
    title: 'Method Hiding & Static Method Binding',
    definition: `- **Method Hiding**: Occurs when a subclass declares a \`static\` method with the identical signature as a \`static\` method in its superclass.
- **Key Principle**: \`static\` methods belong to the **Class**, not the object instance. Therefore, they are bound at **compile-time (Early Binding / Static Binding)** based on the reference type, never through dynamic dispatch.`,
    simpleExplanation: `- Unlike instance methods where the actual car model decides how to drive, static methods are like reading the owner manual for the brand listed on your clipboard. If the clipboard says "Generic Vehicle", you read the generic manual, even if the car in front of you is a Ferrari.`,
    importantDifferences: `| Dimension | Method Overriding (Instance Methods) | Method Hiding (Static Methods) |
|---|---|---|
| **Modifier** | Non-static | \`static\` |
| **Binding Time** | Runtime (Late / Dynamic Binding) | Compile-time (Early / Static Binding) |
| **Resolution Criteria** | Actual Object in Heap | Reference Variable Type |
| **Polymorphism** | Achieves runtime polymorphism | No polymorphism; compile-time selection |
| **@Override Allowed?** | Yes, highly recommended | No; compiler will throw an error |`,
    javaCodeExamples: `class Parent {
    public static void identify() {
        System.out.println("Static method inside Parent");
    }
    public void describe() {
        System.out.println("Instance method inside Parent");
    }
}

class Child extends Parent {
    // Hiding: declares same static method
    public static void identify() {
        System.out.println("Static method inside Child");
    }
    // Overriding: overrides instance method
    @Override
    public void describe() {
        System.out.println("Instance method inside Child");
    }
}

public class MethodHidingDemo {
    public static void main(String[] args) {
        Parent ref = new Child();

        // 1. Static call: Early bound to Parent reference type!
        ref.identify(); // Outputs: Static method inside Parent

        // 2. Instance call: Dynamic dispatch to Child object!
        ref.describe(); // Outputs: Instance method inside Child

        // Proper invocation of static methods should use class names:
        Parent.identify(); // Parent
        Child.identify();  // Child
    }
}`,
    outputExplanation: `- \`ref.identify()\` outputs \`Parent\` because static methods bind to the reference type \`Parent\` during compilation.
- \`ref.describe()\` outputs \`Child\` because instance methods bind to the runtime object \`Child\` via dynamic dispatch.`,
    interviewReadyAnswer: `- "Method hiding happens when a subclass defines a static method with the exact signature of a superclass static method."
- "Because static methods belong to the class, the compiler binds the call based on the reference type, not the runtime object. Hence, static methods cannot be overridden."`,
    quickRevisionPoints: `- Static methods are hidden, never overridden.
- Method call resolved by reference type at compile-time.
- Variables are also hidden, never polymorphic.
- Always invoke static methods using the ClassName directly.`
  },
  {
    topicId: 102,
    slug: 'final-keyword-variables-methods-classes',
    title: 'final Keyword (Final Variables, Methods and Classes)',
    definition: `- **The \`final\` Keyword**: A non-access modifier in Java used to restrict modification and enforce immutability across three levels:
  1. **final Variable**: Value cannot be reassigned once initialized (Constant).
  2. **final Method**: Cannot be overridden by any subclass.
  3. **final Class**: Cannot be extended/subclassed by any class.`,
    simpleExplanation: `- **Final Variable**: Like engraving a stone tablet—once carved, the letters cannot be replaced.
- **Final Method**: Like the law of gravity—subclasses cannot rewrite the rule.
- **Final Class**: Like an only child without offspring—the family line terminates and cannot have child classes (e.g. \`java.lang.String\`).`,
    importantConcepts: `- **Final Reference vs Final Object**:
  • A \`final\` reference cannot be reassigned to point to another object on the Heap.
  • However, the internal state of the referenced object CAN still be mutated unless the object itself is immutable.
- **Blank Final Variable**:
  • An uninitialized final instance variable must be initialized in every constructor.
  • An uninitialized final static variable must be initialized in a static block.`,
    javaCodeExamples: `// 1. Final Class: Cannot be inherited
final class SecurityToken {
    // 2. Final Variable: Constant
    public final String tokenValue;

    public SecurityToken(String tokenValue) {
        this.tokenValue = tokenValue; // Initializing blank final
    }
}

class BaseService {
    // 3. Final Method: Cannot be overridden
    public final void logTransaction(String id) {
        System.out.println("Audit logged for: " + id);
    }
}

public class FinalKeywordDemo {
    public static void main(String[] args) {
        final StringBuilder sb = new StringBuilder("Interview");
        // sb = new StringBuilder("Other"); // COMPILE ERROR: Cannot reassign final reference!
        sb.append("Pocket"); // VALID: Mutating object internal state is allowed!
        System.out.println(sb); // InterviewPocket
    }
}`,
    outputExplanation: `- Final reference \`sb\` cannot point to another address, but its internal buffer can append characters.
- Classes like \`String\`, \`Integer\`, \`Math\` are declared \`final\` in Java for security, thread-safety, and caching.`,
    interviewReadyAnswer: `- "The final keyword restricts modification: final variables cannot be reassigned, final methods cannot be overridden, and final classes cannot be extended."
- "For reference variables, final makes the reference immutable, not the object's internal fields."`,
    quickRevisionPoints: `- Final variable = constant (single assignment).
- Final method = prevents overriding in subclasses.
- Final class = prevents inheritance (e.g. \`String\`).
- Final reference prevents reassignment, not object mutation.`
  },
  {
    topicId: 103,
    slug: 'object-type-casting-instanceof',
    title: 'Object Type Casting & instanceof Operator',
    definition: `- **Object Type Casting**: Converting a reference variable from one class type to another along an inheritance hierarchy.
  • **Upcasting**: Casting a subclass reference to a superclass type (Implicit, always safe).
  • **Downcasting**: Casting a superclass reference back to a subclass type (Explicit, potentially unsafe).
- **\`instanceof\` Operator**: A binary comparison operator that tests whether an object reference is an instance of a specified class, subclass, or interface.`,
    simpleExplanation: `- **Upcasting**: Looking at an iPhone and calling it a "Phone". Safe and natural because every iPhone is a Phone.
- **Downcasting**: Looking at an arbitrary box labeled "Phone" and assuming it contains an iPhone. Risky, because opening it might reveal an Android, throwing a \`ClassCastException\`!`,
    howItWorks: `- When downcasting, the JVM performs a runtime check.
- If the actual object on the heap is not compatible with the target type, the JVM throws **\`java.lang.ClassCastException\`**.
- Always guard downcasts with \`instanceof\` or use Java 16+ Pattern Matching for instanceof.`,
    syntax: `// Upcasting (Automatic)
Parent p = new Child();

// Downcasting with instanceof check
if (p instanceof Child) {
    Child c = (Child) p;
}

// Modern Pattern Matching (Java 16+)
if (p instanceof Child c) {
    c.specificChildMethod();
}`,
    javaCodeExamples: `class Shape {
    void draw() { System.out.println("Drawing generic shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing Circle"); }
    void calculateRadius() { System.out.println("Radius: 5.0 units"); }
}

public class TypeCastingDemo {
    public static void main(String[] args) {
        // Upcasting: implicit and safe
        Shape s = new Circle();
        s.draw(); // Dynamic dispatch: Drawing Circle

        // Downcasting safely using instanceof pattern matching
        if (s instanceof Circle c) {
            c.calculateRadius(); // Accessible after downcast
        }

        // Unsafe downcast demonstration
        Shape plainShape = new Shape();
        try {
            Circle invalidCircle = (Circle) plainShape; // ClassCastException!
        } catch (ClassCastException ex) {
            System.out.println("Caught expected ClassCastException: " + ex.getMessage());
        }
    }
}`,
    outputExplanation: `- Upcasting enables uniform polymorphic handling.
- Downcasting grants access to subclass-specific methods after validation.
- Unsafe downcasting triggers \`ClassCastException\` at runtime.`,
    interviewReadyAnswer: `- "Upcasting converts a child reference to a parent type automatically and safely for polymorphism."
- "Downcasting converts a parent reference back to a child type explicitly; it requires an instanceof check to avoid ClassCastException at runtime."`,
    quickRevisionPoints: `- Upcasting = Child -> Parent (Automatic, safe).
- Downcasting = Parent -> Child (Explicit, risky).
- \`instanceof\` returns true if the object is an instance or subtype.
- Java 16+ pattern matching eliminates redundant explicit cast statements.`
  },
  {
    topicId: 104,
    slug: 'object-class-equals-hashcode-tostring',
    title: 'java.lang.Object Class: equals(), hashCode(), and toString()',
    definition: `- **java.lang.Object**: The root superclass of all classes in Java. Every class directly or indirectly inherits from \`Object\`.
- **Key Methods**:
  • **\`toString()\`**: Returns a string representation of the object (default: \`ClassName@hexHashCode\`).
  • **\`equals(Object obj)\`**: Compares two objects for equality (default: reference equality \`==\`).
  • **\`hashCode()\`**: Returns an integer hash code representing the object's identity for hash-based data structures (like \`HashMap\` and \`HashSet\`).`,
    importantConcepts: `- **The equals() and hashCode() Contract**:
  1. **Consistency**: If \`a.equals(b) == true\`, then \`a.hashCode()\` MUST equal \`b.hashCode()\`.
  2. **Non-Guarantee of Inverse**: If two objects have the same hash code, they are NOT required to be equal (this is a hash collision).
  3. **Violation Consequence**: If you override \`equals()\` without overriding \`hashCode()\`, using the object as a key in a \`HashMap\` or \`HashSet\` will fail to retrieve values properly!`,
    javaCodeExamples: `import java.util.Objects;

class Student {
    private final int id;
    private final String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Meaningful String representation
    @Override
    public String toString() {
        return "Student[id=" + id + ", name='" + name + "']";
    }

    // Equality based on logical state, not memory reference
    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // reference check
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return id == student.id && Objects.equals(name, student.name);
    }

    // Must match equals contract
    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}

public class ObjectMethodsDemo {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Alice");
        Student s2 = new Student(101, "Alice");

        System.out.println("toString: " + s1);
        System.out.println("s1 == s2: " + (s1 == s2));           // false (different heap addresses)
        System.out.println("s1.equals(s2): " + s1.equals(s2)); // true (logical equality)
        System.out.println("Hash codes match: " + (s1.hashCode() == s2.hashCode())); // true
    }
}`,
    outputExplanation: `- Overriding \`toString()\` produces readable diagnostic logs.
- Overriding both \`equals()\` and \`hashCode()\` guarantees accurate storage and retrieval in hash tables.`,
    interviewReadyAnswer: `- "The Object class is the universal root of Java's class hierarchy."
- "The equals-hashCode contract mandates that if two objects are equal according to equals(), they must produce identical hashCodes to ensure correct behavior in collections like HashMap and HashSet."`,
    quickRevisionPoints: `- \`Object\` is the root class of all Java objects.
- Default \`equals()\` checks reference equality (\`==\`).
- If you override \`equals()\`, you MUST override \`hashCode()\`.
- Equal objects must return identical hash codes.`
  },
  {
    topicId: 105,
    slug: 'relationships-isa-hasa-composition',
    title: 'Object Relationships: IS-A vs HAS-A (Aggregation & Composition)',
    definition: `- **IS-A Relationship (Inheritance)**: Represents a direct generalization/specialization hierarchy established via \`extends\` or \`implements\` (e.g. A \`Car\` IS-A \`Vehicle\`).
- **HAS-A Relationship (Association)**: Represents a containment or ownership relationship where one class holds a reference to another class:
  • **Aggregation (Weak HAS-A)**: Both objects have independent lifecycles (e.g., A \`Department\` has \`Professors\`; if the department closes, professors still exist).
  • **Composition (Strong HAS-A)**: Child object's lifecycle strictly depends on parent object (e.g., A \`House\` has \`Rooms\`; if the house is demolished, the rooms cease to exist).`,
    importantDifferences: `| Dimension | Inheritance (IS-A) | Composition (HAS-A) |
|---|---|---|
| **Mechanism** | \`extends\` / \`implements\` | Storing reference to another object as a field |
| **Coupling** | Tight coupling; changes in parent ripple down | Loose coupling; internal details encapsulated |
| **Flexibility** | Static (fixed at compile time) | Dynamic (can change behavior at runtime) |
| **Design Principle** | Reuse only when true subtyping exists | **"Favor Composition over Inheritance"** |`,
    javaCodeExamples: `// Engine: component
class Engine {
    void start() { System.out.println("Engine roaring."); }
}

// Composition: Car owns Engine strictly (strong HAS-A)
class Car {
    private final Engine engine; // Car HAS-A Engine

    public Car() {
        this.engine = new Engine(); // Created inside, lifecycle tied to Car
    }

    public void drive() {
        engine.start();
        System.out.println("Car is moving smoothly.");
    }
}

public class RelationshipDemo {
    public static void main(String[] args) {
        Car car = new Car();
        car.drive();
    }
}`,
    outputExplanation: `- Demonstrates composition where \`Car\` encapsulates an \`Engine\`, maintaining loose coupling and independent testing capabilities.`,
    interviewReadyAnswer: `- "IS-A represents inheritance (Car is a Vehicle), creating tight coupling."
- "HAS-A represents association (Car has an Engine). It splits into Aggregation (independent lifecycles) and Composition (dependent lifecycles). Effective design favors composition over inheritance for flexibility."`,
    quickRevisionPoints: `- IS-A = Inheritance (\`extends\`).
- HAS-A = Association (\`holds reference\`).
- Aggregation = Weak association (independent lifecycles).
- Composition = Strong association (child destroyed with parent).
- Favor composition over inheritance.`
  },
  {
    topicId: 106,
    slug: 'abstract-classes-and-methods',
    title: 'Abstract Classes & Abstract Methods',
    definition: `- **Abstract Class**: A class declared with the \`abstract\` keyword that cannot be instantiated directly with \`new\`. It serves as a base class containing common state and behavior.
- **Abstract Method**: A method signature declared without a body (\`;\` instead of \`{}\`) using the \`abstract\` keyword. Subclasses MUST override and implement all inherited abstract methods unless the subclass is also abstract.`,
    simpleExplanation: `- **The Construction Permit Blueprint**: An architect draws a blueprint for a generic "Commercial Building" specifying that every building must have a "Fire Exit" and "Electrical Room", but cannot construct a generic building on land. The concrete contractor (Subclass: Hospital or Mall) builds the actual building and constructs the fire exit to code.`,
    importantConcepts: `- **Rules for Abstract Classes**:
  1. Cannot be instantiated directly (\`new AbstractClass()\` is illegal).
  2. Can contain both abstract methods AND fully concrete methods with implementations.
  3. Can declare constructors, instance variables, and static methods.
  4. Abstract constructors are executed via \`super()\` when a concrete subclass is instantiated.
  5. If a class has at least one abstract method, the class ITSELF must be declared \`abstract\`.`,
    javaCodeExamples: `abstract class BankAccount {
    protected String accountNo;
    protected double balance;

    // Abstract constructor: runs when subclass initializes
    public BankAccount(String accountNo, double balance) {
        this.accountNo = accountNo;
        this.balance = balance;
    }

    // Concrete method: shared implementation
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited $" + amount + ". New balance: $" + balance);
    }

    // Abstract method: forces subclass-specific business logic
    public abstract void applyInterest();
}

class SavingsAccount extends BankAccount {
    public SavingsAccount(String accountNo, double balance) {
        super(accountNo, balance);
    }

    @Override
    public void applyInterest() {
        double interest = balance * 0.04;
        balance += interest;
        System.out.println("Savings 4% interest added: $" + interest + ". Total: $" + balance);
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        // BankAccount acc = new BankAccount("A1", 100); // COMPILE ERROR!
        BankAccount savings = new SavingsAccount("SA-1002", 5000);
        savings.deposit(1000);
        savings.applyInterest();
    }
}`,
    outputExplanation: `- Abstract class cannot be instantiated directly, but enforces method implementation on concrete subclasses while sharing common fields and methods.`,
    interviewReadyAnswer: `- "An abstract class is a restricted class that cannot be instantiated and can contain abstract and non-abstract methods."
- "It is used when multiple related classes share common code and state, but require subclasses to supply specialized implementations for abstract operations."`,
    quickRevisionPoints: `- Declared with \`abstract\` keyword; cannot be instantiated with \`new\`.
- Can have abstract and concrete methods, constructors, and instance variables.
- Subclasses must implement all abstract methods or be declared abstract themselves.
- Constructors are invoked via \`super()\` during subclass instantiation.`
  },
  {
    topicId: 107,
    slug: 'interfaces-in-java-characteristics',
    title: 'Interfaces in Java & Characteristics of Interfaces',
    definition: `- **Interface**: A reference type in Java that establishes a strict 100% abstract contract of what a class should do, without specifying how (prior to Java 8).
- **Core Purpose**: Enables total abstraction, loose coupling, and solves the multiple inheritance limitation of classes.`,
    simpleExplanation: `- **The Universal USB-C Standard**: The USB Implementers Forum designs an interface specification: "Any connector following this shape must transmit data and power." Samsung, Apple, and Dell implement this interface in their chargers. As long as your laptop implements the USB-C port, any USB-C charger works interchangeably.`,
    importantConcepts: `- **Default Modifiers inside Interfaces**:
  • **Fields**: Are implicitly **\`public static final\`** (Constants).
  • **Methods (Pre-Java 8)**: Are implicitly **\`public abstract\`**.
  • **Java 8+ Additions**: Can contain **\`default\`** methods (with body) and **\`static\`** utility methods.
  • **Java 9+ Additions**: Can contain **\`private\`** and **\`private static\`** methods for internal code reuse.
- **Multiple Inheritance**: A Java class can implement multiple interfaces simultaneously (\`class C implements A, B\`).`,
    javaCodeExamples: `interface CloudStorage {
    // Implicitly: public static final int MAX_FILE_SIZE_MB = 100;
    int MAX_FILE_SIZE_MB = 100;

    // Implicitly: public abstract void uploadFile(String fileName);
    void uploadFile(String fileName);

    // Java 8 default method: backward compatibility
    default void logAudit(String user) {
        System.out.println("Audit log: " + user + " accessed cloud storage.");
    }
}

class AWSStorage implements CloudStorage {
    @Override
    public void uploadFile(String fileName) {
        System.out.println("Uploading " + fileName + " to AWS S3 bucket (Limit: " + MAX_FILE_SIZE_MB + "MB).");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        CloudStorage storage = new AWSStorage();
        storage.uploadFile("quarterly_report.pdf");
        storage.logAudit("admin_user");
    }
}`,
    outputExplanation: `- Interface variables are static constants; methods are public contracts implemented by concrete classes.`,
    interviewReadyAnswer: `- "An interface is a blueprint of a class containing abstract methods and constants, achieving 100% abstraction and multiple inheritance."
- "Since Java 8, interfaces also support default and static methods, and Java 9 added private helper methods."`,
    quickRevisionPoints: `- Interface methods are implicitly \`public abstract\` (unless default/static).
- Interface fields are implicitly \`public static final\`.
- A class can implement multiple interfaces.
- Modern interfaces allow default methods (Java 8+) and private methods (Java 9+).`
  },
  {
    topicId: 108,
    slug: 'interface-vs-abstract-class',
    title: 'Interface vs Abstract Class (Architectural Comparison)',
    definition: `- **Abstract Class vs Interface**: Two core abstraction mechanisms in Java designed for distinct architectural roles:
  • **Abstract Class**: Defines an identity-based hierarchy ("IS-A") with shared state and constructors.
  • **Interface**: Defines capability or peripheral contract ("CAN-DO") across unrelated classes without shared mutable state.`,
    importantDifferences: `| Dimension | Abstract Class | Interface |
|---|---|---|
| **Inheritance Support** | Single class inheritance (\`extends\`) | Multiple interface inheritance (\`implements\`) |
| **State / Variables** | Can have instance variables, final, and non-final fields | Only \`public static final\` constants |
| **Constructors** | Supported (called via \`super()\`) | No constructors allowed |
| **Method Implementation** | Can have any mix of abstract and concrete methods | Abstract by default; can have \`default\` and \`static\` (Java 8+), \`private\` (Java 9+) |
| **Speed / Performance** | Faster; direct virtual method lookup | Slightly slower; dynamic search across interface tables (itable) |
| **Relationship** | IS-A relationship (e.g., Dog is an Animal) | CAN-DO capability (e.g., Bird, Airplane can Fly -> \`Flyable\`) |
| **Access Modifiers** | Can have \`private\`, \`protected\`, and \`public\` members | All members are \`public\` by default |`,
    javaCodeExamples: `// 1. CAN-DO Capability Interface
interface Flyable {
    void fly();
}

// 2. IS-A Identity Abstract Class
abstract class Bird {
    String species;
    public Bird(String species) { this.species = species; }
    void breathe() { System.out.println(species + " is breathing oxygen."); }
}

// Sparrow IS-A Bird and CAN-DO Flyable
class Sparrow extends Bird implements Flyable {
    public Sparrow() { super("House Sparrow"); }

    @Override
    public void fly() {
        System.out.println(species + " is flying high in the sky!");
    }
}

public class ComparisonDemo {
    public static void main(String[] args) {
        Sparrow s = new Sparrow();
        s.breathe();
        s.fly();
    }
}`,
    outputExplanation: `- Sparrow inherits shared biological state (\`species\`, \`breathe\`) from \`Bird\` and fulfills the flight capability contract via \`Flyable\`.`,
    interviewReadyAnswer: `- "Use an abstract class when classes share code, state, or constructors in a strict IS-A hierarchy."
- "Use an interface to define a common capability contract across unrelated classes or to enable multiple inheritance of behavior."`,
    quickRevisionPoints: `- Abstract class = IS-A, has constructors and instance state, single inheritance.
- Interface = CAN-DO, no constructors, only constants and public contracts, multiple inheritance.
- Prefer interfaces for APIs and loose coupling.`
  }
];

