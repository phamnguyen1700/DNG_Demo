import React, { useState } from 'react'
import StudyHistory from './Tabs/studyHistory'
import PaymentHistory from './Tabs/paymentHistory'
import AttachedDocuments from './Tabs/documentStudent'
const TabData = () => {
    const [activeTab, setActiveTab] = useState('studyHistory');

  return (
    <div>
        <div className='flex borber-b mb-4'>
            <button
            className={`px-4 py-2 ${activeTab === 'studyHistory' ? 'border-b-2 border-violet-500 ' : ''}`}
            onClick={() => setActiveTab('studyHistory')}
            >
                Lịch sử học tập
            </button>
            <button
            className={`px-4 py-2 ${activeTab === 'paymentHistory' ? 'border-b-2 border-violet-500 ' : ''}`}
            onClick={() => setActiveTab('paymentHistory')}
            >
                Lịch sử đóng tiền
            </button>
            <button
            className={`px-4 py-2 ${activeTab === 'attachedDocuments' ? 'border-b-2 border-violet-500 ' : ''}`}
            onClick={() => setActiveTab('attachedDocuments')}
            >
                Hồ sơ đính kèm
            </button>
        </div>
        <div className='bg-white shadow-md rounded p-4'>
            {activeTab === 'studyHistory' && (
                <StudyHistory/>
            )}
            {activeTab === 'paymentHistory' && (
                <PaymentHistory/>
            )}
            {activeTab === 'attachedDocuments' && (
                <AttachedDocuments/>
            )}
        </div>
    </div>
  )
}

export default TabData