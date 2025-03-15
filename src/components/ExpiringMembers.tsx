import React from 'react';
import { useInquiryStore } from '../store/useInquiryStore';

const ExpiringMembers: React.FC = () => {
  const { inquiries } = useInquiryStore();
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  const currentYear = new Date().getFullYear(); // Get current year

  // Filter inquiries whose expiry date falls within the current month
  const expiringMembers = inquiries.filter((inquiry) => {
    if (!inquiry.expiryDate) return false;
    
    const expiryDate = new Date(inquiry.expiryDate);
    return expiryDate.getMonth() + 1 === currentMonth && expiryDate.getFullYear() === currentYear;
  });

  return (
    <div className="w-4/5 bg-white p-6 rounded-md shadow-md ml-4">
      <h2 className="text-lg font-semibold text-white bg-red-600 p-2 rounded-md">Expiring This Month</h2>

      {expiringMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No members expiring this month.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {expiringMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{member.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{member.expiryDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{member.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpiringMembers;
