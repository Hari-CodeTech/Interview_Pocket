# InterviewPocket - Development Progress & Architecture Roadmap

**Your Technical Knowledge. One Place. Always Ready.**

---

## 📌 Phase Tracker

| Phase | Description | Status |
|---|---|:---:|
| **PHASE 1** | Project setup, architecture & database design | 🟢 Completed & Verified |
| **PHASE 2** | Frontend dashboard, navigation & theme toggle | 🟢 Completed & Verified |
| **PHASE 3** | Subject categories & topic navigation | 🟢 Completed & Verified |
| **PHASE 4** | Notebook-style notes & visual learning components | 🟢 Completed & Verified |
| **PHASE 5** | Interview Questions & Answers with rich filters | 🟢 Completed & Verified |
| **PHASE 6** | Dedicated Interview Mode (interactive flashcard style) | 🟢 Completed & Verified |
| **PHASE 7** | Dynamic Challenge Mode & Random Quiz Engine | 🟢 Upgraded & Verified |
| **PHASE 8** | Admin Dashboard & full content management CRUD | 🟢 Completed & Verified |
| **PHASE 9** | Spring Boot REST APIs & MySQL integration | 🟢 Completed & Verified |
| **PHASE 10** | Authentication (JWT), bookmarks & progress tracking | 🟢 Completed & Verified |
| **PHASE 11** | Mobile responsiveness & PWA offline readiness | 🟢 Completed & Verified |
| **PHASE 12** | Comprehensive testing, bug fixing & deployment preparation | 🟢 Completed & Verified |

---

## 🏗️ System Architecture & Technology Stack

