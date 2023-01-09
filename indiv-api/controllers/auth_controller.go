package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/services"
)

type AuthController struct {
	AuthService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{ 
		AuthService: authService,
	}
}

func (authController *AuthController) Login(c *fiber.Ctx) error {
	body := &types.LoginBody{}
	c.BodyParser(body)
	token, err := authController.AuthService.Login(body)
	if err != nil {
		return err
	}
	return c.JSON(&types.LoginResponse{
		types.BaseResponse{
			Result:      true,
			Message: "success",
		},
		types.AuthTokenDto{
			AuthToken: 	token,
		},
	})
}