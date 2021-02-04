'use strict';
$(function () {

activeButton();

}); //start function

function activeButton() {
let activeButton = $('.btn-active').attr('data-btn')
//console.log(activeButton);

    //single-predictor button
    if(activeButton == 'single-predictor'){
        $.ajax({
            type: "POST",
            url: "components/content/single-predictor.html",
            success: function (res) {
                $('#content').html(res);

                // display predictor table
                Predictors.map(({name, type, status}) => {
                    let newStatus = '',
                        newType = '';
                    
                    if(type != 1) {
                        newStatus = 'disabled';
                    }
                    if(status != 1) {
                        newType = 'pred-hide';
                    }
                        
                    $('#predictors-table').append(` 
                        <div class="col-md-6 ${newType}" style='margin-bottom: 10px'>
                            <button class="btn btn-block btn-info" ${newStatus}>
                               ${name}
                            </button>
                        </div>`);
                })
                    
                

            }
        });
    } //end of single-predictor
    
} // end of active button


