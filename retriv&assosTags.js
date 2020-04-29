
function retreveTags(){
   
    var TagsFetchXMLUsers = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"+
"  <entity name='pte_tag'>"+
"    <attribute name='pte_tagid' />"+
"    <attribute name='pte_name' />"+
"    <attribute name='createdon' />"+
"    <order attribute='pte_name' descending='false' />"+
"    <filter type='and'>"+
"      <condition attribute='statecode' operator='eq' value='0' />"+
"    </filter>"+
"    <link-entity name='systemuser' from='systemuserid' to='owninguser' link-type='inner' alias='aa'>"+

"<attribute name='businessunitid'/>"+

"      <filter type='and'>"+
"        <condition attribute='businessunitid' operator='eq-businessid' />"+
"      </filter>"+
"    </link-entity>"+
"  </entity>"+
"</fetch>"
TagsFetchXMLUsers = "?fetchXml=" + encodeURIComponent(TagsFetchXMLUsers);



   
var TagsFetchXMLTeam ="<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"+
"  <entity name='pte_tag'>"+
"    <attribute name='pte_tagid' />"+
"    <attribute name='pte_name' />"+
"    <attribute name='createdon' />"+
"    <order attribute='pte_name' descending='false' />"+
"    <filter type='and'>"+
"      <condition attribute='statecode' operator='eq' value='0' />"+
"    </filter>"+
"    <link-entity name='team' from='teamid' to='owningteam' link-type='inner' alias='ac'>"+
"<attribute name='businessunitid'/>"+
"      <filter type='and'>"+
"        <condition attribute='businessunitid' operator='eq-businessid' />"+
"      </filter>"+
"    </link-entity>"+
"  </entity>"+
"</fetch>"
TagsFetchXMLTeam = "?fetchXml=" + encodeURIComponent(TagsFetchXMLTeam);




  var E = document.getElementById("Tags");


parent.Xrm.WebApi.retrieveMultipleRecords("pte_tag", TagsFetchXMLUsers).then(
function success(result) {
 
    for (var i = 0; i < result.entities.length; i++) {
    console.log(result.entities[i]);

            var para = document.createElement("option");
            para.setAttribute('value',result.entities[i].pte_name);
            E.appendChild(para);
  }
},
function (error) {
console.log(error.message);

}
);

parent.Xrm.WebApi.retrieveMultipleRecords("pte_tag", TagsFetchXMLTeam).then(
function success(result) {
 
    for (var i = 0; i < result.entities.length; i++) {
    console.log(result.entities[i]);

            var para = document.createElement("option");
            para.setAttribute('value',result.entities[i].pte_name);
            E.appendChild(para);
  }
},
function (error) {
console.log(error.message);

}
);


}
















//**************************************************************************************
//**************************************************************************************

var nomDeTag = document.getElementById("tagInput").value;
console.log("***avon fetch AADDfUNCTION"+nomDeTag);


function  AddTag(){
if( document.getElementById("tagInput").value !=""){

var TagName = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"+
"  <entity name='pte_tag'>"+
"    <attribute name='pte_tagid' />"+
"    <attribute name='pte_name' />"+
"    <attribute name='createdon' />"+
"    <order attribute='pte_name' descending='false' />"+
"    <filter type='and'>"+
"      <condition attribute='pte_name' operator='eq' value='"+document.getElementById("tagInput").value+"' />"+
"    </filter>"+
"  </entity>"+
"</fetch>"

TagName = "?fetchXml=" + encodeURIComponent(TagName);
parent.Xrm.WebApi.retrieveMultipleRecords("pte_tag", TagName).then(
function success(result) {
console.log("** aprer fetch*"+nomDeTag);
console.log("***"+result.entities.length);
  if ( result.entities.length == 0 ) {
   CreatTagRecord();
   associateTagToRecord();

}else{

console.log("**TAG EXIST*");
 
   associateTagToRecord();

}

},
function (error) {
console.log(error.message);

}
);
}


else
{}

}

//**************************************************************************************
//**************************************************************************************
//**************************************************************************************

function  CreatTagRecord(){

var tag = document.getElementById("tagInput").value;

 console.log("**verfier valeur input dans creatTga function**"+document.getElementById("tagInput").value);

 var TagData =
 { "pte_name": tag,
   
 }


 parent.Xrm.WebApi.createRecord("pte_tag", TagData).then(
 function success(result) {
 // Show Account GUID
 parent.Xrm.Utility.alertDialog("Tag created with ID: " + result.id, null);
 },
 function (error) {
 // Show Error
 Xrm.Utility.alertDialog("Error :" + error.message, null);
 }
 );

}


//**************************************************************************************
//**************************************************************************************
//**************************************************************************************

function  associateTagToRecord(TagN)
{


debugger;






//Execute the created global action using Web API.

   
    //get the current organization name
    var serverURL = Xrm.Page.context.getClientUrl();

    //query to send the request to the global Action
var currentAccountId = parent.Xrm.Page.data.entity.getId();
    var actionName = "pte_test"; //"accounts("+currentAccountId.replace('{','').replace('}','')+")/Microsoft.Dynamics.CRM.pte_manageaccounttags"; // Global Action Unique Name
   
    //set the current loggedin userid in to _inputParameter of the
    var InputParameterValue = parent.Xrm.Page.context.getUserId();
 
    //Pass the input parameters of action
   var data = {TagName:   document.getElementById("tagInput").value};

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

alert("Action Executed Successfully...");

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


//*********************