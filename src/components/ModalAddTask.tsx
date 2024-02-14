import {
	Backdrop,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { TasksService } from '../services/api/tasks';

export const ModalAddTask = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [taskData, setTaskData] = useState({
		title: '',
		completed: false,
		description: '',
	});
	const [loading, setLoading] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	const onClickCreate = () => {
		setLoading(true);
		TasksService.addTask(taskData)
			.then((res: any) => {
				if (res) {
					setTimeout(() => {
						setLoading(false);
						setOpen(false);
						window.location.reload();
					}, 2000);
				}
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	return (
		<>
			{loading ? (
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
					onClick={handleClose}
				>
					<CircularProgress color='inherit' />
				</Backdrop>
			) : null}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle
					id='alert-dialog-title'
					sx={{
						fontWeight: 'bold',
					}}
				>
					Add nova task
				</DialogTitle>
				<DialogContent className='flex flex-col items-start justify-center gap-5'>
					<TextField
						label='Título'
						variant='standard'
						value={taskData.title}
						onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
					/>
					<TextField
						label='Descrição'
						variant='standard'
						value={taskData.description}
						onChange={(e) =>
							setTaskData({ ...taskData, description: e.target.value })
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={taskData.completed}
								onChange={() =>
									setTaskData({ ...taskData, completed: !taskData.completed })
								}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label='Feito?'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={onClickCreate} autoFocus disabled={!taskData.title}>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
