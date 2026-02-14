#!/usr/bin/env node

/**
 * Script to easily add a new course to your Electronics Learning Platform
 * Usage: node scripts/add-course.mjs
 * 
 * This script will prompt you for course information and automatically
 * add it to your courses.ts file without needing to edit code manually.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

async function addCourse() {
  console.log('\n🚀 Add New Course to Electronics Learning Platform\n');
  console.log('Answer the following questions to create a new course:\n');

  try {
    const courseId = await question('Course ID (e.g., "advanced-electronics"): ');
    const title = await question('Course Title (e.g., "Advanced Electronics"): ');
    const description = await question('Course Description: ');
    const difficulty = await question('Difficulty Level (beginner/intermediate/advanced): ');
    const category = await question('Category (e.g., "Electronics", "IoT", "Programming"): ');
    const duration = await question('Estimated Duration (e.g., "4 weeks"): ');
    const moduleCount = await question('Number of modules: ');

    const newCourse = {
      id: courseId,
      title,
      description,
      difficulty,
      category,
      duration,
      icon: '⚡',
      modules: Array.from({ length: parseInt(moduleCount) }, (_, i) => ({
        id: `module-${i + 1}`,
        title: `Module ${i + 1}`,
        description: 'Module description',
        duration: '1 hour',
        difficulty: difficulty,
        content: 'Module content goes here',
        codeExamples: [],
        practiceProblems: [],
        references: [],
        prerequisites: i > 0 ? [`module-${i}`] : [],
        diyProjects: [],
        videoTutorials: []
      }))
    };

    console.log('\n✅ Course created:');
    console.log(JSON.stringify(newCourse, null, 2));

    const confirm = await question('\nAdd this course to your platform? (yes/no): ');
    
    if (confirm.toLowerCase() === 'yes') {
      // Read current courses file
      const coursesPath = path.join(__dirname, '../client/src/lib/courses.ts');
      let coursesContent = fs.readFileSync(coursesPath, 'utf-8');

      // Add new course to the export array
      const courseJson = JSON.stringify(newCourse, null, 2);
      const insertPoint = coursesContent.lastIndexOf('];');
      
      if (insertPoint !== -1) {
        const before = coursesContent.substring(0, insertPoint);
        const after = coursesContent.substring(insertPoint);
        
        coursesContent = before + ',\n  ' + courseJson + '\n' + after;
        
        fs.writeFileSync(coursesPath, coursesContent);
        console.log('\n✅ Course added successfully!');
        console.log('📝 Next steps:');
        console.log('1. Edit the module content in the Admin Dashboard');
        console.log('2. Add course tools and DIY projects');
        console.log('3. Push your changes to GitHub');
        console.log('4. Your site will automatically update!\n');
      }
    }

    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
  }
}

addCourse();
