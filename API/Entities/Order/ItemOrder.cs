using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.Order
{
    [Owned]
    public class ItemOrder
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}