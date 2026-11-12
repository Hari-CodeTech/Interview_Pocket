const fs = require('fs');
const path = require('path');

const m1 = require('./data_module1.js');
const m2 = require('./data_module2.js');
const m3 = require('./data_module3.js');
const m4 = require('./data_module4.js');

const allTopics = [...m1, ...m2, ...m3, ...m4];

console.log(`Total topics to process: ${allTopics.length}`);

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  const str = String(val)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
  return `'${str}'`;
}

let sql = `-- Seed All Frontend Notes (Modules 19 to 22, Topics 201 to 222)
SET NAMES utf8mb4;

`;

allTopics.forEach(topic => {
  const {
    topicId,
    title,
    definition = '',
    simpleExplanation = '',
    whyNeeded = '',
    howItWorks = '',
    importantConcepts = '',
    realWorldExamples = '',
    javaCodeExamples = '',
    internalWorking = '',
    advantagesDisadvantages = '',
    importantDifferences = '',
    commonTrickyQuestions = '',
    interviewReadyAnswer = '',
    quickRevisionPoints = ''
  } = topic;

  sql += `INSERT INTO notes (
  topic_id, title, is_approved, created_at, updated_at,
  definition, simple_explanation, why_needed, how_it_works,
  important_concepts, real_world_examples, java_code_examples,
  internal_working, advantages_disadvantages, important_differences,
  common_tricky_questions, interview_ready_answer, quick_revision_points,
  what_is_it, simple_meaning, why_use_it, practical_code,
  real_world_example, interview_answer, important_points, comparison_table
) VALUES (
  ${topicId},
  ${escapeSql(title)},
  1,
  NOW(),
  NOW(),
  ${escapeSql(definition)},
  ${escapeSql(simpleExplanation)},
  ${escapeSql(whyNeeded)},
  ${escapeSql(howItWorks)},
  ${escapeSql(importantConcepts)},
  ${escapeSql(realWorldExamples)},
  ${escapeSql(javaCodeExamples)},
  ${escapeSql(internalWorking)},
  ${escapeSql(advantagesDisadvantages)},
  ${escapeSql(importantDifferences)},
  ${escapeSql(commonTrickyQuestions)},
  ${escapeSql(interviewReadyAnswer)},
  ${escapeSql(quickRevisionPoints)},
  ${escapeSql(definition)},
  ${escapeSql(simpleExplanation)},
  ${escapeSql(whyNeeded)},
  ${escapeSql(javaCodeExamples)},
  ${escapeSql(realWorldExamples)},
  ${escapeSql(interviewReadyAnswer)},
  ${escapeSql(quickRevisionPoints)},
  ${escapeSql(importantDifferences)}
) ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  is_approved = 1,
  updated_at = NOW(),
  definition = VALUES(definition),
  simple_explanation = VALUES(simple_explanation),
  why_needed = VALUES(why_needed),
  how_it_works = VALUES(how_it_works),
  important_concepts = VALUES(important_concepts),
  real_world_examples = VALUES(real_world_examples),
  java_code_examples = VALUES(java_code_examples),
  internal_working = VALUES(internal_working),
  advantages_disadvantages = VALUES(advantages_disadvantages),
  important_differences = VALUES(important_differences),
  common_tricky_questions = VALUES(common_tricky_questions),
  interview_ready_answer = VALUES(interview_ready_answer),
  quick_revision_points = VALUES(quick_revision_points),
  what_is_it = VALUES(what_is_it),
  simple_meaning = VALUES(simple_meaning),
  why_use_it = VALUES(why_use_it),
  practical_code = VALUES(practical_code),
  real_world_example = VALUES(real_world_example),
  interview_answer = VALUES(interview_answer),
  important_points = VALUES(important_points),
  comparison_table = VALUES(comparison_table);

`;
});

const outputPath = path.join(__dirname, 'seed_all_frontend_notes.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Successfully generated SQL script at: ${outputPath}`);

