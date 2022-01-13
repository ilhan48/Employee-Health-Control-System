const db = require("../config/database");
//Covid bilgisi ekkleme
exports.createCovid = async(request, response) =>{
    const {covid_baslangic, tcno, covid_bitis, asi_adi } = request.body;
    try{
    const { rows } = await db.query(
        "INSERT INTO covid (covid_baslangic, tcno, covid_bitis, asi_adi) VALUES ($1, $2, $3, $4)",
        [covid_baslangic, tcno, covid_bitis, asi_adi]
    );

    response.status(201).send({
        message: "Covid information added successfully!",
        body: {
            covid_information: {covid_baslangic, tcno, covid_bitis, asi_adi},
        },
    });
}catch (error){
    console.error('createCovid', error);
    response.status(500).send({
      message: "Bir hata oluştu."
    });
}
};
//Covid bilgisi güncelleme
exports.updateCovid = async (request, response) =>{
    const { tcno } = request.params;
    try {
        const {covid_baslangic, tcno, covid_bitis, asi_adi} = request.body;
        const { rows } = await db.query(
            "UPDATE Covid SET covid_baslangic = $1, covid_bitis = $2, asi_adi = $3 WHERE  tcno = $4",
            [covid_baslangic, covid_bitis, asi_adi,  tcno]
        );
        response.status(200).send({
            message: "Covid information Updated Succesfully!",
            body: {
                covid_information: {covid_baslangic, covid_bitis, asi_adi,  tcno},
            },
        });
    } catch (error) {
        console.error('updateCovid', error);
        response.status(500).send({
            message: "Bir hata olustu"
        });
    }
};
//Covid bilgisi silme
exports.deleteCovid = async (request, response) =>{
    const { tcno } = request.params;
    try {
        await db.query('DELETE FROM covid WHERE tcno = $1',
        [tcno]
            );    
        response.status(200).send({message: 'Covid information deleted succesfully!'});
    } catch (error) {
        console.error('deletedCovid', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//En yaygın kullanılan ilk üç ilacı kullanan elemanların COVID geçirme durumu rapor edilebilmelidir.
exports.covidToCommonUseDrug = async (request, response) =>{
    try{
        const {rows} =await db.query('SELECT *  FROM covid WHERE EXISTS (SELECT * FROM prescriptions GROUP BY ilac_ismi,tcno,recete_tarihi ORDER BY COUNT(ilac_ismi) DESC) LIMIT 3')
        response.status(200).send({
            message: "",
            body: {
                covidToCommonUseDrug: {rows},
            },
        }

        );
    } catch (error) {
        console.error('covidToCommonUseDrug', error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
}; 
//Belirli bir ilacı kullanan çalışanların COVID geçirme durumu rapor edilebilmelidir.
exports.covidByDrug = async (request,response) =>{
    const ilac_ismi = request.params.ilac_ismi;
    try {
        const {rows} = await db.query("SELECT * FROM covid WHERE tcno IN(SELECT tcno FROM prescriptions WHERE ilac_ismi = $1)",
        [ilac_ismi]
        );
        response.status(200).send({
            message:"",
            body:{
                covidByDrug : {rows},
            },
        }
        );
    } catch (error) {
        console.error('covidByDrug',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
    
};
//Aşı vurulma durumuna göre COVID hastalığına yakalanma oranı rapor edilebilmelidir.
exports.covidDepenceVaccine = async (request, response)=>{
    try{
        const {rows} = await db.query("SELECT (SELECT COUNT(*) FROM vaccines WHERE EXISTS(SELECT * FROM Covid)) / (SELECT COUNT(*) FROM covid WHERE EXISTS (SELECT * FROM Vaccines)):: FLOAT AS asi_vurulup_yakalananlarin_vurulmayanlara_orani")
        response.status(200).send({
            message: "",
            body: {
                covidDependenceVaccine: {rows},
            },
        }

        );
    } catch (error) {
        console.error('covidDepenceVaccine',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//Haftasonu çalışan kişiler arasında COVID gözükme miktarı.
exports.covidCountOfWeekendEmployees = async (request, response) =>{
    try{
    const {rows} = await db.query("SELECT COUNT(*) AS hafta_sonu_calisip_covid_olan FROM covid WHERE EXISTS(SELECT * FROM workHours WHERE gunler IN('Cumartesi', 'Pazar'))");
    response.status(200).send({
        message: "",
        body: {
            covidCountOfWeekendEmployees: {rows},
        },
    }

    );
    } catch (error) {
        console.error('covidCountOfWeekendEmployees',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//COVID’e yakalananlar arasında görülen en sık karşılaşılan ilk 3 belirti listelenebilmelidir.
exports.topThreeSymptomCovid = async (request, response) =>{
    try{
        const res = await db.query('SELECT semptom FROM Symptoms WHERE EXISTS (SELECT tcno FROM Covid) GROUP BY semptom ORDER BY COUNT(hastaligin_ismi) DESC LIMIT 3');
        response.status(200).send(res.rows);
    } catch (error) {
        console.error('topThreeSymptomCovid',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//En sık hasta olan ilk 10 kişinin son bir ay içerisinde COVID’e yakalanma durumları listelenebilmelidir.
exports.tenCommonSickCovid = async (request, response) =>{
    try{
        const res = await db.query("SELECT COUNT(tcno)/10::FLOAT AS covid_olma_orani FROM Covid WHERE covid_baslangic > now() - interval '5 month' AND EXISTS (SELECT tcno FROM HealthSituations GROUP BY tcno ORDER BY COUNT(tcno) DESC LIMIT 10)");
        response.status(200).send(res.rows);
        

    } catch (error) {
        console.error('tenCommonSickCovid',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//Kan grubuna göre COVID’e yakalanma sıklığı rapor edilebilmelidir.
exports.covidDepenceBloodType = async (request, response) =>{
    try{
        const {rows} =await db.query("SELECT COUNT(kan_grubu) AS covidgeciren_calisan_sayisi, kan_grubu FROM Employees WHERE tcno IN(SELECT tcno FROM Covid) GROUP BY kan_grubu");
        response.status(200).send({
            message: "",
            body: {
                covidDepenceBloodType: {rows},
            },
        }

        );
    } catch (error) {
        console.error('covidToCommonUseDrug',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
//Toplam çalışma süresi ile COVID’e yakalanma arasındaki istatistiki bilgi sunulabilmelidir.
exports.workHoursCovidRelation = async (request, response) =>{
    try{
        const {rows} = await db.query("SELECT saatler AS calismasuresi, COUNT(saatler) AS o_kadar_saat_calisip_covid_gecirenler  FROM WorkHours WHERE EXISTS(SELECT tcno FROM Covid) GROUP BY saatler");
        response.status(200).send({
            message: "",
            body: {
                workHoursCovidRelation: {rows},
            },
        }

        );
    } catch (error) {
        console.error('workHoursCovidRelation',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }

};
//Biontech ve sinovac aşılarının etkinliği, COVID geçirme süresi göz önüne alınarak kıyaslanabilmelidir.
exports.covidVaccinateRelationship = async (request, response) =>{
    try{
        const {rows} = await db.query("SELECT Vaccines.asi_adi AS asi, AVG(Covid.covid_bitis - Covid.covid_baslangic) AS gecirmesuresi FROM Vaccines INNER JOIN Covid ON Vaccines.tcno = Covid.tcno GROUP BY asi ORDER BY asi");
        response.status(200).send({
            message: "",
            body: {
                covidVaccinateRelationship: {rows},
            },
        }

        );
    } catch (error) {
        console.error('covidVaccinateRelationship',error);
        response.status(500).send({
            message: "Bir hata olustu."
        });
    }
};
// Aşı vurulmayanlar arasında, en uzun süre COVID geçiren kişinin, son 1 yılda geçirmiş olduğu hastalıklar ve verilen reçeteler listelenebilmelidir.
exports.listPrescriptionForLongTimeCovid = async (request, response) =>{
    try{
        const  {rows}  = await db.query("SELECT * FROM prescriptions WHERE recete_tarihi > now() - interval '12 month' AND tcno =  ((SELECT tcno FROM Covid WHERE tcno NOT IN (SELECT tcno FROM Vaccines)) ORDER BY (covid_bitis-covid_baslangic) DESC LIMIT 1)");
        response.status(200).send(rows);
    } catch (error) {
        console.error('listPrescriptionForLongTimeCovid', error);
        response.status(500).send({
            message: "Bir hata oluştu."
        })
    }
};
// Biontech aşısı olan ve belirli bir hastalığı önceden geçirmiş olan çalışanlardan COVID’e yakalananlar listelenebilmelidir.
exports.bionntechDependenceCovid = async (request, response) =>{
    try{
        const  kronik_hastalik_ismi  = request.params.kronik_hastalik_ismi;
        const {rows} = await db.query("SELECT * FROM employees Where tcno IN(SELECT tcno FROM covid WHERE tcno IN(SELECT tcno FROM vaccines WHERE asi_adi = 'Biontech' AND tcno IN(SELECT tcno FROM chronicdiseuses WHERE kronik_hastalik_ismi = $1 )))",
        [kronik_hastalik_ismi]
        )
        response.status(200).send({
            message: "",
            body: {
                bionntechDependenceCovid: {rows},
            },
        }

        );
    } catch (error) {
        console.error('bionntechDependenceCovid', error);
        response.status(500).send({
            message: "Bir hata oluştu."
        })
    }
};
//Belirli bir kronik hastalığa göre, çalışanların COVID testinin negatife dönmesi için geçen süre rapor edilebilmelidir.
exports.chronicDiseasesDependenceCovid = async (request, response) =>{
    const  kronik_hastalik_ismi  = request.params.kronik_hastalik_ismi;
    try{
        const res = await db.query('SELECT tcno,(covid.covid_bitis-covid.covid_baslangic) AS sure FROM covid WHERE tcno IN(SELECT tcno FROM chronicdiseuses WHERE kronik_hastalik_ismi = $1)',
        [kronik_hastalik_ismi]
        )
        response.status(200).send(res.rows);
    } catch (error) {
        console.error('chronicDiseasesDependenceCovid', error);
        response.status(500).send({
            message: "Bir hata oluştu."
        })
    }
};
//Eğitim durumu ile COVID geçirme arasındaki istatistiki bilgi çıkarılabilmelidir.
exports.educationDependenceCovid = async (request, response)=>{
    try{
        const {rows} = await db.query('SELECT egitim AS egitim, COUNT(egitim) AS covid_geciren  FROM employees WHERE EXISTS(SELECT tcno FROM Covid) GROUP BY egitim'
        )
        response.status(200).send({
            message: "",
            body: {
                educationDependenceCovid: {rows},
            },
        }

        );
    } catch (error) {
        console.error('educationDependenceCovid', error);
        response.status(500).send({
            message: "Bir hata oluştu."
        })
    }
};