package models

type DataAnlysType struct {
	tableName 		struct{}  	`pg:"data_anlys_type"`
	TypeCode     	string    	`pg:"type_code,pk"`
	TypeName     	string    	`pg:"type_name"`
	Active			bool	  	`pg:"is_active"`
}