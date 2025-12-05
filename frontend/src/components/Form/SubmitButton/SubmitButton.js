import React from 'react';

function SubmitButton({ text }) {
  return (
  <button 
    type="submit"
    className="bg-lime-300 hover:bg-lime-200 text-black font-bold py-3 px-4 rounded-lg text-md inline-flex items-center justify-center gap-1"
  >
  <span>{text}</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M13 6l6 6-6 6"
    />
  </svg>
  </button>
  );
}

export default SubmitButton;
