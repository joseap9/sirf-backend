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

            console.log(profesor);
        });
    });


}

module.exports = { getProfesor }