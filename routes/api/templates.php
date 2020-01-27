<?php

use Illuminate\Support\Facades\Route;

Route::get('published', 'TemplateController@publishedTemplates')->name('templates.published.index');
Route::get('published/{id}', 'TemplateController@publishedTemplate')->name('templates.published.show');

// Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'TemplateController@store')->name('templates.store');
    Route::get('/', 'TemplateController@index')->name('templates.index');
    Route::get('/{id}', 'TemplateController@show')->name('templates.show');
    Route::match(['put', 'patch'], '/{id}', 'TemplateController@update')->name('templates.update');
    Route::match(['put', 'patch'], '/{id}/template', 'TemplateController@updateTemplate')->name('templates.updateTemplate');
    Route::delete('/{id}', 'TemplateController@delete')->name('templates.delete');
// });
