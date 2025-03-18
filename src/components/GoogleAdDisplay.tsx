import React, { useEffect } from 'react';

export default function GoogleAdDisplay() {
  useEffect(() => {
    try {
      // @ts-ignore - AdSense inserts ads automatically
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-2186209581588169"
        data-ad-slot="8768173507"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
