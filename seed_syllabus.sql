
-- ========================================================================
-- Core Java Complete Syllabus Seed Script: 18 Modules & 130 Topics
-- ========================================================================
USE interviewpocket_db;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Ensure subject 1 exists
INSERT INTO subjects (id, name, slug, description, icon, is_active, display_order)
VALUES (1, 'Core Java', 'core-java', 'Master Core Java from fundamentals to JVM internals, multithreading, and Java 8 Stream API.', 'FaJava', 1, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name), slug=VALUES(slug), description=VALUES(description);

-- 2. Clear previous module mappings cleanly
DELETE FROM note_sections WHERE note_id IN (SELECT id FROM notes WHERE topic_id IN (SELECT id FROM topics WHERE subject_id = 1));
DELETE FROM notes WHERE topic_id IN (SELECT id FROM topics WHERE subject_id = 1);
DELETE FROM quiz_attempts WHERE quiz_id IN (SELECT id FROM quizzes WHERE subject_id = 1);
DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE subject_id = 1));
DELETE FROM quiz_questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE subject_id = 1);
DELETE FROM quizzes WHERE subject_id = 1;
DELETE FROM topic_progress WHERE topic_id IN (SELECT id FROM topics WHERE subject_id = 1);
DELETE FROM topics WHERE subject_id = 1;
DELETE FROM modules WHERE subject_id = 1;


-- Module 1: Module 1: Introduction to Java
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (1, 1, 'Module 1: Introduction to Java', 'introduction-to-java', 'Foundational overview of Java, history, JVM architecture, bytecode mechanics, platform independence, and core tokens.', 'High', 1, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'What is Java?', 'what-is-java', 'High', 'Beginner', 1, 'Introduction to Java as a high-level, class-based, object-oriented programming language designed for platform independence.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'What is Java? Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'What is Java? Quiz', 'Test your knowledge on What is Java? with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'History of Java', 'history-of-java', 'Medium', 'Beginner', 2, 'Origin at Sun Microsystems by James Gosling in 1995, Green Team project, Oak language, and evolution to modern LTS versions.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'History of Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'History of Java Quiz', 'Test your knowledge on History of Java with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'Why Java?', 'why-java', 'High', 'Beginner', 3, 'Core advantages: platform independence, robust memory management, security, enterprise ecosystem, and vast community support.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Why Java? Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Why Java? Quiz', 'Test your knowledge on Why Java? with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'Features of Java', 'features-of-java', 'Very High', 'Beginner', 4, 'The 12 primary features: Simple, Object-Oriented, Platform-Independent, Secure, Robust, Architecture-Neutral, Portable, High Performance, Multithreaded, Distributed, Dynamic, and Interpreted.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Features of Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Features of Java Quiz', 'Test your knowledge on Features of Java with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'Why is Java Platform Independent?', 'why-java-platform-independent', 'Very High', 'Beginner', 5, 'Deep dive into the Write Once, Run Anywhere (WORA) paradigm, javac compilation to intermediate bytecode (.class), and platform-specific JVM execution.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Why is Java Platform Independent? Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Why is Java Platform Independent? Quiz', 'Test your knowledge on Why is Java Platform Independent? with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'Architecture of Java', 'architecture-of-java', 'Very High', 'Intermediate', 6, 'Comprehensive architectural breakdown: Source Code → Compiler → Bytecode → ClassLoader → Bytecode Verifier → JIT Compiler / Interpreter → Hardware.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Architecture of Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Architecture of Java Quiz', 'Test your knowledge on Architecture of Java with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'JDK, JRE and JVM', 'jdk-jre-jvm', 'Very High', 'Beginner', 7, 'Clear distinction, Venn diagram relationships, and responsibilities: JDK = Development Tools + JRE; JRE = JVM + Core Class Libraries; JVM = Execution Environment.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'JDK, JRE and JVM Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'JDK, JRE and JVM Quiz', 'Test your knowledge on JDK, JRE and JVM with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'JDK Components', 'jdk-components', 'High', 'Intermediate', 8, 'Key command-line tools included in the JDK: javac, java, javadoc, jar, javap (disassembler), jdb, and modern jcmd/jconsole utilities.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'JDK Components Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'JDK Components Quiz', 'Test your knowledge on JDK Components with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 1, 'Java Tokens', 'java-tokens', 'High', 'Beginner', 9, 'Smallest individual units in a Java program: Keywords, Identifiers, Literals, Operators, Separators/Punctuators, and Comments.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Java Tokens Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Java Tokens Quiz', 'Test your knowledge on Java Tokens with randomized multiple-choice questions.', 'Beginner', 10, 'General');

-- Module 2: Module 2: Data Types, Variables and Type Casting
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (2, 1, 'Module 2: Data Types, Variables and Type Casting', 'data-types-variables-type-casting', 'Primitive and non-primitive types, memory sizes, variable classifications, literal syntax, type conversions, and Scanner input.', 'High', 2, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 2, 'Data Types in Java (Primitive vs Non-Primitive)', 'data-types-primitive-non-primitive', 'Very High', 'Beginner', 1, '8 primitive types (byte, short, int, long, float, double, char, boolean) with bit-sizes and default values vs reference types (Arrays, Classes, Interfaces).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Data Types in Java (Primitive vs Non-Primitive) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Data Types in Java (Primitive vs Non-Primitive) Quiz', 'Test your knowledge on Data Types in Java (Primitive vs Non-Primitive) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 2, 'Variables in Java (Local, Instance and Static Variables)', 'variables-local-instance-static', 'Very High', 'Beginner', 2, 'Detailed comparison of Local variables (stack), Instance variables (heap), and Static fields (method area), memory lifecycles, and why Java has no global variables.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Variables in Java (Local, Instance and Static Variables) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Variables in Java (Local, Instance and Static Variables) Quiz', 'Test your knowledge on Variables in Java (Local, Instance and Static Variables) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 2, 'Literals in Java', 'literals-in-java', 'Medium', 'Beginner', 3, 'Fixed values assigned to variables: Integer, Floating-Point, Character (Unicode, Escape sequences), String, Boolean, and Null literals with binary/hex notations.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Literals in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Literals in Java Quiz', 'Test your knowledge on Literals in Java with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 2, 'Type Casting (Implicit and Explicit Casting)', 'type-casting-implicit-explicit', 'High', 'Beginner', 4, 'Widening (implicit/automatic) casting without data loss vs Narrowing (explicit/manual) casting with potential truncation, overflow, and precision loss.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Type Casting (Implicit and Explicit Casting) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Type Casting (Implicit and Explicit Casting) Quiz', 'Test your knowledge on Type Casting (Implicit and Explicit Casting) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 2, 'Scanner Class & Standard Console Input', 'scanner-class-console-input', 'High', 'Beginner', 5, 'Using java.util.Scanner with System.in, nextInt(), nextLine(), nextDouble(), input tokenization, and handling common newline buffering pitfalls.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Scanner Class & Standard Console Input Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Scanner Class & Standard Console Input Quiz', 'Test your knowledge on Scanner Class & Standard Console Input with randomized multiple-choice questions.', 'Beginner', 10, 'General');

