<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Templates extends Model
{
    // use soft delete instead of permanent delete
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'email_templates';

    protected $fillable = ['id', 'name', 'content', 'template', 'description'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at', 'created_at'];

    /**
     * Load all for admin and paginate
     *
     * @return Paginator
     */
    public static function loadAll(): Paginator
    {
        return static::latest()
            ->paginate(10);
    }

    /**
     * Load all for logged in user and paginate
     *
     * @param $user_id
     *
     * @return Paginator
     */
    public static function loadAllMine(int $user_id): Paginator
    {
        return static::latest()
            ->mine($user_id)
            ->paginate();
    }
    
    /**
     * load all published with pagination
     *
     * @return Paginator
     */
    public static function loadAllPublished(): Paginator
    {
        return static::with([
            'user' => function (BelongsTo $query) {
                $query->select('id', 'name');
            },
        ])
            ->latest()
            ->published()
            ->paginate();
    }

    /**
     * load one published
     *
     * @param string $slug
     *
     * @return \App\Article
     */
    public static function loadPublished(string $slug): Article
    {
        return static::with([
            'user' => function (Builder $query) {
                $query->select('id', 'name');
            },
        ])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();
    }

    /**
     * Add query scope to get only published articles
     *
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where([
            'published' => true,
        ]);
    }
}
