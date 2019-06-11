<div class="modal fade modal_alarm " tabindex="-1" role="dialog" data-id='0' data-backdrop="static" data-keyboard="false" style=" z-index: 9999">
        <div class="modal-dialog modal-dialog-centered mod_alarm" role="document">
          <div class="modal-content">
            <div class="modal-header" style="background-image:url({{asset('images/alert_bkg.jpg')}}">
              <h3 class="modal-title text-center" style="color:yellow;font-weight:bold;background-color:black">WARNING!!</h3>
              {{-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button> --}}
            </div>
            <div class="modal-body text-center">
                <img src="{{asset('images/alarm.gif')}}"class="alarm_gif">
                
                <h1>CALL THE ATTENTION OF YOUR AREA IN CHARGE/PE STAFF</h1>
                <div class="alert alert-danger alert-dismissible alert_error" style="text-align: left;display:none">
                 {{--  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> --}}
                  <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                  Incorrect username/password or user account is not authorized to dismiss this alarm.
                </div>
                <input class="form-control col-lg-6" type="text" id="txt_username" placeholder="Username">
                <br><br>
                <input class="form-control col-lg-6" type="password" id="pwd_PIC" placeholder="PIC Password" onkeypress="return EnterEvent(event)">
                <br>
            </div>
            <div class="modal-footer text-center">
              {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
              <button type="submit" class="btn btn-danger btn-lg" onclick="Alarm.CheckPICPassword()">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>