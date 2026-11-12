# InterviewPocket 🚀
> Your Technical Knowledge. One Place. Always Ready.

**InterviewPocket** is an enterprise-grade full-stack technical interview preparation platform designed to help software engineers master foundational and advanced computer science topics, structured revision notes, curated interview questions, and interactive quizzes.

---

## 🌟 Key Features

### 1. Multi-Subject Learning Platform
- **Core Java Curriculum**:
  - **18 Comprehensive Modules** covering **130 Topics**.
  - From JVM internals, Memory Architecture, OOP, Exception Handling, Multithreading, Collections Framework, to Java 8 Streams and Lambdas.
- **Frontend & React Curriculum**:
  - **4 In-Depth Modules** covering **22 Topics**:
    1. HTML5 Architecture & Forms (Topics 201–203)
    2. Modern CSS & Responsive Layouts (Topics 204–208)
    3. JavaScript Core & ES6+ (Topics 209–216)
    4. Modern React & State Management (Topics 217–222, including React Router & API Integration)

### 2. Standardized 13-Section Canonical Notes Structure
Every topic follows a consistent, high-yield educational structure:
1. Definition & Core Meaning
2. Simple Explanation & Analogies
3. Why is it Needed?
4. How Does it Work?
5. Important Concepts & Architecture
6. Real-World Applications
7. Code Examples & Best Practices
8. Internal Working & Engine Mechanics
9. Advantages and Disadvantages
10. Important Differences & Comparisons
11. Common Interview Tricky Questions
12. Recruiter & Interview-Ready Answer
13. Quick Revision Points

### 3. Interactive Student Interfaces (Three-Card Workflow)
- **📖 Notes Reader**: Table of contents navigation, reading progress tracking, formatted code snippets, and mark as completed.
- **🎯 Curated Interview Practice**: Filterable by difficulty (*Beginner*, *Intermediate*, *Advanced*, *Tricky & Edge Cases*), reveal answer toggle, practice tracker, and source citations.
- **🏆 Knowledge Check Quiz**: 4-option randomized MCQs, shuffled options, instant explanations, timer, score calculation, and attempt history.

### 4. AI-Powered RAG Pipeline (Pilot for Frontend)
- **Approved Notes → Semantic Chunking → 384-D Vector Embeddings → Similarity Retrieval → Grounded LLM Generation → Strict Validation → MySQL Persistence**.
- Automatic duplicate detection and similarity checking.
- Admin review & approval workflow (`PENDING_REVIEW` -> `APPROVED` / `REJECTED`).
- Automated 10-scenario verification suite verifying retrieval isolation, question grounding, MCQ structure, and failure handling.

---

## 🛠️ Architecture & Tech Stack

### Backend
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 21 (LTS)
- **Security**: Spring Security 6 with JWT (JSON Web Tokens)
- **ORM / Persistence**: Spring Data JPA & Hibernate
- **Database**: MySQL 8.0
- **Vector Search**: Custom cosine similarity engine over 384-dimensional dense semantic embeddings (`rag_note_chunks`)

### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router v6 (Nested routes, layout wrappers, protected guards)
- **Styling**: Bootstrap 5 + custom dark/light theme variables
- **Icons**: React Icons (FontAwesome, Feather, SimpleIcons)

---

## 🚀 Getting Started

### Prerequisites
- **Java**: JDK 21+
- **Maven**: 3.8+
- **Node.js**: v18+
- **MySQL Server**: 8.0+

### 1. Database Setup
Create the MySQL database:
```sql
CREATE DATABASE interviewpocket_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update your database credentials in `interviewpocket-backend/src/main/resources/application.properties` if different from default:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/interviewpocket_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Backend Startup
```bash
cd interviewpocket-backend
mvn clean package -DskipTests
java -jar target/interviewpocket-backend-1.0.0.jar
```
*Backend runs on `http://localhost:8080`.*

### 3. Frontend Startup
```bash
cd interviewpocket-frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 👥 Default Credentials
- **Admin**: `admin@interviewpocket.com` / `admin123`
- **Student**: `student@interviewpocket.com` / `student123`

---

## 📄 License
This project is proprietary and developed for interview preparation excellence.
