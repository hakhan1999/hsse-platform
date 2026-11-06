'use client';

import { useEffect, useState } from 'react';

type Health = { status: string; service: string; time: string };

export default function Home() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setHealth)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <main style={{ maxWidth: 560, margin: '15vh auto', padding: 24 }}>
      <h1>HSSE Platform</h1>
      <p>Module 3.2: Incident reporting, classification and investigation.</p>
      <h2 style={{ fontSize: 16 }}>API connection</h2>
      {health && (
        <p style={{ color: 'green' }}>
          Connected: {health.service} is {health.status} ({health.time})
        </p>
      )}
      {error && <p style={{ color: 'crimson' }}>Cannot reach the API: {error}</p>}
      {!health && !error && <p>Checking...</p>}
    </main>
  );
}
