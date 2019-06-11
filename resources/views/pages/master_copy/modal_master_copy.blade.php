
<!-- Modal -->
<div class="modal fade modal_view_data" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
aria-hidden="true" onscroll="Scrolling.onscrolling();" data-id="0">
    <div class="modal-dialog" role="document" style="width: 80vw" >
      <div class="modal-content">

        <div class="modal-header">
            <button type="button" class="btn btn-danger btn-lg" onclick="view_pdf.copy_pdf()"> <i class="fa fa-file-pdf-o"></i>&nbsp&nbspVIEW ARRANGEMENT GUIDELINES</button>
            <button type="button" class="btn btn-primary btn-lg" onclick = "Print_Data.Print_Info2();"> <i class="fa fa-print"></i>&nbsp&nbspPRINT</button>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" style="font-size: 2em;">&times;</span>
          </button>
        </div>

        <div class="modal-body">

          @include('pages.approval_list.modal.modal_contents.record_info')

            <div class="row">
                <div class="col-sm-4 mold_sheet">
                    @include('pages.master_copy.modal_contents.mold_die_basic_info')
                    {{-- @include('pages.approval_list.modal.modal_contents.mold_checksheet.mold_set_up_checksheet') --}}
                    {{-- @include('pages.approval_list.modal.modal_contents.mold_checksheet.raw_mats') --}}
                    {{-- @include('pages.approval_list.modal.modal_contents.mold_checksheet.production_data') --}}
                    @include('pages.master_copy.modal_contents.production_SPQ')
                </div>
                <div class="col-sm-8 get_id">
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
                        @include('pages.master_copy.modal_contents.mct_setting')
                        @include('pages.master_copy.modal_contents.product_info')
                        @include('pages.master_copy.modal_contents.clamp_eject')
                        @include('pages.master_copy.modal_contents.cylinder_temp')
                        @include('pages.master_copy.modal_contents.inj_pack')
                        @include('pages.master_copy.modal_contents.measuring_condition')

                        <b>Registered By: </b><br>
                        <span style="text-decoration: underline;font-size: 2em" class="reg_name"> </span>
                </div>
            </div>
            

        </div>
        <div class="modal-footer">

            <button type="button" class="btn btn-warning btn-lg"> <i class="fa fa-book"></i>&nbspVIEW ADJUSTMENT HISTORY</button>
            {{-- <button type="button" class="btn btn-success btn-lg" onclick="Master_Copy.save_changes()"> <i class="fa fa-save"></i>&nbspSAVE CHANGES</button> --}}
            
          <button type="button" class="btn btn-danger btn-lg"> <i class="fa   fa-times-circle"></i>&nbspBLOCK RECORD</button>
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