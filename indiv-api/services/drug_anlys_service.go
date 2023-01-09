package services

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/cucpbioinfo/Indivona/utils"
	"github.com/cucpbioinfo/Indivona/models"
	"github.com/cucpbioinfo/Indivona/constants"
	"github.com/cucpbioinfo/Indivona/repositories"
)

type DrugAnlysService struct {
	DataAnlysRepository *repositories.DataAnlysRepository
	DrugAnlysRepository *repositories.DrugAnlysRepository
}

func NewDrugAnlysService(
	dataAnlysRepository *repositories.DataAnlysRepository, 
	drugAnlysRepository *repositories.DrugAnlysRepository,
) *DrugAnlysService {
	return &DrugAnlysService{
		DataAnlysRepository: dataAnlysRepository,
		DrugAnlysRepository: drugAnlysRepository,
	}
}

func (drugAnlysService *DrugAnlysService) GetDataAnlysInfo(infoId int) (models.DataAnlysInfo, error) {
	info, err := drugAnlysService.DataAnlysRepository.GetDataAnlysInfo(infoId)
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.DATABASE_ERROR, err.Error())
		return utils.BuildErrorResponseWithOpts(info, errorCode, errorDesc)
	}
	return info, nil
}

func (drugAnlysService *DrugAnlysService) SearchBindingAffinityResults(dt *types.DataTableRequest) ([]models.DataAnlysOutput, int, error) {
	results, err := drugAnlysService.DrugAnlysRepository.ListPaginatedUsingQuery(dt.Filter, dt.Paging)
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.DATABASE_ERROR, err.Error())
		return nil, 0, utils.BuildErrorResponse(errorCode, errorDesc)
	}
	count, err := drugAnlysService.DrugAnlysRepository.CountUsingQuery(dt.Filter)
	if err != nil {
		errorCode := fiber.StatusInternalServerError
		errorDesc := fmt.Sprintf(constants.MessageCode.DATABASE_ERROR, err.Error())
		return nil, 0, utils.BuildErrorResponse(errorCode, errorDesc)
	}
	return results, count, nil
}
