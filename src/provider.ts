type Provider = 'openai' | 'gemini' | 'groq';

type HelloOutput = {
	ok: boolean;
	provider: Provider;
	model: string;
	message: string;
};

type GeminiGenerateContent = {
	candidates?: Array<{
		content?: { parts?: Array<{ text: string }> };
	}>;
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
