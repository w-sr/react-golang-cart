package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/w-sr/react-golang-cart/backend/webserver/auth"
	"github.com/w-sr/react-golang-cart/backend/webserver/models"
	"github.com/w-sr/react-golang-cart/backend/webserver/utils"
	"golang.org/x/crypto/bcrypt"
)

func (server *Server) Login(c *gin.Context) {
	user := models.User{}
	err := c.BindJSON(&user)

	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	err = user.Validate("login")
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	newUser, err := server.SignIn(user.UserName, user.Password)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Password or username was not matched"})
		return
	}

	token, err := auth.CreateToken(newUser.Model.ID)
	if err != nil {
		formattedError := utils.FormatError(err.Error())
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": formattedError.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": *newUser, "token": token})
}

func (server *Server) SignIn(username string, password string) (*models.User, error) {
	var err error

	user := models.User{}
	err = server.DB.Where("user_name = ?", username).Find(&user).Error
	if err != nil {
		return nil, err
	}

	err = models.VerifyPassword(user.Password, password)
	if err != nil || err == bcrypt.ErrMismatchedHashAndPassword {
		return nil, err
	}

	return &user, nil
}

func (server *Server) Register(c *gin.Context) {
	user := models.User{}
	err := c.BindJSON(&user)

	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"err": err.Error()})
	}

	err = user.Validate("register")
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"err": err.Error()})
		return
	}

	userCreated, err := user.SaveUser(server.DB)

	if err != nil {
		formattedError := utils.FormatError(err.Error())

		c.JSON(http.StatusInternalServerError, gin.H{"err": formattedError.Error()})
		return
	}

	c.Header("Location", fmt.Sprintf("%s%s/%d", c.Request.Host, c.Request.RequestURI, userCreated.ID))
	c.JSON(http.StatusCreated, gin.H{"user": userCreated})
}
