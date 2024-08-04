using System;
using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) 
                return query.OrderBy(p => p.Name);

            return orderBy.ToLower() switch
            {
                "price" => query.OrderBy(p => p.Price),
                "pricedesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string category)
        {
            var brandList = string.IsNullOrEmpty(brands)
                ? new List<string>()
                : brands.ToLower().Split(',').ToList();
            var categoryList = string.IsNullOrEmpty(category)
                ? new List<string>()
                : category.ToLower().Split(',').ToList();

            query = brandList.Count > 0 
                ? query.Where(p => brandList.Contains(p.Brand.ToLower())) 
                : query;
            
            query = categoryList.Count > 0 
                ? query.Where(p => categoryList.Contains(p.Category.ToLower())) 
                : query;

            return query;
        }
    }
}
