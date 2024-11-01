import React from 'react'
import { initHfcForm } from '@/components/UILayouts/HouseFellowshipForm';

type PropsType = {
    center: typeof initHfcForm
}

const HfcLayout: React.FC<PropsType> = ({center}) => {
  return (
    <div className="my-2">
      {/* center */}
      <h4 className="font-bold text-rose-800">{`${center.center} Center`}</h4>
      {/* host */}
      <div>
        <label className="font-bold">{`Host: `}</label>
        <label>{center.host}</label>||
        <label>{center.host_phone}</label>
      </div>
      {/* teacher */}
      <div>
        <label className="font-bold">{`Teacher: `}</label>
        <label>{center.teacher}</label>||
        <label>{center.teacher_phone}</label>
      </div>
    </div>
  );
}

export default HfcLayout