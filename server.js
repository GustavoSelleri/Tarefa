const express = require("express")
const server = express()

const db = require("./db")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})

server.get("/", function(req, res) {

    db.all(`SELECT * FROM tarefa`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedTars = [...rows].reverse()

        let lastTars = []
        for (let tar of reversedTars){
            if(lastTars.length < 2) {
                lastTars.push(tar)
            }
        }

        return res.render("index.html", { tars: lastTars })
    })

})    

server.get("/index", function(req, res) {


    db.all(`SELECT * FROM tarefa`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedTars = [...rows].reverse()

        return res.render("index.html", { tars: reversedTars})

    })
    
})

server.post("/", function(req, res) {
    
    const query = `
    INSERT INTO tarefa(
        title,
        hour,
        description
    ) VALUES (?, ?, ?);
    `
    
    const values = [
        req.body.title,
        req.body.hour,
        req.body.description
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/index")
    })
})

// liguei meu servidor na porta 3000
server.listen(3000)