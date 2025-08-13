import React, { useState } from 'react';

export default function BoardActivationCenter({ boards, onActivate }) {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]
    );
    if (onActivate) onActivate(selected);
  };

  return (
    <div className="grid grid-cols-10 gap-2 bg-background p-4 rounded">
      {boards.map((board, i) => (
        <button
          key={board.id}
          className={`w-12 h-12 rounded ${selected.includes(board.id) ? 'bg-green' : 'bg-rowAlt'} text-white`}
          onClick={() => toggle(board.id)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}