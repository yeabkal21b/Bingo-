import React from 'react';

export default function SidebarProfile({ username }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="rounded-full bg-gold w-16 h-16 flex items-center justify-center text-background text-3xl font-bold">{username ? username[0].toUpperCase() : "A"}</div>
      <div className="mt-2 text-white font-medium">{username || "Agent"}</div>
      <div className="text-blue text-xs">Yaba bigo</div>
    </div>
  );
}