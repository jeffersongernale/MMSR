<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;

class UserAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$modulename)
    {

        if(Auth::user()->usertype=='User')
        {
                return redirect('/reglist')->with('error','Illegal Access! Your user account is not authorized to view this module. Please contact your superior if you wish to access this module');
        }
        else{
            if($modulename=='check_list'){
                if(Auth::user()->checker!='on')
                {
                    return redirect('/reglist')->with('error','Illegal Access! Your user account is not authorized to view this module. Please contact your superior if you wish to access this module');
                }
            }
            else if($modulename=='review_list'){
                if(Auth::user()->reviewer!='on')
                {
                    return redirect('/reglist')->with('error','Illegal Access! Your user account is not authorized to view this module. Please contact your superior if you wish to access this module');
                }
            }
            else if($modulename=='approve_list'){
                if(Auth::user()->approver!='on')
                {
                    return redirect('/reglist')->with('error','Illegal Access! Your user account is not authorized to view this module. Please contact your superior if you wish to access this module');
                }
            }
        }
        


        return $next($request);
    }
}
