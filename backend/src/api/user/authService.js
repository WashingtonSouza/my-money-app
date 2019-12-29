const _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = require('./user'),
    env = require('../../.env'),
    emailRegex = /\S+@\S+\.\S+/,
    passwordRegex =  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/,
    emptyString = ''

const sendErrorsFromDB = (res, dbErros) => {
    const errors = []
    _.forIn(dbErros.erros, error => errors.push(error.message))

    return res.status(400).json({errors})
}

const login = (req, res, next) => {
    const email = req.body.email || emptyString,
        password = req.body.password || emptyString

    User.findOne({ email }, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: '1 day'
            })

            const { name, email } = user
            res.json({ name, email, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || emptyString

    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || emptyString,
        email = req.body.email || emptyString,
        password = req.body.password || emptyString,
        confirmPassword = req.body.confirm_password || emptyString

    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado é inválido'] })
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                `Senha precisar ter: uma letra maiúscula, uma letra minúscula, um 
                número, uma caractere especial(@#$%) e tamanho entre 6-20.`
            ]
        })
    }
    
    const salt = bcrypt.genSaltSync(),
        passwordHash = bcrypt.hashSync(password, salt)
    
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if(user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken }