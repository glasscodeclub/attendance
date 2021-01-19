var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    Attendance              = require("./models/attendance"),
    LocalStrategy           = require("passport-local"),
    attendanceLib           = require("./lib/attendance.lib.js"),
    userLib                 = require('./lib/user.lib.js'),  
    async                   = require("async"),
    passportLocalMongoose   = require("passport-local-mongoose");
var _= require("lodash");
  
const PORT=2000;
const MONGO_URL="mongodb://localhost/attendance";
var app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static("public"));
app.use(require("express-session")({
    secret:"sam and negi",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("signup");
});
//hello
//hi2
app.get("/home",isLoggedIn, function(req, res){
let filter={};
filter={
    'username':req.user.username,
}
   attendanceLib.findbyId(filter,function(err,docs){
      if(err){
          res.send(err)
      }else if(_.isEmpty(docs)){

        res.render("home",{"attendanceData":""});
      }

      else{
          console.log(docs);
        res.render("home",{"attendanceData":docs});
    
      }
   });

});

app.post("/username/:user/password/:pass/save",function(req,res){
    console.log(req.body)
    if(req.body){
            let result={};
            let filter={
                userFilter:{
                username:req.params.user,
                },
                attendanceFilter:{
        
                },
            };
            async.series([
                (callback)=> {
                    userLib.findbyId(filter.userFilter,function(err,docs){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }
                        else{
                            result.user=docs;
                            return callback(null,result);
                        }
                    });
                },
                (callback)=> {
                    let new_attendance={
                        username:req.params.id,
                        attendance_date:req.body.date,
                        data:[req.body.data],
                    };    
                    attendanceLib.save(new_attendance,function(err){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }
                        else{
                            return callback(null);
                        }
                    });
                }
            ],
            (err)=> {
                if(err){
                    console.log(err)
                }
                else{
                    res.redirect(req.body.url);
                }
            });
    }
    else{
        res.send("empty body");
    }

   // for saving to database
    // let c="";let dateMeet="";dateMeet+=new Date().toLocaleString("en-US");document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0].click(); for(var i=0;i<document.getElementsByClassName('GvcuGe')[0].childNodes.length;++i){c+=(document.getElementsByClassName('GvcuGe')[0].childNodes[i].innerText)+"\n";};function copyToClipboard(text) {
    //     var dummy = document.createElement("textarea");
    //     document.body.appendChild(dummy);
    //      dummy.value = text;
    //      dummy.select();
    //      document.execCommand("copy");
    //      document.body.removeChild(dummy);
    //  };copyToClipboard(c);
    // var form = document.createElement("FORM"); 
    //     form.setAttribute("method", "post"); 
    //     form.setAttribute("action", "http://localhost:2000/username/sam/password/sam/save"); 
    //  form.innerHTML='<input type="hidden" name="date" value="'+dateMeet+'"/> <input type="hidden" name="data" value="'+c+'"/><input type="hidden" name="url" value="'+window.location.href+'" />'
    // document.body.appendChild(form);
    // form.submit();

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
    
    

});
// Auth Routes


//handling user sign up
app.post("/register", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
       if(err){
            console.log(err);
            return res.render('register');
        } //user stragety
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home"); //once the user sign up
       }); 
    });
});

// Login Routes

app.get("/login", function(req, res){
    res.render("login");
})

// middleware
app.post("/login", passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(PORT, function(){
    console.log("connected to "+PORT);
});