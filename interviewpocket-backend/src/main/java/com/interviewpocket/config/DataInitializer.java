package com.interviewpocket.config;

import com.interviewpocket.model.*;
import com.interviewpocket.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final NoteRepository noteRepository;
    private final VisualAnimationRepository visualAnimationRepository;
    private final AnimationFrameRepository animationFrameRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final QuizRepository quizRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            RoleRepository roleRepository,
            UserRepository userRepository,
            SubjectRepository subjectRepository,
            TopicRepository topicRepository,
            NoteRepository noteRepository,
            VisualAnimationRepository visualAnimationRepository,
            AnimationFrameRepository animationFrameRepository,
            InterviewQuestionRepository interviewQuestionRepository,
            QuizRepository quizRepository,
            QuizQuestionRepository quizQuestionRepository,
            QuizOptionRepository quizOptionRepository,
            PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;
        this.noteRepository = noteRepository;
        this.visualAnimationRepository = visualAnimationRepository;
        this.animationFrameRepository = animationFrameRepository;
        this.interviewQuestionRepository = interviewQuestionRepository;
        this.quizRepository = quizRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizOptionRepository = quizOptionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        initRolesAndUsers();
        if (subjectRepository.count() == 0) {
            initSubjectsAndCoreJava();
        }
    }

    private void initRolesAndUsers() {
        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
        Role roleAdmin = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", "admin@interviewpocket.com", passwordEncoder.encode("admin123"), "System Administrator");
            admin.setRole("ROLE_ADMIN");
            admin.setRoles(Set.of(roleUser, roleAdmin));
            userRepository.save(admin);
        }

        if (!userRepository.existsByUsername("developer")) {
            User dev = new User("developer", "dev@interviewpocket.com", passwordEncoder.encode("dev123"), "Alex Mercer (Developer)");
            dev.setRole("ROLE_USER");
            dev.setRoles(Set.of(roleUser));
            userRepository.save(dev);
        }
    }

    private void initSubjectsAndCoreJava() {
        // 1. Core Java Subject
        Subject coreJava = new Subject(
                "Core Java",
                "core-java",
                "Master Object-Oriented Programming, Memory Management, Java 8 Streams, Collections & Multithreading.",
                "FaJava",
                "#f89820",
                1
        );
        coreJava = subjectRepository.save(coreJava);

        // 2. Frontend Subject
        Subject frontend = new Subject(
                "Frontend",
                "frontend",
                "HTML5 semantic layouts, modern CSS3 Flexbox/Grid systems, ES6+ JavaScript & DOM APIs.",
                "FaHtml5",
                "#e34f26",
                2
        );
        subjectRepository.save(frontend);

        // 3. React Subject
        Subject react = new Subject(
                "React",
                "react",
                "Component lifecycle, React Hooks, State Management, Router, Axios integration & CRUD workflows.",
                "FaReact",
                "#61dafb",
                3
        );
        subjectRepository.save(react);

        // 4. Advanced Java Subject
        Subject advJava = new Subject(
                "Advanced Java",
                "advanced-java",
                "Enterprise Java: JDBC, Servlets, Hibernate ORM, Spring Core, Spring Boot, Spring Security & REST APIs.",
                "SiSpringboot",
                "#6db33f",
                4
        );
        subjectRepository.save(advJava);

        // 5. MySQL Subject
        Subject mysql = new Subject(
                "MySQL",
                "mysql",
                "Relational schema design, DDL/DML, Complex Joins, Subqueries, Window Functions & Index optimization.",
                "SiMysql",
                "#00758f",
                5
        );
        subjectRepository.save(mysql);

        // 6. Problem Solving Subject
        Subject dsa = new Subject(
                "Problem Solving",
                "problem-solving",
                "Data structures, algorithmic patterns, Arrays, Strings, Trees, Graphs, Sorting & Complexity Analysis.",
                "FaBrain",
                "#9333ea",
                6
        );
        subjectRepository.save(dsa);

        // Topics for Core Java
        Topic oopTopic = topicRepository.save(new Topic(coreJava, "OOP Concepts", "oop-concepts", "Fundamental principles that model real-world problems into software entities.", "BEGINNER", 1));
        Topic encapsulationTopic = topicRepository.save(new Topic(coreJava, "Encapsulation", "encapsulation", "Data hiding and binding data with code through access modifiers and getters/setters.", "BEGINNER", 2));
        Topic inheritanceTopic = topicRepository.save(new Topic(coreJava, "Inheritance", "inheritance", "Mechanism where one class acquires the properties and behaviors of a parent class.", "BEGINNER", 3));
        Topic polymorphismTopic = topicRepository.save(new Topic(coreJava, "Polymorphism", "polymorphism", "Ability of an entity to take many forms via method overloading and overriding.", "INTERMEDIATE", 4));
        Topic abstractionTopic = topicRepository.save(new Topic(coreJava, "Abstraction", "abstraction", "Hiding internal implementation details and showing only the essential functionality to users.", "BEGINNER", 5));
        Topic collectionsTopic = topicRepository.save(new Topic(coreJava, "Collections Framework", "collections-framework", "Unified architecture for storing and manipulating groups of objects (List, Set, Map, Queue).", "INTERMEDIATE", 6));
        Topic exceptionsTopic = topicRepository.save(new Topic(coreJava, "Exception Handling", "exception-handling", "Mechanism to handle runtime errors so normal application flow can be maintained.", "BEGINNER", 7));

        // Notebook-Style Note for Polymorphism (All 11 Sections)
        Note polyNote = new Note();
        polyNote.setTopic(polymorphismTopic);
        polyNote.setTitle("Complete Notebook: Polymorphism in Java");
        polyNote.setWhatIsIt("Polymorphism is derived from Greek words: 'Poly' meaning many, and 'Morph' meaning forms. In Java, it refers to the ability of a single interface or reference variable to represent and execute different underlying behaviors at runtime.");
        polyNote.setSimpleMeaning("One name, many different actions. You give one command, and different objects respond in their own unique way based on who they are.");
        polyNote.setWhyUseIt("1. Eliminates rigid if-else or switch chains when handling diverse object types.\n2. Enables Open-Closed Principle (open for extension, closed for modification).\n3. Permits writing generic code that works with parent types while seamlessly supporting any new child classes added in the future.");
        polyNote.setHowItWorks("Java achieves polymorphism through two distinct mechanisms:\n- Compile-time Polymorphism (Static Binding / Method Overloading): Decided by compiler based on method signature.\n- Runtime Polymorphism (Dynamic Method Dispatch / Method Overriding): Decided by JVM at runtime based on the actual object created in heap memory.");
        polyNote.setRealWorldExample("Think of a TV Remote Power Button:\n- Press it pointing to a Samsung TV -> Turns ON the Samsung display.\n- Press it pointing to a Sony Soundbar -> Powers ON audio amplifier.\n- The command is identical ('power()'), but the actual device executes its own internal circuitry.");
        polyNote.setInternalWorking("At runtime, the JVM uses a Virtual Method Table (vtable). Each class has a vtable containing pointers to method implementations. When you invoke `parentRef.execute()`, the JVM looks at the runtime class of the object in heap, consults its vtable, and jumps to that child's overridden method address.");
        polyNote.setImportantPoints("• Private, static, and final methods CANNOT be overridden (static methods undergo method hiding).\n• The `@Override` annotation prevents subtle signature mismatch bugs.\n• Return types in overriding can be covariant (subtype of parent return type).\n• Access modifier of overriding method in child cannot be more restrictive than parent.");
        polyNote.setComparisonTable("[{\"feature\":\"Resolution Time\",\"overloading\":\"Compile-Time (Compiler)\",\"overriding\":\"Run-Time (JVM)\"},{\"feature\":\"Method Signature\",\"overloading\":\"Must differ in parameter count or types\",\"overriding\":\"Must be EXACT same name and parameters\"},{\"feature\":\"Inheritance Requirement\",\"overloading\":\"Can happen in same class\",\"overriding\":\"Requires Parent-Child inheritance hierarchy\"},{\"feature\":\"Private/Static Methods\",\"overloading\":\"Can be overloaded\",\"overriding\":\"Cannot be overridden\"}]");
        polyNote.setMemoryTrick("Remember **MORE vs LESS**:\n- **M**ethod **O**verloading = **R**esolved **E**arly (Compile Time).\n- **M**ethod **O**verriding = **L**ate **E**xecution **S**tarts (Run Time via Dynamic Dispatch).");
        polyNote.setInterviewAnswer("\"Polymorphism allows one interface to perform different actions. In Java, it exists in two forms: Compile-time polymorphism through method overloading, and Runtime polymorphism through method overriding and dynamic method dispatch. In dynamic dispatch, a parent reference variable points to a child class object, and the JVM resolves which overridden method to execute at runtime based on the actual heap object.\"");
        polyNote.setPracticalCode("// Parent class\nclass Payment {\n    void processPayment(double amount) {\n        System.out.println(\"Processing standard payment: $\" + amount);\n    }\n}\n\n// Child classes\nclass CreditCardPayment extends Payment {\n    @Override\n    void processPayment(double amount) {\n        System.out.println(\"Charging $\" + amount + \" to Credit Card via Stripe Gateway\");\n    }\n}\n\nclass UpiPayment extends Payment {\n    @Override\n    void processPayment(double amount) {\n        System.out.println(\"Transferring $\" + amount + \" instantly via UPI VPA\");\n    }\n}\n\npublic class PolymorphismDemo {\n    public static void main(String[] args) {\n        // Parent reference pointing to child instances\n        Payment payment1 = new CreditCardPayment();\n        Payment payment2 = new UpiPayment();\n\n        // Dynamic Method Dispatch at runtime\n        payment1.processPayment(250.0); // Outputs Credit Card flow\n        payment2.processPayment(75.0);  // Outputs UPI flow\n    }\n}");
        noteRepository.save(polyNote);

        // Notebook-Style Note for Encapsulation (All 11 Sections)
        Note encapNote = new Note();
        encapNote.setTopic(encapsulationTopic);
        encapNote.setTitle("Complete Notebook: Encapsulation in Java");
        encapNote.setWhatIsIt("Encapsulation is the bundling of data (variables) and methods that manipulate that data into a single unit (class), while restricting direct outside access to internal components using access specifiers.");
        encapNote.setSimpleMeaning("Wrap your data inside a protective capsule. Nobody from outside can touch or corrupt it directly; they must use authorized entry doors (getters and setters).");
        encapNote.setWhyUseIt("1. Prevents accidental corruption of sensitive variables from rogue code.\n2. Gives complete control over what values are valid (validation inside setters).\n3. Enables read-only or write-only fields.\n4. Allows changing internal data representations without breaking client code.");
        encapNote.setHowItWorks("1. Declare member variables as `private`.\n2. Provide public `getter` methods for safe read access.\n3. Provide public `setter` methods with validation logic for safe write access.");
        encapNote.setRealWorldExample("Think of a Bank ATM machine or Capsule Medicine:\n- You cannot open the bank vault directly with your hands.\n- You interact only through the keypad and screen (public methods).\n- When you enter your PIN and amount, the ATM verifies rules before dispensing money.");
        encapNote.setInternalWorking("By assigning the `private` access flag in Java bytecode (`ACC_PRIVATE`), the JVM and compiler reject any bytecode instructions attempting `getfield` or `putfield` on that member from classes outside its lexical scope, enforcing encapsulation at both compile and runtime.");
        encapNote.setImportantPoints("• Also known as 'Data Hiding'.\n• Fully encapsulated class has all private fields and public getter/setter methods (JavaBean standard).\n• Defensive copying should be used when returning mutable objects (like Date or List) from getters.");
        encapNote.setComparisonTable("[{\"dimension\":\"Encapsulation\",\"abstraction\":\"Abstraction\"},{\"dimension\":\"Definition\",\"encapsulation\":\"Binding data + methods & restricting direct access\",\"abstraction\":\"Hiding complexity & showing essential features\"},{\"dimension\":\"Focus\",\"encapsulation\":\"HOW to protect and encapsulate internal data\",\"abstraction\":\"WHAT an entity does rather than how it does it\"},{\"dimension\":\"Implementation\",\"encapsulation\":\"private variables + public getters/setters\",\"abstraction\":\"abstract classes and interfaces\"}]");
        encapNote.setMemoryTrick("Remember **CAPSULE**:\n- **C**losed to outside.\n- **A**ccess via public getters/setters.\n- **P**rotects internal state.\n- **S**ecures business logic.\n- **U**nified class bundle.");
        encapNote.setInterviewAnswer("\"Encapsulation is the OOP principle of bundling data members and member functions together within a class while restricting direct access to the state using private access modifiers. We expose public getter and setter methods to provide controlled, validated access. This protects object integrity, provides data hiding, and maintains flexibility for future refactoring.\"");
        encapNote.setPracticalCode("public class BankAccount {\n    // Private data members: hidden from outside\n    private String accountNumber;\n    private double balance;\n\n    public BankAccount(String accountNumber, double initialDeposit) {\n        this.accountNumber = accountNumber;\n        if (initialDeposit >= 0) {\n            this.balance = initialDeposit;\n        }\n    }\n\n    // Controlled read access\n    public double getBalance() {\n        return this.balance;\n    }\n\n    // Controlled write access with validation logic\n    public void deposit(double amount) {\n        if (amount > 0) {\n            this.balance += amount;\n            System.out.println(\"Successfully deposited: $\" + amount);\n        } else {\n            throw new IllegalArgumentException(\"Deposit must be positive!\");\n        }\n    }\n}");
        noteRepository.save(encapNote);

        // Visual Animation for Polymorphism (4 Interactive Frames)
        VisualAnimation polyAnim = new VisualAnimation(
                polymorphismTopic,
                "Dynamic Method Dispatch & Polymorphism Flow",
                "POLYMORPHISM",
                "Interactive step-by-step visual demonstration of how the JVM resolves overridden method calls at runtime using Parent reference and child objects."
        );
        polyAnim = visualAnimationRepository.save(polyAnim);

        animationFrameRepository.save(new AnimationFrame(
                polyAnim,
                1,
                "Step 1: Declare Parent Reference & Allocate Child Objects",
                "Parent type reference pointing to memory addresses in JVM Heap",
                "We define a reference variable of Parent type `Payment p`. In the Java Heap, we allocate new Child instances: `new CreditCardPayment()` and `new UpiPayment()`. The reference points to the instantiated child object in memory.",
                "Imagine a Universal Remote Control labelled 'Payment Device' that is currently paired with a Credit Card Terminal.",
                "DIAGRAM_STEP",
                "{\"activeStep\":1,\"nodes\":[{\"id\":\"ref\",\"label\":\"Payment p (Reference)\",\"type\":\"ref\",\"status\":\"active\"},{\"id\":\"heap1\",\"label\":\"CreditCardPayment Object (Heap)\",\"type\":\"heap\",\"status\":\"connected\"},{\"id\":\"heap2\",\"label\":\"UpiPayment Object (Heap)\",\"type\":\"heap\",\"status\":\"idle\"}],\"highlight\":\"ref-to-heap1\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                polyAnim,
                2,
                "Step 2: Invoke Method Call `p.processPayment(100)`",
                "Compiler validates method signature against Parent interface",
                "At compile time, the Java compiler verifies that `Payment` defines `processPayment(double)`. It generates `invokevirtual` bytecode instruction. The compiler does not know or care which specific child will run yet.",
                "The user presses the single 'Pay' button on the universal remote control.",
                "DIAGRAM_STEP",
                "{\"activeStep\":2,\"nodes\":[{\"id\":\"call\",\"label\":\"Instruction: invokevirtual Payment.processPayment()\",\"type\":\"bytecode\",\"status\":\"active\"},{\"id\":\"vtable\",\"label\":\"Consult JVM Virtual Method Table (vtable)\",\"type\":\"dispatch\",\"status\":\"resolving\"}],\"highlight\":\"method-call\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                polyAnim,
                3,
                "Step 3: JVM Dynamic Method Dispatch via vtable",
                "JVM inspects actual runtime object in Heap and dispatches to child method",
                "At runtime, the JVM looks at the target object in heap memory. It discovers the real runtime type is `CreditCardPayment`. It queries `CreditCardPayment`'s vtable and routes the execution directly to its overridden method.",
                "The signal hits the specific terminal, which executes its unique encrypted card swipe process rather than generic processing.",
                "DIAGRAM_STEP",
                "{\"activeStep\":3,\"nodes\":[{\"id\":\"heapObj\",\"label\":\"Heap Object: CreditCardPayment\",\"type\":\"runtime\",\"status\":\"active\"},{\"id\":\"method\",\"label\":\"CreditCardPayment.processPayment() [OVERRIDDEN]\",\"type\":\"execution\",\"status\":\"running\"}],\"highlight\":\"dispatch-resolved\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                polyAnim,
                4,
                "Step 4: Execute Overridden Logic & Output Result",
                "Execution completes with child implementation",
                "The child method executes cleanly: `Charging $100 via Stripe Gateway`. Swapping the object reference to `new UpiPayment()` automatically directs future calls to UPI logic without modifying any caller code!",
                "Payment successfully verified through Credit Card gateway.",
                "DIAGRAM_STEP",
                "{\"activeStep\":4,\"nodes\":[{\"id\":\"out\",\"label\":\"Output: Charging $100 to Credit Card via Stripe Gateway\",\"type\":\"success\",\"status\":\"complete\"},{\"id\":\"reusable\",\"label\":\"Extensibility: Plug new Payment types without modifying client!\",\"type\":\"note\",\"status\":\"highlight\"}],\"highlight\":\"result-complete\"}"
        ));

        // Visual Animation for Encapsulation (4 Interactive Frames)
        encapTopicAnimation(encapsulationTopic);

        // Core Java Interview Questions
        InterviewQuestion q1 = new InterviewQuestion();
        q1.setSubject(coreJava);
        q1.setTopic(polymorphismTopic);
        q1.setQuestion("What is the difference between Method Overloading and Method Overriding in Java?");
        q1.setSimpleAnswer("Overloading happens in the same class at compile time with different parameters. Overriding happens in parent-child classes at runtime with the exact same method signature.");
        q1.setDetailedExplanation("Method Overloading is compile-time polymorphism where two or more methods in the same class share the same name but differ in parameter count, type, or order. Method Overriding is runtime polymorphism where a child class provides a specific implementation of a method already defined in its superclass, with the identical signature and return type (or covariant return type).");
        q1.setRealWorldExample("Overloading: A printer can print(Document doc), print(Image img), or print(Document doc, int copies). Overriding: A generic Animal makes generic sound(), but Dog overrides it to bark() and Cat overrides it to meow().");
        q1.setMemoryTrick("Over**LOAD** = **L**oad more parameters in same class. Over**RIDE** = **R**untime **I**nherited **D**ispatch **E**xecution.");
        q1.setInterviewAnswer("\"Method overloading represents compile-time polymorphism where multiple methods in the same class have the same name but distinct signatures. It is resolved statically by the compiler based on argument types. In contrast, method overriding represents runtime polymorphism where a subclass provides its own implementation of an inherited method using dynamic method dispatch decided by the JVM at runtime.\"");
        q1.setDifficulty("BEGINNER");
        q1.setIsFrequentlyAsked(true);
        q1.setIsImportant(true);
        q1.setDisplayOrder(1);
        interviewQuestionRepository.save(q1);

        InterviewQuestion q2 = new InterviewQuestion();
        q2.setSubject(coreJava);
        q2.setTopic(encapsulationTopic);
        q2.setQuestion("Why are instance variables usually declared as private in Java?");
        q2.setSimpleAnswer("To prevent direct, uncontrolled modification from external classes and to enforce validation through getters and setters.");
        q2.setDetailedExplanation("Declaring variables as private is the core of Encapsulation and Data Hiding. If variables are public, any external code can mutate them to invalid states (e.g. negative age or invalid bank balance). By making them private, the class retains full authority over its internal state, allowing validation inside setter methods and maintaining invariants.");
        q2.setRealWorldExample("Your smartphone's internal battery circuitry is sealed inside the casing. You cannot poke the lithium cells directly with a wire; you interact safely through the USB charging port.");
        q2.setMemoryTrick("Private = Padlock on your data. Getters/Setters = The key.");
        q2.setInterviewAnswer("\"We make instance variables private to protect object integrity and achieve data hiding. This prevents external classes from bypassing business validation rules and coupling themselves directly to internal field representations. Changes to private fields can be made without breaking external consumers of the class.\"");
        q2.setDifficulty("BEGINNER");
        q2.setIsFrequentlyAsked(true);
        q2.setIsImportant(true);
        q2.setDisplayOrder(2);
        interviewQuestionRepository.save(q2);

        InterviewQuestion q3 = new InterviewQuestion();
        q3.setSubject(coreJava);
        q3.setTopic(collectionsTopic);
        q3.setQuestion("What is the difference between ArrayList and LinkedList, and when should you choose each?");
        q3.setSimpleAnswer("ArrayList is backed by a dynamic resizable array (fast random access O(1), slower insertions in the middle). LinkedList is a doubly-linked list (fast insertions/deletions O(1) if pointer is known, slower random lookup O(N)).");
        q3.setDetailedExplanation("ArrayList stores elements in contiguous memory. Fetching an element by index via `get(i)` is an instant O(1) pointer arithmetic operation. However, inserting or deleting in the middle requires shifting subsequent elements (O(N)). LinkedList stores nodes with data and two pointers (`prev` and `next`). Accessing index `i` requires traversing from head or tail (O(N)), but insertion or removal at head/tail or iterator position is O(1). In modern CPUs, ArrayList is almost always faster due to hardware cache locality.");
        q3.setRealWorldExample("ArrayList is like a row of reserved cinema seats numbered 1 to 100 (walk straight to seat 42). LinkedList is like a treasure hunt where clue #1 gives the location of clue #2.");
        q3.setMemoryTrick("ArrayList = Array = Access fast! LinkedList = Links = Insert/Delete fast!");
        q3.setInterviewAnswer("\"ArrayList is backed by a dynamic array offering O(1) random access but O(N) cost for shifting on middle insertions. LinkedList is implemented as a doubly-linked list offering O(1) insertion and removal at ends, but O(N) traversal for index-based access. In practical production applications, ArrayList is preferred for the vast majority of scenarios due to CPU cache line locality, unless there are heavy continuous insertions and deletions at the head/queue positions.\"");
        q3.setDifficulty("INTERMEDIATE");
        q3.setIsFrequentlyAsked(true);
        q3.setIsImportant(true);
        q3.setDisplayOrder(3);
        interviewQuestionRepository.save(q3);

        // Quizzes for Core Java (Covering the 5 Required Categories)
        Quiz coreJavaQuiz = new Quiz();
        coreJavaQuiz.setSubject(coreJava);
        coreJavaQuiz.setTopic(oopTopic);
        coreJavaQuiz.setTitle("Core Java Mastery Challenge");
        coreJavaQuiz.setDescription("Test your technical depth across OOP principles, Java memory model, polymorphic execution and collection behaviors.");
        coreJavaQuiz.setCategory("CONCEPTUAL");
        coreJavaQuiz.setDifficulty("INTERMEDIATE");
        coreJavaQuiz.setTimeLimitMinutes(10);
        coreJavaQuiz = quizRepository.save(coreJavaQuiz);

        // Quiz Question 1: Most Asked
        QuizQuestion qq1 = new QuizQuestion();
        qq1.setQuiz(coreJavaQuiz);
        qq1.setSubject(coreJava);
        qq1.setQuestionText("Which of the following method types CANNOT be overridden in a Java subclass?");
        qq1.setExplanation("In Java, static methods, private methods, and final methods cannot be overridden. Static methods belong to the class rather than instances, resulting in method hiding rather than dynamic dispatch. Final methods explicitly forbid overriding.");
        qq1.setHint("Think about methods that cannot undergo dynamic runtime dispatch or are bound at compile time.");
        qq1.setCategory("MOST_ASKED");
        qq1.setDifficulty("BEGINNER");
        qq1 = quizQuestionRepository.save(qq1);

        quizOptionRepository.save(new QuizOption(qq1, "A", "Public synchronized methods", false));
        quizOptionRepository.save(new QuizOption(qq1, "B", "Static, Private, and Final methods", true));
        quizOptionRepository.save(new QuizOption(qq1, "C", "Protected methods", false));
        quizOptionRepository.save(new QuizOption(qq1, "D", "Methods returning a covariant type", false));

        // Quiz Question 2: Output-Based
        QuizQuestion qq2 = new QuizQuestion();
        qq2.setQuiz(coreJavaQuiz);
        qq2.setSubject(coreJava);
        qq2.setQuestionText("What will be the output of the following Java snippet?");
        qq2.setCodeSnippet("class Parent {\n    static void show() { System.out.print(\"P \"); }\n}\nclass Child extends Parent {\n    static void show() { System.out.print(\"C \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        obj.show();\n    }\n}");
        qq2.setExplanation("Because `show()` is a `static` method, it is resolved at compile time based on the reference type (`Parent`), not the runtime object in heap (`Child`). This is method hiding, not method overriding. Therefore, `Parent.show()` is called, printing 'P '.");
        qq2.setHint("Static methods are resolved using reference type, not runtime object instance!");
        qq2.setCategory("OUTPUT_BASED");
        qq2.setDifficulty("INTERMEDIATE");
        qq2 = quizQuestionRepository.save(qq2);

        quizOptionRepository.save(new QuizOption(qq2, "A", "C ", false));
        quizOptionRepository.save(new QuizOption(qq2, "B", "P ", true));
        quizOptionRepository.save(new QuizOption(qq2, "C", "Compilation Error: Cannot invoke static method on instance", false));
        quizOptionRepository.save(new QuizOption(qq2, "D", "P C ", false));

        // Quiz Question 3: Tricky Questions
        QuizQuestion qq3 = new QuizQuestion();
        qq3.setQuiz(coreJavaQuiz);
        qq3.setSubject(coreJava);
        qq3.setQuestionText("What happens if you try to override a method in a child class and change its access modifier from 'protected' in parent to 'private' in child?");
        qq3.setExplanation("In Java, an overriding method cannot assign more restrictive access privileges than the superclass method. Reducing visibility (e.g. from protected to private) causes a compile-time error: 'Cannot reduce the visibility of the inherited method'.");
        qq3.setHint("Recall the Liskov Substitution Principle and Java access modifier hierarchy.");
        qq3.setCategory("TRICKY");
        qq3.setDifficulty("INTERMEDIATE");
        qq3 = quizQuestionRepository.save(qq3);

        quizOptionRepository.save(new QuizOption(qq3, "A", "Compiles normally and hides the method", false));
        quizOptionRepository.save(new QuizOption(qq3, "B", "Compile-time error: Cannot reduce the visibility of the inherited method", true));
        quizOptionRepository.save(new QuizOption(qq3, "C", "Compiles with a compiler warning", false));
        quizOptionRepository.save(new QuizOption(qq3, "D", "Runtime IllegalAccessException thrown upon execution", false));

        // Quiz Question 4: Scenario-Based
        QuizQuestion qq4 = new QuizQuestion();
        qq4.setQuiz(coreJavaQuiz);
        qq4.setSubject(coreJava);
        qq4.setQuestionText("Scenario: You are designing an immutable class 'UserProfile' that contains a `java.util.Date` field for `birthDate`. What must you do in the getter method `getBirthDate()` to maintain strict immutability?");
        qq4.setExplanation("Because `java.util.Date` is a mutable object, returning `this.birthDate` directly allows external callers to invoke `date.setTime(...)` and corrupt the internal state. To preserve immutability, the getter must return a defensive copy: `return new Date(this.birthDate.getTime());`.");
        qq4.setHint("Consider what happens if someone calls `.setTime()` on the returned Date reference.");
        qq4.setCategory("SCENARIO_BASED");
        qq4.setDifficulty("ADVANCED");
        qq4 = quizQuestionRepository.save(qq4);

        quizOptionRepository.save(new QuizOption(qq4, "A", "Return this.birthDate directly with final modifier", false));
        quizOptionRepository.save(new QuizOption(qq4, "B", "Return a defensive copy: return new Date(this.birthDate.getTime())", true));
        quizOptionRepository.save(new QuizOption(qq4, "C", "Mark the getter as synchronized", false));
        quizOptionRepository.save(new QuizOption(qq4, "D", "Throw an UnsupportedOperationException inside getter", false));
    }

    private VisualAnimation encapTopicAnimation(Topic encapTopic) {
        VisualAnimation anim = new VisualAnimation(
                encapTopic,
                "Data Hiding & Controlled Access Flow",
                "ENCAPSULATION",
                "Interactive demonstration showing why direct field modification is blocked and how getters and setters guarantee data protection."
        );
        anim = visualAnimationRepository.save(anim);

        animationFrameRepository.save(new AnimationFrame(
                anim,
                1,
                "Frame 1: Class with Private Variables",
                "Encapsulate state inside class boundary",
                "The `BankAccount` class holds state variables `private double balance` and `private String accountNumber`. The `private` keyword creates an impenetrable boundary around the memory variables.",
                "Imagine a secure bank vault with thick steel walls.",
                "DIAGRAM_STEP",
                "{\"activeStep\":1,\"nodes\":[{\"id\":\"class\",\"label\":\"BankAccount Class\",\"type\":\"boundary\",\"status\":\"active\"},{\"id\":\"field1\",\"label\":\"private double balance = 1000.0\",\"type\":\"privateField\",\"status\":\"protected\"}],\"highlight\":\"private-protection\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                anim,
                2,
                "Frame 2: Direct External Access is BLOCKED",
                "Compiler rejects direct field mutations",
                "An external class attempts `account.balance = -5000.0`. The Java compiler halts with an error: 'balance has private access in BankAccount'. Unauthorized tampering is completely prevented.",
                "A customer walks up and tries to kick down the vault door directly. The guard immediately rejects them.",
                "DIAGRAM_STEP",
                "{\"activeStep\":2,\"nodes\":[{\"id\":\"external\",\"label\":\"Rogue Caller: account.balance = -5000\",\"type\":\"externalCall\",\"status\":\"rejected\"},{\"id\":\"wall\",\"label\":\"Access Barrier (ACC_PRIVATE)\",\"type\":\"shield\",\"status\":\"blocked\"}],\"highlight\":\"access-denied\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                anim,
                3,
                "Frame 3: Expose Public Getters and Setters",
                "Construct authorized, controlled doorways",
                "The class provides `public double getBalance()` and `public void deposit(double amount)`. These public methods act as smart gatekeepers.",
                "The bank installs an ATM counter with automated software rules in front of the vault.",
                "DIAGRAM_STEP",
                "{\"activeStep\":3,\"nodes\":[{\"id\":\"getter\",\"label\":\"public double getBalance()\",\"type\":\"publicMethod\",\"status\":\"ready\"},{\"id\":\"setter\",\"label\":\"public void deposit(amount)\",\"type\":\"publicMethod\",\"status\":\"ready\"}],\"highlight\":\"smart-doors\"}"
        ));

        animationFrameRepository.save(new AnimationFrame(
                anim,
                4,
                "Frame 4: Validation & Controlled Mutation",
                "Execute business rules before altering private state",
                "When a caller calls `account.deposit(500)`, the setter validates `amount > 0`. Since valid, `balance` becomes `1500.0`. If a negative amount is passed, an exception is thrown and state remains uncorrupted.",
                "The ATM validates the cash bills through sensors before depositing them into the secure vault.",
                "DIAGRAM_STEP",
                "{\"activeStep\":4,\"nodes\":[{\"id\":\"val\",\"label\":\"Validation: if (amount > 0)\",\"type\":\"ruleCheck\",\"status\":\"passed\"},{\"id\":\"updated\",\"label\":\"balance = 1500.0 [SAFE MUTATION]\",\"type\":\"success\",\"status\":\"complete\"}],\"highlight\":\"safe-mutation\"}"
        ));

        return anim;
    }
}
