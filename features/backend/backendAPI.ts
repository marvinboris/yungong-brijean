import axios from 'axios';
import { manageResource } from '../../app/helpers/utils';

const backendAPI = {
    dashboard: async (role: string) => {
        const res = await axios.get(`/api/backend/${role}/dashboard`)
        return res.data
    },
    get: (info: { role: string, resource: string }) => (page?: number, show?: number | string, search?: string) => manageResource(info.role, info.resource, 'index', page, show, search),
    info: (info: { role: string, resource: string }) => () => manageResource(info.role, info.resource, 'info'),
    show: (info: { role: string, resource: string }) => (id: string) => manageResource(info.role, info.resource, 'show', id),
    post: (info: { role: string, resource: string }) => (data: any) => manageResource(info.role, info.resource, 'post', data),
    patch: (info: { role: string, resource: string }) => (id: string, data: any) => manageResource(info.role, info.resource, 'patch', id, data),
    delete: (info: { role: string, resource: string }) => (id: string) => manageResource(info.role, info.resource, 'delete', id),
}

export default backendAPI