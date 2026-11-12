// Module 8: Object-Oriented Programming (OOP) (Topics 92-97)

module.exports = [
  {
    topicId: 92,
    slug: 'introduction-to-oop',
    title: 'Introduction to Object-Oriented Programming (OOP)',
    definition: `- **Definition**: **Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of **Objects** containing data (fields/attributes) and code (methods/behaviors).
- **The 4 Foundational Pillars**:
  1. **Encapsulation**: Bundling data and methods into a single unit and restricting direct access to internal state.
  2. **Inheritance**: Enabling a new class to acquire properties and behaviors of an existing class (Code reuse).
  3. **Polymorphism**: The ability of an entity to take on multiple forms (Compile-time overloading and runtime overriding).
  4. **Abstraction**: Hiding internal implementation complexity and exposing only essential functional interfaces.`,
    simpleExplanation: `- **The Automobile Analogy**:
  • **Encapsulation**: The internal engine and transmission are sealed under the hood; you cannot tamper with spark plugs while driving.
  • **Inheritance**: A Tesla Model 3 inherits wheels, headlights, and brakes from the generic Vehicle blueprint.
  • **Polymorphism**: Pressing the accelerator pedal makes an electric car spin a motor and a gas car inject fuel, but the driver calls the same pedal action.
  • **Abstraction**: You steer the wheel and press the pedals without needing to know fuel-injection physics or battery chemistry.`,
    importantDifferences: `| Dimension | Procedural Programming (C, Pascal) | Object-Oriented Programming (Java, C++) |
|---|---|---|
| **Primary Focus** | Step-by-step algorithms and functions | Objects modeling real-world data and behavior |
| **Data Security** | Low; data moves freely across functions | High; data is encapsulated inside private classes |
| **Code Reusability** | Limited (copy-pasting or function calls) | High (Inheritance, Polymorphism, Composition) |
| **Approach** | Top-down decomposition | Bottom-up design |`,
    javaCodeExamples: `// Modeling an OOP entity
public class OopPillarsDemo {
    // Encapsulation: Private state
    private String model;
    private int speed;

    public OopPillarsDemo(String model) {
        this.model = model;
        this.speed = 0;
    }

    // Abstraction & Behavior
    public void accelerate(int delta) {
        if (delta > 0) this.speed += delta;
        System.out.println(model + " accelerating. Current speed: " + speed + " km/h");
    }

    public static void main(String[] args) {
        OopPillarsDemo car = new OopPillarsDemo("Tesla Model S");
        car.accelerate(40);
    }
}`,
    outputExplanation: `- Demonstrates an encapsulated object maintaining internal state and exposing validated public behavior.`,
    interviewReadyAnswer: `- "OOP is a paradigm organizing software around objects modeling state and behavior via four pillars: Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (multiple forms), and Abstraction (complexity hiding)."
- "It provides modularity, security, and maintainability for large-scale enterprise systems."`,
    quickRevisionPoints: `- 4 Pillars: Encapsulation, Inheritance, Polymorphism, Abstraction.
- Contrasts with procedural languages by prioritizing data security and modularity.
- Objects combine state (fields) and behavior (methods).`
  },
  {
    topicId: 93,
    slug: 'classes-and-objects-in-java',
    title: 'Classes and Objects in Java',
    definition: `- **Class**: A user-defined template or **blueprint** from which individual objects are instantiated. It defines the state (fields) and behaviors (methods) common to all objects of its type.
- **Object**: An identifiable runtime **instance** of a class created on the JVM Heap with a distinct memory footprint, state, and identity.`,
    simpleExplanation: `- **The Architectural Blueprint Analogy**:
  • The **Class** is the architect's paper blueprint of a 3-bedroom house. It occupies no real estate on the ground.
  • The **Object** is the actual physical house built on Maple Street using concrete and timber. You can build 50 physical houses (objects) from one single blueprint (class).`,
    syntax: `// Class Blueprint
class Car {
    String color; // State (Field)
    void drive() { ... } // Behavior (Method)
}

// Object Instantiation
Car myCar = new Car();`,
    importantConcepts: `- **The \`new\` Keyword Lifecycle**:
  1. Computes byte size required for object fields.
  2. Allocates memory block on the **JVM Heap**.
  3. Initializes fields to default values (0, false, null).
  4. Invokes constructor to perform custom initialization.
  5. Returns memory address reference, stored in stack reference variable.
- **Anonymous Objects**:
  • Objects instantiated without assigning to a reference: \`new BankAccount().checkBalance();\`. Eligible for immediate GC after the line executes.`,
    javaCodeExamples: `class BankAccount {
    String accountHolder;
    double balance;

    void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited $" + amount + " to " + accountHolder + ". Balance: $" + balance);
    }
}

public class ClassAndObjectDemo {
    public static void main(String[] args) {
        // Blueprint 'BankAccount' instantiated into 2 distinct Heap objects
        BankAccount acc1 = new BankAccount();
        acc1.accountHolder = "Alice";
        acc1.deposit(500.0);

        BankAccount acc2 = new BankAccount();
        acc2.accountHolder = "Bob";
        acc2.deposit(1200.0);

        System.out.println("Are acc1 and acc2 distinct? " + (acc1 != acc2)); // true
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Deposited $500.0 to Alice. Balance: $500.0
  Deposited $1200.0 to Bob. Balance: $1200.0
  Are acc1 and acc2 distinct? true
  \`\`\`
- Proves \`acc1\` and \`acc2\` have completely independent states on the Heap.`,
    interviewReadyAnswer: `- "A class is an abstract blueprint declaring fields and methods; an object is a concrete runtime instance allocated on the Heap."
- "The 'new' keyword dynamically allocates memory, invokes the constructor, and returns an object reference."`,
    quickRevisionPoints: `- Class: Blueprint (no heap memory).
- Object: Runtime instance on Heap.
- Created via \`new ClassName()\`.
- Each object has independent state.`
  },
  {
    topicId: 94,
    slug: 'encapsulation-data-hiding',
    title: 'Encapsulation & Data Hiding (JavaBeans, Getters/Setters)',
    definition: `- **Definition**: **Encapsulation** is the mechanism of wrapping data (variables) and code acting on the data (methods) together as a single unit, while **restricting direct access** to components from outside the class (**Data Hiding**).
- **How Achieved in Java**:
  1. Declare class fields as **\`private\`**.
  2. Provide **\`public\` getter and setter methods** to inspect and modify fields with validation logic.`,
    simpleExplanation: `- **The ATM Analogy**: A bank customer cannot walk into the bank vault and grab cash directly (no public access to fields). Instead, they insert a card into an ATM machine (public setter/getter), which validates PIN credentials and daily limits before dispensing money.`,
    whyNeeded: `- **Validation & Integrity**: Prevents corrupted states (e.g. \`age = -500\` or \`balance = -99999\`).
- **Flexibility & Maintainability**: Internal implementation can be changed (e.g. changing storage from double to BigDecimal) without breaking any external client code.
- **Read-Only / Write-Only Classes**: Omitting setters creates a read-only immutable object; omitting getters creates a write-only log sink.`,
    javaCodeExamples: `// A fully encapsulated JavaBean model
public class EmployeeBean {
    private String id;
    private double salary;

    public EmployeeBean(String id, double salary) {
        this.id = id;
        setSalary(salary); // Validates via setter
    }

    public String getId() {
        return id;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative!");
        }
        this.salary = salary;
    }

    public static void main(String[] args) {
        EmployeeBean emp = new EmployeeBean("EMP-101", 75000);
        System.out.println("Employee " + emp.getId() + " Salary: $" + emp.getSalary());

        try {
            emp.setSalary(-1000); // Trigger validation protection
        } catch (IllegalArgumentException ex) {
            System.out.println("Validation Guard Activated: " + ex.getMessage());
        }
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Employee EMP-101 Salary: $75000.0
  Validation Guard Activated: Salary cannot be negative!
  \`\`\`
- Proves encapsulated setter prevented the object from entering an illegal negative state.`,
    interviewReadyAnswer: `- "Encapsulation binds data and behavior while hiding internal fields behind private access modifiers and public getters/setters."
- "It guarantees data integrity through validation, increases security, and supports loose coupling by decoupling client code from internal data structures."`,
    quickRevisionPoints: `- Fields \`private\`; getters/setters \`public\`.
- Enforces validation and data integrity.
- Supports read-only (getter only) and write-only (setter only).
- Foundational to JavaBean and DTO architectures.`
  },
  {
    topicId: 95,
    slug: 'inheritance-in-java-types',
    title: 'Inheritance in Java (IS-A Relationship & Types)',
    definition: `- **Definition**: **Inheritance** is an OOP mechanism where a new class (**subclass / child class**) derives fields and methods from an existing class (**superclass / parent class**) using the **\`extends\`** keyword.
- **Relationship Type**: Models the **IS-A Relationship** (e.g., A \`Dog\` IS-A \`Animal\`; a \`Car\` IS-A \`Vehicle\`).`,
    importantConcepts: `- **Types of Inheritance in Java**:
  • **1. Single Inheritance**: One child class extends one parent class (\`B extends A\`).
  • **2. Multilevel Inheritance**: A chain of inheritance (\`C extends B\`, \`B extends A\`).
  • **3. Hierarchical Inheritance**: Multiple child classes extend a single parent class (\`B extends A\`, \`C extends A\`).
  • **4. Multiple Inheritance (With Classes)**: **NOT supported in Java**! A class cannot extend more than one class.
  • **5. Hybrid Inheritance (With Classes)**: Not supported directly with classes; achieved through **Interfaces**.
- **Why Java Disallows Multiple Class Inheritance (The Diamond Problem)**:
  • If class \`D\` extends both class \`B\` and class \`C\`, and both \`B\` and \`C\` override method \`run()\` from class \`A\`, which version should \`D\` inherit?
  • This ambiguity is called the **Deadly Diamond of Death**. Java completely eliminated this by enforcing single class inheritance.`,
    javaCodeExamples: `class Vehicle {
    protected String brand = "Generic Vehicle";
    public void start() {
        System.out.println("Vehicle engine started.");
    }
}

// Single Inheritance: Car IS-A Vehicle
class ElectricCar extends Vehicle {
    private int batteryCapacity;

    public ElectricCar(String brand, int battery) {
        this.brand = brand;
        this.batteryCapacity = battery;
    }

    public void charge() {
        System.out.println(brand + " charging battery (" + batteryCapacity + " kWh).");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        ElectricCar tesla = new ElectricCar("Tesla Model 3", 75);
        tesla.start();  // Inherited method from Vehicle
        tesla.charge(); // Method declared in ElectricCar
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Vehicle engine started.
  Tesla Model 3 charging battery (75 kWh).
  \`\`\`
- Proves code reusability: \`ElectricCar\` inherited \`start()\` and \`brand\` directly without duplicating code.`,
    commonMistakes: `- Attempting to extend multiple classes: \`class C extends A, B {}\` -> Compile Error!
- Assuming \`private\` members are inherited. Private members belong to the parent class and are NOT directly accessible by child classes.`,
    interviewReadyAnswer: `- "Inheritance represents the IS-A relationship, allowing child classes to inherit reusable state and methods from superclasses using 'extends'."
- "Java supports single, multilevel, and hierarchical inheritance with classes, but explicitly prohibits multiple inheritance to avoid the Diamond Problem ambiguity."`,
    quickRevisionPoints: `- Keyword: \`extends\`.
- Models IS-A relationship.
- Private members are not directly accessible in subclasses.
- Multiple inheritance is NOT permitted with classes (Diamond Problem).`
  },
  {
    topicId: 96,
    slug: 'polymorphism-compile-runtime',
    title: 'Polymorphism in Java (Compile-Time vs Runtime)',
    definition: `- **Definition**: **Polymorphism** (Greek: "many forms") is the ability of an object, method, or operator to take on different behaviors depending on context.
- **The Two Categories**:
  1. **Compile-Time Polymorphism (Static / Early Binding)**: Achieved via **Method Overloading**.
  2. **Runtime Polymorphism (Dynamic / Late Binding)**: Achieved via **Method Overriding**.`,
    importantDifferences: `| Dimension | Compile-Time Polymorphism | Runtime Polymorphism |
|---|---|---|
| **Mechanism** | Method Overloading | Method Overriding |
| **Resolution Time** | Resolved at compile time by \`javac\` | Resolved at runtime by JVM (Dynamic Method Dispatch) |
| **Inheritance Required?** | No (can occur within the same class) | **Yes** (must involve superclass and subclass) |
| **Method Signature** | Different parameter signature | **Identical** parameter signature |
| **Return Type** | Can be different | Must be same or covariant |
| **Performance** | Faster (early direct binding) | Slight virtual table lookup overhead |`,
    javaCodeExamples: `class Shape {
    void draw() {
        System.out.println("Drawing a generic Shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a Circle with radius");
    }
}

class Square extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a Square with 4 equal sides");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // Runtime Polymorphism: Superclass reference pointing to Subclass objects
        Shape s1 = new Circle();
        Shape s2 = new Square();

        // JVM resolves call dynamically at runtime based on actual object on Heap
        s1.draw(); // Calls Circle's draw()
        s2.draw(); // Calls Square's draw()
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Drawing a Circle with radius
  Drawing a Square with 4 equal sides
  \`\`\`
- Proves runtime polymorphism: \`Shape\` reference dynamically executes the child's overridden implementation.`,
    interviewReadyAnswer: `- "Polymorphism allows one interface to control multiple behaviors. It exists as Compile-time (Method Overloading resolved by javac) and Runtime (Method Overriding resolved by JVM via Dynamic Method Dispatch)."
- "Runtime polymorphism requires an IS-A inheritance relationship and an overridden method invoked through a parent reference."`,
    quickRevisionPoints: `- Compile-Time: Method Overloading (same name, different params).
- Runtime: Method Overriding (same signature in subclass).
- Dynamic Method Dispatch: JVM looks up method on actual Heap object.`
  },
  {
    topicId: 97,
    slug: 'abstraction-abstract-class-interface',
    title: 'Abstraction in Java (Abstract Classes vs Interfaces)',
    definition: `- **Definition**: **Abstraction** is the process of hiding internal implementation details from the user and exposing only essential functional capabilities.
- **Implementation Tools**:
  1. **Abstract Classes** (0% to 100% partial abstraction).
  2. **Interfaces** (100% full abstraction, supporting default and static methods in Java 8+).`,
    simpleExplanation: `- **The Car Dashboard Analogy**: When you press the brake pedal, you don't need to know whether the car uses drum brakes, disc brakes, or regenerative electric motors. The pedal is the abstract contract; the underlying braking system is the concrete implementation.`,
    importantDifferences: `| Dimension | Abstract Class | Interface |
|---|---|---|
| **Keyword** | \`abstract class\` (extended via \`extends\`) | \`interface\` (implemented via \`implements\`) |
| **Inheritance Support** | Single inheritance only (\`extends ClassA\`) | **Multiple inheritance supported** (\`implements A, B, C\`) |
| **Methods Allowed** | Abstract, concrete, final, static methods | Abstract methods, default methods (Java 8), static methods, private methods (Java 9) |
| **Variables** | Can have instance, static, and final variables | Variables are strictly \`public static final\` constants |
| **Constructor** | **Can have constructors** (invoked by child \`super()\`) | **CANNOT have constructors** |
| **Speed** | Faster method dispatch | Slight overhead due to interface method tables |
| **Design Intent** | Shares code among related classes (IS-A) | Defines a contract / capability across unrelated classes |`,
    javaCodeExamples: `// Interface defining a payment contract
interface PaymentGateway {
    // Implicitly: public static final
    String CURRENCY = "USD";

    // Implicitly: public abstract
    void processPayment(double amount);

    // Java 8 Default method
    default void printReceipt(double amount) {
        System.out.println("Receipt: $" + amount + " " + CURRENCY);
    }
}

// Concrete implementation
class StripePayment implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Stripe API.");
        printReceipt(amount);
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        PaymentGateway payment = new StripePayment();
        payment.processPayment(250.0);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Processing $250.0 via Stripe API.
  Receipt: $250.0 USD
  \`\`\`
- Shows interface contract implementation alongside default method execution.`,
    commonMistakes: `- Trying to instantiate an abstract class or interface: \`new PaymentGateway();\` -> Compile Error!
- Forgetting that all interface variables are strictly \`public static final\`.`,
    trickyInterviewConcepts: `- **Why can an Abstract Class have a constructor if it cannot be instantiated?**
  • The abstract constructor cannot be invoked directly with \`new\`, but it executes when a concrete subclass is instantiated via \`super()\`, ensuring common parent state is initialized properly!`,
    interviewReadyAnswer: `- "Abstraction exposes what an object does while hiding how it does it."
- "Abstract classes provide partial abstraction, can maintain instance state and constructors, and model an IS-A hierarchy. Interfaces provide full contracts, support multiple inheritance, and define capabilities across unrelated classes."`,
    quickRevisionPoints: `- Abstract class: 0-100% abstraction, has constructors, single inheritance.
- Interface: Multiple inheritance, variables are \`public static final\`.
- Java 8 introduced default and static methods in interfaces.
- Neither can be instantiated with \`new\`.`
  }
];