-- Module 3: Module 3: Operators and Control Statements
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (3, 1, 'Module 3: Operators and Control Statements', 'operators-and-control-statements', 'Arithmetic, logical, bitwise, and ternary operators, along with decision-making, looping, switch expressions, and branch controls.', 'High', 3, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 3, 'Operators in Java (Arithmetic, Relational, Logical, Bitwise, Ternary)', 'operators-in-java', 'High', 'Beginner', 1, 'Full breakdown of operator categories, operator precedence, short-circuit logical operators (&&, || vs &, |), shift operators (<<, >>, >>>), and ternary (? :).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Operators in Java (Arithmetic, Relational, Logical, Bitwise, Ternary) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Operators in Java (Arithmetic, Relational, Logical, Bitwise, Ternary) Quiz', 'Test your knowledge on Operators in Java (Arithmetic, Relational, Logical, Bitwise, Ternary) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 3, 'Conditional Statements (if, if-else, else-if ladder, nested-if)', 'conditional-statements-if-else', 'High', 'Beginner', 2, 'Branching execution based on boolean evaluations, nested conditional logic, and clean coding best practices.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Conditional Statements (if, if-else, else-if ladder, nested-if) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Conditional Statements (if, if-else, else-if ladder, nested-if) Quiz', 'Test your knowledge on Conditional Statements (if, if-else, else-if ladder, nested-if) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 3, 'Switch Statement & Modern Switch Expressions', 'switch-statements-expressions', 'High', 'Beginner', 3, 'Traditional switch statements (byte, short, char, int, String, enums), fall-through behavior, break statement, and Java 14+ switch expressions with yield and arrow (->) syntax.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Switch Statement & Modern Switch Expressions Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Switch Statement & Modern Switch Expressions Quiz', 'Test your knowledge on Switch Statement & Modern Switch Expressions with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 3, 'Iterative Statements & Loops (for, while, do-while, for-each)', 'iterative-statements-loops', 'High', 'Beginner', 4, 'Entry-controlled loops (for, while), exit-controlled loop (do-while), enhanced for-each loop over collections/arrays, and loop optimization.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Iterative Statements & Loops (for, while, do-while, for-each) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Iterative Statements & Loops (for, while, do-while, for-each) Quiz', 'Test your knowledge on Iterative Statements & Loops (for, while, do-while, for-each) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 3, 'Jumping Statements (break, continue, return)', 'jumping-statements-break-continue-return', 'High', 'Beginner', 5, 'Unconditional jump statements: break (terminating loops/switch), continue (skipping current iteration), return (exiting methods), and labeled break/continue.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Jumping Statements (break, continue, return) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Jumping Statements (break, continue, return) Quiz', 'Test your knowledge on Jumping Statements (break, continue, return) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

-- Module 4: Module 4: Arrays and Random Class
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (4, 1, 'Module 4: Arrays and Random Class', 'arrays-and-random-class', 'Array data structures, memory layout, multidimensional and jagged arrays, traversal algorithms, Arrays helper class, and Random.', 'High', 4, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'Introduction to Arrays & Memory Representation', 'introduction-to-arrays', 'High', 'Beginner', 1, 'Homogeneous fixed-size data structures in Java, continuous memory allocation in Heap, length attribute, and ArrayIndexOutOfBoundsException.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Introduction to Arrays & Memory Representation Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Introduction to Arrays & Memory Representation Quiz', 'Test your knowledge on Introduction to Arrays & Memory Representation with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'Array Declaration, Instantiation and Initialization', 'array-declaration-instantiation-initialization', 'High', 'Beginner', 2, 'Syntactic forms for declaring arrays, new keyword allocation, inline array initializers, anonymous arrays, and default value initialization.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Array Declaration, Instantiation and Initialization Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Array Declaration, Instantiation and Initialization Quiz', 'Test your knowledge on Array Declaration, Instantiation and Initialization with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'Types of Arrays (Single & Multi-Dimensional, Jagged Arrays)', 'types-of-arrays-multidimensional', 'High', 'Intermediate', 3, '1D arrays, 2D matrices, and Jagged/Ragged arrays (arrays of arrays where sub-arrays have different lengths) with memory layout visualization.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Types of Arrays (Single & Multi-Dimensional, Jagged Arrays) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Types of Arrays (Single & Multi-Dimensional, Jagged Arrays) Quiz', 'Test your knowledge on Types of Arrays (Single & Multi-Dimensional, Jagged Arrays) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'Array Operations & Common Interview Traversal Patterns', 'array-operations-traversal', 'High', 'Intermediate', 4, 'Searching (Linear, Binary), In-place Reversal, Finding Min/Max, Frequency Counting, Array Copying (System.arraycopy, clone), and Subarrays.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Array Operations & Common Interview Traversal Patterns Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Array Operations & Common Interview Traversal Patterns Quiz', 'Test your knowledge on Array Operations & Common Interview Traversal Patterns with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'java.util.Arrays Utility Class', 'arrays-utility-class', 'High', 'Intermediate', 5, 'Standard helper methods: Arrays.sort(), Arrays.binarySearch(), Arrays.equals(), Arrays.deepToString(), Arrays.copyOf(), and Arrays.asList().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'java.util.Arrays Utility Class Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'java.util.Arrays Utility Class Quiz', 'Test your knowledge on java.util.Arrays Utility Class with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 4, 'java.util.Random Class in Java', 'random-class-in-java', 'Medium', 'Beginner', 6, 'Pseudo-random number generation: nextInt(), nextDouble(), nextBoolean(), seed configuration, bounds setting, and Math.random() comparison.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'java.util.Random Class in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'java.util.Random Class in Java Quiz', 'Test your knowledge on java.util.Random Class in Java with randomized multiple-choice questions.', 'Beginner', 10, 'General');

-- Module 5: Module 5: Strings – Complete Concepts
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (5, 1, 'Module 5: Strings – Complete Concepts', 'strings-complete-concepts', 'String immutability, String Constant Pool, String methods, StringBuffer vs StringBuilder comparisons, and high-frequency interview coding patterns.', 'Very High', 5, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'Introduction to Strings & String Immutability', 'strings-immutability', 'Very High', 'Intermediate', 1, 'Why String is immutable in Java: security, String pool caching, hashcode caching, and multithreading thread-safety.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Introduction to Strings & String Immutability Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Introduction to Strings & String Immutability Quiz', 'Test your knowledge on Introduction to Strings & String Immutability with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'String Constant Pool (SCP) & Heap Allocation', 'string-constant-pool-heap', 'Very High', 'Intermediate', 2, 'Direct literal creation vs new String() object allocation, SCP relocation from PermGen to Heap in Java 7, and intern() method mechanics.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'String Constant Pool (SCP) & Heap Allocation Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'String Constant Pool (SCP) & Heap Allocation Quiz', 'Test your knowledge on String Constant Pool (SCP) & Heap Allocation with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'Essential String Class Methods & Manipulation', 'string-class-methods', 'Very High', 'Beginner', 3, 'length(), charAt(), substring(), equals() vs ==, equalsIgnoreCase(), compareTo(), contains(), indexOf(), replace(), split(), trim(), toCharArray().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Essential String Class Methods & Manipulation Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Essential String Class Methods & Manipulation Quiz', 'Test your knowledge on Essential String Class Methods & Manipulation with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'StringBuffer Class & Mutable Strings', 'stringbuffer-class', 'Very High', 'Intermediate', 4, 'Thread-safe mutable string sequence, synchronized methods, append(), insert(), reverse(), capacity() growth algorithm, and ensureCapacity().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'StringBuffer Class & Mutable Strings Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'StringBuffer Class & Mutable Strings Quiz', 'Test your knowledge on StringBuffer Class & Mutable Strings with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'StringBuilder Class & High-Performance Strings', 'stringbuilder-class', 'Very High', 'Intermediate', 5, 'Non-synchronized high-performance mutable string alternative introduced in Java 5 for single-threaded string concatenation pipelines.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'StringBuilder Class & High-Performance Strings Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'StringBuilder Class & High-Performance Strings Quiz', 'Test your knowledge on StringBuilder Class & High-Performance Strings with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'String vs StringBuffer vs StringBuilder (Deep Comparison)', 'string-vs-stringbuffer-vs-stringbuilder', 'Very High', 'Intermediate', 6, 'Exhaustive 6-point comparison: Immutability, Thread-Safety, Speed/Performance, Storage Location, Bytecode concatenation (+ operator), and Usage Scenarios.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'String vs StringBuffer vs StringBuilder (Deep Comparison) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'String vs StringBuffer vs StringBuilder (Deep Comparison) Quiz', 'Test your knowledge on String vs StringBuffer vs StringBuilder (Deep Comparison) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 5, 'Top String Interview Coding Questions & Algorithms', 'top-string-interview-programs', 'Very High', 'Advanced', 7, 'Reverse a string, Check palindrome, Anagram verification, First non-repeated character, Count character frequencies, and Remove duplicate characters.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Top String Interview Coding Questions & Algorithms Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Top String Interview Coding Questions & Algorithms Quiz', 'Test your knowledge on Top String Interview Coding Questions & Algorithms with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 6: Module 6: Methods and Recursion
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (6, 1, 'Module 6: Methods and Recursion', 'methods-and-recursion', 'Method declaration, user-defined method classification, call-by-value semantics, method overloading, recursion patterns, and constructor distinctions.', 'High', 6, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Methods in Java & Anatomy of a Method', 'methods-in-java-anatomy', 'High', 'Beginner', 1, 'Structure of a method: Access Modifier, Return Type, Method Name, Parameter List, Throws Clause, and Method Body.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Methods in Java & Anatomy of a Method Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Methods in Java & Anatomy of a Method Quiz', 'Test your knowledge on Methods in Java & Anatomy of a Method with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Classification of User-Defined Methods', 'user-defined-methods-classification', 'High', 'Beginner', 2, '4 architectural patterns: No args & No return, With args & No return, No args & With return, and With args & With return.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Classification of User-Defined Methods Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Classification of User-Defined Methods Quiz', 'Test your knowledge on Classification of User-Defined Methods with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Method Parameters, Return Types & Call-by-Value Mechanics', 'method-parameters-call-by-value', 'High', 'Intermediate', 3, 'Proof that Java is strictly Pass-by-Value (passing copies of primitive values vs passing copies of object reference pointers).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Parameters, Return Types & Call-by-Value Mechanics Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Parameters, Return Types & Call-by-Value Mechanics Quiz', 'Test your knowledge on Method Parameters, Return Types & Call-by-Value Mechanics with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Method Overloading & Overloading Resolution Rules', 'method-overloading-rules', 'Very High', 'Intermediate', 4, 'Compile-time polymorphism: varying number of parameters, varying data types, automatic type promotion rules, and ambiguity traps.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Overloading & Overloading Resolution Rules Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Overloading & Overloading Resolution Rules Quiz', 'Test your knowledge on Method Overloading & Overloading Resolution Rules with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Function / Method Recursion & Base Conditions', 'method-recursion-base-conditions', 'High', 'Intermediate', 5, 'Direct and indirect recursion, call stack frame allocation, base stopping conditions, avoiding StackOverflowError, and recursion vs iteration.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Function / Method Recursion & Base Conditions Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Function / Method Recursion & Base Conditions Quiz', 'Test your knowledge on Function / Method Recursion & Base Conditions with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 6, 'Constructor vs Method (Comprehensive Differences)', 'constructor-vs-method', 'Very High', 'Intermediate', 6, 'Detailed tabular distinction: Purpose, Naming rules, Return type, Invocation mechanism, Inheritance behavior, and Default provision by compiler.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Constructor vs Method (Comprehensive Differences) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Constructor vs Method (Comprehensive Differences) Quiz', 'Test your knowledge on Constructor vs Method (Comprehensive Differences) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

-- Module 7: Module 7: Constructors and Initialization Blocks
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (7, 1, 'Module 7: Constructors and Initialization Blocks', 'constructors-and-initialization-blocks', 'Constructor types, copy constructors, constructor chaining with this() and super(), static vs instance blocks, and garbage collection.', 'Very High', 7, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Constructors in Java (Role & Need in Object Lifecycle)', 'constructors-in-java-role', 'Very High', 'Beginner', 1, 'Initializing object state during instantiation with new, default values vs explicit initialization, and compiler-generated default constructor.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Constructors in Java (Role & Need in Object Lifecycle) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Constructors in Java (Role & Need in Object Lifecycle) Quiz', 'Test your knowledge on Constructors in Java (Role & Need in Object Lifecycle) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Types of Constructors (Default, No-Arg, Parameterized)', 'types-of-constructors', 'Very High', 'Beginner', 2, 'Deep dive into compiler-provided default constructor, user-defined no-argument constructor, and parameterized constructors for dynamic state.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Types of Constructors (Default, No-Arg, Parameterized) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Types of Constructors (Default, No-Arg, Parameterized) Quiz', 'Test your knowledge on Types of Constructors (Default, No-Arg, Parameterized) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Copy Constructor in Java', 'copy-constructor-in-java', 'High', 'Intermediate', 3, 'Creating duplicate objects by passing existing object reference, shallow copy vs deep copy concepts, and comparison with Cloneable/clone().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Copy Constructor in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Copy Constructor in Java Quiz', 'Test your knowledge on Copy Constructor in Java with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Constructor Chaining (using this() and super())', 'constructor-chaining-this-super', 'Very High', 'Intermediate', 4, 'Invoking overloaded constructors within same class using this() and parent class constructors using super(), first-statement rule, and recursive call compile errors.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Constructor Chaining (using this() and super()) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Constructor Chaining (using this() and super()) Quiz', 'Test your knowledge on Constructor Chaining (using this() and super()) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Static Blocks vs Instance Initializer Blocks', 'static-block-vs-instance-block', 'Very High', 'Intermediate', 5, 'Class loading execution with static { } vs object creation execution with { } instance blocks, execution sequence, and multiple blocks ordering.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Static Blocks vs Instance Initializer Blocks Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Static Blocks vs Instance Initializer Blocks Quiz', 'Test your knowledge on Static Blocks vs Instance Initializer Blocks with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Differences: Instance Block vs Static Block vs Constructor', 'instance-block-vs-static-block-vs-constructor', 'Very High', 'Intermediate', 6, 'Exhaustive execution lifecycle order: Static variables & blocks (once at class load) → Instance variables & blocks → Constructor body.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Differences: Instance Block vs Static Block vs Constructor Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Differences: Instance Block vs Static Block vs Constructor Quiz', 'Test your knowledge on Differences: Instance Block vs Static Block vs Constructor with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 7, 'Garbage Collection & Object Finalization', 'garbage-collection-finalization', 'Very High', 'Intermediate', 7, 'Automatic memory management, unreferenced object eligibility (nulling, reassigning, island of isolation), System.gc(), and deprecation of finalize().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Garbage Collection & Object Finalization Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Garbage Collection & Object Finalization Quiz', 'Test your knowledge on Garbage Collection & Object Finalization with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

-- Module 8: Module 8: Object-Oriented Programming (OOP)
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (8, 1, 'Module 8: Object-Oriented Programming (OOP)', 'object-oriented-programming-oop', 'The foundational pillars of OOP: classes, objects, encapsulation, inheritance, polymorphism, and abstraction design principles.', 'Very High', 8, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Core Principles of Object-Oriented Programming (OOP)', 'core-oop-principles', 'Very High', 'Beginner', 1, 'Paradigm comparison: Procedural vs Object-Oriented, Real-world modeling, Code reusability, Modularity, and Extensibility.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Core Principles of Object-Oriented Programming (OOP) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Core Principles of Object-Oriented Programming (OOP) Quiz', 'Test your knowledge on Core Principles of Object-Oriented Programming (OOP) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Classes, Objects and Object State', 'classes-and-objects', 'Very High', 'Beginner', 2, 'Class as a blueprint/template, Object as a physical instance, State (fields), Behavior (methods), and Identity in Heap memory.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Classes, Objects and Object State Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Classes, Objects and Object State Quiz', 'Test your knowledge on Classes, Objects and Object State with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Encapsulation & Data Hiding (Accessors & Mutators)', 'encapsulation-data-hiding', 'Very High', 'Beginner', 3, 'Binding data and methods together, private fields with public getters/setters, validation logic, immutability, and JavaBeans specification.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Encapsulation & Data Hiding (Accessors & Mutators) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Encapsulation & Data Hiding (Accessors & Mutators) Quiz', 'Test your knowledge on Encapsulation & Data Hiding (Accessors & Mutators) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Inheritance in Java & Types of Inheritance', 'inheritance-in-java-types', 'Very High', 'Intermediate', 4, 'IS-A relationship using extends keyword, Single, Multilevel, and Hierarchical inheritance, and why Multiple Inheritance of classes is prohibited in Java.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Inheritance in Java & Types of Inheritance Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Inheritance in Java & Types of Inheritance Quiz', 'Test your knowledge on Inheritance in Java & Types of Inheritance with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Polymorphism in Java (Compile-Time vs Runtime)', 'polymorphism-compile-runtime', 'Very High', 'Intermediate', 5, 'One interface, multiple forms: Compile-time polymorphism (Method Overloading) vs Runtime polymorphism (Method Overriding).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Polymorphism in Java (Compile-Time vs Runtime) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Polymorphism in Java (Compile-Time vs Runtime) Quiz', 'Test your knowledge on Polymorphism in Java (Compile-Time vs Runtime) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 8, 'Abstraction in Java & Design Contracts', 'abstraction-in-java-design', 'Very High', 'Intermediate', 6, 'Hiding implementation complexity and exposing essential functionality, achieving partial abstraction with abstract classes vs 100% with interfaces.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Abstraction in Java & Design Contracts Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Abstraction in Java & Design Contracts Quiz', 'Test your knowledge on Abstraction in Java & Design Contracts with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

-- Module 9: Module 9: Advanced OOP Concepts
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (9, 1, 'Module 9: Advanced OOP Concepts', 'advanced-oop-concepts', 'Overriding rules, dynamic dispatch, method hiding, final keyword, object casting, equals/hashCode contracts, relationships, and interfaces.', 'Very High', 9, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Method Overriding & Rules for Overriding', 'method-overriding-rules', 'Very High', 'Intermediate', 1, 'Rules: Same method signature, covariant return types, access modifier visibility rules (cannot be more restrictive), and checked exception rules.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Overriding & Rules for Overriding Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Overriding & Rules for Overriding Quiz', 'Test your knowledge on Method Overriding & Rules for Overriding with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Method Overloading vs Method Overriding', 'method-overloading-vs-overriding', 'Very High', 'Intermediate', 2, 'Tabular difference: Binding time (Static/Early vs Dynamic/Late), Class context (same class vs inheritance hierarchy), and Return type requirements.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Overloading vs Method Overriding Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Overloading vs Method Overriding Quiz', 'Test your knowledge on Method Overloading vs Method Overriding with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Dynamic Method Dispatch (Runtime Polymorphism)', 'dynamic-method-dispatch', 'Very High', 'Advanced', 3, 'Upcasting (Parent p = new Child()), resolution of overridden instance methods at runtime based on the actual object type in Heap memory.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Dynamic Method Dispatch (Runtime Polymorphism) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Dynamic Method Dispatch (Runtime Polymorphism) Quiz', 'Test your knowledge on Dynamic Method Dispatch (Runtime Polymorphism) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Method Hiding & Static Method Binding', 'method-hiding-static-methods', 'High', 'Advanced', 4, 'Why static methods cannot be overridden, compile-time binding based on reference type, and method hiding mechanics.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Hiding & Static Method Binding Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Hiding & Static Method Binding Quiz', 'Test your knowledge on Method Hiding & Static Method Binding with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'final Keyword (Final Variables, Methods and Classes)', 'final-keyword-variables-methods-classes', 'Very High', 'Intermediate', 5, 'Immutability and security: Final variables (constants), Final methods (prevent overriding), and Final classes (prevent inheritance, e.g., String).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'final Keyword (Final Variables, Methods and Classes) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'final Keyword (Final Variables, Methods and Classes) Quiz', 'Test your knowledge on final Keyword (Final Variables, Methods and Classes) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Object Type Casting & instanceof Operator', 'object-type-casting-instanceof', 'High', 'Intermediate', 6, 'Upcasting (safe/implicit) vs Downcasting (explicit, requires instanceof check to avoid ClassCastException) and pattern matching for instanceof.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Object Type Casting & instanceof Operator Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Object Type Casting & instanceof Operator Quiz', 'Test your knowledge on Object Type Casting & instanceof Operator with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'java.lang.Object Class: equals(), hashCode(), and toString()', 'object-class-equals-hashcode-tostring', 'Very High', 'Advanced', 7, 'The equals() and hashCode() contract: reflexivity, symmetry, transitivity, consistency, hashing buckets integrity, and customizing toString().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'java.lang.Object Class: equals(), hashCode(), and toString() Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'java.lang.Object Class: equals(), hashCode(), and toString() Quiz', 'Test your knowledge on java.lang.Object Class: equals(), hashCode(), and toString() with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Object Relationships: IS-A vs HAS-A (Aggregation & Composition)', 'relationships-isa-hasa-composition', 'Very High', 'Intermediate', 8, 'Inheritance (IS-A) vs Association (HAS-A): Aggregation (loose coupling / weak relationship) vs Composition (tight coupling / strong ownership lifecycle).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Object Relationships: IS-A vs HAS-A (Aggregation & Composition) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Object Relationships: IS-A vs HAS-A (Aggregation & Composition) Quiz', 'Test your knowledge on Object Relationships: IS-A vs HAS-A (Aggregation & Composition) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Abstract Classes & Abstract Methods', 'abstract-classes-and-methods', 'Very High', 'Intermediate', 9, 'abstract keyword, non-instantiable classes, abstract methods (no body), concrete methods, constructors in abstract classes, and template design pattern.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Abstract Classes & Abstract Methods Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Abstract Classes & Abstract Methods Quiz', 'Test your knowledge on Abstract Classes & Abstract Methods with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Interfaces in Java & Characteristics of Interfaces', 'interfaces-in-java-characteristics', 'Very High', 'Intermediate', 10, 'Interface blueprint: public static final constants, public abstract methods, implements keyword, multiple inheritance of interfaces, and loose coupling.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Interfaces in Java & Characteristics of Interfaces Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Interfaces in Java & Characteristics of Interfaces Quiz', 'Test your knowledge on Interfaces in Java & Characteristics of Interfaces with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 9, 'Interface vs Abstract Class (Architectural Comparison)', 'interface-vs-abstract-class', 'Very High', 'Very High', 11, 'When to choose an abstract class (code sharing, non-static fields, stateful) vs an interface (defining a contract/capability, multiple implementations).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Interface vs Abstract Class (Architectural Comparison) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Interface vs Abstract Class (Architectural Comparison) Quiz', 'Test your knowledge on Interface vs Abstract Class (Architectural Comparison) with randomized multiple-choice questions.', 'Very High', 10, 'General');

-- Module 10: Module 10: Java Memory Management
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (10, 1, 'Module 10: Java Memory Management', 'java-memory-management', 'JVM runtime memory regions: Method Area, Heap, Stack, PC Registers, Native Stack, and execution engine mechanics.', 'High', 10, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Overview of JVM Architecture & Runtime Data Areas', 'jvm-runtime-data-areas-overview', 'Very High', 'Intermediate', 1, 'The 5 JVM memory areas divided into Thread-shared (Heap, Method Area) and Thread-private (Stack, PC Register, Native Method Stack).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Overview of JVM Architecture & Runtime Data Areas Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Overview of JVM Architecture & Runtime Data Areas Quiz', 'Test your knowledge on Overview of JVM Architecture & Runtime Data Areas with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Method Area & Metaspace', 'method-area-metaspace', 'High', 'Advanced', 2, 'Storing class metadata, static fields, bytecode, constant pool, and transition from PermGen (fixed JVM memory) to Metaspace (native OS memory) in Java 8.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method Area & Metaspace Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method Area & Metaspace Quiz', 'Test your knowledge on Method Area & Metaspace with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Heap Memory (Young Generation, Old Generation, Eden, Survivor)', 'heap-memory-generations', 'Very High', 'Advanced', 3, 'Object storage, generational hypothesis: Young Gen (Eden, S0, S1), Old/Tenured Gen, Minor GC vs Major GC (Full GC), and OutOfMemoryError: Java heap space.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Heap Memory (Young Generation, Old Generation, Eden, Survivor) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Heap Memory (Young Generation, Old Generation, Eden, Survivor) Quiz', 'Test your knowledge on Heap Memory (Young Generation, Old Generation, Eden, Survivor) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Stack Memory & Stack Frames Structure', 'stack-memory-stack-frames', 'Very High', 'Intermediate', 4, 'Thread execution stack: Stack Frame anatomy (Local Variable Array, Operand Stack, Frame Data), LIFO push/pop on method call/return, and StackOverflowError.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Stack Memory & Stack Frames Structure Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Stack Memory & Stack Frames Structure Quiz', 'Test your knowledge on Stack Memory & Stack Frames Structure with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Program Counter (PC) Registers', 'pc-registers-in-jvm', 'Medium', 'Intermediate', 5, 'Thread-private register tracking the memory address of the JVM bytecode instruction currently being executed by the thread.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Program Counter (PC) Registers Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Program Counter (PC) Registers Quiz', 'Test your knowledge on Program Counter (PC) Registers with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Native Method Stack & JNI', 'native-method-stack-jni', 'Medium', 'Advanced', 6, 'Memory dedicated to executing native C/C++ libraries invoked through Java Native Interface (JNI).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Native Method Stack & JNI Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Native Method Stack & JNI Quiz', 'Test your knowledge on Native Method Stack & JNI with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'JVM Execution Engine (Interpreter, JIT Compiler, Garbage Collector)', 'jvm-execution-engine-jit', 'Very High', 'Advanced', 7, 'How JVM runs bytecode: Line-by-line Interpreter, Hotspot JIT Compiler (C1 client, C2 server, tiered compilation, inlining, escape analysis), and GC.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'JVM Execution Engine (Interpreter, JIT Compiler, Garbage Collector) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'JVM Execution Engine (Interpreter, JIT Compiler, Garbage Collector) Quiz', 'Test your knowledge on JVM Execution Engine (Interpreter, JIT Compiler, Garbage Collector) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 10, 'Stack Memory vs Heap Memory (Key Differences)', 'stack-vs-heap-memory-differences', 'Very High', 'Intermediate', 8, 'Exhaustive comparison: Allocation type, Thread safety, Access speed, Memory lifespan, Error types (StackOverflowError vs OutOfMemoryError).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Stack Memory vs Heap Memory (Key Differences) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Stack Memory vs Heap Memory (Key Differences) Quiz', 'Test your knowledge on Stack Memory vs Heap Memory (Key Differences) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

-- Module 11: Module 11: Packages and Access Modifiers
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (11, 1, 'Module 11: Packages and Access Modifiers', 'packages-and-access-modifiers', 'Package organization, naming conventions, user-defined packages, access modifiers (private, default, protected, public), and access matrices.', 'Medium', 11, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 11, 'Packages in Java (Need, Built-in and Custom Packages)', 'packages-in-java-need', 'Medium', 'Beginner', 1, 'Namespacing to prevent naming conflicts, modularity, access protection, and reverse-domain naming convention (e.g., com.interviewpocket).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Packages in Java (Need, Built-in and Custom Packages) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Packages in Java (Need, Built-in and Custom Packages) Quiz', 'Test your knowledge on Packages in Java (Need, Built-in and Custom Packages) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 11, 'Creating, Compiling and Importing Packages', 'creating-importing-packages', 'Medium', 'Beginner', 2, 'package declaration, javac -d compilation flag, import statements (single class vs wildcard *), and static import syntax.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Creating, Compiling and Importing Packages Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Creating, Compiling and Importing Packages Quiz', 'Test your knowledge on Creating, Compiling and Importing Packages with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 11, 'Access Modifiers in Java (private, default, protected, public)', 'access-modifiers-in-java', 'Very High', 'Beginner', 3, 'Definition and scope of the 4 access levels applied to classes, interfaces, constructors, methods, and variables.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Access Modifiers in Java (private, default, protected, public) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Access Modifiers in Java (private, default, protected, public) Quiz', 'Test your knowledge on Access Modifiers in Java (private, default, protected, public) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 11, 'Package Access Matrix & Visibility Scope', 'access-modifiers-matrix-visibility', 'Very High', 'Intermediate', 4, 'The definitive 4x5 access table: Same Class, Same Package Subclass, Same Package Non-Subclass, Different Package Subclass, Different Package Non-Subclass.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Package Access Matrix & Visibility Scope Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Package Access Matrix & Visibility Scope Quiz', 'Test your knowledge on Package Access Matrix & Visibility Scope with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

-- Module 12: Module 12: Exception Handling
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (12, 1, 'Module 12: Exception Handling', 'exception-handling', 'Throwable hierarchy, Checked vs Unchecked exceptions, try/catch/finally, try-with-resources, throw vs throws, and custom exceptions.', 'Very High', 12, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Introduction to Exception Handling & Robustness', 'introduction-to-exception-handling', 'Very High', 'Beginner', 1, 'Maintaining normal program flow during runtime disruptions, unhandled exception termination, and default exception handler.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Introduction to Exception Handling & Robustness Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Introduction to Exception Handling & Robustness Quiz', 'Test your knowledge on Introduction to Exception Handling & Robustness with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Java Exception Hierarchy (Throwable, Exception, Error)', 'exception-hierarchy-throwable', 'Very High', 'Intermediate', 2, 'Object → Throwable → (Error and Exception). Direct subclasses of Exception vs RuntimeException branches.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Java Exception Hierarchy (Throwable, Exception, Error) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Java Exception Hierarchy (Throwable, Exception, Error) Quiz', 'Test your knowledge on Java Exception Hierarchy (Throwable, Exception, Error) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Errors vs Exceptions (Critical Distinctions)', 'error-vs-exception-differences', 'Very High', 'Intermediate', 3, 'Irrecoverable system-level failures (OutOfMemoryError, StackOverflowError) vs recoverable application-level conditions (IOException, SQLException).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Errors vs Exceptions (Critical Distinctions) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Errors vs Exceptions (Critical Distinctions) Quiz', 'Test your knowledge on Errors vs Exceptions (Critical Distinctions) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Checked Exceptions vs Unchecked Exceptions', 'checked-vs-unchecked-exceptions', 'Very High', 'Intermediate', 4, 'Compile-time verified (checked) exceptions requiring catch/throws vs Runtime unchecked exceptions (NullPointerException, ArithmeticException).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Checked Exceptions vs Unchecked Exceptions Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Checked Exceptions vs Unchecked Exceptions Quiz', 'Test your knowledge on Checked Exceptions vs Unchecked Exceptions with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'try, catch, and finally Blocks & Flow Control', 'try-catch-finally-blocks', 'Very High', 'Intermediate', 5, 'try block risky code, catch block handling, multiple catch blocks (subclass before superclass rule), and finally block cleanup guarantees.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'try, catch, and finally Blocks & Flow Control Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'try, catch, and finally Blocks & Flow Control Quiz', 'Test your knowledge on try, catch, and finally Blocks & Flow Control with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Automatic Resource Management: try-with-resources', 'try-with-resources-autocloseable', 'Very High', 'Intermediate', 6, 'Java 7+ syntactic improvement, AutoCloseable and Closeable interfaces, automatic closing of streams/connections, and suppressed exceptions.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Automatic Resource Management: try-with-resources Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Automatic Resource Management: try-with-resources Quiz', 'Test your knowledge on Automatic Resource Management: try-with-resources with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'throw vs throws Keywords (Usage & Differences)', 'throw-vs-throws-keywords', 'Very High', 'Intermediate', 7, 'throw (explicitly raising an exception object inside a method) vs throws (declaring potential checked exceptions in method signature).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'throw vs throws Keywords (Usage & Differences) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'throw vs throws Keywords (Usage & Differences) Quiz', 'Test your knowledge on throw vs throws Keywords (Usage & Differences) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Exception Propagation & Stack Trace Unwinding', 'exception-propagation-stack-trace', 'High', 'Intermediate', 8, 'How unchecked exceptions automatically drop down the call stack if uncaught, stack trace interpretation, and checked exception propagation rules.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Exception Propagation & Stack Trace Unwinding Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Exception Propagation & Stack Trace Unwinding Quiz', 'Test your knowledge on Exception Propagation & Stack Trace Unwinding with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Custom / User-Defined Exceptions Creation', 'custom-user-defined-exceptions', 'Very High', 'Intermediate', 9, 'Extending Exception for custom checked exceptions vs extending RuntimeException for custom unchecked business exceptions with error codes.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Custom / User-Defined Exceptions Creation Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Custom / User-Defined Exceptions Creation Quiz', 'Test your knowledge on Custom / User-Defined Exceptions Creation with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 12, 'Top Exception Handling Tricky Questions & Rules', 'exception-handling-tricky-questions', 'Very High', 'Advanced', 10, 'finally with return statement, System.exit() behavior, catch block with pipe (|) multi-catch, and overriding methods with exception clauses.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Top Exception Handling Tricky Questions & Rules Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Top Exception Handling Tricky Questions & Rules Quiz', 'Test your knowledge on Top Exception Handling Tricky Questions & Rules with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 13: Module 13: Wrapper Classes, Autoboxing and Unboxing
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (13, 1, 'Module 13: Wrapper Classes, Autoboxing and Unboxing', 'wrapper-classes-autoboxing-unboxing', 'Object wrappers for primitives, autoboxing and unboxing mechanics, utility conversion methods, and the Integer cache trap.', 'Medium', 13, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 13, 'Role and Need of Wrapper Classes in Java', 'wrapper-classes-role-need', 'High', 'Beginner', 1, 'Why Java needs wrapper classes: Collections store only objects, multithreading synchronization, null state representation, and utility methods.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Role and Need of Wrapper Classes in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Role and Need of Wrapper Classes in Java Quiz', 'Test your knowledge on Role and Need of Wrapper Classes in Java with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 13, 'Primitive Types to Wrapper Classes Mapping', 'primitive-wrapper-mapping', 'High', 'Beginner', 2, 'Mapping byte→Byte, short→Short, int→Integer, long→Long, float→Float, double→Double, char→Character, boolean→Boolean, and Number superclass.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Primitive Types to Wrapper Classes Mapping Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Primitive Types to Wrapper Classes Mapping Quiz', 'Test your knowledge on Primitive Types to Wrapper Classes Mapping with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 13, 'Autoboxing and Auto-Unboxing', 'autoboxing-and-unboxing-mechanics', 'Very High', 'Intermediate', 3, 'Automatic conversion by javac: primitive to wrapper (valueOf()) and wrapper to primitive (intValue(), doubleValue()), and performance overhead.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Autoboxing and Auto-Unboxing Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Autoboxing and Auto-Unboxing Quiz', 'Test your knowledge on Autoboxing and Auto-Unboxing with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 13, 'Parsing, Conversion & Utility Methods', 'wrapper-parsing-conversion-methods', 'Medium', 'Beginner', 4, 'parseInt(), parseDouble(), toString(), valueOf(), toBinaryString(), constants like Integer.MAX_VALUE and MIN_VALUE.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Parsing, Conversion & Utility Methods Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Parsing, Conversion & Utility Methods Quiz', 'Test your knowledge on Parsing, Conversion & Utility Methods with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 13, 'Java Integer Cache & Tricky Equality Scenarios', 'integer-cache-tricky-equality', 'Very High', 'Advanced', 5, 'The -128 to 127 byte caching pool: why Integer a = 100; Integer b = 100; a == b is true, but with 200 it is false, and comparing with equals().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Java Integer Cache & Tricky Equality Scenarios Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Java Integer Cache & Tricky Equality Scenarios Quiz', 'Test your knowledge on Java Integer Cache & Tricky Equality Scenarios with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 14: Module 14: Multithreading
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (14, 1, 'Module 14: Multithreading', 'multithreading', 'Thread lifecycle, thread creation, synchronization, inter-thread communication with wait/notify, thread safety, and deadlock prevention.', 'High', 14, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Multitasking vs Multithreading Concepts', 'multitasking-vs-multithreading', 'High', 'Beginner', 1, 'Process-based vs Thread-based multitasking, shared memory space benefits, reduced context switching overhead, and concurrency vs parallelism.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Multitasking vs Multithreading Concepts Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Multitasking vs Multithreading Concepts Quiz', 'Test your knowledge on Multitasking vs Multithreading Concepts with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Thread Life Cycle & States in Java', 'thread-life-cycle-states', 'Very High', 'Intermediate', 2, 'The 6 Thread.State enum states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED with state transition diagram.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Thread Life Cycle & States in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Thread Life Cycle & States in Java Quiz', 'Test your knowledge on Thread Life Cycle & States in Java with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Thread Creation: Thread Class vs Runnable Interface', 'thread-creation-thread-vs-runnable', 'Very High', 'Intermediate', 3, 'Extending Thread vs implementing Runnable, separation of task from worker thread, preserving inheritance, and Java 5 Callable/Future preview.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Thread Creation: Thread Class vs Runnable Interface Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Thread Creation: Thread Class vs Runnable Interface Quiz', 'Test your knowledge on Thread Creation: Thread Class vs Runnable Interface with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Thread Priorities & Daemon Threads', 'thread-priorities-daemon-threads', 'High', 'Intermediate', 4, 'Thread priority scale (1 MIN to 10 MAX, NORM=5), JVM thread scheduler non-guarantee, daemon background threads, and setDaemon(true).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Thread Priorities & Daemon Threads Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Thread Priorities & Daemon Threads Quiz', 'Test your knowledge on Thread Priorities & Daemon Threads with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Thread Synchronization & synchronized Keyword', 'thread-synchronization-synchronized', 'Very High', 'Advanced', 5, 'Preventing race conditions on shared resources, Object intrinsic monitor locks, synchronized methods vs synchronized blocks, and static class locks.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Thread Synchronization & synchronized Keyword Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Thread Synchronization & synchronized Keyword Quiz', 'Test your knowledge on Thread Synchronization & synchronized Keyword with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Inter-Thread Communication (wait, notify, notifyAll)', 'inter-thread-communication-wait-notify', 'Very High', 'Advanced', 6, 'Producer-Consumer problem, why wait(), notify(), and notifyAll() belong to Object class not Thread, monitor ownership, and IllegalMonitorStateException.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Inter-Thread Communication (wait, notify, notifyAll) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Inter-Thread Communication (wait, notify, notifyAll) Quiz', 'Test your knowledge on Inter-Thread Communication (wait, notify, notifyAll) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Thread Safety, Volatile Keyword & Atomic Variables', 'thread-safety-volatile-atomic', 'Very High', 'Advanced', 7, 'CPU cache visibility with volatile keyword, memory barriers, atomic operations, and java.util.concurrent.atomic (AtomicInteger) comparison.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Thread Safety, Volatile Keyword & Atomic Variables Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Thread Safety, Volatile Keyword & Atomic Variables Quiz', 'Test your knowledge on Thread Safety, Volatile Keyword & Atomic Variables with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 14, 'Deadlock in Multithreading: Causes, Detection & Prevention', 'deadlock-causes-prevention', 'Very High', 'Advanced', 8, 'The 4 Coffman conditions for deadlock: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait, and preventing deadlock by resource ordering.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Deadlock in Multithreading: Causes, Detection & Prevention Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Deadlock in Multithreading: Causes, Detection & Prevention Quiz', 'Test your knowledge on Deadlock in Multithreading: Causes, Detection & Prevention with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 15: Module 15: Collections Framework
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (15, 1, 'Module 15: Collections Framework', 'collections-framework', 'List, Set, Queue, Map hierarchies, internal working of HashMap, Generics type safety, and Comparable vs Comparator custom ordering.', 'Very High', 15, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Arrays vs Collection Framework', 'arrays-vs-collections-framework', 'Very High', 'Intermediate', 1, 'Detailed comparison: Fixed size vs Dynamic growth, Homogeneous vs Heterogeneous, Performance differences, Memory overhead, and Built-in algorithms.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Arrays vs Collection Framework Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Arrays vs Collection Framework Quiz', 'Test your knowledge on Arrays vs Collection Framework with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'collection vs Collection vs Collections', 'collection-vs-collection-vs-collections', 'Very High', 'Intermediate', 2, 'collection (concept) vs java.util.Collection (root interface) vs java.util.Collections (utility class containing static helper algorithms).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'collection vs Collection vs Collections Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'collection vs Collection vs Collections Quiz', 'Test your knowledge on collection vs Collection vs Collections with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Collections Hierarchy & Root Interfaces', 'collections-hierarchy-root-interfaces', 'Very High', 'Intermediate', 3, 'Iterable → Collection → (List, Set, Queue). Why Map does not extend Collection interface, and common Collection methods.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Collections Hierarchy & Root Interfaces Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Collections Hierarchy & Root Interfaces Quiz', 'Test your knowledge on Collections Hierarchy & Root Interfaces with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'List Interface (ArrayList, LinkedList, Vector, Stack)', 'list-interface-arraylist-linkedlist', 'Very High', 'Intermediate', 4, 'Ordered collection with index access: ArrayList (resizable array, fast read), LinkedList (doubly-linked list, fast insert/delete), Vector (synchronized), Stack (LIFO).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'List Interface (ArrayList, LinkedList, Vector, Stack) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'List Interface (ArrayList, LinkedList, Vector, Stack) Quiz', 'Test your knowledge on List Interface (ArrayList, LinkedList, Vector, Stack) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Set Interface (HashSet, LinkedHashSet, TreeSet)', 'set-interface-hashset-treeset', 'Very High', 'Intermediate', 5, 'Unique elements: HashSet (backed by HashMap, no order, O(1)), LinkedHashSet (insertion order), TreeSet (NavigableSet backed by TreeMap, Red-Black Tree, sorted order).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Set Interface (HashSet, LinkedHashSet, TreeSet) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Set Interface (HashSet, LinkedHashSet, TreeSet) Quiz', 'Test your knowledge on Set Interface (HashSet, LinkedHashSet, TreeSet) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Why Set Does Not Support Sorting Methods Directly', 'why-set-does-not-support-sort', 'Very High', 'Advanced', 6, 'Why Collections.sort(set) does not exist: Sets lack positional indexing; TreeSet is self-sorting via Comparable/Comparator; converting Set to List for custom sort.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Why Set Does Not Support Sorting Methods Directly Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Why Set Does Not Support Sorting Methods Directly Quiz', 'Test your knowledge on Why Set Does Not Support Sorting Methods Directly with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Queue Interface (PriorityQueue, Deque, ArrayDeque)', 'queue-interface-priorityqueue-deque', 'High', 'Intermediate', 7, 'FIFO processing: offer(), poll(), peek() vs add(), remove(), element(). PriorityQueue natural heap ordering, and double-ended ArrayDeque.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Queue Interface (PriorityQueue, Deque, ArrayDeque) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Queue Interface (PriorityQueue, Deque, ArrayDeque) Quiz', 'Test your knowledge on Queue Interface (PriorityQueue, Deque, ArrayDeque) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Map Interface (HashMap, LinkedHashMap, TreeMap, Hashtable)', 'map-interface-hashmap-treemap', 'Very High', 'Intermediate', 8, 'Key-Value pairs: HashMap (fast O(1), one null key), LinkedHashMap (insertion/access order), TreeMap (sorted by keys, Red-Black Tree), Hashtable (legacy synchronized).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Map Interface (HashMap, LinkedHashMap, TreeMap, Hashtable) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Map Interface (HashMap, LinkedHashMap, TreeMap, Hashtable) Quiz', 'Test your knowledge on Map Interface (HashMap, LinkedHashMap, TreeMap, Hashtable) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Internal Working of HashMap (Hashing, Buckets, Collisions, Treeification)', 'hashmap-internal-working-deepdive', 'Very High', 'Advanced', 9, 'Deep internal mechanics: Initial capacity (16), Load factor (0.75), Hash code calculation, Bucket index (n-1 & hash), Collision resolution, and Java 8 Treeification (TREEIFY_THRESHOLD = 8 to Red-Black tree).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Internal Working of HashMap (Hashing, Buckets, Collisions, Treeification) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Internal Working of HashMap (Hashing, Buckets, Collisions, Treeification) Quiz', 'Test your knowledge on Internal Working of HashMap (Hashing, Buckets, Collisions, Treeification) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Generics in Java Collections & Type Safety', 'generics-collections-type-safety', 'Very High', 'Intermediate', 10, 'Type safety at compile time, eliminating explicit type casts, generic classes/methods, wildcards (?, ? extends T, ? super T), and Type Erasure.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Generics in Java Collections & Type Safety Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Generics in Java Collections & Type Safety Quiz', 'Test your knowledge on Generics in Java Collections & Type Safety with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 15, 'Comparable vs Comparator for Custom Sorting', 'comparable-vs-comparator-sorting', 'Very High', 'Advanced', 11, 'Single natural sorting (java.lang.Comparable, compareTo()) vs multiple custom sorting strategies (java.util.Comparator, compare()), and Java 8 Comparator chaining.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Comparable vs Comparator for Custom Sorting Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Comparable vs Comparator for Custom Sorting Quiz', 'Test your knowledge on Comparable vs Comparator for Custom Sorting with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 16: Module 16: Collection Cursors
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (16, 1, 'Module 16: Collection Cursors', 'collection-cursors', 'Collection traversal mechanisms: Enumeration, Iterator, ListIterator, and fail-fast vs fail-safe iterator mechanics.', 'High', 16, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'Overview of Collection Cursors in Java', 'collection-cursors-overview', 'High', 'Intermediate', 1, 'Need for specialized traversal cursors to access elements sequentially without exposing underlying collection data structure.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Overview of Collection Cursors in Java Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Overview of Collection Cursors in Java Quiz', 'Test your knowledge on Overview of Collection Cursors in Java with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'Enumeration Cursor (Legacy Traversal)', 'enumeration-cursor-traversal', 'Medium', 'Beginner', 2, 'Legacy Java 1.0 cursor for Vector and Hashtable: hasMoreElements() and nextElement(), read-only, forward direction only.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Enumeration Cursor (Legacy Traversal) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Enumeration Cursor (Legacy Traversal) Quiz', 'Test your knowledge on Enumeration Cursor (Legacy Traversal) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'Iterator Cursor & Safe Element Removal', 'iterator-cursor-safe-removal', 'Very High', 'Intermediate', 3, 'Universal cursor for all Collection classes: hasNext(), next(), and remove() method to safely delete elements during traversal.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Iterator Cursor & Safe Element Removal Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Iterator Cursor & Safe Element Removal Quiz', 'Test your knowledge on Iterator Cursor & Safe Element Removal with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'ListIterator Cursor (Bidirectional Navigation)', 'listiterator-cursor-bidirectional', 'Very High', 'Intermediate', 4, 'List-exclusive cursor: Bidirectional traversal (hasPrevious(), previous()), index methods (nextIndex(), previousIndex()), and add(), set(), remove().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'ListIterator Cursor (Bidirectional Navigation) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'ListIterator Cursor (Bidirectional Navigation) Quiz', 'Test your knowledge on ListIterator Cursor (Bidirectional Navigation) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'Enumeration vs Iterator vs ListIterator (Direct Comparison)', 'enumeration-vs-iterator-vs-listiterator', 'Very High', 'Intermediate', 5, 'Exhaustive comparative matrix: Applicability, Movement, Read/Write operations, Method names, and Introduction versions.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Enumeration vs Iterator vs ListIterator (Direct Comparison) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Enumeration vs Iterator vs ListIterator (Direct Comparison) Quiz', 'Test your knowledge on Enumeration vs Iterator vs ListIterator (Direct Comparison) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 16, 'Fail-Fast vs Fail-Safe Iterators', 'fail-fast-vs-fail-safe-iterators', 'Very High', 'Advanced', 6, 'ConcurrentModificationException trigger via modCount flag in fail-fast (ArrayList, HashMap) vs clone-backed fail-safe (CopyOnWriteArrayList, ConcurrentHashMap).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Fail-Fast vs Fail-Safe Iterators Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Fail-Fast vs Fail-Safe Iterators Quiz', 'Test your knowledge on Fail-Fast vs Fail-Safe Iterators with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 17: Module 17: Java 8 Features and Stream API
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (17, 1, 'Module 17: Java 8 Features and Stream API', 'java-8-features-and-stream-api', 'Functional programming in Java: Lambdas, Functional Interfaces, Default/Static interface methods, Optional class, and Streams.', 'Very High', 17, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Overview of Java 8 Paradigm Shift', 'java-8-features-overview', 'Very High', 'Intermediate', 1, 'Introduction of Functional Programming to Java: Declarative vs Imperative style, behavioral parameterization, and multi-core readiness.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Overview of Java 8 Paradigm Shift Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Overview of Java 8 Paradigm Shift Quiz', 'Test your knowledge on Overview of Java 8 Paradigm Shift with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Lambda Expressions & Syntax Simplification', 'lambda-expressions-syntax', 'Very High', 'Intermediate', 2, 'Anonymous functions without names or class wrappers: (parameters) -> { body }, type inference, omitting parentheses/braces, and effectively final variables.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Lambda Expressions & Syntax Simplification Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Lambda Expressions & Syntax Simplification Quiz', 'Test your knowledge on Lambda Expressions & Syntax Simplification with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Functional Interfaces (@FunctionalInterface)', 'functional-interfaces-annotation', 'Very High', 'Intermediate', 3, 'SAM (Single Abstract Method) rule, @FunctionalInterface annotation, Object methods exemption, and using lambdas as functional interface implementations.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Functional Interfaces (@FunctionalInterface) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Functional Interfaces (@FunctionalInterface) Quiz', 'Test your knowledge on Functional Interfaces (@FunctionalInterface) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier)', 'builtin-functional-interfaces', 'Very High', 'Advanced', 4, 'java.util.function package: Predicate<T> (test), Function<T, R> (apply), Consumer<T> (accept), Supplier<T> (get), and Bi-variants (BiPredicate, BiFunction).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier) Quiz', 'Test your knowledge on Built-in Functional Interfaces (Predicate, Function, Consumer, Supplier) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Default and Static Methods in Interfaces', 'default-static-methods-interfaces', 'High', 'Intermediate', 5, 'Backward-compatible API evolution: default keyword methods, multiple inheritance conflict resolution (Diamond Problem), and utility static methods.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Default and Static Methods in Interfaces Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Default and Static Methods in Interfaces Quiz', 'Test your knowledge on Default and Static Methods in Interfaces with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Method References & Constructor References', 'method-references-constructor-references', 'High', 'Intermediate', 6, 'Compact lambda shorthand (:: operator): Reference to static method, instance method of arbitrary object, instance method of particular object, and Class::new.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Method References & Constructor References Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Method References & Constructor References Quiz', 'Test your knowledge on Method References & Constructor References with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Optional Class & Eliminating NullPointerExceptions', 'optional-class-null-safety', 'Very High', 'Intermediate', 7, 'Container object for value absence: Optional.of(), ofNullable(), empty(), isPresent(), ifPresent(), orElse(), orElseGet(), and orElseThrow().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Optional Class & Eliminating NullPointerExceptions Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Optional Class & Eliminating NullPointerExceptions Quiz', 'Test your knowledge on Optional Class & Eliminating NullPointerExceptions with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Stream API Introduction & Stream Pipeline Lifecycle', 'stream-api-introduction-lifecycle', 'Very High', 'Intermediate', 8, 'Sequence of elements supporting sequential and parallel aggregate operations: Source → Intermediate Operations → Terminal Operation (pipeline execution).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Stream API Introduction & Stream Pipeline Lifecycle Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Stream API Introduction & Stream Pipeline Lifecycle Quiz', 'Test your knowledge on Stream API Introduction & Stream Pipeline Lifecycle with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Intermediate Operations (filter, map, sorted, distinct, flatMap)', 'stream-intermediate-operations', 'Very High', 'Advanced', 9, 'Lazy evaluation pipelines: filter(Predicate), map(Function), flatMap(Function), distinct(), sorted(Comparator), peek(Consumer), limit(n), skip(n).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Intermediate Operations (filter, map, sorted, distinct, flatMap) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Intermediate Operations (filter, map, sorted, distinct, flatMap) Quiz', 'Test your knowledge on Intermediate Operations (filter, map, sorted, distinct, flatMap) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 17, 'Terminal Operations (collect, forEach, reduce, count, anyMatch)', 'stream-terminal-operations', 'Very High', 'Advanced', 10, 'Eager pipeline execution producing result: forEach(), collect(Collectors.toList()), reduce(), count(), anyMatch(), allMatch(), noneMatch(), findFirst().');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Terminal Operations (collect, forEach, reduce, count, anyMatch) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Terminal Operations (collect, forEach, reduce, count, anyMatch) Quiz', 'Test your knowledge on Terminal Operations (collect, forEach, reduce, count, anyMatch) with randomized multiple-choice questions.', 'Advanced', 10, 'General');

-- Module 18: Module 18: Date and Time API
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES (18, 1, 'Module 18: Date and Time API', 'date-and-time-api', 'Legacy Date/Calendar flaws, SimpleDateFormat, and modern immutable thread-safe java.time API (LocalDate, LocalTime, LocalDateTime).', 'Medium', 18, NOW(), NOW());

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'Legacy Date and Time (java.util.Date, Calendar & Limitations)', 'legacy-date-calendar-limitations', 'Medium', 'Beginner', 1, 'Flaws of legacy date handling: Mutability leading to bugs, 0-indexed months (January is 0), lack of time zones, and non-thread-safe formatters.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Legacy Date and Time (java.util.Date, Calendar & Limitations) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Legacy Date and Time (java.util.Date, Calendar & Limitations) Quiz', 'Test your knowledge on Legacy Date and Time (java.util.Date, Calendar & Limitations) with randomized multiple-choice questions.', 'Beginner', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'SimpleDateFormat & Custom Date Formatting', 'simpledateformat-custom-formatting', 'High', 'Intermediate', 2, 'Pattern syntax (yyyy-MM-dd HH:mm:ss), parsing strings to Date, formatting Date to strings, and the concurrency threading issue.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'SimpleDateFormat & Custom Date Formatting Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'SimpleDateFormat & Custom Date Formatting Quiz', 'Test your knowledge on SimpleDateFormat & Custom Date Formatting with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'Java 8 Modern Date/Time API Overview (java.time package)', 'java-8-time-api-overview', 'High', 'Intermediate', 3, 'Joda-Time inspired domain-driven design: Immutability, Thread-Safety, Fluent API, and clear separation of human date vs machine epoch timestamp.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'Java 8 Modern Date/Time API Overview (java.time package) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'Java 8 Modern Date/Time API Overview (java.time package) Quiz', 'Test your knowledge on Java 8 Modern Date/Time API Overview (java.time package) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'LocalDate, LocalTime, and LocalDateTime', 'localdate-localtime-localdatetime', 'High', 'Intermediate', 4, 'Core immutable domain models: LocalDate (year-month-day), LocalTime (hour-minute-second-nano), and LocalDateTime (combined date and time).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'LocalDate, LocalTime, and LocalDateTime Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'LocalDate, LocalTime, and LocalDateTime Quiz', 'Test your knowledge on LocalDate, LocalTime, and LocalDateTime with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'ZonedDateTime, Period, and Duration', 'zoneddatetime-period-duration', 'High', 'Intermediate', 5, 'Time zones handling (ZoneId, ZonedDateTime), date-based distance (Period: days, months, years), and time-based distance (Duration: seconds, nanos).');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'ZonedDateTime, Period, and Duration Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'ZonedDateTime, Period, and Duration Quiz', 'Test your knowledge on ZonedDateTime, Period, and Duration with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

INSERT INTO topics (subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES (1, 18, 'DateTimeFormatter (Thread-Safe Date Formatting)', 'datetimeformatter-thread-safety', 'High', 'Intermediate', 6, 'Modern thread-safe replacement for SimpleDateFormat: DateTimeFormatter.ofPattern(), ISO standard formatters, parse(), and format() methods.');
SET @last_topic_id = LAST_INSERT_ID();

-- Card 1: Bound Note row (initialized empty for approved content)
INSERT INTO notes (topic_id, title, created_at, updated_at)
VALUES (@last_topic_id, 'DateTimeFormatter (Thread-Safe Date Formatting) Notes', NOW(), NOW());

-- Card 3: Bound Quiz row (initialized empty for randomized question pool)
INSERT INTO quizzes (subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (1, @last_topic_id, 'DateTimeFormatter (Thread-Safe Date Formatting) Quiz', 'Test your knowledge on DateTimeFormatter (Thread-Safe Date Formatting) with randomized multiple-choice questions.', 'Intermediate', 10, 'General');

SET FOREIGN_KEY_CHECKS = 1;
