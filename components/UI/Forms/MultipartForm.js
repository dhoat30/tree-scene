"use client";

import React, { useState, useEffect } from "react";
import Input from './InputFields/Input'
import { multipartFormData } from "@/utils/multipartFormData";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from "@emotion/styled";
import axios from "axios";
import Alert from '@mui/material/Alert';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { usePathname } from 'next/navigation';
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";

export default function MultipartForm({ className, formName = "Get a Free Quote" }) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstname: '',   // Default empty string to make it controlled
        email: '',
        phone: '',
        propertyType: '', 
        howManyTrees: '',
        service: [],
        address: '', 

        treeHeight: '',
        workBeginIn: '',
      
    });
    const [errors, setErrors] = useState({});

    const [formErrors, setFormErrors] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)
    const [mapsLoaded, setMapsLoaded] = useState(false);

    const pathName = usePathname()


    // theme 
    const theme = useTheme();
console.log(formData)
    const handleNext = () => {

        // validate field on next click 
        const currentField = multipartFormData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };
    const handleSelectAddress = (selectedAddress) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            address: selectedAddress,
        }));
        if (errors.address) {
            setErrors({ ...errors, address: false });
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

  const handleChange = (id, value, isSelectMultiple) => {
        let newValue = value.target ? value.target.value : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: newValue,
        }));

        // Reset errors on change
        // if (errors[id]) {
        //     setErrors({ ...errors, [id]: false });
        // }
    };
    // // handle input change 
    // const handleInputChange = (event, id) => {
    //     const newFormData = { ...formData, [id]: event.target.value };
    //     setFormData(newFormData);
    // };

    // Initialize Google Maps script
    const handleLoad = () => {
        setMapsLoaded(true);
    };
    // submit handler 
    const submitHandler = (e) => {

        // validate field on next click 
        const currentField = multipartFormData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
        }

        const dataPayload = {
            email: formData.email,
            formName: formName,
            message: `First Name: ${formData.firstname} \n Email: ${formData.email} \n Phone: ${formData.phone} \n What kind of property needs tree services?: ${formData['propertyType']} \n How many trees or shrubs need attention?: ${formData['howManyTrees']} \n Services Required?: ${formData['service'].join(", ") }  \n How tall are the trees or shrubs?: ${formData['treeHeight']} \n When do you want the work to begin?: ${formData['workBeginIn']} \n Address: ${formData['address']} `,
            portalID: "46904146",
            hubspotFormID: "ae634c78-c492-4836-ae1d-01bcc392fe57",
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                }, 
                {
                    name: "phone",
                    value: formData.phone
                },
                {
                    name: "address",
                    value: formData['address']
                },
                {
                    name: "property_type",
                    value: formData['propertyType']
                },
                {
                    name: "services_required",
                    value: formData['service'].join(", ") 
                },
                {
                    name: "number_of_trees_shrubs",
                    value: formData['howManyTrees']
                },
                {
                    name: "tree_height",
                    value: formData['treeHeight']
                },
                {
                    name: "urgency",
                    value: formData['workBeginIn']
                },
              


            ]
        }

        setIsLoading(true)

     
        // hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                console.log(response)
                if (response[1].status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    setError(false)
                    router.push('/form-submitted/thank-you')
                }
                else {
                    console.log(response)
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(true)

                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(true)

            });
    }
    const currentField = multipartFormData[activeStep];
    let dollarUSLocale = Intl.NumberFormat('en-US')
    let inputField
    if(multipartFormData[activeStep].id === 'address') {
        inputField = (
            <React.Fragment key={multipartFormData[activeStep].id}> 
                {!mapsLoaded && <GoogleMapsLoader onLoad={handleLoad} key="google-maps-loader" />}
                {mapsLoaded && (
                    <GoogleAutocomplete
                        className="mt-16"
                    label={multipartFormData[activeStep].label}
                        value={formData.address}
                        onChange={(value) => handleChange(multipartFormData[activeStep].id, value, false)}
                        onSelect={handleSelectAddress}
                        required={multipartFormData[activeStep].required}
                        autoComplete={multipartFormData[activeStep].autoComplete}
                        error={formErrors[currentField.id]}
                        helperText={multipartFormData[activeStep].errorMessage ? 'Please enter a valid address' : ''}
                    />
                )}
            </React.Fragment>
        );
    } 
    else{ 
        inputField=  <Input
        lightTheme={true}
        label={multipartFormData[activeStep].label}
        type={multipartFormData[activeStep].type}
        value={formData[currentField.id] || ''}
        onChange={multipartFormData[activeStep].type === 'chip' ?
            (newValue) => handleChange(multipartFormData[activeStep].id, newValue, multipartFormData[activeStep].multiple) :
            (e) => handleChange(multipartFormData[activeStep].id, e, multipartFormData[activeStep].multiple)}
        onBlur={multipartFormData[activeStep].onBlur}
        required={multipartFormData[activeStep].required}
        autoComplete={multipartFormData[activeStep].autoComplete}
        isInvalid={formErrors[currentField.id]}
        errorMessage={multipartFormData[activeStep].errorMessage}
        options={multipartFormData[activeStep].options}
    />
    }
    return (
        <>
            <ContainerStyled variant="div" className={`${className}`} maxWidth="xl">
            {/* <div className="overlay" onClick={()=> setShowPopUpForm(false)}></div> */}
            <div className="wrapper">
                <CloseOutlinedIcon className="close-icon" fontSize="medium" onClick={()=> setShowPopUpForm(false)}/> 
                <MobileStepper
                    className="mobile-stepper"
                    variant="progress"
                    steps={multipartFormData.length}
                    position="static"
                    activeStep={activeStep}
                />

                <React.Fragment>
                    <div className="input-wrapper p-6">
                       {inputField}

                        <Box className="button-wrapper mt-16" sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="primary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                startIcon={<KeyboardArrowLeft />}
                                size="medium"
                            >
                                Back
                            </Button>
                            {activeStep === multipartFormData.length - 1 ?
                                <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess}>Submit</LoadingBtn>
                                :
                                <Button onClick={handleNext} color="primary" variant="contained"
                                    endIcon={<KeyboardArrowRight />}
                                    size="medium"
                                >
                                    
                                    Next
                                </Button>
                            }
                        </Box>
                        {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                    </div>
                </React.Fragment>

            </div>

        </ContainerStyled>

            </>
       
    )
}

