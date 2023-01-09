package models

type DataAnlysInput struct {
	tableName 			struct{}  		`pg:"data_anlys_input"`
	Id  	  			int 	  		`pg:"id,pk"`

	InfoId 				int 			`pg:"info_id"`
	// DataAnlysInfo   	*DataAnlysInfo  `pg:"rel:has-one"`

	FieldType			string			`pg:"field_type"`
	FieldName			string			`pg:"field_name"`
	
	TypeCode 			string 			`pg:"type_code"`
	// DataAnlysType   	*DataAnlysType  `pg:"rel:has-one"`

	// DataAnlysField   	*DataAnlysField  `pg:"rel:has-one"`
	
	FieldValue			string			`pg:"field_value"`

	IsFile				bool			`pg:"is_file"`
	FileName			string			`pg:"file_name"`
	FilePath			string			`pg:"file_path"`
}