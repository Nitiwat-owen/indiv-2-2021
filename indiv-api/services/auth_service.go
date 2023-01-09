package services

import (
	"fmt"
    "time"

	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/utils"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/config"
	"github.com/cucpbioinfo/Indivona/constants"
	"github.com/cucpbioinfo/Indivona/repositories"
)

type AuthService struct {
	Config config.Config
	UserRepository *repositories.UserRepository
}

func NewAuthService(config config.Config, userRepository *repositories.UserRepository) *AuthService {
	return &AuthService{ 
		Config: config,
		UserRepository: userRepository,
	}
}

func (authService *AuthService) Login(req *types.LoginBody) (string, error) {
	user, err := authService.UserRepository.GetUserByUsername(req.Username)
	if user.Username == "" {
		errorCode := fiber.StatusBadRequest
		errorDesc := fmt.Sprintf(constants.MessageCode.DATA_NOT_FOUND_ERROR, "user")
		return utils.BuildErrorResponseWithOpts("", errorCode, errorDesc)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		errorCode := fiber.StatusUnauthorized
		errorDesc := fmt.Sprintf(constants.MessageCode.INVALID_PARAM_ERROR, "credentials")
		return utils.BuildErrorResponseWithOpts("", errorCode, errorDesc)
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Username,
		ExpiresAt: time.Now().Add(time.Hour * 1).Unix(), 
	})
  
	token, err := claims.SignedString([]byte(authService.Config.Application.SecretKey))
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.INTERNAL_SERVER_ERROR, err.Error())
		return utils.BuildErrorResponseWithOpts("", errorCode, errorDesc)
	}

	return token, nil
}