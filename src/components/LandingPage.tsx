import React, { useState } from 'react';
import InquiryForm from './InquiryForm';
import InquiryList from './InquiryList';
import ExpiringMembers from './ExpiringMembers';
import { useInquiryStore } from '../store/useInquiryStore';
import EditInquiry from './EditInquiry';
import MonthlyRevenue from './Monthly-Revenue';

const LandingPage: React.FC = () => {
  const { selectedInquiry } = useInquiryStore();
  const [activeTab, setActiveTab] = useState<'form' | 'list' | 'expiring' | 'edit' | 'monthly-revenue'>('form');

  return (
    <div className="bg-blue-100 min-h-screen p-4">
      {/* Navbar */}
      <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Welcome, Admin</h1>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md">Yuvi GYM Management</button>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex mt-4">
        <div className="w-1/5 flex flex-col space-y-2">
          <button onClick={() => setActiveTab('form')} className={`p-3 rounded-md shadow-md cursor-pointer ${activeTab === 'form' ? 'bg-pink-500 text-white' : 'bg-white'}`}>
            Add New Member
          </button>
          <button onClick={() => setActiveTab('list')} className={`p-3 rounded-md shadow-md cursor-pointer ${activeTab === 'list' ? 'bg-pink-500 text-white' : 'bg-white'}`}>
            View Inquiries
          </button>
          <button onClick={() => setActiveTab('expiring')} className={`p-3 rounded-md shadow-md cursor-pointer ${activeTab === 'expiring' ? 'bg-red-500 text-white' : 'bg-white'}`}>
            View Expiring Members
          </button>
          <button onClick={() => setActiveTab('monthly-revenue')} className={`p-3 rounded-md shadow-md cursor-pointer ${activeTab === 'monthly-revenue' ? 'bg-red-500 text-white' : 'bg-white'}`}>
            View Monthly Revenue
          </button>
        </div>

        {/* Main Content Based on Selected Tab */}
        <div className="w-4/5 ml-4">
          {activeTab === 'form' && <InquiryForm />}
          {activeTab === 'list' && <InquiryList setActiveTab={setActiveTab} />}
          {activeTab === 'expiring' && <ExpiringMembers />}
          {activeTab === 'monthly-revenue' && <MonthlyRevenue />}
          {activeTab === 'edit' && selectedInquiry && <EditInquiry setActiveTab={setActiveTab} />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
