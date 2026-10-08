import React, { useState } from 'react';
import { Organization } from '../../types';
import { OrgBadge } from '../common/OrgBadge';
import { Plus, Edit2, Trash2, Search, Filter, Check, X, Building, Terminal, Shield, Film, RefreshCw, Sparkles } from 'lucide-react';

interface OrganizationsTabProps {
  organizations: Organization[];
  onAddOrg: (org: Omit<Organization, 'id'>) => void;
  onUpdateOrg: (org: Organization) => void;
  onDeleteOrg: (id: number) => void;
}

export const OrganizationsTab: React.FC<OrganizationsTabProps> = ({
  organizations,
  onAddOrg,
  onUpdateOrg,
  onDeleteOrg
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [iconType, setIconType] = useState<'code' | 'shield' | 'media' | 'loop' | 'custom'>('code');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [memberCount, setMemberCount] = useState(100);
  const [boothLocation, setBoothLocation] = useState('SJH 2nd Floor Lobby');

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || org.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(organizations.map(o => o.category)))];

  const handleOpenEdit = (org: Organization) => {
    setEditingOrg(org);
    setName(org.name);
    setAcronym(org.acronym);
    setCategory(org.category);
    setIconType(org.iconType);
    setDescription(org.description);
    setTagline(org.tagline || '');
    setMemberCount(org.memberCount);
    setBoothLocation(org.boothLocation || 'SJH Building');
    setIsAddModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingOrg(null);
    setName('');
    setAcronym('');
    setCategory('Software Engineering');
    setIconType('code');
    setDescription('');
    setTagline('');
    setMemberCount(100);
    setBoothLocation('SJH 2nd Floor Lobby');
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    if (editingOrg) {
      onUpdateOrg({
        ...editingOrg,
        name: name.toUpperCase(),
        acronym: acronym.toUpperCase(),
        category,
        iconType,
        description: description.toUpperCase(),
        tagline,
        memberCount: Number(memberCount),
        boothLocation
      });
    } else {
      onAddOrg({
        name: name.toUpperCase(),
        acronym: acronym.toUpperCase(),
        category,
        iconType,
        description: description.toUpperCase(),
        tagline,
        memberCount: Number(memberCount),
        featured: true,
        boothLocation
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C]">
        <div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            Manage Organizations (CRUD)
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            Create, edit, or remove featured student organizations displayed on the public event site.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-2.5 px-5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Organization</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#1C0E07] p-4 rounded-2xl border border-[#481E0C]">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search organizations by name, acronym, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white font-mono text-xs focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] text-white font-mono text-xs focus:outline-hidden"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-[#1C0E07] rounded-2xl border border-[#481E0C] overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#240E05] text-amber-200/80 border-b border-[#3E1A0C]">
              <tr>
                <th className="py-3 px-4">Org / Badge</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Booth Location</th>
                <th className="py-3 px-4">Members</th>
                <th className="py-3 px-4">Description Snippet</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E1207]">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-[#251006] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-tech font-bold text-white text-sm uppercase">
                      {org.name}
                    </div>
                    <div className="text-[10px] text-amber-400">
                      Acronym: {org.acronym}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#341609] border border-[#54210C] text-stone-300 text-[10px]">
                      {org.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-300">{org.boothLocation || 'SJH Building'}</td>
                  <td className="py-3 px-4 font-bold text-[#E65A15]">{org.memberCount}</td>
                  <td className="py-3 px-4 text-stone-400 max-w-xs truncate">
                    {org.description}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(org)}
                        className="p-1.5 rounded-lg bg-[#2A1107] hover:bg-[#E65A15] text-amber-200 hover:text-white transition-colors cursor-pointer"
                        title="Edit Organization"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${org.name}?`)) {
                            onDeleteOrg(org.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white transition-colors cursor-pointer"
                        title="Delete Organization"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrgs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400 font-mono text-xs">
                    No organizations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#1C0E07] text-white rounded-3xl border-3 border-[#E65A15] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase mb-1">
              {editingOrg ? 'Edit Organization' : 'Add New Organization'}
            </h3>
            <p className="font-mono text-xs text-amber-200/80 mb-5">
              Fill in the organization profile to update the featured cards.
            </p>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CODE GEEKS"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Acronym / Short Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CSIA"
                    value={acronym}
                    onChange={(e) => setAcronym(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Category / Specialization</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cybersecurity & Networks">Cybersecurity & Networks</option>
                    <option value="Digital Arts & Animation">Digital Arts & Animation</option>
                    <option value="Leadership & Competitions">Leadership & Competitions</option>
                    <option value="Game Development & AI">Game Development & AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Card Icon Theme</label>
                  <select
                    value={iconType}
                    onChange={(e) => setIconType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="code">Terminal / Code (&lt;//&gt;)</option>
                    <option value="shield">Padlock / Shield (CSIA)</option>
                    <option value="media">Film Reel / Camera (MAFIA)</option>
                    <option value="loop">Circular Arrows (LOOP)</option>
                    <option value="custom">Sparkles / General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Booth Location</label>
                  <input
                    type="text"
                    placeholder="e.g. SJH 2nd Floor Lobby"
                    value={boothLocation}
                    onChange={(e) => setBoothLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Member Count</label>
                  <input
                    type="number"
                    min="1"
                    value={memberCount}
                    onChange={(e) => setMemberCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Motto / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Where Creativity Meets Computation"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Description (Shown on Card) *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Description of the organization's mission, activities, and workshops..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2A1107] hover:bg-[#3D180A] text-stone-300 font-tech font-bold text-xs uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingOrg ? 'Save Changes' : 'Create Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
