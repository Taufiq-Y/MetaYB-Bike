import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import ApiService from "../../ApiService";
import Navbar from "../Navbar/Navbar";
import { Chart } from "../Chart/Chart";
import InputLabel from "@mui/material/InputLabel";
import { ChartEmp } from "../Chart/ChartsEmp";
import toast from "react-hot-toast";
import Loading from "../Loading"
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: "",
    to: "",
  });
  const [employeeProduction, setEmployeeProduction] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [date, setDate] = useState("");
  const [empbike, setEmpbike] = useState([]);
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    
    getEmployees();
    handleDateChange();

  }, []);

  const handleDateChange = async () => {
    setLoading(true);
    try {
      const response = await ApiService.getAllProductionRecords(
        selectedDateRange
      );
      setEmployeeProduction(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch Bike production records");
    }
  };

  const getEmployeeRecords = async () => {
    setLoading(true);
    try {
      const response = await ApiService.getProductionRecords(selectedEmp, date);
      let data = response.data;
      const bikeCountsMap = new Map();
      data.forEach((record) => {
        const bikeId = record.bikeId._id;
        const bikeName = response.bikes.find(
          (bike) => bike._id === bikeId
        )?.name;
        if (bikeName) {
          bikeCountsMap.set(bikeName, (bikeCountsMap.get(bikeName) || 0) + 1);
        }
      });

      const bikeCountsArray = Array.from(bikeCountsMap).map(
        ([name, count]) => ({
          name,
          count,
        })
      );
      setEmpbike(bikeCountsArray);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch employee production records");
    }
  };
  const getEmployees = async () => {
    setLoading(true);
    const bikes = await ApiService.getEmployees();
    setEmployeeList(bikes.employees);
    setLoading(false);
  };

  const handleChange = (event) => {
    setSelectedEmp(event.target.value);
  };

  return (
    <>

{loading &&
      
      <div className="Loader">
      <CircularProgress /> 
      </div>
      }
      <Navbar />
   
      <div
        style={{
          marginLeft: "8%",
          marginTop: "2%",
          display: "flex",
          gap: "225px",
          fontWeight: "bold",
        }}
      >
        <span>Number of Bikes assembled on a selected date Range</span>
        <span>Employee's production on a given day</span>
      </div>
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <TextField
              label="From"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDateRange.from}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  from: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="To"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDateRange.to}
              onChange={(e) =>
                setSelectedDateRange({
                  ...selectedDateRange,
                  to: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={3} style={{ marginLeft: "20%", color: "black" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedEmp}
                label="Employee"
                onChange={handleChange}
              >
                {employeeList.map((emp, i) => {
                  return (
                    <MenuItem key={i} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDateChange}
              disabled={!setSelectedDateRange}
              
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={3} style={{ marginLeft: "29%" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={getEmployeeRecords}
              disabled={!date}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
      <div style={{ display: "flex" }}>
        <Chart data={employeeProduction} />
        {empbike.length > 0 ? (
          <ChartEmp data={empbike} />
        ) : (
          <h4
            style={{ marginLeft: "250px", opacity: "0.5", marginTop: "150px" }}
          >
            Select Employee and Date to view the productivity
          </h4>
        )}
      </div>
    </>
  );
}

export default Dashboard;
