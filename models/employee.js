const mongoose=require("mongoose");
const company =require("./company");
const Employee =new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        unique:true,
    },
    company:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Company"

    }
});
Employee.pre("remove",async function(){
    let comp = await company.findById(this.company);
    console.log({empId:this.id})
    comp.employee_ids.remove(this.id);
    comp.no_of_empl-=1;
    await comp.save();
})
const employee =new mongoose.model("Employee",Employee);
module.exports=employee;
