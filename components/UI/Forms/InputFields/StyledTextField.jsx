"use client";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

// Shared typography for regular fields and Google address autocomplete.
const StyledTextField = styled(TextField)`
  label,
  input {
    font-weight: 350;
  }
`;

export default StyledTextField;
