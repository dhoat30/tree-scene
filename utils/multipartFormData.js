

export const multipartFormData = [
 
    {
        id: 'propertyType',
        label: 'What kind of property needs tree services?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'Residential Property', label: 'Residential Property' },
            { value: 'Commercial Property', label: 'Commercial Property' },
            { value: 'Public Garden/Yard', label: 'Public Garden/Yard' },
            
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Please select at least one property type'
    },
    {
        id: 'howManyTrees',
        label: 'How many trees or shrubs need attention?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: 'Just 1', label: 'Just 1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4 or more', label: '4 or more' },
        ],
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length >= 1;
            }
            return false;
        },
        errorMessage: 'Please select at least one option'
    },
    {
        id: 'service',
        label: 'Service required',
        type: 'chip', // or 'radio' for single selection
        multiple: true,
        priceType: "fixed",
        options: [], // Will be populated dynamically
        required: false, 
        options: [
            { value: "Tree Removal", label: "Tree Removal - Starting from $299", price: 0 },
            { value: "Tree Pruning", label: "Tree Pruning - Starting from $299", price: 0 },
            { value: "Hedge Trimming", label: "Hedge Trimming - Starting from $149", price: 0 },
            { value: "Land Clearing", label: "Land Clearing - Starting from $499", price: 0 },
            { value: "Storm-Damaged and Emergency Tree Work", label: "Storm-Damaged and Emergency Tree Work", price: 0 },
            { value: "Chipping and Wood Splitting Services", label: "Chipping and Wood Splitting Services", price: 0 },
        ], 
    },
    {
        id: 'treeHeight',
        label: 'How tall are the trees or shrubs?',
        type: 'radio', // or 'radio' for single selection
        options: [
            { value: "Small (under 6ft/2m) ", label: "Small (under 6ft/2m) " },
            { value: "Medium (6ft - 26ft / 2m-4m)", label: "Medium (6ft - 26ft / 2m-8m)" },
            { value: "Large (more than 26ft / 8m)", label: "Large (more than 13ft / 8m)" },
            { value: "I require stump removal ", label: "I require stump removal " },
            { value: "Something else", label: "Something else" },
        ],
        // validation: value => {
        //     if (typeof value === 'string') {
        //         return value.trim().length > 1;
        //     }
        //     return false;
        // },
        // errorMessage: 'Please select at least one'
    },
 
    {
        id: 'workBeginIn',
        label: 'When do you want the work to begin?',
        type: 'radio',
        rquired: false, // or 'radio' for single selection
        options: [
            { value: "As soon as possible", label: "As soon as possible" },
            { value: "I’m flexible", label: "I’m flexible" },
            { value: "In the next few days", label: "In the next few days" },
            { value: "In the next week", label: "In the next week" },
            { value: 'other', label: 'Other' },

        ],
        // validation: value => {
        //     if (typeof value === 'string') {
        //         return value.trim().length > 2;
        //     }
        //     return false;
        // },
        errorMessage: 'Please select at least one industry'
    },

    {
        id: 'firstname', label: 'First name', type: 'text', required: false, autoComplete: "given-name",
        errorMessage: 'First name should be at least 3 characters long'
    },
    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },
    {
        id: 'phone',
        label: 'Phone number',
        type: 'tel',
        required: false,
        autoComplete: "tel",
        // validation: value => {
        //     const cleanPhone = (value || '').replace(/[^0-9]/g, '');
        //     return cleanPhone.length > 6; // Matches numbers having more than 6 characters
        // },
        errorMessage: 'Please enter a valid New Zealand phone number'
    },
    {
        id: 'address',
        label: 'Property Address',
        type: 'text',
        required: true,
        validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 5;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    }
]