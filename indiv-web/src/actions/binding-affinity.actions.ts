import {bindingAffinityService} from '../services'
import { filterBody, UpdateTableBody, UpdateTableParams } from "../types/binding-affinity";

export const bindingAffinityActions = {
    updateTable,
    postInput
}

function postInput(form) : any {
    return bindingAffinityService.submitInput(form)
}

function updateTable(d:UpdateTableParams): any {
    let filters:any = d.filter;
    filters.push({
        "fieldName": "infoId",
        "fieldValue": "1"
    })
    const object = {
        "paging": {
            "startIndex": d.limit*d.page,
            "fetchSize": d.limit,
            "sortBy": d.sortField,
            "sortAsc": d.sortOrder === "ASC"
        },
        "filter": filters
    }
    return bindingAffinityService.updateTable(object)
}