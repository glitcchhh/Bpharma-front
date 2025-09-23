import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AdvancedTableSmall = ({ data, headCells, role = "user" }) => {
  return (
    <>
      {data.map((dt, index) => (
        <div key={index}>
          <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            {/* 🔹 Top actions: only for Admin */}
            {role === "admin" && (
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
                <Button size="small">Approve</Button>
                <Button size="small">Reject</Button>
              </CardActions>
            )}

            {/* 🔹 Card Content */}
            <CardContent>
              <div>
                {headCells.map((headCell) => (
                  <div key={headCell.id}>
                    <small>{headCell.label}</small>
                    <h5 style={{ marginTop: 0 }}>{dt[headCell.id]}</h5>
                    <hr />
                  </div>
                ))}
              </div>
            </CardContent>

            {/* 🔹 Bottom actions: available for both */}
            <CardActions>
              <Button size="small">More</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  );
};

export default AdvancedTableSmall;
