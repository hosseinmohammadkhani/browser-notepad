const redis = require("redis");
const client = redis.createClient();

let notes = []
let retrievedArray = []

client.on("error", function(error) {
  console.error(error);
});

module.exports.renderHomePage = (req , res) => {
    res.render("./Home.ejs" , {
        pageTitle : "Browser notepad",
        path : "/",
        retrievedArray
    })
}


module.exports.saveNote = (req, res) => {
    notes.push(req.body.note)

    // Converts the array to a JSON string
    const jsonNotes = JSON.stringify(notes);

    client.set('notes', jsonNotes, (err, result) => {
        if (err) console.error('Error storing array:', err);
        else console.log('Array stored successfully:', result);
    })

    client.get("notes" , (err , jsonNotes) => {
        if(err) console.log(err);
        
        else{
            if(jsonNotes){
                // Parse stringified JSON back to an array 
                retrievedArray = JSON.parse(jsonNotes)
    
                console.log("Retrieved array : " , retrievedArray);

                return res.redirect("/")
            }
            else console.log("Array not found in redis"); 
        }
    })
}

module.exports.deleteNotes = async(req , res) => {
    notes = []
    return res.render("./Home.ejs" , {
        pageTitle : "Browser notepad",
        path : "/",
        retrievedArray : []
    })
}