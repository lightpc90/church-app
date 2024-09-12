import Header from '@/components/UILayouts/Header'
import React from 'react'
import AccountLayout from '@/components/UILayouts/AccountLayout'
import { AccountData } from '@/components/data/Data'

const Page = () => {
  return (
    <div>
      <Header title="" imageUrl="" />
      {/* tithe and offering */}
      <div>
        {AccountData.titheAndOffering.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo="" />
        ))}
      </div>
      {/* welfare */}
      <div>
        {AccountData.welfare.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo="" />
        ))}
      </div>
      {/* Building account */}
      <div>
        {AccountData.building.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo="" />
        ))}
      </div>
      {/* Mission account */}
      <div>
        {AccountData.mission.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo="" />
        ))}
      </div>
      {/* Youth account */}
      <div>
        {AccountData.youth.map((account, i) => (
          <AccountLayout key={i} account={account} bankLogo="" />
        ))}
      </div>
    </div>
  );
}

export default Page