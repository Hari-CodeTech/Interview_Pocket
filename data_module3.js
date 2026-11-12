// Module 3: JavaScript Core & ES6+ (Topics 209 to 216)
module.exports = [
  {
    topicId: 209,
    title: 'JavaScript Fundamentals Notes',
    definition: `- **Official Definition**: **JavaScript** (ECMAScript) is a high-level, interpreted or just-in-time (JIT) compiled, multi-paradigm, prototype-based, single-threaded dynamic programming language with first-class functions.
- **Dynamic Typing**: Types are associated with values, not variables; a variable can hold a number, string, or object across execution.
- **Multi-Paradigm**: Supports functional programming (first-class functions, pure functions), object-oriented programming (prototypal inheritance), and imperative/procedural paradigms.`,
    simpleExplanation: `- **The Orchestra Conductor Analogy**:
  • If HTML provides the sheet music instruments and CSS provides the concert hall lighting and acoustics, JavaScript is the conductor directing the live performance.
  • JavaScript orchestrates user interactions, initiates network requests, animates UI components, and mutates the DOM in response to real-time events.`,
    whyNeeded: `- **Dynamic Interactivity**: Transforms static HTML documents into fluid, reactive Single Page Applications (SPAs).
- **Client-Side Processing**: Validates forms, calculates totals, and renders dynamic views locally without waiting for server responses.
- **Universal Language**: Runs natively in all major web browsers and on servers via Node.js, Deno, and Bun.
- **Rich Ecosystem**: Powers modern frontend frameworks (React, Vue, Angular) and thousands of open-source packages via npm.`,
    howItWorks: `- **1. Parsing**: The JavaScript engine (e.g., V8) reads source code and transforms it into an Abstract Syntax Tree (AST).
- **2. Compilation (JIT)**: An interpreter (like Ignition) creates bytecode, while an optimizing compiler (like TurboFan) compiles hot code into native machine code.
- **3. Execution Context**: The engine creates the Global Execution Context with Memory Allocation (Creation Phase) and Code Execution (Execution Phase).
- **4. Single-Threaded Call Stack**: Executes one operation at a time following Last-In-First-Out (LIFO) discipline.`,
    importantConcepts: `- **Execution Context**:
  • Variable Environment: Holds declarations of \`var\`, \`let\`, \`const\`, and functions.
  • Scope Chain: Resolves variable access outward to parent lexical environments.
  • \`this\` Binding: Dynamically or lexically determined reference to the current execution context.
- **Hoisting**: Variable and function declarations are moved to the top of their containing scope during compilation.
- **Type Coercion**:
  • Implicit Coercion: Automatic conversion performed by operators (e.g., \`'5' + 2 = '52'\`, \`'5' - 2 = 3\`).
  • Explicit Coercion: Manual conversion via \`Number()\`, \`String()\`, \`Boolean()\`.
- **Strict Mode (\`'use strict'\`)**: Enforces safer coding standards, eliminating silent failures and disabling deprecated features like \`with\`.`,
    realWorldExamples: `- **Dynamic Shopping Cart**: Recalculating item totals, discounts, and tax instantly as the customer modifies quantities.
- **Form Autosave**: Saving draft blog posts or checkout forms to \`localStorage\` continuously without page reloads.
- **Autocomplete Search**: Debouncing keystrokes and fetching search suggestions asynchronously via Fetch API.`,
    javaCodeExamples: `// 1. Primitive vs Reference Types
let price = 100;
let copyPrice = price;
copyPrice = 150;
console.log(price); // 100 (Primitives copied by value)

const user = { name: 'Alice', role: 'Admin' };
const userRef = user;
userRef.role = 'SuperAdmin';
console.log(user.role); // 'SuperAdmin' (Objects copied by reference)

// 2. Strict Equality vs Loose Equality
console.log(5 == '5');  // true  (Type coercion applied)
console.log(5 === '5'); // false (Strict check: different types)

// 3. Execution Context & Hoisting
sayHello(); // Output: "Hello from hoisted function!"
function sayHello() {
  console.log("Hello from hoisted function!");
}`,
    internalWorking: `- **V8 Engine Pipeline**:
  • Scanner converts raw characters into tokens.
  • Parser converts tokens into an AST (Abstract Syntax Tree).
  • Ignition interpreter converts AST into bytecode.
  • TurboFan optimizing compiler monitors runtime metrics and compiles frequently executed bytecode into optimized machine code.
  • De-optimization occurs if assumed types change at runtime (e.g., passing a string to a function optimized for numbers).`,
    advantagesDisadvantages: `- **Advantages**:
  • Native browser integration without external plugins or runtime installations.
  • Massive global community, richest package ecosystem (npm), and extensive tooling.
  • Full-stack versatility: same language can be used across frontend, backend, mobile (React Native), and desktop (Electron).
- **Disadvantages**:
  • Single-threaded execution: heavy CPU-bound tasks can freeze the UI thread.
  • Dynamic typing can allow subtle runtime bugs unless mitigated with TypeScript or strict testing.
  • Client-side code is fully exposed in DevTools, requiring robust server-side security.`,
    importantDifferences: `- **== (Loose Equality) vs === (Strict Equality)**:
  • \`==\`: Converts operands to a common type before comparison (e.g., \`0 == false\` is \`true\`).
  • \`===\`: Compares both value and type without coercion (e.g., \`0 === false\` is \`false\`). Always prefer \`===\`.
- **null vs undefined**:
  • \`undefined\`: Variable has been declared but has not yet been assigned a value; default return of functions without a return statement.
  • \`null\`: Intentional assignment representing the deliberate absence of any object value.`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the output of \`typeof null\` and why?
  • **Answer**: \`"object"\`. This is a historic bug in the original 1995 JavaScript implementation where type tags stored in object references caused \`null\` (represented as 0x00) to be tagged as an object. It cannot be fixed without breaking web backward compatibility.
- **Tricky Q2**: What is the output of \`[] + {}\` vs \`{} + []\`?
  • **Answer**: \`[] + {}\` outputs \`"[object Object]"\` (empty array coerces to \`""\`). In standard expression contexts, \`{} + []\` also evaluates to \`"[object Object]"\`, though in bare console statements \`{}\` may be interpreted as an empty block yielding \`0\`.
- **Tricky Q3**: Why does \`0.1 + 0.2 !== 0.3\`?
  • **Answer**: IEEE-754 binary floating-point representation cannot represent fractions like 0.1 and 0.2 precisely in base-2, resulting in \`0.30000000000000004\`.`,
    interviewReadyAnswer: `- "JavaScript is a high-level, single-threaded, JIT-compiled language characterized by prototypal inheritance and first-class functions. It executes on an event-driven concurrency model with a call stack, memory heap, and event loop. In modern web development, JavaScript drives interactive client-side SPAs and server-side runtimes, utilizing ECMAScript standards to deliver scalable web applications."`,
    quickRevisionPoints: `- Single-threaded runtime powered by the V8 Engine and the Event Loop.
- Always prefer strict equality (\`===\`) over loose equality (\`==\`) to eliminate unintentional coercion.
- Primitives (String, Number, BigInt, Boolean, Symbol, Undefined, Null) are immutable and stored by value.
- Objects (including Arrays and Functions) are mutable and referenced by memory address.`
  },
  {
    topicId: 210,
    title: 'Variables and Data Types Notes',
    definition: `- **Official Definition**: In JavaScript, variables are named containers for storing data values. JavaScript data types are categorized into two primary divisions: **Primitive Types** (stored directly in memory by value) and **Reference Types / Objects** (stored in the heap and accessed by memory reference).
- **Primitives**: \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`symbol\`, and \`null\`.
- **Reference Types**: \`Object\`, \`Array\`, \`Function\`, \`Date\`, \`Map\`, \`Set\`, \`RegExp\`.`,
    simpleExplanation: `- **The Storage Box Analogy**:
  • A **Primitive variable** is like writing a number on a sticky note and putting it inside a box labeled \`age\`. If you duplicate it, you photocopy the note.
  • A **Reference variable** is like putting a GPS coordinate into the box. If you give that coordinate to someone else, both people visit and modify the exact same physical warehouse.`,
    whyNeeded: `- **Memory Safety & Prediction**: Understanding primitives vs references prevents accidental mutations of shared state across functions.
- **Block Scoping**: \`let\` and \`const\` prevent scope leaks, variable shadowing bugs, and accidental global pollution caused by legacy \`var\`.
- **Immutability Patterns**: Modern frontend frameworks (React) depend on immutability to detect state changes and trigger efficient re-renders.`,
    howItWorks: `- **Stack vs Heap Storage**:
  • Primitives and execution frames are stored on the **Call Stack** (fast, fixed-size memory).
  • Objects, arrays, and functions are allocated dynamically in the **Memory Heap** (large, unstructured memory).
- **Temporal Dead Zone (TDZ)**:
  • Variables declared with \`let\` and \`const\` are hoisted to the top of their block scope during the creation phase.
  • However, they remain uninitialized in the TDZ until execution reaches the actual declaration line. Accessing them prematurely throws a \`ReferenceError\`.`,
    importantConcepts: `- **var vs let vs const**:
  • \`var\`: Function-scoped, hoisted and initialized to \`undefined\`, can be re-declared and updated.
  • \`let\`: Block-scoped (\`{ ... }\`), hoisted into TDZ, cannot be re-declared in the same scope, can be reassigned.
  • \`const\`: Block-scoped, hoisted into TDZ, must be initialized at declaration, cannot be reassigned (though internal object properties remain mutable).
- **Symbol Type**: Unique and immutable primitive used primarily as private object property keys to avoid collisions.
- **BigInt Type**: Handles integers beyond \`Number.MAX_SAFE_INTEGER\` (\`2^53 - 1\`).`,
    realWorldExamples: `- **React State Management**: Storing user authentication credentials with \`const\` to avoid accidental reassignment.
- **Financial Balances**: Using \`BigInt\` or fixed-precision libraries for high-precision cryptocurrency and transaction values.
- **Theme Configurations**: Freezing application constants via \`Object.freeze()\` to safeguard global brand tokens.`,
    javaCodeExamples: `// 1. var vs let vs const in Loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 10);
}
// Outputs: 3, 3, 3 (Shared function scope)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let j:', j), 10);
}
// Outputs: 0, 1, 2 (Unique block scope per iteration)

// 2. Temporal Dead Zone (TDZ)
function testTDZ() {
  // console.log(a); // Throws ReferenceError: Cannot access 'a' before initialization
  let a = 42;
  console.log(a); // 42
}

// 3. Object Mutability with const
const config = { theme: 'dark', version: 1 };
config.theme = 'light'; // Allowed! Internal property mutation
// config = { theme: 'light' }; // TypeError: Assignment to constant variable`,
    internalWorking: `- **Garbage Collection (Mark-and-Sweep)**:
  • The JavaScript engine root set starts from global variables, active execution stack frames, and DOM tree references.
  • The garbage collector traverses references; any heap memory not reachable from roots is marked and reclaimed.
- **Value Representation**:
  • 64-bit IEEE 754 double-precision floats represent all regular numbers.
  • Pointer tagging is used by V8 to differentiate small integers (Smi) directly inside pointers without heap allocation.`,
    advantagesDisadvantages: `- **Advantages**:
  • Dynamic typing allows rapid prototyping and fluid data transformations.
  • Block scoping with \`const\` and \`let\` eliminates legacy closure bugs common in \`var\`.
  • Rich primitive types (Symbol, BigInt) satisfy modern enterprise and cryptography requirements.
- **Disadvantages**:
  • Lack of compile-time static type enforcement without TypeScript.
  • Object mutability can cause unintended side-effects in complex state pipelines.`,
    importantDifferences: `- **let vs var**:
  • Scope: \`let\` is block-scoped; \`var\` is function-scoped.
  • Hoisting: \`let\` enters Temporal Dead Zone (TDZ); \`var\` initializes to \`undefined\`.
  • Re-declaration: \`let\` forbids duplicate declaration in same scope; \`var\` allows it.
- **const vs Object.freeze()**:
  • \`const\` prevents variable identifier reassignment; it does not freeze object property values.
  • \`Object.freeze()\` shallowly prevents modification of object properties, but the variable identifier can still be reassigned if declared with \`let\`.`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the Temporal Dead Zone (TDZ) and when does it end?
  • **Answer**: The TDZ is the period between entering a block scope and the actual variable declaration statement. It ends when the engine evaluates the variable's declaration and initialization.
- **Tricky Q2**: Why does \`NaN === NaN\` return \`false\`?
  • **Answer**: By IEEE 754 floating-point specification, \`NaN\` (Not-a-Number) represents an undefined or unrepresentable numerical result and is defined to be unequal to any value, including itself. Use \`Number.isNaN(x)\` to test for NaN.
- **Tricky Q3**: How can you achieve true deep immutability for nested objects?
  • **Answer**: \`Object.freeze()\` is shallow. Deep immutability requires recursively freezing all nested object properties or using external immutable data structures like Immutable.js.`,
    interviewReadyAnswer: `- "JavaScript variables are declared using let, const, or legacy var. Primitives are stored by value on the stack, while reference types reside on the heap and are accessed by reference. In modern ES6+ development, const is the default choice for immutability, let is used exclusively for reassignable identifiers, and var is deprecated due to lack of block scoping and TDZ protections."`,
    quickRevisionPoints: `- Use \`const\` by default; use \`let\` only when reassignment is explicitly necessary; avoid \`var\`.
- \`let\` and \`const\` are block-scoped and subject to the Temporal Dead Zone (TDZ).
- Seven primitives: string, number, bigint, boolean, undefined, symbol, null.
- Test for NaN using \`Number.isNaN()\` rather than equality operators.`
  },
  {
    topicId: 211,
    title: 'Functions Notes',
    definition: `- **Official Definition**: In JavaScript, **Functions** are first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, returned from other functions, and possess properties and methods just like any other object.
- **First-Class Functions**: Functions treated as values.
- **Higher-Order Functions (HOF)**: A function that takes one or more functions as arguments or returns a function (e.g., \`map\`, \`filter\`, \`reduce\`).
- **Closure**: The combination of a function bundled together with references to its surrounding lexical environment.`,
    simpleExplanation: `- **The Backpack Analogy for Closures**:
  • When a function is created inside another function, it packs a "backpack" containing all the variables from its parent scope.
  • Wherever that inner function travels—even after the outer function has finished executing and returned—it retains access to everything inside that backpack.`,
    whyNeeded: `- **Code Reusability & Modularity**: Encapsulates repeatable logic into clean, callable units.
- **Data Encapsulation & Privacy**: Closures enable private variables that cannot be directly inspected or tampered with from the global scope.
- **Functional Composition**: Enables declarative, readable data transformation pipelines through higher-order functions.`,
    howItWorks: `- **1. Function Declaration**: Hoisted completely with its implementation body; can be invoked before its declaration in code.
- **2. Function Expression**: Assigned to a variable; hoisted according to the variable declaration rules (\`var\` -> undefined, \`let\`/\`const\` -> TDZ).
- **3. Invocation & Stack Frame**: Creates a new function execution context with its own \`arguments\`, \`this\` keyword, and local scope.
- **4. Lexical Scoping**: Inner functions resolve variables by walking up the lexical scope chain toward the global environment.`,
    importantConcepts: `- **Arrow Functions vs Regular Functions**:
  • Arrow functions do NOT have their own \`this\`, \`arguments\`, \`super\`, or \`new.target\`; they inherit \`this\` lexically from enclosing scope.
  • Arrow functions cannot be used as constructors (\`new Arrow()\` throws \`TypeError\`).
- **Explicit \`this\` Binding**:
  • \`call(thisArg, arg1, arg2)\`: Calls function immediately with specified this and individual arguments.
  • \`apply(thisArg, [argsArray])\`: Calls function immediately with specified this and array of arguments.
  • \`bind(thisArg, arg1, arg2)\`: Returns a brand-new function with permanently bound this context.
- **Closures**:
  • Retains access to parent scope variables even after parent function returns.
  • Used extensively in React custom hooks, currying, and memoization.`,
    realWorldExamples: `- **Rate Limiting (Debouncing / Throttling)**: Creating closures to preserve timer IDs between user scroll or keystroke events.
- **Memoization**: Caching expensive computation results in a private closure object to avoid redundant calculations.
- **Custom React Hooks**: Encapsulating reusable stateful logic and returning consumer methods.`,
    javaCodeExamples: `// 1. Closures & Data Encapsulation
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable encapsulated in closure
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}
const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getValue());  // 11
// count is completely inaccessible from outside!

// 2. Regular Function vs Arrow Function 'this'
const person = {
  name: 'Alex',
  regularGreet: function() {
    console.log('Regular:', this.name);
  },
  arrowGreet: () => {
    console.log('Arrow:', this.name);
  }
};
person.regularGreet(); // 'Alex' (this points to person)
person.arrowGreet();   // undefined (this resolved lexically from outer scope)

// 3. call, apply, bind
function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, I am \${this.name}\${punctuation}\`);
}
const dev = { name: 'Sarah' };
introduce.call(dev, 'Hello', '!');         // "Hello, I am Sarah!"
introduce.apply(dev, ['Welcome', '.']);    // "Welcome, I am Sarah."
const boundIntro = introduce.bind(dev);
boundIntro('Hi', '?');                     // "Hi, I am Sarah?"`,
    internalWorking: `- **Lexical Environment & [[Environment]]**:
  • Every function object in JavaScript has an internal \`[[Environment]]\` property pointing to the Lexical Environment where it was defined.
  • When the function is invoked, the newly created execution context's outer environment reference is set directly from \`[[Environment]]\`.
  • Even if the parent context completes and pops off the call stack, the Lexical Environment record is retained in heap memory as long as the child function reference exists.`,
    advantagesDisadvantages: `- **Advantages**:
  • First-class status facilitates functional paradigms, declarative code, and clean asynchronous pipelines.
  • Closures provide native encapsulation without requiring complex class hierarchies.
  • Arrow functions solve common \`this\` binding pitfalls in callbacks and event listeners.
- **Disadvantages**:
  • Excessive or unreleased closures can retain large object graphs in memory, leading to memory leaks.
  • Nested callbacks can result in "Callback Hell", though mitigated by Promises and async/await.`,
    importantDifferences: `- **Function Declaration vs Function Expression**:
  • Declaration: \`function foo() {}\` - fully hoisted, can be called anywhere in scope.
  • Expression: \`const foo = function() {}\` - variable is hoisted, function body is assigned at runtime.
- **Arrow Function vs Regular Function**:
  • \`this\`: Arrow functions have lexical \`this\`; regular functions bind \`this\` dynamically depending on invocation site.
  • Constructor: Regular functions can be instantiated with \`new\`; arrow functions cannot.
  • \`arguments\`: Regular functions have an \`arguments\` object; arrow functions do not (use rest \`...args\`).`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the result of invoking a bound function with \`.call()\` or \`.bind()\` a second time?
  • **Answer**: \`bind()\` creates an exotic bound function wrapper with an immutable \`[[BoundThis]]\`. Once a function is bound, subsequent calls to \`bind\`, \`call\`, or \`apply\` cannot change its \`this\` context.
- **Tricky Q2**: What causes memory leaks with closures?
  • **Answer**: If an inner closure references a large object or DOM element and that closure is attached to a long-lived object (like a global event listener or interval timer), the referenced memory cannot be garbage-collected.
- **Tricky Q3**: Can arrow functions be used as Object methods?
  • **Answer**: Generally no, because their lexical \`this\` will bind to the outer scope (such as \`window\` or module scope) rather than the object instance itself.`,
    interviewReadyAnswer: `- "In JavaScript, functions are first-class citizens that support higher-order patterns and functional programming. Closures allow functions to retain lexical scope variables after parent execution contexts terminate, enabling encapsulation and module patterns. Arrow functions introduced lexical 'this' binding and concise syntax, while regular functions remain essential for object methods, prototype methods, and constructors."`,
    quickRevisionPoints: `- Closures preserve access to outer scope variables via the internal \`[[Environment]]\` reference.
- Arrow functions inherit \`this\` lexically and do not support \`arguments\` or \`new\`.
- Use \`bind\` for permanent context binding; use \`call\` and \`apply\` for immediate invocation with custom \`this\`.
- Higher-Order Functions accept or return other functions to compose clean declarative pipelines.`
  },
  {
    topicId: 212,
    title: 'Arrays and Objects Notes',
    definition: `- **Official Definition**: **Objects** in JavaScript are dynamic collections of keyed properties (associative arrays), where keys are strings or Symbols, and values can be any type. **Arrays** are high-level list-like objects whose prototype provides methods for traversal and mutation, with numeric integer keys and a dynamic \`length\` property.
- **Object Literal**: Key-value pairs enclosed in braces \`{ key: value }\`.
- **Array Literal**: Ordered elements enclosed in brackets \`[ item1, item2 ]\`.`,
    simpleExplanation: `- **The Filing Cabinet vs Indexed Notebook Analogy**:
  • An **Object** is like a labeled filing cabinet: you open a specific drawer using its name tag (\`user.email\`, \`user.age\`).
  • An **Array** is like a numbered notebook: every entry occupies an exact page index starting at 0 (\`items[0]\`, \`items[1]\`), making it ideal for sequential iterations.`,
    whyNeeded: `- **Primary Data Structures**: Forms the structural foundation for almost all JSON data exchanged over REST APIs and GraphQL.
- **Declarative Transformations**: Array methods (\`map\`, \`filter\`, \`reduce\`) replace error-prone imperative loops with pure, readable operations.
- **Modern ES6+ Syntax**: Destructuring, spread, and rest operators streamline state updates in React applications.`,
    howItWorks: `- **Dynamic Property Resolution**:
  • Dot notation (\`obj.prop\`) for valid identifiers.
  • Bracket notation (\`obj['prop']\`) for dynamic keys, spaces, or expressions.
- **Array Memory Representation in V8**:
  • Packed Arrays (Continuous elements): fast native C++ array representation.
  • Holey Arrays (Sparse with missing indices): slower dictionary/hash map fallback.
- **Prototypal Inheritance Chain**:
  • Arrays inherit methods from \`Array.prototype\`, which in turn inherits from \`Object.prototype\`.`,
    importantConcepts: `- **Modern Array Methods**:
  • \`map()\`: Transforms each element, returning a new array of identical length.
  • \`filter()\`: Returns a new array containing only elements satisfying the predicate.
  • \`reduce()\`: Accumulates array elements into a single aggregate value (object, number, array).
  • \`forEach()\`: Iterates for side-effects; cannot be broken early and returns \`undefined\`.
  • \`find()\` / \`findIndex()\`: Returns the first matching element or its index.
  • \`some()\` / \`every()\`: Returns boolean indicating if any or all elements satisfy a condition.
- **Destructuring**:
  • Array destructuring: \`const [first, second, ...rest] = array;\`
  • Object destructuring with renaming and defaults: \`const { name: userName, role = 'guest' } = user;\`
- **Spread vs Rest Operator (\`...\`)**:
  • Spread: Expands an iterable into individual elements (\`[...arr1, ...arr2]\`).
  • Rest: Condenses multiple elements into a single array parameter (\`function(...args)\`).`,
    realWorldExamples: `- **Data Aggregation**: Using \`reduce()\` to calculate total invoice amounts and group transactions by category.
- **Search Filtering**: Filtering a catalog of e-commerce items based on active facet filters (price range, tags, rating).
- **Immutable State Updates in Redux/React**: Using object spread to update specific nested properties without mutating state.`,
    javaCodeExamples: `// 1. Array Higher-Order Methods
const products = [
  { id: 1, name: 'Laptop', price: 1200, inStock: true },
  { id: 2, name: 'Mouse', price: 25, inStock: true },
  { id: 3, name: 'Monitor', price: 300, inStock: false }
];

// Filter in-stock items, transform names, calculate total inventory
const availableNames = products
  .filter(p => p.inStock)
  .map(p => p.name);
console.log(availableNames); // ['Laptop', 'Mouse']

const totalValue = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log(totalValue); // 1225

// 2. Destructuring & Spread (Immutability)
const originalUser = { id: 101, username: 'jdoe', settings: { darkTheme: true } };
const updatedUser = {
  ...originalUser,
  username: 'john_doe',
  settings: { ...originalUser.settings, darkTheme: false } // Deep spread
};

// 3. Object Inspection Methods
console.log(Object.keys(originalUser));   // ['id', 'username', 'settings']
console.log(Object.entries(originalUser));// [['id', 101], ['username', 'jdoe'], ...]`,
    internalWorking: `- **Shallow Copy vs Deep Copy**:
  • Spread (\`{ ...obj }\`) and \`Object.assign()\` perform a **shallow copy**: top-level properties are copied, but nested objects still share memory references.
  • **Deep Copy**: Use native \`structuredClone(obj)\` in modern browsers, or \`JSON.parse(JSON.stringify(obj))\` (with limitations: loses functions, undefined, Symbols, and Dates).
- **Object.freeze vs Object.seal**:
  • \`Object.freeze()\`: Prevents adding, deleting, or modifying existing properties.
  • \`Object.seal()\`: Prevents adding or deleting properties, but allows modifying existing writable properties.`,
    advantagesDisadvantages: `- **Advantages**:
  • Declarative array methods eliminate off-by-one errors and nested loops.
  • Flexible dynamic schema accommodates diverse JSON payloads easily.
  • Native \`structuredClone()\` now provides robust deep cloning without third-party libraries.
- **Disadvantages**:
  • Sparse arrays (holes) degrade V8 optimization and performance.
  • Shallow copying traps can introduce hard-to-detect state mutation bugs in React.`,
    importantDifferences: `- **Array.prototype.map vs Array.prototype.forEach**:
  • \`map()\`: Returns a new array containing transformed values; pure functional approach.
  • \`forEach()\`: Returns \`undefined\`; designed solely for side effects and cannot be chained.
- **Shallow Copy vs Deep Copy**:
  • Shallow Copy: Copies values of top-level properties; nested objects remain linked references.
  • Deep Copy: Recursively duplicates all nested objects, guaranteeing zero memory sharing.`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the result of \`[1, 2, 3].map(parseInt)\`?
  • **Answer**: \`[1, NaN, NaN]\`. Because \`parseInt(string, radix)\` accepts two arguments, \`map\` passes \`(element, index)\`. It executes \`parseInt(1, 0)\` -> 1, \`parseInt(2, 1)\` -> NaN (radix 1 invalid), and \`parseInt(3, 2)\` -> NaN ('3' is invalid in binary).
- **Tricky Q2**: Does \`const arr = [1, 2, 3]; arr.length = 0;\` delete the array elements?
  • **Answer**: Yes. Mutating \`length\` to a smaller value truncates the array and removes elements permanently.
- **Tricky Q3**: Why does \`{ ...obj }\` not clone methods correctly if they rely on prototypes?
  • **Answer**: Object spread copies only own enumerable properties, ignoring prototype methods and non-enumerable properties.`,
    interviewReadyAnswer: `- "Arrays and objects are the primary composite data structures in JavaScript. Arrays provide functional iteration methods like map, filter, and reduce that return new data immutably, which is critical for state management in React. Objects store key-value pairs accessed via dot or bracket notation. When duplicating nested structures, developers must differentiate between shallow copies (via spread or Object.assign) and deep copies (via structuredClone)."`,
    quickRevisionPoints: `- Prefer \`map\`, \`filter\`, and \`reduce\` over imperative loops for immutable data manipulation.
- Spread operator (\`...\`) creates a **shallow copy** only; nested objects still share references.
- Use native \`structuredClone()\` for safe deep copying of complex objects.
- \`Object.entries()\` and \`Object.keys()\` allow smooth iteration over object properties.`
  },
  {
    topicId: 213,
    title: 'DOM Manipulation Notes',
    definition: `- **Official Definition**: The **Document Object Model (DOM)** is a language-neutral programming interface that represents an HTML or XML document as a tree structure of nodes, allowing programming languages like JavaScript to inspect, manipulate, create, and delete document elements and styles.
- **DOM Tree**: Hierarchical tree with \`document\` at the root, branching into element, attribute, and text nodes.
- **Live Collections**: Collections like \`getElementsByTagName\` update automatically when the DOM changes; static collections like \`querySelectorAll\` do not.`,
    simpleExplanation: `- **The Tree and Puppeteer Analogy**:
  • The DOM is a digital family tree representing every visual element on a page.
  • JavaScript is the puppeteer with strings attached to every branch.
  • By pulling strings (calling methods like \`querySelector\` or \`appendChild\`), JavaScript can change text, switch colors, slide menus open, or create new cards dynamically.`,
    whyNeeded: `- **Dynamic UI Updates**: Enables interactive client-side experiences without full page reloads.
- **Single Page Application Foundations**: Even frameworks like React and Vue ultimately translate virtual updates into underlying DOM operations.
- **User Feedback**: Modifies styles, classes, and content dynamically in response to user input, network status, or data changes.`,
    howItWorks: `- **1. DOM Traversal**: Locating nodes using selectors (\`getElementById\`, \`querySelector\`, \`closest\`).
- **2. Node Creation**: Instantiating elements in memory via \`document.createElement()\`.
- **3. Attribute & Class Mutation**: Updating \`classList.add()\`, \`setAttribute()\`, or dataset properties.
- **4. Insertion into Live Tree**: Attaching nodes to the active DOM using \`append()\`, \`prepend()\`, or \`insertBefore()\`.
- **5. Reflow & Repaint Triggered**: Browser recalculates geometry (Reflow) and re-draws pixels on screen (Repaint).`,
    importantConcepts: `- **Modern Selection Methods**:
  • \`document.querySelector(selector)\`: Returns the first matching element.
  • \`document.querySelectorAll(selector)\`: Returns a static \`NodeList\` of all matches.
  • \`element.closest(selector)\`: Traverses upward through ancestors until it finds a match (ideal for event delegation).
- **Manipulation Methods**:
  • \`createElement(tagName)\`: Creates a detached element node.
  • \`append(...nodesOrStrings)\`: Appends multiple nodes or text strings cleanly.
  • \`remove()\`: Removes the target element from the DOM directly.
- **Class & Style Management**:
  • \`classList\`: Methods \`add()\`, \`remove()\`, \`toggle()\`, \`contains()\`. Prefer class changes over inline style mutation.
- **DocumentFragment**: A lightweight detached container used to batch multiple DOM insertions, triggering only a single reflow.`,
    realWorldExamples: `- **Toast Notifications**: Dynamically generating and mounting animated alert toasts into a floating container.
- **Infinite Scrolling Feeds**: Appending newly fetched post cards to the bottom of the feed container.
- **Modal Dialog Controller**: Toggling active visibility classes and trapping focus within accessible modal dialogs.`,
    javaCodeExamples: `// 1. Efficient Batch DOM Insertion with DocumentFragment
const container = document.getElementById('item-list');
const fragment = document.createDocumentFragment();

const items = ['React', 'TypeScript', 'Node.js', 'Vite'];
items.forEach(tech => {
  const li = document.createElement('li');
  li.className = 'tech-item';
  li.textContent = tech; // textContent avoids XSS vulnerabilities
  fragment.appendChild(li);
});

// Single Reflow and Repaint
container.appendChild(fragment);

// 2. ClassList & Closest Navigation
const button = document.querySelector('.action-btn');
button.addEventListener('click', (e) => {
  const card = e.target.closest('.user-card');
  if (card) {
    card.classList.toggle('selected');
  }
});`,
    internalWorking: `- **Reflow (Layout) vs Repaint (Paint)**:
  • **Reflow**: The browser calculates the exact geometry, position, and dimensions of elements. Triggered by changing \`width\`, \`height\`, \`margin\`, font size, or reading layout metrics (\`offsetHeight\`, \`getBoundingClientRect\`).
  • **Repaint**: The browser repaints pixels to screen without changing geometry. Triggered by changing \`color\`, \`background-color\`, \`visibility\`.
  • Reflow always triggers Repaint; Repaint does not trigger Reflow.
- **Layout Thrashing**: Occurs when code repeatedly reads geometry properties and immediately writes DOM styles in an interleaved loop, forcing sequential synchronous reflows.`,
    advantagesDisadvantages: `- **Advantages**:
  • Direct control over every aspect of document structure and styling.
  • Standardized across all modern web browsers without external runtime dependencies.
- **Disadvantages**:
  • Frequent direct DOM manipulation is computationally expensive and can induce layout thrashing.
  • Manual state-to-DOM synchronization is complex and error-prone, prompting the adoption of declarative virtual DOM libraries.
  • Misuse of \`innerHTML\` introduces cross-site scripting (XSS) security risks.`,
    importantDifferences: `- **textContent vs innerHTML vs innerText**:
  • \`textContent\`: Retrieves or sets raw text including invisible elements; safe against XSS; does not trigger reflow.
  • \`innerText\`: Retrieves human-readable rendered text respecting CSS styling (ignores \`display: none\`); triggers reflow.
  • \`innerHTML\`: Parses strings as HTML markup; susceptible to XSS if inserting untrusted user content.
- **NodeList vs HTMLCollection**:
  • \`NodeList\`: Can contain any node type (text, comments, elements); static when returned by \`querySelectorAll\`; supports \`forEach\`.
  • \`HTMLCollection\`: Contains only element nodes; live (auto-updates on DOM changes); lacks \`forEach\` on older specs.`,
    commonTrickyQuestions: `- **Tricky Q1**: Why is \`element.innerHTML += '<div>...</div>'\` dangerous and inefficient?
  • **Answer**: It forces the browser to serialize the entire existing DOM subtree into HTML text, append the string, re-parse the entire string, and re-create all DOM nodes. This destroys existing event listeners and state (like input values) on child elements!
- **Tricky Q2**: What is layout thrashing and how can it be avoided?
  • **Answer**: Layout thrashing occurs when reading layout properties (like \`offsetWidth\`) immediately after writing styles in a loop, forcing synchronous reflows. Avoid it by batching all reads first, then executing all writes (or using \`requestAnimationFrame\`).
- **Tricky Q3**: How does \`closest()\` work?
  • **Answer**: \`closest()\` begins at the current element and traverses up the ancestor tree, returning the first element matching the selector, or \`null\` if none match.`,
    interviewReadyAnswer: `- "The Document Object Model (DOM) is the tree-structured API representing an HTML document. JavaScript manipulates DOM nodes via methods like querySelector, createElement, and classList. Because direct DOM operations cause reflow and repaint cycles, performant applications minimize DOM writes by batching updates using DocumentFragments, avoiding layout thrashing, and sanitizing inputs to prevent XSS."`,
    quickRevisionPoints: `- Use \`textContent\` over \`innerHTML\` to prevent Cross-Site Scripting (XSS) vulnerabilities.
- Reflow recalculates element dimensions and positions; Repaint draws pixels. Reflow is far more expensive.
- Use \`DocumentFragment\` to batch multiple node insertions into a single reflow.
- Use \`classList\` methods rather than modifying the \`style\` attribute directly.`
  },
  {
    topicId: 214,
    title: 'Events Notes',
    definition: `- **Official Definition**: An **Event** is a signal emitted by the browser indicating that a specific interaction or system state change has occurred (e.g., mouse click, keyboard stroke, window resize, form submission). The JavaScript event architecture follows the **Observer Pattern**, where code registers event listeners to react when signals fire.
- **Event Target**: The DOM object where the event originated.
- **Event Listener**: A callback function invoked when a specified event type is dispatched on the target.`,
    simpleExplanation: `- **The Office Mail Delivery Analogy**:
  • **Capturing Phase**: The courier brings mail into the building entrance and travels down the hallways to the specific department floor.
  • **Target Phase**: The courier hands the letter directly to the recipient at their desk.
  • **Bubbling Phase**: The recipient signs the receipt, and the confirmation notification ripples back upward from floor to building management.`,
    whyNeeded: `- **Interactive Responsiveness**: Enables web applications to respond seamlessly to user clicks, taps, keypresses, and scrolling.
- **Decoupled Architecture**: Separates UI presentation markup from interaction handling logic.
- **Event Delegation**: Allows handling interactions across thousands of child elements with a single memory-efficient parent listener.`,
    howItWorks: `- **The Three Phases of Event Propagation**:
  • **1. Capturing Phase (Trickling)**: The event travels down from \`window\` -> \`document\` -> \`<html>\` -> \`<body>\` -> down to the target element.
  • **2. Target Phase**: The event reaches the target element that initiated the interaction.
  • **3. Bubbling Phase**: The event bubbles up from the target element back through ancestor elements up to \`window\`.
- **Default Behavior**: \`addEventListener\` listens during the **Bubbling Phase** by default unless \`{ capture: true }\` is passed.`,
    importantConcepts: `- **Event Delegation**:
  • Placing a single event listener on a common parent rather than separate listeners on each individual child.
  • Uses \`event.target\` (or \`e.target.closest()\`) to determine which child was clicked.
  • Dramatically reduces memory consumption and automatically handles dynamically inserted elements without re-binding.
- **stopPropagation() vs preventDefault()**:
  • \`event.preventDefault()\`: Cancels the browser's default native action (e.g., following a hyperlink, submitting a form, checking a box). Does NOT stop event propagation.
  • \`event.stopPropagation()\`: Halts the event from traveling further up or down the DOM tree. Does NOT prevent default browser actions.
  • \`event.stopImmediatePropagation()\`: Stops propagation AND prevents any other listeners registered on the *same element* from executing.
- **Event Loop Integration**:
  • DOM event callbacks are placed in the **Macrotask (Callback) Queue** and executed by the Call Stack when free.`,
    realWorldExamples: `- **Infinite Data Tables**: Using event delegation on the \`<tbody>\` to handle row selections and delete actions across thousands of dynamically rendered rows.
- **Keyboard Shortcuts**: Listening to \`keydown\` at the \`document\` level to trigger actions like opening command palettes (\`Cmd+K\`).
- **Drag-and-Drop UIs**: Listening to \`pointerdown\`, \`pointermove\`, and \`pointerup\` to implement fluid touch and mouse dragging.`,
    javaCodeExamples: `// 1. Event Delegation with closest()
const todoList = document.querySelector('#todo-list');

todoList.addEventListener('click', (event) => {
  // Check if click was on or inside a delete button
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    const todoItem = deleteBtn.closest('.todo-item');
    todoItem.remove();
    return;
  }

  // Check if click was on a toggle checkbox
  const toggleCheckbox = event.target.closest('.toggle-task');
  if (toggleCheckbox) {
    const todoItem = toggleCheckbox.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});

// 2. Custom Events Dispatch
const eventBus = document.createElement('div');
eventBus.addEventListener('userLogin', (e) => {
  console.log('User logged in:', e.detail.username);
});

const loginEvent = new CustomEvent('userLogin', {
  detail: { username: 'alex99', timestamp: Date.now() }
});
eventBus.dispatchEvent(loginEvent);`,
    internalWorking: `- **Event Object Properties**:
  • \`e.target\`: The actual innermost element that was clicked or triggered the event.
  • \`e.currentTarget\`: The element to which the event handler is currently attached (equivalent to \`this\` in regular function handlers).
  • \`e.isTrusted\`: Boolean indicating if the event was generated by genuine user action (\`true\`) or dispatched via script (\`false\`).`,
    advantagesDisadvantages: `- **Advantages**:
  • Event delegation saves substantial memory by binding one listener instead of thousands.
  • Clean event-driven model facilitates reactive patterns and micro-frontend architectures.
  • Passive event listeners (\`{ passive: true }\`) dramatically improve touch and scroll performance.
- **Disadvantages**:
  • Uncontrolled \`stopPropagation()\` can break analytics tracking and third-party UI libraries relying on bubbling.
  • Failure to clean up event listeners on removed elements can result in memory leaks.`,
    importantDifferences: `- **event.target vs event.currentTarget**:
  • \`e.target\`: The exact element that originated the event.
  • \`e.currentTarget\`: The element holding the listener that is currently processing the event.
- **event.preventDefault() vs event.stopPropagation()**:
  • \`preventDefault()\`: Stops the browser default action; event still propagates up the DOM.
  • \`stopPropagation()\`: Stops the event from bubbling up to parent ancestors; default action still occurs.`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the difference between \`stopPropagation()\` and \`stopImmediatePropagation()\`?
  • **Answer**: \`stopPropagation()\` prevents the event from bubbling up to parent ancestors. \`stopImmediatePropagation()\` does that AND additionally prevents other listeners attached to the exact same element from being executed.
- **Tricky Q2**: Why does \`focus\` and \`blur\` not work with standard event delegation?
  • **Answer**: The \`focus\` and \`blur\` events do NOT bubble! To delegate them, either use the capturing phase (\`{ capture: true }\`) or use their bubbling counterparts: \`focusin\` and \`focusout\`.
- **Tricky Q3**: Why should you use \`{ passive: true }\` on scroll and touch event listeners?
  • **Answer**: It promises the browser that the listener will never call \`preventDefault()\`. This allows the browser to perform smooth scrolling immediately on the compositor thread without waiting for JavaScript execution.`,
    interviewReadyAnswer: `- "Browser events propagate in three distinct phases: capturing down from the window, target phase, and bubbling back up to the window. Event delegation exploits the bubbling phase by placing a single listener on an ancestor element and evaluating event.target, drastically reducing memory overhead. While preventDefault cancels the browser's default action, stopPropagation halts DOM traversal. Modern applications leverage passive listeners for high-frequency scroll and touch performance."`,
    quickRevisionPoints: `- Propagation phases: 1. Capturing -> 2. Target -> 3. Bubbling.
- Standard \`addEventListener\` listens during the Bubbling phase by default.
- Event Delegation attaches one listener to a parent and inspects \`event.target\`.
- \`focus\` and \`blur\` do not bubble; use \`focusin\` and \`focusout\` for delegation.`
  },
  {
    topicId: 215,
    title: 'ES6 Features Notes',
    definition: `- **Official Definition**: **ECMAScript 2015 (ES6)** was the most significant update to the JavaScript language specification, introducing modern syntax paradigms including \`let\`/\`const\`, arrow functions, classes, template literals, destructuring, default parameters, rest/spread operators, promises, modules (ESM), and collection types (\`Map\`, \`Set\`, \`WeakMap\`, \`WeakSet\`).
- **ECMAScript (ES)**: The standardized specification governing JavaScript implementations.`,
    simpleExplanation: `- **The Modernization Analogy**:
  • If ES5 JavaScript was a manual typewriter requiring verbose boilerplate for simple tasks, ES6 turned it into a modern touchscreen laptop with intuitive shortcuts, modularity, and built-in safety features.`,
    whyNeeded: `- **Syntactic Clarity & Conciseness**: Drastically reduces boilerplate code for common operations.
- **Native Module System**: Replaced fragmented module formats (CommonJS, AMD) with standardized browser-native \`import\` and \`export\`.
- **Safer Data Collections**: \`Map\` and \`Set\` provide dedicated, collision-free data structures with predictable key equality.`,
    howItWorks: `- **1. ES Modules (ESM)**:
  • Static import/export structure analyzed at compile time.
  • Enables tree-shaking (dead code elimination) in modern bundlers like Vite and Webpack.
- **2. Class Syntax**:
  • Syntactic sugar over JavaScript's existing prototype-based inheritance model.
  • Provides \`class\`, \`constructor\`, \`extends\`, \`super\`, and static methods.
- **3. Template Literals**:
  • Backtick syntax (\`\` \` \`\`) supporting multi-line strings and expression interpolation (\`\${expression}\`).`,
    importantConcepts: `- **Map vs Plain Object**:
  • \`Map\` keys can be ANY type (including objects, functions, primitives); Object keys must be strings or Symbols.
  • \`Map\` preserves insertion order during iteration; Objects have complex integer-key sorting rules.
  • \`Map\` has an O(1) \`size\` property; Objects require \`Object.keys(obj).length\`.
  • \`Map\` is optimized for frequent additions and removals.
- **Set**:
  • Collection of unique values; duplicates are automatically ignored.
  • Ideal for de-duplicating arrays: \`const unique = [...new Set(array)];\`
- **WeakMap & WeakSet**:
  • Keys must be objects; hold "weak" references to keys, allowing garbage collection if no other references exist. Prevents memory leaks.
- **Default Parameters & Rest/Spread**:
  • Clean parameter fallbacks and variadic arguments.`,
    realWorldExamples: `- **Deduplicating API Tags**: Filtering duplicate category tags from user submissions using \`new Set()\`.
- **Private State with WeakMap**: Associating internal metadata with DOM nodes without memory leak concerns.
- **Modular Architecture**: Organizing large codebases using native \`export default\` and named \`export\` statements.`,
    javaCodeExamples: `// 1. ES6 Class & Inheritance
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  getDetails() {
    return \`\${this.make} \${this.model}\`;
  }
}

class ElectricVehicle extends Vehicle {
  constructor(make, model, batteryCapacity) {
    super(make, model);
    this.batteryCapacity = batteryCapacity;
  }
  getDetails() {
    return \`\${super.getDetails()} (\${this.batteryCapacity} kWh)\`;
  }
}

const tesla = new ElectricVehicle('Tesla', 'Model 3', 75);
console.log(tesla.getDetails()); // "Tesla Model 3 (75 kWh)"

// 2. Map & Set Collections
const userRoles = new Map();
const userObj = { id: 1 };
userRoles.set(userObj, 'Administrator');
console.log(userRoles.get(userObj)); // "Administrator"

const tagList = ['frontend', 'react', 'frontend', 'javascript'];
const uniqueTags = [...new Set(tagList)];
console.log(uniqueTags); // ['frontend', 'react', 'javascript']`,
    internalWorking: `- **Under the Hood of ES6 Classes**:
  • Underneath the \`class\` keyword, methods are defined directly on the constructor's \`prototype\` property (\`Vehicle.prototype.getDetails\`).
  • Class methods are non-enumerable by default, unlike manual prototype assignments.
  • Classes must be invoked with \`new\`; calling them without \`new\` throws a \`TypeError\`.`,
    advantagesDisadvantages: `- **Advantages**:
  • Standardized syntax dramatically enhances developer productivity and readability.
  • Native ES Modules enable effective tree-shaking and rapid development via ESM-based bundlers (Vite).
  • Built-in \`Map\` and \`Set\` prevent prototype pollution vulnerabilities common in plain objects.
- **Disadvantages**:
  • Older browser environments (IE11) require transpilation via Babel or polyfills.
  • Classes can lead developers to mistake prototypal inheritance for classical object-oriented inheritance.`,
    importantDifferences: `- **Map vs Object**:
  • Key Types: \`Map\` accepts any data type as key; \`Object\` accepts only string and symbol.
  • Size: \`Map.size\` is native O(1); \`Object\` requires manual calculation.
  • Iteration: \`Map\` is directly iterable; \`Object\` requires \`Object.entries()\` or \`Object.keys()\`.
- **CommonJS (require) vs ES Modules (import)**:
  • CommonJS: Synchronous, runtime evaluation, dynamic conditional imports.
  • ESM: Asynchronous or static, evaluated at compile time, enables tree-shaking.`,
    commonTrickyQuestions: `- **Tricky Q1**: Can a \`WeakMap\` be iterated over using \`for...of\`?
  • **Answer**: No! Because references to keys are weak, garbage collection is non-deterministic. Exposing an iterator would expose garbage collector timing, so WeakMaps have no \`size\`, \`keys()\`, or iteration methods.
- **Tricky Q2**: Why does \`super()\` have to be called first in a derived class constructor before using \`this\`?
  • **Answer**: In ES6 derived classes, the instance object is created by the base class constructor. \`this\` remains uninitialized in the derived constructor until \`super()\` completes. Accessing \`this\` beforehand throws a \`ReferenceError\`.
- **Tricky Q3**: How does \`Set\` check value equality for objects?
  • **Answer**: By reference! Two distinct objects with identical properties \`{ a: 1 }\` and \`{ a: 1 }\` are considered distinct references and both will remain in the Set.`,
    interviewReadyAnswer: `- "ES6 revolutionized JavaScript by standardizing ES Modules, class syntax, arrow functions, promises, template literals, and collections like Map and Set. While classes offer clean syntactic sugar over prototype chains, ESM provides static module structures that allow modern bundlers to perform tree-shaking. Collections like Map and Set solve historical shortcomings of plain objects regarding key types, iteration, and unique sets."`,
    quickRevisionPoints: `- ES6 classes are syntactic sugar over prototypal inheritance.
- \`super()\` must be called before accessing \`this\` in derived class constructors.
- \`Map\` supports any key type; \`Set\` stores unique values.
- ES Modules (\`import\`/\`export\`) are statically analyzable and support tree-shaking.`
  },
  {
    topicId: 216,
    title: 'Promises and Async/Await Notes',
    definition: `- **Official Definition**: A **Promise** is an object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous operation and its resulting value. **Async/Await** is syntactic sugar built on top of Promises and Generators that allows asynchronous code to be written and structured like synchronous, sequential code.
- **Promise States**: \`Pending\` (initial), \`Fulfilled\` (operation succeeded), \`Rejected\` (operation failed).
- **Immutability of State**: Once a Promise transitions to Fulfilled or Rejected, its state and value/reason are permanently locked.`,
    simpleExplanation: `- **The Restaurant Buzzer Analogy**:
  • When you order food at a busy counter, the cashier gives you a buzzing coaster (a **Promise**).
  • While you wait, the buzzer is in the **Pending** state; you can sit down and talk to friends (non-blocking).
  • When the food is ready, the buzzer flashes green (**Fulfilled** with meal); if they ran out of food, it flashes red (**Rejected** with error).
  • **Async/Await** is like having a waiter stand there and deliver each dish sequentially while you pause your conversation.`,
    whyNeeded: `- **Eliminates Callback Hell**: Replaces deeply nested pyramid-of-doom callbacks with linear \`.then()\` chains or synchronous-looking \`await\` statements.
- **Unified Error Handling**: Uses standard \`try...catch\` blocks for asynchronous exceptions rather than passing error arguments through multiple callback tiers.
- **Concurrent Orchestration**: Coordinates parallel asynchronous requests cleanly via \`Promise.all\`, \`Promise.allSettled\`, and \`Promise.race\`.`,
    howItWorks: `- **1. Microtask Queue**:
  • Promise callbacks (\`.then()\`, \`.catch()\`, \`.finally()\`, and code resumed after an \`await\`) are enqueued into the **Microtask Queue**.
  • The Event Loop empties the entire Microtask Queue immediately after the current call stack finishes and before rendering or executing the next Macrotask (e.g., \`setTimeout\`).
- **2. Async Function Return**:
  • Any function declared with \`async\` automatically wraps its return value in a resolved Promise.
- **3. Await Expression**:
  • Pauses the execution of the async function until the awaited Promise settles, allowing other scripts and UI events to run in the meantime.`,
    importantConcepts: `- **Promise Combinators**:
  • \`Promise.all([p1, p2])\`: Fulfills when ALL promises fulfill; rejects immediately (short-circuits) if ANY promise rejects.
  • \`Promise.allSettled([p1, p2])\`: Waits for all promises to settle regardless of outcome; returns an array of outcome objects (\`{ status: 'fulfilled', value }\` or \`{ status: 'rejected', reason }\`).
  • \`Promise.race([p1, p2])\`: Settles as soon as the FIRST promise settles (fulfilled or rejected).
  • \`Promise.any([p1, p2])\`: Fulfills as soon as the FIRST promise fulfills; rejects only if ALL promises reject (with an \`AggregateError\`).
- **Error Handling**:
  • Always handle errors using \`try...catch\` around \`await\`, or append a \`.catch()\` handler. Unhandled rejections trigger \`unhandledrejection\` events.`,
    realWorldExamples: `- **Parallel Dashboard API Fetching**: Using \`Promise.allSettled()\` to fetch user profile, notifications, and analytics widgets so that one failing widget does not crash the entire dashboard.
- **Request Timeout Wrapper**: Using \`Promise.race()\` combining a network fetch with a 5-second timeout promise.
- **Sequential Form Submission**: Stepping through file upload, profile update, and confirmation dispatch using clean \`await\` statements.`,
    javaCodeExamples: `// 1. Async/Await with Robust Error Handling
async function fetchUserProfile(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user profile:', error.message);
    throw error; // Re-throw or return fallback state
  }
}

// 2. Parallel Execution with Promise.allSettled
async function loadDashboardData() {
  const [profileResult, statsResult] = await Promise.allSettled([
    fetchUserProfile(42),
    fetch('https://api.example.com/stats').then(r => r.json())
  ]);

  const profile = profileResult.status === 'fulfilled' ? profileResult.value : null;
  const stats = statsResult.status === 'fulfilled' ? statsResult.value : {};
  return { profile, stats };
}`,
    internalWorking: `- **Event Loop Execution Order**:
  • 1. Execute synchronous script on the Call Stack.
  • 2. Check and drain ALL tasks in the **Microtask Queue** (Promises, \`queueMicrotask\`, MutationObserver).
  • 3. Perform UI render and repaint if necessary.
  • 4. Pick the oldest task from the **Macrotask Queue** (\`setTimeout\`, \`setInterval\`, I/O, DOM events).
  • Microtasks always take priority over Macrotasks!`,
    advantagesDisadvantages: `- **Advantages**:
  • Transforms asynchronous code into linear, readable, easily maintainable flows.
  • \`try...catch\` handles both synchronous parsing errors and asynchronous network failures uniformly.
  • Standardized concurrent combinators handle parallel requests with fine-grained error tolerance.
- **Disadvantages**:
  • Sequential \`await\` statements inside loops can introduce accidental sequential request bottlenecks; use \`Promise.all()\` for independent requests.
  • An unhandled promise rejection can crash Node.js processes or trigger silent client failures.`,
    importantDifferences: `- **Promise.all vs Promise.allSettled**:
  • \`Promise.all\`: Rejects immediately upon the first failure; does not wait for pending promises.
  • \`Promise.allSettled\`: Never short-circuits; waits for every promise to complete, returning complete status records.
- **Macrotasks vs Microtasks**:
  • Microtasks (Promise callbacks, process.nextTick) have higher priority; the queue is completely emptied after each macrotask and between turns.
  • Macrotasks (setTimeout, setInterval, setImmediate) run one per event loop cycle.`,
    commonTrickyQuestions: `- **Tricky Q1**: What is the output order of:
\`console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4');\`?
  • **Answer**: \`1, 4, 3, 2\`.
    - '1' and '4' run synchronously on the call stack.
    - \`Promise.then()\` schedules '3' in the Microtask queue.
    - \`setTimeout\` schedules '2' in the Macrotask queue.
    - The microtask queue is drained before macrotasks, so '3' logs before '2'.
- **Tricky Q2**: What happens if an async function does not contain an \`await\` expression?
  • **Answer**: The body executes synchronously, but the return value is still wrapped in an immediately resolved Promise.
- **Tricky Q3**: How does \`await\` pause code without blocking the browser thread?
  • **Answer**: \`await\` suspends execution of only that specific async generator function, releasing the call stack back to the browser so the event loop can continue servicing user inputs and rendering.`,
    interviewReadyAnswer: `- "Promises represent asynchronous operations with three immutable states: pending, fulfilled, and rejected. Promise reactions execute in the high-priority microtask queue, which is completely emptied before the event loop processes macrotasks like setTimeout. Async/await provides synchronous readability over promises, enabling native try/catch exception handling. In production, concurrency should be managed using Promise.all for all-or-nothing operations or Promise.allSettled for resilient partial data loading."`,
    quickRevisionPoints: `- Promises transition irreversibly: Pending -> Fulfilled or Rejected.
- Microtasks (Promise reactions) always execute before Macrotasks (\`setTimeout\`).
- Use \`Promise.all()\` for interdependent parallel tasks; use \`Promise.allSettled()\` for fault-tolerant requests.
- Async functions always return a Promise, even when returning raw values.`
  }
];

