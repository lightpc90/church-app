import {FC} from 'react'
import Image from 'next/image'

type AccountLayoutPropsType = {
  bankLogo: string;
  account: {type: string; bank: string; accountNumber: number; accountName: string}
}

const AccountLayout: FC<AccountLayoutPropsType> = ({bankLogo, account}) => {
  return (
    <div className="w-full p-3 flex items-center gap-3 bg-blue-100">
      <Image src={bankLogo} width={500} height={500} alt="" className='w-[90px] h-[90px]' />
      <div className="">
        <h3 className="text-xl font-bold">{account.type}</h3>
        <h3 className="text-xl font-bold text-rose-800">{account.bank}</h3>
        <h3 className="text-2xl font-bold">{account.accountNumber}</h3>
        <h3 className="text-lg font-bold">{account.accountName}</h3>
      </div>
    </div>
  );
}

export default AccountLayout