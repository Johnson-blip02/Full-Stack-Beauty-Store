using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context){
            if(context.Products.Any()) return;

            var products = new List<Product>{

                                new Product{
                    Name = "Blush Brush",
                    Price = 15,
                    PictureUrl = "/img/products/BlushBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Scrunchies",
                    Price = 4,
                    PictureUrl = "/img/products/Scrunchies.jpg",
                    Brand = "Siren",
                    StockQuantity = 300,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Blending Brush",
                    Price = 10,
                    PictureUrl = "/img/products/BlendingBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Shadow Brush",
                    Price = 18,
                    PictureUrl = "/img/products/ShadowBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 400,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Liner Brush",
                    Price = 15,
                    PictureUrl = "/img/products/LinerBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 200,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Hair Ribbon",
                    Price = 5,
                    PictureUrl = "/img/products/HairRibbon.jpg",
                    Brand = "Allure",
                    StockQuantity = 400,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Hot Air Brush",
                    Price = 18,
                    PictureUrl = "/img/products/HotAirBrush.jpg",
                    Brand = "Silver Curls",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Mascara",
                    Price = 16,
                    PictureUrl = "/img/products/Mascara.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Foundation",
                    Price = 12,
                    PictureUrl = "/img/products/Foundation.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 300,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Eye Shadow",
                    Price = 13,
                    PictureUrl = "/img/products/EyeShadow.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 600,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Lip Gloss",
                    Price = 15,
                    PictureUrl = "/img/products/LipGloss.jpg",
                    Brand = "Cala",
                    StockQuantity = 400,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Lipstick",
                    Price = 18,
                    PictureUrl = "/img/products/LipStick.jpg",
                    Brand = "Cala",
                    StockQuantity = 200,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Concealer",
                    Price = 10,
                    PictureUrl = "/img/products/Concealer.jpg",
                    Brand = "Diane",
                    StockQuantity = 400,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Cleanser",
                    Price = 30,
                    PictureUrl = "/img/products/Cleanser.jpg",
                    Brand = "Aspect",
                    StockQuantity = 200,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Moisturising Cream",
                    Price = 20,
                    PictureUrl = "/img/products/MoisturisingCream.jpg",
                    Brand = "Allure",
                    StockQuantity = 300,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Ointment",
                    Price = 15,
                    PictureUrl = "/img/products/Ointment.jpg",
                    Brand = "Cala",
                    StockQuantity = 500,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Eye Mask",
                    Price = 21,
                    PictureUrl = "/img/products/EyeMask.jpg",
                    Brand = "Cala",
                    StockQuantity = 600,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Day Cream",
                    Price = 28,
                    PictureUrl = "/img/products/DayCream.jpg",
                    Brand = "Aspect",
                    StockQuantity = 100,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Clay Mask",
                    Price = 25,
                    PictureUrl = "/img/products/ClayMask.jpg",
                    Brand = "Allure",
                    StockQuantity = 200,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Shampoo",
                    Price = 20,
                    PictureUrl = "/img/products/Shampoo.jpg",
                    Brand = "Pure",
                    StockQuantity = 800,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Conditioner",
                    Price = 20,
                    PictureUrl = "/img/products/Conditioner.jpg",
                    Brand = "Allure",
                    StockQuantity = 800,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Detox",
                    Price = 22,
                    PictureUrl = "/img/products/Detox.jpg",
                    Brand = "Aspect",
                    StockQuantity = 500,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Revival Creme",
                    Price = 28,
                    PictureUrl = "/img/products/RevivalCreme.jpg",
                    Brand = "Cala",
                    StockQuantity = 300,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Molding Paste",
                    Price = 35,
                    PictureUrl = "/img/products/MoldingPaste.jpg",
                    Brand = "Allure",
                    StockQuantity = 200,
                    Category = "HAIRCARE"
                },
            };
            //Loop the data inside here
            context.Products.AddRange(products);
            context.SaveChanges();
         }
    }
}