package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/services"
)

type UserController struct {
	UserService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{ 
		UserService: userService,
	}
}

func (userController *UserController) GetUser(c *fiber.Ctx) error {
	username := c.Params("username")
	user, err := userController.UserService.GetUserByUsername(username)
	if (err != nil) {
		return err
	}
	return c.JSON(&types.UserGetResponse{
		Username: user.Username,
		Email: user.Email,
	})
}

func (userController *UserController) GetUsers(c *fiber.Ctx) error {
	users, err := userController.UserService.GetUsers()
	if (err != nil) {
		return err
	}

	var results []types.UserGetResponse
	for _, user := range users {
        results = append(results, types.UserGetResponse{
			Username: user.Username,
			Email: user.Email,
		})
    }
	return c.JSON(results)
}

func (userController *UserController) Register(c *fiber.Ctx) error {
	body := &types.UserCreateBody{}
	c.BodyParser(body)
	if err := userController.UserService.CreateUser(body); err != nil {
		return err
	}
	return c.JSON(&types.UserCreateResponse{
		types.BaseResponse{
			Result:      true,
			Message: "success",
		},
	})
}

func (userController *UserController) UpdateUser(c *fiber.Ctx) error {
	username := c.Params("username")
	body := &types.UserUpdateBody{}
	c.BodyParser(body)
	if err := userController.UserService.UpdateUser(username, body); err != nil {
		return err
	}
	return c.JSON(&types.UserUpdateResponse{
		types.BaseResponse{
			Result:      true,
			Message: "success",
		},
	})
}

func (userController *UserController) DeleteUser(c *fiber.Ctx) error {
	username := c.Params("username")
	if err := userController.UserService.DeleteUser(username); err != nil {
		return err
	}
	return c.JSON(&types.UserDeleteResponse{
		types.BaseResponse{
			Result:		true,
			Message: "success",
		},
	})
}

func (userController *UserController) ForgotPassword(c *fiber.Ctx) error {
	body := &types.UserForgotPasswordBody{}
	c.BodyParser(body)
	err := userController.UserService.ForgotPassword(body)
	if err != nil {
		return err
	}
	return c.JSON(types.BaseResponse{
		Result:  true,
		Message: "success",
	})
}