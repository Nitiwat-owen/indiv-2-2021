package models

import (
	"time"
)

type DataAnlysField struct {
	tableName 			struct{}  		`pg:"data_anlys_field"`

	FieldType			string			`pg:"field_type,pk"`
	FieldName			string			`pg:"field_name,pk"`
	SeqNo				int				`pg:"seq_no"`
	
	TypeCode 			string 			`pg:"type_code,pk"`
	// DataAnlysType   	*DataAnlysType  `pg:"rel:has-one"`

	Active				bool	  		`pg:"is_active"`
	CreateBy 			int 			`pg:"create_by"`
	CreateDate 			time.Time 		`pg:"create_date"`
}