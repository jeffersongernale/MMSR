<div class="modal fade modal_view_data"   role="dialog" data-id='0' data-machine='0'>
        <div class="modal-dialog modal-lg" role="document" style="width: 95vw">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size:3em">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                  <div class="row">
                      <div class="col-lg-6 change_parameter">
                          <input id="rad_with_change" type="radio"  name="change_status" value="with_change" 
                          onclick="Reg_List.With_or_Without_Change();">
                          <label for="rad_with_change">WITH CHANGE</label> &nbsp&nbsp
                          <input id="rad_without_change" type="radio" name="change_status" value="without_change" checked 
                          onclick="Reg_List.With_or_Without_Change();">
                          <label for="rad_without_change">WITHOUT CHANGE</label>
                      </div>
                      <div class="col-lg-6" style="text-align: right">

                          <a class="btn btn-danger" onclick="view_pdf.copy_pdf()"><i class="fa fa-edit"></i>&nbspVIEW ARRANGEMENT GUIDANCE</a>
                          {{-- <button class="btn btn-warning" onclick="After_Prod.SubmitDraft()"><i class="fa fa-paperclip"></i>&nbspSAVE AS DRAFT</button> --}}
                          <button class="btn btn-primary" onclick = 'After_Prod.ForAdjustment()'><i class="fa fa-save"></i>&nbspSAVE FOR ADJUSTMENT</button>
                          <button class="btn btn-success" onclick = 'After_Prod.Finished()'><i class="fa fa-save"></i>&nbspSAVE FOR APPROVAL</button>
                      </div>
                </div>
                
                <br>
                <div class="table-responsive">
                        <table class="table table-bordered text-center " >
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CTRL NO#:</td>
                                    <td>
                                      {{-- <label id="lbl_ctrl" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="lbl_ctrl">

                                    </td>
                                    <td>REVISION NO#:</td>
                                    <td>
                                      {{-- <label id="txt_rev_no" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="txt_rev_no">

                                    </td>
                                    <td>MOLD NO#:</td>
                                    <td>
                                      {{-- <label id="lbl_mold" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="lbl_mold">

                                    </td>
                                    <td>MACHINE NO#:</td>
                                    <td>
                                      {{-- <label id="lbl_machine" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="lbl_machine">

                                    </td>
                                </tr>
                                <tr>
                                    <td>DRAWING NO#:</td>
                                    <td>
                                      {{-- <label id="txt_drawing_no" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="txt_drawing_no">

                                    </td>
                                    <td>DRAWING NAME:</td>
                                    <td>
                                      {{-- <label id="lbl_draw_name" class="control-label">-</label> --}}
                                      <input type="text" class="form-control input_field" readonly id="lbl_draw_name">
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">PARAMETER CHANGE</a></li>
                    <li><a data-toggle="tab" href="#menu1">MOLDING SET-UP CHECKSHEET</a></li>
                    <li><a data-toggle="tab" href="#menu2">RAW MATERIALS AND PRODUCTION</a></li>
                </ul>

                <div class="tab-content table-responsive" >
                    <div id="home" class="tab-pane fade in active">
                        <br>
                        @include('pages.registered_list.modal.parameterchange')
                    </div>

                    <div id="menu1" class="tab-pane fade">
                      <br>
                      @include('pages.registered_list.modal.mold_checksheet')
                    </div>

                    <div id="menu2" class="tab-pane fade">
                     <br>
                     @include('pages.registered_list.modal.rawmats_prod')
                    </div>
                </div>

            </div>
            <div class="modal-footer">
              {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>