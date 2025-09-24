// src/components/AdvancedTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

function AdvancedTable({ data, headCells, setData }) {
  // Permission fields (excluding "page" and "all")
  const permissionFields = headCells
    .map((h) => h.id)
    .filter((id) => id !== "page" && id !== "all");

  // handle checkbox change
  const handleCheckboxChange = (rowId, field) => {
    const updatedData = data.map((row) => {
      if (row.id !== rowId) return row;

      // Special case: "all" toggled
      if (field === "all") {
        const newValue = !row.all;
        const updatedRow = {
          ...row,
          all: newValue,
        };
        // Update all sub permissions
        permissionFields.forEach((f) => {
          updatedRow[f] = newValue;
        });
        return updatedRow;
      }

      // Normal case: individual field toggled
      const updatedRow = {
        ...row,
        [field]: !row[field],
      };

      // If ALL permissions are true → mark "all" true
      const allChecked = permissionFields.every((f) => updatedRow[f]);
      updatedRow.all = allChecked;

      return updatedRow;
    });

    setData(updatedData);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} align="center">
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {headCells.map((headCell) => {
                if (headCell.id === "page") {
                  // Page column (text only)
                  return <TableCell key={headCell.id}>{row.page}</TableCell>;
                } else {
                  // Other columns: checkboxes
                  return (
                    <TableCell key={headCell.id} align="center">
                      <Checkbox
                        checked={!!row[headCell.id]}
                        onChange={() => handleCheckboxChange(row.id, headCell.id)}
                      />
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdvancedTable;
