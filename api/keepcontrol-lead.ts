type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type LeadInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  message?: unknown;
  visitorId?: unknown;
  sessionId?: unknown;
};

const asText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl = process.env.KEEP_CONTROL_BASE_URL?.replace(/\/+$/, '');
  const apiKey = process.env.KEEP_CONTROL_API_KEY;

  if (!baseUrl || !apiKey) {
    console.error('KeepControl is not configured');
    return res.status(503).json({ error: 'Lead integration unavailable' });
  }

  const input = (req.body ?? {}) as LeadInput;
  const name = asText(input.name, 120);
  const email = asText(input.email, 255);
  const phone = asText(input.phone, 40);
  const address = asText(input.address, 500);
  const originalMessage = asText(input.message, 2000);

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'Invalid lead data' });
  }

  const lead = {
    name,
    ...(email && { email }),
    ...(phone && { phone }),
    ...(address && { address }),
    ...(originalMessage && { message: originalMessage }),
    ...(asText(input.visitorId, 255) && { visitorId: asText(input.visitorId, 255) }),
    ...(asText(input.sessionId, 255) && { sessionId: asText(input.sessionId, 255) }),
  };

  try {
    const keepControlResponse = await fetch(`${baseUrl}/api/v1/leads`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });

    if (!keepControlResponse.ok) {
      const details = await keepControlResponse.text();
      console.error('KeepControl lead error', keepControlResponse.status, details);
      return res.status(502).json({ error: 'Lead provider rejected the request' });
    }

    return res.status(201).json({ created: true });
  } catch (error) {
    console.error('KeepControl request failed', error);
    return res.status(502).json({ error: 'Lead provider unavailable' });
  }
}
