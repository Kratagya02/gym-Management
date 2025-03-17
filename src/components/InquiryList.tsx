import React from "react";
import { useInquiryStore } from "../store/useInquiryStore";
import * as XLSX from "xlsx";

interface InquiryListProps {
  setActiveTab: (tab: "form" | "list" | "expiring" | "edit") => void;
}

const InquiryList: React.FC<InquiryListProps> = ({ setActiveTab }) => {
  const { inquiries, setSelectedInquiry, removeInquiry, importInquiry } = useInquiryStore();

  const handleDelete = (contactNumber: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this inquiry?");
    if (confirmDelete) {
      removeInquiry(contactNumber);
      alert("Inquiry deleted successfully!");
    }
  };

  const exportToExcel = () => {
    if (inquiries.length === 0) {
      alert("No inquiries available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(inquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    XLSX.writeFile(workbook, "Inquiries.xlsx");
  };

  const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet);
      
      if (Array.isArray(importedData)) {
        importedData.forEach((inquiry: any) => importInquiry({
          name: inquiry.name || "", 
          contactNumber: inquiry.contactNumber || "", 
          joiningDate: inquiry.joiningDate || "", 
          expiryDate: inquiry.expiryDate || ""
        }));
        alert("Inquiries imported successfully!");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white bg-green-600 p-2 rounded-md">
          Inquiries
        </h2>
        <div className="flex space-x-2">
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={importFromExcel} 
            className="cursor-pointer bg-gray-300 text-black px-4 py-2 rounded-md"
          />
          <button 
            onClick={exportToExcel} 
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Export to Excel
          </button>
        </div>
      </div>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact Number</th>
            <th className="border p-2">Joining Date</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{inquiry.name}</td>
              <td className="border p-2">
                <a
                  href={`https://web.whatsapp.com/send?phone=${inquiry.contactNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {inquiry.contactNumber}
                </a>
              </td>
              <td className="border p-2">{inquiry.joiningDate}</td>
              <td className="border p-2">{inquiry.expiryDate}</td>
              <td className="border p-2 flex flex-row justify-between">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    setActiveTab("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleDelete(inquiry.contactNumber)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryList;
