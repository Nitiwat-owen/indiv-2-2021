import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { sizeHeight } from "@mui/system";

interface FilterBarProps {
  handleChangeFilter: (field: string, operator: string, value: string) => void;
}

const filterBar = ({ handleChangeFilter }: FilterBarProps) => {
  const [detail, setDetail] = useState({
    field: "",
    operator: "",
    value: "",
  });

  const handleReset = () => {
    setDetail({ field: "", operator: "", value: "" });
    handleChangeFilter("", "", "");
  };

  return (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
      <Box sx={{ ml: 1, mr: 1 }}>
        <Typography component="h5" variant="h1">
          Filter By
        </Typography>
      </Box>
      <Box sx={{ ml: 1, mr: 1 }}>
        <FormControl sx={{ minWidth: 120, ml: 1, mr: 1 }} size="small">
          <InputLabel id="filter-name-label">Name</InputLabel>
          <Select
            labelId="filter-name-label"
            id="filter-name"
            value={detail.field}
            label="Name"
            onChange={(e) => setDetail({ ...detail, field: e.target.value })}
          >
            <MenuItem value={"compoundID"}>compoundID</MenuItem>
            <MenuItem value={"proteinID"}>proteinID</MenuItem>
            <MenuItem value={"bindingAffinity"}>bindingAffinity</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ ml: 1, mr: 1 }}>
        <FormControl sx={{ minWidth: 120, ml: 1, mr: 1 }} size="small">
          <InputLabel id="operation-label">Operation</InputLabel>
          {detail.field === "bindingAffinity" ? (
            <Select
              labelId="operation-label"
              id="operation"
              value={detail.operator}
              label="Operation"
              onChange={(e) =>
                setDetail({ ...detail, operator: e.target.value })
              }
            >
              <MenuItem value={"<"}>&#60;</MenuItem>
              <MenuItem value={"<="}>&#60;=</MenuItem>
              <MenuItem value={"="}>=</MenuItem>
              <MenuItem value={">="}>&#62;=</MenuItem>
              <MenuItem value={">"}>&#62;</MenuItem>
            </Select>
          ) : (
            <Select
              labelId="operation-label"
              id="operation"
              value={detail.operator}
              label="Operation"
              onChange={(e) =>
                setDetail({ ...detail, operator: e.target.value })
              }
            >
              <MenuItem value={"="}> = </MenuItem>
            </Select>
          )}
        </FormControl>
      </Box>
      <Box sx={{ ml: 1, mr: 1 }}>
        <TextField
          id="standard-basic"
          label="Value"
          variant="standard"
          value={detail.value}
          onChange={(e) => setDetail({ ...detail, value: e.target.value })}
        />
      </Box>
      <Box sx={{ ml: 1, mr: 1 }}>
        <Button
          onClick={() =>
            handleChangeFilter(detail.field, detail.operator, detail.value)
          }
          variant="contained"
        >
          Search
        </Button>
      </Box>
      <Box sx={{ ml: 1, mr: 1 }}>
        <Button onClick={handleReset} variant="contained">
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default filterBar;
