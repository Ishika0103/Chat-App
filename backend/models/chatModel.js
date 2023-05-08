const mongoose=require('mongoose');  //mongose used to connect with mongodb
const chatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true}, //trim so that there is no trailing spaces after or before it
        isGroupChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,  //points to id of particular user
            ref:"User",
        }],
        latestMessage:{type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        },
    },{
        timestamps:true,

    } 
);

const Chat=mongoose.model("Chat",chatModel);
module.exports=Chat;
