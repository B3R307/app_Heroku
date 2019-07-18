const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoUrl = 'mongodb+srv://berenice:api-orphans@cluster0-o2qfz.azure.mongodb.net/test?retryWrites=true&w=majority'
const {Woman_register} = require('./models/woman_register');
const {Children_register} = require('./models/children_register');
const {User} = require('./models/users');




mongoose.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Todo Chido en mongo..!!')
    }
})

const app = express();
const PORT = 6000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Heroku App </h1>');
});

app.post('/new/woman', (req, res) => {
    const params = req.body;
    if (params.curp) {
        Woman_register.findOne({ curp: params.curp }).exec((err, woman_register) => {
            if (err) {
                return res.status(500).json({ err: 'Ocurrio un error' });
            } else if (woman_register) {
                return res.status(200).json({ message: 'El registro ya existe' });
            } else {
                let newRegister = Woman_register({
                    id_family: params.id_family,
                    name: params.name,
                    last_name: params.last_name,
                    age: params.age,
                    curp: params.curp,
                    location: params.location,
                    last_occupation: params.last_occupation,
                    num_of_children: params.num_of_children,
                    civil_state: params.civil_state,
                    date_decease: params.date_decease,
                    legal_status: params.legal_status,
                    research_folder: params.research_folder,
                    img:params.img

                });
                //bcrypt
                newRegister.save((err, woman_register) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'No se completo el registro' });
                    }
                    else if (woman_register) {
                        return res.status(201).json({ data: params });
                    }
                });
            }
        })
    } else {
        return res.status(400).json({ message: 'Petición no Permitida' });
    }
});


app.post('/new/children', (req, res) => {
    const params = req.body;
    if (params.curp) {
        Children_register.findOne({ curp: params.curp }).exec((err, children_register) => {
            if (err) {
                return res.status(500).json({ err: 'Ocurrio un error' });
            } else if (children_register) {
                return res.status(200).json({ message: 'El registro ya existe' });
            } else {
                let newRegister = Children_register({
                    id_family: params.id_family,
                    name: params.name,
                    last_name: params.last_name,
                    age: params.age,
                    curp: params.curp,
                    gender: params.gender,
                    brothers: params.brothers,
                    location: params.location,
                    scholarship: params.scholarship,
                    legal_status: params.legal_status,
                    lives_with: params.lives_with,
                    receive_assistance: {
                        assitance: params.assitance,
                        type_assistance:{
                            social: params.social,
                            medical: params.medical,
                            legal: params.legal
                        }
                    }
                });
                //bcrypt
                newRegister.save((err, children_register) => {
                    if (err) {
                        return res.status(500).json({ message: 'No se completo el registro' });
                    }
                    else if (children_register) {
                        return res.status(201).json({ data: params });
                    }
                });
            }
        })
    } else {
        return res.status(400).json({ message: 'Petición no Permitida' });
    }
});


app.post('/new/user', (req, res) => {
    const params = req.body;
    if (params.name && params.age && params.location) {
        User.findOne({ email: params.email }).exec((err, user) => {
            if (err) {
                return res.status(500).json({ err: 'Ocurrio un error' });
            } else if (user) {
                return res.status(200).json({ message: 'El registro ya existe' });
            } else {
                let newRegister = User({
                    username: params.username,
                    email: params.email,
                    password: params.password
                });
                //bcrypt
                newRegister.save((err, user) => {
                    if (err) {
                        return res.status(500).json({ message: 'No se completo el registro' });
                    }
                    else if (user) {
                        return res.status(201).json({ data: params });
                    }
                });
            }
        })
    } else {
        return res.status(400).json({ message: 'Petición no Permitida' });
    }
});


app.post('/login', (req, res) => {
    let params = req.body
    if (params.email && params.password) {
        User.findOne({ email: params.email }).exec((err, user) => {
            if (err) {
                console.log(err)
                res.send(err);
            }
            if (user) {
                if (user.password === params.password) {
                    console.log('Encontro usuario ', user);
                    res.send(user);
                } else {
                    res.status(404).send({ message: 'Usuario ó Contraseña Incorrectos' });
                }
            } else {
                res.status(404).json({ message: `No se encontro email ${params.email}` });
            }
        })
    } else {
        res.status(400).json({ message: 'No enviaste Datos' })
    }
});


app.get('/womans', (req, res) => {
    Woman_register.find().exec((err, woman_register) => {
        if (err) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        } else {
            return res.status(200).json({ users })
        }
    })
});

app.get('/childrens', (req, res) => {
    Children_register.find().exec((err, children_register) => {
        if (err) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        } else {
            return res.status(200).json({ users })
        }
    })
});



app.get('/users', (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(404).json({ message: 'Usuarios no encontrados' });
        } else {
            return res.status(200).json({ users })
        }
    })
});

app.listen(PORT, () => {
    console.log(`Servidor en puerto: ${PORT}`)
})