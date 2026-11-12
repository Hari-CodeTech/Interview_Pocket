USE interviewpocket_db;

SET FOREIGN_KEY_CHECKS = 0;

-- Ensure modules for Frontend (subject_id = 2) exist
INSERT INTO modules (id, subject_id, title, slug, description, priority, display_order, created_at, updated_at)
VALUES 
(19, 2, 'Module 1: HTML5 Architecture & Forms', 'html5-architecture-forms', 'Semantic elements, DOM hierarchy, HTML forms, input types, and native client-side validation APIs.', 'High', 1, NOW(), NOW()),
(20, 2, 'Module 2: Modern CSS3 & Responsive Layouts', 'css3-responsive-layouts', 'Cascading rules, Specificity, Box Model, Flexbox, CSS Grid systems, and Responsive design.', 'High', 2, NOW(), NOW()),
(21, 2, 'Module 3: Core JavaScript & Asynchronous Programming', 'core-javascript-async', 'JS fundamentals, functions, closures, prototypes, event bubbling, promises, and async/await.', 'High', 3, NOW(), NOW()),
(22, 2, 'Module 4: React & Component Architecture', 'react-component-architecture', 'JSX, Virtual DOM, Components, Props, State, React Hooks, Router, and API integration workflows.', 'High', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE title=VALUES(title), slug=VALUES(slug), description=VALUES(description);

-- Clear existing topics for subject_id = 2 if any
DELETE FROM topics WHERE subject_id = 2;

-- Insert the 22 Frontend topics specified in requirement 2
INSERT INTO topics (id, subject_id, module_id, title, slug, priority, difficulty_level, display_order, summary)
VALUES
(201, 2, 19, 'HTML Introduction', 'html-introduction', 'High', 'Beginner', 1, 'HTML document structure, doctype declaration, head vs body, metadata, and core semantic syntax.'),
(202, 2, 19, 'HTML Elements and Attributes', 'html-elements-and-attributes', 'High', 'Beginner', 2, 'Block-level vs inline elements, void elements, core global attributes (id, class, title, data-*), and nesting rules.'),
(203, 2, 19, 'HTML Forms and Validation', 'html-forms-and-validation', 'High', 'Beginner', 3, 'Comprehensive HTML5 form architecture, input types, constraint validation attributes, Constraint Validation API, and FormData.'),
(204, 2, 20, 'CSS Introduction', 'css-introduction', 'Medium', 'Beginner', 4, 'CSS inclusion methods (inline, internal, external), syntax, inheritance, cascading order, and specificity basics.'),
(205, 2, 20, 'CSS Selectors', 'css-selectors', 'High', 'Beginner', 5, 'Class, ID, attribute selectors, pseudo-classes (:hover, :focus, :nth-child), and pseudo-elements (::before, ::after).'),
(206, 2, 20, 'CSS Box Model', 'css-box-model', 'High', 'Beginner', 6, 'Content, padding, border, margin, margin collapse, box-sizing: border-box vs content-box mechanics.'),
(207, 2, 20, 'CSS Flexbox', 'css-flexbox', 'High', 'Intermediate', 7, 'Flex container & items: flex-direction, justify-content, align-items, flex-wrap, flex-grow, flex-shrink, flex-basis.'),
(208, 2, 20, 'CSS Grid', 'css-grid', 'High', 'Intermediate', 8, 'Two-dimensional grid layouts: grid-template-columns/rows, fr units, grid-gap, grid-area, and auto-fit/auto-fill.'),
(209, 2, 21, 'JavaScript Fundamentals', 'javascript-fundamentals', 'High', 'Beginner', 9, 'Execution context, call stack, primitive vs reference types, type coercion, and strict equality (=== vs ==).'),
(210, 2, 21, 'Variables and Data Types', 'variables-and-data-types', 'High', 'Beginner', 10, 'var vs let vs const, hoisting mechanics, temporal dead zone (TDZ), and JavaScript primitive types.'),
(211, 2, 21, 'Functions', 'functions', 'High', 'Intermediate', 11, 'Function declarations vs expressions, arrow functions, lexical this binding, IIFE, closures, and higher-order functions.'),
(212, 2, 21, 'Arrays and Objects', 'arrays-and-objects', 'High', 'Intermediate', 12, 'Array methods (map, filter, reduce, slice, splice), object manipulation, Object.keys/values, and shallow vs deep cloning.'),
(213, 2, 21, 'DOM Manipulation', 'dom-manipulation', 'High', 'Intermediate', 13, 'Document Object Model tree, querySelector, getElementById, createElement, appendChild, classList, and attributes.'),
(214, 2, 21, 'Events', 'events', 'High', 'Intermediate', 14, 'Event listener attachment, event object, event bubbling, event capturing, event delegation, and stopPropagation.'),
(215, 2, 21, 'ES6 Features', 'es6-features', 'High', 'Intermediate', 15, 'Destructuring assignment, spread/rest operators, template literals, default parameters, enhanced object literals, and modules.'),
(216, 2, 21, 'Promises and Async/Await', 'promises-and-async-await', 'High', 'Advanced', 16, 'Asynchronous JavaScript: Callback hell, Promise states, .then()/.catch()/.finally(), async/await syntax, and Promise.all.'),
(217, 2, 22, 'React Introduction', 'react-introduction', 'High', 'Beginner', 17, 'What is React, Virtual DOM vs Real DOM, declarative UI, unidirectional data flow, and React element creation.'),
(218, 2, 22, 'Components and Props', 'components-and-props', 'High', 'Beginner', 18, 'Functional components, JSX syntax rules, prop immutability, default props, prop drilling, and children prop.'),
(219, 2, 22, 'State and Events', 'state-and-events', 'High', 'Intermediate', 19, 'Component state, useState hook, asynchronous state batching, synthetic events in React, and event handler binding.'),
(220, 2, 22, 'Hooks', 'hooks', 'High', 'Advanced', 20, 'Rules of Hooks, useEffect lifecycle synchronization, useRef for DOM & persistent values, useMemo, and useCallback.'),
(221, 2, 22, 'React Router', 'react-router', 'Medium', 'Intermediate', 21, 'Single Page App client routing: BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams, and nested routes.'),
(222, 2, 22, 'API Integration', 'api-integration', 'High', 'Advanced', 22, 'Fetching data with Fetch API and Axios, handling loading and error states, aborting requests with AbortController.');

-- Ensure quiz row exists for HTML Forms and Validation (topic 203)
INSERT INTO quizzes (id, subject_id, topic_id, title, description, difficulty, time_limit_minutes, category)
VALUES (203, 2, 203, 'HTML Forms and Validation Quiz', 'Test your knowledge on HTML5 form controls, validation attributes, and Constraint Validation API.', 'Beginner', 10, 'Frontend')
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);

