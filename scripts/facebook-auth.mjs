// Only report numeric provider codes and our own guidance; never echo credentials or provider messages.
export async function facebookRequestError(response){
 let body;try{body=await response.json();}catch{}
 const error=body?.error;
 const code=Number.isInteger(error?.code)?error.code:undefined;
 const subcode=Number.isInteger(error?.error_subcode)?error.error_subcode:undefined;
 const codes=[code!==undefined?"code="+code:null,subcode!==undefined?"subcode="+subcode:null].filter(Boolean).join(", ");
 let guidance="Check Page access and the configured server credential.";
 if(code===190||code===102)guidance="The configured Facebook token is invalid, expired or revoked. Re-authorize the same Page and update FACEBOOK_PAGE_ACCESS_TOKEN.";
 if(code===10||code===200)guidance="Check existing pages_read_engagement permission and access to the configured Page.";
 return new Error("Facebook request failed: HTTP "+response.status+(codes?" ("+codes+")":"")+". "+guidance);
}
