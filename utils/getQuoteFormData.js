export const servicePropertyMap = {
    Residential: [
        { value: "Tree Removal", label: "Tree Removal", price: 0 },
        { value: "Tree Pruning", label: "Tree Pruning", price: 0 },
        { value: "Hedge Trimming", label: "Hedge Trimming", price: 0 },
        { value: "Land Clearing", label: "Land Clearing", price: 0 },
        { value: "Planting and Gardening Services", label: "Planting and Gardening Services", price: 0 },
        { value: "Storm-Damaged Trees and Emergency Tree Work", label: "Storm-Damaged Trees and Emergency Tree Work", price: 0 },
        { value: "Tree Health Monitoring and Assessments", label: "Tree Health Monitoring and Assessments", price: 0 },
        { value: "Chipping and Wood Splitting Services", label: "Chipping and Wood Splitting Services", price: 0 },
        { value: "Firewood and Mulch Tauranga", label: "Firewood and Mulch Tauranga", price: 0 },

    ],
    Commercial: [
        { value: "Tree Removal", label: "Tree Removal", price: 0 },
        { value: "Tree Pruning", label: "Tree Pruning", price: 0 },
        { value: "Hedge Trimming", label: "Hedge Trimming", price: 0 },
        { value: "Land Clearing", label: "Land Clearing", price: 0 },
        { value: "Planting and Gardening Services", label: "Planting and Gardening Services", price: 0 },
        { value: "Storm-Damaged Trees and Emergency Tree Work", label: "Storm-Damaged Trees and Emergency Tree Work", price: 0 },
        { value: "Tree Health Monitoring and Assessments", label: "Tree Health Monitoring and Assessments", price: 0 },
        { value: "Chipping and Wood Splitting Services", label: "Chipping and Wood Splitting Services", price: 0 },
        { value: "Firewood and Mulch Tauranga", label: "Firewood and Mulch Tauranga", price: 0 },

        // Add more commercial services as needed
    ],
 
};

// utils/getQuoteFormData.js

export const getQuoteFormData = [

    {
        id: 'firstname',
        label: 'First name',
        type: 'text',
        required: true,
        autoComplete: "given-name",
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
   
    {
        id: 'email',
        label: 'Email address',
        type: 'email',
        required: true,
        autoComplete: "email",
        validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },
    {
        id: 'phone',
        label: 'Phone number',
        type: 'tel',
        required: false,
        autoComplete: "tel",
        validation: value => {
            const cleanPhone = (value || '').replace(/[^0-9]/g, '');
            return cleanPhone.length > 6; // Matches numbers having more than 6 characters
        },
        errorMessage: 'Please enter a valid New Zealand phone number'
    },
    {
        id: 'address',
        label: 'Property Address',
        type: 'text',
        required: false,
     

    },
   
    {
        id: 'propertyType',
        label: 'Property type',
        type: 'select', // or 'radio' for single selection
        options: [
            { value: 'Residential', label: 'Residential' },
            { value: 'Commercial', label: 'Commercial' },
        ],
        required: false,
        multiple: false
    },
    {
        id: 'service',
        label: 'Service required',
        type: 'chip', // or 'radio' for single selection
        multiple: true,
        priceType: "fixed",
        options: [], // Will be populated dynamically
        required: false, // Make it required if necessary
    },
    {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        required: false,
    },
];
