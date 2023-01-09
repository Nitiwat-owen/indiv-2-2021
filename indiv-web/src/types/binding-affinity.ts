export interface UpdateTableParams {
    page: number,
    limit: number,
    sortField: string,
    sortOrder: string,
    filter: any[]
}

export interface TableData {
    ID: number;
	compoundID: string;
	SMILES: string;
	proteinID: string;
	image: string;
	bindingAffinity: number;
} 

export interface TableProps {
    data: TableData[];
    count: number;
	HandleUpdateTable: (details: UpdateTableParams) => void;
}

export interface filterBody {
    fieldName: string,
    condition: string,
    fieldValue: string
}

export class UpdateTableBody {
    paging: {
        startIndex: number 
        fetchSize: number
        sortBy: string
        sortAsc: boolean
    }
    filter : filterBody[]
}
