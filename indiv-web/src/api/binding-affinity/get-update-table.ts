import { apiAxios } from '../const';
import {UpdateTableBody} from '../../types/binding-affinity'

export const GetUpdateTable = async (updateTableBody: UpdateTableBody) => {
    console.log("befor",updateTableBody)
    const response = await (await apiAxios.post('/drug/searchBindingAffinity', updateTableBody)).data;
    console.log("response", response)
    return response;
}
