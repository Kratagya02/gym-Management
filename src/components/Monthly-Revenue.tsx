import React from 'react';
import { useInquiryStore } from '../store/useInquiryStore';

const MonthlyRevenue: React.FC = () => {
  const { inquiries } = useInquiryStore();
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  const currentYear = new Date().getFullYear(); // Get current year

  // Filter inquiries whose joining date falls within the current month
  const monthlyRevenueMembers = inquiries.filter((inquiry) => {
    if (!inquiry.joiningDate || !inquiry.amountPaid) return false;
    
    const joiningDate = new Date(inquiry.joiningDate);
    return (
      joiningDate.getMonth() + 1 === currentMonth &&
      joiningDate.getFullYear() === currentYear
    );
  });

  // Calculate total revenue
  const totalRevenue = monthlyRevenueMembers.reduce((sum, member) => sum + (member.amountPaid || 0), 0);

  return (
    <div className="w-4/5 bg-white p-6 rounded-md shadow-md ml-4">
      <h2 className="text-lg font-semibold text-white bg-blue-600 p-2 rounded-md">Monthly Revenue</h2>
      
      {monthlyRevenueMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No revenue generated this month.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Joining Date</th>
                <th className="border border-gray-300 px-4 py-2">Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenueMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{member.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{member.joiningDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">₹{member.amountPaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-right font-semibold text-lg mt-4">
        Total Revenue: <span className="text-green-600">₹{totalRevenue}</span>
      </div>
    </div>
  );
};

export default MonthlyRevenue;
