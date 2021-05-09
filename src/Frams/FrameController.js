const FrameModel = require("./FrameModel");
var textSearch = require('mongoose-text-search');

exports.store = async (req, res, next) => {
    try {
        if (!req.body)
            return res
                .status(400)
                .json({ status: false, message: "Oops ! Invalid Details" });



        if (!req.body.name)
            return res
                .status(200)
                .json({ status: false, message: "Oops ! name is required !" });


        const frame = new FrameModel();
        frame.name = req.body.name;
        frame.tag = req.body.tag;
        frame.label = req.body.label;


        await frame.save((error, frame) => {
            if (error) return res.status(200).json({ status: false, error });
            else
                return res.status(200).json({
                    status: true,
                    message: "frame Add Successfully",
                    frame,
                });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error });
    }
};


exports.search = async (req, res) => {
    try {


        if (!req.query.keyword)
            return res
                .status(200)
                .json({ status: false, message: "Oops ! keyword is required !" });
        const keyword = req.query.keyword;


        const query = { $text: { $search: "trek" } };
        const projection = {
            _id: 0,
            name: 1,
        };


        const datalist = await FrameModel.find()

            .sort({ createdAt: -1 })



        if (!datalist) {
            throw new Error();
        }

        FrameModel.textSearch('first', function (err, output) {
            if (err) return res
                .status(200)
                .json({ status: 200, message: "Success", err });

            // var inspect = require('util').inspect;
            // console.log(inspect(output, { depth: null }
            // ));

        });
        // return res
        //     .status(200)
        //     .json({ status: 200, message: "Success", data: datalist });

    } catch (error) {
        console.log(error);
        return res
            .status(error.status || 500)
            .json({ error: error.errors || error.message || "Server Error" });
    }
};