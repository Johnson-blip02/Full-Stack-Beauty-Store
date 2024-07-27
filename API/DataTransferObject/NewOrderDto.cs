using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.Order;

namespace API.DataTransferObject
{
    public class NewOrderDto
    {
       public bool SaveAddress { get; set; } 
       public ShippingAddress ShippingAddress { get; set; }
    }
}