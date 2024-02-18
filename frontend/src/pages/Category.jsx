import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { categories, difficulty, types } from "../constants/index";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getQuiz } from "../slices/quizSlice";

function Category() {
    const [isSet, setIsSet] = useState(true);
    const [apiData, setApiData] = useState({
        number: 50,
        category: "Any Category",
        difficulty: "Any Difficulty",
        type: "Any Type",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        dispatch(getQuiz(apiData))
            .then(res => {
                console.log(res.payload.results)
                navigate("/play/1")
            })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "number" && (value < 1 || value > 50)) {
            setIsSet(false);
        } else {
            setIsSet(true);
        }
        setApiData((prevApiData) => {
            return {
                ...prevApiData,
                [name]: value,
            };
        });
    }

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                Height="100vh"
                flexDirection="column"
                width="70vw"
                maxWidth="40rem"
                gap="2rem"
                margin="0 auto"
            >
                <h1 style={{ fontFamily: 'Quicksand' }}>Set your Quiz</h1>
                <FormControl fullWidth>
                    <InputLabel htmlFor="category">Select Category</InputLabel>
                    <Select
                        name="category"
                        id="category"
                        value={apiData.category}
                        onChange={handleChange}
                        input={<OutlinedInput label="Select Category" />}
                    >
                        {categories.map((categorie) => {
                            return (
                                <MenuItem
                                    key={categorie.value}
                                    value={categorie.value}
                                >
                                    {categorie.text}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <Box display="flex" justifyContent="center" width="100%" flexDirection="column">
                    <Button
                        fullWidth
                        className="start-btn"
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: 'black',
                            '&:hover': {
                                bgcolor: '#303030'
                            }
                        }}
                    >
                        Start
                    </Button>
                    {/* </Link> */}
                </Box>
            </Box>
        </>
    );
}

export default Category;