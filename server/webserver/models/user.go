package models

import (
	"errors"
	"strings"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	UserName string `gorm:"size:255;not null;unique" json:"username"`
	Email    string `gorm:"size:255;not null;uniqure" json:"email"`
	Avatar   string `gorm:"size:255" json:"avatar"`
	Password string `gorm:"size:100;not null;" json:"password"`
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func (u *User) BeforeSave() error {
	hashedPassword, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) Validate(action string) error {
	switch strings.ToLower(action) {
	case "register":
		if u.Email == "" {
			return errors.New("Required Email")
		}
		if u.UserName == "" {
			return errors.New("Required Username")
		}
		if u.Password == "" {
			return errors.New("Required Password")
		}

		return nil

	case "login":
		if u.Password == "" {
			return errors.New("Required Password")
		}

		return nil

	default:
		if u.UserName == "" {
			return errors.New("Required Username")
		}
		if u.Password == "" {
			return errors.New("Required Password")
		}
		return nil
	}
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {

	newUser := User{}

	newUser.Password = u.Password
	newUser.UserName = u.UserName
	newUser.Email = u.Email
	var err error

	err = db.Create(&newUser).Error
	if err != nil {
		return &User{}, err
	}
	return &newUser, nil
}

func (u *User) FindUserByID(db *gorm.DB, uid uint) (*User, error) {
	var err error
	err = db.Model(User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	if gorm.IsRecordNotFoundError(err) {
		return &User{}, errors.New("User Not Found")
	}
	return u, err
}
