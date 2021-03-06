var name_text_id ;
var phone_number_text_id ;
var dob_text_id ;
var group_name_text_id ;
                
var name_input_id ;
var phone_number_input_id ;
var dob_input_id ;
var group_name_input_id ;
                
var edit_button_id ;
var update_button_id ;
var cancel_button_id;
 
function initNamingConvention(id){
    name_text_id = "name_text_id_"+id;
    phone_number_text_id = "phone_number_text_id_"+id;
    dob_text_id = "dob_text_id_"+id;
    group_name_text_id = "group_name_text_id_"+id;
                
    name_input_id = "name_input_id_"+id;
    phone_number_input_id = "phone_number_input_id_"+id;
    dob_input_id = "dob_input_id_"+id;
    group_name_input_id = "group_name_input_id_"+id;
                
    edit_button_id ="edit_btn_id_"+id;
    update_button_id ="update_btn_id_"+id;
    cancel_button_id ="cancel_btn_id_"+id;
}
function loadCRUDGrid(group_name){
     $('#contact_table_body').html('')
     $.ajax({
          type: "POST",
          url: "/sms_chimp/contact_management/get_contacts_of_group/"+group_name
       }).done(function(result) {
            var html =""
            var count = 0;
            resultObj = JSON.parse(result);
            $.each(resultObj,function(key,value){
                count ++;
                initNamingConvention(value.id);
                
                html += '<tr>'
                html +=     '<td>'+count+'<input type="hidden" value ='+value.id+' /></td>'
                html += '<td>'
                html +=     '<div id="'+name_text_id+'">'+value.name+'</div>'
                html +=     '<div id="'+name_input_id+'" class="hide"><input  type="text" value ="'+value.name+'"style="max-width:140px"/></div>'
                html += '</td>'
                html += '<td>'
                html +=     '<div id="'+phone_number_text_id+'">'+value.phone_number+'</div>'
                html +=     '<div id="'+phone_number_input_id+'"class="hide"><input type="text" value ="'+value.phone_number+'"style="max-width:140px"/></div>'
                html += '</td>'
                html += '<td>'
                html +=     '<div id="'+dob_text_id+'">'+value.dob+'</div>'
                html +=     '<div id="'+dob_input_id+'" class="hide"><input type="text" value ="'+value.dob+'" style="max-width:140px"/></div>'
                html += '</td>'
                html += '<td>'
                html +=     '<div id="'+group_name_text_id+'">'+value.group_name+'</div>'
                html +=     '<div id="'+group_name_input_id+'" class="hide"><input class ="typeahead" type="text" value ="'+value.group_name+'"style="max-width:120px"/></div>'
                html += '</td>'
                html += '<td>'
                html +=     '<a href = "javascript:void(0)" id="'+edit_button_id+'" onclick="editContact('+value.id+')">Edit </a>'
                html +=     '<a href = "javascript:void(0)" id="'+update_button_id+'" onclick="updateContact('+value.id+')" class="hide"> Update </a>'
                html +=     '<a href = "javascript:void(0)" id="'+cancel_button_id+'" onclick="cancelEditContact('+value.id+')" class="hide"> Cancel </a>'
                html +=     '<a href = "javascript:void(0)" onclick="deleteContact('+value.id+')">Delete</a>'
                html += '</td>'
                html +='</tr>'
            }) 
            $('#contact_table_body').append(html)
            addTypeaHead()
            $('#contact_table').show()
        });
}
 
 
function turnOnEditMode(){
    $('#'+name_text_id).hide() ;
    $('#'+phone_number_text_id).hide() ;
    $('#'+dob_text_id).hide() ;
    $('#'+group_name_text_id).hide() ;
                
    $('#'+name_input_id+' input').val($('#'+name_text_id).html()) ;
    $('#'+phone_number_input_id+' input').val($('#'+phone_number_text_id).html()) ;
    $('#'+dob_input_id+' input').val($('#'+dob_text_id).html()) ;
    $('#'+group_name_input_id+' input').val($('#'+group_name_text_id).html()) ;
                
    $('#'+name_input_id).show() ;
    $('#'+phone_number_input_id).show() ;
    $('#'+dob_input_id).show() ;
    $('#'+group_name_input_id).show() ;
    
    $('#'+edit_button_id).hide();
    $('#'+update_button_id).show();
    $('#'+cancel_button_id).show();
}
function turnOffEditMode(){
    $('#'+name_text_id).show() ;
    $('#'+phone_number_text_id).show() ;
    $('#'+dob_text_id).show() ;
    $('#'+group_name_text_id).show() ;
                
    $('#'+name_input_id).hide() ;
    $('#'+phone_number_input_id).hide() ;
    $('#'+dob_input_id).hide() ;
    $('#'+group_name_input_id).hide() ;
    
    $('#'+edit_button_id).show();
    $('#'+update_button_id).hide();
    $('#'+cancel_button_id).hide();
}
 
function editContact(id){
    initNamingConvention(id);
    turnOnEditMode()
}
function deleteContact(id){
    data ={}
    data.id = id;
    if(confirm("Are you sure?"))
    {
       window.location.href = "/sms_chimp/contact_management/delete_contact?id="+id
    }
    else
    {
        //Cancel button pressed...
    }
}
function updateContact(id){
    initNamingConvention(id);
    data ={}
    data.id = id;
    data.name =  $('#'+name_input_id+' input').val();
    data.phone_number = $('#'+phone_number_input_id+' input').val();
    data.dob =  $('#'+dob_input_id+' input').val();
    data.group_name = $('#'+group_name_input_id+' input').val();
    $.ajax({
          type: "POST",
          url: "/sms_chimp/contact_management/update_contact",
          data: data
       }).done(function(result) {
            window.location.href ="/sms_chimp/contact_management/index"
       })
}
function cancelEditContact(id){
    initNamingConvention(id);
    turnOffEditMode();
}

function addTypeaHead(){
	$('.typeahead').typeahead({
        items : 8,
        minLength :3,
        source: function (query, process) {
            return $.get('/sms_chimp/contact_management/search_group_name', { query: query }, function (data) {
                 return process(data);
            });
        }
	});
}
