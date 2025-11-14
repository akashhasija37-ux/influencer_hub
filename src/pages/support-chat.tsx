import Head from 'next/head';
import { Search, Send, Paperclip, MoreHorizontal } from 'lucide-react';

// Static data for the ticket list
const ticketsData = [
  {
    name: 'Sarah Johnson',
    username: '@sarah_johnson',
    avatarInitial: 'SJ',
    subject: 'Payment not received',
    status: 'open',
    time: '5 min ago',
    unread: 2,
    active: true,
  },
  {
    name: 'TechGear Pro',
    username: '@techgear_pro',
    avatarInitial: 'TP',
    subject: 'Campaign visibility issue',
    status: 'pending',
    time: '1 hour ago',
    unread: 0,
    active: false,
  },
  {
    name: 'Mike Chen',
    username: '@mike_chen',
    avatarInitial: 'MC',
    subject: 'Profile verification',
    status: 'open',
    time: '2 hours ago',
    unread: 1,
    active: false,
  },
  {
    name: 'FitLife Nutrition',
    username: '@fitlife',
    avatarInitial: 'FN',
    subject: 'Subscription upgrade',
    status: 'resolved',
    time: '1 day ago',
    unread: 0,
    active: false,
  },
];

// Static data for the chat messages
const messagesData = [
  {
    id: 1,
    sender: 'user',
    text: 'Hi, I completed the campaign for TechGear Pro 2 weeks ago but haven’t received payment yet. Can you help?',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'admin',
    text: 'Hi Sarah, let me check on that for you. Can you please confirm the campaign ID?',
    time: '10:31 AM',
  },
  {
    id: 3,
    sender: 'user',
    text: 'Yes, the ID is CAM-458B. Thanks!',
    time: '10:32 AM',
  },
  {
    id: 4,
    sender: 'admin',
    text: 'Thank you. I see the invoice was approved. Let me follow up with our finance team to see what the delay is. I apologize for the inconvenience.',
    time: '10:35 AM',
  },
];

// Helper component for status tags
const TicketStatusTag = ({ status }: { status: string }) => {
  let styles = '';
  switch (status) {
    case 'open':
      styles = 'bg-green-100 text-green-800';
      break;
    case 'pending':
      styles = 'bg-yellow-100 text-yellow-800';
      break;
    case 'resolved':
      styles = 'bg-gray-200 text-gray-800';
      break;
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles}`}>{status}</span>;
};

export default function SupportChatPage() {
  const activeTicketStatus = 'Open';

  return (
    <>
      <Head>
        <title>Support Chat - Influencer Hub</title>
      </Head>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Support Chat</h1>
        <p className="text-gray-500 mt-1">
          Respond to user support requests and inquiries
        </p>
      </div>

      {/* Main Chat Layout Container
        We use calc to make the chat UI fill the vertical space
        (100vh - topbar - page padding - page header)
      */}
      <div className="bg-white rounded-lg shadow-md flex h-[calc(100vh-220px)] overflow-hidden">
        
        {/* Column 1: Ticket List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Ticket Search and Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="search"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 text-sm"
              />
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-sm font-medium text-gray-500">All (4)</a>
              <a href="#" className="text-sm font-medium text-gray-500">Open (2)</a>
              <a href="#" className="text-sm font-medium text-purple-600 border-b-2 border-purple-600 pb-1">
                Pending (1)
              </a>
            </nav>
          </div>

          {/* Scrollable Ticket List */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {ticketsData.map((ticket) => (
              <a
                key={ticket.name}
                href="#"
                className={`
                  block p-3 rounded-lg
                  ${ticket.active ? 'bg-purple-50' : 'hover:bg-gray-50'}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                      {ticket.avatarInitial}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{ticket.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{ticket.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {ticket.subject}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <TicketStatusTag status={ticket.status} />
                  {ticket.unread > 0 && (
                    <span className="h-5 w-5 bg-purple-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
                      {ticket.unread}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* Column 2: Chat Window */}
        <div className="w-2/3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sarah Johnson</h2>
                <p className="text-sm text-gray-500">Influencer • @sarah_johnson</p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Subject:</span> Payment not received
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  {['Open', 'Pending', 'Resolved'].map((status) => (
                    <button
                      key={status}
                      className={`
                        px-3 py-1 text-sm font-medium rounded-md
                        ${activeTicketStatus === status ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}
                      `}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messagesData.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-md p-3 rounded-lg
                    ${
                      msg.sender === 'admin'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
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
          <div className="border-t border-gray-200 p-4">
            <div className="relative flex items-center">
              <textarea
                placeholder="Type your message..."
                rows={1}
                className="w-full resize-none p-3 pr-24 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <div className="absolute right-3 flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
