package types

type BaseResponse struct {
	Result	bool   `json:"result"`
	Message string `json:"message"`
}

type HttpError struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}