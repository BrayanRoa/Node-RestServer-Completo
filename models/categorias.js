const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({
	nombre:{
		type:String,
		required: [true, 'El nombre es obligatorio'],
		unique:true
	},
	estado:{
		type:Boolean,
		default:true,
		required:true
	},
	usuario:{
		type: Schema.Types.ObjectId,
		ref:'Usuarios',
		required:true
	}
});

CategoriaSchema.methods.toJSON = function(){
	// eslint-disable-next-line no-unused-vars
	const {__v, ...data} = this.toObject();
	return data;
};


module.exports = model('Categorias', CategoriaSchema);