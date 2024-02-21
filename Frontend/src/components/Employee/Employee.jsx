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
import CircularProgress from '@mui/material/CircularProgress';

function Employee() {
  const [selectedBike, setSelectedBike] = useState("");
  const [bikelist, setBikelist] = useState([]);
  const [records, setRecords] = useState([]);
  const [hideInput, setHideInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisabled] = useState(false); // State to store total assembly time
  const [total, setTotal] = useState(0); // State to store total assembly time
  const [showToast, setShowToast] = useState(false); // State to track whether toast has been shown
  const userId = sessionStorage.getItem("userId");

  console.log('records::: ', records);

  useEffect(() => {
    getBikes();
    handleBikeSelection("get");
    // Calculate total assembly time when component mounts or 'records' state changes

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log('total  >= 480::: ', total  >= 480);
    if (total  >= 480) {
      //One day quota
      return toast.error(
        "You have reached the maximum number of assemblies per day! Pls take rest"
      );
    } else {
      setLoading(true);
      try {
        const data = await ApiService.selectBike(userId, selectedBike, str);
        if (data.message === "Already another bike is Inprogress") {
          if (!showToast) {
            // Show toast only if it hasn't been shown already
            toast.error(data.message);
            setShowToast(true); // Set state to indicate toast has been shown
          }
        }
        console.log('data::: ', data);
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
          console.log("formattedDate::: ", formattedDate);

          if (formattedDate === tempDate) {
            tempTotal += data?.data[i].assemblyTime;
          }
        }

        console.log("Total assembly time for the current date:", tempTotal);

        console.log(tempTotal);
        setTotal(tempTotal);
      } catch (error) {
        console.error("Bike selection failed:", error);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedBike(event.target.value);
  };

  // const workload = () => {
  //   let tempTotal = 0;
  //   console.log('records.data?.length::: ', records.data?.length);
  //     for (let i = 0; i < records.data?.length; i++) {
  //       tempTotal += records.data[i].assemblyTime;
  //       console.log('records.data[i].assemblyTime::: ', records.data[i].assemblyTime);
  //     }
  //     setTotal(tempTotal);
  //     console.log('total::: ', tempTotal === 480 );

  // };

  // useEffect(() => {
  //   if (total > 480 && !showToast) {
  //     toast.error("You have exceeded your daily workload limit! Please take rest.");
  //     setShowToast(true);
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // }, [total])

  // useEffect(() => {
  //   if(records.length > 0) {
  //     workload();
  //   }
  // },[records])

  return (
    <>
      <Toaster />
      {loading &&  <div className="Loader">
      <CircularProgress /> 
      </div>}
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
