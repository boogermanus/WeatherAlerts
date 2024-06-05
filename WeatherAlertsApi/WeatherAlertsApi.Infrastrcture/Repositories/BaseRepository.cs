using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using WeatherAlertsApi.Core.Interfaces;

namespace WeatherAlertsApi.Infrastrcture.Repositories;

public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, IEntity
{
    private readonly AppDbContext _context;
    protected DbSet<TEntity> Entities => _context.Set<TEntity>();
    protected AppDbContext DbContext => _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
    }
    public virtual async Task<TEntity> Add(TEntity entity)
    {
        await Entities.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<TEntity> Delete(int id)
    {
        var existing = await Get(id);

        if(existing == null)
            return null;

        Entities.Remove(existing);

        await _context.SaveChangesAsync();

        return existing;
    }

    public async Task<TEntity> Get(int id)
    {
        return await Entities.FindAsync(id);
    }

    public virtual async Task<IEnumerable<TEntity>> GetAll()
    {
        return await Entities.ToListAsync();
    }

    public virtual async Task<TEntity> Update(TEntity entity)
    {
        var existing = await Get(entity.Id);

        if(existing == null)
            return null;

        _context.Entry(existing)
        .CurrentValues
        .SetValues(existing);

        Entities.Update(existing);

        await _context.SaveChangesAsync();

        return existing;
    }
}