```
   ┌─────────────────────────────────────────────────────────┐
   │             INTERVIEWPOCKET FRONTEND (React)            │
   │  React 18 + Vite + Bootstrap 5 + React Router DOM v6    │
   │  Axios + React Icons + Notion/Linear Dark/Light UI      │
   │  PWA Service Worker + LocalStorage Theme/Offline Cache   │
   └────────────────────────────┬────────────────────────────┘
                                │ REST APIs (JSON / JWT Bearer)
                                ▼
   ┌─────────────────────────────────────────────────────────┐
   │             INTERVIEWPOCKET BACKEND (Spring Boot)       │
   │  Java 21 + Spring Boot 3.3.x                           │
   │  ┌───────────────────────────────────────────────────┐  │
   │  │ Layer 1: REST Controllers                         │  │
   │  │  - Auth, Subject, Topic, Note, Interview, Quiz,   │  │
   │  │    VisualAnimation, Bookmark, Progress, Search    │  │
   │  └─────────────────────────┬─────────────────────────┘  │
   │                            ▼                            │
   │  ┌───────────────────────────────────────────────────┐  │
   │  │ Layer 2: Service Layer (Business Logic)           │  │
   │  └─────────────────────────┬─────────────────────────┘  │
   │                            ▼                            │
   │  ┌───────────────────────────────────────────────────┐  │
   │  │ Layer 3: Spring Data JPA / Hibernate Repositories │  │
   │  └─────────────────────────┬─────────────────────────┘  │
   │                            ▼                            │
   │  ┌───────────────────────────────────────────────────┐  │
   │  │ Security: Spring Security 6 + JWT (jjwt 0.12.5)   │  │
   │  └───────────────────────────────────────────────────┘  │
   └────────────────────────────┬────────────────────────────┘
                                │ JDBC Connection Pool (HikariCP)
                                ▼
   ┌─────────────────────────────────────────────────────────┐
   │             PERSISTENCE LAYER (MySQL 8.0)               │
   │  Database: interviewpocket_db                           │
   │  16 Normalized Tables with Foreign Key Constraints      │
   └─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Design (Normalized Schema)

### Tables & Relationships:

1. **`users`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `username` (VARCHAR(50), UNIQUE, NOT NULL)
   - `email` (VARCHAR(100), UNIQUE, NOT NULL)
   - `password` (VARCHAR(255), NOT NULL) - BCrypt hashed
   - `full_name` (VARCHAR(100))
   - `created_at`, `updated_at` (TIMESTAMP)

2. **`roles`**
   - `id` (INT, PK, AUTO_INCREMENT)
   - `name` (VARCHAR(20), UNIQUE, NOT NULL) - `ROLE_USER`, `ROLE_ADMIN`

3. **`user_roles`**
   - `user_id` (BIGINT, FK -> users.id)
   - `role_id` (INT, FK -> roles.id)

4. **`subjects`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `name` (VARCHAR(100), NOT NULL)
   - `slug` (VARCHAR(100), UNIQUE, NOT NULL)
   - `description` (TEXT)
   - `icon` (VARCHAR(50))
   - `color` (VARCHAR(30))
   - `display_order` (INT DEFAULT 0)
   - `is_active` (BOOLEAN DEFAULT TRUE)

5. **`topics`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `subject_id` (BIGINT, FK -> subjects.id, ON DELETE CASCADE)
   - `title` (VARCHAR(150), NOT NULL)
   - `slug` (VARCHAR(150), NOT NULL)
   - `summary` (TEXT)
   - `difficulty_level` (ENUM: 'BEGINNER', 'INTERMEDIATE', 'ADVANCED')
   - `display_order` (INT DEFAULT 0)

6. **`notes`** (Notebook-Style 11 Sections)
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `topic_id` (BIGINT, FK -> topics.id, ON DELETE CASCADE)
   - `title` (VARCHAR(200), NOT NULL)
   - `what_is_it` (TEXT)
   - `simple_meaning` (TEXT)
   - `why_use_it` (TEXT)
   - `how_it_works` (TEXT)
   - `real_world_example` (TEXT)
   - `internal_working` (TEXT)
   - `important_points` (LONGTEXT) - JSON/Markdown array
   - `comparison_table` (LONGTEXT) - JSON table structure
   - `memory_trick` (TEXT)
   - `interview_answer` (TEXT)
   - `practical_code` (LONGTEXT)
   - `created_at`, `updated_at` (TIMESTAMP)

7. **`visual_animations`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `topic_id` (BIGINT, FK -> topics.id, ON DELETE CASCADE)
   - `title` (VARCHAR(150), NOT NULL)
   - `concept_type` (VARCHAR(50)) - e.g., 'POLYMORPHISM', 'ENCAPSULATION', 'SPRING_BOOT_FLOW', 'JDBC_FLOW'
   - `description` (TEXT)

8. **`animation_frames`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `animation_id` (BIGINT, FK -> visual_animations.id, ON DELETE CASCADE)
   - `frame_number` (INT NOT NULL)
   - `title` (VARCHAR(150), NOT NULL)
   - `subtitle` (VARCHAR(200))
   - `explanation` (TEXT NOT NULL)
   - `analogy` (TEXT)
   - `visual_type` (VARCHAR(50)) - SVG component key / diagram config
   - `visual_state_json` (LONGTEXT) - Parameters & state for dynamic visual rendering

9. **`interview_questions`**
   - `id` (BIGINT, PK, AUTO_INCREMENT)
   - `subject_id` (BIGINT, FK -> subjects.id)
   - `topic_id` (BIGINT, FK -> topics.id)
   - `question` (TEXT NOT NULL)
   - `simple_answer` (TEXT NOT NULL)
   - `detailed_explanation` (LONGTEXT)
   - `real_world_example` (TEXT)
   - `memory_trick` (TEXT)
   - `interview_answer` (TEXT NOT NULL)
   - `difficulty` (ENUM: 'BEGINNER', 'INTERMEDIATE', 'ADVANCED')
   - `is_frequently_asked` (BOOLEAN DEFAULT FALSE)
   - `is_important` (BOOLEAN DEFAULT FALSE)
   - `display_order` (INT DEFAULT 0)

10. **`quizzes`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `subject_id` (BIGINT, FK -> subjects.id)
    - `title` (VARCHAR(150), NOT NULL)
    - `description` (TEXT)
    - `category` (ENUM: 'MOST_ASKED', 'SCENARIO_BASED', 'TRICKY', 'OUTPUT_BASED', 'CONCEPTUAL')
    - `difficulty` (ENUM: 'BEGINNER', 'INTERMEDIATE', 'ADVANCED')
    - `time_limit_minutes` (INT DEFAULT 10)

11. **`quiz_questions`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `quiz_id` (BIGINT, FK -> quizzes.id, ON DELETE CASCADE)
    - `question_text` (TEXT NOT NULL)
    - `code_snippet` (TEXT)
    - `explanation` (TEXT NOT NULL)
    - `hint` (TEXT)
    - `category` (VARCHAR(50))
    - `difficulty` (VARCHAR(20))

12. **`quiz_options`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `question_id` (BIGINT, FK -> quiz_questions.id, ON DELETE CASCADE)
    - `option_label` (VARCHAR(5)) - 'A', 'B', 'C', 'D'
    - `option_text` (TEXT NOT NULL)
    - `is_correct` (BOOLEAN NOT NULL DEFAULT FALSE)

13. **`quiz_attempts`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `user_id` (BIGINT, FK -> users.id)
    - `quiz_id` (BIGINT, FK -> quizzes.id)
    - `total_questions` (INT NOT NULL)
    - `correct_answers` (INT NOT NULL)
    - `incorrect_answers` (INT NOT NULL)
    - `score_percentage` (DECIMAL(5,2) NOT NULL)
    - `time_taken_seconds` (INT NOT NULL)
    - `completed_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

14. **`bookmarks`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `user_id` (BIGINT, FK -> users.id, ON DELETE CASCADE)
    - `item_type` (ENUM: 'QUESTION', 'NOTE', 'TOPIC', 'CHALLENGE')
    - `item_id` (BIGINT NOT NULL)
    - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    - UNIQUE KEY (`user_id`, `item_type`, `item_id`)

