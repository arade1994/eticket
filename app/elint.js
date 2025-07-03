import fs from "fs";

const reportPath = "eslint-report.json";

if (!fs.existsSync(reportPath)) {
  console.error(`❌ Report file "${reportPath}" not found.`);
  process.exit(1);
}

const reportData = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

let errorCount = 0;
for (const file of reportData) {
  for (const message of file.messages) {
    if (message.severity === 2) {
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`❌ ESLint found ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log("✅ No ESLint errors found (warnings are okay).");
}
