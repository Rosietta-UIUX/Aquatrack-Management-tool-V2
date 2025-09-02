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

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (text.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { text: text, isUser: true },
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
        body: JSON.stringify({ messages: newMessages }),
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
      console.error("Error sending message:", error);
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
    "How can I improve my FCR?",
    "What’s the best way to prevent fish disease?",
    "How often should I feed my catfish?",
    "What is the ideal water quality for fish farming?",
    "Which feed is best for catfish in Nigeria?",
    "What size of fingerlings should I stock?",
    "How do I reduce fish mortality in my pond?",
    "What are signs of a healthy vs sick fish?",
    "How do I prepare my pond before stocking?",
    "How do I know when my fish are ready for harvest?",
    "Can I mix different feed types?",
    "What stocking density should I use?",
    "What should I do if my fish stop eating?",
    "What’s the best pond size for 1000 catfish?",
    "How do I manage fish farming during the dry season?",
    "What’s a good profit margin per cycle?",
  ];

  const handleSuggestedQuestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[80vh] w-11/12 mx-auto bg-white rounded-2xl shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">AI Chat Assistant</h2>
      </div>
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <p>👋 Ask me anything about your fish farm!</p>
            </div>
          </div>
        </div>
        {messages.length === 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              💬 Quick Questions You Can Ask
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 6).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestionClick(question)}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-sm"
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
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-3 max-w-lg`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <p>The expert is typing...</p>
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
          className="flex-1 p-2 border rounded-full focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          className="ml-4 bg-blue-500 text-white p-3 rounded-full"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