15. **`topic_progress`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `user_id` (BIGINT, FK -> users.id, ON DELETE CASCADE)
    - `topic_id` (BIGINT, FK -> topics.id, ON DELETE CASCADE)
    - `is_completed` (BOOLEAN DEFAULT FALSE)
    - `last_reviewed_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    - UNIQUE KEY (`user_id`, `topic_id`)

16. **`user_question_status`**
    - `id` (BIGINT, PK, AUTO_INCREMENT)
    - `user_id` (BIGINT, FK -> users.id, ON DELETE CASCADE)
    - `question_id` (BIGINT, FK -> interview_questions.id, ON DELETE CASCADE)
    - `status` (ENUM: 'UNDERSTOOD', 'NEEDS_REVISION')
    - `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
    - UNIQUE KEY (`user_id`, `question_id`)

---

## 📂 Project Directory Structure

```
d:\InterviewPocket/
├── DEVELOPMENT_PROGRESS.md
├── interviewpocket-backend/
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/interviewpocket/
│   │   │   │   ├── InterviewPocketApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── WebMvcConfig.java
│   │   │   │   │   └── DataInitializer.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── SubjectController.java
│   │   │   │   │   ├── TopicController.java
│   │   │   │   │   ├── NoteController.java
│   │   │   │   │   ├── InterviewQuestionController.java
│   │   │   │   │   ├── VisualAnimationController.java
│   │   │   │   │   ├── QuizController.java
│   │   │   │   │   ├── BookmarkController.java
│   │   │   │   │   ├── ProgressController.java
│   │   │   │   │   ├── SearchController.java
│   │   │   │   │   └── AdminController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── SubjectService.java
│   │   │   │   │   ├── TopicService.java
│   │   │   │   │   ├── NoteService.java
│   │   │   │   │   ├── InterviewQuestionService.java
│   │   │   │   │   ├── VisualAnimationService.java
│   │   │   │   │   ├── QuizService.java
│   │   │   │   │   ├── BookmarkService.java
│   │   │   │   │   ├── ProgressService.java
│   │   │   │   │   └── SearchService.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── (14 JpaRepositories)
│   │   │   │   ├── model/
│   │   │   │   │   └── (16 Entity models)
│   │   │   │   ├── dto/
│   │   │   │   │   └── (Request/Response DTOs)
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   └── CustomUserDetails.java
│   │   │   │   └── exception/
│   │   │   │       ├── GlobalExceptionHandler.java
│   │   │   │       └── ResourceNotFoundException.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data-initial.sql
├── interviewpocket-frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   ├── manifest.json
│   │   ├── favicon.ico
│   │   └── pwa-icons/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── ThemeToggle.jsx
│       │   │   ├── GlobalSearchModal.jsx
│       │   │   ├── StatCard.jsx
│       │   │   └── ProgressBar.jsx
│       │   ├── notebook/
│       │   │   ├── NotebookNoteView.jsx
│       │   │   ├── MemoryTrickBox.jsx
│       │   │   ├── ComparisonTable.jsx
│       │   │   └── CodeBlock.jsx
│       │   ├── visual/
│       │   │   ├── VisualAnimationPlayer.jsx
│       │   │   ├── diagrams/
│       │   │   │   ├── PolymorphismDiagram.jsx
│       │   │   │   ├── EncapsulationDiagram.jsx
│       │   │   │   ├── InheritanceDiagram.jsx
│       │   │   │   ├── AbstractionDiagram.jsx
│       │   │   │   ├── SpringBootFlowDiagram.jsx
│       │   │   │   └── JdbcFlowDiagram.jsx
│       │   ├── interview/
│       │   │   ├── QuestionCard.jsx
│       │   │   ├── FilterPills.jsx
│       │   │   └── InterviewModeCard.jsx
│       │   ├── challenge/
│       │   │   ├── QuizEngine.jsx
│       │   │   ├── QuizQuestionView.jsx
│       │   │   ├── QuizResultView.jsx
│       │   │   └── QuizTimer.jsx
│       │   └── admin/
│       │       ├── AdminLayout.jsx
│       │       ├── SubjectManager.jsx
│       │       ├── TopicManager.jsx
│       │       ├── NoteEditor.jsx
│       │       ├── QuestionManager.jsx
│       │       └── QuizManager.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── ThemeContext.jsx
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── SubjectsPage.jsx
│       │   ├── SubjectDetailPage.jsx
│       │   ├── TopicDetailPage.jsx
│       │   ├── InterviewQuestionsPage.jsx
│       │   ├── InterviewModePage.jsx
│       │   ├── ChallengesPage.jsx
│       │   ├── ChallengeQuizPage.jsx
│       │   ├── BookmarksPage.jsx
│       │   ├── ProgressPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── AdminDashboardPage.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── subjectService.js
│       │   ├── topicService.js
│       │   ├── noteService.js
│       │   ├── questionService.js
│       │   ├── quizService.js
│       │   ├── bookmarkService.js
│       │   ├── progressService.js
│       │   └── searchService.js
│       └── utils/
│           ├── constants.js
│           └── storage.js
```
