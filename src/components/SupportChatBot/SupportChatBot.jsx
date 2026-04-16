import React, { useMemo, useState } from 'react';
import './SupportChatBot.css';

const cannedReplies = {
  hello: 'Hello! I can help with orders, delivery, menu questions, and support.',
  order: 'To place an order, go to Restaurants Near You and pick your favorite restaurant.',
  delivery: 'Delivery usually takes 20 to 35 minutes depending on your location and restaurant.',
  payment: 'We support Cash on Delivery, UPI, and Card payments at checkout.',
  support: 'You can reach support by call, WhatsApp, or email from the Customer Support section.'
};

const quickActions = [
  { label: 'Order Help', message: cannedReplies.order },
  { label: 'Delivery Time', message: cannedReplies.delivery },
  { label: 'Payments', message: cannedReplies.payment },
  { label: 'Support', message: cannedReplies.support }
];

const SupportChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: cannedReplies.hello }
  ]);
  const [input, setInput] = useState('');

  const supportSuggestions = useMemo(() => [
    'How do I place an order?',
    'What is the delivery time?',
    'Which payment methods are available?'
  ], []);

  const sendMessage = (text) => {
    const value = (text || input).trim();
    if (!value) return;

    const lowerValue = value.toLowerCase();
    let reply = 'Thanks for reaching out. A support agent will help with that shortly.';

    if (lowerValue.includes('order')) reply = cannedReplies.order;
    else if (lowerValue.includes('deliver')) reply = cannedReplies.delivery;
    else if (lowerValue.includes('pay')) reply = cannedReplies.payment;
    else if (lowerValue.includes('support') || lowerValue.includes('help')) reply = cannedReplies.support;
    else if (lowerValue.includes('hello') || lowerValue.includes('hi')) reply = cannedReplies.hello;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'user', text: value },
      { id: Date.now() + 1, from: 'bot', text: reply }
    ]);
    setInput('');
    setIsOpen(true);
  };

  return (
    <div className="support-chatbot">
      {isOpen && (
        <div className="support-chat-window" role="dialog" aria-label="Customer support chat">
          <div className="support-chat-header">
            <div>
              <p className="support-chat-eyebrow">Customer Support</p>
              <h3>ORDER KARO Assistant</h3>
            </div>
            <button type="button" className="support-close-btn" onClick={() => setIsOpen(false)} aria-label="Close support chat">
              ✕
            </button>
          </div>

          <div className="support-chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.from}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="support-quick-replies">
            {quickActions.map((action) => (
              <button key={action.label} type="button" onClick={() => sendMessage(action.message)}>
                {action.label}
              </button>
            ))}
          </div>

          <div className="support-chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about orders, delivery, or payments"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button type="button" onClick={() => sendMessage()}>Send</button>
          </div>

          <div className="support-chat-suggestions">
            {supportSuggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="support-launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open customer support chat"
      >
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M4 5.8C4 4.8 4.8 4 5.8 4h12.4c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H12l-4.2 3.2v-3.2H5.8C4.8 15 4 14.2 4 13.2V5.8z" />
          <path d="M8 8.5h8M8 11h5.5" />
        </svg>
        <span>Support</span>
      </button>
    </div>
  );
};

export default SupportChatBot;
