package models

import (
	"time"

	"github.com/jmoiron/sqlx/types"
)

type DataAnlysInfo struct {
	tableName 			struct{}  			`pg:"data_anlys_info"`
	Id  	  			int 	  			`pg:"id,pk"`
	Models    			types.JSONText    	`pg:"models"`

	TypeCode 			string 				`pg:"type_code"`
	// DataAnlysType   	*DataAnlysType    	`pg:"rel:has-one"`

	CreateBy 			string 				`pg:"create_by"`
	CreateDate 			time.Time 			`pg:"create_date"`
	UpdateBy 			string 				`pg:"update_by"`
	UpdateDate 			time.Time 			`pg:"update_date"`

	// DataAnlysResults 	[]*DataAnlysOutput 	`pg:"rel:has-many"`
}