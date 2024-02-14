import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Context } from '../context';
import { Task } from '../models/task.interface';
import { Checkbox } from '@mui/material';
import { TasksService } from '../services/api/tasks';
import DeleteIcon from '@mui/icons-material/Delete';

export const TasksList = () => {
	const { tasksFromDb, getTasksFromDb } = Context();

	const changeCompleted = (
		id: number | undefined,
		task: Task,
		checked: boolean
	) => {
		const newData = {
			...task,
			completed: checked,
		};
		if (id) {
			TasksService.updateTask(id, newData).then(() => {
				getTasksFromDb();
			});
		}
	};

	const deleteTask = (id: number | undefined) => {
		if (id) {
			TasksService.deleteTask(id).then(() => {
				getTasksFromDb();
			});
		}
	};

	return (
		<div className='w-8/12 font-sans'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: 'bold',
									fontSize: '16px',
								}}
								align='center'
							>
								Task
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									fontSize: '16px',
								}}
								align='center'
							>
								Descrição
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									fontSize: '16px',
								}}
								align='center'
							>
								Feito?
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									fontSize: '16px',
								}}
								align='center'
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasksFromDb ? (
							tasksFromDb.map((task: Task) => (
								<TableRow key={task.title}>
									<TableCell align='center'>{task.title}</TableCell>
									<TableCell align='center'>{task.description}</TableCell>
									<TableCell align='center'>
										<Checkbox
											checked={task.completed}
											onChange={(e) => changeCompleted(task.id, task, e.target.checked)}
											inputProps={{ 'aria-label': 'controlled' }}
										/>
									</TableCell>
									<TableCell align='center'>
										<DeleteIcon
											className='cursor-pointer'
											onClick={() => deleteTask(task.id)}
										/>
									</TableCell>
								</TableRow>
							))
						) : (
							<></>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
