import React, { useState } from 'react';
import { useInquiryStore } from '../store/useInquiryStore';

const InquiryForm: React.FC = () => {
  const { formData, setFormData, addInquiry } = useInquiryStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear validation errors as the user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate input fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.match(/^\d{10}$/)) newErrors.contactNumber = 'Invalid contact number (10 digits)';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format';
    if (formData.amount && Number(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than zero';
    if (formData.amountPaid && Number(formData.amountPaid) < 0) newErrors.amountPaid = 'Amount Paid cannot be negative';
    if (formData.balanceDue && Number(formData.balanceDue) < 0) newErrors.balanceDue = 'Balance Due cannot be negative';
    if (!formData.tenure) newErrors.tenure = 'Please select a tenure';

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    addInquiry();
    
    // Clear form data after successful submission
    setFormData({
      name: '',
      address:'',
      joiningDate: '',
      expiryDate: '',
      tenure: '',
      amount: '',
      amountPaid: 0,
      balanceDue: '',
      height: '',
      weight: '',
      contactNumber: '',
      email: '',
      reference: '',
    });

    alert('Inquiry Submitted Successfully!');
  };

  return (
    <div className="w-4/5 bg-white p-6 rounded-md shadow-md ml-4">
      <h2 className="text-lg font-semibold text-white bg-green-600 p-2 rounded-md">Create New Inquiry</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.keys(formData).map((key) => (
          key === 'tenure' ? (
            <label key={key} className="block capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
              <select
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select Tenure</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
              {errors[key] && <p className="text-red-600 text-sm">{errors[key]}</p>}
            </label>
          ) : (
            <label key={key} className="block capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
              <input
                type={
                  key === 'dateOfBirth' || key.includes('Date') 
                    ? 'date' 
                    : key.includes('amount') || key.includes('balance') 
                    ? 'number' 
                    : 'text'
                }
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                className="border p-2 rounded-md w-full"
              />
              {errors[key] && <p className="text-red-600 text-sm">{errors[key]}</p>}
            </label>
          )
        ))}
      </div>
      <button onClick={handleSubmit} className="cursor-pointer mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
        Submit Inquiry
      </button>
    </div>
  );
};

export default InquiryForm;
