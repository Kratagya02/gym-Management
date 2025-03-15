import { create } from 'zustand';

// Inquiry Interface
export interface Inquiry {
  name: string;
  joiningDate: string;
  expiryDate: string;
  tenure: string;
  amount: string;
  amountPaid: number;
  balanceDue: string;
  height: string;
  weight: string;
  contactNumber: string;
  email: string;
  reference: string;
  address:string,
}

// Inquiry Store Interface
interface InquiryStore {
  inquiries: Inquiry[];
  selectedInquiry: Inquiry | null;
  formData: Inquiry;
  setFormData: (data: Partial<Inquiry>) => void; // ✅ Accepts Partial Inquiry
  setSelectedInquiry: (inquiry: Inquiry | null) => void;
  addInquiry: () => void;
  updateInquiry: () => void;
  removeInquiry: (contactNumber: string) => void;
  loadInquiries: () => void;
  importInquiry: (inquiry: Partial<Inquiry>) => void;
}

// Default form data
const defaultFormData: Inquiry = {
  name: '',
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
  address:''
};

// Load from Local Storage
const getStoredInquiries = (): Inquiry[] => {
  const storedData = localStorage.getItem('inquiries');
  return storedData ? JSON.parse(storedData) : [];
};

export const useInquiryStore = create<InquiryStore>((set) => ({
  inquiries: getStoredInquiries(),
  selectedInquiry: null,
  formData: { ...defaultFormData },

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }, // ✅ Correct Partial Update
    })),

  setSelectedInquiry: (inquiry) =>
    set(() => ({
      selectedInquiry: inquiry,
      formData: inquiry ? { ...inquiry } : { ...defaultFormData }, // ✅ Ensure No Mutations
    })),

  addInquiry: () =>
    set((state) => {
      const newInquiry = { ...state.formData };
      const updatedInquiries = [...state.inquiries, newInquiry];
      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
      return { inquiries: updatedInquiries, formData: { ...defaultFormData } };
    }),
    
    importInquiry: (inquiry: Partial<Inquiry>) =>
      set((state) => {
        const newInquiry: Inquiry = { ...defaultFormData, ...inquiry }; // ✅ Ensure all fields exist
        const updatedInquiries = [...state.inquiries, newInquiry];
        localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
        return { inquiries: updatedInquiries };
      }),
    
    
      updateInquiry: () =>
        set((state) => {
          const updatedInquiries = state.inquiries.map((inq) => ({
            ...inq,
            ...state.formData, // Overwrite all fields with form data
          }));
          console.log(updatedInquiries)
          localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));
      
          return {
            inquiries: updatedInquiries,
            selectedInquiry: null,
            formData: { ...defaultFormData },
          };
        }),
      
      

  removeInquiry: (contactNumber) =>
    set((state) => {
      const filteredInquiries = state.inquiries.filter((inq) => inq.contactNumber !== contactNumber);
      localStorage.setItem('inquiries', JSON.stringify(filteredInquiries));
      return { inquiries: filteredInquiries };
    }),

  loadInquiries: () => set(() => ({ inquiries: getStoredInquiries() })),
}));
