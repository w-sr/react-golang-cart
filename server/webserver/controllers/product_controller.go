package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/w-sr/react-golang-cart/backend/webserver/models"
)

func (server *Server) GetProducts(c *gin.Context) {
	product := models.Product{}
	products, err := product.FindAllProducts(server.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": products})
}
