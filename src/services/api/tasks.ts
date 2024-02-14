import { api } from '.';
import { Task } from '../../models/task.interface';

const addTask = async (taskData: Task) => {
	try {
		const { data } = await api.post('/', taskData);
		return data;
	} catch (error) {
		return error;
	}
};

const getTasks = async () => {
	try {
		const { data } = await api.get(`/`);
		return data;
	} catch (error) {
		return error;
	}
};

const updateTask = async (id: number, taskData: Task) => {
	try {
		const { data } = await api.put(`/task/${id}`, taskData);
		return data;
	} catch (error) {
		return error;
	}
};

const deleteTask = async (id: number) => {
	try {
		const { data } = await api.delete(`/task/${id}`);
		return data;
	} catch (error) {
		return error;
	}
};

export const TasksService = {
	addTask,
	getTasks,
	updateTask,
	deleteTask,
};
