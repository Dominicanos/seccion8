///////=====================
// poertos                  
////////////==================

process.env.PORT = process.env.PORT || 3000;


///////=====================
// enviroment 
////////////==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



///////=====================
// data Base
////////////==================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://hamundnic:Latrivia1@cluster0-qbxnw.mongodb.net/cafe';
}

process.env.urlDB = urlDB;