// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()



  // JavaScript for adding popup

  const openPopupButton = document.querySelectorAll('[data-target]');
  const closePopupButton = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openPopupButton.forEach(button => {
      button.addEventListener('click', () => {
          const popup = document.querySelector(button.dataset.target);
          openPopup(popup);
      });
  });


  closePopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

overlay.addEventListener('click', () => {
  const popup = document.querySelectorAll('.popup.active')
  popup.forEach(popup => {
    closePopup(popup)
  })
})

function openPopup(popup) {
    if (popup == null) return;
    popup.classList.add('active');
    overlay.classList.add('active');
}

  function closePopup(popup) {
    if (popup == null) return;
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

//Adding row on table

// function add() {
  
//     var table = document.getElementById("tab");
//     var link = document.getElementById("link").value;
//     var participants = document.getElementById("participants").value;
//     var date = document.getElementById("date").value;
//     var time = document.getElementById("time").value;
//     var creator = document.getElementById("creator").value;
//     table.innerHTML +='<tr><th scope="row"></th><td>'+link+'</td><td>'+participants+'</td><td>'+date+'</td><td>'+time+'</td><td>'+creator+'</td><td class="control-col"><form action="/home/<%= attendanceData[i]._id %>/delete"  method="post" style="display: inline;"><button class="controls"><i class="far fa-trash-alt"</i></button><button class="controls"><i class="fas fa-pen"></i></button><button class="controls"><i class="fab fa-readme"></i></button></td></tr>';
//   }
 

  //Copy to clipboard


  function getcode() {
    var passwordtext = document.getElementById('passwordtext').value;
     if(passwordtext)
     {
        document.getElementById('pass_word').value= passwordtext;
        copy();
     }
     else
     {
      document.getElementById('pass_word').value= 'error';
      
     }
  }
  function copy() {
    let username=document.getElementById('user_name').value;
    let password=document.getElementById('pass_word').value;
    copyCode(`let c="";let dateMeet="";dateMeet+=new Date().toLocaleString("en-US");document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0].click();
    let taker=document.getElementsByClassName('GvcuGe')[0].childNodes[0].innerText;
    taker=taker.substring(0, taker.length-6);
    let you = document.getElementsByClassName('GvcuGe')[0].childNodes[1].innerText;
    var index = you.indexOf("Your presentation");
    if(index!=-1){
      you=you.substring(0, index-1);
    }
    c+=you+"@";
    for(var i=2;i<document.getElementsByClassName('GvcuGe')[0].childNodes.length;++i){
    var attendee=(document.getElementsByClassName('GvcuGe')[0].childNodes[i].innerText);
    // for handling \r\n (You)
    var idx = attendee.indexOf('Presentation')
    if(idx!=-1){
      attendee=attendee.substring(0, idx-1);
 //     console.log(attendee);

    }
    c+=attendee+"@";
   }
   function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
         dummy.value = text;
         dummy.select();
         document.execCommand("copy");
         document.body.removeChild(dummy);
     };copyToClipboard(c);
     var iframe=document.createElement("IFRAME");
    iframe.setAttribute("name","formTarget");
    iframe.setAttribute("style","display:none");
    var form = document.createElement("FORM"); 
        form.setAttribute("method", "post"); 
        form.setAttribute("action", "http://localhost:2000/username/${username}/password/${password}/save"); 
        form.setAttribute("target","formTarget");
     form.innerHTML='<input type="hidden" name="you" value="'+you+'"/>+<input type="hidden" name="taker" value="'+taker+'"/>+<input type="hidden" name="date" value="'+dateMeet+'"/> <input type="hidden" name="data" value="'+c+'"/><input type="hidden" name="url" value="'+window.location.href+'" />'
    document.body.appendChild(form);
    form.submit();
`);

       function copyCode (str) {
       var dummyElement = document.createElement('textarea');
       // Set value (string to be copied)
       dummyElement.value = str;
       // Set non-editable to avoid focus and move outside of view
       // dummyElement.setAttribute('readonly', '');
       // dummyElement.style = {position: 'absolute', left: '-9999px'};
       document.body.appendChild(dummyElement);
       // Select text inside element
       dummyElement.select();
       // Copy text to clipboard
       document.execCommand('copy');
       // Remove temporary element
       document.body.removeChild(dummyElement);
    }
    window.alert("Code copied")
    }

    // SEARCHING

    function search() {
      let filter = document.getElementById('search').value.toUpperCase();
      let tab = document.getElementById('tab');
      let tr = tab.getElementsByTagName('tr');

      for(var i=0; i < tr.length; ++i){
        let td = tr[i].getElementsByTagName('td')[0];
        if(td){
          let textvalue = td.textContent || td.innerHTML;

          if(textvalue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          }else{
            tr[i].style.display = "none";
          }
        }
      }
    } 
    