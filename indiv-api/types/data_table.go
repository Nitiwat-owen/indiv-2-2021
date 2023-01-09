package types

import (
	json "github.com/jmoiron/sqlx/types"
)

type DataTableRequest struct {
	Filter  		[]Filter 	  	`json:"filter"`
	Paging			Paging	 		`json:"paging"`
}

type DataTableResponse struct {
	BaseResponse
	Data 			DataTableResults `json:"data"`
}

type DataTableResults struct {
	Results			[]json.JSONText	`json:"results"`
	TotalRecord		int				`json:"totalRecord"`
}