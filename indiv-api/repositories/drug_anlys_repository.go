package repositories

import (
	"fmt"

	"github.com/cucpbioinfo/Indivona/models"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

type DrugAnlysRepository struct {
	pg *pg.DB
}

func NewDrugAnlysRepository(pg *pg.DB) *DrugAnlysRepository {
	return &DrugAnlysRepository{
		pg: pg,
	}
}

func (drugAnlysRepository DrugAnlysRepository) ListPaginatedUsingQuery(filter []types.Filter, paging types.Paging) ([]models.DataAnlysOutput, error) {
	var results []models.DataAnlysOutput
	query := drugAnlysRepository.pg.Model(&results)
	for _, s := range filter {
		query = drugAnlysRepository.MappedQuery(query, s.FieldName, s.Condition, s.FieldValue)
	}
	query = drugAnlysRepository.MappedSort(query, paging.SortBy, paging.SortAsc)
	query.Offset(paging.StartIndex).Limit(paging.FetchSize)
	err := query.Select()
	if err != nil {
		return make([]models.DataAnlysOutput, 0), err
	}
	return results, nil
}

func (drugAnlysRepository DrugAnlysRepository) CountUsingQuery(filter []types.Filter) (int, error) {
	query := drugAnlysRepository.pg.Model((*models.DataAnlysOutput)(nil))
	for _, s := range filter {
		if s.FieldValue != "" {
			drugAnlysRepository.MappedQuery(query, s.FieldName, s.Condition, s.FieldValue)
		}

	}
	count, err := query.Count()
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (drugAnlysRepository DrugAnlysRepository) MappedQuery(query *orm.Query, fieldName string, condition string, fieldValue string) *orm.Query {
	switch fieldName {
	case "infoId":
		query.Where("info_id = ?", fieldValue)
	case "bindingAffinity":
		query.Where(fmt.Sprintf("result -> '%s' %s ?", fieldName, condition), fieldValue)
	default:
		s := fieldValue + "%"
		query.Where(fmt.Sprintf("result->>'%s' LIKE ?", fieldName), s)
	}
	return query
}

func (drugAnlysRepository DrugAnlysRepository) MappedSort(query *orm.Query, sortBy string, sortAsc bool) *orm.Query {
	if sortBy != "" {
		var sort string
		if sort = "desc"; sortAsc == true {
			sort = "asc"
		}

		switch sortBy {
		case "infoId":
			query.OrderExpr(fmt.Sprintf("info_id %s", sort))
		default:
			query.OrderExpr(fmt.Sprintf("result -> '%s' %s", sortBy, sort))
		}
	}
	return query
}
