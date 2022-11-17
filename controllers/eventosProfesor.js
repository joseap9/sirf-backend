const { response } = require('express');


const getProfesor = (req, res = response) => {
    req.getConnection( (err, conn)  => {
        conn.query('SELECT * FROM profesor', (err, profesor) => {
            if (err) {
                return res.status(500).json(
                    {
                        ok: false,
                        msg: err
                    }
                );
            }
            res.json({
                ok: true,
                profesor
            })
        });
    });
}

const getAsignaturas = (req, res) => {
    console.log(req.body)
    const { id_profesor } = req.body
    
    req.getConnection( (err, conn)  => {

        conn.query('SELECT * FROM asignatura where id_profesor = ?', [id_profesor], (err, asig) => {
            if (err) {
                return res.status(500).json(
                    {
                        ok: false,
                        msg: err
                    }
                );
            }
            res.json({
                ok: true,
                asig
            })
        });
    });
}

const pasarAsistencia = (req, res) => {
    console.log(req.body.asistentes)

    const { asistentes } = req.body
    
    req.getConnection( (error, conn)  => {

        if (error) {
            return res.status(500).json(
                {
                    ok: false,
                    msg: err
                }
            );
        }

        for( let alumno = 0; alumno < asistentes.length; alumno++ ) {

            conn.query('INSERT INTO asistencia (id_asignatura, id_alumno, estado) values (?,?,?)', 
            [asistentes[alumno].id_asignatura, asistentes[alumno].id_alumno, asistentes[alumno].estado], (err, asis) => {

                console.log(asis);
                
            });
        }

        res.json({
            ok: true,
            msg: "agregados"
        })
        
    });
}

const asistenciaPorFecha = (req, res) => {
    console.log(req.body)

    const { fecha } = req.body;

    req.getConnection( (err, conn)  => {
        conn.query('SELECT count(*) asistentes FROM asistencia join asignatura on asistencia.id_asistencia = asignatura.id_asignatura where fecha_asignatura = ? and estado = 1 ', [ fecha ] ,(err, asis) => {
            if (err) {
                return res.status(500).json(
                    {
                        ok: false,
                        msg: err
                    }
                );
            }
            res.json({
                ok: true,
                asis
            })
        });
    });
}

const agregarAlumno = (req, res) => {

    console.log(req.body.alumno.fecha)

    const { alumno } = req.body
    
    req.getConnection( (error, conn)  => {

        if (error) {
            return res.status(500).json(
                {
                    ok: false,
                    msg: err
                }
            );
        }

        conn.query('INSERT INTO alumno (nombre, apellido, rut, fecha_nacimiento) VALUES (?,?,?,?)', 
        [alumno.nombre, alumno.apellido, alumno.rut, alumno.fecha], (err, alumno) => {
            if (err) {
                return res.status(500).json(
                    {
                        ok: false,
                        msg: err
                    }
                );
            }

            res.json({
                ok: true,
                msg: alumno
            })

            
        });
        
    });
}
module.exports = { getProfesor, getAsignaturas, pasarAsistencia, asistenciaPorFecha, agregarAlumno}