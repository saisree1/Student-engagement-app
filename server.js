const express = require('express')
const app = express()
var multer=require('multer')
var datastore=require('nedb')
var fs=require('fs')
var db= new datastore({filename:'store1.db',autoload:true})
var db2= new datastore({filename:'store2.db',autoload:true})
var db3= new datastore({filename:'store3.db',autoload:true})
var db4= new datastore({filename:'store4.db',autoload:true})
var db5= new datastore({filename:'store5.db',autoload:true})
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/Suploads',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const storage1 = multer.diskStorage({
  destination: './public/uploads/Tuploads',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const storage2 = multer.diskStorage({
  destination: './public/uploads/Auploads',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

const uploa = multer({
  storage: storage2,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType2(file, cb);
  }
}).single('doc');
const uplo = multer({
  storage: storage1,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType3(file, cb);
  }
}).single('doc1');
// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype || extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
function checkFileType3(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype || extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
function checkFileType2(file, cb){
  // Allowed ext
  const filetypes = /doc|docx|xlsx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error:Doc files Only!');
  }
}


app.set('view engine','ejs')

app.set('port',process.env.PORT||3000)

app.use(express.static(__dirname+'/public'))

app.get('/', function (req, res) {
res.render('sign')
})
app.get('/teacher', function (req, res) {
res.render('teacher-sign')
})

app.get('/signup-error', function (req, res) {
res.render('SERROR')
})
app.get('/dup', function (req, res) {
res.send('Email is already in use....Go back')


})
app.get('/dup2', function (req, res) {
res.send('Phone.no is alreadyin use...Go back')


})

app.get('/login-error', function (req, res) {
res.render('LERROR')
})

app.get('/course', function (req, res) {
res.render('Acourse')
})

app.get('/Atest', function (req, res) {
res.render('Atest')
})

app.get('/scourse/:username', function (req, res) {

db.find({'email':req.params.username},function(err,new1)
      {
db2.find({},function(err,newDoc)
      {
       db4.find({},function(err,new2)
      {
        console.log(newDoc[0].Branch)
        console.log(new1[0].branch)
        console.log(newDoc[0].Branch[0])
     res.render('course',{res1:newDoc,res2:new1,res3:new2})
                })
                })})
})

app.get('/signup-store',function(req,res)
 {
 	 db.count({'email':req.query.email},function(err,newDoc)
    {
      db.count({'Phone':req.query.phno},function(err,new2)
    {
      console.log(new2==0)
       if ( req.query.pwd.length>=8 && req.query.pwd.length<=12 && newDoc==false && new2==false && req.query.gender=='male' || req.query.gender == 'female') 
   {
    console.log(newDoc)
    console.log(new2==0)
  db.insert({
  'name':req.query.name,
  '_id':req.query.reg,
  'date':req.query.date,
  'email':req.query.email,
  'password':req.query.pwd,
  'Phone':req.query.phno,
  'courses':req.query.course,
  'branch':req.query.cou,
    'gender':req.query.gender,
    'file':req.query.idprf
 
      },function(err,ne1)
    {
      
                })
  res.redirect('/login')
     }
else if (newDoc!=0) {
    res.redirect('/dup')
   }
else if (new2!=0) {
    res.redirect('/dup2')
   }
else if (req.query.pwd.length<8 || req.query.pwd.length>12) {
    res.send('password length should be 8-12 characters......go back')
   }
else 
{
res.redirect('/signup-error')
}
    })
  })
})

app.get('/tsign-store',function(req,res)
 {
   db3.count({'email':req.query.temail},function(err,newDoc)
    {
      db3.count({'Phone':req.query.tphno},function(err,new2)
    {
      console.log(new2==0)
       if ( req.query.tpwd.length>=8 && req.query.tpwd.length<=12 && newDoc==false && new2==false && req.query.tgender=='male' || req.query.tgender == 'female') 
   {
    console.log(newDoc)
    console.log(new2==0)
  db3.insert({
  'tname':req.query.tname,
  '_id':req.query.tid,
  'tdate':req.query.tdate,
  'temail':req.query.temail,
  'tpassword':req.query.tpwd,
  'tPhone':req.query.tphno,
  'tbranch':req.query.tcou,
    'tgender':req.query.tgender,
    'tfile':req.query.tidprf
 
      },function(err,ne1)
    {
      
                })
  res.redirect('/tlogin')
     }
else if (newDoc!=0) {
    res.redirect('/dup')
   }
else if (new2!=0) {
    res.redirect('/dup2')
   }
   else if (req.query.pwd.length<8 || req.query.pwd.length>12) {
    res.send('password length should be 8-12 characters......go back')
   }
else 
{
res.redirect('/signup-error')
}
    })
  })
})

