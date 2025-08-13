import React from 'react';

export function speakAmharic(text) {
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = 'am-ET';
  window.speechSynthesis.speak(utter);
}

export default function GameRunner({ calledNumbers }) {
  const [lastNumber, setLastNumber] = React.useState(null);

  React.useEffect(() => {
    if (calledNumbers.length && calledNumbers[calledNumbers.length-1] !== lastNumber) {
      const n = calledNumbers[calledNumbers.length-1];
      setLastNumber(n);
      speakAmharic(`${n}`);
    }
    // eslint-disable-next-line
  }, [calledNumbers]);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold text-gold">Live Bingo Game</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 75 }, (_, i) => i + 1).map(num => (
            <div
              key={num}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
                ${calledNumbers.includes(num) ? 'bg-gold text-background' : 'bg-rowAlt text-white'}`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="mt-6 text-xl">
          <span className="font-bold mr-2 text-blue">Next Number:</span>
          <span className="text-gold text-4xl">
            {calledNumbers.length ? calledNumbers[calledNumbers.length-1] : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}