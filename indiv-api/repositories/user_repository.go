package repositories

import (
	"github.com/go-pg/pg/v10"
	"github.com/cucpbioinfo/Indivona/models"
)

type UserRepository struct {
	pg *pg.DB
}

func NewUserRepository(pg *pg.DB) *UserRepository {
	return &UserRepository{
		pg: pg,
	}
}

func (userRepository UserRepository) GetUserByUsername(username string) (models.User, error) {
	user := &models.User{Username: username}
	err := userRepository.pg.Model(user).WherePK().Limit(1).Select()
	if err != nil {
		return models.User{}, err
	}
	return *user, nil
}

func (userRepository UserRepository) GetUsers() ([]models.User, error) {
	var users []models.User
	
	query := userRepository.pg.Model(&users)
	err := query.Select()

	if err != nil {
		return make([]models.User, 0), err
	}
	return users, nil
}

func (userRepository UserRepository) CreateUser(user models.User) error  {
	tx, err := userRepository.pg.Begin()
	if err != nil {
		return err
	}
	_, err = tx.Model(&user).Insert()
	if err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

func (userRepository UserRepository) UpdateUser(user models.User) error  {
	tx, err := userRepository.pg.Begin()
	if err != nil {
		return err
	}
	_, err = tx.Model(&user).Where("username = ?", user.Username).Update()
	if err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

func (userRepository UserRepository) DeleteUser(user models.User) error  {
	tx, err := userRepository.pg.Begin()
	if err != nil {
		return err
	}
	_, err = tx.Model(&user).Where("username = ?", user.Username).Delete()
	if err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

func (userRepository UserRepository) GetUserByEmail(email string) (models.User, error) {
	user := &models.User{Email: email}
	err := userRepository.pg.Model(user).Where("email = ?", email).Limit(1).Select()
	if err != nil {
		return models.User{}, err
	}
	return *user, nil
}