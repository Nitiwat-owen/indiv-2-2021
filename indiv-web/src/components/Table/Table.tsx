import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { pink } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import TableHead from "./TableHead";
import FilterBar from "./filterBar";
import { TableProps, filterBody } from "../../types/binding-affinity";

import { TableFooter, TablePagination } from "@mui/material";

import Mol2D from "./Mol2D";
require("jspdf-autotable");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: pink[300],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const columns = [
  { label: "ID", accessor: "infoId", sortable: true },
  { label: "compoundID", accessor: "compoundID", sortable: false },
  { label: "SMILES", accessor: "SMILES", sortable: false },
  { label: "proteinID", accessor: "proteinID", sortable: false },
  { label: "2D", accessor: "image", sortable: false },
  { label: "BindingAffinity", accessor: "bindingAffinity", sortable: true },
];

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

export default function CustomizedTables({
  data,
  HandleUpdateTable,
  count,
}: TableProps) {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState({
    field: "ID",
    order: "ASC",
  });

  const [filter, setFilter] = useState({
    field: "",
    operator: "",
    value: "",
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    HandleUpdateTable(
      createFormate(
        newPage,
        rowsPerPage,
        sort.field,
        sort.order,
        filter.field,
        filter.operator,
        filter.value
      )
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const limit = parseInt(event.target.value, 10);
    setRowsPerPage(limit);
    setPage(0);
    HandleUpdateTable(
      createFormate(
        0,
        limit,
        sort.field,
        sort.order,
        filter.field,
        filter.operator,
        filter.value
      )
    );
  };

  const handleChangeFilter = (
    field: string,
    operator: string,
    value: string
  ) => {
    setFilter({ field, operator, value });
    setPage(0);
    console.log("in");
    HandleUpdateTable(
      createFormate(
        0,
        rowsPerPage,
        sort.field,
        sort.order,
        field,
        operator,
        value
      )
    );
  };

  const handleSorting = (field: string, order: string) => {
    setSort({ field, order });
    setPage(0);
    HandleUpdateTable(
      createFormate(
        0,
        rowsPerPage,
        field,
        order,
        filter.field,
        filter.operator,
        filter.value
      )
    );
  };

  return (
    <div>
      <TableContainer sx={{ maxWidth: 1200 }}>
        <FilterBar handleChangeFilter={handleChangeFilter} />
        <Table sx={{ bgcolor: "white" }} aria-label="customized table">
          <TableHead columns={columns} handleSorting={handleSorting} />
          {data ? (
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.compoundID}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ width: 100 }}
                  >
                    {row.ID ? row.ID : ""}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 50 }}>
                    <Link
                      href={`https://www.ebi.ac.uk/chembl/compound_report_card/${row.compoundID}`}
                      target="_blank"
                    >
                      {row.compoundID}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      width: 500,
                    }}
                  >
                    {row.SMILES}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 100 }}>
                    <Link
                      href={`https://www.uniprot.org/uniprot/${row.proteinID}`}
                      target="_blank"
                    >
                      {row.proteinID}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Mol2D SMILES={row.SMILES} />
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 150 }}>
                    {row.bindingAffinity}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : null}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10, 25]}
                colSpan={6}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
