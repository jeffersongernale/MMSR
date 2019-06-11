
<!-- Modal -->
<div class="modal fade modal_view_data" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
aria-hidden="true" onscroll="Scrolling.onscrolling();" data-id="0" data-main="0">
    <div class="modal-dialog no-print" role="document" style="width: 90vw" >
      <div class="modal-content">

        <div class="modal-header">
            <button type="button" class="btn btn-danger btn-lg" onclick="view_pdf.copy_pdf()"> <i class="fa fa-file-pdf-o"></i>&nbsp&nbspVIEW ARRANGEMENT GUIDANCE</button>
            <button type="button" class="btn btn-warning btn-lg" id="adj_hist_btn"> <i class="fa fa-book"></i>&nbspVIEW ADJUSTMENT HISTORY</button>
            <button type="button" class="btn btn-primary btn-lg" onclick = "Print_Data.Print_Info();"> <i class="fa fa-print"></i>&nbsp&nbspPRINT</button>
            {{-- <a href="{{url('/pdf/approval')}}"> PRINT </a> --}}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" style="font-size: 2em;">&times;</span>
          </button>
        </div>

        <div class="modal-body" id="printable-area">

          @include('pages.approval_list.modal.modal_contents.record_info')

            <div class="row">
                <div class="col-sm-4 mold_sheet">
                    @include('pages.approval_list.modal.modal_contents.mold_checksheet.mold_die_basic_info')
                    @include('pages.approval_list.modal.modal_contents.mold_checksheet.mold_set_up_checksheet')
                    @include('pages.approval_list.modal.modal_contents.mold_checksheet.raw_mats')
                    @include('pages.approval_list.modal.modal_contents.mold_checksheet.production_data')
                    @include('pages.approval_list.modal.modal_contents.mold_checksheet.production_SPQ')
                </div>
                <div class="col-sm-4 get_id">
                        <table class="table table-bordered text-center table-striped bold-text">
                            <tr>
                                <td colspan="4">RECORD BEFORE PRODUCTION</td>
                            </tr>
                            <tr>
                                <td>CTRL#: </td>
                                <td><input type="text" readonly class="form-control" id="txt_before_ctrl_no"></td>
                                <td>DATE: </td>
                                <td><input type="text" readonly class="form-control" id="txt_before_date"></td>
                            </tr>
                        </table>
                        @include('pages.approval_list.modal.modal_contents.before_production.mct_setting')
                        @include('pages.approval_list.modal.modal_contents.before_production.product_info')
                        @include('pages.approval_list.modal.modal_contents.before_production.clamp_eject')
                        @include('pages.approval_list.modal.modal_contents.before_production.cylinder_temp')
                        @include('pages.approval_list.modal.modal_contents.before_production.inj_pack')
                        @include('pages.approval_list.modal.modal_contents.before_production.measuring_condition')

                        <b>Registered By: </b><br>
                        <span style="text-decoration: underline;font-size: 2em" class="reg_name"> </span>
                </div>
                <div class="col-sm-4">
                        <table class="table table-bordered text-center table-striped bold-text">
                          <tr>
                              <td colspan="4">RECORD AFTER PRODUCTION</td>
                          </tr>
                          <tr>
                              <td>CTRL#: </td>
                              <td><input type="text" readonly class="form-control" id="txt_after_ctrl_no"></td>
                              <td>DATE: </td>
                              <td><input type="text" readonly class="form-control" id="txt_after_date"></td>
                          </tr>
                      </table>
                      @include('pages.approval_list.modal.modal_contents.after_production.mct_setting')
                      @include('pages.approval_list.modal.modal_contents.after_production.product_info')
                      @include('pages.approval_list.modal.modal_contents.after_production.clamp_eject')
                      @include('pages.approval_list.modal.modal_contents.after_production.cylinder_temp')
                      @include('pages.approval_list.modal.modal_contents.after_production.inj_pack')
                      @include('pages.approval_list.modal.modal_contents.after_production.measuring_condition')

                      <b>Condition Set-By: </b><br>
                      <span style="text-decoration: underline;font-size: 2em" class="condition_set_name"> </span>
                </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-4">Checked By: <br>  <span style="text-decoration: underline;font-size: 2em" class="checked_by"> </span></div>
              <div class="col-sm-4">Reviewed By: <br>  <span style="text-decoration: underline;font-size: 2em" class="reviewed_by"> </span></div>
              <div class="col-sm-4">Approved By: <br>  <span style="text-decoration: underline;font-size: 2em" class="approved_by"> </span></div>
            </div>

        </div>
        <div class="modal-footer">

           
            
            @if (Request::is('check_list'))
                <button type="button" class="btn btn-success btn-lg" onclick="Check_List.mark_check()"> <i class="fa fa-check-circle"></i>&nbspMARK AS CHECKED</button>
                <button type="button" class="btn btn-danger btn-lg" onclick="Check_List.delete_record('check')"> <i class="fa fa-trash"></i>&nbspCANCEL RECORD</button>
            @elseif(Request::is('review_list'))
                 <button type="button" class="btn btn-success btn-lg" onclick="Review_List.mark_review()"> <i class="fa fa-check-circle"></i>&nbspMARK AS REVIEWED</button>
                 <button type="button" class="btn btn-danger btn-lg" onclick="Check_List.delete_record('review')"> <i class="fa fa-trash"></i>&nbspCANCEL RECORD</button>
            @elseif(Request::is('approve_list'))
                 <button type="button" class="btn btn-success btn-lg" onclick="Approve_List.mark_approve()"> <i class="fa fa-check-circle"></i>&nbspMARK AS APPROVED</button>
                 <button type="button" class="btn btn-danger btn-lg" onclick="Check_List.delete_record('approve')"> <i class="fa fa-trash"></i>&nbspCANCEL RECORD</button>
            @elseif(Request::is('master_copy'))
                  <button type="button" class="btn btn-success btn-lg" onclick="Master_Copy.save_changes()"> <i class="fa fa-save"></i>&nbspSAVE CHANGES</button>
            @endif
          
          <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal"><i class="fa fa-times"></i>&nbspClose</button>

        </div>

      </div>
      
    </div>
    <button  onclick="Scrolling.scroll_btn_click()" class="top_btn btn btn-danger" title="Go to top">
    <i class="fa fa-angle-up bold-text"></i>
    </button>

    <button  onclick="Scrolling.scroll_btn_click_bot()" class="bot_btn btn btn-danger" title="Go to bottom">
        <i class="fa fa-angle-down bold-text"></i>
    </button>
   

</div>