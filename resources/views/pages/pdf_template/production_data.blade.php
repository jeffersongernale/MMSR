
    <table class="table table-bordered text-center table-striped tbl" border="1" style="width: 100%" >
        <thead>
            <tr>
                <th>...</th>
                <th>...</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>TOTAL PRODUCTION:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_total_production">{{$after_prod->total_production}}</label>
                </td>
            </tr>
            <tr>
                <td><b>DATE PROCESS (START):</b></td>
                <td>
                    <label class="form-control input_field" id="date_process_start">{{$after_prod->date_process_start}}</label>
                </td>
            </tr>
            <tr>
                <td><b>DATE PROCESS(FINISHED):</b></td>
                <td>
                    <label class="form-control input_field" id="date_process_finish">{{$after_prod->date_process_finish}}</label>  
                </td>
            </tr>
            <tr>
                <td><b>LOT NUMBER:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_lot_number">{{$after_prod->lot_number}}</label> 
                </td>
            </tr>
            <tr>
                <td><b>CHECKED BY:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_check_by">{{strtoupper($after_prod->users_relation->name)}}</label> 
                </td>
            </tr>
            <tr>
                <td><b>CHECKED DATE:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_check_date">{{$after_prod->updated_at}}</label> 
                </td>
            </tr>
            <tr>
                <td><b>WORK FINISHED QTY:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_work_finish_qty">{{$after_prod->work_finish_qty}}</label> 
                </td>
            </tr>
        </tbody>      
    </table>
