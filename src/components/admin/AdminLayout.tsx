import React, { useState } from 'react';
import { FoxMascot } from '../common/FoxMascot';
import { Organization, Registration, GalleryPhoto, ContactInquiry, EventInfo, AdminUser } from '../../types';
import { DashboardTab } from './DashboardTab';
import { OrganizationsTab } from './OrganizationsTab';
import { RegistrationsTab } from './RegistrationsTab';
import { EventSettingsTab } from './EventSettingsTab';
import { GalleryTab } from './GalleryTab';
import { InquiriesTab } from './InquiriesTab';
import { PhpSourceViewer } from './PhpSourceViewer';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  FileCode, 
  LogOut, 
  ExternalLink, 
  Bell, 
  Menu, 
  X,
  ShieldCheck 
} from 'lucide-react';

interface AdminLayoutProps {
  admin: AdminUser;
  organizations: Organization[];
  registrations: Registration[];
  galleryPhotos: GalleryPhoto[];
  inquiries: ContactInquiry[];
  eventInfo: EventInfo;
  onLogout: () => void;
  onExitToPublic: () => void;
  // CRUD actions
  onAddOrg: (org: Omit<Organization, 'id'>) => void;
  onUpdateOrg: (org: Organization) => void;
  onDeleteOrg: (id: number) => void;
  onUpdateRegistrationStatus: (id: number, status: 'Pending' | 'Confirmed' | 'Attended') => void;
  onDeleteRegistration: (id: number) => void;
  onUpdateEventInfo: (info: EventInfo) => void;
  onAddGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  onDeleteGalleryPhoto: (id: number) => void;
  onUpdateInquiryStatus: (id: number, status: 'Unread' | 'Read' | 'Resolved') => void;
  onDeleteInquiry: (id: number) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  admin,
  organizations,
  registrations,
  galleryPhotos,
  inquiries,
  eventInfo,
  onLogout,
  onExitToPublic,
  onAddOrg,
  onUpdateOrg,
  onDeleteOrg,
  onUpdateRegistrationStatus,
  onDeleteRegistration,
  onUpdateEventInfo,
  onAddGalleryPhoto,
  onDeleteGalleryPhoto,
  onUpdateInquiryStatus,
  onDeleteInquiry
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadInquiriesCount = inquiries.filter(i => i.status === 'Unread').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'organizations', label: 'Organizations (CRUD)', icon: Users, badge: organizations.length },
    { id: 'registrations', label: 'Registrations', icon: UserCheck, badge: registrations.length },
    { id: 'event-settings', label: 'Event Details', icon: Calendar },
    { id: 'gallery', label: 'Polaroid Gallery', icon: ImageIcon, badge: galleryPhotos.length },
    { id: 'inquiries', label: 'Inquiries', icon: Mail, badge: unreadInquiriesCount, badgeColor: 'bg-[#E65A15]' },
    { id: 'php-source', label: 'PHP / MySQL Files', icon: FileCode }
  ];

  return (
    <div className="min-h-screen bg-[#120602] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#1A0B05] border-b border-[#351508] px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#251006] text-stone-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <FoxMascot size={38} />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-tech text-xl font-black text-white">ADF2027</span>
                <span className="font-tech text-xl font-black text-[#E65A15]">CMS</span>
              </div>
              <p className="font-mono text-[10px] text-amber-200/70 hidden sm:block">
                School of Computing Content Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right Admin Profile & Quick Switch */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onExitToPublic}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#2A1107] border border-[#54210C] hover:border-[#E65A15] text-amber-200 hover:text-white font-mono text-xs transition-colors cursor-pointer"
            title="Preview public site"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E65A15]" />
            <span className="hidden sm:inline">Public Site</span>
          </button>

          {/* User badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#251006] border border-[#3E1A0C]">
            <ShieldCheck className="w-4 h-4 text-[#E65A15]" />
            <div className="text-left font-mono">
              <div className="text-xs text-white font-bold leading-none">{admin.fullName}</div>
              <div className="text-[10px] text-amber-400 leading-none mt-1">{admin.role}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-mono transition-colors cursor-pointer"
            title="Sign out of CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-[#180A04] border-r border-[#311306] p-4 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block
          ${isMobileMenuOpen ? 'translate-x-0 top-18' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-stone-400 tracking-wider font-tech">
              Content Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E65A15] text-white shadow-md shadow-orange-950/50'
                      : 'text-stone-300 hover:text-white hover:bg-[#251006]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-black/30 text-white' : item.badgeColor || 'bg-[#2E1308] text-amber-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-[#311306] px-3 font-mono text-[11px] text-stone-400">
            <div className="text-amber-300 font-bold mb-1 font-tech uppercase">System Info</div>
            <div>Database: MySQL (PDO)</div>
            <div>Edition: ADF 2027</div>
            <div className="text-emerald-400 font-semibold mt-1">● Server Synchronized</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              organizations={organizations}
              registrations={registrations}
              galleryPhotos={galleryPhotos}
              inquiries={inquiries}
              eventInfo={eventInfo}
              onNavigateTab={setActiveTab}
              onOpenPublicSite={onExitToPublic}
            />
          )}

          {activeTab === 'organizations' && (
            <OrganizationsTab
              organizations={organizations}
              onAddOrg={onAddOrg}
              onUpdateOrg={onUpdateOrg}
              onDeleteOrg={onDeleteOrg}
            />
          )}

          {activeTab === 'registrations' && (
            <RegistrationsTab
              registrations={registrations}
              onUpdateStatus={onUpdateRegistrationStatus}
              onDeleteRegistration={onDeleteRegistration}
            />
          )}

          {activeTab === 'event-settings' && (
            <EventSettingsTab
              eventInfo={eventInfo}
              onUpdateEventInfo={onUpdateEventInfo}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab
              galleryPhotos={galleryPhotos}
              onAddPhoto={onAddGalleryPhoto}
              onDeletePhoto={onDeleteGalleryPhoto}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesTab
              inquiries={inquiries}
              onUpdateStatus={onUpdateInquiryStatus}
              onDeleteInquiry={onDeleteInquiry}
            />
          )}

          {activeTab === 'php-source' && (
            <PhpSourceViewer />
          )}
        </main>
      </div>
    </div>
  );
};
