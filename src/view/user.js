error = (res) => {
    return (err) => {
        if(err.myerror) {
            if(err.myerror === 'email already registered') {
                res.status(409).json({ message: 'email already in use' });
            } else if(err.myerror === 'wrong password') {
                res.status(401).json({ message: 'password is incorrect' });
            } else if(err.myerror === 'error in request') {
                res.status(400).json({ message: 'parameters incomplete' });
            } else if(err.myerror === 'account not found') {
                res.status(404).json({ message: 'account not found' });
            }
        } else if(err.errors) {
            let keys = Object.keys(err.errors);
            let errors = keys.map(key => err.errors[key]);
            res.status(400).json({ message: errors[0].message, errors });
        } else {
            res.status(400).json({ not_handled: 'this error was not handled', error: typeof err == Error ? err.message : err });
        }
    }
}

one = (user) => {
    const { _id: id, name, email } = user;
    return { id, name, email }
}

many = (result) => {
    return { data: result.map(user => one(user)) }
}

login = (result) => {
    return { user: one(result.user), token: result.token }
}

updated = (user) => {
    return { message: 'Password changed successfully', user: user }
}

deleted = (user) => {
    return { message: 'User deleting successfully' }
}

module.exports = (req, res, next) => {
    res.users = {
        create: (user, message) => res.status(201).json(one(user, message)),
        login: (result) => res.status(200).json(login(result)),
        getOne: (user) => res.status(200).json(one(user)),
        getMany: (data) => res.status(200).json(many(data)),
        updated: (user) => res.status(200).json(updated(user)),
        deleted: (user) => res.status(200).json(deleted(user)),
        error: error(res)
    }
    next();
}