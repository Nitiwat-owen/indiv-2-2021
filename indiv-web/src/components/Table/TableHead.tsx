import { useState } from "react";
import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import Button, { ButtonProps } from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: pink[300],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const HeadButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  ":disabled": {
    color: theme.palette.getContrastText(pink[500]),
  },
}));

interface columnsProps {
  label: string;
  accessor: string;
  sortable: boolean;
}

interface HeadProps {
  columns: Array<columnsProps>;
  handleSorting: (sortField: string, order: string) => void;
}

const CustomTableHead = (props: HeadProps) => {
  const [sortField, setSortField] = useState("ID");
  const [order, setOrder] = useState("ASC");

  const HandleSortingChange = (accessor: string) => {
    console.log(accessor);
    const sortOrder =
      accessor === sortField && order === "ASC" ? "DESC" : "ASC";
    setSortField(accessor);
    setOrder(sortOrder);
    props.handleSorting(accessor, sortOrder);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((col: columnsProps) => {
          return (
            <StyledTableCell>
              <HeadButton
                onClick={() => HandleSortingChange(col.accessor)}
                disabled={col.sortable === false}
                endIcon={
                  col.sortable === true && col.accessor === sortField ? (
                    order === "ASC" ? (
                      <ArrowDropDownOutlinedIcon />
                    ) : (
                      <ArrowDropUpOutlinedIcon />
                    )
                  ) : (
                    " "
                  )
                }
              >
                {col.label}
              </HeadButton>
            </StyledTableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
