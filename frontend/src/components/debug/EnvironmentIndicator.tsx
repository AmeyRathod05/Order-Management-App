'use client';

import { DEBUG_INFO, IS_PRODUCTION } from '@/lib/api';

export function EnvironmentIndicator() {
  if (IS_PRODUCTION) {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-3 rounded-lg shadow-lg z-50 text-xs font-mono">
      <div className="font-bold mb-1">🔧 Development Mode</div>
      <div>Environment: {DEBUG_INFO.environment}</div>
      <div>API URL: {DEBUG_INFO.apiUrl}</div>
      <div>Env Var: {DEBUG_INFO.envVar}</div>
      <div>Origin: {DEBUG_INFO.windowOrigin}</div>
    </div>
  );
}
