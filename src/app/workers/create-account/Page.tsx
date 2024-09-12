import React from 'react'
import TermsAndPrivacy from '@/components/UILayouts/TermsAndPrivacy'

const Page = () => {
  return (
    <div className=''>
        {/* CTA */}
        <div>
            <div>
                <div></div>
                <p>Create account</p>
            </div>
            <div>
                <h4>Glad to have you!</h4>
                <p>Let&apos;s work</p>
            </div>
            <button>Register with Gmail</button>
        </div>
        {/* terms and privacy footer */}
        <div>
            <TermsAndPrivacy/>
        </div>
    </div>
  )
}

export default Page