const { response } = require('express');


const getProfesor = (req, res = response) => {
    const { rut,password } = req.body
    req.getConnection( (err, conn)  => {
        conn.query('SELECT * FROM profesor where rut = ? and password = ?',[rut,password] ,(err, profesor) => {
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
    const { rut } = req.body
    
    req.getConnection( (err, conn)  => {

        conn.query('SELECT asignatura.nombre nombre, id_asignatura, id_profesor, fecha_asignatura, hora_inicio, hora_termino  FROM asignatura JOIN profesor USING (id_profesor) WHERE rut = ?', [rut], (err, asig) => {
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

    const { fecha,nombre_asignatura } = req.body;

    req.getConnection( (err, conn)  => {
        conn.query('SELECT count(*) asistentes, total_asignatura FROM asistencia JOIN asignatura USING(id_asignatura) WHERE estado = 1 and fecha_asignatura = ? and nombre = ? GROUP BY total_asignatura '
        
        , [ fecha,nombre_asignatura ] ,(err, asis) => {
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