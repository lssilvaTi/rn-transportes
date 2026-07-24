type KeepControlWindow = Window & {
  keepcontrol?: {
    visitorId?: string;
    sessionId?: string;
  };
};

export async function createKeepControlLead(formData: FormData): Promise<void> {
  const keepControl = (window as KeepControlWindow).keepcontrol;
  const response = await fetch('/api/keepcontrol-lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      message: formData.get('message'),
      visitorId: keepControl?.visitorId,
      sessionId: keepControl?.sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`KeepControl returned ${response.status}`);
  }
}
