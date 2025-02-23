import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import Filter from "./Filter";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useUserPermission } from "../hooks/useUserPermissions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const { getUserPermissions } = useUserPermission();

  const editPermission = getUserPermissions({
    permissionType: "edit",
  });

  const renderCell = (headCell) => {
    return (
      <TableCell
        key={headCell.id}
        align="left"
        padding={headCell.disablePadding ? "none" : "normal"}
        sortDirection={orderBy === headCell.id ? order : false}
        sx={{
          fontWeight: 600,
          borderBottom: "none",
          backgroundColor: "#dad5fd",
          ":last-child": {
            borderRadius: "0 5px 5px 0",
          },
        }}
      >
        <>
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          )}
        </>
      </TableCell>
    );
  };

  return (
    <TableHead>
      <TableRow>
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
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          if (
            headCell.id !== "id" &&
            (headCell.id !== "edit" || editPermission)
          ) {
            return renderCell(headCell);
          }
          return null;
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    openFilter,
    selected,
    deleteAction = true,
    acceptAction = true,
    rejectAction = true,
    handleDeleteClick = () => {},
    tableHeading,
  } = props;

  const { getUserPermissions } = useUserPermission();
  const acceptPermission = getUserPermissions({
    permissionType: "accept",
  });
  const rejectPermission = getUserPermissions({
    permissionType: "reject",
  });
  const deletePermission = getUserPermissions({
    permissionType: "delete",
  });

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        // numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          component="div"
        >
          {tableHeading}
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          {acceptPermission && acceptAction && (
            <Tooltip title="Accept">
              <IconButton size="medium" color="success">
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}

          {rejectPermission && rejectAction && (
            <Tooltip title="Reject">
              <IconButton size="medium" color="error">
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}

          {deletePermission && deleteAction && (
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
        <Tooltip title="Filter list">
          <IconButton onClick={openFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AdvancedTable({
  data,
  showMoreData,
  headCells = [],
  deleteAction,
  acceptAction,
  rejectAction,
  tableHeading = "Available data",
  // update api call
  updateCellData = () => {},
}) {
  const rows = data;
  const [showFilter, setShowFilter] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [openDeletePopOver, setOpenDeletePopOver] = useState(false);
  const { getUserPermissions } = useUserPermission();

  const editPermission = getUserPermissions({
    permissionType: "edit",
  });

  const startEditing = (index, row) => {
    console.log("start editing :: ", index, row);

    setEditingIdx(index);
    setEditValues(row);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };
  const saveEdit = ({ index }) => {
    console.log("Save", { index }, editValues);
    setEditingIdx(null);
    updateCellData({
      id: index,
      data: editValues,
    });
  };

  const handleDeleteClick = (index) => {
    setDeleteIdx(index);
    setOpenDeletePopOver(true);
  };
  const handleDeleteConfirm = () => {
    setOpenDeletePopOver(false);
    setDeleteIdx(null);

    console.log("selected ::: ", selected);
  };
  const handleDeleteCancel = () => {
    setOpenDeletePopOver(false);
    setDeleteIdx(null);
  };

  const openFilter = () => {
    setShowFilter(true);
  };

  const closeFilter = () => {
    setShowFilter(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div className="custom-table">
      <Filter open={showFilter} close={closeFilter} />

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", boxShadow: "none" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            openFilter={openFilter}
            selected={selected}
            deleteAction={deleteAction}
            acceptAction={acceptAction}
            rejectAction={rejectAction}
            handleDeleteClick={handleDeleteClick}
            tableHeading={tableHeading}
          />
          <TableContainer sx={{ maxHeight: "400px", borderRadius: "5px" }}>
            <Table
              sx={{ minWidth: 750 }}
              size={dense ? "small" : "medium"}
              stickyHeader
              aria-label="sticky table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, i) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${i}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {headCells.map((headCell, index) => {
                        if (headCell.id == "id") {
                          return (
                            <React.Fragment key={index}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                  onClick={(event) =>
                                    handleClick(event, row.id)
                                  }
                                />
                              </TableCell>
                            </React.Fragment>
                          );
                        } else if (headCell.id == "edit") {
                          if (editPermission) {
                            return editingIdx == i ? (
                              <React.Fragment key={index}>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                    }}
                                  >
                                    <Tooltip title="Save">
                                      <IconButton
                                        size="medium"
                                        color="success"
                                        onClick={(value) =>
                                          saveEdit({ index: row.id })
                                        }
                                      >
                                        <CheckIcon />
                                      </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Cancel">
                                      <IconButton
                                        size="medium"
                                        color="error"
                                        onClick={() => setEditingIdx(null)}
                                      >
                                        <ClearIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </React.Fragment>
                            ) : (
                              <React.Fragment key={index}>
                                <TableCell>
                                  <Tooltip title="edit">
                                    <IconButton
                                      size="medium"
                                      onClick={() => startEditing(i, row)}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </React.Fragment>
                            );
                          }
                        } else if (headCell.id == "more") {
                          return (
                            <React.Fragment key={index}>
                              <TableCell>
                                <Tooltip title="view more">
                                  <IconButton
                                    size="medium"
                                    onClick={showMoreData}
                                  >
                                    <MoreHorizIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </React.Fragment>
                          );
                        } else if (headCell.id == "status") {
                          const status = row[headCell.id];

                          return (
                            <React.Fragment key={index}>
                              <TableCell>
                                <Tooltip title={status ? "active" : "inactive"}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      backgroundColor: status ? "green" : "red",
                                      ":hover": {
                                        backgroundColor: status
                                          ? "green"
                                          : "red",
                                      },
                                    }}
                                  >
                                    {status ? (
                                      <CheckIcon
                                        color="white"
                                        sx={{
                                          fill: "white",
                                          fontSize: "1em",
                                        }}
                                      />
                                    ) : (
                                      <ClearIcon
                                        color="white"
                                        sx={{
                                          fill: "white",
                                          fontSize: "1em",
                                        }}
                                      />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </React.Fragment>
                          );
                        } else {
                          return editingIdx === i ? (
                            <React.Fragment key={index}>
                              <TableCell>
                                <TextField
                                  name={headCell.id}
                                  value={editValues[headCell.id]}
                                  onChange={handleEditChange}
                                  size="small"
                                />
                              </TableCell>
                            </React.Fragment>
                          ) : (
                            <React.Fragment key={index}>
                              <TableCell>{row[headCell.id]}</TableCell>
                            </React.Fragment>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <Dialog
        open={openDeletePopOver}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