-- Clear existing notes for topic 203
DELETE FROM notes WHERE topic_id = 203;

-- Insert Comprehensive Approved Notes for HTML Forms and Validation (topic 203)
INSERT INTO notes (
  topic_id, title, definition, simple_explanation, why_needed, how_it_works,
  important_concepts, real_world_examples, java_code_examples, internal_working,
  advantages_disadvantages, important_differences, common_tricky_questions,
  interview_ready_answer, quick_revision_points, what_is_it, simple_meaning,
  why_use_it, important_points, practical_code, real_world_example,
  comparison_table, interview_answer, memory_trick, is_approved, created_at, updated_at
) VALUES (
  203,
  'HTML Forms and Validation Notes',
  '- **Official Definition**: An **HTML Form** (`<form>`) is a document section containing interactive controls designed to collect user input, package it into key-value pairs, and submit it to a web server or client-side JavaScript handler.
- **Client-Side Form Validation**: An automated verification process executed by the browser before submission, ensuring user inputs adhere to specified format, type, and presence constraints.
- **HTML5 Constraint Validation**: Built-in browser specification providing declarative validation attributes and programmatic DOM APIs (`validity`, `checkValidity()`) without requiring third-party JavaScript libraries.',

  '- **The Airport Security Checkpoint Analogy**:
  • The `<form>` is the passport control desk where travelers submit travel documents.
  • The `<input>` fields are specific documents (passport number, visa photo, boarding pass).
  • **HTML5 Client-Side Validation** is the security agent at the entrance who checks if your passport has an expiration date and boarding pass before letting you into the customs queue.
  • **Server-Side Validation** is the border database check inside the secure room. You can never trust client-side validation alone because travelers can bypass the physical queue, but client-side validation prevents 99% of accidental mistakes instantly.',

  '- **Instant User Feedback**: Notifies users immediately if an email address is missing an `@` sign or password is too short, eliminating unnecessary server round-trips.
  - **Bandwidth & Server Load Optimization**: Prevents invalid HTTP requests from reaching backend servers and databases.
  - **Data Standardization**: Ensures data submitted across web forms conforms to expected schemas (dates, phone numbers, alphanumeric patterns).
  - **Accessibility & UX**: Native browser validation provides built-in accessibility prompts for screen readers and keyboard navigation.',

  '- **1. User Input Collection**: Users enter data into interactive controls (`<input>`, `<select>`, `<textarea>`).
- **2. Pre-Submission Constraint Evaluation**: When a submit action triggers (clicking a submit button or pressing Enter), the browser checks every form control against defined constraints (`required`, `type`, `pattern`, `minlength`).
- **3. Invalid State Handling**: If any control fails validation:
  • The browser fires an `invalid` event on the failing element.
  • Cancels form submission automatically.
  • Displays native localized error tooltips pointing to the invalid field.
  • Focuses the first invalid field.
- **4. Submission Packaging**: If all controls pass:
  • Data is serialized into `application/x-www-form-urlencoded` or `multipart/form-data`.
  • Dispatched via HTTP GET or POST, or intercepted in JavaScript via `event.preventDefault()` and `FormData`.',

  '- **Core Form Elements & Controls**:
  • `<form>`: Root container holding `action`, `method` (GET/POST), and `enctype` attributes.
  • `<input>`: Flexible control configured by the `type` attribute (`text`, `email`, `password`, `number`, `tel`, `checkbox`, `radio`, `file`, `date`, `hidden`).
  • `<textarea>`: Multi-line plain text editing control.
  • `<select>` and `<option>`: Dropdown selection menus (supports `<optgroup>`).
  • `<label>`: Accessible descriptive text linked to input controls using the `for` attribute matching input `id`.
  • `<fieldset>` & `<legend>`: Groups related form fields semantically with a caption.
- **Native HTML5 Validation Attributes**:
  • `required`: Mandates field must not be empty before submission.
  • `type=\"email\"` / `type=\"url\"`: Validates syntactic email and URL format.
  • `minlength` & `maxlength`: Restricts character count limits.
  • `min` & `max`: Restricts minimum and maximum values for numeric or date inputs.
  • `step`: Sets legal number intervals (e.g. `step=\"0.01\"` for currency).
  • `pattern`: Regular expression that field value must match (e.g. `pattern=\"[A-Za-z]{3}\"`).
- **JavaScript Constraint Validation API**:
  • `element.checkValidity()`: Returns boolean indicating whether element satisfies all constraints.
  • `element.reportValidity()`: Evaluates constraints and displays browser error tooltip if invalid.
  • `element.setCustomValidity(message)`: Sets custom error message; setting non-empty string marks field invalid! Passing empty string resets validity.
  • `element.validity`: Read-only `ValidityState` object with boolean flags: `valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`, `tooLong`, `rangeUnderflow`, `rangeOverflow`, `stepMismatch`, `customError`, `valid`.',

  '- **E-Commerce Checkout**: Credit card number patterns, expiration dates, CVV length verification, and shipping address validation.
- **User Authentication & Registration**: Validating email syntax, enforcing minimum 8-character password policies, and confirming password matches.
- **Job Application Portals**: File upload restrictions (`accept=\".pdf\"`), phone number format validation, and salary expectation ranges.',

  '<!-- Production-Grade Semantic HTML5 Form with Native Validation -->
<form id=\"registrationForm\" action=\"/api/register\" method=\"POST\" novalidate>
  <fieldset>
    <legend>Account Registration</legend>

    <!-- Accessible Label with matching input id -->
    <div class=\"form-group\">
      <label for=\"username\">Username (Required, 4-20 chars):</label>
      <input 
        type=\"text\" 
        id=\"username\" 
        name=\"username\" 
        required 
        minlength=\"4\" 
        maxlength=\"20\" 
        autocomplete=\"username\"
      />
      <span class=\"error-msg\" aria-live=\"polite\"></span>
    </div>

    <!-- Email validation -->
    <div class=\"form-group\">
      <label for=\"userEmail\">Work Email:</label>
      <input 
        type=\"email\" 
        id=\"userEmail\" 
        name=\"email\" 
        required 
        placeholder=\"name@company.com\"
      />
    </div>

    <!-- Pattern Validation (Regex) -->
    <div class=\"form-group\">
      <label for=\"postalCode\">Zip Code (5 Digits):</label>
      <input 
        type=\"text\" 
        id=\"postalCode\" 
        name=\"zip\" 
        pattern=\"[0-9]{5}\" 
        title=\"Five digit US zip code (e.g. 90210)\" 
        required
      />
    </div>

    <button type=\"submit\">Register Account</button>
  </fieldset>
</form>

<script>
// Programmatic Constraint Validation & FormData AJAX Handling
const form = document.getElementById(\"registrationForm\");

form.addEventListener(\"submit\", (event) => {
  // Prevent default synchronous form submission
  event.preventDefault();

  // Validate form using Constraint Validation API
  if (!form.checkValidity()) {
    form.reportValidity(); // Trigger native tooltip
    return;
  }

  // Serialize form data cleanly
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  console.log(\"Form payload ready for API dispatch:\", payload);
});
</script>',

  '- **Browser Event & Validation Flow**:
  1. User edits field: fires `input` event on every keystroke, and `change` event on blur.
  2. Form submission trigger: checks `form.noValidate` attribute. If `novalidate` is present, native constraint verification is bypassed.
  3. `ValidityState` internal bitmask: Browser calculates bitwise flags across 10 constraint dimensions (`valueMissing`, `typeMismatch`, etc.).
  4. Pseudo-class updates: Browser dynamically recalculates CSS pseudo-classes `:valid`, `:invalid`, `:user-valid`, and `:user-invalid` on the fly.',

  '- **Advantages of Native HTML5 Validation**:
  • Zero JavaScript dependencies required for baseline validation.
  • Highly performant: compiled directly inside browser C++ engine.
  • Built-in localization: error messages translate automatically into user OS language.
  • Accessible: native integration with screen reader software.
- **Disadvantages & Trade-offs**:
  • Native error tooltip appearance varies widely across browsers (Chrome vs Safari vs Firefox).
  • Security Limitation: **Client-side validation can be bypassed trivially** using DevTools, curl, or Postman; server-side validation is strictly required in all production applications.',

  '| Feature / Dimension | GET Form Submission | POST Form Submission |
|---|---|---|
| **Data Transmission** | Appended to URL as query string parameters | Sent in HTTP request body |
| **Payload Size Limit** | Limited by URL length limits (~2048 chars) | Virtually unlimited (configurable by server) |
| **Security & Privacy** | Insecure for sensitive data (visible in browser history, bookmarks, logs) | Secure for sensitive data (payload hidden from URL) |
| **File Upload Support** | Cannot upload binary files | Supports `multipart/form-data` file uploads |
| **Idempotence & Caching**| Idempotent; results can be cached and bookmarked | Non-idempotent; creates or updates state |
| **Primary Use Case** | Search forms, filters, read-only queries | Login, registration, payments, file uploads |',

  '- **1. Why is setting custom validity tricky in JavaScript?**
  • When calling `input.setCustomValidity(\"Custom error\")`, the browser treats any non-empty string as an active error, marking the field invalid (`validity.customError = true`). To make the field valid again, you MUST explicitly call `input.setCustomValidity(\"\")` with an empty string!
- **2. Does HTML5 client validation replace backend validation?**
  • Absolutely NOT. Client-side validation is solely for user experience and rapid feedback. Anyone can disable JavaScript, edit HTML attributes in DevTools, or send direct HTTP requests via curl or Postman. Server validation is strictly mandatory.
- **3. What does the `novalidate` attribute do?**
  • Placed on `<form novalidate>`, it suppresses the browser from displaying native error bubbles on submission, allowing developers to implement custom JavaScript validation UI while still utilizing `checkValidity()`.',

  '- \"HTML forms collect user input packaged into key-value pairs submitted via GET or POST methods. HTML5 introduced declarative constraint validation through attributes like required, pattern, min, max, and minlength.\"'
  - \"Programmatically, the Constraint Validation API provides checkValidity(), reportValidity(), and the ValidityState object to inspect specific validation failures.\"'
  - \"While client-side validation delivers instant feedback and reduces server load, it must always be backed by rigorous server-side validation for security.\"',

  '- **Core Attributes**: `action`, `method` (GET/POST), `enctype` (`multipart/form-data`).
- **Validation Attributes**: `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, `step`.
- **Constraint Validation API**: `checkValidity()`, `reportValidity()`, `setCustomValidity(\"\")`.
- **Golden Security Rule**: Client validation is for UX; Server validation is for Security.
- **GET vs POST**: GET puts data in URL; POST puts data in HTTP body.',

  -- Legacy compatibility fields
  '- **Official Definition**: An HTML Form (<form>) is a document section containing interactive controls designed to collect user input, package it into key-value pairs, and submit it to a web server.',
  '- **The Airport Security Checkpoint**: The form is the passport control desk, inputs are documents, and HTML5 validation is the initial document check.',
  '- Provides instant user feedback, reduces server load, and standardizes data format before submission.',
  '- Core Form Elements (<form>, <input>, <label>, <select>, <textarea>), HTML5 Attributes (required, pattern, minlength), Constraint Validation API.',
  '<!-- Semantic Form Example -->\n<form action=\"/api/register\" method=\"POST\">\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" required />\n  <button type=\"submit\">Submit</button>\n</form>',
  '- User registration, login forms, e-commerce checkout, payment gateways, and search filters.',
  '| Feature | GET Method | POST Method |\n|---|---|---|\n| Location | URL Query String | Request Body |\n| Security | Visible in URL/History | Hidden in Body |\n| File Upload | No | Yes (multipart/form-data) |',
  '- HTML forms collect user input and submit it via GET or POST. HTML5 validation uses attributes like required and pattern for instant feedback, backed by Constraint Validation APIs.',
  '- Validation attributes: required, pattern, minlength, maxlength. API: checkValidity(), setCustomValidity(). Client validation is UX; Server validation is Security.',
  1,
  NOW(),
  NOW()
);

SET FOREIGN_KEY_CHECKS = 1;

