<?php

namespace App\Http\Controllers\Api;

use App\Templates;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\TemplateRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
        // if ($request->user()->is_admin) {
        //     return Article::loadAll();
        // }
        return Templates::loadAll();
    }

    /**
     * get all published articles
     *
     * @return mixed
     */
    public function publishedTemplates()
    {
        return Templates::loadAllPublished();
    }

    /**
     * Get single published article
     *
     * @param $slug
     * @return mixed
     */
    public function publishedTemplate($slug)
    {
        return Templates::loadPublished($slug);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TemplateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TemplateRequest $request)
    {
        $user = $request->user();

        $template = new Templates($request->validated());

        $template->save();

        return response()->json($template, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // if (!$request->user()->is_admin) {
        //     return Templates::mine($request->user()->id)->findOrFail($id);
        // }

        return Templates::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TemplateRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(TemplateRequest $request, $id)
    {
        $template = Templates::findOrFail($id);

        $data = $request->validated();
        $template->update($data);

        return response()->json($template, 200);
    }

    /**
     * Update the specified template in storage.
     *
     * @param TemplateRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function updateTemplate(Request $request, $id)
    {
        $jsonTemplate = $request->get('template');
        $html = $request->get('content');

        $template = Templates::updateOrCreate(
            ['id' => $id],
            [
                'template' => json_encode($jsonTemplate),
                'content' => $html
            ]
        );

        return response()->json($template, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $template = Templates::findOrFail($id);

        $template->delete();

        return response([], 200);
    }
}
