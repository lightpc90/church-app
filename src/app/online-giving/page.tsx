import Header from '@/components/UILayouts/Header'
import React from 'react'
import AccountLayout from '@/components/UILayouts/AccountLayout'
import { AccountData } from '@/components/data/Data'
import givingImage from "../../../public/headers/offering.png"
import bankLogo from "../../../public/headers/zenith-logo.jpg"

const Page = () => {
  return (
    <div className="bg-[#D9D9D9] flex flex-col w-full gap-5">
      <Header title="Online Giving" imageUrl={givingImage.src} />
      {/* tithe and offering */}
      <div className="flex flex-col items-center">
        <h3>Tithe and Offering</h3>
        {AccountData.titheAndOffering.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo={bankLogo.src} />
        ))}
      </div>
      {/* welfare */}
      <div>
        {AccountData.welfare.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo={bankLogo.src} />
        ))}
      </div>
      {/* Building account */}
      <div>
        {AccountData.building.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo={bankLogo.src} />
        ))}
      </div>
      {/* Mission account */}
      <div>
        {AccountData.mission.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo={bankLogo.src} />
        ))}
      </div>
      {/* Youth account */}
      <div>
        {AccountData.youth.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo={bankLogo.src} />
        ))}
      </div>
    </div>
  );
}

export default Page