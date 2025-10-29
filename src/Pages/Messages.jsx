import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import SplitText from "../../Reactbits/SplitText/SplitText";
import { IoChevronUp } from "react-icons/io5";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMessage = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("Contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching messages:", error.message);
      else setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-emerald-400/30 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-2 border-transparent border-t-emerald-400 rounded-full animate-spin"></div>
          </div>
          <span className="text-gray-400 font-light tracking-wider">
            LOADING MESSAGES
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-10 pb-25 relative overflow-hidden flex justify-center items-start">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 px-4 sm:px-6 lg:px-8 items-start">
        {/* LEFT: Sticky Header */}
        <div className="w-full p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-green-500"></div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-green-500">
              Inbox
            </h2>
          </div>

          <SplitText
            text="Edge Messages"
            className="text-4xl sm:text-5xl lg:text-4xl font-medium text-left leading-[1.4] text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />

          <p className="text-gray-400 mt-5 max-w-md text-sm sm:text-base">
            View messages submitted through the contact form. Click to expand
            each message for full details.
          </p>
        </div>

        {/* RIGHT: Messages Accordion */}
        <div className="w-full flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="text-gray-500 italic text-base sm:text-lg py-10 text-center w-full">
              No messages found in your inbox.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg.id}
                className="w-full border border-gray-700/20 rounded-2xl bg-gray-700/15 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
              >
                {/* Header */}
                <button
                  onClick={() => toggleMessage(index)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 text-left focus:outline-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-gray-100 text-xs sm:text-sm md:text-base font-light whitespace-nowrap">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <h3 className="text-base sm:text-lg md:text-[15px] text-gray-200 font-semibold truncate">
                        {msg.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-green-400/80 sm:ml-3 truncate">
                      {msg.email}
                    </p>
                  </div>
                  {openIndex === index ? (
                    <IoChevronUp className="text-gray-100 text-sm flex-shrink-0 ml-2 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  ) : (
                    <IoChevronUp className="text-gray-500 rotate-180 text-sm flex-shrink-0 ml-2 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  )}
                </button>

                {/* Body */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    openIndex === index
                      ? "max-h-[9999px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                  style={{ willChange: "transform, opacity, max-height" }}
                >
                  <div className="p-4 sm:p-6 pt-0">
                    <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed break-words">
                      {msg.message}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
