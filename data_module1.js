// Module 1: HTML5 Architecture & Forms (Topics 201, 202, 203)
module.exports = [
  {
    topicId: 201,
    title: 'HTML Introduction Notes',
    definition: `- **Official Definition**: **HTML** (HyperText Markup Language) is the standard declarative markup language used to structure web documents and define the semantic architecture of web pages delivered across the World Wide Web.
- **HyperText**: Text containing interactive hyperlinks that connect electronic documents across distributed networks.
- **Markup Language**: A syntactic system of annotating a document with standardized tags to instruct web browsers on how content should be parsed, structured, and presented.`,
    simpleExplanation: `- **The Architectural Blueprint Analogy**:
  • If a website is a modern house, **HTML** is the concrete foundation, brick framework, and room walls.
  • **CSS** is the paint, interior decor, lighting, and aesthetic styling.
  • **JavaScript** is the electrical wiring, plumbing, automated door sensors, and smart home appliances.
  • Without HTML, there is no physical structure for CSS to style or JavaScript to manipulate.`,
    whyNeeded: `- **Universal Content Structuring**: Provides standard semantic primitives (headings, paragraphs, lists, tables) recognized universally by all browser engines.
- **Search Engine Optimization (SEO)**: Search crawlers (Googlebot, Bingbot) rely on semantic HTML hierarchy (<title>, <h1>, <meta>) to index and rank content.
- **Web Accessibility (a11y)**: Screen readers and assistive devices parse HTML semantic tags to announce structure, landmarks, and navigation cues for visually impaired users.
- **Platform Interoperability**: Ensures uniform rendering across smartphones, tablets, desktop workstations, and smart displays.`,
    howItWorks: `- **1. Network Transmission**: Browser requests an HTML file over HTTP/HTTPS, receiving raw byte streams.
- **2. Byte-to-Character Conversion**: Browser decodes raw bytes into characters based on the specified encoding (e.g. \`UTF-8\`).
- **3. Tokenization**: The HTML tokenizer transforms character strings into distinct tokens (StartTag: <html>, TagName: head, EndTag: </html>).
- **4. Node Tree Construction**: Tokens are converted into Node objects with properties, attributes, and relationships.
- **5. DOM Tree Assembly**: Nodes are linked into a hierarchical tree data structure—the **Document Object Model (DOM)**.`,
    importantConcepts: `- **Document Type Declaration (\`<!DOCTYPE html>\`)**: Tells the browser rendering engine to parse the page in standard HTML5 mode rather than Quirks Mode.
- **Root & Metadata Elements**:
  • \`<html>\`: Root element enclosing all document content; includes \`lang="en"\` for screen readers and search localization.
  • \`<head>\`: Container for machine-readable metadata (\`<meta charset="UTF-8">\`, \`<meta name="viewport">\`, \`<title>\`, \`<link>\`).
  • \`<body>\`: Holds all renderable visual content displayed in the browser viewport.
- **Semantic HTML5 Elements**:
  • \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<aside>\`, \`<footer>\`.
- **Viewport Meta Tag**:
  • \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`: Crucial for responsive web design, preventing mobile browsers from scaling pages down to a default 980px desktop canvas.`,
    realWorldExamples: `- **E-Commerce Product Portal**: Utilizes \`<main>\` for the primary product gallery, \`<section>\` for customer reviews, \`<aside>\` for related recommendations, and \`<nav>\` for breadcrumbs.
- **News Publishing Site**: Structures each news article within an \`<article>\` tag containing \`<header>\` (headline and author byline), \`<time datetime="2026-11-11">\`, and \`<footer>\` with license details.`,
    javaCodeExamples: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Technical interview preparation portal" />
  <title>InterviewPocket - Technical Knowledge Base</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/subjects">Subjects</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Understanding HTML5 Architecture</h1>
      <p>Semantic markup enables superior accessibility and SEO indexing.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 InterviewPocket. All rights reserved.</p>
  </footer>
</body>
</html>`,
    internalWorking: `- **Parsing Pipeline & Speculative Pre-parsing**:
  • Modern browsers (Chrome/Blink, Firefox/Gecko, Safari/WebKit) run a dual-thread parsing mechanism.
  • While the main thread builds the DOM tree sequentially, the speculative pre-parser scans ahead for external resource links (\`<link rel="stylesheet">\`, \`<script src="...">\`, \`<img src="...">\`) to initiate parallel network requests early.
- **DOM Hierarchy**: Every HTML element extends the JavaScript \`Node\` interface (\`Element\` -> \`HTMLElement\`), allowing synchronous programmatic manipulation via JavaScript.`,
    advantagesDisadvantages: `- **Advantages**:
  • Universally supported across 100% of modern browsers without runtime dependencies.
  • Lightweight, text-based, easily cacheable over CDNs.
  • Inherent semantic accessibility when authoring with standardized tags.
- **Disadvantages / Trade-offs**:
  • Static presentation language—requires JavaScript for dynamic client state and interactivity.
  • Browser inconsistency in historical quirks mode handling if \`<!DOCTYPE>\` is omitted.`,
    importantDifferences: `- **HTML vs XML**:
  • HTML is designed to display data and format documents; XML is designed to transport and store arbitrary structured data.
  • HTML has predefined tags; XML allows user-defined custom tags.
  • HTML is case-insensitive for tags; XML is strictly case-sensitive.
- **HTML4 vs HTML5**:
  • HTML4 required lengthy SGML DTD declarations; HTML5 uses simple \`<!DOCTYPE html>\`.
  • HTML5 introduced native multimedia (\`<video>\`, \`<audio>\`), canvas graphics (\`<canvas>\`, \`<svg>\`), and semantic structural tags (\`<main>\`, \`<article>\`, \`<nav>\`).`,
    commonTrickyQuestions: `- **Q: What happens if <!DOCTYPE html> is omitted?**
  • The browser switches to **Quirks Mode**, emulating non-standard behavior from the late 1990s (e.g. IE5 box model quirks, incorrect table inheritance), causing severe cross-browser layout breaks.
- **Q: Does HTML ignore whitespace?**
  • Yes, consecutive whitespace characters (spaces, tabs, newlines) are collapsed into a single space by default in the DOM unless CSS \`white-space: pre\` or the \`<pre>\` tag is used.
- **Q: What is the difference between <script>, <script async>, and <script defer>?**
  • Regular \`<script>\`: Blocks HTML parsing, downloads synchronously, executes immediately.
  • \`<script async>\`: Downloads in parallel with parsing; executes as soon as downloaded (interrupting parsing).
  • \`<script defer>\`: Downloads in parallel; executes only after HTML parsing is completely finished, preserving script execution order.`,
    interviewReadyAnswer: `HTML is the standard declarative markup language defining the structural and semantic foundation of web documents. Delivered as text streams over HTTP, the browser tokenizes HTML into Node objects that form the Document Object Model (DOM). Modern HTML5 introduces semantic elements (<article>, <main>, <nav>), native media handling, and accessibility landmarks that optimize search engine indexing and assistive device interpretation.`,
    quickRevisionPoints: `- <!DOCTYPE html> enforces standard HTML5 rendering mode.
- <head> contains machine metadata; <body> contains visible viewport content.
- Semantic tags (<header>, <nav>, <main>, <section>, <article>, <footer>) improve SEO and screen reader accessibility.
- Viewport meta tag is non-negotiable for responsive mobile rendering.
- HTML elements convert through: Bytes -> Characters -> Tokens -> Nodes -> DOM Tree.`
  },
  {
    topicId: 202,
    title: 'HTML Elements and Attributes Notes',
    definition: `- **Official Definition**: An **HTML Element** is an individual component of an HTML document, consisting of a start tag, optional attributes, content, and an end tag (or a self-closing void tag).
- **HTML Attribute**: Additional key-value configuration parameters provided within the opening tag that define element behavior, identity, styling hooks, or accessibility metadata.
- **Void Elements**: Elements that cannot contain child nodes or closing tags (e.g. \`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`, \`<meta>\`, \`<link>\`).`,
    simpleExplanation: `- **The Noun and Adjective Analogy**:
  • An **HTML Element** is the **Noun** (e.g. a car, a button, an image).
  • An **HTML Attribute** is the **Adjective or Setting** (e.g. color="red", width="100%", disabled="true").
  • For example, in \`<button type="submit" disabled>Register</button>\`, \`<button>\` is the element, \`type\` and \`disabled\` are attributes defining its identity and interactive state.`,
    whyNeeded: `- **Granular Control**: Attributes allow developers to configure element behavior, source paths (\`src\`), destinations (\`href\`), and form constraints.
- **CSS and JavaScript Binding**: Attributes like \`id\` and \`class\` serve as unique anchors and styling hooks for stylesheets and DOM scripts.
- **Accessibility & Internationalization**: Attributes like \`alt\`, \`aria-label\`, \`lang\`, and \`role\` communicate intent to assistive technologies.`,
    howItWorks: `- **1. Tag Pair Matching**: The browser parser identifies opening tag \`<tag>\` and matches it with closing tag \`</tag>\`.
- **2. Attribute Parsing**: Attributes are parsed into an internal named node map (\`element.attributes\`), accessible via DOM APIs (\`getAttribute()\`, \`setAttribute()\`).
- **3. Display Categorization**: By default, elements are categorized as either **Block-level** (starts on a new line, consumes full container width) or **Inline** (flows horizontally within text, consumes only content width).`,
    importantConcepts: `- **Block-Level Elements**:
  • \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<ul>\`, \`<ol>\`, \`<li>\`, \`<header>\`, \`<section>\`, \`<table>\`.
  • Begin on a new line; take up the maximum width available; can set \`width\` and \`height\`.
- **Inline Elements**:
  • \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`, \`<label>\`.
  • Do not start on a new line; only occupy content width; vertical \`margin\` and \`padding\` do not displace adjacent block elements.
- **Core Global Attributes**:
  • \`id\`: Unique identifier within the document (must not be duplicated).
  • \`class\`: Space-separated list of styling classes (reusable across elements).
  • \`style\`: Inline CSS declarations (discouraged in favor of external stylesheets).
  • \`title\`: Advisory tooltip text displayed on hover.
  • \`data-*\`: Custom data attributes for attaching private metadata to DOM nodes.
  • \`tabindex\`: Controls keyboard focus order (\`0\` enters natural tab flow, \`-1\` focusable programmatically, \`>0\` manual priority).`,
    realWorldExamples: `- **Data Attributes for Analytics**: Storing product IDs and analytics tracking metadata: \`<button data-product-id="409" data-tracking-event="add_to_cart">Buy</button>\`.
- **Accessible Images**: Providing descriptive alternative text for screen readers and SEO indexing: \`<img src="avatar.jpg" alt="Profile photo of Jane Doe, Lead Engineer" />\`.`,
    javaCodeExamples: `<!-- Block vs Inline Elements Example -->
<div class="user-profile-card" id="user-101" data-role="admin">
  <!-- Block-level heading -->
  <h2 class="user-name">Jane Doe</h2>

  <!-- Block-level paragraph with inline nested elements -->
  <p class="user-bio">
    Senior Full-Stack Engineer specializing in 
    <strong class="highlight">React</strong> and 
    <code class="code-span">TypeScript</code>.
  </p>

  <!-- Inline link with attributes -->
  <a 
    href="https://github.com/janedoe" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="btn-link"
  >
    View GitHub Profile
  </a>
</div>`,
    internalWorking: `- **Attribute Reflection in DOM**:
  • HTML attributes are string definitions in source markup.
  • Once parsed, standard attributes reflect as properties on the DOM element object (e.g. \`input.id = 'foo'\` synchronizes with \`id="foo"\`).
  • However, some attributes and properties diverge: \`input.value\` in DOM reflects the live user input, whereas the attribute \`input.getAttribute('value')\` preserves the original initial default markup value!`,
    advantagesDisadvantages: `- **Advantages**:
  • High flexibility through extensible \`data-*\` custom attributes.
  • Native accessibility hooks via ARIA attributes without modifying visual CSS.
- **Disadvantages / Trade-offs**:
  • Overuse of non-semantic \`<div>\` and \`<span>\` elements (known as "div soup") harms accessibility and search engine readability.
  • Nesting block-level elements inside inline elements was historically invalid in HTML4 (though HTML5 allows \`<a>\` to wrap blocks).`,
    importantDifferences: `- **Block vs Inline vs Inline-Block**:
  • Block: Breaks to new line, respects width/height/margins.
  • Inline: Stays inline, ignores width/height, vertical padding/margins do not push neighbors.
  • Inline-Block: Stays inline with text, but respects width, height, and all padding/margins.
- **HTML Attribute vs DOM Property**:
  • Attribute: Initial markup value written in HTML; always a string.
  • Property: Live JavaScript property on the DOM node; can be boolean, object, or number.`,
    commonTrickyQuestions: `- **Q: Can you put a <div> inside an <a> tag in HTML5?**
  • Yes. HTML5 permits the \`<a>\` element to wrap entire block-level elements (like \`<div>\`, \`<h2>\`, \`<p>\`), transforming the whole container into a clickable card.
- **Q: What is the security risk of target='_blank' without rel='noopener'?**
  • Without \`rel="noopener"\`, the newly opened tab gains access to the opening window via \`window.opener\`, allowing malicious sites to redirect the original page (\`window.opener.location = phishing_url\`).
- **Q: What is the difference between hidden attribute and display: none in CSS?**
  • The HTML5 \`hidden\` boolean attribute semantically indicates that the element is not yet relevant. However, any explicit CSS \`display\` rule overrides the \`hidden\` attribute unless styled with \`[hidden] { display: none !important; }\`.`,
    interviewReadyAnswer: `HTML elements represent structural nodes in the DOM tree, configured through attributes that supply identity, styling hooks, and behavioral parameters. Elements are fundamentally categorized into block-level elements, which consume full horizontal line width, and inline elements, which flow within text content. Global attributes like id, class, tabindex, and data-* provide foundational integration points for CSS styling, JavaScript DOM logic, and WCAG accessibility compliance.`,
    quickRevisionPoints: `- Elements consist of start tag, attributes, content, and end tag.
- Void elements (<img>, <input>, <br>, <meta>) cannot have children or closing tags.
- Block elements start on new lines; inline elements flow within text.
- Always use rel="noopener noreferrer" when targeting external links with target="_blank".
- data-* attributes allow semantic client-side metadata storage accessible via dataset.`
  },
  {
    topicId: 203,
    title: 'HTML Forms and Validation Notes',
    definition: `- **Official Definition**: An **HTML Form** (\`<form>\`) is a document section containing interactive controls designed to collect user input, package it into key-value pairs, and submit it to a web server or client-side JavaScript handler.
- **Client-Side Form Validation**: An automated verification process executed by the browser before submission, ensuring user inputs adhere to specified format, type, and presence constraints.
- **HTML5 Constraint Validation**: Built-in browser specification providing declarative validation attributes and programmatic DOM APIs (\`validity\`, \`checkValidity()\`) without requiring third-party JavaScript libraries.`,
    simpleExplanation: `- **The Airport Security Checkpoint Analogy**:
  • The \`<form>\` is the passport control desk where travelers submit travel documents.
  • The \`<input>\` fields are specific documents (passport number, visa photo, boarding pass).
  • **HTML5 Client-Side Validation** is the security agent at the entrance who checks if your passport has an expiration date and boarding pass before letting you into the customs queue.
  • **Server-Side Validation** is the border database check inside the secure room. You can never trust client-side validation alone because travelers can bypass the physical queue, but client-side validation prevents 99% of accidental mistakes instantly.`,
    whyNeeded: `- **Instant User Feedback**: Notifies users immediately if an email address is missing an @ sign or password is too short, eliminating unnecessary server round-trips.
- **Bandwidth & Server Load Optimization**: Prevents invalid HTTP requests from reaching backend servers and databases.
- **Data Standardization**: Ensures data submitted across web forms conforms to expected schemas (dates, phone numbers, alphanumeric patterns).
- **Accessibility & UX**: Native browser validation provides built-in accessibility prompts for screen readers and keyboard navigation.`,
    howItWorks: `- **1. User Input Collection**: Users enter data into interactive controls (\`<input>\`, \`<select>\`, \`<textarea>\`).
- **2. Pre-Submission Constraint Evaluation**: When a submit action triggers, the browser checks every form control against defined constraints.
- **3. Invalid State Handling**: If any control fails validation, the browser cancels submission, fires an \`invalid\` event, and focuses the failing element with a localized tooltip.
- **4. Submission Packaging**: If all controls pass, data is serialized into \`application/x-www-form-urlencoded\` or \`multipart/form-data\` and dispatched.`,
    importantConcepts: `- **Core Form Elements & Controls**:
  • \`<form>\`: Root container holding \`action\`, \`method\` (GET/POST), and \`enctype\` attributes.
  • \`<input>\`: Flexible control configured by the \`type\` attribute (\`text\`, \`email\`, \`password\`, \`number\`, \`tel\`, \`checkbox\`, \`radio\`, \`file\`, \`date\`).
  • \`<textarea>\`: Multi-line plain text editing control.
  • \`<select>\` and \`<option>\`: Dropdown selection menus.
  • \`<label>\`: Accessible descriptive text linked to input controls using the \`for\` attribute matching input \`id\`.
- **Native HTML5 Validation Attributes**:
  • \`required\`: Mandates field must not be empty before submission.
  • \`type="email"\` / \`type="url"\`: Validates syntactic email and URL format.
  • \`minlength\` & \`maxlength\`: Restricts character count limits.
  • \`min\` & \`max\`: Restricts minimum and maximum values for numeric or date inputs.
  • \`step\`: Sets legal number intervals.
  • \`pattern\`: Regular expression that field value must match.
- **JavaScript Constraint Validation API**:
  • \`element.checkValidity()\`: Returns boolean indicating whether element satisfies all constraints.
  • \`element.reportValidity()\`: Evaluates constraints and displays browser error tooltip if invalid.
  • \`element.setCustomValidity(message)\`: Sets custom error message; setting non-empty string marks field invalid! Passing empty string resets validity.
  • \`element.validity\`: Read-only ValidityState object with boolean flags: \`valueMissing\`, \`typeMismatch\`, \`patternMismatch\`, \`customError\`, \`valid\`.`,
    realWorldExamples: `- **User Registration Flow**: Validating username length (minlength=4), valid corporate email (type="email"), and matching password confirmation before sending payload to backend authentication microservices.
- **Payment & Checkout Form**: Enforcing credit card number patterns (\`pattern="[0-9]{16}"\`) and expiration dates with numeric constraints (\`min="2026-11"\`).`,
    javaCodeExamples: `<form id="registrationForm" action="/api/register" method="POST" novalidate>
  <div class="form-group">
    <label for="username">Username (Required, 4-20 chars):</label>
    <input type="text" id="username" name="username" required minlength="4" maxlength="20" />
  </div>

  <div class="form-group">
    <label for="userEmail">Work Email:</label>
    <input type="email" id="userEmail" name="email" required />
  </div>

  <div class="form-group">
    <label for="postalCode">Zip Code (5 Digits):</label>
    <input type="text" id="postalCode" name="zip" pattern="[0-9]{5}" title="Five digit US zip code" required />
  </div>

  <button type="submit">Register Account</button>
</form>`,
    internalWorking: `- **Browser ValidityState Mechanism**:
  • The browser maintains an internal bitmask flag collection (\`ValidityState\`) for each input.
  • On every user keystroke and change event, constraint algorithms test the value against active attributes.
  • If any bit is set (e.g. \`valueMissing = true\`), \`validity.valid\` evaluates to \`false\`.`,
    advantagesDisadvantages: `- **Advantages**:
  • Native performance with zero external library overhead.
  • Automatic localized tooltips in the user's native language.
  • Built-in screen reader announcements.
- **Disadvantages / Trade-offs**:
  • Browser styling of native validation tooltips is notoriously difficult to customize.
  • Client validation can be bypassed by disabling JavaScript or using curl/Postman; server validation is always required.`,
    importantDifferences: `- **Client-Side vs Server-Side Validation**:
  • Client-Side: Immediate UX feedback, saves server bandwidth, easily bypassed, never trust for security.
  • Server-Side: Absolute security boundary, validates against database uniqueness and business logic, cannot be bypassed.
- **checkValidity() vs reportValidity()**:
  • checkValidity(): Silently returns true or false; does not trigger browser tooltip UI.
  • reportValidity(): Returns boolean AND triggers the native error tooltip popup on invalid fields.`,
    commonTrickyQuestions: `- **Q: What happens if you execute input.setCustomValidity('Looks Good!') when an input is valid?**
  • The input becomes INVALID! Because the argument is non-empty, the browser treats 'Looks Good!' as an error message and blocks submission. You must pass an empty string \`""\` to restore validity.
- **Q: Does a form control with disabled attribute submit its value?**
  • No! Disabled controls are completely excluded from form submission payloads and FormData. Use \`readonly\` if you want an uneditable control to submit data.
- **Q: Does the 'invalid' event bubble up to the <form>?**
  • No! The \`invalid\` event does NOT bubble. To capture it on a parent form, you must use event capturing: \`form.addEventListener('invalid', handler, true)\`.`,
    interviewReadyAnswer: `HTML5 form architecture pairs interactive controls with declarative constraint validation attributes like required, pattern, and minlength. When submitted, the browser evaluates controls against these rules, updating the read-only ValidityState object and blocking submission if invalid. Programmatic control is facilitated through the Constraint Validation API methods checkValidity, reportValidity, and setCustomValidity, with novalidate allowing developers to bypass native popups for custom UI handling.`,
    quickRevisionPoints: `- novalidate attribute on <form> disables native tooltips for custom JavaScript validation.
- setCustomValidity("") clears errors; any non-empty string sets an error and invalidates the field.
- Disabled inputs are omitted from submission payloads; readonly inputs are included.
- ValidityState provides flags: valueMissing, typeMismatch, patternMismatch, customError, valid.
- The invalid event does NOT bubble; use capturing to catch on the form.`
  }
];

