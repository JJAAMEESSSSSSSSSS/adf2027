import React, { useState } from 'react';
import { ContactInquiry } from '../../types';
import { Mail, Check, Trash2, Clock, Send, MessageSquare } from 'lucide-react';

interface InquiriesTabProps {
  inquiries: ContactInquiry[];
  onUpdateStatus: (id: number, status: 'Unread' | 'Read' | 'Resolved') => void;
  onDeleteInquiry: (id: number) => void;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({
  inquiries,
  onUpdateStatus,
  onDeleteInquiry
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleOpenInquiry = (inq: ContactInquiry) => {
    setSelectedInquiry(inq);
    if (inq.status === 'Unread') {
      onUpdateStatus(inq.id, 'Read');
    }
    setReplyText('');
    setReplySent(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedInquiry) return;
    onUpdateStatus(selectedInquiry.id, 'Resolved');
    setReplySent(true);
    setTimeout(() => {
      setSelectedInquiry(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C]">
        <div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            Inquiries & Questions ({inquiries.length})
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            Messages sent to Dr. Mary Jane Rabena and Sir Bon Flores through the public contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-6 space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              onClick={() => handleOpenInquiry(inq)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedInquiry?.id === inq.id
                  ? 'bg-[#2A1107] border-[#E65A15] shadow-lg'
                  : 'bg-[#1C0E07] border-[#481E0C] hover:border-[#6A2B10]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    inq.status === 'Unread' ? 'bg-[#E65A15]' : inq.status === 'Read' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <span className="font-tech font-bold text-white text-sm">
                    {inq.fullName}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">
                  {inq.createdAt}
                </span>
              </div>

              <div className="font-mono text-xs text-amber-300 font-semibold mb-1 truncate">
                {inq.subject}
              </div>
              <p className="font-mono text-xs text-stone-400 line-clamp-2">
                {inq.message}
              </p>

              <div className="mt-3 pt-2 border-t border-[#311306] flex items-center justify-between">
                <span className="text-[10px] text-stone-500 font-mono">
                  {inq.email}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  inq.status === 'Unread'
                    ? 'bg-orange-950 text-orange-400 border border-orange-800'
                    : inq.status === 'Read'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}>
                  {inq.status}
                </span>
              </div>
            </div>
          ))}

          {inquiries.length === 0 && (
            <div className="p-8 text-center text-stone-400 font-mono text-xs bg-[#1C0E07] rounded-2xl border border-[#481E0C]">
              No inquiries found.
            </div>
          )}
        </div>

        {/* Selected Message Detail / Reply View */}
        <div className="lg:col-span-6">
          {selectedInquiry ? (
            <div className="bg-[#1C0E07] rounded-2xl border border-[#481E0C] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#311306]">
                <div>
                  <h3 className="font-tech text-lg font-bold text-white uppercase">
                    {selectedInquiry.subject}
                  </h3>
                  <div className="font-mono text-xs text-stone-400 mt-0.5">
                    From: <span className="text-white">{selectedInquiry.fullName}</span> ({selectedInquiry.email})
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Delete this inquiry?')) {
                      onDeleteInquiry(selectedInquiry.id);
                      setSelectedInquiry(null);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white transition-colors cursor-pointer"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#240E05] border border-[#3E1A0C] font-mono text-xs text-amber-100/90 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>

              {replySent ? (
                <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono text-xs text-center">
                  Reply dispatched to student email and ticket marked as Resolved!
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-3 font-mono text-xs">
                  <label className="block text-amber-200 font-semibold">
                    Coordinator Response (Dr. Mary Jane Rabena / Sir Bon Flores)
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your official response to send..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(selectedInquiry.id, 'Resolved')}
                      className="py-2 px-4 rounded-xl bg-[#2A1107] hover:bg-[#3D180A] text-stone-300 font-tech font-bold text-xs uppercase cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Reply</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-[#1C0E07] rounded-2xl border border-[#481E0C] p-12 text-center text-stone-400 font-mono text-xs flex flex-col items-center justify-center h-full">
              <Mail className="w-10 h-10 text-stone-600 mb-3" />
              <span>Select an inquiry from the left to read and send replies.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
