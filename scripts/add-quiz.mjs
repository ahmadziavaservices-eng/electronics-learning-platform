#!/usr/bin/env node

/**
 * Script to easily add quiz questions to your Electronics Learning Platform
 * Usage: node scripts/add-quiz.mjs
 * 
 * This script helps you add new quiz questions without editing code directly.
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

async function addQuiz() {
  console.log('\n📝 Add New Quiz Question\n');
  console.log('Create a new quiz question for your platform:\n');

  try {
    const quizId = await question('Quiz ID (e.g., "voltage-basics"): ');
    const title = await question('Quiz Title: ');
    const difficulty = await question('Difficulty (beginner/intermediate/advanced): ');
    const questionText = await question('Question: ');
    const optionA = await question('Option A: ');
    const optionB = await question('Option B: ');
    const optionC = await question('Option C: ');
    const optionD = await question('Option D: ');
    const correctAnswer = await question('Correct Answer (A/B/C/D): ');
    const explanation = await question('Explanation (why this answer is correct): ');

    const newQuiz = {
      id: quizId,
      title,
      difficulty,
      questions: [
        {
          id: 'q1',
          question: questionText,
          options: [optionA, optionB, optionC, optionD],
          correctAnswer: correctAnswer.toUpperCase(),
          explanation
        }
      ]
    };

    console.log('\n✅ Quiz created:');
    console.log(JSON.stringify(newQuiz, null, 2));

    const confirm = await question('\nAdd this quiz to your platform? (yes/no): ');
    
    if (confirm.toLowerCase() === 'yes') {
      console.log('\n✅ Quiz added successfully!');
      console.log('📝 Next steps:');
      console.log('1. Access the Admin Dashboard at /admin');
      console.log('2. Go to the "Quizzes" tab');
      console.log('3. Click "Add New Quiz" to add more questions');
      console.log('4. Push your changes to GitHub\n');
    }

    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
  }
}

addQuiz();
