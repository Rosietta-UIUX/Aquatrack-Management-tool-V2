"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { text: inputValue, isUser: true },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isUser: false },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I didn’t catch that. Try again.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "How many batches do I have in my farm?",
    "What is the status of my ponds?",
    "Summarize my farm's current state.",
    "How can I improve my feed conversion ratio?",
  ];

  const handleSuggestedQuestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-[80vh] w-11/12 mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        <div className="mb-4">
          <div className="flex items-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-sm">
                👋 Ask me anything about your fish farm!
              </p>
            </div>
          </div>
        </div>
        {messages.length === 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Suggested Questions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestionClick(question)}
                  className="bg-gray-100 text-left hover:bg-gray-200 p-3 rounded-lg text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.isUser
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-3 max-w-lg`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-sm">The expert is typing...</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-green-500 text-white p-3 rounded-full"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
