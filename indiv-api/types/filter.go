package types

type Filter struct {
	FieldName	string   `json:"fieldName"` 
	Condition	string	 `json:"condition"`
	FieldValue	string   `json:"fieldValue"`
}