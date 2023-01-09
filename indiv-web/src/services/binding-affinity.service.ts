import { GetUpdateTable } from "../api/binding-affinity/get-update-table";
import { postInputs } from "../api/binding-affinity/post-inputs";
import { UpdateTableBody } from "../types/binding-affinity";

export const  bindingAffinityService = {
    updateTable,
    submitInput
}

async function updateTable(d:UpdateTableBody ) {
    const resp = await GetUpdateTable(d)
    return resp
}

async function submitInput(inputs : FormData){
    const resp = await postInputs(inputs)
    return resp
}