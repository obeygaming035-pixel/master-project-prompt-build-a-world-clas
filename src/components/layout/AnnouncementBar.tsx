import React from 'react';
import { BRAND } from '../../config/brand';

export const AnnouncementBar: React.FC = () => {
  if (!BRAND.announcement.enabled) return null;

  return (
    <div className="w-full bg-forest-deep text-ivory/90 border-b border-gold-antique/20 py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-ivory/80 font-medium">
          {BRAND.announcement.text}
        </p>
      </div>
    </div>
  );
};