const ContainerStyled = styled(Container)`
padding: 24px 0; 

.wrapper{ 
max-width: 500px; 
width: 100%;
background-color: var(--light-surface-container-lowest);
margin: 0 auto; 
border-radius: 12px;
overflow: hidden;
@media (max-width: 500px) {
    width: calc(100% - 24px);
}

}
.close-icon{ 
    position: absolute;
    right: 8px; 
    top: 12px; 
    color: var(--light-outline); 
    &:hover{ 
        cursor: pointer;
    }
}
.mobile-stepper{ 
    background: none; 
    padding:0;
    margin: 0 auto;
  
    .MuiLinearProgress-root{ 
        width:100%;
        height: 8px; 
        background: var(--light-inverse-primary); 
    }
}
.button-wrapper{ 
    display: flex;  
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    gap: 8px; 
}
svg.Mui-active{ 
    color: #F9F871; 
}
svg.Mui-completed{ 
    color: #F9F871; 
}
svg.Mui-active{ 
 text{ 
    fill: black; 
 }
   
}
@media(max-width: 500px){ 
    .stepper-wrapper{ 
    display: none ;
}
}

.input-wrapper{ 
        padding: 16px 24px 24px 24px; 
    background: var(--light--surface-container);
border-radius: 12px; 
    @media(max-width: 600px){ 
        padding: 16px 8px 24px 8px; 

    }
    .Mui-error{ 
        font-size: 1rem;
    }
}
.quote-wrapper{ 
    background: var(--light--surface-container);
    border-radius: 12px; 
    max-width: 500px; 
    margin: 40px auto 0 auto;   
  
    .quote{ 
        max-width: 300px;
        margin: 16px auto; 
        padding: 16px 0; 
        border: dashed 2px var(--light-primary, #f9f871);
    }
}
`

