const { request } = require("express");
const db = require("../config/database");

//Reçete bilgisi girme
exports.createPrescription = async(request, response) =>{
    const {tcno,hastaligin_ismi, recete_tarihi, ilac_ismi, ilac_dozu } = request.body;
    try{
    const { rows } = await db.query(
        "INSERT INTO prescriptions (hastaligin_ismi, recete_tarihi, ilac_ismi, ilac_dozu,tcno) VALUES ($1, $2, $3, $4,$5)",
        [hastaligin_ismi, recete_tarihi, ilac_ismi, ilac_dozu,tcno]
    );

    response.status(201).send({
        message: "Prescription added successfully!",
        body:{
            prescription: {tcno,hastaligin_ismi, recete_tarihi, ilac_ismi, ilac_dozu},
        },
        
    });
}catch (error){
    console.error('createPrescription', error);
    response.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Reçete bilgisi güncelleme
exports.updatePrescription = async (request, response) =>{
    const { tcno } = request.params;
    try {
        const {hastaligin_ismi, recete_tarihi, ilac_ismi, ilac_dozu} = request.body;
        await db.query(
            "UPDATE Prescriptions SET hastaligin_ismi = $1, ilac_ismi = $2, ilac_dozu = $3 WHERE  recete_tarihi = $4 AND tcno =$5",
            [hastaligin_ismi, ilac_ismi, ilac_dozu, recete_tarihi,tcno]
        );
        response.status(200).send({message: "Prescription Updated Succesfully!"});
    } catch (error) {
        console.error('updatePrescription', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Reçete bilgisi silme
exports.deletePrescription = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM Prescriptions WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Prescription deleted succesfully!'});
    } catch (error) {
        console.error('deletedPrescription', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};




