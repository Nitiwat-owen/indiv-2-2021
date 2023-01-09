package repositories

import (
	"github.com/go-pg/pg/v10"
	"github.com/cucpbioinfo/Indivona/models"
)

type DataAnlysRepository struct {
	pg *pg.DB
}

func NewDataAnlysRepository(pg *pg.DB) *DataAnlysRepository {
	return &DataAnlysRepository{
		pg: pg,
	}
}

func (dataAnlysRepository DataAnlysRepository) GetDataAnlysResults(infoID int) ([]models.DataAnlysOutput, error) {
	var results []models.DataAnlysOutput

	query := dataAnlysRepository.pg.Model(&results).
		Column("result").
		Where("infoID = ?", infoID)
	err := query.Select()

	if err != nil {
		return make([]models.DataAnlysOutput, 0), err
	}
	return results, nil
}

func (dataAnlysRepository DataAnlysRepository) GetDataAnlysInfo(infoId int) (models.DataAnlysInfo, error) {
	info := &models.DataAnlysInfo{Id: infoId}
	err := dataAnlysRepository.pg.Model(info).WherePK().Limit(1).Select()
	if err != nil {
		return models.DataAnlysInfo{}, err
	}
	return *info, nil
}