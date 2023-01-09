package models

import (
	"github.com/jmoiron/sqlx/types"
)

type DataAnlysOutput struct {
	tableName 		struct{}  		`pg:"data_anlys_output"`
	Id  	  		int 	  		`pg:"id,pk"`
	
	InfoId 			int 			`pg:"info_id"`
	// DataAnlysInfo   *DataAnlysInfo  `pg:"rel:has-one"`

	Result			types.JSONText	`pg:"result"`
}