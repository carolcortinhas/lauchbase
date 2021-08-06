const fs = require('fs')
const data = require ("./data.json")
const {age} = require ('./utils')
const Intl = require('intl')

exports.show = function(req, res) {
    const {id} = req.params

    const foundInstrutor = data.instrutores.find(function(instrutor){
        return instrutor.id == id
    })

    if (!foundInstrutor) return res.send ("Instrutor não encontrado")

    const instrutor = {
        ...foundInstrutor,
        age: age(foundInstrutor.birth),
        services: foundInstrutor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstrutor.created_at),
    }

    return res.render ("instrutores/show", {instrutor})
}

exports.post = function(req, res) {0
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        let {avatar_url, birth, name, services, gender} = req.body


        birth = Date.parse(birth)
        const created_at = Date.now()
        const id = Number(data.instrutores.length + 1)

        data.instrutores.push({
            id,
            avatar_url,
            name,
            birth,
            gender,
            services,
            created_at,
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2),  function (err){
            if (err) return res.send("Write file error!")
                 return res.redirect("/instrutores")
        })
    
    // return res.send(req.body)
}

