import { apiAxios } from '../const'

export const postInputs = async (form : FormData) => {
    const resp = await ( await apiAxios.post('/drug/readfile', form)).data;
    return resp;
}