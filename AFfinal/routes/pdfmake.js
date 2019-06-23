const express = require('express');
const router = express.Router();

const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next)=>{
    //res.send('PDF');

    const date = req.body.date;
    const time = req.body.time;
    const subject = req.body.subject;


    var documentDefinition = {
        content: [
            'Final Exam Time table',
            'Date Time Subject',
            `${date} ${time} ${subject}`,
        ]
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200,
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="Report.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

});


module.exports = router;