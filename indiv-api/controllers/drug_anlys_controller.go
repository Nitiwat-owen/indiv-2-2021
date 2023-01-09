package controllers

import (
	"bufio"
	"fmt"
	"log"
	"strconv"

	// "strings"
	"mime/multipart"

	ejson "encoding/json"

	"github.com/cucpbioinfo/Indivona/models"
	"github.com/cucpbioinfo/Indivona/services"
	"github.com/cucpbioinfo/Indivona/types"
	"github.com/gofiber/fiber/v2"
	json "github.com/jmoiron/sqlx/types"
)

type DrugAnlysController struct {
	DrugAnlysService *services.DrugAnlysService
}

func NewDrugAnlysController(drugAnlysService *services.DrugAnlysService) *DrugAnlysController {
	return &DrugAnlysController{
		DrugAnlysService: drugAnlysService,
	}
}

// func (drugAnlysController *DrugAnlysController) BindingAffinityPrediction(c *fiber.Ctx) error {
// 	fmt.Println(1111)
// 	page, _ := strconv.Atoi(c.Params("page"))
// 	limit, _ := strconv.Atoi(c.Params("limit"))
// 	DataAnlysOutputs, err := drugAnlysController.DrugAnlysService.GetDataAnlysResults(page, limit)
// 	if err != nil {
// 		return err
// 	}
// 	var results []types.JSONText
// 	for _, output := range DataAnlysOutputs {
// 		results = append(results, output.Result)
// 	}
// 	return c.JSON(results)
// }

func (drugAnlysController *DrugAnlysController) GetDataAnlysInfo(c *fiber.Ctx) error {
	user := c.Locals("user")
	details, ok := user.(models.User)
	if !ok {
		return fiber.ErrInternalServerError
	}
	fmt.Println("O:--Retrieve Local Context--:user.Email/", details.Email)

	infoId, _ := strconv.Atoi(c.Params("id"))
	info, err := drugAnlysController.DrugAnlysService.GetDataAnlysInfo(infoId)
	if err != nil {
		return err
	}
	return c.JSON(info)
}

func ReadFile2(file multipart.FileHeader) ([]string, error) {
	var s []string
	toread,err := file.Open()
	if (err != nil){
		return s,err;
	}
	scanner := bufio.NewScanner(toread)
	for scanner.Scan() {
		s = append(s, scanner.Text())
	}
	if scanner.Err() != nil {
		return s, scanner.Err()
	}
	return s, nil
}

func (drugAnlysController *DrugAnlysController) HandleSubmission(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		log.Fatal(err)
	}

	if (form.Value["isSmilesFile"][0] == "true"){
		smilefile := form.File["smilesFile"][0]
		log.Println("file: "+ smilefile.Filename)
		if err != nil{
			return err;
		}
		var smilesString,err = ReadFile2(*smilefile)
		if (err != nil){
			return err;
		}
		for i, s := range smilesString {
			fmt.Println("Line", i, s)
		}
	}else{
		var s = form.Value["smilesText"][0]
		fmt.Println(s)
	}
	if (form.Value["isUniprotFile"][0] == "true"){
		protfile := form.File["uniprotFile"][0]
		//fmt.Println(2)
		log.Println("file: "+ protfile.Filename)
		if err != nil{
			return err;
		}
		var smilesString,err = ReadFile2(*protfile)
		if (err != nil){
			return err;
		}
		for i, s := range smilesString {
			fmt.Println("Line", i, s)
		}
	}else{
		var s = form.Value["uniprotText"][0]
		fmt.Println(s)
	}
	
	test1 := &types.Filter{}
	test1.FieldName = "infoId"
	test1.FieldValue = "1"
	test2 := &types.Paging{}
	test2.StartIndex = 0
	test2.FetchSize = 5
	test2.SortBy = "bindingAffinity"
	test2.SortAsc = true
	filterArray := &[]types.Filter{*test1}
	body := &types.DataTableRequest{}
	body.Paging = *test2
	body.Filter = *filterArray
	results, count, err := drugAnlysController.DrugAnlysService.SearchBindingAffinityResults(body)
	if err != nil {
		return err;
	}
	idx := (body.Paging.StartIndex) + 1
	var jsonArray []json.JSONText
	for _, output := range results {
		var m map[string]interface{}
		if err := ejson.Unmarshal([]byte(output.Result), &m); err != nil {
			panic(err)
		}
		delete(m, "2D")
		m["ID"] = idx
		idx++
		res, _ := ejson.Marshal(m)
		jsonArray = append(jsonArray, res)
	}
	return c.JSON(&types.DataTableResponse{
		types.BaseResponse{
			Result:  true,
			Message: "success",
		},
		types.DataTableResults{
			Results:     jsonArray,
			TotalRecord: count,
		},
	})
}

func (drugAnlysController *DrugAnlysController) SearchBindingAffinityResults(c *fiber.Ctx) error {
	body := &types.DataTableRequest{}
	c.BodyParser(body)
	results, count, err := drugAnlysController.DrugAnlysService.SearchBindingAffinityResults(body)
	if err != nil {
		return err
	}
	idx := (body.Paging.StartIndex) + 1
	var jsonArray []json.JSONText
	for _, output := range results {
		var m map[string]interface{}
		if err := ejson.Unmarshal([]byte(output.Result), &m); err != nil {
			panic(err)
		}
		delete(m, "2D")
		m["ID"] = idx
		idx++
		res, _ := ejson.Marshal(m)
		jsonArray = append(jsonArray, res)
	}
	return c.JSON(&types.DataTableResponse{
		types.BaseResponse{
			Result:  true,
			Message: "success",
		},
		types.DataTableResults{
			Results:     jsonArray,
			TotalRecord: count,
		},
	})
}
