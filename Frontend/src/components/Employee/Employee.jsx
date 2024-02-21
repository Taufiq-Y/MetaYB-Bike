import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import ApiService from "../../ApiService";
import Navbar from "../Navbar/Navbar";
import RecordTable from "./Table";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading";
import CircularProgress from "@mui/material/CircularProgress";

function Employee() {
  const [selectedBike, setSelectedBike] = useState("");
  const [bikelist, setBikelist] = useState([]);
  const [records, setRecords] = useState([]);
  const [hideInput, setHideInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [total, setTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    getBikes();
    handleBikeSelection("get");
  }, []);

  const getBikes = async () => {
    setLoading(true);
    try {
      const bikes = await ApiService.getBike();
      setBikelist(bikes.bikes);
      setLoading(false);
    } catch (error) {
      console.error("Bike selection failed:", error);
    }
  };

  const handleBikeSelection = async (str) => {
    if (total >= 480) {
      return toast.error(
        "You have reached the maximum number of assemblies per day! Pls take rest"
        );
      } else {
        setLoading(true);
        try {
          const data = await ApiService.selectBike(userId, selectedBike, str);
        if (data.message === "Already another bike is Inprogress") {
          if (!showToast) {
            toast.error(data.message);
            setShowToast(true);
          }
        }
        setRecords(data);
        setHideInput(true);
        setLoading(false);
        setSelectedBike("");

        let tempTotal = 0;
        let tempDate = new Date().toLocaleDateString();

        for (let i = 0; i < data?.data?.length; i++) {
          let updatedAt = new Date(data?.data[i].updatedAt);
          let formattedDate = `${
            updatedAt.getMonth() + 1
          }/${updatedAt.getDate()}/${updatedAt.getFullYear()}`;

          if (formattedDate === tempDate) {
            tempTotal += data?.data[i].assemblyTime;
          }
        }

        setTotal(tempTotal);
      } catch (error) {
        console.error("Bike selection failed:", error);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedBike(event.target.value);
  };
  return (
    <>
      <Toaster />
      {loading && (
        <div className="Loader">
          <CircularProgress />
        </div>
      )}
      <Navbar />

      {hideInput && (
        <>
          <Typography variant="h6" style={{ margin: "20px", padding: "5px" }}>
            Select a Bike to Assemble
          </Typography>
          <FormControl
            sx={{ m: 1, width: "270px" }}
            style={{ margin: "10px", padding: "5px" }}
          >
            <InputLabel id="demo-simple-select-label">Bike</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBike}
              label="bike"
              onChange={handleChange}
              disabled={disable}
            >
              {bikelist.map((bike, i) => {
                return (
                  <MenuItem
                    key={i}
                    value={bike._id}
                  >{`${bike.name} - ${bike.assemblyTime} minutes `}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            style={{ margin: "25px" }}
            variant="contained"
            color="primary"
            onClick={() => handleBikeSelection("post")}
            disabled={!selectedBike}
          >
            Select
          </Button>
        </>
      )}
      {records.success === true && loading === false && hideInput && (
        <RecordTable setRecords={setRecords} records={records.data} />
      )}
    </>
  );
}

export default Employee;
