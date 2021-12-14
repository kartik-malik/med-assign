const mongoose=require("mongoose");
const Company =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true,
    },
    no_of_empl:{
        type:Number,
        default:0,
    },
    employee_ids:[
        {
            type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
        }
    ]
});

const company =new mongoose.model("Company",Company);
module.exports=company;
