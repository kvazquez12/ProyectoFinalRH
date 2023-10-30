const express = require('express');
const empleado = express.Router();
const db = require('../config/database')

empleado.post("/", async (req, res, next) => {
    const { nombre, apellidos, telefono, email, direccion } = req.body;

    if (nombre && apellidos && telefono && email && direccion) {
        let query = "INSERT INTO empleados (nombre, apellidos, telefono, email, direccion)";
        query += ` VALUES('${nombre}', ${apellidos}, ${telefono}, ${email}, ${direccion})`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "empleado insertado correctamente"});
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"})


})

empleado.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE pok_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "empleado borrado correctamente" })
    }
    return res.status(404).json({ code: 404, message: "empleado no encontrado" })
});

empleado.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE empleado SET pok_name='${pok_name}',pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado actualizado correctamente"});
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

empleado.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if(req.body.pok_name) {
        let query = `UPDATE empleado SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
})

empleado.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: pkmn});
})

empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 1 && id <= 725) {
        const pkmn = await db.query("SELECT * FROM empleados WHERE pok_id="+id+";");
    return res.status(200).json({code: 200, message: pkmn }); 
    }
    else {
        return res.status(404).send({ code: 404, message: "empleado no encontrado" })
    } 
})

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM empleados WHERE pok_name='"+name+"';");
    if (pkmn.length > 0) {
        return res.status(200).json({code: 200, message: pkmn }); 
    }
    return res.status(404).send({ code: 404, message: "empleado no encontrado" })

    })

    module.exports = empleado;