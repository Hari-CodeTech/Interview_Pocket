USE interviewpocket_db;

-- 1. Add approval and RAG columns to interview_questions if not present
SET @col_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema='interviewpocket_db' AND table_name='interview_questions' AND column_name='approval_status');
SET @sql = IF(@col_exists = 0, 'ALTER TABLE interview_questions ADD COLUMN approval_status VARCHAR(30) DEFAULT "APPROVED", ADD COLUMN source_reference TEXT, ADD COLUMN generated_by_rag BIT(1) DEFAULT 0, ADD COLUMN rejection_reason VARCHAR(255) NULL', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 2. Add approval and RAG columns to quiz_questions if not present
SET @col_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema='interviewpocket_db' AND table_name='quiz_questions' AND column_name='approval_status');
SET @sql = IF(@col_exists = 0, 'ALTER TABLE quiz_questions ADD COLUMN approval_status VARCHAR(30) DEFAULT "APPROVED", ADD COLUMN source_reference TEXT, ADD COLUMN generated_by_rag BIT(1) DEFAULT 0, ADD COLUMN rejection_reason VARCHAR(255) NULL', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 3. Add is_approved to notes if not present
SET @col_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema='interviewpocket_db' AND table_name='notes' AND column_name='is_approved');
SET @sql = IF(@col_exists = 0, 'ALTER TABLE notes ADD COLUMN is_approved BIT(1) DEFAULT 1', 'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 4. Create rag_note_chunks vector table
CREATE TABLE IF NOT EXISTS rag_note_chunks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    note_id BIGINT NOT NULL,
    chunk_index INT NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    content LONGTEXT NOT NULL,
    token_count INT DEFAULT 0,
    embedding_vector LONGTEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    INDEX idx_rag_topic (topic_id),
    INDEX idx_rag_subject (subject_id)
);

