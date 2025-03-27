import React, { useState } from 'react';
import { useInquiryStore } from '../store/useInquiryStore';

interface EditInquiryProps {
  setActiveTab: (tab: 'form' | 'list' | 'expiring' | 'edit') => void;
}

const EditInquiry: React.FC<EditInquiryProps> = ({ setActiveTab }) => {
  const { selectedInquiry, updateInquiry } = useInquiryStore();
  const [formData, setFormData] = useState(selectedInquiry);
  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    updateInquiry(formData);
    alert('Inquiry Updated Successfully!');
    setActiveTab('list');
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-white bg-green-600 p-2 rounded-md">Edit Inquiry</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.keys(formData).map((key) => (
          <label key={key} className="block capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
            <input
              type={key.includes('Date') ? 'date' : key.includes('amount') || key.includes('balance') ? 'number' : 'text'}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
              className="border p-2 rounded-md w-full"
            />
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
    </div>
  );
};

export default EditInquiry;
