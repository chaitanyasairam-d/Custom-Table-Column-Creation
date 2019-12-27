function tabFocus(e) {
    if (e.type == "keydown") {


        if (e.keyCode == 39) {

            // console.log(e);
            var ele = e.srcElement.outerHTML;

            if (ele.includes("select")) {
                e.preventDefault();

            }

            var len = $(e.target.parentElement.nextElementSibling).length;
            if (len > 0 || len != '') {

                $(e.target.parentElement.nextElementSibling)[0].children[0].focus();
            }
            else if (len == 0 || len == null) {
                var sib = $(e.target.parentElement.parentElement.nextElementSibling).length;
                // console.log(sib);
                if (sib > 0) {
                    // console.log($(e.target.parentElement.parentElement.nextElementSibling)[0].children[0]);
                    $(e.target.parentElement.parentElement.nextElementSibling)[0].children[0].children[0].focus();
                }
            }
        }

    }
}

function multiSelect(value, val) {


    if (value === 'MultiSelect') {
        var text = document.getElementById(`${val.id[0]}_multiValue`);
        var input = document.getElementById(`${val.id[0]}_multiInput`);

        //    console.log(`${val.id[0]}_multiValue`);

        text.style.display = "flex";
        input.style.display = "inline-block";

    }

}

    
function getTable() {


    var columnName = document.getElementsByClassName(`columnName`);
    var columnType = document.getElementsByClassName(`columnType`);

    var data = 0, flag = false;
    for (let i = 0; i < columnType.length; i++) {
        var colName = columnName[i].value;
        var colType = $(columnType[i]).find('option:selected').val();
        var colData = colType.includes('Select Column Type')
        if (colName.length > 0 && colData == false) {
            flag = false;
        }
        else {
            flag = true;
        }
    }
    if (!flag) {
        $('#columnValues').hide(200);
        $('#mainTable').show(200);
        for (let i = 0; i < columnName.length; i++) {

            var mutliTypes = document.getElementsByClassName(`mutliTypes`);
            var table = document.getElementById('fill-table');
            var thead = document.createElement('thead');
        }
            // filling Headers

            for (let i = 0; i < columnName.length; i++) {
                var th = document.createElement('th');
                th.append(columnName[i].value)

                // $(columnType[j]).find('option:selected').val(); // to get selected options 
                thead.append(th);
                table.append(thead);

            }
            //Filling rows
            for (let k = 0; k < 20; k++) {
                var tr = document.createElement('tr');
                for (let i = 0; i < columnName.length; i++) {
                    var td = document.createElement('td');
                    var type = $(columnType[i]).find('option:selected').val();
                    td.setAttribute("class", `tb_row`)

                    if (type === 'Date') {
                        // td.append('Date selcted')
                        var input = document.createElement('input');
                        input.setAttribute('type', 'date');
                        input.setAttribute('class', 'form-control-sm');
                        input.setAttribute('id', `${k}_${i}_column`);
                        input.setAttribute("onkeydown", "tabFocus(event)");

                        // input.setAttribute("onkeydown", "keyPressed(event)");

                        td.append(input);
                    }
                    else if (type === 'Number') {

                        // td.append('number selcted');
                        var input = document.createElement('input');
                        input.setAttribute('type', 'text');
                        input.setAttribute('class', `form-control-sm `);
                        input.setAttribute('id', `${k}_${i}_column`);
                        input.setAttribute("ondrop", "return false");
                        input.setAttribute("onpaste", "return false");
                        input.setAttribute("tabindex", "0");
                        input.setAttribute("onkeydown", "tabFocus(event)");
                        input.setAttribute("onkeypress", "return event.keyCode > 47 && event.keyCode <= 57")
                        td.append(input);
                    }
                    else if (type === 'MultiSelect') {
                        // td.append('multi selcted')
                        var val = mutliTypes[i].value
                        var arr = val.split(",");


                        var select = document.createElement('select');
                        // select.setAttribute('type','date');
                        select.setAttribute('class', 'form-control  ');
                        select.setAttribute("onkeydown", "tabFocus(event)");
                        select.setAttribute("onchange", "change(this,event)");
                        select.setAttribute('id', `${k}_${i}_column`);

                        var Disableoption = document.createElement('option');

                        select.append(Disableoption);
                        Disableoption.innerHTML = "Select";
                        Disableoption.selected = "selected";
                        Disableoption.disabled = true;
                        select.append(Disableoption);

                        for (let j = 0; j < arr.length; j++) {
                            var options = document.createElement('option');
                            options.value = arr[j];
                            options.innerHTML = arr[j];
                            select.append(options);
                        }
                        td.append(select);
                    }


                    tr.append(td);
                }
                table.append(tr);

            }

        }
    else {
        var error = document.getElementById('tb-col-error');
        error.style.display = "block";
        error.innerHTML = "please dont leave blank field";
    }
}

