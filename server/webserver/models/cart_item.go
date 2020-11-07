package models

import (
	"github.com/jinzhu/gorm"
)

type CartItem struct {
	gorm.Model
	ProdID   uint `gorm:"size:255;not null;" json:"pid"`
	Quantity uint `gorm:"size:255;not null;" json:"quantity"`
	Price    uint `gorm:"size:255" json:"price"`
	UserID   uint `gorm:"size:255" json:"uid"`
}

func (c *CartItem) FindAllCartItemByUserID(db *gorm.DB, uid uint) (*[]CartItem, error) {
	cartItems := []CartItem{}
	err := db.Model(CartItem{}).Where("user_id = ?", uid).Limit(100).Find(&cartItems).Error
	if err != nil {
		return &[]CartItem{}, err
	}
	return &cartItems, err
}
