const router = require('express-promise-router')();
const healthSituationController = require('../controllers/healthSituation.controller');

//Hastalık durumu ekleme
router.post('/healthSituation', healthSituationController.createHealthSituation);
//Elemanlar arasında görülen en yaygın üç hastalık türü rapor edilebilmeli ve hastalığa sahip olan elemanların listesi çıkarılabilmelidir.
router.get('/healthSituation', healthSituationController.commonSickness);
// Belirli şehirde doğan elemanlar arasında en sık görülen ilk üç hastalık rapor edilebilmelidir.
router.get('/healthSituation/:sehir', healthSituationController.commonSicknessByCity);
//Hastalık durumu güncelleme
router.put('/healthSituation/:tcno', healthSituationController.updateHealthSituation);
//Hastalık durumu silme
router.delete('/healthSituation/:tcno', healthSituationController.deleteHealthSituation);

module.exports = router;
