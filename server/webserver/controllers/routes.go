package controllers

import "github.com/w-sr/react-golang-cart/backend/webserver/middlewares"

func (s *Server) initializeRoutes() {

	s.Router.POST("/api/auth/login", s.Login)
	s.Router.POST("/api/auth/register", s.Register)

	// Cart routes
	group := s.Router.Group("/api")
	group.Use(middlewares.SetMiddlewareAuthentication())
	{
		group.POST("/cart", s.CheckoutCart)
		group.GET("/cart/:id", s.GetCart)

		group.GET("/product", s.GetProducts)
	}
}
