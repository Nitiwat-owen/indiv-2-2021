package server

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/utils"
	"github.com/cucpbioinfo/Indivona/config"
	"github.com/cucpbioinfo/Indivona/services"
	"github.com/cucpbioinfo/Indivona/database"
	"github.com/cucpbioinfo/Indivona/middlewares"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/cucpbioinfo/Indivona/controllers"
	"github.com/cucpbioinfo/Indivona/repositories"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func StartServer() {
	app := fiber.New(fiber.Config{
		ErrorHandler: utils.ErrorHandler,
	})
	app.Use(recover.New())
	app.Use(cors.New())
	app.Use(logger.New())

	config := config.ReadConfig()
	dbConnection := database.NewPgConnection(&config.Postgres)
	defer dbConnection.Close()

	userRepository := repositories.NewUserRepository(dbConnection)
	userService := services.NewUserService(config, userRepository)

	authMiddleware := middlewares.NewAuthMiddleware(config, userService)

	authService := services.NewAuthService(config, userRepository)

	dataAnlysRepository := repositories.NewDataAnlysRepository(dbConnection)
	drugAnlysRepository := repositories.NewDrugAnlysRepository(dbConnection)

	drugAnlysService := services.NewDrugAnlysService(dataAnlysRepository, drugAnlysRepository)

	userController := controllers.NewUserController(userService)
	authController := controllers.NewAuthController(authService)
	drugAnlysController := controllers.NewDrugAnlysController(drugAnlysService)

	app.Get("/api/v1/users/:username", authMiddleware.AuthenticationRequired, userController.GetUser)
	app.Get("/api/v1/users", authMiddleware.AuthenticationRequired, userController.GetUsers)
	app.Post("/api/v1/users/register", userController.Register)
	app.Put("/api/v1/users/:username", authMiddleware.AuthenticationRequired, userController.UpdateUser)
	app.Delete("/api/v1/users/:username", authMiddleware.AuthenticationRequired, userController.DeleteUser)
	app.Post("/api/v1/users/forgotPassword", userController.ForgotPassword)

	app.Post("/api/v1/auth/login", authController.Login)

	// app.Get("/api/v1/drug/bindingAffinityPrediction", authMiddleware.AuthenticationRequired, drugAnlysController.BindingAffinityPrediction)
	app.Get("/api/v1/drug/:id", authMiddleware.AuthenticationRequired, drugAnlysController.GetDataAnlysInfo)
	app.Post("/api/v1/drug/searchBindingAffinity", authMiddleware.AuthenticationRequired, drugAnlysController.SearchBindingAffinityResults)
	app.Post("/api/v1/drug/readfile", authMiddleware.AuthenticationRequired, drugAnlysController.HandleSubmission)
	//http.HandleFunc("/api/v1/drug/readfile", drugAnlysController.HandleSubmission)
	//http.ListenAndServe(":8080", nil)
	app.Listen(fmt.Sprintf(":%d", config.Application.Port))
}