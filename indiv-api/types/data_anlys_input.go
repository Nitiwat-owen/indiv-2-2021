package types

type Input struct {
	FieldType    string 	`json:"fieldType"`
	FieldName	 string		`json:"fieldName"`
	FieldValue	 string		`json:"fieldValue"`
	IsFile		 bool		`json:"isFile"`
	Fi		 bool		`json:"isFile"`
}

type DataAnlysBody struct {
	Service		string		`json:"service"`
	Models		[]string 	`json:"models"`
}

