const { fromPairs } = require("lodash");

   // for saving to database
    let c="";let dateMeet="";dateMeet+=new Date().toLocaleString("en-US");document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0].click();
    let taker=document.getElementsByClassName('GvcuGe')[0].childNodes[0].innerText;
    for(var i=1;i<document.getElementsByClassName('GvcuGe')[0].childNodes.length;++i){c+=(document.getElementsByClassName('GvcuGe')[0].childNodes[i].innerText)+"@";};function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
         dummy.value = text;
         dummy.select();
         document.execCommand("copy");
         document.body.removeChild(dummy);
     };copyToClipboard(c);
    //<iframe name="formTarget" style="display:none;"></iframe> 
     var iframe=document.createElement("IFRAME");
    iframe.setAttribute("name","formTarget");
    iframe.setAttribute("style","display:none");
    var form = document.createElement("FORM"); 
        form.setAttribute("method", "post"); 
        form.setAttribute("action", "http://localhost:2000/username/sam/password/sam/save"); 
        form.setAttribute("target","formTarget");
     form.innerHTML='<input type="hidden" name="taker" value="'+taker+'"/>+<input type="hidden" name="date" value="'+dateMeet+'"/> <input type="hidden" name="data" value="'+c+'"/><input type="hidden" name="url" value="'+window.location.href+'" />'
    document.body.appendChild(form);
    form.submit();

 // for testing
    //  let c="";let dateMeet="";dateMeet+=new Date().toLocaleString("en-US");document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0].click(); for(var i=0;i<document.getElementsByClassName('GvcuGe')[0].childNodes.length;++i){c+=(document.getElementsByClassName('GvcuGe')[0].childNodes[i].innerText)+"\n";};function copyToClipboard(text) {
    //     var dummy = document.createElement("textarea");
    //     document.body.appendChild(dummy);
    //      dummy.value = text;
    //      dummy.select();
    //      document.execCommand("copy");
    //      document.body.removeChild(dummy);
    //  };
    // var form = document.createElement("FORM"); 
    //     form.setAttribute("method", "post"); 
    //     form.setAttribute("action", "http://localhost:2000/username/sam/password/sam/save"); 
    //  form.innerHTML='<input type="hidden" name="date" value="'+dateMeet+'"/> <input type="hidden" name="data" value="'+c+'"/><input type="hidden" name="url" value="'+window.location.href+'" />'
    // document.body.appendChild(form);
    // form.submit();

    //for copy
      // let c="";c+=new Date().toLocaleString("en-US");document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0].click();c+='\n'; for(var i=0;i<document.getElementsByClassName('GvcuGe')[0].childNodes.length;++i){c+=Number(i+1)+" "+document.getElementsByClassName('GvcuGe')[0].childNodes[i].innerText+'\n';};function copyToClipboard(text) {
    //     var dummy = document.createElement("textarea");
    //     document.body.appendChild(dummy);
    //      dummy.value = text;
    //      dummy.select();
    //      document.execCommand("copy");
    //      document.body.removeChild(dummy);
    //  };copyToClipboard(c);