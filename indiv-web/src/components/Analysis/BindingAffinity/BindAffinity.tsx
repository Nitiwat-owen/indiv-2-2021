import React from "react";
import { useState } from "react";
import Table from "../../Table/Table";
import {
  Box,
  Grid,
  Alert,
  Stack,
  Button,
  Divider,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import BindingInput from "./Input";
// import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SubmitnResetButton from "./SubmitandResetButtons";
import sortMock from "../../Table/sortMock.json";
import { UpdateTableParams } from "../../../types/binding-affinity";
import { bindingAffinityActions } from "../../../actions";
import { filterBody } from "../../../types/binding-affinity";

const mockData = [
  {
    ID: 1,
    compoundID: "CHEMBL1087421",
    SMILES: "COC1=C(C=C2C(=C1)CCN=C2C3=CC(=C(C=C3)Cl)Cl)Cl",
    proteinID: "O00141",
    bindingAffinity: 4.5,
  },
  {
    ID: 2,
    compoundID: "CHEMBL1088633",
    SMILES:
      "C(C)(C)C1=CC(=C(S1)NC(=O)NC2=C(C(=CC=C2)Cl)Cl)C(=O)N3CCC(=O)N(CC3)CCN(C)C",
    proteinID: "O00141",
    bindingAffinity: 1000,
  },
  {
    ID: 3,
    compoundID: "CHEMBL1090360",
    SMILES:
      "C1COCCN1C2=CC(=CC=C2)NC3=NC=CC(=N3)C4=C(N=C5N4C=CS5)C6=CC(=CC=C6)NC(=O)CC7=CC=CC=C7",
    proteinID: "O00141",
    bindingAffinity: 2,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#d6638e",
    },
    secondary: {
      main: "#CCCCCC!important",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontWeight: "bold",
          color: "#FFFFFF!important",
        },
      },
    },
  },
});

const createFormate = (
  page: number,
  limit: number,
  sortField: string,
  sortOrder: string,
  filterField: string,
  operation: string,
  value: string
) => {
  let filter: filterBody[] =
    filterField == ""
      ? []
      : [
          {
            fieldName: filterField,
            condition: operation,
            fieldValue: value,
          },
        ];
  return { page, limit, sortField, sortOrder, filter };
};

const BindAffinity = () => {
  const [smilesInput, setSmilesInput] = useState("");
  const [uniprotInput, setUniprotInput] = useState("");
  const [submit, setSubmit] = useState(false);
  const [expand, setExpand] = useState(true);
  const [smilesFile, setSmilesFile] = useState<File>();
  const [uniprotFile, setUniprotFile] = useState<File>();

  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  const HandleUpdateTable = (details: UpdateTableParams) => {
    // setData(sortMock);
    bindingAffinityActions.updateTable(details).then((resp) => {
      if (resp.message == "success") {
        setCount(resp.data.totalRecord);
        setData(resp.data.results);
        console.log("newData", resp.data.results);
      }
    });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // const smiles = smilesInput.split('\n');
    // const ligands : any = [];
    // for (let i = 0; i < smiles.length; i++) {
    // 	const sm = smiles[i].split('\t');
    // 	ligands.push(sm);
    // }
    // const uniprot = uniprotInput.split('>');
    // const proteins : any = [];
    // for (let i = 1; i < uniprot.length; i++) {
    // 	const pt = uniprot[i].split('\n');
    // 	proteins.push(pt);
    // }
    // console.log(ligands);
    // console.log(proteins);

    const inputs = new FormData();
    inputs.append("smilesText", smilesInput);
    inputs.append("smilesFile", smilesFile);
    inputs.append("uniprotText", uniprotInput);
    inputs.append("uniprotFile", uniprotFile);
    inputs.append("isSmilesFile", smilesInput == "" ? "true" : "false");
    inputs.append("isUniprotFile", uniprotInput == "" ? "true" : "false");
    try {
      const res = await bindingAffinityActions.postInput(inputs);
      setSubmit(true);
      setExpand(false);
      HandleUpdateTable(createFormate(0, 5, "", "", "", "", ""));
      return { status: 200, message: "successfully" };
    } catch (error: any) {
      console.log(error);
      return { status: 400, message: "inputs error" };
    }
  };

  const uniprot = uniprotInput.split(">");
  const proteins: any = [];
  for (let i = 1; i < uniprot.length; i++) {
    const pt = uniprot[i].split("\n");
    proteins.push(pt);
  }

  const handleSmilesChange = (newSmiles: string) => {
    setSmilesInput(newSmiles);
  };

  const handleUniprotChange = (newUniprot: string) => {
    setUniprotInput(newUniprot);
  };
  const handleReset = () => {
    setSmilesInput("");
    setUniprotInput("");
    setSmilesFile(undefined);
    setUniprotFile(undefined);
  };

  const handleExpand = (event: any) => {
    event.preventDefault();
    if (submit) setExpand(!expand);
  };

  const UploadSmilesHandler = (newFile: File) => {
    setSmilesFile(newFile);
  };

  const UploadUniprotHandler = (newFile: File) => {
    setUniprotFile(newFile);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 5 }} className="form-data">
        <Stack spacing={5}>
          <Accordion
            expanded={expand}
            sx={{ background: "#faebf2" }}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={submit ? <ExpandMoreIcon /> : null}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              onClick={handleExpand}
            >
              <Typography variant="h3">
                Drug Bindding Affinity Prediction
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={5}>
                <Alert severity="info">
                  You can learn more about of drugs data at "Library" menu
                </Alert>
                <Box>
                  <Stack spacing={5} sx={{ width: "75%" }}>
                    <BindingInput
                      title="SMILES"
                      inputText={smilesInput}
                      inputFile={smilesFile}
                      handleInputText={handleSmilesChange}
                      handleInputFile={UploadSmilesHandler}
                      splitword="\n"
                      limit={100}
                    />
                    <BindingInput
                      title="UNIProt Protein ID"
                      inputText={uniprotInput}
                      inputFile={uniprotFile}
                      handleInputText={handleUniprotChange}
                      handleInputFile={UploadUniprotHandler}
                      splitword=">"
                      limit={11}
                    />
                  </Stack>
                  <Divider
                    sx={{
                      "&::before, &::after": {
                        borderColor: "secondary.light",
                      },
                      marginTop: "30px",
                    }}
                  />
                  <SubmitnResetButton
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                  />
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Box
            sx={{
              display: !submit ? "none" : null,
              marginTop: "10px!important",
              paddingLeft: "15px!important",
              paddingRight: "15px!important",
            }}
          >
            <Table
              data={data}
              HandleUpdateTable={HandleUpdateTable}
              count={count}
            />
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default BindAffinity;
