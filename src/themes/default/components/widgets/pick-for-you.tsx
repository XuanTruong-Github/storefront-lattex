'use client';
import upSellStore from '@/core/modules/upsell/store';
export default function PickForYou() {
  const [mobileSettings, desktopSettings] = upSellStore((state) => [
    state.pickForYou?.mobile,
    state.pickForYou?.desktop,
  ]);
  console.log('mobileSettings: ', mobileSettings);
  console.log('desktopSettings: ', desktopSettings);
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
