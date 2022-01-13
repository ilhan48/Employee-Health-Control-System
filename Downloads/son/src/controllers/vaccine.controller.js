const db = require("../config/database");

//Aşı bilgisi girme
exports.createVaccine = async(request, response) =>{
    const {tcno, asi_adi, asi_tarihi } = request.body;
    try{
    const { rows } = await db.query(
        "INSERT INTO vaccines (tcno, asi_adi, asi_tarihi) VALUES ($1, $2, $3)",
        [tcno, asi_adi, asi_tarihi]
    );

    response.status(201).send({
        message: "Vaccine added successfully!",
        body: {
            vaccine: {tcno, asi_adi, asi_tarihi},
        },
    });
}catch (error){
    console.error('createVaccine', error);
    response.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Aşı bilgisi güncelleme
exports.updateVaccine = async (request, response) =>{
    const { tcno } = request.params.tcno;
    try {
        const {tcno, asi_adi, asi_tarihi} = request.body;
        const { rows } = await db.query(
            "UPDATE vaccines SET asi_adi = $1, asi_tarihi = $2 WHERE tcno = $3",
            [asi_adi, asi_tarihi, tcno]
        );
        response.status(200).send({message: "Vaccine Updated Succesfully!"});
    } catch (error) {
        console.error('updateVaccine', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Aşı bilgisi silme
exports.deleteVaccine = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM vaccines WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Vaccine information deleted succesfully!'});
    } catch (error) {
        console.error('deletedVaccine', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};