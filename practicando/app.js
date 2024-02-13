const mongoose = require('mongoose')
const express = require('express')

const app = express();
const url = 'mongodb://127.0.0.1:27017/Test'

mongoose.connect(url)
    .then(() => console.log('Hemos llegado a mongo'))
    .catch((err) => console.log('Error en :'+err));


const personaSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
},{versionkey : false})

const personModel = mongoose.model('persona', personaSchema);

const insertar = async()=>{
    const person = new personModel({
        nombre: 'milton',
        apellido: 'Arita',
        edad: "22"
    })
    const resultado = await person.save()
    console.log(resultado)
}

const mostrar = async()=>{
    const person = await personModel.find()
    console.log(person)
}

const actualizar = async(id)=>{
    const persona = await personModel.updateOne({_id:id},{
        $set:{
            nombre: 'Melvin',
            apellido: 'Machado',
            edad: 19
        }
    })
}

const eliminar = async(id)=>{
    const person = await personModel.deleteOne({_id:id})
    console.log(person)
}

app.get('/', (req, res) =>{
    console.log('Intengo verificacion Get')
    console.log('doble verificacion del get')
})

app.post('/', (req, res) =>{
    console.log('Intento verificacion del Post')
    console.log('doble verificacion post')
})

app.put('/', (req, res) =>{
    console.log('Intento verificacion del PUT')
    console.log('doble verificacion PUT')
})

app.delete('/', (req, res)=>{
    console.log('Intento verificacion del Delete')
    console.log('doble verificacion Delete')
})

app.listen(3000, ()=>{
    console.log('Servidor Ejecutandose')
})

eliminar('65cbc05e880f697070234737');
actualizar('65cbc05e880f697070234737');
insertar();