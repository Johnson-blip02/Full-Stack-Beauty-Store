using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PageList<T> : List<T>
    {
        public PageList(List<T> items, int count, int pageNum,
        int pageSize)
        {
            MetaData = new MetaData{
                TotalCount = count,
                PageSize = pageSize,
                CurrentPageNum = pageNum,
                TotalPage = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public MetaData MetaData { get; set; }

        public static async Task<PageList<T>> ToPagedList(IQueryable<T> query, int pageNum, int pageSize){
            var count = await query.CountAsync();
            var items = await query.Skip((pageNum-1)*pageSize).Take(pageSize).ToListAsync();
            return new PageList<T>(items, count, pageNum, pageSize);
        }
    }
}