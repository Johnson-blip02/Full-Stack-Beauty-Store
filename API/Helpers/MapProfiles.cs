using API.DataTransferObject;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class MapProfiles : Profile
    {
        public MapProfiles(){
            CreateMap<CreationProductDto, Product>();
            CreateMap<EditProductDto, Product>();
        }
    }
}