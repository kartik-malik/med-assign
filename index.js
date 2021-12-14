const express = require('express');
const app = express();
const mongoose=require("mongoose");
const company = require('./models/company');
const employee=require("./models/employee");
const port = process.env.PORT || 3000;
// mongoose.connect('mongodb://localhost:27017/myapp',function(){
//     console.log("Connected");
// })
mongoose.connect("mongodb+srv://kartik:k@cluster0.fbbes.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser:true,
  useUnifiedTopology:true,
})
app.use(express.json());
app.post("/create_emp/:company_id",async function(req,res){
     const {name}=req.body;
     const {company_id}=req.params;
     try {
        const comp=await company.findOne({_id:company_id});
        const emp=await employee.create({name,company:company_id});
        comp.no_of_empl+=1;
        comp.employee_ids.push(emp._id);
        await comp.save();
       await emp.populate("company",{
            name:true
        })
        
        res.send({employee:emp});
        
   }
   catch(err){
       console.log(err);
    res.send({message:"Something went wrong"});
   }
})
app.post("/create_company",async function(req,res){
    const {name}=req.body;
    try {
        const comp=await company.create({name});
        console.log(comp);
        res.send(comp);
    }
    catch(err){
        console.log(err);
        res.send({message:"Something went wrong"});
    }
})

app.get("/get_all_company",async function(req,res){
    try {
        const comp=await company.find({}).sort({no_of_empl:-1});
        console.log(comp);
        res.send(comp);
    }
    catch(err){
        console.log(err);
        res.send({message:"Something went wrong"});
    }
});
app.delete("/delete_user/:id",async function(req,res){
const emp_id=req.params.id;
const emp=await employee.findById(emp_id);
emp.remove();
res.send({message:"delete successfully"})
})
app.get("/get_company_by_name/",async function(req,res){
 try {
    const {name}=req.query;
    const comp=await company.find({name});
      res.send(comp);
 }
 catch(err){
   console.log(err);
   res.send({message:"Something went wrong"})
 }
});
app.get("/get_company_by_name/:name",async function(req,res){
    try {
       const {name}=req.params;
       const comp=await company.find({name});
         res.send(comp);
    }
    catch(err){
      console.log(err);
      res.send({message:"Something went wrong"})
    }
   });
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
