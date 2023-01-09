package types

type UserCreateBody struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserCreateResponse struct {
	BaseResponse
}

type UserUpdateBody struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserUpdateResponse struct {
	BaseResponse
}

type UserDeleteResponse struct {
	BaseResponse
}

type UserGetResponse struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type UserForgotPasswordBody struct {
	Email string `json:"email"`
}

type UserForgotPasswordResponse struct {
	BaseResponse
}