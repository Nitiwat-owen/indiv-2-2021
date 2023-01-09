package database

import (
	"fmt"
	"context"

	"github.com/go-pg/pg/v10"
	"github.com/cucpbioinfo/Indivona/config"
)

func NewPgConnection(config *config.PgConfig) (con *pg.DB) {
	address := fmt.Sprintf("%s:%d", config.Host, config.Port)
	options := &pg.Options{
		User:     config.User,
		Password: config.Password,
		Addr:     address,
		Database: config.Database,
		PoolSize: config.PoolSize,
	}
	con = pg.Connect(options)

	ctx := context.Background()
	if err := con.Ping(ctx); err != nil {
		fmt.Println("[Postgres] Connection failed")
	} else {
		fmt.Println("[Postgres] Connection to postgres is established")
	}
	return con
}