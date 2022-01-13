const router = require('express-promise-router')();
const covidController = require('../controllers/covid.controller');

//Covid bilgisi ekleme
router.post('/covid/createCovid/', covidController.createCovid);
//Covid bilgisi güncelleme
router.put('/covid/updateCovid/:tcno', covidController.updateCovid);
//Covid bilgisi silme
router.delete('/covid/deleteCovid/:tcno', covidController.deleteCovid);
//En yaygın kullanılan ilk üç ilacı kullanan elemanların COVID geçirme durumu rapor edilebilmelidir.
router.get('/covid/covidToCommonUseDrug/', covidController.covidToCommonUseDrug);
//Belirli bir ilacı kullanan çalışanların COVID geçirme durumu rapor edilebilmelidir.+++++ Voltaren ve Novaqua'da veri var sadece diğer ilaçlarda veri yok. Exist'i IN yaptım
router.get('/covid/covidByDrug/:ilac_ismi', covidController.covidByDrug);
//Aşı vurulma durumuna göre COVID hastalığına yakalanma oranı rapor edilebilmelidir.++++++++++++
router.get('/covid/covidDepenceVaccine/', covidController.covidDepenceVaccine);
//Haftasonu çalışan kişiler arasında COVID gözükme miktarı.++++++++++++++++++++
router.get('/covid/covidCountOfWeekendEmployees/', covidController.covidCountOfWeekendEmployees);
//COVID’e yakalananlar arasında görülen en sık karşılaşılan ilk 3 belirti listelenebilmelidir.
router.get('/covid/topThreeSymptomCovid/', covidController.topThreeSymptomCovid);
//En sık hasta olan ilk 10 kişinin son bir ay içerisinde COVID’e yakalanma durumları listelenebilmelidir.
router.get('/covid/tenCommonSickCovid/', covidController.tenCommonSickCovid);
//Kan grubuna göre COVID’e yakalanma sıklığı rapor edilebilmelidir.++++++++++++++++++
router.get('/covid/covidDepenceBloodType/', covidController.covidDepenceBloodType);
//Toplam çalışma süresi ile COVID’e yakalanma arasındaki istatistiki bilgi sunulabilmelidir.++++++++++++
router.get('/covid/workHoursCovidRelation/', covidController.workHoursCovidRelation);
//Biontech ve sinovac aşılarının etkinliği, COVID geçirme süresi göz önüne alınarak kıyaslanabilmelidir.+++++++++
router.get('/covid/covidVaccinateRelationship/', covidController.covidVaccinateRelationship);
//Aşı vurulmayanlar arasında, en uzun süre COVID geçiren kişinin, son 1 yılda geçirmiş olduğu hastalıklar ve verilen reçeteler listelenebilmelidir.+++++++++++++++
router.get('/covid/listPrescriptionForLongTimeCovid/',covidController.listPrescriptionForLongTimeCovid);
// Biontech aşısı olan ve belirli bir hastalığı önceden geçirmiş olan çalışanlardan COVID’e yakalananlar listelenebilmelidir.++++++++++++++ EXISTS'İ IN YAPTIM.
router.get('/covid/bionntechDependenceCovid/:kronik_hastalik_ismi', covidController.bionntechDependenceCovid);
//Belirli bir kronik hastalığa göre, çalışanların COVID testinin negatife dönmesi için geçen süre rapor edilebilmelidir.++++++ EXISTS'İ IN YAPTIM. DİYABETİ GİR
router.get('/covid/chronicDiseasesDependenceCovid/:kronik_hastalik_ismi',covidController.chronicDiseasesDependenceCovid);
//Eğitim durumu ile COVID geçirme arasındaki istatistiki bilgi çıkarılabilmelidir.++++++++++++++++++
router.get('/covid/educationDependenceCovid/',covidController.educationDependenceCovid);


module.exports = router;