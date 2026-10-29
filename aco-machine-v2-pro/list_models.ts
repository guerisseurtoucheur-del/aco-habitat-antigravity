import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
    const key = process.env.GEMINI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    console.log(data);
}
run();
