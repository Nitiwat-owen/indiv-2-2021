package middlewares

import (
	"fmt"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/config"
	"github.com/cucpbioinfo/Indivona/services"
)

type AuthMiddlewareCtx struct {
	Config config.Config
	UserService *services.UserService
}

func NewAuthMiddleware(config config.Config, userService *services.UserService) *AuthMiddlewareCtx {
	return &AuthMiddlewareCtx{
		Config: config,
		UserService: userService,
	}
}

func (ctx AuthMiddlewareCtx) AuthenticationRequired(c *fiber.Ctx) error {
	authorizationHeader := string(c.Request().Header.Peek("Authorization"))
	
	if strings.HasPrefix(authorizationHeader, "Bearer ") {
		token, err := jwt.Parse(authorizationHeader[7:], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				c.Request().Header.Set("WWW-Authenticate", "Basic realm=Restricted")
				return fiber.ErrUnauthorized, nil
			}
			return []byte(ctx.Config.Application.SecretKey), nil
		})
		if err != nil {
			c.Request().Header.Set("WWW-Authenticate", "Basic realm=Restricted")
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid access token")
		}
		if token.Valid {
			claims, _ := token.Claims.(jwt.MapClaims)
			username := fmt.Sprint(claims["iss"])
			user, err := ctx.UserService.GetUserByUsername(username)
			if (err != nil) {
				c.Request().Header.Set("WWW-Authenticate", "Basic realm=Restricted")
				return fiber.ErrUnauthorized
			}
			c.Locals("user", user)
			c.Next()
			return nil
		}
	}

	c.Request().Header.Set("WWW-Authenticate", "Basic realm=Restricted")
	return fiber.ErrUnauthorized
}