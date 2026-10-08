import React, { useState } from 'react';
import { GalleryPhoto } from '../../types';
import { Plus, Trash2, Edit2, Image as ImageIcon, Sparkles, X } from 'lucide-react';

interface GalleryTabProps {
  galleryPhotos: GalleryPhoto[];
  onAddPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  onDeletePhoto: (id: number) => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({
  galleryPhotos,
  onAddPhoto,
  onDeletePhoto
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('Demonstrations');
  const [rotationDeg, setRotationDeg] = useState(-2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || !imageUrl) return;

    onAddPhoto({
      title: title || 'ADF2027 Event Photo',
      caption,
      imageUrl,
      tag,
      rotationDeg: Number(rotationDeg)
    });

    setTitle('');
    setCaption('');
    setImageUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C]">
        <div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            Polaroid Gallery ({galleryPhotos.length})
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            Photos displayed on the public event details section with retro masking tape effects.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Polaroid Photo</span>
        </button>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-[#1C0E07] rounded-2xl border border-[#481E0C] p-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-black mb-3 border border-[#3E1A0C]">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-amber-300 font-mono text-[10px] border border-white/10">
                  {photo.tag}
                </span>
              </div>

              <h4 className="font-tech font-bold text-white text-sm uppercase mb-1">
                {photo.title}
              </h4>
              <p className="font-mono text-xs text-stone-300 italic mb-4">
                "{photo.caption}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#311306] flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">Tilt: {photo.rotationDeg}°</span>
              <button
                onClick={() => {
                  if (confirm('Delete this polaroid photo?')) {
                    onDeletePhoto(photo.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white transition-colors cursor-pointer"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#1C0E07] text-white rounded-3xl border-3 border-[#E65A15] p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-tech text-xl font-black text-white uppercase mb-4">
              Add Polaroid Photo
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-amber-200 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Student Organization Fair"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-1">Polaroid Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fox mascot and student leaders welcoming everyone!"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Category Tag</label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="Demonstrations">Demonstrations</option>
                    <option value="Plenary">Plenary</option>
                    <option value="Parade">Parade</option>
                    <option value="Booths">Booths</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">Tilt Angle</label>
                  <select
                    value={rotationDeg}
                    onChange={(e) => setRotationDeg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
                  >
                    <option value="-3">-3° (Left tilt)</option>
                    <option value="-1">-1° (Slight left)</option>
                    <option value="0">0° (Straight)</option>
                    <option value="1">1° (Slight right)</option>
                    <option value="3">3° (Right tilt)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2A1107] hover:bg-[#3D180A] text-stone-300 font-tech font-bold text-xs uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
