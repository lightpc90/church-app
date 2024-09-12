import {FC} from 'react'
import Image from 'next/image'

type AccountLayoutPropsType = {
  bankLogo: string;
  account: {type: string; bank: string; accountNumber: number; accountName: string}
}

const AccountLayout: FC<AccountLayoutPropsType> = ({bankLogo, account}) => {
  return (
    <div className="w-full p-3 flex gap-3">
      <Image src={bankLogo} alt="" />
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{account.type}</h3>
        <h3 className="text-xl font-bold text-rose-800">{account.bank}</h3>
        <h3 className="text-2xl font-bold">{account.accountNumber}</h3>
        <h3 className="text-lg font-bold">{account.accountName}</h3>
      </div>
    </div>
  );
}

export default AccountLayout