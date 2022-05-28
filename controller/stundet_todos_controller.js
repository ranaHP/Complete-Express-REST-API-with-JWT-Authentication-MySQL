const AppError = require("../utils/appError"); // global error handler
const conn = require("../service/db_service"); // database connection to make crud

const joi = require("@hapi/joi"); //form input server-side validation

const todoModel = joi.object({
    title: joi.string().min(10).required(),
    description: joi.string().min(10).required(),
    s_id: joi.number().required()
})

exports.getTodos = (req, res, next) => {
    if (!req.params.s_id) {
        return next(new AppError("No student found", 401));
    }
    conn.query(
        "SELECT * FROM todos WHERE s_id = ?",
        [req.params.s_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.getTodoDetails = (req, res, next) => {
    if (!req.params.t_id) {
        return next(new AppError("No Todo Id found", 401));
    }
    conn.query(
        "SELECT * FROM todos WHERE t_id = ?",
        [req.params.t_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.deleteTodo = (req, res, next) => {
    if (!req.params.t_id) {
        return next(new AppError("No Todo found", 400));
    }
    conn.query(
        "DELETE FROM todos WHERE t_id=?",
        [req.params.t_id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Todo deleted!",
            });
        }
    );
}

exports.updateTodoDetails = (req, res, next) => {
    if (!req.body.s_id) {
        return next(new AppError("No Todo s_id found", 404));
    }
    conn.query(
        "UPDATE Todos SET name= ? , age = ? , rank= ?  WHERE s_id = ?",
        [req.body.name, req.body.age, req.body.rank, req.body.s_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Todo details updated!",
            });
        }
    );
};

exports.addNewTodo = (req, res, next) => {
    if (!req.body) return next(new AppError("No Form Data", 404));

    const todo = {
        title: req.body.title,
        description:  req.body.description,
        s_id: req.body.s_id
    };

    try{
        const { error } =   todoModel.validate(todo);

        if( error ) return next(new AppError(error.details[0].message , 400 )) ;

        const values = [todo.title, todo.description , todo.s_id];

        conn.query(
            "INSERT INTO `todos` (`t_id`, `title`, `description`, `s_id`) VALUES (NULL , ? );",
            [values],
            function (err, data, fields) {

                if (err) return next(new AppError(err, 500));
                
                res.status(201).json({
                    status: "success",
                    message: "Todo Added!",
                });
            }
        );

    } catch(error){
        res.status(500).send(error);
    }
};




