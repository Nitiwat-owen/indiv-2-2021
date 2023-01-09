package utils

import (
	"github.com/gofiber/fiber/v2"
)

func BuildErrorResponse(code int, msg string) error {
	return &fiber.Error{
		Code:    code,
		Message: msg,
	}
}

func BuildErrorResponseWithOpts[T any](in T, code int, msg string) (out T, err error) {
	return in, &fiber.Error{
		Code:    code,
		Message: msg,
	}
}
