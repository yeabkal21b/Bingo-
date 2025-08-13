import React from 'react';

// Simple 5x5 Bingo Card Preview
export default function BoardPreview({ board }) {
  return (
    <div className="inline-block bg-rowAlt p-4 rounded">
      <div className="grid grid-cols-5 gap-1">
        {board && board.numbers.map((row, rowIdx) =>
          row.map((num, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`w-10 h-10 flex items-center justify-center rounded font-bold
                ${rowIdx === 2 && colIdx === 2 ? 'bg-gold text-background' : 'bg-background text-text'}`}
            >
              {rowIdx === 2 && colIdx === 2 ? 'Free' : num}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Example usage: <BoardPreview board={{ numbers: [...Array(5)].map(r=>[1,2,3,4,5]) }} />