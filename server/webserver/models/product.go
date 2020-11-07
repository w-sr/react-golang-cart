package models

import (
	"github.com/jinzhu/gorm"
)

type Product struct {
	gorm.Model
	Name        string `gorm:"size:255;not null;unique" json:"name"`
	Brand       string `gorm:"size:255;not null;uniqure" json:"brand"`
	Description string `gorm:"size:255" json:"description"`
	Url         string `gorm:"size:255" json:"url"`
	Price       uint   `json:"price"`
}

func (p *Product) FindAllProducts(db *gorm.DB) (*[]Product, error) {
	products := []Product{}
	err := db.Find(&products).Error

	if err != nil {
		return &[]Product{}, err
	}

	return &products, err
}
