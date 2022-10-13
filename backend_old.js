/*
const { exec } = require('child_process');
const fs = require("fs");
const dotenv = require('dotenv');
const ques = require('./question_status.json')
dotenv.config();
TEST = true

if (!TEST) {
    const express = require('express')
    const cors = require('cors')
    const router = express.Router()
    router.use(express.urlencoded({ extended: false }))
    router.use(express.json())
    router.use(cors())
}


function execute(key, program, l) {
    exec('g++ ' + program + ' -o A.out')
    // do not proceed if the file is not compiled
    let x = false;
    while (!x) {
        if (fs.existsSync('A.out')) {
            x = true;
        }
    }
    
    let error = ""
    const { stdout, stderr } = exec('./A.out < input/' + key + "/" + "00-sample-001.txt" + ' > userout/A.out')
    
    let output_file = fs.readFileSync('output/' + key + "/" + "00-sample-001.txt", 'utf8');
    let user_output_file = fs.readFileSync('userout/A.out', 'utf8');
    // console.log(output_file.toString())
    // console.log(";;;")
    // console.log(user_output_file.toString())
    // console.log(user_output_file.toString() === output_file.toString())




    fs.readdirSync("input/" + key).forEach(file => {
        const {stdout, stderr} = exec('./A.out < input/' + key + "/" + file + ' > userout/A.out')
        if (stderr) {
            error = "RE"
        }
        // console.log(file)
        let output_file = fs.readFileSync('output/' + key + "/" + file, 'utf8');
        let user_output_file = fs.readFileSync('userout/A.out', 'utf8');
        if (file === "00-sample-001.txt") {

        
        console.log(output_file.toString())
        console.log(";;;")
        console.log(user_output_file.toString())
        console.log("ASDASDASD")
        console.log(user_output_file.toString())
        }
        // remove all whitespaces from the output
        // output_file = output_file.replace(/\s/g, '')
    
        if (output_file.toString().replace(/\s/g, '') === user_output_file.toString().replace(/\s/g, '')) {
            let asdsad
        } else {
            error = "WA"
        }
    })
    if (error == "") {
        return "AC"
    } else {
        return error
    }

    // fs.readdirSync("input/" + key).forEach(file => {
    //     exec('./A.out < input/' + key + "/" + file + ' > userout/A.out')
    //     let file_key = file.split('.').slice(0, -1).join('.');
    //     let output_file = fs.readFileSync('output/' + key + "/" + file_key + '.txt', 'utf8');
    //     let user_output_file = fs.readFileSync('userout/A.out', 'utf8');
    //     console.log("Check: " + output_file === user_output_file)
    //     if (output_file === user_output_file) {

    //         isError = false;
    //     } else {
    //         console.log(output_file)
    //         console.log("---")
    //         console.log(user_output_file)
    //         isError = true;
    //     }
    // })
}


// function run(key, program) {
//     const start = new Date();
//     let logs = ""
//     logs += Date.now()
//     let error = ""

//     fs.readdirSync("input/" + key).forEach(file => {
//         exec('./A.out < input/' + key + "/" + file + ' > userout/A.out', (err, stdout, stderr) => {

//             // the *entire* stdout and stderr (buffered)
//             console.log(`stdout: ${stdout}`);
//             if (err || stdout) {
//                 logs += " " + err + "\n" + "CE"
//                 fs.appendFile("logs.txt", logs, () => {
//                 })
//                 console.log(err);
//                 error = "CE";
//                 return error;
//             }
//             console.log(`stderr: ${stderr}`);
//         })
//         const end = new Date();
//         const time = end.getTime() - start.getTime();
//         console.log(time)
//         if (time > 2000) {
//             logs += Date.now() + " " + "TLE"
//             fs.appendFile("logs.txt", logs, () => {
//             })
//             error = "TLE";
//             return error;
//         }
//         let file_key = file.split('.').slice(0, -1).join('.');
//         let output_file = fs.readFileSync('output/' + key + "/" + file_key + '.txt', 'utf8');
//         let user_output_file = fs.readFileSync('userout/A.out', 'utf8');
//         console.log("Check: " + output_file === user_output_file)
//         if (output_file !== user_output_file) {
//             logs += " " + "WA"
//             fs.appendFile("logs.txt", logs, function (err) {

//             })
//             error = "WA";
//             return "WA";
//         } else {
//             logs = Date.now() + " " + program + " " + "AC"
//             fs.appendFile("logs.txt", logs, () => {
//             })
//         }
//     })
//     if (error) {
//         return error;
//     } else {
//         return "AC";
//     }
// }

// async function execute(key, program, l) {
//     let ext = ""
//     if (l === "py3") {
//         ext = ".py"
//     } else {
//         ext = ".cpp"
//     }
//     fs.writeFile("logs/" + Date.now().toString() + ext, fs.readFileSync(program, 'utf8'), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })
//     let logs = Date.now() + " " + program
//     if (l === "py3") {
//         // iterate over all files in the input directory
//         const files = fs.readdirSync('input').length
//         let AC = 0
//         fs.readdirSync("input/" + key).forEach(file => {
//             const start = Date.now()
//             let {
//                 stdout,
//                 stderr
//             } = exec("python3 " + program + " < input/" + key + "/" + file + " > userout/A.out", (error, stdout, stderr) => {
//                 if (error) {
//                     console.log(`error: ${error.message}`);
//                     return "CE";
//                 }
//                 if (stderr) {
//                     console.log(`stderr: ${stderr}`);
//                     return "CE";
//                 }
//                 console.log(`stdout: ${stdout}`);
//             });
//             const end = Date.now()
//             logs += " " + (end - start)
//             if ((end - start) > 10000) {
//                 logs += " TLE"
//             }
//             let file_key = file.split('.').slice(0, -1).join('.');
//             let output_file = fs.readFileSync('output/' + key + "/" + file_key + '.txt', 'utf8');
//             let user_output_file = fs.readFileSync('userout/A.out', 'utf8');
//             if (output_file !== user_output_file) {
//                 logs += " " + "WA"
//                 fs.appendFile("logs.txt", logs, function (err) {
//                 })
//                 return "WA";
//             }
//             logs = Date.now() + " " + program + " " + "AC"
//             fs.appendFile("logs.txt", logs, () => {
//             })
//         })
//     } else {
//         let error = ""
//         console.log("exts")
//         // await exec('g++ ' + program + ' -o A.out', (err, stdout, stderr) => {
//         //     console.log('2')
//         //     if (err) {
//         //         logs += " " + err
//         //         console.log(err);
//         //         error = "CE";
//         //         return error;
//         //     }
//         //     console.log('3')
//         //     if (stderr) {
//         //         logs += " " + stderr
//         //         logs += "\n" + "CE"
//         //         console.log(stderr);
//         //         error = "CE";
//         //         return error;
//         //     }
//         //     console.log('4')
//         //     if (error) {
//         //         return error;
//         //     }
//         //     // the *entire* stdout and stderr (buffered)
//         //     console.log(`stdout: ${stdout}`);
//         //     console.log(`stderr: ${stderr}`);

//         //     console.log('5')
//         //     fs.appendFile("logs.txt", logs, function (err) {
//         //     })
//         //     // FUNCTION CREATED FROM HERE
//         //     console.log('6')
//         //     const verdict = run(key, program)

//         //     console.log('7')
//         //     if (verdict !== "AC") {
//         //         error = verdict;
//         //     }
//         //     console.log('8')
//         //     if (error) {
//         //         return error;
//         //     } else {
//         //         return "AC";
//         //     }
//         // });
//         exec('g++ ' + program + ' -o A.out')
//         console.log('2')

//         console.log('3')

//         console.log('4')

//         // the *entire* stdout and stderr (buffered)


//         console.log('5')
//         fs.appendFile("logs.txt", logs, function (err) {
//         })
//         // FUNCTION CREATED FROM HERE
//         console.log('6')
//         const verdict = run(key, program)

//         console.log('7')
//         if (verdict !== "AC") {
//             error = verdict;
//         }
//         console.log('8')
//         if (error) {
//             return error;
//         } else {
//             return "AC";
//         }
//     }

// }

if (TEST) {
    // execute("4692", "A.cpp", "cpp").then((res) => {

    //     console.log(res)
    // })
    // console.log(execute("4692", "A.cpp", "cpp"))
} else {
    router.post('/', async (req, res) => {
        const program = req.body.program
        const key = req.body.key
        const language = req.body.language
        const id = req.body.id
        const r = await execute(key, program, language)
        console.log("Result: " + r)
        let status = ques;
        if (status[id] !== "AC") {
            status[id].status = r
        } else {
            alert("Verdict on previous question:" + r)
        }
        fs.writeFileSync('question_status.json', JSON.stringify(status), function (err) {
            console.log('done')
        })

        res.location('/questions')
    })
    module.exports = router
}
*/
