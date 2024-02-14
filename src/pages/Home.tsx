import { Button } from '@mui/material';
import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ModalAddTask } from '../components/ModalAddTask';

const theme = createTheme({
	palette: {
		primary: {
			light: '#a1887f',
			main: '#8d6e63',
			dark: '#6d4c41',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: ['Protest Strike'].join(','),
	},
});

export const Home = () => {
	const [openModal, setOpenModal] = useState(false);
	return (
		<ThemeProvider theme={theme}>
			<ModalAddTask open={openModal} setOpen={setOpenModal} />
			<div className='flex flex-col gap-10 items-center'>
				<Header />
				<div className='w-full flex flex-col items-center gap-5'>
					<Button
						onClick={() => {
							setOpenModal(true);
						}}
						variant='contained'
					>
						Add
					</Button>
					<TasksList />
				</div>
			</div>
		</ThemeProvider>
	);
};
