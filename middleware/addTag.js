var fs = require('fs');
module.exports.addProduct = function (req, res, next) {
try {  
    var data = fs.readFileSync('Files/stopwords_fr.txt', 'utf8');
    var re = /\s*(,|$)\s*/;
    var stopwords = data.split(re).filter(it =>it!=",");
    var motcle=req.body.texte.split(' ').filter(word=> !stopwords.includes(word))
        var rent = fs.readFileSync('Files/renting.txt', 'utf8');
        var re = /\s*(,|$)\s*/;
        var renting = rent.split(re).filter(it =>it!=",");
        var scoreR=(motcle.filter(m=>renting.includes(m.toLowerCase()))).length
        var diploma = fs.readFileSync('Files/diploma.txt', 'utf8');
        var re = /\s*(,|$)\s*/;
        var diplo = diploma.split(re).filter(it =>it!=",");
        var scoreD=(motcle.filter(m=>diplo.includes(m.toLowerCase()))).length
        if(scoreR>scoreD){
            res.tag="Renting"
        }else if(scoreR<scoreD){
            res.tag="Diploma"
        }else{
            res.tag="Autre"
        }
} catch(e) {
    console.log('Error:', e.stack);
}
next()
}
