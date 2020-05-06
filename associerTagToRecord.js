function  associateTagToRecord()
{
var tag =document.getElementById("tagInput").value;
if(tag!=""){
debugger;

//Execute the created global action using Web API.

   
    //get the current organization name
    var serverURL = Xrm.Page.context.getClientUrl();

    //query to send the request to the global Action
var currentAccountId = parent.Xrm.Page.data.entity.getId();
  

  var actionName = "pte_assosTagToEntity"; //"accounts("+currentAccountId.replace('{','').replace('}','')+")/Microsoft.Dynamics.CRM.pte_manageaccounttags"; // Global Action Unique Name
   
    //set the current loggedin userid in to _inputParameter of the
    var InputParameterValue = parent.Xrm.Page.context.getUserId();
 
    //Pass the input parameters of action
   var data = {

"TagName":   document.getElementById("tagInput").value,

 "EntityName": parent.Xrm.Page.data.entity.getEntityName(),


"recordId": currentAccountId.replace('{','').replace('}','')


 

};

 //Create the HttpRequestObject to send WEB API Request  


var req = new XMLHttpRequest();


//Post the WEB API Request


req.open("POST", serverURL + "/api/data/v9.1/" + actionName, true);

req.setRequestHeader("Accept", "application/json");

req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

req.setRequestHeader("OData-MaxVersion", "4.0");

req.setRequestHeader("OData-Version", "4.0");

req.onreadystatechange = function () {

if (this.readyState == 4 /* complete */) {

req.onreadystatechange = null;

if (this.status == 200 || this.status == 204)

{
var  result = JSON.parse(this.response);
alert("Action Executed Successfully..."+result.relationCreated+"**"+result.tagIdOUTPUT);

if( result.relationCreated == 1){

  var ul = document.getElementById("ulTags");

  var li = document.createElement("li");

  li.appendChild(document.createTextNode( tag));

li.setAttribute('id',result.tagIdOUTPUT);

   li.setAttribute('onclick',"openTagRecord(this.id)");


 ul.appendChild(li);


}


//You can get the output parameter of the action with name as given below
 // result = JSON.parse(this.response);
  //alert(result.MyOutputParameter);
}

else
{

var error = JSON.parse(this.response).error;

alert("Error in Action: "+error.message);

}

}

};


//Execute request passing the input parameter of the action  

req.send(window.JSON.stringify(data));







}
}

