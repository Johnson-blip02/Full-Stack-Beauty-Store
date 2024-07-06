using API.Models;

namespace API.Data
{
    public static class DbInitial
    {
        public static void Inital(StoreData context){
            if(context.Products.Any()) return;

            var products = new List<Product>{

                new Product{
                    Name = "Blush Brush",
                    Price = 15,
                    PictureURL = "/images/products/BlushBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Scrunchies",
                    Price = 4,
                    PictureURL = "/imgages/boot-redis1.png",
                    Brand = "Siren",
                    StockQuantity = 300,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Blending Brush",
                    Price = 10,
                    PictureURL = "/clientSide/public/img/BlendingBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Shadow Brush",
                    Price = 18,
                    PictureURL = "/clientSide/public/img/ShadowBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 400,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Liner Brush",
                    Price = 15,
                    PictureURL = "/clientSide/public/img/LinerBrush.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 200,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Hair Ribbon",
                    Price = 5,
                    PictureURL = "/clientSide/public/img/HairRibbon.jpg",
                    Brand = "Allure",
                    StockQuantity = 400,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Hot Air Brush",
                    Price = 18,
                    PictureURL = "/clientSide/public/img/HotAirBrush.jpg",
                    Brand = "Silver Curls",
                    StockQuantity = 500,
                    Category = "ACCESSORIES"
                },
                new Product{
                    Name = "Mascara",
                    Price = 16,
                    PictureURL = "/clientSide/public/img/Mascara.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 500,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Foundation",
                    Price = 12,
                    PictureURL = "/clientSide/public/img/Foundation.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 300,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Eye Shadow",
                    Price = 13,
                    PictureURL = "/clientSide/public/img/EyeShadow.jpg",
                    Brand = "BodyHealth",
                    StockQuantity = 600,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Lip Gloss",
                    Price = 15,
                    PictureURL = "/clientSide/public/img/LipGloss.jpg",
                    Brand = "Cala",
                    StockQuantity = 400,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Lipstick",
                    Price = 18,
                    PictureURL = "/clientSide/public/img/LipStick.jpg",
                    Brand = "Cala",
                    StockQuantity = 200,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Concealer",
                    Price = 10,
                    PictureURL = "/clientSide/public/img/Concealer.jpg",
                    Brand = "Diane",
                    StockQuantity = 400,
                    Category = "MAKEUP"
                },
                new Product{
                    Name = "Cleanser",
                    Price = 30,
                    PictureURL = "/clientSide/public/img/Cleanser.jpg",
                    Brand = "Aspect",
                    StockQuantity = 200,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Moisturising Cream",
                    Price = 20,
                    PictureURL = "/clientSide/public/img/MoisturisingCream.jpg",
                    Brand = "Allure",
                    StockQuantity = 300,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Ointment",
                    Price = 15,
                    PictureURL = "/clientSide/public/img/Ointment.jpg",
                    Brand = "Cala",
                    StockQuantity = 500,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Eye Mask",
                    Price = 21,
                    PictureURL = "/clientSide/public/img/EyeMask.jpg",
                    Brand = "Cala",
                    StockQuantity = 600,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Day Cream",
                    Price = 28,
                    PictureURL = "/clientSide/public/img/DayCream.jpg",
                    Brand = "Aspect",
                    StockQuantity = 100,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Clay Mask",
                    Price = 25,
                    PictureURL = "/clientSide/public/img/ClayMask.jpg",
                    Brand = "Allure",
                    StockQuantity = 200,
                    Category = "SKINCARE"
                },
                new Product{
                    Name = "Shampoo",
                    Price = 20,
                    PictureURL = "/clientSide/public/img/Shampoo.jpg",
                    Brand = "Pure",
                    StockQuantity = 800,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Conditioner",
                    Price = 20,
                    PictureURL = "/clientSide/public/img/Conditioner.jpg",
                    Brand = "Allure",
                    StockQuantity = 800,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Detox",
                    Price = 22,
                    PictureURL = "/clientSide/public/img/Detox.jpg",
                    Brand = "Aspect",
                    StockQuantity = 500,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Revival Creme",
                    Price = 28,
                    PictureURL = "/clientSide/public/img/RevivalCreme.jpg",
                    Brand = "Cala",
                    StockQuantity = 300,
                    Category = "HAIRCARE"
                },
                new Product{
                    Name = "Molding Paste",
                    Price = 35,
                    PictureURL = "/clientSide/public/img/MoldingPaste.jpg",
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