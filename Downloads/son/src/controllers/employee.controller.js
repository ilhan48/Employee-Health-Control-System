const { request } = require("express");
const db = require("../config/database");

//Çalışan ekleme
exports.createEmployee = async(request, response) =>{
    const {tcno, isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim} = request.body;
    try{
        const { rows } = await db.query(
            'INSERT INTO employees (tcno, isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
             [tcno, isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim]
        );

    response.status(201).send({
        message: "Employee added successfully!",
        body: {
            employee: {tcno, isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim},
        },
    });
}catch (error){
    console.error('createEmployee', error);
    response.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Çalışan listeleme
exports.findEmployeeByTcno = async (request, response) => {
    const  tcno  = (request.params.tcno);
    
    try {
        const res = await db.query('SELECT * FROM employees WHERE tcno = $1',
         [tcno]
         );
         
         response.status(200).send(res.rows[0]);
    } catch (error) {
        console.error('findEmployeeByTcno', error);
        if (error == 'employee_not_found'){
            response.status(404).send({
                message: "Employee not found."
            });
        } else{
            response.status(500).send({
                message : "Bir hata olustu"
            });
        }
    }
};
//Çalışan güncelleme
exports.updateEmployeeByTcno = async (request, response) =>{
    const { tcno } = request.params;
    try {
        const {tcno, isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim} = request.body;
        await db.query(
            "UPDATE employees SET isim = $1, soyad = $2, kan_grubu = $3, sehir = $4, pozisyon = $5, maas = $6, egitim = $7  WHERE tcno = $8",
            [isim, soyad, kan_grubu, sehir, pozisyon, maas, egitim, tcno]
        );
        response.status(200).send({
           
            message: "Employee Updated Succesfully!",
            
        });
    } catch (error) {
        console.error('updateEmployeeByTcno', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Çalışan silme
exports.deleteEmployeeByTcno = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM employees WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Employee deleted succesfully!'});
    } catch (error) {
        console.error('deletedEmployee', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//Çalışanları listeleme
exports.listAllEmployees = async (request, response)=>{
    try{
        const { rows } = await db.query('SELECT * FROM employees ORDER BY isim');
        response.status(200).send(rows);
    } catch (error){
        console.error('listAllEmployees', error);
        response.status(500).send({
            message: "Bir hata oluştu."
        });
    }
};



