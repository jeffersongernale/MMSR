
<!-- Modal -->
<div class="modal fade modal_adj_hist" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
aria-hidden="true" onscroll="Scrolling.onscrolling();" data-id="0">
    <div class="modal-dialog no-print" role="document" style="width: 90vw" >
      <div class="modal-content">

        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" style="font-size: 2em;">&times;</span>
          </button>
        </div>

        <div class="modal-body" id="moda-aj_body">
          <div class="row">
            <div class="col-sm-3">
                <b>PARAMETER SETTING CHANGE: </b>
                <select id="slc_parameter_setting" class="form-control col-sm-4">
                    <option value="">SELECT PARAMETER</option>
                    <option value="mct_setting">MCT SETTING</option>
                    <option value="product_info">PRODUCT INFORMATION</option>
                    <option value="clamp_eject_setting"> CLAMPING AND EJECTING SETTING</option>
                    <option value="cylinder_temp_setting">CYLINDER TEMPERATURE SETTING</option>
                    <option value="inj_pack_setting">INJECTION/PACK SETTING</option>
                    <option value="measuring_condition_setting">MEASURING CONDITION SETTING</option>
                </select>
            </div>
          </div>
           <hr>
                <div class="table-responsive">
                        <table class="table table-bordered text-center" >
                            <thead>
                                <tr>
                                    <th class="text-nowrap">PARAMETER SETTING CHANGE</th>
                                    <th class="text-nowrap">DATE AND TIME</th>
                                    <th class="text-nowrap">REASON OF ADJUSTMENT</th>
                                    <th>ORIGINAL CONDITION</th>
                                    <th>ADJUSTED CONDITION</th>
                                    <th class="text-nowrap">RESULT OF ADJUSTMENT</th>
                                </tr>
                            </thead>
                            <tbody id="adj_tbl">
                                <tr><td style="text-align:center" colspan = "6"> <h1>Please Select a Parameter Setting</h1></td></tr>
                            </tbody>
                        </table> 
                    </div>


       


        </div>
        <div class="modal-footer">

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