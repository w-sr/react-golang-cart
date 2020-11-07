package middlewares

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/w-sr/react-golang-cart/backend/webserver/auth"
)

func SetMiddlewareJSON() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Content-Type", "application/json")
		c.Next()
	}
}

func SetMiddlewareAuthentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := auth.TokenValid(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": errors.New("Unauthorized")})
			c.Abort()
			return
		}
		c.Next()
	}
}
