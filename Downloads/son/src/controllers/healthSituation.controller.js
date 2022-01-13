const db = require("../config/database");

//Hastalık durumu ekleme
exports.createHealthSituation = async(request, response) =>{
    const {tcno, hastaligin_ismi, hasta_oldugu_tarih } = request.body;
    try{
    const { rows } = await db.query(
        "INSERT INTO HealthSituations (tcno, hastaligin_ismi, hasta_oldugu_tarih) VALUES ($1, $2, $3)",
        [tcno, hastaligin_ismi, hasta_oldugu_tarih]
    );

    response.status(201).send({
        message: "Health Situation added successfully!",
        body: {
            healthSituation: {tcno, hastaligin_ismi, hasta_oldugu_tarih},
        },
    });
}catch (error){
    console.error('createHealthSituation', error);
    res.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Hastalık durumu güncelleme
exports.updateHealthSituation = async (request, response) =>{
    const { tcno } = request.params;
    try {
        const {hastaligin_ismi, hasta_oldugu_tarih} = request.body;
        await db.query(
            "UPDATE healthsituations SET hastaligin_ismi = $1, hasta_oldugu_tarih = $2 WHERE tcno = $3",
            [hastaligin_ismi, hasta_oldugu_tarih, tcno]
        );
        response.status(200).send({message: "Health Situation Updated Succesfully!"});
    } catch (error) {
        console.error('updateHealthSituation', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Hastalık durumu silme
exports.deleteHealthSituation = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM healthsituations WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Health Situation information deleted succesfully!'});
    } catch (error) {
        console.error('deletedHealthSituation', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//Elemanlar arasında görülen en yaygın üç hastalık türü rapor edilebilmeli ve hastalığa sahip olan elemanların listesi çıkarılabilmelidir.
exports.commonSickness = async (request, response) =>{
    try{
        const {rows} = await db.query("(SELECT isim,hastaligin_ismi FROM employees RIGHT JOIN  healthsituations ON employees.tcno = healthsituations.tcno GROUP BY hastaligin_ismi,isim ORDER BY COUNT(hastaligin_ismi) DESC LIMIT 3);");
        response.status(200).send({
            message: "",
            body: {
                commonSickness: {rows},
            },
        }

        );
    } catch (error) {
        console.error('commonSickness', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
}; 
// Belirli şehirde doğan elemanlar arasında en sık görülen ilk üç hastalık rapor edilebilmelidir.
exports.commonSicknessByCity = async (request, response) =>{
    const sehir = request.params.sehir;
    try{
        const {rows} = await db.query('SELECT hastaligin_ismi FROM healthsituations WHERE EXISTS (SELECT tcno FROM employees WHERE sehir = $1) GROUP BY hastaligin_ismi ORDER BY COUNT(hastaligin_ismi) DESC LIMIT 3',
        [sehir]);
        response.status(200).send({
            message: "",
            body: {
                commonSicknessByCity: {rows},
            },
        }

        );
    } catch (error) {
        console.error('commonSickness', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};

