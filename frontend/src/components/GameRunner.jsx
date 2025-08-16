import React, { useState, useEffect, useRef } from 'react';

const GameRunner = () => {
    // In a real app, this sequence would come from a WebSocket connection to your Django backend
    const gameNumbersSequence = useRef([10, 25, 7, 42, 56, 19, 63, 3, 34, 12, 71, 60, 48, 1, 22, 5, 30, 68]);
    const [calledNumbers, setCalledNumbers] = useState(new Set());
    const [currentNumber, setCurrentNumber] = useState(null);
    const [nextNumber, setNextNumber] = useState(gameNumbersSequence.current[0]);
    const [totalCalls, setTotalCalls] = useState(0);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const utteranceRef = useRef(null);

    // This function handles the Amharic speech synthesis
    const speak = (number) => {
        if (!('speechSynthesis' in window)) {
            console.error("Browser does not support Speech Synthesis.");
            return;
        }
        
        // Cancel any previous speech to prevent overlap
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'am-ET'; // Set language to Amharic
        utterance.rate = 0.8;

        // This is the critical logic: what happens when the speech ends
        utterance.onend = () => {
            setCalledNumbers(prev => new Set(prev).add(number));
            
            const nextIndex = totalCalls; // totalCalls is already updated to the next count
            if (nextIndex < gameNumbersSequence.current.length) {
                setNextNumber(gameNumbersSequence.current[nextIndex]);
            } else {
                setNextNumber(null); // End of game
                setIsGameRunning(false);
            }
        };
        
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const callNextNumber = () => {
        if (nextNumber === null) {
            setIsGameRunning(false);
            return;
        };

        const numberToCall = nextNumber;
        
        setCurrentNumber(numberToCall);
        setTotalCalls(prev => prev + 1);
        
        // The `speak` function handles setting the *next* number via its `onend` callback
        speak(numberToCall);
    };
    
    // Main game loop effect
    useEffect(() => {
        let interval;
        if (isGameRunning) {
            callNextNumber(); // Call the first number immediately
            interval = setInterval(callNextNumber, 4000); // Adjust timing as needed
        }
        return () => {
            clearInterval(interval);
            window.speechSynthesis.cancel(); // Clean up speech on component unmount
        };
    }, [isGameRunning, nextNumber]); // Reruns when the game state changes or a new number is ready


    return (
        <div className="flex space-x-6 h-full">
            {/* Left Panel: Controls and Preview */}
            <div className="w-1/4 flex flex-col space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">ጠቅላላ ጥሪዎች</p> {/* Total Calls */}
                    <p className="text-5xl font-bold">{totalCalls}</p>
                </div>
                {/* Bingo Card Preview */}
                <div className="bg-gray-800 p-4 rounded-lg flex-grow">
                     <div className="grid grid-cols-5 gap-1 text-center">
                        {['B', 'I', 'N', 'G', 'O'].map(letter => <div key={letter} className="font-bold text-xl text-blue-400">{letter}</div>)}
                        {/* Mock card data */}
                        {[5, 20, 31, 48, 62, 12, 28, 45, 50, 71, 8, 16, 'FREE', 58, 65, 2, 21, 33, 52, 68, 14, 25, 40, 55, 75].map((num, i) => (
                             <div key={i} className={`w-12 h-12 flex items-center justify-center rounded-lg m-auto font-bold text-lg ${num === 'FREE' ? 'bg-yellow-500 text-black' : ''} ${calledNumbers.has(num) ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                {num === 'FREE' ? '★' : num}
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">የሚቀጥለው ቁጥር</p> {/* Next Number */}
                    <p className="text-5xl font-bold text-yellow-400">{nextNumber ?? '--'}</p>
                </div>
                 <div className="flex flex-col space-y-2">
                    <button 
                        onClick={() => setIsGameRunning(!isGameRunning)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
                    >
                        {isGameRunning ? 'አቁም' : 'ቀጥል'} {/* Pause / Resume */}
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded">
                        ጨዋታውን ጨርስ {/* End Game */}
                    </button>
                </div>
            </div>

            {/* Right Panel: Main Number Board */}
            <div className="w-3/4 bg-gray-900 p-6 rounded-lg">
                <div className="grid grid-cols-10 gap-3 text-center">
                    {Array.from({ length: 75 }, (_, i) => i + 1).map(num => (
                        <div key={num} className={`p-2 rounded-md h-12 flex items-center justify-center font-semibold text-lg transition-all duration-300
                            ${currentNumber === num ? 'bg-yellow-500 text-black scale-125 ring-2 ring-white' : calledNumbers.has(num) ? 'bg-blue-800 opacity-60' : 'bg-gray-700'}`}
                        >
                            {num}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameRunner;