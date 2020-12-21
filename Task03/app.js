const yargs = require('yargs')
const fs= require('fs')
data = []
// var isEmty = function (arr) {
//     if(arr.length>=1) return true
//     return false
// }
try{
    data = JSON.parse(fs.readFileSync('myData.json').toString())
}
catch(e)
{
    fs.writeFileSync('myData.json', "[]")
}

yargs.command({
    command: 'add',
    describe: 'add new task',
    builder:{
        taskId:{
            type:'number',
            demandOption:true
        },
        taskTitle:{
            type: 'string',
            demandOption:true,
            describe:'description'
        },
        taskContent:{
            type: 'string',
            demandOption:true
        }
    },
    handler(argv){
        data.push(
            {
                id:argv.taskId,
                title:argv.taskTitle, 
                content:argv.taskContent
            })
            fs.writeFileSync('myData.json', JSON.stringify(data))
            console.log(data)
    }
})

yargs.command({
    command:'read',
    handler(){
        // if(isEmty(data))console.log('no data to show')
        data = JSON.parse(fs.readFileSync('myData.json').toString())
        console.log(data)
    }
})
yargs.command({
    command:'edit',
    builder:{
        taskId:{
            type:'number',
            demandOption:true
        },
        taskTitle:{
            type:'string',
            demandOption:true
        },
        taskContent:{
            type:'string',
            demandOption:true
        }
    },
    handler(argv){
        // if(isEmty(data))console.log("no data")
        data.forEach(element => {
            if(element.id==argv.taskId){
                element.title=argv.taskTitle
                element.content=argv.taskContent
                fs.writeFileSync('myData.json', JSON.stringify(data))
                console.log(data)
            }
        });
    }
})
yargs.command({
    command:'delete',
    builder:{
        taskId:{
            type:"number",
            demandOption:true
        },
    },
    handler(argv){
        // if(isEmty(data))console.log('no data')
        data.forEach((e,i) => {
            if(e.id==argv.taskId){
                data.splice(i,1)
                fs.writeFileSync('myData.json', JSON.stringify(data))
                console.log(data)
            }
        });
    }
})
yargs.parse()
