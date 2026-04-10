import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Initial Welcome
 useEffect(() => {
  if (isOpen && messages.length === 0) {
    addBotMessage(
      "👋 Welcome to EventHub!\n\nHow can I help you today?",
      ["📅 Show Events", "🎟️ My Events", "✅ Attendance", "🔥 Recommendations"]
    );
  }
}, [isOpen, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  // ================= BOT MESSAGE =================
  const addBotMessage = (text, buttons = []) => {
    setTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text, buttons, timestamp: new Date() }
      ]);
      setTyping(false);
    }, 800);
  };

  // ================= USER MESSAGE =================
  const handleUserInput = async (msg) => {
    if (!msg.trim()) return;

    const student = JSON.parse(localStorage.getItem("student"));

    setMessages(prev => [...prev, { 
      sender: "user", 
      text: msg, 
      timestamp: new Date() 
    }]);

    const text = msg.toLowerCase();

    try {
      const chatbotRes = await axios.get(
        `http://localhost:5000/api/student/chatbot/${student.id}`
      );

      const { myEvents, attendance, recommended } = chatbotRes.data;

      // 🔥 GREETING
      if (text === "hi" || text === "hello" || text === "hey") {
        addBotMessage(
          "👋 Welcome back!\n\nWhat would you like to do?",
          ["📅 Show Events", "🎟️ My Events", "✅ Attendance", "🔥 Recommendations"]
        );
      }

      // 🔥 SHOW EVENTS
      else if (text.includes("show") || text.includes("events")) {
        const ev = await axios.get(
          "http://localhost:5000/api/student/events"
        );

        if (ev.data.length === 0) {
          addBotMessage("📅 No upcoming events at the moment.");
        } else {
          addBotMessage(
            "📅 **Upcoming Events:**\n\n" +
              ev.data.map((e, i) => `${i + 1}. **${e.name}** (${e.category})\n   📍 ${e.event_date} | 🎟️ ${e.available_slots} slots left`).join("\n\n")
          );
        }
      }

      // 🔥 MY EVENTS
      else if (text.includes("my") || text.includes("my events")) {
        if (myEvents.length === 0) {
          addBotMessage("😢 You haven't registered for any events yet.\n\nVisit the Events page to register!");
        } else {
          addBotMessage(
            "🎟️ **Your Registered Events:**\n\n" +
              myEvents.map((e, i) => `${i + 1}. **${e.name}**\n   📅 ${e.event_date} | ${e.start_time} - ${e.end_time}`).join("\n\n")
          );
        }
      }

      // 🔥 ATTENDANCE
      else if (text.includes("attendance")) {
        if (attendance.length === 0) {
          addBotMessage("❌ You haven't marked attendance for any events yet.");
        } else {
          addBotMessage(
            "✅ **Events Attended:**\n\n" +
              attendance.map((e, i) => `${i + 1}. **${e.name}**\n   📅 ${e.event_date}`).join("\n\n")
          );
        }
      }

      // 🔥 RECOMMENDATIONS
      else if (text.includes("recommend") || text.includes("recommendations")) {
        if (recommended.length === 0) {
          addBotMessage("🔥 No recommendations available at the moment.");
        } else {
          addBotMessage(
            "🔥 **Recommended for you:**\n\n" +
              recommended.map((e, i) => `${i + 1}. **${e.name}** (${e.category})\n   📅 ${e.event_date} | 🎟️ ${e.available_slots} slots left`).join("\n\n")
          );
        }
      }

      // 🔥 LOCATION
      else if (text.includes("location") || text.includes("where")) {
        addBotMessage(
          "📍 **College Campus Location**\n\nMain Auditorium, Block A\nGoogle Maps: https://maps.google.com"
        );
      }

      // 🔥 CONTACT
      else if (text.includes("contact") || text.includes("support")) {
        addBotMessage(
          "📞 **Contact Support**\n\nPhone: +91 98765 43210\nEmail: support@eventhub.com\nHours: Mon-Fri, 9 AM - 6 PM"
        );
      }

      // 🔥 HELP
      else if (text.includes("help")) {
        addBotMessage(
          "🤖 **I can help you with:**\n\n• Show Events\n• My Events\n• Attendance Status\n• Event Recommendations\n• Location\n• Contact Support\n\nJust type what you need!"
        );
      }

      // 🔥 DEFAULT
      else {
        addBotMessage(
          "🤖 I didn't understand that.\n\nTry one of these options:",
          ["📅 Show Events", "🎟️ My Events", "✅ Attendance", "🔥 Recommendations", "📍 Location", "📞 Contact", "❓ Help"]
        );
      }

    } catch (err) {
      console.log(err);
      addBotMessage("❌ Sorry, I'm having trouble connecting. Please try again later.");
    }
  };

  // ================= SEND =================
  const sendMessage = () => {
    if (input.trim()) {
      handleUserInput(input);
      setInput("");
    }
  };

  // ================= KEY PRESS =================
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // ================= BUTTON CLICK =================
  const handleButtonClick = (text) => {
    handleUserInput(text);
  };

  // ================= TOGGLE CHATBOT =================
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button className={`chatbot-toggle ${isOpen ? 'active' : ''}`} onClick={toggleChatbot}>
        {isOpen ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <>
            <i className="bi bi-chat-dots-fill"></i>
            <span className="notification-badge">1</span>
          </>
        )}
      </button>

      {/* Chatbot Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="chatbot-header">
          <div className="header-info">
            <div className="bot-avatar">
              <i className="bi bi-robot"></i>
            </div>
            <div className="bot-details">
              <h3>Event Assistant</h3>
              <p>Online • Ready to help</p>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChatbot}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message-wrapper ${m.sender}`}>
              <div className={`message-bubble ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div className="bot-icon-small">
                    <i className="bi bi-robot"></i>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{m.text}</div>
                  <div className="message-time">{formatTime(m.timestamp)}</div>
                </div>
              </div>
              
              {/* Quick Reply Buttons */}
              {m.buttons && m.buttons.length > 0 && (
                <div className="quick-replies">
                  {m.buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className="quick-reply-btn"
                      onClick={() => handleButtonClick(btn)}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">Event Assistant is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <div className="input-wrappers">
            <i className="bi bi-emoji-smile"></i>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button 
              className="send-btn" 
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;