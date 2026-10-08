import React from 'react';
import { Organization, Registration, ContactInquiry, GalleryPhoto, EventInfo } from '../../types';
import { Users, UserCheck, Image, Mail, Calendar, TrendingUp, Plus, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface DashboardTabProps {
  organizations: Organization[];
  registrations: Registration[];
  galleryPhotos: GalleryPhoto[];
  inquiries: ContactInquiry[];
  eventInfo: EventInfo;
  onNavigateTab: (tab: string) => void;
  onOpenPublicSite: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  organizations,
  registrations,
  galleryPhotos,
  inquiries,
  eventInfo,
  onNavigateTab,
  onOpenPublicSite
}) => {
  const confirmedCount = registrations.filter(r => r.status === 'Confirmed').length;
  const pendingCount = registrations.filter(r => r.status === 'Pending').length;
  const unreadInquiries = inquiries.filter(i => i.status === 'Unread').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2A1107] to-[#1C0E07] p-6 rounded-2xl border border-[#54210C] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E65A15] font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>ADF2027 Live CMS Control Center</span>
          </div>
          <h2 className="font-tech text-2xl sm:text-3xl font-black text-white uppercase">
            A Day With The Foxes • Management
          </h2>
          <p className="font-mono text-xs text-amber-200/80 mt-1">
            Scheduled for {eventInfo.dateRange} at {eventInfo.venue}. All changes update the public event portal instantly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('organizations')}
            className="py-2.5 px-4 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Organization</span>
          </button>
          <button
            onClick={onOpenPublicSite}
            className="py-2.5 px-4 rounded-xl bg-[#160803] border border-[#54210C] hover:border-[#E65A15] text-amber-200 hover:text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>View Public Site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Orgs Card */}
        <div 
          onClick={() => onNavigateTab('organizations')}
          className="bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C] hover:border-[#E65A15] transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-[#E65A15] border border-orange-500/20">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-amber-400/80 group-hover:text-amber-300">View All →</span>
          </div>
          <div className="font-tech text-3xl font-black text-white">{organizations.length}</div>
          <div className="font-mono text-xs text-stone-300 mt-1">Featured Organizations</div>
          <div className="font-mono text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>All SOC accredited</span>
          </div>
        </div>

        {/* Registrations Card */}
        <div 
          onClick={() => onNavigateTab('registrations')}
          className="bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C] hover:border-[#E65A15] transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-amber-400/80 group-hover:text-amber-300">Manage →</span>
          </div>
          <div className="font-tech text-3xl font-black text-white">{registrations.length}</div>
          <div className="font-mono text-xs text-stone-300 mt-1">Fox Adventure RSVPs</div>
          <div className="font-mono text-[10px] text-amber-300 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{confirmedCount} confirmed, {pendingCount} pending</span>
          </div>
        </div>

        {/* Gallery Card */}
        <div 
          onClick={() => onNavigateTab('gallery')}
          className="bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C] hover:border-[#E65A15] transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Image className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-amber-400/80 group-hover:text-amber-300">Curate →</span>
          </div>
          <div className="font-tech text-3xl font-black text-white">{galleryPhotos.length}</div>
          <div className="font-mono text-xs text-stone-300 mt-1">Polaroid Memories</div>
          <div className="font-mono text-[10px] text-stone-400 mt-2">
            Displayed on event showcase
          </div>
        </div>

        {/* Inquiries Card */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C] hover:border-[#E65A15] transition-all cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-amber-400/80 group-hover:text-amber-300">Inbox →</span>
          </div>
          <div className="font-tech text-3xl font-black text-white">{inquiries.length}</div>
          <div className="font-mono text-xs text-stone-300 mt-1">Coordinator Inquiries</div>
          <div className="font-mono text-[10px] text-orange-400 mt-2 font-bold">
            {unreadInquiries > 0 ? `${unreadInquiries} new unread inquiries` : 'All inquiries reviewed'}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Registrations & Organization Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-8 bg-[#1C0E07] rounded-2xl border border-[#481E0C] p-5 shadow">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#311306]">
            <div>
              <h3 className="font-tech text-lg font-bold text-white uppercase">
                Recent Attendee Registrations
              </h3>
              <p className="font-mono text-xs text-stone-400">
                Latest students who registered for the Fox Adventure
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('registrations')}
              className="text-xs font-mono text-[#E65A15] hover:text-orange-400 font-bold"
            >
              View Full Table →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-amber-200/60 border-b border-[#311306] pb-2">
                  <th className="py-2">Student ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Program</th>
                  <th className="py-2">Preferred Org</th>
                  <th className="py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B1107]">
                {registrations.slice(0, 5).map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#251006]/50 transition-colors">
                    <td className="py-3 text-stone-300 font-semibold">{reg.studentId}</td>
                    <td className="py-3 text-white font-medium">{reg.fullName}</td>
                    <td className="py-3 text-stone-400 truncate max-w-[150px]">{reg.program}</td>
                    <td className="py-3 text-amber-300">{reg.preferredOrg}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        reg.status === 'Confirmed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Organizations Interest Breakdown */}
        <div className="lg:col-span-4 bg-[#1C0E07] rounded-2xl border border-[#481E0C] p-5 shadow flex flex-col justify-between">
          <div>
            <h3 className="font-tech text-lg font-bold text-white uppercase mb-1">
              Active SOC Organizations
            </h3>
            <p className="font-mono text-xs text-stone-400 mb-4">
              Booth assignments & engagement
            </p>

            <div className="space-y-3 font-mono text-xs">
              {organizations.map((org) => {
                const count = registrations.filter(r => r.preferredOrg.toLowerCase().includes(org.acronym.toLowerCase()) || r.preferredOrg.toLowerCase().includes(org.name.toLowerCase())).length;
                return (
                  <div key={org.id} className="p-3 rounded-xl bg-[#240E05] border border-[#3E1A0C]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-tech font-bold text-white uppercase">{org.name}</span>
                      <span className="text-[#E65A15] font-bold">{org.memberCount} members</span>
                    </div>
                    <div className="text-[10px] text-stone-400 truncate mb-1">
                      {org.category} • {org.boothLocation}
                    </div>
                    <div className="w-full bg-[#160803] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E65A15] h-full rounded-full"
                        style={{ width: `${Math.min(100, Math.max(25, org.memberCount / 2))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#311306]">
            <button
              onClick={() => onNavigateTab('php-source')}
              className="w-full py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] hover:border-[#E65A15] text-amber-200 font-mono text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Export PHP / MySQL Files (XAMPP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
