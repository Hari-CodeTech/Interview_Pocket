// Module 3: Operators and Control Statements (Topics 61-65)

module.exports = [
  {
    topicId: 61,
    slug: 'operators-in-java',
    title: 'Operators in Java (Arithmetic, Relational, Logical, Bitwise, Ternary)',
    definition: `- **Definition**: An **Operator** is a special symbol that performs specific mathematical, relational, logical, or bitwise computations on one, two, or three operands.
- **Classification**:
  1. Arithmetic (\`+\`, \`-\`, \`*\`, \`/\`, \`%\`)
  2. Unary (\`++\`, \`--\`, \`+\`, \`-\`, \`!\`, \`~\`)
  3. Relational / Comparison (\`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`)
  4. Logical (\`&&\`, \`||\`, \`!\`)
  5. Bitwise & Shift (\`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`, \`>>>\`)
  6. Assignment & Compound (\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`)
  7. Ternary / Conditional (\`? :\`)`,
    simpleExplanation: `- Operators are the verbs of the Java language. Variables are nouns (holding data); operators perform actions on those nouns to evaluate conditions, compute financial sums, or transform bit flags.`,
    importantConcepts: `- **Pre-Increment (\`++i\`) vs Post-Increment (\`i++\`)**:
  • \`++i\` (Pre): Value is incremented FIRST, then evaluated in the expression.
  • \`i++\` (Post): Current value is evaluated in the expression FIRST, then incremented afterward.
- **Short-Circuit Logical (\`&&\`, \`||\`) vs Bitwise (\`&\`, \`|\`)**:
  • \`&&\` (Short-Circuit AND): If left operand evaluates to \`false\`, the right operand is NEVER evaluated (prevents NullPointerExceptions).
  • \`||\` (Short-Circuit OR): If left operand evaluates to \`true\`, the right operand is NEVER evaluated.
  • \`&\` and \`|\`: Non-short-circuit when used on booleans; evaluates BOTH sides unconditionally.
- **Shift Operators**:
  • \`<<\` (Left Shift): Multiplies by \`2^n\` (\`5 << 2 = 5 * 4 = 20\`).
  • \`>>\` (Signed Right Shift): Divides by \`2^n\`, preserves sign bit.
  • \`>>>\` (Unsigned Right Shift): Fills highest bits with zeros regardless of sign.`,
    javaCodeExamples: `public class OperatorsDemo {
    public static void main(String[] args) {
        // 1. Pre vs Post Increment
        int a = 5;
        int pre = ++a; // a becomes 6, pre = 6
        int b = 5;
        int post = b++; // post = 5, b becomes 6
        System.out.println("Pre-increment: a=" + a + ", result=" + pre);
        System.out.println("Post-increment: b=" + b + ", result=" + post);

        // 2. Short-Circuit Safety
        String text = null;
        // Using && prevents NullPointerException because text != null is false
        if (text != null && text.length() > 0) {
            System.out.println("Has text");
        } else {
            System.out.println("Short-circuit prevented NPE on null string!");
        }

        // 3. Ternary Operator: (condition) ? valueIfTrue : valueIfFalse
        int score = 85;
        String grade = (score >= 90) ? "A" : (score >= 80) ? "B" : "C";
        System.out.println("Ternary Grade: " + grade);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  Pre-increment: a=6, result=6
  Post-increment: b=6, result=5
  Short-circuit prevented NPE on null string!
  Ternary Grade: B
  \`\`\`
- Proves how short-circuit evaluation prevents runtime errors on null checks.`,
    commonMistakes: `- Using single \`=\` (assignment) instead of \`==\` (equality check) inside conditions.
- Confusing \`>>\` (signed shift) with \`>>>\` (unsigned shift) when working with negative binary numbers.`,
    trickyInterviewConcepts: `- **What is the output of: \`int x = 5; System.out.println(x++ + ++x);\`?**
  • \`x++\` evaluates to \`5\` (and increments \`x\` to 6).
  • \`++x\` increments \`x\` to 7 and evaluates to \`7\`.
  • Result: \`5 + 7 = 12\`.`,
    interviewReadyAnswer: `- "Java operators span arithmetic, unary, relational, logical, bitwise, shift, and ternary categories."
- "Crucial interview distinctions include pre-increment (++i) vs post-increment (i++), and short-circuit operators (&&, ||) which skip right-hand evaluation when the outcome is guaranteed, preventing NullPointerExceptions."`,
    quickRevisionPoints: `- Pre (\`++i\`): Increment then use. Post (\`i++\`): Use then increment.
- \`&&\` and \`||\`: Short-circuiting.
- \`>>>\`: Unsigned right shift (fills 0s).
- Ternary: \`condition ? trueVal : falseVal\`.`
  },
  {
    topicId: 62,
    slug: 'conditional-statements-if-else',
    title: 'Conditional Statements (if, if-else, else-if ladder, nested-if)',
    definition: `- **Definition**: **Conditional Statements** are decision-making structures that direct program flow based on whether a boolean expression evaluates to \`true\` or \`false\`.
- **Forms**:
  1. Simple \`if\`
  2. \`if-else\`
  3. \`if-else-if\` ladder
  4. Nested \`if\``,
    simpleExplanation: `- **The Fork in the Road Analogy**: At a junction, a road sign checks your vehicle type. If you are an ambulance (\`true\`), take the priority lane; otherwise (\`false\`), take the standard lane. Decisions dictate which single path of code executes.`,
    syntax: `// if-else-if ladder syntax
if (condition1) {
    // executes if condition1 is true
} else if (condition2) {
    // executes if condition1 is false and condition2 is true
} else {
    // executes if all conditions above are false
}`,
    importantConcepts: `- **Strict Boolean Expression**: Unlike C/C++ where \`if (1)\` or \`if (x = 5)\` is valid, Java requires a strict \`boolean\` expression. \`if (x = 5)\` will NOT compile because \`=\` assigns an \`int\`, not a \`boolean\`.
- **Dangling Else Problem**: An \`else\` clause always pairs with the closest preceding unmatched \`if\` within the same block. Always use braces \`{}\` to avoid ambiguity.`,
    javaCodeExamples: `public class ConditionalsDemo {
    public static void main(String[] args) {
        int accountBalance = 1500;
        int withdrawalAmount = 2000;
        boolean hasOverdraftProtection = true;

        if (withdrawalAmount <= accountBalance) {
            System.out.println("Withdrawal approved: Deducted from balance.");
        } else if (hasOverdraftProtection) {
            System.out.println("Withdrawal approved via Overdraft Protection!");
        } else {
            System.out.println("Transaction declined: Insufficient funds.");
        }
    }
}`,
    outputExplanation: `- Outputs: \`Withdrawal approved via Overdraft Protection!\`
- Shows how the ladder evaluates sequentially and branches into the first matching condition.`,
    commonMistakes: `- Writing \`if (isActive == true)\` (redundant; write \`if (isActive)\`).
- Accidental semicolon after condition: \`if (x > 10); { doWork(); }\`. The semicolon terminates the if statement, causing the block to run unconditionally!`,
    interviewReadyAnswer: `- "Conditional statements in Java provide branching control based on boolean conditions."
- "Java strictly enforces boolean types in if conditions (preventing C-style numeric bugs). Best practices mandate explicit curly braces to eliminate dangling-else ambiguities."`,
    quickRevisionPoints: `- Condition MUST evaluate to \`boolean\` (\`true\`/\`false\`).
- \`else\` attaches to closest preceding \`if\`.
- Always use curly braces \`{}\` even for single-line blocks.`
  },
  {
    topicId: 63,
    slug: 'switch-statements-expressions',
    title: 'Switch Statement & Modern Switch Expressions',
    definition: `- **Definition**: A **Switch Statement** is a multi-way branch statement that tests a single variable against a list of constant values (\`case\` labels).
- **Modern Evolution**:
  • Traditional \`switch\` statement (Java 1.0+ with \`break\`).
  • String support (Java 7+).
  • Switch Expressions with arrow syntax \`->\` and \`yield\` keyword (Java 14+).`,
    simpleExplanation: `- **The Vending Machine Analogy**: Pressing button 'B4' jumps directly to coil B4 and dispenses the item. A switch statement uses jump tables/hashes for direct O(1) branching rather than checking every condition sequentially like an if-else ladder.`,
    importantConcepts: `- **Supported Types in Switch**:
  • \`byte\`, \`short\`, \`char\`, \`int\` (and their Wrapper classes).
  • \`enum\` types (Java 5+).
  • \`String\` (Java 7+).
  • Note: \`long\`, \`float\`, \`double\`, and \`boolean\` are NOT supported.
- **Fall-Through Behavior**:
  • In traditional switch, if a \`case\` matches and has NO \`break\`, execution "falls through" into subsequent cases until a \`break\` or switch end.
- **Modern Switch Expressions (Java 14+)**:
  • Uses arrow syntax: \`case VAL -> result;\`.
  • **No fall-through**: No \`break\` statements required!
  • Can return a value directly.
  • Multi-label matching: \`case 1, 2, 3 -> "Q1";\`.
  • Uses \`yield\` to return values from complex multi-line blocks.`,
    javaCodeExamples: `public class ModernSwitchDemo {
    public static void main(String[] args) {
        String day = "WEDNESDAY";

        // Modern Java 14+ Switch Expression (Returns value, no fall-through)
        String dayType = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Invalid Day";
        };

        System.out.println(day + " is a " + dayType);

        // Demonstrating yield in multi-line block
        int code = 200;
        String status = switch (code) {
            case 200 -> "OK";
            case 404 -> "Not Found";
            default -> {
                System.out.println("Logging unrecognized HTTP status code: " + code);
                yield "Unknown Error";
            }
        };
        System.out.println("HTTP Status: " + status);
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  WEDNESDAY is a Weekday
  HTTP Status: OK
  \`\`\`
- Demonstrates modern switch returning a value directly without boilerplate \`break\` statements.`,
    commonMistakes: `- Forgetting \`break\` in legacy switch, causing unintended fall-through.
- Attempting to switch on \`double\` or \`float\` (compile error: \`incompatible types\`).`,
    interviewReadyAnswer: `- "Switch statements branch based on constant values matching byte, short, char, int, enum, and String."
- "Java 14 modernized switch into expressions using arrow syntax (case ->), which eliminates fall-through bugs, allows multiple comma-separated labels, and returns values directly using the yield keyword."`,
    quickRevisionPoints: `- Supports: byte, short, char, int, enums, Strings.
- Does NOT support: float, double, long, boolean.
- Legacy: requires \`break\` to stop fall-through.
- Modern (Java 14+): \`case ->\`, no \`break\`, returns value via \`yield\`.`
  },
  {
    topicId: 64,
    slug: 'iterative-statements-loops',
    title: 'Iterative Statements & Loops (for, while, do-while, for-each)',
    definition: `- **Definition**: **Iterative Statements (Loops)** repeatedly execute a block of code as long as a specified boolean loop condition remains \`true\`.
- **Classification**:
  1. **\`for\` loop** (Definite loop, count-controlled).
  2. **\`while\` loop** (Entry-controlled indeterminate loop).
  3. **\`do-while\` loop** (Exit-controlled loop; guaranteed minimum 1 execution).
  4. **Enhanced \`for-each\` loop** (Iterable / Array traversal without index counter).`,
    simpleExplanation: `- **The Factory Assembly Conveyor Analogy**:
  • \`for\` loop: "Process exactly 100 boxes from box #1 to #100."
  • \`while\` loop: "Keep packaging boxes as long as the conveyor sensor detects an incoming box."
  • \`do-while\` loop: "Always clean the machine once, then check if further cleaning cycles are required."
  • \`for-each\` loop: "For every box in the storage room, apply a barcode label."`,
    importantDifferences: `| Dimension | for Loop | while Loop | do-while Loop |
|---|---|---|---|
| **Loop Type** | Entry-controlled | Entry-controlled | Exit-controlled |
| **Condition Check** | At the beginning of each iteration | At the beginning of each iteration | At the end of each iteration |
| **Minimum Executions** | 0 times | 0 times | **At least 1 time** |
| **Best Used When** | Number of iterations is known beforehand | Number of iterations depends on runtime condition | Code must execute at least once (e.g. CLI menus) |`,
    javaCodeExamples: `public class LoopsDemo {
    public static void main(String[] args) {
        // 1. Standard for loop
        System.out.print("For loop: ");
        for (int i = 1; i <= 3; i++) {
            System.out.print(i + " ");
        }

        // 2. while loop
        System.out.print("\\nWhile loop: ");
        int count = 1;
        while (count <= 3) {
            System.out.print(count + " ");
            count++;
        }

        // 3. do-while loop (Runs once even if condition is false)
        System.out.print("\\nDo-while loop: ");
        int val = 10;
        do {
            System.out.print("Runs once (val=" + val + ") ");
        } while (val < 5);

        // 4. Enhanced for-each loop
        System.out.print("\\nFor-each loop: ");
        String[] languages = {"Java", "Kotlin", "Scala"};
        for (String lang : languages) {
            System.out.print(lang + " ");
        }
        System.out.println();
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  For loop: 1 2 3 
  While loop: 1 2 3 
  Do-while loop: Runs once (val=10) 
  For-each loop: Java Kotlin Scala 
  \`\`\`
- Highlights that \`do-while\` executed despite \`val < 5\` being false immediately.`,
    commonMistakes: `- Forgetting loop variable update (\`i++\`) inside while loop, creating an accidental infinite loop that exhausts CPU.
- Modifying a collection inside an enhanced \`for-each\` loop (throws \`ConcurrentModificationException\`).`,
    interviewReadyAnswer: `- "Java provides four iterative constructs: for, while, do-while, and enhanced for-each."
- "The fundamental distinction is between entry-controlled loops (for, while), which check conditions before execution, and exit-controlled loops (do-while), which guarantee at least one execution."`,
    quickRevisionPoints: `- \`for\`: Best for fixed iterations.
- \`while\`: Best for condition-based iterations.
- \`do-while\`: Guaranteed minimum 1 execution.
- \`for-each\`: Clean traversal for arrays and Collections.`
  },
  {
    topicId: 65,
    slug: 'jumping-statements-break-continue-return',
    title: 'Jumping Statements (break, continue, return)',
    definition: `- **Definition**: **Jumping Statements** unconditionally transfer program control to another part of the program.
- **The Three Jump Statements**:
  1. **\`break\`**: Terminates the enclosing loop or switch statement immediately.
  2. **\`continue\`**: Skips the remainder of the current loop iteration and proceeds to the next iteration.
  3. **\`return\`**: Terminates the execution of the current method and optionally returns a value to the caller.`,
    simpleExplanation: `- Imagine a book reader:
  • \`continue\`: "This paragraph is boring, skip directly to the next page."
  • \`break\`: "Close the book completely and put it back on the shelf."
  • \`return\`: "Leave the library entirely and report back to your boss."`,
    importantConcepts: `- **Labeled \`break\` and \`continue\`**:
  • In nested loops, a standard \`break\` or \`continue\` applies only to the innermost loop.
  • A **Label** allows breaking out of or continuing an outer loop:
    \`outerLoop: for (...) { for (...) { break outerLoop; } }\`.
- **Return in Methods with \`finally\`**:
  • If a \`try\` block contains a \`return\`, the \`finally\` block STILL executes before the method officially returns!`,
    importantDifferences: `| Dimension | break | continue | return |
|---|---|---|---|
| **Effect** | Exits loop or switch completely | Skips current iteration to next | Exits the entire method |
| **Applicable To** | Loops and switch statements | Loops only | Any method or constructor |
| **Transfer Target** | First statement after the loop | Next iteration step of the loop | Calling method |`,
    javaCodeExamples: `public class JumpingStatementsDemo {
    public static void main(String[] args) {
        System.out.println("=== Demonstrating break vs continue ===");

        for (int i = 1; i <= 6; i++) {
            if (i == 3) {
                System.out.println("Skipping iteration 3 using continue");
                continue; // Skips printing 3
            }
            if (i == 5) {
                System.out.println("Stopping loop at 5 using break");
                break; // Terminates loop completely
            }
            System.out.println("Value: " + i);
        }

        // Labeled break breaking out of outer nested loop
        outer: for (int r = 1; r <= 3; r++) {
            for (int c = 1; c <= 3; c++) {
                if (r == 2 && c == 2) {
                    System.out.println("Breaking outer loop at row 2, col 2");
                    break outer;
                }
            }
        }
    }
}`,
    outputExplanation: `- Outputs:
  \`\`\`
  === Demonstrating break vs continue ===
  Value: 1
  Value: 2
  Skipping iteration 3 using continue
  Value: 4
  Stopping loop at 5 using break
  Breaking outer loop at row 2, col 2
  \`\`\`
- Proves \`continue\` bypassed 3, \`break\` terminated at 5, and labeled break exited both loops.`,
    interviewReadyAnswer: `- "Jumping statements transfer program control: break terminates the current loop or switch, continue skips to the next iteration of the loop, and return exits the current method."
- "In nested loops, labeled break and continue statements allow direct control transfer to specified outer loops."`,
    quickRevisionPoints: `- \`break\`: Exits loop / switch.
- \`continue\`: Skips current iteration.
- \`return\`: Exits method.
- Labeled loops: \`labelName: for (...) { break labelName; }\`.`
  }
];

