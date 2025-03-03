import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AdvancedTableSmall = ({ data, headCells }) => {
  return (
    <>
      {data.map((dt) => {
        return (
          <>
            <div id="">
              <Card sx={{ minWidth: 275 }}>
                <CardActions>
                  <Button size="small">Edit</Button>
                  <Button size="small">Delete</Button>
                  <Button size="small">Approve</Button>
                  <Button size="small">Reject</Button>
                </CardActions>
                <CardContent>
                  <div>
                    {headCells.map((headCell) => {
                      return (
                        <>
                          <small>{headCell.label}</small>
                          <h5
                            style={{
                              marginTop: 0,
                            }}
                          >
                            {dt[headCell.id]}
                          </h5>
                          <hr />
                        </>
                      );
                    })}
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small">More</Button>
                </CardActions>
              </Card>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AdvancedTableSmall;
