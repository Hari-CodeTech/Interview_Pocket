// Module 11: Packages and Access Modifiers (Topics 117-120)

module.exports = [
  {
    topicId: 117,
    slug: 'packages-in-java-need',
    title: 'Packages in Java (Need, Built-in and Custom Packages)',
    definition: `- **Package**: A namespace mechanism in Java that groups related classes, interfaces, and sub-packages into a single modular directory structure.
- **Two Primary Types**:
  1. **Built-in Packages**: Bundled with the Java standard library (e.g., \`java.lang\`, \`java.util\`, \`java.io\`, \`java.net\`, \`java.sql\`).
  2. **User-Defined Packages**: Created by developers to structure application source code (e.g., \`com.interviewpocket.service\`).`,
    simpleExplanation: `- **The File System Folder Analogy**: You wouldn't throw 5,000 photos, work spreadsheets, and tax PDFs into a single desktop folder. You create folders labeled "Vacation Photos", "Tax 2026", and "Work". Packages are folders for Java classes that prevent naming collisions and enforce access security.`,
    whyNeeded: `- **Eliminates Naming Collisions**: Multiple classes can share the name \`Date\` without conflict if housed in separate packages (\`java.util.Date\` vs \`java.sql.Date\`).
- **Enforces Encapsulation & Access Protection**: Controls package-private visibility so internal implementation classes remain hidden from outside consumers.
- **Eases Maintainability & Searchability**: Groups code by domain function (controllers, models, repositories).`,
    syntax: `// Declaring a package at the very first line of a Java file
package com.interviewpocket.models;

// Importing a class from another package
import java.util.List;
import java.util.ArrayList;`,
    importantConcepts: `- **Automatic Package Import**: The \`java.lang\` package (containing \`Object\`, \`String\`, \`System\`, \`Math\`, \`Thread\`) is automatically imported into every Java source file by default.
- **Naming Conventions**: Reverse domain name notation is universally practiced to ensure worldwide namespace uniqueness (e.g., \`com.google.cloud\`, \`org.springframework.boot\`).`,
    javaCodeExamples: `// First non-comment line must be package declaration
package com.interviewpocket.demo;

import java.util.ArrayList;
import java.util.List;

public class PackageDemo {
    public static void main(String[] args) {
        // Disambiguating two classes with the exact same name using Fully Qualified Names (FQN)
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        System.out.println("Util Date: " + utilDate);
        System.out.println("SQL Date: " + sqlDate);
    }
}`,
    outputExplanation: `- Illustrates how packages avoid class name clashes by prefixing them with their fully qualified package path.`,
    interviewReadyAnswer: `- "A package in Java is a namespace organizing related classes and interfaces into a directory hierarchy."
- "It prevents naming conflicts, controls access boundaries via package-private scope, and enhances maintainability."`,
    quickRevisionPoints: `- Namespacing mechanism mapped to directory folders.
- Prevents class naming conflicts.
- \`java.lang\` is imported implicitly by the compiler.
- Reverse domain name convention is the global standard.`
  },
  {
    topicId: 118,
    slug: 'creating-importing-packages',
    title: 'Creating, Compiling and Importing Packages',
    definition: `- **Package Authoring**: Declared using the \`package\` keyword as the first non-comment statement in a compilation unit.
- **Import Statement**: Tells the compiler where to locate external classes referenced in the file.
- **Static Import**: Allows members (fields and methods) defined in a class as \`public static\` to be used without specifying their containing class name.`,
    simpleExplanation: `- **Standard Import**: Asking a library to lend you the entire "Math Encyclopedia" so you can consult \`Math.PI\` and \`Math.sqrt()\`.
- **Static Import**: Pinning the value of \`PI\` directly onto your desk so you can write \`PI\` and \`sqrt(16)\` directly without writing \`Math.\` every time.`,
    howItWorks: `- **Compilation with \`-d\` Flag**:
  • \`javac -d . HelloWorld.java\` instructs the compiler to create the folder hierarchy matching the package declaration automatically.
- **Execution with Fully Qualified Name (FQN)**:
  • Must execute from the root directory using the full class name: \`java com.interviewpocket.demo.HelloWorld\`.`,
    syntax: `// Standard Import
import java.util.Arrays;

// Wildcard Import (Imports classes in that package, NOT sub-packages)
import java.util.*;

// Static Import
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;`,
    javaCodeExamples: `package com.interviewpocket.math;

// Static import brings static members directly into lexical scope
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class StaticImportDemo {
    public static void main(String[] args) {
        double radius = 5.0;

        // Writing 'PI' and 'pow()' bare instead of Math.PI and Math.pow()
        double area = PI * pow(radius, 2);
        double diagonal = sqrt(50);

        System.out.printf("Circle Area: %.2f%n", area);
        System.out.printf("Square Diagonal: %.2f%n", diagonal);
    }
}`,
    outputExplanation: `- Demonstrates static import syntax reducing code verbosity for mathematical calculations.`,
    commonMistakes: `- Believing \`import java.util.*\` imports sub-packages like \`java.util.concurrent.*\`: package wildcard imports are **non-recursive**!
- Packaging statement not being the first line of code causes a compilation error.`,
    interviewReadyAnswer: `- "Packages are declared using 'package name;' and compiled with 'javac -d <dir>'. External classes are referenced using 'import package.Class;'."
- "Wildcard imports do not import sub-packages, and static imports allow invoking static members without class qualifiers."`,
    quickRevisionPoints: `- Package statement must be line 1.
- Compile with \`javac -d <dest> <file.java>\` to generate directory structure.
- Wildcards (\`*\`) import all classes in the immediate package, not sub-packages.
- Static imports import static methods/constants directly.`
  },
  {
    topicId: 119,
    slug: 'access-modifiers-in-java',
    title: 'Access Modifiers in Java (private, default, protected, public)',
    definition: `- **Access Modifiers**: Keywords in Java that set the accessibility (visibility) of classes, constructors, methods, and fields.
- **The 4 Visibility Levels**:
  1. **private**: Accessible ONLY within the defining class.
  2. **default (package-private, no modifier)**: Accessible within the same package.
  3. **protected**: Accessible within the same package AND by subclasses in other packages.
  4. **public**: Accessible from anywhere across the entire JVM.`,
    simpleExplanation: `- **The Home Analogy**:
  • **private**: Your personal diary locked inside your private safe—only you can read it.
  • **default (package-private)**: The family refrigerator in the kitchen—accessible to anyone living in the same house (package).
  • **protected**: An inherited family recipe—accessible to family in the house plus children living in other cities (subclasses).
  • **public**: A billboard on the street—visible to anyone walking by.`,
    importantDifferences: `| Modifier | Same Class | Same Package | Subclass (Diff Package) | Outside World |
|---|---|---|---|---|
| **private** | YES | NO | NO | NO |
| **default** | YES | YES | NO | NO |
| **protected** | YES | YES | YES (via inheritance) | NO |
| **public** | YES | YES | YES | YES |`,
    importantConcepts: `- **Top-Level Classes**: Can only be declared **\`public\`** or **\`default\`** (cannot be \`private\` or \`protected\`). Inner classes, however, can use all 4 access levels.
- **Protected Cross-Package Access**: A subclass in a foreign package can only access protected members through inheritance (\`this\` or \`super\`), not by instantiating a parent reference (\`new Parent().protectedMethod()\`).`,
    javaCodeExamples: `package com.interviewpocket.access;

public class SecurityVault {
    private String masterPassword = "SuperSecretPassword123";
    int defaultAccessCode = 8899; // package-private
    protected String securityBadge = "LEVEL-4-CLEARANCE";
    public String publicStatus = "VAULT_ONLINE";

    // Private method: accessible only inside SecurityVault
    private void verifyMasterKey() {
        System.out.println("Checking private master key...");
    }

    // Public method exposing guarded access
    public boolean checkAccess(int code) {
        if (code == defaultAccessCode) {
            verifyMasterKey();
            return true;
        }
        return false;
    }
}

class PackageNeighbor {
    void inspect() {
        SecurityVault vault = new SecurityVault();
        // Allowed: default, protected, and public
        System.out.println(vault.defaultAccessCode);
        System.out.println(vault.securityBadge);
        System.out.println(vault.publicStatus);
        // vault.masterPassword; // COMPILE ERROR: private field is invisible!
    }
}`,
    outputExplanation: `- Illustrates how access boundaries protect critical fields while permitting controlled collaboration.`,
    interviewReadyAnswer: `- "Java provides 4 access levels: private (class only), default (package only), protected (package plus subclasses via inheritance), and public (everywhere)."
- "They enforce encapsulation and protect the internal state of components from unintended mutation."`,
    quickRevisionPoints: `- private = same class only.
- default (no modifier) = same package only.
- protected = same package + subclasses in any package.
- public = everywhere.
- Top-level classes can only be public or default.`
  },
  {
    topicId: 120,
    slug: 'access-modifiers-matrix-visibility',
    title: 'Package Access Matrix & Visibility Scope',
    definition: `- **Package Access Matrix**: The definitive boundary rules governing how classes, constructors, methods, and fields can interact across package lines.
- **Subclass Boundary Nuance**: The specific rules under which \`protected\` members can be invoked from another package through inheritance.`,
    simpleExplanation: `- If you travel to another country (different package), your family passport (\`protected\`) only works if you travel as a registered child (subclass). You cannot borrow a friend's passport or look into someone else's bag.`,
    importantDifferences: `| Access Specifier | Class Level | Member Level | Cross-Package via Import | Cross-Package via Subclass |
|---|---|---|---|---|
| **public** | Supported | Supported | Accessible | Accessible |
| **protected** | NOT Allowed | Supported | Inaccessible | Accessible (Inherited) |
| **default** | Supported | Supported | Inaccessible | Inaccessible |
| **private** | NOT Allowed | Supported | Inaccessible | Inaccessible |`,
    importantConcepts: `- **Crucial Interview Trap: Protected Cross-Package Invocation**:
  • If class \`Child\` in package \`b\` extends class \`Parent\` in package \`a\`:
  • Inside \`Child\`, calling \`this.protectedMethod()\` or \`super.protectedMethod()\` compiles successfully.
  • But calling \`Parent p = new Parent(); p.protectedMethod();\` triggers a compilation error! The reference must be of type \`Child\` or its subtype.`,
    javaCodeExamples: `// File 1: package pkgA;
package pkgA;
public class ParentA {
    protected void displaySecret() {
        System.out.println("Secret inside ParentA");
    }
}

// File 2: package pkgB;
package pkgB;
import pkgA.ParentA;

public class ChildB extends ParentA {
    public void testAccess() {
        // 1. Valid: Accessing inherited protected member through 'this'
        this.displaySecret();

        // 2. COMPILE ERROR: Cannot access protected member via parent reference from outside package!
        // ParentA parent = new ParentA();
        // parent.displaySecret(); // The method displaySecret() from ParentA is not visible
    }

    public static void main(String[] args) {
        new ChildB().testAccess();
    }
}`,
    outputExplanation: `- Proves that cross-package protected access is strictly inherited, preventing general outside instantiation from breaching encapsulation.`,
    interviewReadyAnswer: `- "The access matrix defines member visibility from most restrictive (private) to least restrictive (public)."
- "Protected members are accessible outside the package only through inheritance within a subclass reference, not through a direct parent instance."`,
    quickRevisionPoints: `- Scope order: \`private < default < protected < public\`.
- Cross-package protected access requires inheritance.
- Parent reference cannot access protected methods outside the parent package.
- Top-level classes cannot be private or protected.`
  }
];

