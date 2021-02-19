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
const attendance = require("./models/attendance");
  
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
          return res.send(err)
      }else if(_.isEmpty(docs)){

        return res.render("home",{"attendanceData":"",username:req.user.username});
      }

      else{
          console.log(docs);
        return res.render("home",{attendanceData:docs,username:req.user.username});
        // return res.json(docs)
      }
   });


   

});

app.get("/home/:id/details", function(req, res){
    const filter ={
        _id: req.params.id
    }
    attendanceLib.findbyId(filter, function(err, attendance){
        if(err){
            console.log(err);
            return res.json(err);
        }else{
            console.log(attendance);
          return  res.render("meetDetails", {attendanceDataID: attendance[0]});
        }
    })
})

app.post("/home/:id/delete", function(req, res){
    const filter ={
        _id: req.params.id
    }
    attendance.deleteOne(filter, function (err) {
        if(err){
            return res.json(err);
            
        }else{
            return res.redirect("/home");
        }
    });
})


app.post("/home", function(req, res){
    console.log(req.body);
    const date = req.body.entered_date;
    const time = req.body.entered_time;
    const day = (Number)(date.substring(8,10));
    const month = (Number)(date.substring(5,7))-1;
    const year = (Number)(date.substring(0, 4));
    const hours = (Number)(time.substring(0,2));
    const min = (Number)(time.substring(3, 5));
    console.log("Year = "+ year + " Month = "+month+" Day = "+day+" Hours = "+hours+" Minutes =  "+min);
    const Date_obj = new Date(year, month, day, hours, min);
    console.log(Date_obj);
    const Attendance = {
        username:req.body.user_name,
        attendance_date:Date_obj,
        data:[],
        url:req.body.meet_url,
        taker:req.body.entered_taker,
       
    };
    attendanceLib.save(Attendance,function(err){
        if(err){
           return res.json(err);
        }else{
           return res.redirect("/home"); 
        }
    });

    
}); 

app.post("/username/:user/password/:pass/save",function(req,res){
    console.log(req.body)
    if(1){//
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

                    let attendees = req.body.data.split("@");
                    attendees.pop();
                 
                    // attendees.forEach(function(attendee){
                    //     var idx = attendee.indexOf("\r\n")
                    // if(idx!==-1){
                    //      attendee=attendee.substring(0, idx);
                    //     }
                    // });
                    let new_attendance={
                        username:req.params.user,
                        attendance_date:req.body.date,
                        data:attendees,
                        url:req.body.url,
                        taker:req.body.taker,
                        you: req.body.you,
                        
                    };    
                   console.log(new_attendance);
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
                  return res.redirect("http://localhost:2000/");//change this to normal
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


