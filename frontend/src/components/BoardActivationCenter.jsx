import React, { useState } from 'react';

const BoardActivationCenter = () => {
    const [selectedBoards, setSelectedBoards] = useState(new Set());
    const totalBoards = 100;

    const toggleBoardSelection = (boardNumber) => {
        setSelectedBoards(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(boardNumber)) {
                newSelected.delete(boardNumber);
            } else {
                newSelected.add(boardNumber);
            }
            return newSelected;
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">የቦርድ ማግበርያ ማዕከል</h1> {/* Board Activation Center */}
            <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: totalBoards }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => toggleBoardSelection(number)}
                        className={`p-4 rounded-md text-center font-semibold transition-colors duration-200 ${
                            selectedBoards.has(number)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div className="mt-6 text-right">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded">
                    ቦርዶችን አግብር ({selectedBoards.size}) {/* Activate Boards */}
                </button>
            </div>
        </div>
    );
};

export default BoardActivationCenter;