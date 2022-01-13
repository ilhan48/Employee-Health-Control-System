const db = require("../config/database");

//Çalışma saati bilgisi girme
exports.createWorkHour = async(request, response) =>{
    const {tcno, gunler, saatler } = request.body;
    try{
    const { rows } = await db.query(
        "INSERT INTO workhours (tcno, gunler, saatler) VALUES ($1, $2, $3)",
        [tcno, gunler, saatler]
    );

    response.status(201).send({
        message: "Work hours added successfully!",
        body: {
            workhours: {tcno, gunler, saatler},
        },
    });
}catch (error){
    console.error('createWorkHour', error);
    response.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Çalışma saati bilgisi güncelleme
exports.updateWorkHour = async (request, response) =>{
    const { tcno} = request.params;
    try {
        const {tcno, gunler, saatler} = request.body;
        const { rows } = await db.query(
            "UPDATE workhours SET saatler = $2 WHERE tcno = $3 AND gunler = $1",
            [gunler, saatler, tcno]
        );
        response.status(200).send({message: "Work hour Updated Succesfully!"});
    } catch (error) {
        console.error('updateWorkHourn', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Çalışma saati bilgisi silme
exports.deleteWorkHour = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM workhours WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Work hour deleted succesfully!'});
    } catch (error) {
        console.error('deletedWorkHour', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};