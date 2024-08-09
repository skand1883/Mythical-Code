const Problem = require("../models/Problem");
const executeCpp = require('../compiler/executeCpp');
const executePy = require("../compiler/executePython");
const generateFile = require('../compiler/generateFile');
const path = require("path");

exports.addProblem = async (req, res) => {
    try {
        let problem = new Problem({...req.body, slug: "a"});
        await problem.save();
        res.status(201).json({
            success: true,
            message: "Prblem added successfully",
            problem
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});

        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            data: problems
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.getProblem = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Id not found",
            });
        }

        const problem = await Problem.findById(id);

        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.checkProblem = async (req, res) => {
    try {
        let slug = req.params.slug;
        const problem = await Problem.findOne({ slug });
        //console.log(problem.output);
        if (!problem) {
            return res.status(400).json({ 
                success: false,
                message: "No Problem Found" 
            });
        }
        // else return res.status(200).json(problem);
        const { lang, code } = req.body;
        if (!code) {
            return res.status(400).json({ 
                success: false,
                message: "Empty Code Body" 
            });
        }


        const filePath = await generateFile(lang, code);
        var inputPath = `${path.join(__dirname, '../../inputs/')}`;
        inputPath=inputPath+`${slug}.txt`;
        let userOutput;
        if (lang === "cpp") {
            userOutput = await executeCpp(filePath, inputPath);
        }
        else if (lang == "py") {
            userOutput = await executePy(filePath, inputPath);
        }
        userOutput = userOutput.trim();
        // console.log(userOutput);
        // console.log("---");
        // console.log(problem.output);
        // console.log("---");
        
        // userOutput = userOutput.replace(/\n/g, "    ");
        // problem.output = problem.output.replace(/\n/g, "    ");
        console.log(JSON.stringify(userOutput));
        console.log("---");
        console.log(JSON.stringify(problem.output));
        // problem.output=problem.output.replace(/\n/g, "\r\n");
        // console.log("---");
        // console.log(JSON.stringify(problem.output));
        if (userOutput === problem.output) {
            return res.status(200).json({
                success: true,
                message: "All test case passed"
            })
        }
        else {
            return res.status(200).json({
                success: false,
                message: "Failing in Hidden Test Case",
            });
        }

        return res.status(200).json(codeFilePath);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};