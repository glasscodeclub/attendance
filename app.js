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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("signup");
});

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
                    return console.log(err)//
                }
                else{
                   //return res.redirect(req.body.url);
                //    return res.json({
                //        result:"success",
                //    })
                return res;
                }
            });
    }
    else{
        res.send("empty body");
    }

  
    

});
// Auth Routes


//handling user sign up
app.post("/signup", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
       if(err){
            console.log(err);
            return res.render('signup');
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