
const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
	nombre:{
		type:String,
		required:[true,'El nombre es obligatorio'],
	},
	correo:{
		type:String,
		required:[true, 'El correo es obligatorio'],
		unique:true
	},
	password:{
		type:String,
		required:[true, 'La constraseña es obligatoria']
	},
	img:{
		type:String
	},
	rol:{
		type:String,
		required:true,
		enum:['ADMIN_ROLE', 'USER_ROLE']
	},
	estado:{
		type:Boolean,
		default:true
	},
	google:{
		type:Boolean,
		default:false
	}
});

usuarioSchema.methods.toJSON = function(){
	// eslint-disable-next-line no-unused-vars
	const {__v, password, ...usuario} = this.toObject();
	return usuario;
};

module.exports = model('Usuarios', usuarioSchema);