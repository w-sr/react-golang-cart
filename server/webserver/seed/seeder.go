package seed

import (
	"log"

	"github.com/jinzhu/gorm"
	"github.com/w-sr/react-golang-cart/backend/webserver/models"
)

var products = []models.Product{
	models.Product{
		Name:        "Apple",
		Brand:       "TestBrand",
		Description: "Test Description",
		Price:       1,
		Url:         "assets/apple.png",
	},
	models.Product{
		Name:        "Banana",
		Brand:       "TestBrand",
		Description: "Test Description",
		Price:       2,
		Url:         "assets/banana.png",
	},
	models.Product{
		Name:        "Pear",
		Brand:       "TestBrand",
		Description: "Test Description",
		Price:       3,
		Url:         "assets/pear.png",
	},
	models.Product{
		Name:        "Orange",
		Brand:       "TestBrand",
		Description: "Test Description",
		Price:       4,
		Url:         "assets/orange.png",
	},
}

func Load(db *gorm.DB) {
	err := db.AutoMigrate(&models.User{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

	err = db.DropTableIfExists(&models.Product{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}

	err = db.AutoMigrate(&models.Product{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

	for i, _ := range products {
		err = db.Model(&models.Product{}).Create(&products[i]).Error
		if err != nil {
			log.Fatalf("cannot seed products table: %v", err)
		}
	}

	err = db.AutoMigrate(&models.CartItem{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

}
