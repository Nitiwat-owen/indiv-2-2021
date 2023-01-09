package models

type User struct {
	tableName struct{}  `pg:"user"`
	Username  string 	`pg:"username,pk"`
	Email     string    `pg:"email"`
	Password  string    `pg:"password"`
}