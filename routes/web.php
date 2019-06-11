<?php


Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/home', function () {
    return redirect('/dashboard');
});

Route::get('/test', 'PageController@test');
Route::get('/checktolerance', 'EmailController@check_tolerance_email');
Route::get('/alarm_dismiss', 'EmailController@alarm_dismiss');


Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Auth::routes();


Route::group(['middleware' => 'auth'], function () {
/*
|--------------------------------------------------------------------------
| PAGES CONTROLLER
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', 'PageController@admin');
Route::get('/adminlte', 'PageController@admin');
Route::get('/moldregister', 'PageController@mold_setup_registration')->middleware('UserAccess:mold_register');
Route::get('/usermgmt', 'PageController@usermgmt')->middleware('UserAccess:user_mgmt');
Route::get('/reglist', 'PageController@RegisterList');
Route::get('/trial_list', 'PageController@TrialList');
Route::get('/check_list', 'PageController@CheckList')->middleware('UserAccess:check_list');
Route::get('/review_list', 'PageController@ReviewList')->middleware('UserAccess:review_list');
Route::get('/approve_list', 'PageController@ApproveList')->middleware('UserAccess:approve_list');
Route::get('/setup_logs', 'PageController@SetupLogs')->middleware('UserAccess:setup_logs');
Route::get('/master_copy', 'PageController@MasterCopy')->middleware('UserAccess:master_copy');
Route::get('/mold_restriction', 'PageController@MoldRestriction')->middleware('UserAccess:old_restriction');
Route::get('/pdf/print/{id}/{after_id}', 'PageController@print_preview');
Route::get('/pdf/print2/{id}', 'PageController@print_preview2');
Route::get('/draft', 'PageController@Draft');

/*
|--------------------------------------------------------------------------
| AJAX CONTROLLER
|--------------------------------------------------------------------------
*/

/* USER MANAGEMENT */
Route::POST('/user/loadtable', 'AjaxController\AjaxUserMgmtController@LoadTable');
Route::POST('/user/insert', 'AjaxController\AjaxUserMgmtController@Insert');
Route::POST('/user/edit', 'AjaxController\AjaxUserMgmtController@edit');
Route::POST('/user/update', 'AjaxController\AjaxUserMgmtController@update');
Route::POST('/user/delete', 'AjaxController\AjaxUserMgmtController@delete');

/* MOLD REGISTRATION */
Route::POST('/registration/insert', 'AjaxController\AjaxRegistrationController@Insert');
Route::POST('/registration/check_ctrl', 'AjaxController\AjaxRegistrationController@CheckCtrlNo');
Route::POST('/registration/blocklist', 'AjaxController\AjaxRegistrationController@AddtoBlockList');

 /* REGISTRATION LIST */
Route::POST('/reglist/datatable', 'AjaxController\AjaxRegistrationListController@datatable');
Route::POST('/reglist/change_parameter', 'AjaxController\AjaxRegistrationListController@ChangeParameter');
Route::POST('/reglist/loadselected', 'AjaxController\AjaxRegistrationListController@LoadSelected');
Route::POST('/reglist/finishedwochange', 'AjaxController\AjaxRegistrationListController@Finished_without_change');
Route::POST('/reglist/finishedwithchange', 'AjaxController\AjaxRegistrationListController@Finished_with_change');
Route::POST('/reglist/drafts', 'AjaxController\AjaxRegistrationListController@SaveAsDrafts');


/* DRAFT CONTROLLER */
Route::POST('/draft/datatable', 'AjaxController\AjaxDraftController@datatable');
Route::POST('/draft/draftdata', 'AjaxController\AjaxDraftController@loadDraftData');




/* REASON */
Route::POST('/reason/add', 'AjaxController\AjaxRegistrationListController@add_reason');

/* ALARM NOTIFCATION */
Route::POST('/alarm/checktbl', 'AjaxController\AjaxAlarmNotificationController@Check_Alarm_tbl');
Route::POST('/alarm/check_pwd', 'AjaxController\AjaxAlarmNotificationController@Check_User');


/* TRIAL LIST */
Route::POST('/trial_list/datatable', 'AjaxController\AjaxTrialListController@datatable');


/* APPROVAL LIST */
/* checklist */
Route::POST('/check_list/datatable', 'AjaxController\AjaxCheckListController@datatable');
Route::POST('/check_list/load_record_info', 'AjaxController\AjaxCheckListController@load_record_info');
Route::POST('/check_list/load_after_data', 'AjaxController\AjaxCheckListController@load_after_data');
Route::POST('/check_list/load_before_data', 'AjaxController\AjaxCheckListController@load_before_data');
Route::POST('/check_list/mark_checked', 'AjaxController\AjaxCheckListController@mark_checked');
Route::POST('/check_list/adjustments', 'AjaxController\AjaxCheckListController@LoadAdj');
Route::POST('/check_list/delete_record', 'AjaxController\AjaxCheckListController@delete_record');
/* reviewlist */
Route::POST('/review_list/datatable', 'AjaxController\AjaxReviewListController@datatable');
Route::POST('/review_list/mark_review', 'AjaxController\AjaxReviewListController@mark_review');
/* approvelist */
Route::POST('/approve_list/datatable', 'AjaxController\AjaxApproveListController@datatable');
Route::POST('/approve_list/mark_approve', 'AjaxController\AjaxApproveListController@mark_approve');

/* SET UP LOGS  */
Route::POST('/setup_logs/datatable', 'AjaxController\AjaxSetupLogsController@datatable');
Route::POST('/setup_logs/before_data', 'AjaxController\AjaxSetupLogsController@before_data');


/* MASTER COPY */
Route::POST('/master_copy/datatable', 'AjaxController\AjaxMasterCopyController@datatable');
Route::POST('/master_copy/load_before_data', 'AjaxController\AjaxMasterCopyController@load_before_data');
Route::POST('/master_copy/load_record_info', 'AjaxController\AjaxCheckListController@load_record_info');


/* MOLD RESTRICTION */
Route::POST('/mold_restrict/reg_datatable', 'AjaxController\AjaxMoldRestrictionController@registered_list_datatable');
Route::POST('/mold_restrict/block_datatable', 'AjaxController\AjaxMoldRestrictionController@block_list_datatable');
Route::POST('/mold_restrict/addtoblocklist', 'AjaxController\AjaxMoldRestrictionController@AddToBlackList');
Route::POST('/mold_restrict/removetoblocklist', 'AjaxController\AjaxMoldRestrictionController@RemoveToBlackList');
Route::POST('/mold_restrict/view_reg_data', 'AjaxController\AjaxMoldRestrictionController@ViewRegData');


/* PDF */
Route::get('/pdf/approval', 'PdfController@pdf');



/* TIMERS */
Route::get('/timer/checklist', 'RealTimeController@checklist');
Route::get('/timer/reviewlist', 'RealTimeController@reviewlist');
Route::get('/timer/approvelist', 'RealTimeController@approvelist');


/* VIEW ARRANGEMENT GUIDEDANCE */
Route::post('/view_pdf/copy', 'AjaxController\AjaxViewArrangementController@copypdf');



});