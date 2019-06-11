<aside class="main-sidebar">
<section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image" >
            <img src="{{asset('upload/picture/'.substr(Auth::user()->picture,13))}}" style="border-color: white" class="img-circle" alt="User Image" >
          </div>
          <div class="pull-left info">
          <p>{{Auth::user()->name}}</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <!-- search form -->
        <form action="#" method="get" class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
        </form>
        <!-- /.search form -->
        
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">MAIN NAVIGATION</li>
            <li class="{{ Request::is('dashboard') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/dashboard'">
              <a href="#">
                <i class="fa fa-dashboard"></i> <span>Dashboard</span>
              </a>
            </li>
            <li class="{{ Request::is('moldregister') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/moldregister'">
              <a href="#">
                <i class="fa fa-plus-square"></i> <span>Mold Machine Registration</span>
              </a>
            </li>
            <li class="{{ Request::is('reglist') ? 'active' : '' }} treeview" onclick = "window.location.href = '/MMSR/public/reglist'">
                <a href="#">
                  <i class="fa fa-list"></i>
                  <span>Registered List</span>
                </a>
              </li>
              <li class=" {{ Request::is('trial_list') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/trial_list'">
                <a href="#">
                  <i class="fa fa-clock-o"></i> <span>Trial List</span>
                </a>
              </li>
              <li class="{{ Request::is('check_list') ? 'active' : '' }} {{ Request::is('review_list') ? 'active' : '' }} {{ Request::is('approve_list') ? 'active' : '' }}  treeview">
                <a href="#">
                  <i class="fa fa-check-square-o"></i>
                  <span>Approval List</span>
                 
                  <span class="pull-right-container">
                      {{-- <i class="fa fa-angle-left pull-right"></i> --}}
                      {{-- <small class="label pull-right bg-green" id="total_id">0</small> --}}
                      
                    </span>
                </a>
                
                <ul class="treeview-menu">
               
                       
                      
                  <li class="{{ Request::is('check_list') ? 'active' : '' }}">
                    <a href="/MMSR/public/check_list"> 
                      <i class="fa fa-check-circle"></i> List to Check
                      <span class="label label-primary pull-right" id="check_id">0</span>
                    </a> 
                  </li>
                  
                  <li class="{{ Request::is('review_list') ? 'active' : '' }}">
                    <a href="/MMSR/public/review_list"><i class="fa fa-eye"></i> List to Review
                      <span class="label bg-red pull-right" id="review_id">0</span>
                    </a>
                   
                  </li>
                  <li class="{{ Request::is('approve_list') ? 'active' : '' }}">
                    <a href="/MMSR/public/approve_list"><i class="fa fa-check"></i> List to Approve
                      <span class="label bg-yellow pull-right" id="approve_id">0</span>
                    </a>
                   
                  </li>
                </ul>
              </li>
              <li class="{{ Request::is('setup_logs') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/setup_logs'">
                <a href="#">
                  <i class="fa fa-database"></i>
                  <span>Setup Log</span>
                </a>
              </li>
              <li class="{{ Request::is('master_copy') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/master_copy'">
                <a href="#">
                  <i class="fa fa-list-ol"></i> <span>Master Copy</span>
                </a>
              </li>
              <li class=" {{ Request::is('mold_restriction') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/mold_restriction'">
                <a href="#">
                  <i class="fa fa-exclamation-triangle"></i> <span>Mold Restriction</span>
                </a>
              </li>
              <li class="{{ Request::is('usermgmt') ? 'active' : '' }}  treeview" onclick = "window.location.href = '/MMSR/public/usermgmt'">
                <a href="#">
                  <i class="fa fa-user-plus"></i> <span>User Management</span>
                </a>
              </li>
        </ul>
      </section>
</aside>