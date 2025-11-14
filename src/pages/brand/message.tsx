import Head from 'next/head';
import { Search, Send, Paperclip, MoreHorizontal } from 'lucide-react';
import React from 'react';

// --- Static Data for the Conversation List ---
const conversationsData = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://placehold.co/48x48/fbcfe8/ffffff?text=SJ&font=inter',
    lastMessage: 'Thanks for the campaign d...',
    time: '10:45 AM',
    unread: 2,
    active: true,
  },
  {
    name: 'Mike Chen',
    avatar: 'https://placehold.co/48x48/a78bfa/ffffff?text=MC&font=inter',
    lastMessage: 'When do you need the content?',
    time: 'Yesterday',
    unread: 0,
    active: false,
  },
  {
    name: 'Emma Davis',
    avatar: 'https://placehold.co/48x48/fcd34d/ffffff?text=ED&font=inter',
    lastMessage: 'I can start next week',
    time: 'Yesterday',
    unread: 1,
    active: false,
  },
  {
    name: 'Alex Kumar',
    avatar: 'https://placehold.co/48x48/bbf7d0/ffffff?text=AK&font=inter',
    lastMessage: 'Sounds good! Let’s do it.',
    time: '2 days ago',
    unread: 0,
    active: false,
  },
];

// --- Static Data for the Chat Messages ---
const messagesData = [
  {
    id: 1,
    sender: 'user', // This is the influencer
    text: 'Hi! Thanks for reaching out about the campaign.',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'admin', // This is the brand (you)
    text: 'Great! I think your content style is perfect for our Summer Fashion Launch.',
    time: '10:32 AM',
  },
  {
    id: 3,
    sender: 'user',
    text: 'That sounds exciting! Can you share more details about the deliverables?',
    time: '10:35 AM',
  },
];

// --- Internal Component: ConversationItem ---
const ConversationItem = ({ convo }: { convo: any }) => (
  <a
    href="#"
    className={`
      flex items-start p-3 rounded-lg space-x-3
      ${convo.active ? 'bg-purple-50' : 'hover:bg-gray-50'}
    `}
  >
    <img
      className="h-12 w-12 rounded-full object-cover"
      src={convo.avatar}
      alt={convo.name}
    />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800">{convo.name}</h3>
        <span className="text-xs text-gray-500">{convo.time}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
        {convo.unread > 0 && (
          <span className="h-5 w-5 bg-purple-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
            {convo.unread}
          </span>
        )}
      </div>
    </div>
  </a>
);

// --- Main Page Component ---
export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>Messages - Influencer Hub</title>
      </Head>

      {/* Main Chat Layout Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex h-[calc(100vh-160px)] overflow-hidden">
        
        {/* Column 1: Conversation List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="search"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* Scrollable Conversation List */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversationsData.map((convo) => (
              <ConversationItem key={convo.name} convo={convo} />
            ))}
          </nav>
        </div>

        {/* Column 2: Chat Window */}
        <div className="w-2/3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://placehold.co/48x48/fbcfe8/ffffff?text=SJ&font=inter"
                  alt="Sarah Johnson"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sarah Johnson</h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-2">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messagesData.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-md p-3 rounded-lg shadow-sm
                    ${
                      msg.sender === 'admin'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }
                  `}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'admin' ? 'text-purple-200' : 'text-gray-500'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="relative flex items-center">
              <button className="text-gray-400 hover:text-gray-600 p-3">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-3 pr-16 rounded-lg border-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-3 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}