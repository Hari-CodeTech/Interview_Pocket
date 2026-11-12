// Batch Ingest, Generate, and Approve All 22 Frontend Topics
const http = require('http');

const TOPIC_IDS = [
  201, 202, 203, 204, 205, 206, 207, 208,
  209, 210, 211, 212, 213, 214, 215, 216,
  217, 218, 219, 220, 221, 222
];

function request(method, path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', err => reject(err));
    req.end();
  });
}

async function runBatch() {
  console.log(`Starting Batch Processing for ${TOPIC_IDS.length} Frontend Topics...\n`);

  for (const topicId of TOPIC_IDS) {
    console.log(`==================================================`);
    console.log(`Processing Topic ID: ${topicId}`);

    // 1. Ingest
    try {
      const ingestRes = await request('POST', `/api/rag/ingest/${topicId}`);
      console.log(`  [Ingest] Status: ${ingestRes.status}, Chunks: ${ingestRes.body?.chunksIngested || 0}`);
    } catch (e) {
      console.error(`  [Ingest Error] ${e.message}`);
    }

    // 2. Generate Questions
    try {
      const qRes = await request('POST', `/api/rag/generate-questions/${topicId}`);
      console.log(`  [Questions] Status: ${qRes.status}, Generated: ${qRes.body?.generatedCount || 0}, Saved Pending: ${qRes.body?.savedPendingReviewCount || 0}`);
    } catch (e) {
      console.error(`  [Questions Error] ${e.message}`);
    }

    // 3. Generate Quiz
    try {
      const quizRes = await request('POST', `/api/rag/generate-quiz/${topicId}`);
      console.log(`  [Quiz] Status: ${quizRes.status}, Generated: ${quizRes.body?.generatedCount || 0}, Saved Pending: ${quizRes.body?.savedPendingReviewCount || 0}`);
    } catch (e) {
      console.error(`  [Quiz Error] ${e.message}`);
    }

    // 4. Bulk Approve
    try {
      const appRes = await request('POST', `/api/rag/bulk-approve/${topicId}`);
      console.log(`  [Bulk Approve] Status: ${appRes.status}, Approved Q: ${appRes.body?.approvedQuestions || 0}, Approved Quizzes: ${appRes.body?.approvedQuizzes || 0}`);
    } catch (e) {
      console.error(`  [Approve Error] ${e.message}`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`Verifying Topic 221 (React Router) with 10-Point Pipeline...`);
  try {
    const testRes = await request('GET', '/api/rag/test-pipeline/221');
    console.log(`\nReact Router Verification Report:`);
    console.log(`  Overall Passed: ${testRes.body?.allPassed}`);
    console.log(`  Score: ${testRes.body?.passedScenarios}/${testRes.body?.totalScenarios}`);
    if (testRes.body?.results) {
      testRes.body.results.forEach(r => {
        console.log(`  [${r.passed ? 'PASS' : 'FAIL'}] Scenario ${r.scenarioNumber}: ${r.name}`);
        console.log(`         Details: ${r.details}`);
      });
    }
  } catch (e) {
    console.error(`Test pipeline error: ${e.message}`);
  }
}

runBatch().catch(console.error);