app.get('/course-store',function(req,res)
 { 	
   
 	db2.insert({
 	'_id':req.query.cid,
 	'tid':req.query.tid,
 	'cname':req.query.cname,
 	'days':req.query.days,
 	'Branch':req.query.cou,
 	'stu_no':req.query.cnos
      },function(err,newDoc)
    {
 	 res.send('Course Added')
                   })
     
})

app.get('/test-store',function(req,res)
 {  
   
  db5.insert({
  'Tname':req.query.tname,
  '_id':req.query.testid,
  'cid':req.query.cid,
  'tid':req.query.toid,
  'tmarks':req.query.tmarks,
  'areg':req.query.areg
      },function(err,newDoc)
    {
   res.send('Test Added')
                   })
     
})


 app.get('/view_course/:u1/:u2',function(req,res)
 {
 	var a=req.params.u1;
  var b=req.params.u2;
 	console.log(a)
  
db2.find({'_id':a},function(err,newDoc)
 	{
    db4.find({'tid':newDoc[0].tid},function(err,new3)
      {
    db.find({'email':b},function(err,new2)
  {
    db5.find({'cid':a},function(err,new4)
  { 
    
 	    res.render('view-course',{stu:newDoc,result:new2,res2:new3,res3:new4}),
 	    console.log(newDoc)
      console.log(new3)
 	})	
})
    })
     })

  })
  app.get('/view_tests/:u1/:u2',function(req,res)
 {
  var a=req.params.u1;
  var b=req.params.u2;
  console.log(a)
  
db5.find({'tid':a},function(err,newDoc)
  {
    db.find({},function(err,new2){
    
      res.render('view-test1',{stu:newDoc,res:new2,email:b}),
      console.log(newDoc)
    })
 })

  })

 app.get('/add_test/:u1',function(req,res)
 {
  var a=req.params.u1;
  console.log(a)
  
db5.find({'Tname':a},function(err,newDoc)
  {


    db5.update({'Tname':newDoc[0].Tname,
      '_id':newDoc[0]._id,
      'cid':newDoc[0].cid,
      'tid':newDoc[0].tid,
      'tmarks':newDoc[0].tmarks,
      'areg':newDoc[0].areg},{$push:{'tmarks':req.query.tmarks,'areg':req.query.areg}},{'upsert':true},function(err,new2){
    
      res.render('success')  })
 })
});

 app.get('/Assignment_upload/:u1/:u2',function(req,res)
 {
  var a=req.params.u1;
  var b=req.params.u2;
  console.log(a)
  
db2.find({'_id':a},function(err,newDoc)
  {
    db4.find({'tid':newDoc[0].tid},function(err,new3)
      {
    db.find({'email':b},function(err,new2)
  {
    
      res.render('Assign_upload',{stu:newDoc,result:new2,res2:new3})
    
})
    })
     })

  })
 app.get('/Assi_upload/:u1/:u2',function(req,res)
 {
  var a=req.params.u1;
  var b=req.params.u2;
  console.log(a)
  
db2.find({'_id':a},function(err,newDoc)
  {
    db4.find({'tid':newDoc[0].tid},function(err,new3)
      {
    db.find({'email':b},function(err,new2)
  {
    
      res.render('Aupload',{stu:newDoc,result:new2,res2:new3})
     
})
    })
     })

  })
 app.get('/teacher/marks_submit/:u1/:u2',function(req,res)
 {
  var a=req.params.u1;
  var b=req.params.u2;
  console.log(a)
db4.find({'_id':a},function(err,result)
  {
    
   console.log(result)
      db4.update({'aname':result[0].aname,
  '_id':result[0]._id,
  'tid':result[0].tid,
  'adate':result[0].adate,
  'abranch':result[0].abranch,
  'file':result[0].file,
  'agrade':result[0].agrade,
  'amarks':result[0].amarks,
  'areg':result[0].areg
},{$push:{'agrade':req.query.agrade}},{'upsert':true},function(err,newDoc)
    {
      res.send('success');
        
     });
 })
 db4.find({'areg':b},function(err,new1)
  {
    console.log(new1[0].areg[2]) 
 
     })

  })
  app.post('/view_course/:u1/:u2',function(req,res)
 {
  var a=req.params.u1;
  var b=req.params.u2;
  console.log(a)
  db4.find({},function(err,new3)
      {
db2.find({'_id':a},function(err,newDoc)
  {
    db.find({'email':b},function(err,new2)
  {
   db5.find({'cid':a},function(err,new4)
  { 
      res.render('view-course',{stu:newDoc,result:new2,res2:new3,res3:new4})
      console.log(new4)
      
   }) 
})
    })
     })

  })
 app.get('/view_stu/:u1',function(req,res)
 {
  var a=req.params.u1;
 
db.find({'_id':a},function(err,newDoc)
  {
   
      res.render('view-stu',{stu:newDoc})
    
  })

  })
