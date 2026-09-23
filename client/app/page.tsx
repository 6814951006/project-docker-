"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [quotes, setQuotes] = useState({ text: "Loading...", author: "" });

  const fetchQuote = async () => {
    const response = await fetch("http://localhost:5000/api/quote");
    const data = await response.json();
    setQuotes(data);
  };

  useEffect(() => {
    let isMounted = true;

    const loadQuote = async () => {
      const response = await fetch("http://localhost:5000/api/quote");
      const data = await response.json();
      if (isMounted) {
        setQuotes(data);
      }
    };

    loadQuote();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Random Quote</h1>
      <p className="text-xl mb-2">{quotes.text}</p>
      <p className="text-lg text-gray-600">- {quotes.author}</p>
      <button
        onClick={fetchQuote}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        New Quote
      </button>
    </div>
  );

}