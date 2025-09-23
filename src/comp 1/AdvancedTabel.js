import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  Check as CheckIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";

import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
import { useDataIngestion } from "../hooks/useDataIngestion";
import { IsObjectEmpty } from "../utils";
import Filter from "./Filter";

// ------------------ Helper functions ------------------ //
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ------------------ Table Head ------------------ //
function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  role,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* Select checkbox */}
        {role === "admin" && (
          <TableCell
            padding="checkbox"
            sx={{
              fontWeight: 600,
              borderRadius: "5px 0 0 5px",
              borderBottom: "none",
              backgroundColor: "#dad5fd",
            }}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => {
          // Hide admin-only columns for users
          if (role === "user" && ["edit", "status"].includes(headCell.id)) {
            return null;
          }

          return (
            <TableCell
              key={headCell.id}
              align="left"
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                fontWeight: 600,
                borderBottom: "none",
                backgroundColor: "#dad5fd",
              }}
            >
              {headCell.notSortable ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

// ------------------ Toolbar ------------------ //
function EnhancedTableToolbar({
  numSelected,
  openFilter,
  deleteAction,
  handleDeleteClick,
  tableHeading,
  displayFilter,
  role,
}) {
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1">
          {tableHeading}
        </Typography>
      )}

      {role === "admin" && numSelected > 0 ? (
        <>
          {/* Admin-only actions */}
          <Tooltip title="Accept">
            <IconButton size="medium" color="success">
              <CheckIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reject">
            <IconButton size="medium" color="error">
              <ClearIcon />
            </IconButton>
          </Tooltip>

          {deleteAction && (
            <Tooltip title="Delete">
              <IconButton
                size="medium"
                onClick={() => handleDeleteClick(numSelected)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        displayFilter && (
          <Tooltip title="Filter list">
            <IconButton onClick={openFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )
      )}
    </Toolbar>
  );
}

// ------------------ Main AdvancedTable ------------------ //
export default function AdvancedTable({
  data,
  headCells = [],
  deleteAction,
  tableHeading = "Available data",
  updateCellData = () => {},
  deleteURL = "",
  displayFilter = true,
  fetchDataCallBack = () => {},
  showMoreData,
  role = "user", // 👈 default role
}) {
  const rows = data;
  const [showFilter, setShowFilter] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("code");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [openDeletePopOver, setOpenDeletePopOver] = useState(false);

  const { saveDataIngestion, isLoading } = useDataIngestion();

  // ------------------ Actions ------------------ //
  const handleDeleteClick = () => {
    setOpenDeletePopOver(true);
  };
  const handleDeleteConfirm = () => {
    setOpenDeletePopOver(false);
    const id = selected?.length === 1 ? selected[0] : null;
    if (!id) return;
    saveDataIngestion({ url: `${deleteURL}/${id}`, method: "delete" }).then(
      () => fetchDataCallBack()
    );
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopOver(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if (role === "user") return; // 👈 users cannot multi-select
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <div className="custom-table">
      {displayFilter && <Filter open={showFilter} close={() => setShowFilter(false)} />}

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", boxShadow: "none" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            openFilter={() => setShowFilter(true)}
            deleteAction={deleteAction}
            handleDeleteClick={handleDeleteClick}
            tableHeading={tableHeading}
            displayFilter={displayFilter}
            role={role}
          />

          <TableContainer sx={{ maxHeight: "500px", borderRadius: "5px" }}>
            <Table stickyHeader>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                role={role}
              />
              <TableBody>
                {visibleRows.map((row, i) => {
                  const isItemSelected = selected.includes(row.id);

                  return (
                    <TableRow
                      hover
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* Admin-only selection checkbox */}
                      {role === "admin" && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                      )}

                      {headCells.map((headCell, index) => {
                        // Hide admin-only cells for users
                        if (role === "user" && ["edit", "status"].includes(headCell.id)) {
                          return null;
                        }

                        if (headCell.id === "more") {
                          return (
                            <TableCell key={index}>
                              <Tooltip title="view more">
                                <IconButton size="small" onClick={showMoreData}>
                                  <MoreHorizIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={index}>{row[headCell.id]}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <FormControlLabel
          control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
          label="Dense padding"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeletePopOver}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
