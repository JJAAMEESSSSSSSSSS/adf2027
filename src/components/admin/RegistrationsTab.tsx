import React, { useState } from 'react';
import { Registration } from '../../types';
import { Search, Filter, Download, Trash2, CheckCircle2, Clock, UserX, AlertCircle } from 'lucide-react';

interface RegistrationsTabProps {
  registrations: Registration[];
  onUpdateStatus: (id: number, status: 'Pending' | 'Confirmed' | 'Attended') => void;
  onDeleteRegistration: (id: number) => void;
}

export const RegistrationsTab: React.FC<RegistrationsTabProps> = ({
  registrations,
  onUpdateStatus,
  onDeleteRegistration
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.preferredOrg.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['ID,Student ID,Full Name,Email,Year Level,Program,Preferred Org,Status,Created At'];
    const rows = registrations.map(r => 
      `"${r.id}","${r.studentId}","${r.fullName}","${r.email}","${r.yearLevel}","${r.program}","${r.preferredOrg}","${r.status}","${r.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ADF2027_Attendee_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C]">
        <div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            Fox Adventure Registrations ({registrations.length})
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            Student RSVPs, verification passes, and booth attendance records.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="py-2.5 px-4 rounded-xl bg-[#2A1107] border border-[#54210C] hover:border-[#E65A15] text-amber-200 hover:text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
        >
          <Download className="w-4 h-4 text-[#E65A15]" />
          <span>Export CSV Roster</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#1C0E07] p-4 rounded-2xl border border-[#481E0C]">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search student ID, name, email, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white font-mono text-xs focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] text-white font-mono text-xs focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Attended">Attended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1C0E07] rounded-2xl border border-[#481E0C] overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#240E05] text-amber-200/80 border-b border-[#3E1A0C]">
              <tr>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Attendee Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Year & Program</th>
                <th className="py-3 px-4">Chosen Org</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E1207]">
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-[#251006] transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">
                    {reg.studentId}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">
                    {reg.fullName}
                  </td>
                  <td className="py-3 px-4 text-stone-300">
                    {reg.email}
                  </td>
                  <td className="py-3 px-4 text-stone-400">
                    <div>{reg.yearLevel}</div>
                    <div className="text-[10px] text-stone-500">{reg.program}</div>
                  </td>
                  <td className="py-3 px-4 text-orange-300 font-semibold">
                    {reg.preferredOrg}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={reg.status}
                      onChange={(e) => onUpdateStatus(reg.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border cursor-pointer ${
                        reg.status === 'Confirmed'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                          : reg.status === 'Attended'
                          ? 'bg-blue-950/80 text-blue-400 border-blue-800'
                          : 'bg-amber-950/80 text-amber-400 border-amber-800'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Attended">Attended</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove attendee ${reg.fullName} from roster?`)) {
                          onDeleteRegistration(reg.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-400 font-mono text-xs">
                    No attendee registrations found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
