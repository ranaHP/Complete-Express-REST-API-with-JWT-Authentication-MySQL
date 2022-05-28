const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const conn = require('../service/db_service');
const { CHECK_STUDENT_EMAIL, REGISTER_STUDENT, STUDENT_LOGIN } = require('../query/student');
const { STUDENT_MODEL, STUDENT_LOGIN_MODEL } = require('../model/student');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const JWT = require('jsonwebtoken');


exports.student_login = (req, res, next) => {
    if (isEmpty(req.body)) return next( new AppError("form data not found" , 400));
    try {
        const { error } = STUDENT_LOGIN_MODEL.validate(req.body);
        if (error) return next( new AppError( error.details[0].message , 400));
        
        conn.query(CHECK_STUDENT_EMAIL, [req.body.email], async (err, data, feilds) => {
            if (err) return next( new AppError( err , 500));
            if ( !data.length ) return next( new AppError( "Email or Password Invalid" , 401));
            
            const isMatched = await bcrypt.compare(req.body.password , data[0].password);
            if( !isMatched ) return next( new AppError( "Email or Password Invalid" , 401));

            const token = JWT.sign( { name: data[0].name, s_id: data[0].s_id } , "ucscucscucsc" , { expiresIn: "1d"} );

            res.header("auth-token", token).status(200).json({
                data: " Welcome to ABC School LMS ! ",
                token: token
            })
           
        })
    } catch ( err ) {
        
    }
}

exports.student_register = (req, res, next) => {
    if (isEmpty(req.body)) return next( new AppError("form data not found" , 400));

    try {
        const { error } = STUDENT_MODEL.validate(req.body);

        if (error) return next( new AppError( error.details[0].message , 400));

        conn.query(CHECK_STUDENT_EMAIL, [req.body.email], async (err, data, feilds) => {
            if (err) return next( new AppError( err , 500));
            
            if (data.length) return next( new AppError("Email already used!" , 400));

            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(req.body.password, salt);

            conn.query(REGISTER_STUDENT, [[req.body.name, req.body.age, req.body.rank, req.body.email, hashedValue]], (err, data, feilds) => {
                if (err) return next( new AppError( err , 500));

                res.status(201).json({
                    data: "Student Registration success!"
                })
            })
        })

    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}