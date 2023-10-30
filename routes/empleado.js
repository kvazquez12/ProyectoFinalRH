const express = require('express');
const empleado = express.Router();
const db = require('../config/database')

empleado.post("/", async (req, res, next) => {
    const { nombre, apellidos, telefono, email, direccion } = req.body;

    if (nombre && apellidos && telefono && email && direccion) {
        let query = "INSERT INTO empleados (nombre, apellidos, telefono, email, direccion)";
        query += ` VALUES('${nombre}', '${apellidos}', ${telefono}, '${email}', '${direccion}')`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "empleado insertado correctamente"});
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"})


})

empleado.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE id_empleado=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "empleado borrado correctamente" })
    }
    return res.status(404).json({ code: 404, message: "empleado no encontrado" })
});

empleado.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { nombre, apellidos, telefono, email, direccion } = req.body;
    if (nombre && apellidos && telefono && email && direccion) {
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',`;
        query += `telefono=${telefono},email='${email}',direccion='${direccion}' WHERE id_empleado=${req.params.id};`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "empleado actualizado correctamente"});
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"})

})

empleado.get('/', async (req, res, next) => {
    const employee = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: employee});
})

empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 1 && id <= 999) {
        const employee = await db.query("SELECT * FROM empleados WHERE id_empleado="+id+";");
    return res.status(200).json({code: 200, message: employee }); 
    }
    else {
        return res.status(404).send({ code: 404, message: "empleado no encontrado" })
    } 
})

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const employee = await db.query("SELECT * FROM empleados WHERE nombre='"+name+"';");
    if (employee.length > 0) {
        return res.status(200).json({code: 200, message: employee }); 
    }
    return res.status(404).send({ code: 404, message: "empleado no encontrado" })

    })

    module.exports = empleado;