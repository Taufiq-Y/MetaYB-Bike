import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ApiService from "../../ApiService";
import { useState } from "react";

export default function RecordTable(data) {
  const [value, setValue] = useState();

  const handleChange = async (_id, event, assemblyTime) => {
    const userId = sessionStorage.getItem("userId");
    const status = event?.target?.value;
    try {
      updateStage();
      const updateStat = await ApiService.updateStat(
        _id,
        status,
        assemblyTime,
        userId
      );
      data.setRecords({ success: true, data: updateStat.empBikelist });
      setValue(status);
    } catch (error) {}
  };

  const updateStage = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const data = await ApiService.getBikesById(userId);

      const statuses = data?.bikeRecord?.map((record) => record.status);
      setValue(statuses);
    } catch (error) {}
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>S.No</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Bike Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Duration</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Started Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.records?.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.bikeId.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {`${row.bikeId.assemblyTime} minutes`}
              </TableCell>
              <TableCell>{moment(row.createdAt).format("LLL")}</TableCell>
              <TableCell>
                {/* {row.status} */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row?.status}
                    label="Select Status"
                    onChange={(e) =>
                      handleChange(row._id, e, row?.bikeId?.assemblyTime)
                    }
                    disabled={
                      value == "Completed" || row?.status == "Completed"
                    }
                  >
                    <MenuItem value="Not started yet">Not yet started</MenuItem>
                    <MenuItem value="Paused">Paused</MenuItem>
                    <MenuItem value="Inprogress">Inprogress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
