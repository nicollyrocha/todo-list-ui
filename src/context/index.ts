import { useEffect, useState } from 'react';
import { TasksService } from '../services/api/tasks';

export const Context = () => {
	const [tasksFromDb, setTasksFromDb] = useState([]);

	const getTasksFromDb = () => {
		TasksService.getTasks()
			.then((data) => setTasksFromDb(data.body))
			.catch((error) => console.log('error: ', error));
	};

	useEffect(() => {
		getTasksFromDb();
	}, []);

	return { tasksFromDb, setTasksFromDb, getTasksFromDb };
};
