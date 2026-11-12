-- =========================================================================
-- CLEANUP SCRIPT: REMOVE ALL DUMMY DATA FROM INTERVIEWPOCKET DATABASE
-- =========================================================================

USE interviewpocket_db;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Remove dummy test users created during automated testing
-- Keeping only admin@interviewpocket.com and haripuvvala7924@gmail.com
DELETE FROM user_roles WHERE user_id NOT IN (
    SELECT id FROM (SELECT id FROM users WHERE email IN ('admin@interviewpocket.com', 'haripuvvala7924@gmail.com')) AS keep_users
);

DELETE FROM users WHERE email NOT IN ('admin@interviewpocket.com', 'haripuvvala7924@gmail.com');

-- 2. Clear all dummy/test user progress, attempts and question statuses
TRUNCATE TABLE quiz_attempts;
TRUNCATE TABLE topic_progress;
TRUNCATE TABLE user_question_status;
TRUNCATE TABLE bookmarks;
TRUNCATE TABLE email_verification_otps;

-- 3. Re-link visual animations from invalid IDs 4 and 2 to actual Core Java topics 100 and 94
UPDATE visual_animations SET topic_id = 100 WHERE id = 1;
UPDATE visual_animations SET topic_id = 94 WHERE id = 2;

-- 4. Remove orphan interview questions (topic_id 2, 4, 6)
DELETE FROM interview_questions WHERE topic_id NOT IN (SELECT id FROM topics) OR topic_id < 47;

-- 5. Remove dummy quiz options and quiz questions for dummy topics 8-22
DELETE qo FROM quiz_options qo
JOIN quiz_questions qq ON qo.question_id = qq.id
WHERE qq.topic_id < 47 OR qq.topic_id IS NULL;

DELETE FROM quiz_questions WHERE topic_id < 47 OR topic_id IS NULL;

-- 6. Remove dummy quizzes for subjects > 1
DELETE FROM quizzes WHERE subject_id > 1 OR topic_id < 47;

-- 7. Remove dummy placeholder topics 8-22 (unlinked topics without modules or notes)
DELETE FROM topics WHERE id < 47;

SET FOREIGN_KEY_CHECKS = 1;
