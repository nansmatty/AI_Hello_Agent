import dotenv from 'dotenv';
// dotenv.config();

let loaded = false;

export function loadEnv() {
	if (loaded) return;
	dotenv.config();
	loaded = true;
}

// export const CONFIG = {
// 	OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
// 	GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
// 	GROQ_API_KEY: process.env.GROQ_API_KEY || '',
// 	PROVIDER: process.env.PROVIDER || '',
// 	PORT: process.env.PORT || '6001',
// };