function tableData() {


    var table = document.querySelector('#table-fill-data');
    var columnName = document.getElementsByClassName(`columnName`);
    var flag;
    var data = '';
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < columnName.length; j++) {
            data += $(`#${i}_${j}_column`).val();
        }
    }
    console.log(data);
    if (data.length > 0) {
        flag = false;
    }
    else {
        flag = true;
    }
    if (!flag) {


        $('#mainTable').hide(300);
        $('#table-data').show(300);



        for (let i = 0; i < columnName.length; i++) {
            var th = document.createElement('th');
            th.append(columnName[i].value)

            table.append(th);
        }

        for (let i = 0; i < 20; i++) {
            var flag = 0;
            var tr = document.createElement('tr');
            // console.log("column length = " +columnName.length);
            for (let j = 0; j < columnName.length; j++) {
                var td = document.createElement('td');
                var data = $(`#${i}_${j}_column`).val();
                // console.log(`Value at ${i}_${j}_column = ${data}`);
                if (data.length > 0) {
                    td.append(data);
                    tr.append(td);

                }
                else {
                    flag = 1;
                }

            }
            if (flag != 1) {
                table.append(tr);
            }
        }

    }
    else {
        var error = document.getElementById('tb-entry-error');

        error.style.display = "block";
        error.innerHTML = "Please enter atleast one value";
    }

}
$('document').ready(() => {

    $('#addColumns').show();
    $('#columnValues').hide();
    $('#table-data').hide();
    $('#mainTable').hide();
    $('#tb-entry-error').hide();
    $('#tb-col-error').hide();


    $('#addColumn').click(() => {

        var num = $('#noOfColumns').val();
        if (num > 0) {

            $('#columns-creator').remove();

            $('#columnValues').show();

            var columnData = document.getElementById('column-data');

            for (let i = 0; i < num; i++) {

                var id = document.createElement('label');
                var columnName = document.createElement('label');
                var columnType = document.createElement('label');
                id.innerHTML = `<br/>${i + 1})&nbsp;`;
                var input = document.createElement('input');
                var disbaleOption = document.createElement('option');
                var select = document.createElement('select');
                var options1 = document.createElement('option');
                var options2 = document.createElement('option');
                var options3 = document.createElement('option');
                var breakpoint = document.createElement('br');
                var multiValue = document.createElement('label');
                var multiInput = document.createElement('input');


                columnData.append(id);

                //Coulmn Name
                columnName.innerHTML = "Column Name&nbsp;";
                input.setAttribute('type', 'text');
                input.setAttribute('class', `form-control-sm mr-3 columnName ${i + 1}_column`);
                input.setAttribute('id', `${i + 1}_columnName`);

                columnData.append(columnName);
                columnData.append(input);

                // Column Type
                columnType.innerHTML = "Column Type &nbsp;";
                columnData.append(columnType);

                select.setAttribute("class", "form-control-sm mt-1 mb-2 columnType ");
                select.setAttribute("id", `${i + 1}_select`);
                select.setAttribute("onchange", "multiSelect(this.value,this)");

                disbaleOption.innerHTML = "Select Column Type";
                select.append(disbaleOption);
                disbaleOption.selected = "selected";
                disbaleOption.disabled = true;

                options1.innerHTML = "Date";
                options1.value = "Date";
                select.append(options1);

                options2.innerHTML = "Number";
                options2.value = "Number"
                select.append(options2);

                options3.innerHTML = "MultiSelect";


                options3.value = "MultiSelect"
                select.append(options3);

                columnData.append(select);

                //Multi Value 
                multiValue.innerHTML = "<span class='text-danger'>NOTE :</span> please enter values with comma separated";
                multiValue.setAttribute("id", `${i + 1}_multiValue`);
                multiValue.setAttribute("class", "mt-1");
                columnData.append(multiValue);

                multiInput.setAttribute('type', 'text');
                multiInput.setAttribute('class', `form-control-sm ml-3 mb-2 mutliTypes ${i + 1}_column`);
                multiInput.setAttribute('id', `${i + 1}_multiInput`);


                columnData.append(multiInput);

                multiValue.style.display = "none";
                multiInput.style.display = "none";

                columnData.append(breakpoint);


            }

        }
    })
})