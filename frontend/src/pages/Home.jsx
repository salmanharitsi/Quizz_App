import { Box, Button, MenuItem, Modal, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHighScore } from "../slices/highScoreSlice";
import { Link } from "react-router-dom";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const Home = () => {
	const user = useSelector((state) => state.user);
	const { firstname, score } = user.entities.undefined;
	const [highScore, setHighScore] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openModal, setModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const dispatch = useDispatch()

	const handleOpenModal = () => {
		setModal(true);
	}

	const handleCloseModal = () => {
		if (selectedOption) {
			history.push({
				pathname: '/question',
				state: { category: selectedOption }
			});
		}
		setModal(false);
	}

	const handleButtonClick = () => {
		setOpenSnackbar(true);
	};

	const handleSnackbarActionCancel = () => {
		setOpenSnackbar(false);
	};

	const handleChangeOption = (event) => {
		setSelectedOption(event.target.value);
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleSnackbarAction = () => {
		localStorage.removeItem('QUIZ_USER_TOKEN');
		setOpenSnackbar(false);
		window.location.reload();
	};

	useEffect(() => {
		dispatch(getHighScore())
			.then((res) => {
				console.log(res.payload)
				setHighScore(res.payload)
			})
	}, [])

	useEffect(() => {
		console.log(user);
	}, []);


	return (
		<Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height="90vh">
			<Box position="absolute" bottom="0" left="0" width="100%" zIndex='-1'>
				<div class="custom-shape-divider-bottom-1708233433" style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
					<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '147px' }}>
						<path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
					</svg>
				</div>
			</Box>
			<Box display='flex' justifyContent='space-between' width='80%' paddingTop='20px'>
				<Box display="flex" flexDirection="column">
					<Typography fontFamily='Quicksand' fontSize='30px' fontWeight='700' >Welcome, {firstname}</Typography>
					<Typography fontFamily='Quicksand' fontSize='20px' fontWeight='500'>Your score: {score}</Typography>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<Button onClick={handleButtonClick} sx={{ gap: '10px', textTransform: 'capitalize', color: 'black' }}>
						<Typography fontFamily='Quicksand' fontWeight='500'>Logout</Typography>
						<ExitToAppRoundedIcon sx={{ color: 'black' }} />
					</Button>
					<Snackbar
						open={openSnackbar}
						autoHideDuration={6000}
						onClose={handleSnackbarClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						message="Are you sure you want to logout?"
						action={
							<>
								<Button color="primary" size="large" onClick={handleSnackbarAction}>
									OK
								</Button>
								<Button color="primary" size="large" onClick={handleSnackbarActionCancel}>
									Cancel
								</Button>
							</>
						}
					/>
				</Box>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Button
					variant="contained"
					size="large"
					style={{
						width: '150px',
						height: '150px',
						borderRadius: '50%',
						fontFamily: 'Quicksand',
						fontWeight: "900",
					}}
					sx={{
						bgcolor: 'black',
						'&:hover': {
							bgcolor: '#303030'
						}
					}}
					onClick={handleOpenModal}
				>
					Play Quiz
				</Button>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '80vw',
							bgcolor: 'background.paper',
							borderRadius: '30px',
							boxShadow: 24,
							p: 4,
						}}
					>
						<Typography id="modal-modal-title" variant="h4" component="h2" fontFamily='Quicksand' fontWeight='700' >
							Ready to start the quiz?
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }} fontFamily='Quicksand' fontWeight='700'>
							Rules the quiz:
							<ol>
								<li>Answer as many questions as possible until time runs out!</li>
								<li>Click on the answer that you think is correct, because after selecting it you will go straight to the next question</li>
							</ol>
						</Typography>
						<Link
							to="/play"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}>
							<Button variant="contained" sx={{
								mt: 2, bgcolor: 'black',
								'&:hover': {
									bgcolor: '#303030'
								}, width: '100%'
							}}
							>
								Letsgoo
							</Button>
						</Link>
					</Box>
				</Modal>
			</Box>
			<TableContainer sx={{ maxWidth: "400px", bgcolor: 'white', borderRadius: '30px', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' }}>
				<Table>
					<TableHead sx={{ bgcolor: '#303030', height: '1px' }}>
						<TableRow >
							<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }} ></TableCell>
							<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }}>Top Score</TableCell>
							<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }}></TableCell>
						</TableRow>
					</TableHead>
					<TableHead sx={{ bgcolor: 'black' }}>
						<TableRow >
							<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }} >Rank</TableCell>
							<TableCell align="left" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }}>Username</TableCell>
							<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '900', color: 'white' }}>Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{highScore &&
							[...highScore]
								.sort((a, b) => b.score - a.score)
								.slice(0, 4)
								.map((score, index) => {
									return (
										<TableRow key={score._id}>
											<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '700' }}>{index + 1}</TableCell>
											<TableCell align="left" sx={{ fontFamily: 'Quicksand', fontWeight: '700' }}>
												{score.firstname} {score.lastname}
											</TableCell>
											<TableCell align="center" sx={{ fontFamily: 'Quicksand', fontWeight: '700' }}>
												{score.score}
											</TableCell>
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Home;