app.get('/logi',function(req,res)
 {
 	res.redirect('/login')

  })
app.get('/main',function(req,res)
 {
  res.render('main')

  })
app.get('/tlogi',function(req,res)
 {
  res.redirect('/tlogin')

  })
app.get('/login',function(req,res)
 {
 	res.render('log')

  })
app.get('/tlogin',function(req,res)
 {
  res.render('tlog')

  })

app.get('/signi',function(req,res)
 {
 	res.redirect('/signin')

  })
app.get('/signin',function(req,res)
 {
 	res.render('sign')

  })
app.get('/upload',function(req,res)
 {
 	
  console.log(result);
res.send('Upload ID proof to Update..go back')
 

  })

app.get('/assign/:u1',function(req,res)
 {
  var a=req.params.u1
 db3.find({'temail':a},function(err,res1){
  console.log(res1)
  res.render('assign',{res2:res1,email:a})
 })


  })
app.get('/Aupload/:u1/:u2',function(req,res)
 {
  
res.send('Upload ID proof to Update..go back')
 

  })




  app.get('/view_assign/:u1',function(req,res)
 {
  var a=req.params.u1
 db3.find({'_id':a},function(err,res1){
  db4.find({},function(err,res3){
  console.log(res1)
  console.log(res1)
  console.log('file:///'+__dirname)
  res.render('view_assign',{res2:res1,res3:res3,path:'file:///'+__dirname})
 })
 })

  })
app.get('/add_assign/:u1',function(req,res)
 {
   db4.count({'_id':req.query.aid},function(err,newDoc)
    {

      
       if (newDoc==false) 
   {
    console.log(newDoc)
     
  db4.insert({
  'aname':req.query.aname,
  '_id':req.query.aid,
  'tid':req.params.u1,
  'adate':req.query.adate,
  'abranch':req.query.acou,
  'file':req.query.afile,
  'agrade':req.query.agrade,
  'amarks':req.query.amarks,
  'areg':req.query.areg
       },function(err,ne1)
    {
     

      
                })
  res.redirect('/tlogin')
     }
else if (newDoc!=0) {
    res.send('Assignment ID is already in use')
   }

else 
{
res.send('Added successfully')
}
    })
  })

app.get('/remove_assign/:u1',function(req,res)
 {
   db4.count({'_id':req.query.aid},function(err,newDoc)
    {
       if (newDoc==true) 
   {
    console.log(newDoc)
  db4.remove({
  
  '_id':req.query.aid,
  
       },function(err,ne1)
    {
      
                })
  res.redirect('/tlogin')
     }
else if (newDoc==false) {
    res.send('Assignment ID is not there')
   }

else 
{
res.send('Removed successfully')
}
    })
    })
  
