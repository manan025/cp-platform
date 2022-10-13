const {execSync} = require('child_process');
const fs = require("fs");
const dotenv = require('dotenv');
const flash = require('express-flash');
const request = require('request');
const session = require('express-session');
const ques = require('./question_status.json')
dotenv.config();

const express = require('express')
const cors = require('cors')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
router.use(express.json())
router.use(cors())

router.use(express.static(__dirname + '/public'));


router.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
}));

router.use(flash());


function execute(key, program, l) {
    let stdout;
    let error;
    try {
        const ext = l === 'py3' ? '.py' : '.cpp';
        fs.writeFile("logs/" + Date.now().toString() + ext, fs.readFileSync(program, 'utf8'), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    } catch (e) {
        console.log(e);
    }
    try {
        if (l === "py3") {
            fs.readdirSync("input/" + key).forEach(file => {
                try {
                    const start = Date.now()
                    execSync(`python ${program} < input/${key}/${file} > userout/A.out`, {encoding: 'utf8'})

                    const end = Date.now()
                    if (end - start > 2000) {
                        error = "TLE"
                        return error;
                    }
                } catch (e) {
                    error = "RE"
                    console.log(e)
                    return error
                }
                let output_file = fs.readFileSync(`output/${key}/${file}`, 'utf8');
                let user_output_file = fs.readFileSync('userout/A.out', 'utf8');

                // console.log("Program: \n" + output_file.toString())
                // console.log("Output:\n" + user_output_file.toString() + "\n\n")

                // console.log({ output_file, user_output_file })

                if (output_file.toString() === user_output_file.toString()) {
                    console.log("AC")
                } else {
                    error = "WA"
                }
            })
            if (error) {
                return error;
            } else {
                return "AC"
            }
        } else {
            let error = ""
            if (fs.existsSync('A.out')) {
                fs.unlinkSync('A.out')
            }
            try {
                stdout = execSync("g++ " + program + " -o A.out")
            } catch (e) {
                // console.log(e)
                error = "CE"
                return error
            }

            fs.readdirSync("input/" + key).forEach(file => {
                try {
                    const start = Date.now()
                    execSync(`./A.out < input/${key}/${file} > userout/A.out`, {encoding: 'utf8'})

                    const end = Date.now()
                    if (end - start > 2000) {
                        error = "TLE"
                        return error;
                    }
                } catch (e) {
                    error = "RE"
                    console.log(e)
                    return error
                }
                let output_file = fs.readFileSync(`output/${key}/${file}`, 'utf8');
                let user_output_file = fs.readFileSync('userout/A.out', 'utf8');

                // console.log("Program: \n" + output_file.toString())
                // console.log("Output:\n" + user_output_file.toString() + "\n\n")

                // console.log({ output_file, user_output_file })

                if (output_file.toString() === user_output_file.toString()) {
                    console.log("AC")
                } else {
                    error = "WA"
                }
            })
            if (error) {
                return error;
            } else {
                return "AC"
            }
        }
    } catch (err) {
        console.log("Process errored", err)
    }

}

// console.log(execute("4692", "A.cpp", "cpp"))

router.post('/', async (req, res) => {
    const program = req.body.program
    const key = req.body.key
    const language = req.body.language
    const id = req.body.id

    const r = execute(key, program, language)

    console.log("Result: " + r)

    fs.writeFileSync('msg.json', JSON.stringify({'result': r}), function (err) {
        console.log('done')
    })

    let status = ques;
    if (status[id] !== "AC") {
        status[id].status = r
    } else {
        alert("Verdict on previous question:" + r)
    }

    fs.writeFileSync('question_status.json', JSON.stringify(status), function (err) {
        console.log('done')
    })

    res.redirect('http://localhost:8000/questions')
})


module.exports = router
