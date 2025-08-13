import React, { useState } from 'react';

export default function GameCreateWizard({ onCreate }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [speed, setSpeed] = useState('');
  const [pattern, setPattern] = useState('');
  const [audioLang, setAudioLang] = useState('am-ET');

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  return (
    <div className="bg-background text-text p-8 rounded-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold text-gold">Create New Game</h2>
      {step === 1 && (
        <div>
          <label className="block mb-2">Amount per Board</label>
          <input type="number" min="1" className="w-full p-2 rounded bg-rowAlt mb-4 text-text"
            value={amount} onChange={e => setAmount(e.target.value)} />
          <button className="bg-blue px-4 py-2 rounded text-white" onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label className="block mb-2">Game Speed</label>
          <select className="w-full p-2 rounded bg-rowAlt mb-4 text-text"
            value={speed} onChange={e => setSpeed(e.target.value)}>
            <option value="">Select speed</option>
            <option value="regular">Regular Bingo</option>
            <option value="fast">Fast Bingo</option>
            <option value="superfast">Super Fast Bingo</option>
          </select>
          <div className="flex gap-2">
            <button className="bg-rowAlt px-4 py-2 rounded text-text" onClick={handlePrev}>Back</button>
            <button className="bg-blue px-4 py-2 rounded text-white" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <label className="block mb-2">Winning Pattern</label>
          <select className="w-full p-2 rounded bg-rowAlt mb-4 text-text"
            value={pattern} onChange={e => setPattern(e.target.value)}>
            <option value="">Select pattern</option>
            <option value="line">Single Line</option>
            <option value="fullhouse">Full House</option>
          </select>
          <div className="flex gap-2">
            <button className="bg-rowAlt px-4 py-2 rounded text-text" onClick={handlePrev}>Back</button>
            <button className="bg-blue px-4 py-2 rounded text-white" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <label className="block mb-2">Audio Language</label>
          <select className="w-full p-2 rounded bg-rowAlt mb-4 text-text"
            value={audioLang} onChange={e => setAudioLang(e.target.value)}>
            <option value="am-ET">Amharic Male</option>
            <option value="am-ET-female">Amharic Female</option>
          </select>
          <div className="flex gap-2">
            <button className="bg-rowAlt px-4 py-2 rounded text-text" onClick={handlePrev}>Back</button>
            <button className="bg-gold px-4 py-2 rounded text-background" onClick={() => onCreate({ amount, speed, pattern, audioLang })}>Create Game</button>
          </div>
        </div>
      )}
    </div>
  );
}