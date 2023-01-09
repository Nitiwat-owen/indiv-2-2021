package services

import (
	"fmt"
	"net/smtp"

	"golang.org/x/crypto/bcrypt"
	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/utils"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/models"
	"github.com/cucpbioinfo/Indivona/config"
	"github.com/sethvargo/go-password/password"
	"github.com/cucpbioinfo/Indivona/constants"
	"github.com/cucpbioinfo/Indivona/repositories"
	"github.com/cucpbioinfo/Indivona/utils/validators"
)

type UserService struct {
	Config config.Config
	UserRepository *repositories.UserRepository
}

func NewUserService(config config.Config, userRepository *repositories.UserRepository) *UserService {
	return &UserService{
		Config: config,
		UserRepository: userRepository,
	}
}

func (userService *UserService) GetUserByUsername(username string) (models.User, error) {
	user, err := userService.UserRepository.GetUserByUsername(username)
	if err != nil {
		errorCode := fiber.StatusBadRequest
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_NOT_FOUND_ERROR, "user")
		return utils.BuildErrorResponseWithOpts(user, errorCode, errorDesc)
	}
	return user, nil
}

func (userService *UserService) GetUsers() ([]models.User, error) {
	users, err := userService.UserRepository.GetUsers()
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.DATABASE_ERROR, err.Error())
		return utils.BuildErrorResponseWithOpts(users, errorCode, errorDesc)
	}
	return users, nil
}

func (userService *UserService) CreateUser(req *types.UserCreateBody) error {
	errorCode := fiber.StatusBadRequest

	isValidEmail := validators.IsValidEmail(req.Email)
	if !isValidEmail {
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "email")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "password")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	user, err := userService.UserRepository.GetUserByUsername(req.Username)
	if user.Username != "" {
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_EXIST_ERROR, "username")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	err = userService.UserRepository.CreateUser(models.User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	})
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.SAVE_DATA_ERROR, "user")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	return nil
}

func (userService *UserService) UpdateUser(username string, req *types.UserUpdateBody) error {
	errorCode := fiber.StatusBadRequest

	isValidEmail := validators.IsValidEmail(req.Email)
	if !isValidEmail {
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "email")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "password")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	user, err := userService.UserRepository.GetUserByUsername(username)
	if user.Username == "" {
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_NOT_FOUND_ERROR, "user")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	err = userService.UserRepository.UpdateUser(models.User{
		Username: username,
		Email:    req.Email,
		Password: string(hashedPassword),
	})
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.SAVE_DATA_ERROR, "user")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	return nil
}

func (userService *UserService) DeleteUser(username string) error {
	errorCode := fiber.StatusBadRequest

	user, err := userService.UserRepository.GetUserByUsername(username)
	if user.Username == "" {
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_NOT_FOUND_ERROR, "user")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	err = userService.UserRepository.DeleteUser(user)
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.DELETE_DATA_ERROR, "user")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	return nil
}

func (userService *UserService) ForgotPassword(req *types.UserForgotPasswordBody) error {
	errorCode := fiber.StatusBadRequest

	user, err := userService.UserRepository.GetUserByEmail(req.Email)
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_NOT_FOUND_ERROR, "email")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	newPassword, err := password.Generate(20, 10, 10, false, false)
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.INTERNAL_SERVER_ERROR, err.Error())
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	err = userService.SendMail(req.Email, newPassword)
	if err != nil {
		return err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), 12)
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "password")
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}

	userUpdateBody := &types.UserUpdateBody{
		Email:    user.Email,
		Username: user.Username,
		Password: string(hashedPassword),
	}

	userService.UpdateUser(user.Username, userUpdateBody)
	return nil
}

func (userService *UserService) SendMail(receiverMail string, newPassword string) error {
	email := receiverMail
	from := userService.Config.Smtp.From
	password := userService.Config.Smtp.Password
	to := []string{ email }

	smtpHost := userService.Config.Smtp.Host
	smtpPort := userService.Config.Smtp.Port

	message := []byte("your new password is " + newPassword)

	// Create authentication
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Send actual message
	err := smtp.SendMail(fmt.Sprintf("%s:%d", smtpHost, smtpPort), auth, from, to, message)
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.SEND_MAIL_ERROR, email, err.Error())
		return utils.BuildErrorResponse(errorCode, errorDesc)
	}
	return nil
}