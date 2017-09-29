import { http } from '@/api';

export const getUser = god => http.get('user/profile', { params: { god } });
export const login = ({ identity, password }) => http.post('admin/authorize-phone', { identity, password });
