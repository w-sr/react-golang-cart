package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/w-sr/react-golang-cart/backend/webserver/models"
)

func (server *Server) CheckoutCart(c *gin.Context) {
	type Item struct {
		ProductID uint `json:"pid"`
		Quantity  uint `json:"quantity"`
		Price     uint `json:"price"`
	}

	type CartItemRequest struct {
		Cart   *[]Item `json:"cart`
		UserID uint    `json:"id"`
	}
	payload := CartItemRequest{}
	err := c.BindJSON(&payload)

	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"err": err.Error()})
	}

	for _, v := range *payload.Cart {
		oldItem := models.CartItem{}

		err = server.DB.Model(models.CartItem{}).Where("user_id = ? AND prod_id = ?", payload.UserID, v.ProductID).Find(&oldItem).Error

		if oldItem.ID > 0 {
			oldItem.Quantity = v.Quantity
			server.DB.Save(oldItem)
		} else {
			newItem := models.CartItem{}
			newItem.ProdID = v.ProductID
			newItem.Quantity = v.Quantity
			newItem.Price = v.Price
			newItem.UserID = payload.UserID

			err = server.DB.Model(models.CartItem{}).Create(&newItem).Error
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
				return
			}
		}
	}

	return
}

func (server *Server) GetCart(c *gin.Context) {
	vars := c.Param("id")
	uid, err := strconv.ParseUint(vars, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cart := models.CartItem{}
	carts, err := cart.FindAllCartItemByUserID(server.DB, uint(uid))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carts})
}
