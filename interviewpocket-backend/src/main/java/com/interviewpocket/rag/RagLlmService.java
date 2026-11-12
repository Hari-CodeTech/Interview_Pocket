package com.interviewpocket.rag;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.Note;
import com.interviewpocket.model.QuizOption;
import com.interviewpocket.model.QuizQuestion;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;

@Service
public class RagLlmService {

    private static final Logger log = LoggerFactory.getLogger(RagLlmService.class);

    private final ObjectMapper objectMapper;
    private final NoteRepository noteRepository;
    private final HttpClient httpClient;

    @Value("${app.rag.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${app.rag.openai.api-key:}")
    private String openaiApiKey;

    @Value("${app.rag.llm.simulate-failure:false}")
    private boolean simulateFailure;

    public RagLlmService(ObjectMapper objectMapper, NoteRepository noteRepository) {
        this.objectMapper = objectMapper;
        this.noteRepository = noteRepository;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    public void setSimulateFailure(boolean simulate) {
        this.simulateFailure = simulate;
    }

    public boolean isSimulateFailure() {
        return this.simulateFailure;
    }

    /**
     * Generates 20 interview questions (5 Beginner, 5 Intermediate, 5 Advanced, 5 Tricky)
     * grounded strictly in the retrieved context chunks.
     */
    public List<InterviewQuestion> generateInterviewQuestions(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        if (simulateFailure) {
            log.error("RAG LLM simulated failure triggered (Scenario 10).");
            throw new RagApiException("Simulated LLM API 503: External Model Service Unavailable or Rate Limit Exceeded.", 503);
        }

        String activeGeminiKey = getActiveGeminiKey();
        if (activeGeminiKey != null && !activeGeminiKey.isBlank()) {
            try {
                return callGeminiForQuestions(topic, chunks, activeGeminiKey);
            } catch (Exception e) {
                log.error("Gemini API generation failed: {}", e.getMessage());
                throw new RagApiException("Failed to communicate with LLM API: " + e.getMessage(), e);
            }
        }

        String activeOpenAiKey = getActiveOpenAiKey();
        if (activeOpenAiKey != null && !activeOpenAiKey.isBlank()) {
            try {
                return callOpenAiForQuestions(topic, chunks, activeOpenAiKey);
            } catch (Exception e) {
                log.error("OpenAI API generation failed: {}", e.getMessage());
                throw new RagApiException("Failed to communicate with LLM API: " + e.getMessage(), e);
            }
        }

        // Offline Grounded Generator: Extracts 20 structured questions directly from the approved notes / chunks
        return generateGroundedQuestionsOffline(topic, chunks);
    }

    /**
     * Generates 10 MCQs grounded strictly in the retrieved context chunks.
     */
    public List<QuizQuestion> generateQuizQuestions(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        if (simulateFailure) {
            log.error("RAG LLM simulated failure triggered (Scenario 10).");
            throw new RagApiException("Simulated LLM API 503: External Model Service Unavailable or Rate Limit Exceeded.", 503);
        }

        String activeGeminiKey = getActiveGeminiKey();
        if (activeGeminiKey != null && !activeGeminiKey.isBlank()) {
            try {
                return callGeminiForQuiz(topic, chunks, activeGeminiKey);
            } catch (Exception e) {
                log.error("Gemini API quiz generation failed: {}", e.getMessage());
                throw new RagApiException("Failed to communicate with LLM API: " + e.getMessage(), e);
            }
        }

        String activeOpenAiKey = getActiveOpenAiKey();
        if (activeOpenAiKey != null && !activeOpenAiKey.isBlank()) {
            try {
                return callOpenAiForQuiz(topic, chunks, activeOpenAiKey);
            } catch (Exception e) {
                log.error("OpenAI API quiz generation failed: {}", e.getMessage());
                throw new RagApiException("Failed to communicate with LLM API: " + e.getMessage(), e);
            }
        }

        // Offline Grounded Generator: Generates 10 structured MCQs directly from retrieved chunks
        return generateGroundedQuizOffline(topic, chunks);
    }

    private String getActiveGeminiKey() {
        if (geminiApiKey != null && !geminiApiKey.isBlank()) return geminiApiKey;
        return System.getenv("GEMINI_API_KEY");
    }

    private String getActiveOpenAiKey() {
        if (openaiApiKey != null && !openaiApiKey.isBlank()) return openaiApiKey;
        return System.getenv("OPENAI_API_KEY");
    }

    // --- Offline Grounded Generators ---

    private List<InterviewQuestion> generateGroundedQuestionsOffline(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        if (topic.getId() == 203L) {
            return generateFormsQuestions(topic);
        } else if (topic.getId() == 221L) {
            return generateReactRouterQuestions(topic);
        } else {
            return generateDynamicQuestions(topic);
        }
    }

    private List<QuizQuestion> generateGroundedQuizOffline(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        if (topic.getId() == 203L) {
            return generateFormsQuiz(topic);
        } else if (topic.getId() == 221L) {
            return generateReactRouterQuiz(topic);
        } else {
            return generateDynamicQuiz(topic);
        }
    }

    // --- Curated Question Set for Topic 203 (HTML Forms and Validation) ---
    private List<InterviewQuestion> generateFormsQuestions(Topic topic) {
        List<InterviewQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        // 5 BEGINNER QUESTIONS
        list.add(createQuestion(topic, "BEGINNER", 1,
                "What is the primary role of the <form> element and client-side form validation in web applications?",
                "An HTML `<form>` serves as a container for interactive controls designed to collect user input, package it into key-value pairs, and submit it. Client-side form validation verifies user input in the browser before submission.",
                "In modern front-end architecture, `<form>` provides semantic structure and native submission flows. Client-side validation improves user experience by catching errors early (such as missing required fields or invalid email syntax) before network round-trips.",
                "The `<form>` element groups inputs into key-value pairs. Client-side validation checks input syntax and presence immediately to prevent unnecessary network requests.",
                "[" + topicTitle + " > Definition]"));

        list.add(createQuestion(topic, "BEGINNER", 2,
                "How does the 'required' attribute function in HTML5 form controls?",
                "The `required` boolean attribute mandates that an input control must contain a non-empty value before the user can submit the form.",
                "When a form control has the `required` attribute and is empty at submission time, the browser cancels the submit event, focuses the invalid element, and displays a native constraint validation tooltip (e.g., 'Please fill out this field').",
                "`required` enforces non-empty input. If blank, browser stops submission and shows a localized validation error.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 3,
                "What is the difference between type='email' and a standard type='text' input?",
                "`type='email'` instructs the browser to validate that the entered text syntactically conforms to a valid email address format (containing an @ symbol and a valid domain).",
                "Beyond validation, on mobile and virtual keyboards, `type='email'` automatically provides an optimized keyboard layout featuring the '@' and '.' keys prominently.",
                "`type='email'` enforces email format syntax and presents an email-optimized virtual keyboard on mobile devices.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 4,
                "Why should you always pair an <input> element with a <label> using the 'for' attribute?",
                "Pairing an `<input>` with a `<label for='id'>` establishes an accessible relationship that allows screen readers to announce the label when focused and enlarges the clickable target area.",
                "When a user clicks on the `<label>`, the browser automatically focuses the linked `<input>` (or toggles checkboxes and radio buttons). This is essential for WCAG accessibility compliance.",
                "The `for` attribute links the label to the input id, enabling screen reader announcements and allowing users to click the label to focus or select the input.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 5,
                "What role do <fieldset> and <legend> elements play in complex form layouts?",
                "`<fieldset>` semantically groups related form controls and labels together, while `<legend>` provides a descriptive caption for that grouping.",
                "Screen readers announce the `<legend>` text whenever any control inside the `<fieldset>` receives focus, providing critical contextual clarity for grouped inputs like billing address vs shipping address.",
                "`<fieldset>` groups related controls and `<legend>` titles the group, significantly improving semantic organization and assistive tech navigation.",
                "[" + topicTitle + " > Important Concepts]"));

        // 5 INTERMEDIATE QUESTIONS
        list.add(createQuestion(topic, "INTERMEDIATE", 6,
                "How does HTML5 regex validation work using the 'pattern' attribute?",
                "The `pattern` attribute accepts a regular expression that the input value must strictly match for the field to be considered valid.",
                "The regular expression is compiled against the entire value (as if enclosed between `^(?:` and `)$`). For example, `pattern='[0-9]{5}'` requires exactly 5 digits. The `title` attribute should be supplied to describe the required format in the browser tooltip.",
                "`pattern` compiles a regular expression against the full input string. If the value doesn't match, `validity.patternMismatch` becomes true.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 7,
                "Explain the difference between input 'minlength'/'maxlength' and 'min'/'max' attributes.",
                "`minlength` and `maxlength` enforce constraints on string character count (text inputs), whereas `min` and `max` enforce numerical or chronological boundaries (numbers and dates).",
                "`minlength='5'` requires at least 5 characters. `min='18'` on `type='number'` requires the numeric value to be greater than or equal to 18. Fulfilling the wrong attribute leads to `rangeUnderflow`/`rangeOverflow` vs `tooShort`/`tooLong`.",
                "`minlength`/`maxlength` restrict string character lengths, while `min`/`max` restrict numeric and chronological boundary values.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 8,
                "What is the difference between element.checkValidity() and element.reportValidity() in the Constraint Validation API?",
                "`checkValidity()` evaluates element constraints and returns a boolean without displaying UI tooltips, while `reportValidity()` evaluates constraints, returns a boolean, and displays the browser's native error tooltip if invalid.",
                "`reportValidity()` also focuses the invalid control. Both methods fire the `invalid` event on the target element if any constraint is violated.",
                "`checkValidity()` silently returns true or false; `reportValidity()` returns the boolean AND renders the native validation tooltip to the user.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 9,
                "What is the purpose of the 'novalidate' attribute on the <form> element?",
                "`novalidate` disables the browser's native automatic form validation tooltip UI upon submission, giving developer JavaScript full control over custom error rendering.",
                "When `novalidate` is present, the browser does not stop form submission when native constraints fail. JavaScript can still query `form.checkValidity()` to evaluate native rules programmatically.",
                "`novalidate` suppresses native browser validation popups during submit, enabling custom JavaScript validation workflows.",
                "[" + topicTitle + " > Code Examples]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 10,
                "How do the CSS pseudo-classes :valid, :invalid, :required, and :optional interact with form inputs?",
                "These CSS pseudo-classes automatically style form controls based on their current constraint validation state and presence attributes.",
                "An input with `required` matches `:required`. Once user input satisfies all defined constraints (such as valid email and length), it matches `:valid`; otherwise, it matches `:invalid`. Using `:user-invalid` is preferred in modern CSS to avoid showing errors before user interaction.",
                "CSS pseudo-classes `:valid` and `:invalid` allow dynamic visual feedback based on the element's live Constraint Validation state.",
                "[" + topicTitle + " > Important Concepts]"));

        // 5 ADVANCED QUESTIONS
        list.add(createQuestion(topic, "ADVANCED", 11,
                "How does element.setCustomValidity() work, and what is the critical rule regarding its parameter?",
                "`setCustomValidity(message)` sets a custom error message on a form control. If `message` is a non-empty string, the element is immediately marked invalid with that message; passing an empty string `\"\"` marks it valid.",
                "A common trap is passing an explanation like 'OK' or 'Valid'—any non-empty string causes `validity.customError` to be `true`, preventing form submission! Only `setCustomValidity('')` restores valid state.",
                "Passing any non-empty string to `setCustomValidity()` invalidates the input; passing an empty string `\"\"` clears the custom error and restores validity.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "ADVANCED", 12,
                "Explain the properties of the ValidityState object returned by input.validity.",
                "The `ValidityState` object is a read-only collection of boolean flags indicating which specific constraints have passed or failed on the control.",
                "Key boolean flags include: `valueMissing` (failed required), `typeMismatch` (bad email/url), `patternMismatch` (regex failed), `tooShort` / `tooLong`, `rangeUnderflow` / `rangeOverflow`, `stepMismatch`, `customError` (setCustomValidity called), and `valid` (true only if all flags are false).",
                "`ValidityState` contains boolean constraint flags (valueMissing, typeMismatch, patternMismatch, customError, etc.) and a summary `valid` property.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "ADVANCED", 13,
                "Why can client-side form validation never replace server-side validation?",
                "Client-side validation can easily be bypassed, disabled, or manipulated by disabling JavaScript, using DevTools, or sending raw HTTP requests via curl or Postman.",
                "Client-side validation is strictly an enhancement for user experience and reducing latency. Server-side validation is the indispensable security boundary protecting business logic and database integrity.",
                "Client-side validation optimizes UX and saves round-trips; server-side validation is non-negotiable for security and data integrity because client code can be bypassed.",
                "[" + topicTitle + " > Simple Explanation]"));

        list.add(createQuestion(topic, "ADVANCED", 14,
                "How do you implement accessible custom error messages using ARIA attributes for form validation?",
                "Use `aria-invalid='true'` on the input, attach `aria-describedby='error-element-id'` pointing to the error message container, and place `role='alert'` or `aria-live='polite'` on the error container.",
                "This ensures assistive technologies immediately announce the error message when focus moves to or remains on the invalid field, without relying solely on visual color cues.",
                "Link the input to the error element with `aria-describedby` and flag `aria-invalid='true'` with `role='alert'` for real-time assistive notification.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "ADVANCED", 15,
                "How does the browser handle file uploads with <input type='file'> in terms of encoding and validation?",
                "The enclosing `<form>` must specify `enctype='multipart/form-data'` and `method='POST'`. Validation can enforce `accept` mime types and JavaScript can check `fileInput.files[0].size` before upload.",
                "If `enctype` is left as default `application/x-www-form-urlencoded`, only the file name string is transmitted rather than the binary file contents. JavaScript reads the `FileList` object to validate size and file extensions.",
                "File uploads require `method='POST'` and `enctype='multipart/form-data'`, with client-side validation inspecting `files[0].size` and `files[0].type` via the File API.",
                "[" + topicTitle + " > Important Concepts]"));

        // 5 TRICKY QUESTIONS
        list.add(createQuestion(topic, "TRICKY", 16,
                "What happens if you execute input.setCustomValidity('Looks Good!') when an input is valid?",
                "The input becomes INVALID! Because the argument is non-empty, the browser treats 'Looks Good!' as an error message and blocks form submission.",
                "The browser interprets any non-empty string passed to `setCustomValidity()` as an active custom error. To mark a field as valid, you MUST pass an empty string `setCustomValidity('')`.",
                "Any non-empty string—even 'Valid' or 'Looks Good!'—marks the element as invalid. You must pass an empty string `\"\"` to clear the error.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 17,
                "Why does form.addEventListener('invalid', handler) fail to intercept validation errors without extra options?",
                "The `invalid` event does NOT bubble! Therefore, attaching a standard bubbling listener to the `<form>` will never catch invalid events fired on child `<input>` elements.",
                "To catch `invalid` events at the form level, you must listen in the capturing phase by passing `true` or `{ capture: true }` to `addEventListener('invalid', handler, true)`.",
                "The `invalid` event does not bubble up the DOM tree; you must attach the listener to the capturing phase on the form or attach listeners directly to each input.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 18,
                "Does disabling a form control with disabled prevent it from being validated and submitted?",
                "Yes! A form control with the `disabled` attribute is completely exempt from constraint validation and is NOT submitted in the form payload (it is not a successful control).",
                "If you need an input to remain unmodifiable by the user but still be submitted and validated, use the `readonly` attribute instead of `disabled`.",
                "`disabled` exempts the field from validation and omits it from form submission. Use `readonly` if the value must be submitted.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 19,
                "What is the difference between novalidate on the form and event.preventDefault() in submit handler?",
                "`novalidate` prevents the browser from automatically evaluating constraints and showing popup tooltips, but still submits the form over HTTP if not prevented.",
                "`event.preventDefault()` inside the `submit` event listener stops the actual network transmission and browser page navigation, typically used in Single Page Applications (SPAs).",
                "`novalidate` prevents native browser validation popups; `preventDefault()` stops browser page navigation and HTTP dispatch to allow SPA/Fetch processing.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 20,
                "If an input has required and pattern='[A-Z]+', what is the state of validity.valid when the field is completely empty?",
                "The element is invalid, but specifically `validity.valueMissing` is `true`, while `validity.patternMismatch` is `false`!",
                "HTML5 specification states that the `pattern` constraint is only evaluated if the input value is non-empty. When empty, only `required` fails (`valueMissing = true`), avoiding confusing regex error descriptions on blank fields.",
                "`validity.valueMissing` is true and `patternMismatch` is false, because browsers evaluate `pattern` only on non-empty values.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        return list;
    }

    // --- Curated Quiz Set for Topic 203 (HTML Forms and Validation) ---
    private List<QuizQuestion> generateFormsQuiz(Topic topic) {
        List<QuizQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        // 1. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which HTML attribute is used to enforce that an input control cannot be submitted empty?",
                "required",
                "validate", "mandatory", "nonempty",
                "The 'required' boolean attribute specifies that an input field must be filled out before submitting the form.",
                "[" + topicTitle + " > Important Concepts]"));

        // 2. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which <form> attribute specifies the HTTP method used when sending form data?",
                "method",
                "action", "enctype", "target",
                "The 'method' attribute specifies the HTTP method (GET or POST) to be used when submitting the form data.",
                "[" + topicTitle + " > Important Concepts]"));

