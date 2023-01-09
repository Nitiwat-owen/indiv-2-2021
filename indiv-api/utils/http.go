package utils

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/constants"
)

func ErrorHandler(ctx *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	e, ok := err.(*fiber.Error)
	if ok {
		code = e.Code
	}
	err = ctx.Status(code).JSON(types.BaseResponse{
		Result:		false,
		Message:	Capitalize(e.Message),
	})
	if err != nil {
		errorDesc := fmt.Sprintf(constants.MessageCode.INTERNAL_SERVER_ERROR, err.Error())
		return ctx.Status(fiber.StatusInternalServerError).SendString(errorDesc)
	}
	return nil
}