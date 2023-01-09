package types

type Paging struct {
	StartIndex	int    `json:"startIndex"` 
	FetchSize	int	   `json:"fetchSize"`
	SortBy		string `json:"sortBy"`
	SortAsc		bool   `json:"sortAsc"`
}