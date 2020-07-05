const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./projeto.db')

db.serialize(function(){

    
    db.run(`
        CREATE TABLE IF NOT EXISTS tarefa(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            hour TEXT,
            description TEXT
            
        );
    `)

    // Inserir dados na tabela
    /* const query = `
    INSERT INTO tarefa(
        title,
        hour,
        description,
        
    ) VALUES (?, ?, ?);
    `
    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    }) */ 

    //Consultar dados na tabela
    /* db.all(`SELECT * FROM tarefa`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    }) */

    //Deletar um dado da tabela
    /* db.run(`DELETE FROM tarefa WHERE id = 2`, [1], function(err){
        if (err) return console.log(err)

        console.log("DELETEI", this)
    })  */
})

module.exports = db