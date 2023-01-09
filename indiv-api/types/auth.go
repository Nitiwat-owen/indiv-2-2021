package types

type LoginBody struct {
	Username    string `json:"username"`
	Password 	string `json:"password"`
}

type AuthTokenDto struct {
	AuthToken 	string `json:"authToken"`
}

type LoginResponse struct {
	BaseResponse
	Data AuthTokenDto `json:"data"`
}