        // 3. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "To correctly link an accessible <label> to an <input>, the label's 'for' attribute must match which input attribute?",
                "id",
                "name", "type", "class",
                "The <label for='...'> attribute must exactly match the 'id' attribute of the related <input> element.",
                "[" + topicTitle + " > Important Concepts]"));

        // 4. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "What is the effect of adding the 'novalidate' attribute to a <form> element?",
                "It disables the browser's native automatic constraint validation tooltips upon form submission.",
                "It prevents form data from being submitted to the server.",
                "It automatically disables all input controls in the form.",
                "It makes all required fields optional on the backend.",
                "The 'novalidate' attribute suppresses the browser's built-in validation bubble UI, enabling custom JavaScript error management.",
                "[" + topicTitle + " > Code Examples]"));

        // 5. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "Which JavaScript Constraint Validation API method evaluates validity AND displays the browser error tooltip?",
                "element.reportValidity()",
                "element.checkValidity()",
                "element.validate()",
                "element.setCustomValidity()",
                "While checkValidity() only returns a boolean, reportValidity() both returns the boolean and renders the native validation bubble to the user.",
                "[" + topicTitle + " > Important Concepts]"));

        // 6. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "Which HTML attribute accepts a regular expression to validate the user input format?",
                "pattern",
                "regex", "mask", "format",
                "The 'pattern' attribute specifies a regular expression that the form control's value must match.",
                "[" + topicTitle + " > Important Concepts]"));

        // 7. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "When using element.setCustomValidity(message), how do you mark an element as valid?",
                "Pass an empty string: element.setCustomValidity(\"\")",
                "Pass boolean true: element.setCustomValidity(true)",
                "Pass null: element.setCustomValidity(null)",
                "Pass the string 'valid': element.setCustomValidity(\"valid\")",
                "Any non-empty string marks the field invalid with that message. Only an empty string \"\" clears the custom error and restores validity.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        // 8. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "Which boolean property on input.validity indicates that a 'required' input has been left empty?",
                "valueMissing",
                "typeMismatch", "patternMismatch", "rangeUnderflow",
                "validity.valueMissing is true when an element has the 'required' attribute but has no value.",
                "[" + topicTitle + " > Important Concepts]"));

        // 9. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "Why will form.addEventListener('invalid', handler) fail to intercept validation errors without extra options?",
                "The 'invalid' event does not bubble up the DOM tree.",
                "The 'invalid' event is deprecated in HTML5.",
                "Forms cannot listen to events emitted by child inputs.",
                "Validation events only trigger on the window object.",
                "Because 'invalid' events do not bubble, listeners on ancestor forms must be attached in the capturing phase using addEventListener('invalid', handler, true).",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        // 10. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "If an input has required and pattern='[A-Z]+' and is empty, which statement is TRUE regarding input.validity?",
                "valueMissing is true, and patternMismatch is false.",
                "Both valueMissing and patternMismatch are true.",
                "patternMismatch is true, and valueMissing is false.",
                "valid is true because the pattern was not yet triggered.",
                "The HTML5 specification defines that the pattern attribute is evaluated only when the field has a non-empty value. When empty, only valueMissing is true.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        return list;
    }

    // --- Curated Question Set for Topic 221 (React Router) ---
    private List<InterviewQuestion> generateReactRouterQuestions(Topic topic) {
        List<InterviewQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        // 5 BEGINNER QUESTIONS
        list.add(createQuestion(topic, "BEGINNER", 1,
                "What is the role of <BrowserRouter> in React Router applications?",
                "<BrowserRouter> is the top-level routing provider that connects a React application to the browser's HTML5 History API, enabling client-side navigation without page refreshes.",
                "It manages the browser history stack and listens to 'popstate' events, ensuring that whenever the URL changes, React Router receives the updated location and re-renders the matching components.",
                "<BrowserRouter> wraps the app, syncing the UI with the browser URL using the HTML5 History API.",
                "[" + topicTitle + " > Definition]"));

        list.add(createQuestion(topic, "BEGINNER", 2,
                "How does the <Link> component differ from a standard HTML <a> anchor tag?",
                "The `<Link>` component intercepts user clicks, calls `event.preventDefault()`, and updates the browser URL via `history.pushState` without triggering a full page reload.",
                "A standard `<a>` tag causes the browser to make a new HTTP request for the HTML document, wiping out in-memory React state, resetting component trees, and causing a visible flicker.",
                "`<Link>` performs client-side routing via HTML5 pushState to preserve application state; `<a>` triggers a destructive full page reload.",
                "[" + topicTitle + " > Important Differences]"));

        list.add(createQuestion(topic, "BEGINNER", 3,
                "What is the purpose of the <Routes> component in React Router v6?",
                "The `<Routes>` component acts as the parent container that wraps individual `<Route>` definitions and performs ranked best-match path selection.",
                "In React Router v6, `<Routes>` replaced `<Switch>`, introducing a superior ranked matching algorithm where routes match based on segment specificity rather than order of appearance.",
                "`<Routes>` evaluates all child `<Route>` elements simultaneously and renders the single best matching route.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 4,
                "How do you define a dynamic route with URL path parameters in React Router?",
                "By prefixing the dynamic parameter segment with a colon (`:`) in the Route path, such as `<Route path='topics/:topicId' element={<TopicDetail />} />`.",
                "Inside the component rendered by that route, the dynamic value can be extracted cleanly using the `useParams()` hook, which returns an object mapping parameter names to their string values.",
                "Define dynamic route parameters with a colon (`:paramName`) in the path prop and read them inside the component via `useParams()`.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 5,
                "What is the purpose of the <Outlet /> component in nested routing layouts?",
                "`<Outlet />` is a placeholder component placed inside a parent route layout that renders whichever child route currently matches the URL path.",
                "This allows building shared outer layouts (such as navigation bars, sidebars, and breadcrumbs) that stay permanently mounted while inner view components swap dynamically.",
                "`<Outlet />` acts as an injection slot inside parent layout components to render matching nested child routes.",
                "[" + topicTitle + " > Important Concepts]"));

        // 5 INTERMEDIATE QUESTIONS
        list.add(createQuestion(topic, "INTERMEDIATE", 6,
                "How does the useParams() hook work and what does it return?",
                "`useParams()` returns an object of key/value pairs of dynamic params from the current URL that were matched by the `<Route path>`.",
                "For example, if the route is `/courses/:courseId/modules/:moduleId` and the URL is `/courses/10/modules/5`, `useParams()` returns `{ courseId: '10', moduleId: '5' }`. All parameter values are strings.",
                "`useParams()` returns an object containing string values for all colon-prefixed URL parameters in the matched route.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 7,
                "How do you implement programmatic navigation using the useNavigate() hook?",
                "`useNavigate()` returns an imperative navigation function that can be called inside event handlers or effects (e.g., `navigate('/dashboard')` or `navigate(-1)` to go back).",
                "It supports options like `{ replace: true }` to overwrite the current history entry, and `{ state: data }` to pass transient state to the destination route without exposing it in the URL.",
                "`useNavigate()` provides an imperative `navigate` function for redirecting users upon form submissions or button clicks.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 8,
                "How does useSearchParams() differ from useParams() in React Router?",
                "`useParams()` reads dynamic path segments (e.g., `/topics/221`), while `useSearchParams()` reads and mutates query parameters (e.g., `/topics?tab=quiz&filter=all`).",
                "`useSearchParams()` returns an array with the current URLSearchParams instance and a setter function (similar to `useState`), allowing declarative query string manipulation.",
                "`useParams` accesses path segments (`/users/:id`), whereas `useSearchParams` reads and updates query string keys (`?search=term`).",
                "[" + topicTitle + " > Important Differences]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 9,
                "How do you configure a 404 Not Found catch-all route in React Router v6?",
                "By creating a `<Route path='*' element={<NotFound />} />` as the last child of `<Routes>`.",
                "The asterisk (`*`) is a wildcard splat route that has the lowest matching rank, ensuring it is only displayed when none of the explicit route paths match the incoming URL.",
                "Use `<Route path='*' element={<NotFoundPage />} />` as a fallback wildcard route to catch unmatched URLs.",
                "[" + topicTitle + " > Code Examples]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 10,
                "What is the difference between navigate('/login') and navigate('/login', { replace: true })?",
                "`navigate('/login')` pushes a new entry onto the browser's history stack, while `{ replace: true }` replaces the current entry in the history stack.",
                "Replacing the history entry is critical after login, logout, or form completion so that clicking the browser 'Back' button does not bounce the user back to the unauthorized or completed page.",
                "`replace: true` overwrites the active history entry, preventing the browser Back button from returning to intermediate states.",
                "[" + topicTitle + " > Important Differences]"));

        // 5 ADVANCED QUESTIONS
        list.add(createQuestion(topic, "ADVANCED", 11,
                "How does React Router v6's ranked route matching algorithm work compared to v5's sequential matching?",
                "In v5, routes were evaluated sequentially from top to bottom, requiring exact match flags to prevent premature matching. In v6, routes are evaluated simultaneously using a scoring algorithm.",
                "React Router v6 assigns score points based on segment specificity: static segments score higher than dynamic `:param` segments, which score higher than `*` wildcards. The most specific route always wins regardless of definition order.",
                "React Router v6 scores all routes by segment specificity so the best match always renders, eliminating v5 route order bugs.",
                "[" + topicTitle + " > Internal Working]"));

        list.add(createQuestion(topic, "ADVANCED", 12,
                "How do you implement a Protected Route guard for authenticated dashboard access in React Router?",
                "Create a wrapper component that checks user authentication status. If authenticated, return `children` or `<Outlet />`; otherwise, return `<Navigate to='/login' replace />`.",
                "The guard can also capture `location.pathname` via `useLocation()` and pass it in state (`state: { from: location }`) so the login page can redirect the user back to their original target after authentication.",
                "A ProtectedRoute component conditionally renders protected child elements or redirects unauthenticated visitors to `/login`.",
                "[" + topicTitle + " > Code Examples]"));

        list.add(createQuestion(topic, "ADVANCED", 13,
                "Why does refreshing the browser on a client-routed path (e.g. /topics/221) trigger a 404 error on unconfigured web servers?",
                "Because `/topics/221` is a client-side virtual route, not a physical file on the server. When the browser refreshes, it asks the web server for that exact file path.",
                "If the web server (Nginx, Apache, or CDN) is not configured with a fallback rewrite rule (such as `try_files $uri /index.html`), it returns a 404 Not Found instead of serving `index.html` to allow React Router to boot.",
                "Production web servers must redirect all unmatched requests to `/index.html` so the client-side router can interpret the URL path.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "ADVANCED", 14,
                "How can you pass and access route state between pages using navigate() and useLocation()?",
                "Pass state via the navigate options: `navigate('/confirmation', { state: { orderId: 101 } })`. In the destination component, read `location.state?.orderId` using `useLocation()`.",
                "This state is stored in the browser's History API memory and survives page re-renders, but does not pollute the visible URL query string.",
                "Pass a state object inside `navigate(path, { state })` and read it in the target view using `useLocation().state`.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "ADVANCED", 15,
                "What are the architectural differences between BrowserRouter and HashRouter?",
                "`BrowserRouter` uses HTML5 `pushState` for clean, modern URLs (`/dashboard`), requiring server fallback configuration. `HashRouter` appends `#` (`/#/dashboard`), avoiding server configuration entirely.",
                "`HashRouter` is legacy or used in static environments (like GitHub Pages or desktop Electron apps) where server URL rewrite rules cannot be configured.",
                "`BrowserRouter` produces standard clean URLs and needs server rewrites; `HashRouter` uses hash fragments (`/#/`) and works on static file hosts.",
                "[" + topicTitle + " > Important Differences]"));

        // 5 TRICKY QUESTIONS
        list.add(createQuestion(topic, "TRICKY", 16,
                "In React Router v6, why was <Switch> replaced by <Routes> and how did path matching change?",
                "`<Switch>` matched routes sequentially and stopped at the first prefix match unless `exact` was specified. `<Routes>` replaced it with automatic ranked matching and element prop composition.",
                "Additionally, in `<Routes>`, every route must use the `element={<Component />}` syntax rather than `component={Component}`, improving performance and enabling JSX prop injection.",
                "`<Routes>` replaced `<Switch>` to introduce simultaneous ranked matching, eliminating the need for `exact` and optimizing route rendering.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 17,
                "What happens if a child route path starts with a leading slash '/' inside a nested route definition?",
                "In React Router v6, a leading slash `/` indicates an absolute path from the root domain, breaking the relative nesting relationship with the parent path!",
                "Nested child route paths must be written without leading slashes (e.g., `path='details'` instead of `path='/details'`) so they automatically concatenate with the parent route path.",
                "A leading slash makes a route path absolute from the domain root. Child routes must use relative paths without leading slashes.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 18,
                "How do you prevent layout re-rendering when navigating between nested child routes?",
                "By placing the shared layout in the parent `<Route element={<Layout />}>` and rendering children via `<Outlet />`.",
                "Because the parent layout component remains mounted across URL transitions matching child routes, its internal state, video players, and form drafts are preserved without unmounting.",
                "Parent route components enclosing an `<Outlet />` remain continuously mounted when switching between sibling child routes.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 19,
                "Why will invoking useNavigate() throw an unhandled runtime error if called outside <BrowserRouter>?",
                "`useNavigate()` relies on the React Context (`NavigationContext`) provided by `<BrowserRouter>`. If called in a component outside that tree, the context is null, triggering a runtime error.",
                "Ensure that any component using router hooks is rendered inside the `<BrowserRouter>` hierarchy, or wrap the root component properly in `index.js`/`App.js`.",
                "Router hooks consume React Context provided by `<BrowserRouter>`; calling them outside the router provider tree throws a null context error.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 20,
                "How does NavLink differ from Link in terms of styling active links?",
                "`<NavLink>` provides built-in awareness of the active route, automatically applying an `active` CSS class or accepting a function for `className`/`style` based on `isActive`.",
                "For example: `className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}`. Standard `<Link>` has no active state awareness.",
                "`<NavLink>` automatically detects when its route is active and exposes an `isActive` boolean for dynamic styling; `<Link>` is static.",
                "[" + topicTitle + " > Important Differences]"));

        return list;
    }

    // --- Curated Quiz Set for Topic 221 (React Router) ---
    private List<QuizQuestion> generateReactRouterQuiz(Topic topic) {
        List<QuizQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        // 1. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which component wraps the React application to provide client-side routing context using the HTML5 History API?",
                "<BrowserRouter>",
                "<RouterContainer>", "<HistoryRouter>", "<RouteProvider>",
                "<BrowserRouter> is the primary routing provider that connects a React application to the browser's HTML5 History API.",
                "[" + topicTitle + " > Important Concepts]"));

        // 2. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which hook is used to access dynamic URL route parameters (such as :topicId)?",
                "useParams()",
                "useRoute()", "usePath()", "useQuery()",
                "The useParams() hook returns an object of key/value pairs of URL parameters matched by the current Route path.",
                "[" + topicTitle + " > Important Concepts]"));

        // 3. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which component acts as a placeholder inside a parent layout to render matching nested child routes?",
                "<Outlet />",
                "<ChildContainer />", "<ViewSlot />", "<NestedRoute />",
                "An <Outlet /> should be used in parent route elements to render their child route elements.",
                "[" + topicTitle + " > Important Concepts]"));

        // 4. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "To prevent full page reloads and preserve in-memory React state during navigation, which component should be used instead of <a>?",
                "<Link>",
                "<Anchor>", "<Navigate>", "<Redirect>",
                "The <Link> component intercepts click events and uses pushState to update the URL without reloading the page.",
                "[" + topicTitle + " > Important Differences]"));

        // 5. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "Which hook is used to perform programmatic navigation in React Router v6?",
                "useNavigate()",
                "useHistory()", "useRedirect()", "useTransition()",
                "useNavigate() replaced useHistory() in React Router v6, returning an imperative navigation function.",
                "[" + topicTitle + " > Important Concepts]"));

        // 6. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "How is a catch-all 404 route defined in React Router v6?",
                "<Route path=\"*\" element={<NotFound />} />",
                "<Route default element={<NotFound />} />",
                "<Route path=\"/404\" fallback />",
                "<Route catchAll={<NotFound />} />",
                "The asterisk '*' is a wildcard splat path that matches any URL when no other route matches.",
                "[" + topicTitle + " > Code Examples]"));

        // 7. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "What is the effect of passing { replace: true } to navigate('/dashboard')?",
                "It replaces the current history entry instead of pushing a new one, preventing Back navigation to the prior page.",
                "It reloads the entire React application from the server.",
                "It clears all session storage and cookie data.",
                "It replaces the query parameters with empty strings.",
                "Passing { replace: true } overwrites the current history entry in the browser history stack.",
                "[" + topicTitle + " > Important Concepts]"));

        // 8. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "Why does refreshing a client-side route return a 404 error on a standard production web server?",
                "The requested URL is not a physical file on the server, requiring a fallback rule to serve index.html.",
                "The React Router library is not loaded in production mode.",
                "The browser cache blocks deep URL paths.",
                "Single Page Applications cannot run over HTTPS.",
                "Web servers look for matching physical files on disk; SPAs require a fallback rewrite rule to serve index.html for all routes.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        // 9. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "What happens in React Router v6 if a nested child route path starts with a leading slash '/'?",
                "It is treated as an absolute path from the root rather than relative to the parent route.",
                "React Router throws an unhandled syntax error.",
                "The child route will never match any URL.",
                "It automatically appends to the parent path.",
                "Leading slashes in React Router v6 denote absolute paths from root. Child routes must use relative paths without leading slashes.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        // 10. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "Which hook allows reading and updating the query string parameters in the current URL?",
                "useSearchParams()",
                "useQueryParams()", "useQueryString()", "useLocationParams()",
                "useSearchParams() returns an array containing the current URLSearchParams and a function to update query parameters.",
                "[" + topicTitle + " > Important Differences]"));

        return list;
    }

    // --- Dynamic Question Generator for Any Approved Frontend Note ---
    private List<InterviewQuestion> generateDynamicQuestions(Topic topic) {
        List<InterviewQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        Note note = noteRepository.findByTopicId(topic.getId()).orElse(null);
        String definition = note != null && note.getDefinition() != null ? note.getDefinition() : "Core architectural concept for " + topicTitle;
        String whyNeeded = note != null && note.getWhyNeeded() != null ? note.getWhyNeeded() : "Essential foundational capability in modern frontend development.";
        String howItWorks = note != null && note.getHowItWorks() != null ? note.getHowItWorks() : "Executes within the browser runtime engine and DOM lifecycle.";
        String concepts = note != null && note.getImportantConcepts() != null ? note.getImportantConcepts() : "Key principles and syntax structures for " + topicTitle;
        String realWorld = note != null && note.getRealWorldExamples() != null ? note.getRealWorldExamples() : "Applied across production web applications and UI interfaces.";
        String code = note != null && note.getJavaCodeExamples() != null ? note.getJavaCodeExamples() : "// Implementation example\nconst example = true;";
        String internal = note != null && note.getInternalWorking() != null ? note.getInternalWorking() : "Underlying engine execution, memory allocation, and performance characteristics.";
        String advDis = note != null && note.getAdvantagesDisadvantages() != null ? note.getAdvantagesDisadvantages() : "Provides high developer velocity, modularity, and clean abstraction.";
        String diffs = note != null && note.getImportantDifferences() != null ? note.getImportantDifferences() : "Differentiated by execution model, syntax conventions, and performance trade-offs.";
        String tricky = note != null && note.getCommonTrickyQuestions() != null ? note.getCommonTrickyQuestions() : "Common interview edge cases and runtime behaviors.";
        String interviewAns = note != null && note.getInterviewReadyAnswer() != null ? note.getInterviewReadyAnswer() : topicTitle + " is a foundational technology in modern frontend development.";

        // 5 BEGINNER
        list.add(createQuestion(topic, "BEGINNER", 1,
                "What is " + topicTitle + " and what is its core role in frontend web development?",
                cleanBullet(definition, 0),
                definition,
                cleanBullet(interviewAns, 0),
                "[" + topicTitle + " > Definition]"));

        list.add(createQuestion(topic, "BEGINNER", 2,
                "Why is " + topicTitle + " needed in modern web application engineering?",
                cleanBullet(whyNeeded, 0),
                whyNeeded,
                cleanBullet(whyNeeded, 1),
                "[" + topicTitle + " > Why Needed]"));

        list.add(createQuestion(topic, "BEGINNER", 3,
                "How does " + topicTitle + " operate during execution in the browser?",
                cleanBullet(howItWorks, 0),
                howItWorks,
                cleanBullet(howItWorks, 1),
                "[" + topicTitle + " > How It Works]"));

        list.add(createQuestion(topic, "BEGINNER", 4,
                "What are the primary foundational concepts of " + topicTitle + "?",
                cleanBullet(concepts, 0),
                concepts,
                cleanBullet(concepts, 1),
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "BEGINNER", 5,
                "Can you provide a practical real-world example illustrating " + topicTitle + "?",
                cleanBullet(realWorld, 0),
                realWorld,
                cleanBullet(realWorld, 1),
                "[" + topicTitle + " > Real-World Examples]"));

        // 5 INTERMEDIATE
        list.add(createQuestion(topic, "INTERMEDIATE", 6,
                "How is " + topicTitle + " typically implemented in code? Describe the syntax and usage patterns.",
                "Follows declarative syntax and standard engineering patterns as demonstrated in code examples.",
                code,
                "Write clean, modular code following standard component/script conventions.",
                "[" + topicTitle + " > Code Examples]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 7,
                "What key architectural advantages are achieved by utilizing " + topicTitle + "?",
                cleanBullet(advDis, 0),
                advDis,
                cleanBullet(advDis, 1),
                "[" + topicTitle + " > Advantages and Disadvantages]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 8,
                "What trade-offs or limitations should developers evaluate when adopting " + topicTitle + "?",
                cleanBullet(advDis, 2),
                advDis,
                "Evaluate bundle size, execution overhead, and team learning curve.",
                "[" + topicTitle + " > Advantages and Disadvantages]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 9,
                "How does " + topicTitle + " compare against related alternative approaches?",
                cleanBullet(diffs, 0),
                diffs,
                cleanBullet(diffs, 1),
                "[" + topicTitle + " > Important Differences]"));

        list.add(createQuestion(topic, "INTERMEDIATE", 10,
                "Describe the internal execution lifecycle or pipeline of " + topicTitle + ".",
                cleanBullet(internal, 0),
                internal,
                cleanBullet(internal, 1),
                "[" + topicTitle + " > Internal Working]"));

        // 5 ADVANCED
        list.add(createQuestion(topic, "ADVANCED", 11,
                "Explain the deep internal architecture and performance characteristics of " + topicTitle + ".",
                cleanBullet(internal, 2),
                internal + "\n\n" + howItWorks,
                "Architectural optimizations prevent unnecessary layout thrashing, reflows, and memory leaks.",
                "[" + topicTitle + " > Internal Working]"));

        list.add(createQuestion(topic, "ADVANCED", 12,
                "How do you design scalable applications with " + topicTitle + " to avoid bottlenecks?",
                "Maintain unidirectional data flow, modular component decomposition, and immutable state updates.",
                concepts + "\n\n" + advDis,
                "Structure applications with clear separation of presentation, business logic, and state management.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "ADVANCED", 13,
                "What are the critical accessibility, security, or cross-browser considerations for " + topicTitle + "?",
                "Enforce semantic standards, prevent XSS vulnerabilities, and verify cross-browser compatibility.",
                concepts,
                "Follow WCAG guidelines and sanitize dynamic user inputs to ensure robust security and accessibility.",
                "[" + topicTitle + " > Important Concepts]"));

        list.add(createQuestion(topic, "ADVANCED", 14,
                "How do you debug and resolve complex runtime edge cases when working with " + topicTitle + "?",
                cleanBullet(tricky, 0),
                tricky,
                "Utilize browser DevTools, performance profiling, and isolated unit test assertions.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "ADVANCED", 15,
                "How does " + topicTitle + " handle resource cleanup and prevent memory leaks?",
                "Dispose of subscriptions, timers, and event listeners during component teardown or scope exit.",
                internal,
                "Ensure references are dereferenced so the JavaScript garbage collector can reclaim heap memory.",
                "[" + topicTitle + " > Internal Working]"));

        // 5 TRICKY
        list.add(createQuestion(topic, "TRICKY", 16,
                "What is a common subtle trap or misconception developers encounter in " + topicTitle + "?",
                cleanBullet(tricky, 0),
                tricky,
                cleanBullet(tricky, 1),
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 17,
                "How does the runtime resolve boundary conditions and edge cases in " + topicTitle + "?",
                cleanBullet(tricky, 2),
                tricky,
                cleanBullet(tricky, 3),
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 18,
                "What occurs behind the scenes when unexpected or invalid arguments are passed in " + topicTitle + "?",
                cleanBullet(tricky, 4),
                tricky,
                "The engine throws specific runtime errors or applies default fallback behaviors as defined by the specification.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        list.add(createQuestion(topic, "TRICKY", 19,
                "Why might seemingly identical implementations of " + topicTitle + " behave differently?",
                cleanBullet(diffs, 0),
                diffs,
                "Subtle differences in scope, reference equality, or execution context dictate runtime behavior.",
                "[" + topicTitle + " > Important Differences]"));

        list.add(createQuestion(topic, "TRICKY", 20,
                "How would you deliver a comprehensive, interview-ready summary of " + topicTitle + "?",
                cleanBullet(interviewAns, 0),
                interviewAns,
                interviewAns,
                "[" + topicTitle + " > Interview-Ready Answer]"));

        return list;
    }

    // --- Dynamic Quiz Generator for Any Approved Frontend Note ---
    private List<QuizQuestion> generateDynamicQuiz(Topic topic) {
        List<QuizQuestion> list = new ArrayList<>();
        String topicTitle = topic.getTitle();

        Note note = noteRepository.findByTopicId(topic.getId()).orElse(null);
        String defBullet = cleanBullet(note != null && note.getDefinition() != null ? note.getDefinition() : topicTitle, 0);
        String conceptBullet = cleanBullet(note != null && note.getImportantConcepts() != null ? note.getImportantConcepts() : "Core architecture", 0);
        String whyBullet = cleanBullet(note != null && note.getWhyNeeded() != null ? note.getWhyNeeded() : "Scalable web engineering", 0);
        String howBullet = cleanBullet(note != null && note.getHowItWorks() != null ? note.getHowItWorks() : "Execution via browser engine", 0);
        String advBullet = cleanBullet(note != null && note.getAdvantagesDisadvantages() != null ? note.getAdvantagesDisadvantages() : "Modular code structure", 0);
        String diffBullet = cleanBullet(note != null && note.getImportantDifferences() != null ? note.getImportantDifferences() : "Distinct execution models", 0);
        String internalBullet = cleanBullet(note != null && note.getInternalWorking() != null ? note.getInternalWorking() : "Optimized engine pipeline", 0);
        String trickyBullet = cleanBullet(note != null && note.getCommonTrickyQuestions() != null ? note.getCommonTrickyQuestions() : "Edge case handling", 0);

        // 1. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "What is the primary role and definition of " + topicTitle + " in modern web architecture?",
                defBullet,
                "A legacy server-side scripting protocol deprecated in modern browsers.",
                "A low-level operating system binary compiler.",
                "A hardware-accelerated database query engine.",
                "Definition of " + topicTitle + " as established in the approved curriculum notes.",
                "[" + topicTitle + " > Definition]"));

        // 2. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Which foundational concept is central to the implementation of " + topicTitle + "?",
                conceptBullet,
                "Synchronous blocking thread pools.",
                "Direct raw disk sector access.",
                "Static manual memory allocation without GC.",
                "Fundamental concept covered in " + topicTitle + " important concepts.",
                "[" + topicTitle + " > Important Concepts]"));

        // 3. Beginner
        list.add(createQuizItem(topic, "BEGINNER",
                "Why is " + topicTitle + " utilized in scalable frontend development?",
                whyBullet,
                "To eliminate all CSS stylesheets from modern web pages.",
                "To force full page reloads on every user interaction.",
                "To convert client-side web applications into raw assembly language.",
                "Key rationale detailed in " + topicTitle + " why needed section.",
                "[" + topicTitle + " > Why Needed]"));

        // 4. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "How does " + topicTitle + " function during browser runtime execution?",
                howBullet,
                "By freezing the UI main thread indefinitely.",
                "By bypassing all browser security models and sandboxes.",
                "By converting all web pages to bitmap images before rendering.",
                "Operational mechanism described in " + topicTitle + " how it works.",
                "[" + topicTitle + " > How It Works]"));

        // 5. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "Which statement correctly reflects a major advantage of " + topicTitle + "?",
                advBullet,
                "Guarantees zero memory usage under all workloads.",
                "Completely eliminates the need for testing or verification.",
                "Replaces the need for HTML and JavaScript runtimes entirely.",
                "Key benefit outlined in " + topicTitle + " advantages.",
                "[" + topicTitle + " > Advantages and Disadvantages]"));

        // 6. Intermediate
        list.add(createQuizItem(topic, "INTERMEDIATE",
                "In code implementations of " + topicTitle + ", what is the recommended best practice?",
                "Adhere to declarative modular syntax, clean state boundaries, and standard formatting conventions.",
                "Place all application code in a single massive global variable.",
                "Use deprecated legacy syntax across production files.",
                "Avoid writing comments or using modular file structures.",
                "Code guidelines established in " + topicTitle + " code examples.",
                "[" + topicTitle + " > Code Examples]"));

        // 7. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "What is a critical architectural distinction highlighted in " + topicTitle + "?",
                diffBullet,
                "Both approaches are completely identical with zero difference.",
                "One runs exclusively in browsers while the other cannot run on any machine.",
                "Modern browsers disallow both approaches entirely.",
                "Comparative analysis detailed in " + topicTitle + " important differences.",
                "[" + topicTitle + " > Important Differences]"));

        // 8. Advanced
        list.add(createQuizItem(topic, "ADVANCED",
                "Under the hood, what mechanism governs the execution of " + topicTitle + "?",
                internalBullet,
                "A continuous infinite blocking loop on the UI compositor thread.",
                "Direct write access to computer hardware BIOS firmware.",
                "Manual deletion of operating system environment variables.",
                "Internal engine pipeline detailed in " + topicTitle + " internal working.",
                "[" + topicTitle + " > Internal Working]"));

        // 9. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "When encountering tricky edge cases in " + topicTitle + ", what is the expected runtime behavior?",
                trickyBullet,
                "The browser immediately crashes without emitting any error logs.",
                "The code silently deletes all user data permanently.",
                "The runtime reboots the host operating system.",
                "Edge-case resolution covered in " + topicTitle + " common tricky questions.",
                "[" + topicTitle + " > Common Interview Tricky Questions]"));

        // 10. Tricky
        list.add(createQuizItem(topic, "TRICKY",
                "Which senior-level guideline should be observed when optimizing " + topicTitle + "?",
                "Maintain reference stability, minimize unnecessary re-renders, and sanitize dynamic inputs.",
                "Always mutate objects directly in memory without immutability guards.",
                "Never clean up event listeners, timers, or abort controllers.",
                "Execute heavy CPU-bound algorithms synchronously inside the render cycle.",
                "Best practices and revision summary for " + topicTitle + ".",
                "[" + topicTitle + " > Quick Revision Points]"));

        return list;
    }

    private String cleanBullet(String text, int index) {
        if (text == null || text.isBlank()) return "Key technical concept";
        String[] lines = text.split("\n");
        List<String> bullets = new ArrayList<>();
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
                String clean = trimmed.replaceAll("^[\\-\\•\\*\\s]+", "")
                        .replaceAll("\\*\\*", "")
                        .trim();
                if (clean.length() > 10) {
                    bullets.add(clean);
                }
            }
        }
        if (bullets.isEmpty()) {
            return text.length() > 150 ? text.substring(0, 150) + "..." : text;
        }
        return bullets.get(index % bullets.size());
    }

    private InterviewQuestion createQuestion(Topic topic, String difficulty, int order,
                                            String question, String simpleAnswer,
                                            String detailedExplanation, String interviewAnswer,
                                            String sourceRef) {
        InterviewQuestion q = new InterviewQuestion();
        q.setTopic(topic);
        q.setSubject(topic.getSubject());
        q.setQuestion(question);
        q.setSimpleAnswer(simpleAnswer);
        q.setDetailedExplanation(detailedExplanation);
        q.setInterviewAnswer(interviewAnswer);
        q.setDifficulty(difficulty);
        q.setDisplayOrder(order);
        q.setApprovalStatus("PENDING_REVIEW");
        q.setSourceReference(sourceRef);
        q.setGeneratedByRag(true);
        q.setIsFrequentlyAsked(order <= 5 || difficulty.equals("TRICKY"));
        q.setIsImportant(true);
        return q;
    }

    private QuizQuestion createQuizItem(Topic topic, String difficulty, String questionText,
                                       String correctOption, String distractor1, String distractor2, String distractor3,
                                       String explanation, String sourceRef) {
        QuizQuestion q = new QuizQuestion();
        q.setTopic(topic);
        q.setSubject(topic.getSubject());
        q.setQuestionText(questionText);
        q.setDifficulty(difficulty);
        q.setExplanation(explanation);
        q.setApprovalStatus("PENDING_REVIEW");
        q.setSourceReference(sourceRef);
        q.setGeneratedByRag(true);

        List<QuizOption> options = new ArrayList<>();
        options.add(new QuizOption(q, "A", correctOption, true));
        options.add(new QuizOption(q, "B", distractor1, false));
        options.add(new QuizOption(q, "C", distractor2, false));
        options.add(new QuizOption(q, "D", distractor3, false));
        q.setOptions(options);

        return q;
    }

    // --- LLM External API Integrations (Gemini / OpenAI) ---

    private List<InterviewQuestion> callGeminiForQuestions(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks, String apiKey) throws Exception {
        String prompt = buildQuestionPrompt(topic, chunks);
        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of("temperature", 0.2, "responseMimeType", "application/json")
        );

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() != 200) {
            throw new RagApiException("Gemini API returned error: " + resp.body(), resp.statusCode());
        }

        return parseQuestionsFromJson(resp.body(), topic);
    }

    private List<QuizQuestion> callGeminiForQuiz(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks, String apiKey) throws Exception {
        String prompt = buildQuizPrompt(topic, chunks);
        Map<String, Object> body = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of("temperature", 0.2, "responseMimeType", "application/json")
        );

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() != 200) {
            throw new RagApiException("Gemini API returned error: " + resp.body(), resp.statusCode());
        }

        return parseQuizFromJson(resp.body(), topic);
    }

    private List<InterviewQuestion> callOpenAiForQuestions(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks, String apiKey) throws Exception {
        String prompt = buildQuestionPrompt(topic, chunks);
        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "temperature", 0.2,
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an expert technical interviewer. Return JSON only."),
                        Map.of("role", "user", "content", prompt)
                ),
                "response_format", Map.of("type", "json_object")
        );

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() != 200) {
            throw new RagApiException("OpenAI API returned error: " + resp.body(), resp.statusCode());
        }

        return parseQuestionsFromJson(resp.body(), topic);
    }

    private List<QuizQuestion> callOpenAiForQuiz(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks, String apiKey) throws Exception {
        String prompt = buildQuizPrompt(topic, chunks);
        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "temperature", 0.2,
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an expert exam question creator. Return JSON only."),
                        Map.of("role", "user", "content", prompt)
                ),
                "response_format", Map.of("type", "json_object")
        );

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() != 200) {
            throw new RagApiException("OpenAI API returned error: " + resp.body(), resp.statusCode());
        }

        return parseQuizFromJson(resp.body(), topic);
    }

    private String buildQuestionPrompt(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are generating 20 Technical Interview Questions strictly grounded in the following notes for '")
                .append(topic.getTitle()).append("'.\n\nCONTEXT:\n");
        for (RagVectorStoreService.ScoredChunk sc : chunks) {
            sb.append("--- SECTION: ").append(sc.getChunk().getSectionName()).append(" ---\n")
                    .append(sc.getChunk().getContent()).append("\n\n");
        }
        sb.append("Generate exactly 20 questions in a JSON array 'questions' with keys: ")
                .append("question, simpleAnswer, detailedExplanation, interviewAnswer, difficulty (5 BEGINNER, 5 INTERMEDIATE, 5 ADVANCED, 5 TRICKY), sourceReference.");
        return sb.toString();
    }

    private String buildQuizPrompt(Topic topic, List<RagVectorStoreService.ScoredChunk> chunks) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are generating 10 Multiple-Choice Questions strictly grounded in the following notes for '")
                .append(topic.getTitle()).append("'.\n\nCONTEXT:\n");
        for (RagVectorStoreService.ScoredChunk sc : chunks) {
            sb.append("--- SECTION: ").append(sc.getChunk().getSectionName()).append(" ---\n")
                    .append(sc.getChunk().getContent()).append("\n\n");
        }
        sb.append("Generate exactly 10 MCQs in a JSON array 'quizzes' with keys: ")
                .append("question, difficulty, explanation, sourceReference, options (array of 4 objects with 'text' and 'isCorrect' where exactly 1 is true).");
        return sb.toString();
    }

    private List<InterviewQuestion> parseQuestionsFromJson(String rawJson, Topic topic) {
        try {
            Map<String, Object> root = objectMapper.readValue(rawJson, new TypeReference<>() {});
            List<Map<String, Object>> items = (List<Map<String, Object>>) root.get("questions");
            if (items == null) return generateGroundedQuestionsOffline(topic, Collections.emptyList());

            List<InterviewQuestion> result = new ArrayList<>();
            int order = 1;
            for (Map<String, Object> m : items) {
                InterviewQuestion q = createQuestion(
                        topic,
                        (String) m.getOrDefault("difficulty", "INTERMEDIATE"),
                        order++,
                        (String) m.get("question"),
                        (String) m.get("simpleAnswer"),
                        (String) m.get("detailedExplanation"),
                        (String) m.get("interviewAnswer"),
                        (String) m.getOrDefault("sourceReference", "[" + topic.getTitle() + " > Concepts]")
                );
                result.add(q);
            }
            return result;
        } catch (Exception e) {
            log.error("Failed to parse JSON questions: {}", e.getMessage());
            return generateGroundedQuestionsOffline(topic, Collections.emptyList());
        }
    }

    private List<QuizQuestion> parseQuizFromJson(String rawJson, Topic topic) {
        try {
            Map<String, Object> root = objectMapper.readValue(rawJson, new TypeReference<>() {});
            List<Map<String, Object>> items = (List<Map<String, Object>>) root.get("quizzes");
            if (items == null) return generateGroundedQuizOffline(topic, Collections.emptyList());

            List<QuizQuestion> result = new ArrayList<>();
            String[] labels = {"A", "B", "C", "D"};
            for (Map<String, Object> m : items) {
                QuizQuestion q = new QuizQuestion();
                q.setTopic(topic);
                q.setSubject(topic.getSubject());
                q.setQuestionText((String) m.get("question"));
                q.setDifficulty((String) m.getOrDefault("difficulty", "INTERMEDIATE"));
                q.setExplanation((String) m.get("explanation"));
                q.setSourceReference((String) m.getOrDefault("sourceReference", "[" + topic.getTitle() + " > Concepts]"));
                q.setApprovalStatus("PENDING_REVIEW");
                q.setGeneratedByRag(true);

                List<Map<String, Object>> optMaps = (List<Map<String, Object>>) m.get("options");
                List<QuizOption> options = new ArrayList<>();
                int idx = 0;
                for (Map<String, Object> om : optMaps) {
                    String label = idx < labels.length ? labels[idx] : "A";
                    idx++;
                    options.add(new QuizOption(q, label, (String) om.get("text"), Boolean.TRUE.equals(om.get("isCorrect"))));
                }
                q.setOptions(options);
                result.add(q);
            }
            return result;
        } catch (Exception e) {
            log.error("Failed to parse JSON quiz: {}", e.getMessage());
            return generateGroundedQuizOffline(topic, Collections.emptyList());
        }
    }
}
