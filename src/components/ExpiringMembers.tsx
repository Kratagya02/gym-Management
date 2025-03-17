import React from "react";
import { useInquiryStore } from "../store/useInquiryStore";

const ExpiringMembers: React.FC = () => {
  const { inquiries } = useInquiryStore();
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  const currentYear = new Date().getFullYear(); // Get current year

  // Filter inquiries whose expiry date falls within the current month
  console.log(inquiries);
  const expiringMembers = inquiries?.filter((inquiry) => {
    if (!inquiry.expiryDate) return false;

    const expiryDate = new Date(inquiry.expiryDate);
    return (
      expiryDate.getMonth() + 1 === currentMonth &&
      expiryDate.getFullYear() === currentYear
    );
  });

  return (
    <div className="w-4/5 bg-white p-6 rounded-md shadow-md ml-4">
      <h2 className="text-lg font-semibold text-white bg-red-600 p-2 rounded-md">
        Expiring This Month
      </h2>

      {expiringMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No members expiring this month.
        </p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Expiry Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Contact Number
                </th>
              </tr>
            </thead>
            <tbody>
              {expiringMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {member.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {member.expiryDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      href={`https://web.whatsapp.com/send?phone=${
                        member.contactNumber
                      }&text=${encodeURIComponent(
                        `YUVI FITNESS GYM\n\nYour Gym Membership is About to Expire\n\nDear ${member.name},\n\nWe hope you've enjoyed your time at YUVI FITNESS. We wanted to remind you that your current membership will be expiring on ${member.expiryDate}.\n\nTo continue enjoying all the benefits of our gym, we encourage you to renew your membership before the expiration date.\n\nIf you have any questions or need assistance with the renewal process, feel free to contact us at 8966968087 for more information.\n\nThank you for being a valued member of YUVI FITNESS, and we look forward to continuing to support your fitness journey!\n\nBest regards,\nYUVRAJ NAROLIYA\nGYM OWNER\nYUVI FITNESS GYM\n8966968087`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {member.contactNumber}
                    </a>
                  </td>
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
