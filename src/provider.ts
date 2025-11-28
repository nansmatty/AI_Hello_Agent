type Provider = 'openai' | 'gemini' | 'groq';

type HelloOutput = {
	ok: boolean;
	provider: Provider;
	model: string;
	message: string;
};

type GeminiGenerateContent = {
	candidates?: Array<{ content?: { parts?: Array<{ text: string }> } }>;
};

async function helloGemini(): Promise<HelloOutput> {
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new Error('GOOGLE_API_KEY is not set or present');
	}

	const model = 'gemini-2.0-flash-lite';
	const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			contents: [
				{
					parts: [{ text: 'Hello from Gemini!' }],
				},
			],
		}),
	});

	if (!response.ok) {
		throw new Error(`Gemini API request failed with status ${response.status}`);
	}

	const json = (await response.json()) as GeminiGenerateContent;

	const text = json.candidates?.[0]?.content?.parts?.[0]?.text || 'No content received';

	return {
		ok: true,
		provider: 'gemini',
		model,
		message: String(text).trim(),
	};
}

type OpenAiChatCompletion = {
	choices?: Array<{ message?: { content?: string } }>;
};

async function helloGroq(): Promise<HelloOutput> {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		throw new Error('GROQ_API_KEY is not set or present');
	}

	const model = 'llama-3.1-8b-instant';
	const url = `https://api.groq.com/openai/v1/chat/completions`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			messages: [
				{
					role: 'user',
					content: 'Hello from Groq!',
				},
			],

			temperature: 0,
		}),
	});

	if (!response.ok) {
		throw new Error(`Groq API request failed with status ${response.status}`);
	}

	const json = (await response.json()) as OpenAiChatCompletion;
	const text = json?.choices?.[0]?.message?.content || 'No content received';

	return {
		ok: true,
		provider: 'groq',
		model,
		message: String(text).trim(),
	};
}

async function helloOpenAI(): Promise<HelloOutput> {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is not set or present');
	}

	const model = 'gpt-4o-mini';
	const url = `https://api.openai.com/v1/chat/completions`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			messages: [
				{
					role: 'user',
					content: 'Hello from OpenAi!',
				},
			],

			temperature: 0,
		}),
	});

	if (!response.ok) {
		throw new Error(`OpenAI API request failed with status ${response.status}`);
	}

	const json = (await response.json()) as OpenAiChatCompletion;
	const text = json?.choices?.[0]?.message?.content || 'No content received';

	return {
		ok: true,
		provider: 'openai',
		model,
		message: String(text).trim(),
	};
}