app.get('/upload/:user', (req, res) => {
  var a=req.params.user
   upload(req, res, (err) => {
    if(err){
      res.render('upload', {
      	name:a,
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('upload', {
        name:a,
          msg: 'Error: No File Selected!'
        });
      } else {

      	db.find({'email':req.params.user},function(err,result) {
        // body...
        console.log(req.file)
       db.update({'email':result[0].email},{'name':result[0].name,
 	'_id':result[0]._id,
 	'date':result[0].date,
 	'email':result[0].email,
 	'password':result[0].password,
 	'Phone':result[0].Phone,
  'courses':result[0].courses,
  'branch':result[0].branch,
    'gender':result[0].gender,
    'file':req.file.filename},{'upsert':true},function(err,newDoc)
    {
      res.render('aupload');
        
     });
        });
      }
    }
  });
});

app.post('/upload/:user', (req, res) => {
  var a=req.params.user
   upload(req, res, (err) => {
    if(err){
      res.render('upload', {
      	name:a,
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('upload', {
        name:a,
          msg: 'Error: No File Selected!'
        });
      } else {


      db.find({'email':req.params.user},function(err,result) {
        // body...
       db.update({'email':result[0].email},{'name':result[0].name,
  '_id':result[0]._id,
  'date':result[0].date,
  'email':result[0].email,
  'password':result[0].password,
  'Phone':result[0].Phone,
  'courses':result[0].courses,
  'branch':result[0].branch,
    'gender':result[0].gender,
    'file':req.file.filename},{'upsert':true},function(err,newDoc)
    {
      res.redirect('/success');
        });
        });
        
      }
    }
  });
});
app.get('/tupload/:user', (req, res) => {
  var a=req.params.user
  console.log(a)
   upload(req, res, (err) => {
    if(err){
      console.log(err)
      res.render('tupload', {

        name:a,
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('tupload', {
        name:a,
          msg: 'Error: No File Selected!'
        });
      } else {

        db3.find({'temail':req.params.user},function(err,result) {
        // body...
        console.log(req.file)
       db3.update({'temail':result[0].temail},{'tname':result[0].tname,
  '_id':result[0]._id,
  'tdate':result[0].tdate,
  'temail':result[0].temail,
  'tpassword':result[0].tpassword,
  'tPhone':result[0].tPhone,
  'tbranch':result[0].tbranch,
    'tgender':result[0].tgender,
    'tfile':req.file.filename},{'upsert':true},function(err,newDoc)
    {
      res.redirect('/tsuccess');
        
     });
        });
      }
    }
  });
});

app.post('/tupload/:user', (req, res) => {
  var a=req.params.user
  console.log(req.myImag)
   uplo(req, res, (err) => {
    if(err){
      res.render('tupload', {
        name:a,
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('tupload', {
        name:a,
          msg: 'Error: No File Selected!'
        });
      } else {

      db3.find({'temail':req.params.user},function(err,result) {
        // body...
       db3.update({'temail':result[0].temail},{'tname':result[0].tname,
  '_id':result[0]._id,
  'tdate':result[0].tdate,
  'temail':result[0].temail,
  'tpassword':result[0].tpassword,
  'tPhone':result[0].tPhone,
  'tbranch':result[0].tbranch,
    'tgender':result[0].tgender,
    'tfile':req.file.filename},{'upsert':true},function(err,newDoc)
    {
      res.redirect('/tsuccess');
        });
        });
        
      }
    }
  });
});

app.post('/aupload/:user1/:user2', (req, res) => {
  var a=req.params.user1
  var b=req.params.user2
  
    console.log(a)

   uploa(req, res, (err) => {
    if(err){
      res.send(err+'Go back')
    } else {
      if(req.file== undefined){
       
        res.send('Error: No File Selected!.....go back')
              } else {
            console.log(req.file.filename)

         db4.find({'_id':req.params.user1},function(err,result) {
           db.find({'_id':b},function(err,re) {
            
                  
                 
                               
     db4.update({'aname':result[0].aname,
  '_id':result[0]._id,
  'tid':result[0].tid,
  'adate':result[0].adate,
  'abranch':result[0].abranch,
  'file':result[0].file,
  'agrade':result[0].agrade,
  'amarks':result[0].amarks,
  'areg':result[0].areg,
},{$push:{'file':req.file.filename,'areg':b}},{'upsert':true},function(err,newDoc)
    {

      
      res.render('succ',{k:__dirname+'\\'+req.file.path,h:result[0].file})
      console.log(result[0])
        });
                });
              });
            }
          }
});

});


 app.get('/db',function(req,res)
 {
 if(req.query.email.length!=0 && req.query.password.length!=0)
 {	
 db.find({'email':req.query.email,'password':req.query.password},function(err,result1) {
    // body...
    var a=req.query.email;
    if(result1.length!=0)
    {
      db.find({},function(err,result) {
        // body...
        ab=result
        email=a
        k=result1[0]
        res.redirect('/home')
      })
      
    }
    else 
    {
      res.redirect('/login-error')

    }
})
}
else
  res.send('No Blanks are allowed...Go Back')
 })
 app.get('/tdb',function(req,res)
 {
 if(req.query.email.length!=0 && req.query.password.length!=0)
 {  
 db3.find({'temail':req.query.email,'tpassword':req.query.password},function(err,result1) {
    // body...
    var a=req.query.email;
    if(result1.length!=0)
    {
      db3.find({},function(err,result) {
        // body...
        ab=result
        email=a
        res.redirect('/thome')
      })
      
    }
    else 
    {
      res.redirect('/login-error')

    }
})
}
else
  res.send('No Blanks are allowed...Go Back')
 })

app.get('/thome/:u1',function(req,res)
 {
 	var b=req.params.u1
 	
 
      db3.find({},function(err,result) {
        // body...
        ab=result
        email=b
        res.redirect('/thome')
      })
      
   
})


app.get('/stu/:user',function(req,res)
 {
  var b=req.params.user
  
 db3.find({'temail':b},function(err,result1) {
  db.find({'branch':result1[0].tbranch},function(err,new1)
  {
  db2.find({'tid':result1[0]._id},function(err,new2){
      console.log(new2)
      console.log(result1)
            console.log(new1[0].courses[1])

          res.render('stu',{res:new1,res1:result1,res2:new2})

    })
    // body...
   })
  })

})

app.get('/stu/join_course/:u1/:u2',function(req,res)
 {
  var b=req.params.u1
  var c=req.params.u2
 db2.find({'_id':b},function(err,result1) {
  db.find({'branch':result1[0].Branch},function(err,new1)
  {
    db.find({'email':c},function(err,new3)
  {
    console.log(result1)
    console.log(new1)
    console.log(new3)
    db.update({'name':new3[0].name,
  '_id':new3[0]._id,
  'date':new3[0].date,
  'email':new3[0].email,
  'password':new3[0].password,
  'Phone':new3[0].Phone,
  'courses':new3[0].courses,
  'branch':new3[0].branch,
    'gender':new3[0].gender,
    'file':new3[0].file},{$push: { 'courses':result1[0]._id } },{'upsert':true}, function (err,new2) {
      res.redirect('/jsuccess')
      console.log(new2)

});
    });
   })
  })

})

app.get('/home',function(req,res)
 {
 	res.render('dbase')

  })
app.get('/thome',function(req,res)
 {
  res.render('tdbase')

  })
app.get('/success',function(req,res)
 {
 	res.render('success')

  })
app.get('/tsuccess',function(req,res)
 {
  res.render('tsuccess')

  })
app.get('/jsuccess',function(req,res)
 {
  res.render('jsuccess')

  })

app.get('/update1/:user',function(req,res)
 {
 	var a=req.params.user
 	db.find({'email':a},function(err,result)
 	{
 	res1=result,
 	res.render('update1')
})
  })
app.get('/tupdate1/:user',function(req,res)
 {
  var a=req.params.user
  db3.find({'temail':a},function(err,result)
  {
  res1=result,
  res.render('tupdate1')
})
  })

 app.get('/Update/:user',function(req,res)
 {
 	var a=req.params.user

 	db.find({'email':a},function(err,result)
 {
  console.log(result);
  if(result[0].file.length==0){
  res.render('update',{name:a,res1:result})
}
 else{
 	  res.render('update2',{name:a,res1:result})
 }

 })
 })
app.get('/TUpdate/:user',function(req,res)
 {
  var a=req.params.user

  db3.find({'temail':a},function(err,result)
 {
  console.log(result);
  if(result[0].tfile.length==0){
  res.render('tupdate',{name:a,res1:result})
}
 else{
    res.render('tupdate2',{name:a,res1:result})
 }

 })
 })

 app.get('/update',function(req,res)
 {
 db.count({'email':req.query.email},function(err,newDoc)
    {
      db.count({'Phone':req.query.phno},function(err,new2)
    {
      console.log(newDoc)
       if ( req.query.pwd.length>=8 && req.query.pwd.length<=12 && newDoc<=1 && new2<=1 && req.query.gender=='male' || req.query.gender == 'female') 
   {
 	db.update({'_id':req.query.reg},{
     'name':req.query.name,
 	'_id':req.query.reg,
  	'date':req.query.date,
 	'email':req.query.email,
 	'password':req.query.pwd,
 	'Phone':req.query.phno,
  'courses':req.query.course,
  'branch':req.query.cou,
 	'gender':req.query.gender,
 	'file':req.query.idprf
      },{'upsert':"true"},function(err,newDoc)
    {
      res.redirect('/success')
     })
 }
 else if (newDoc!=0) {
    res.redirect('/dup')
   }
else if (new2!=0) {
    res.redirect('/dup2')
   }
   else if (req.query.pwd.length<8 || req.query.pwd.length>12) {
    res.send('password length should be 8-12 characters......go back')
   }
  else
{
db.update({'_id':req.query.reg},{
     'name':req.query.name.value,
  '_id':req.query.reg.value,
    'date':req.query.date.value,
  'email':req.query.email.value,
  'password':req.query.pwd.value,
  'Phone':req.query.phno.value,
  'courses':req.query.course.value,
  'branch':req.query.cou.value,
  'gender':req.query.gender.value,
  'file':req.query.idprf.value
      },{'upsert':"true"},function(err,newDoc)
    {
      res.redirect('/success')
     })
}
 

 

 })
      })
 })

app.get('/tupdate',function(req,res)
 {
 db3.count({'temail':req.query.email},function(err,newDoc)
    {
      db3.count({'tPhone':req.query.phno},function(err,new2)
    {
      console.log(newDoc)
       if ( req.query.pwd.length>=8 && req.query.pwd.length<=12 && newDoc<=1 && new2<=1 && req.query.gender=='male' || req.query.gender == 'female') 
   {
  db3.update({'_id':req.query.reg},{
     'tname':req.query.name,
  '_id':req.query.reg,
    'tdate':req.query.date,
  'temail':req.query.email,
  'tpassword':req.query.pwd,
  'tPhone':req.query.phno,
  'tbranch':req.query.cou,
  'tgender':req.query.gender,
  'tfile':req.query.idprf
      },{'upsert':"true"},function(err,newDoc)
    {
      res.redirect('/tsuccess')
     })
 }
 else if (newDoc!=0) {
    res.redirect('/dup')
   }
else if (new2!=0) {
    res.redirect('/dup2')
   }
   else if (req.query.pwd.length<8 || req.query.pwd.length>12) {
    res.send('password length should be 8-12 characters......go back')
   }
  else
{
db3.update({'_id':req.query.reg},{
     'tname':req.query.name.value,
  '_id':req.query.reg.value,
    'tdate':req.query.date.value,
  'temail':req.query.email.value,
  'tpassword':req.query.pwd.value,
  'tPhone':req.query.phno.value,
  'tbranch':req.query.cou.value,
  'tgender':req.query.gender.value,
  'tfile':req.query.idprf.value
      },{'upsert':"true"},function(err,newDoc)
    {
      res.redirect('/tsuccess')
     })
}
 

 

 })
      })
 })

app.listen(3000, function () {
console.log('Example app listening on port 3000!')
})