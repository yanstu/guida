import {
	request,
	synchro
} from './request.js';

export const login = obj => request(obj, '/api/login')
