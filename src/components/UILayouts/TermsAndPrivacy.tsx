import React from 'react'
import Link from 'next/link';

const TermsAndPrivacy = () => {
  return (
    <div>
      By using <span className='text-[#EE7575]'>rccgbeautifulgatelakowe</span> website, you agree to the {' '}
      <Link href="/">Terms</Link> and <Link href={`/`}>Privacy Policy</Link>
    </div>
  );
}

export default TermsAndPrivacy