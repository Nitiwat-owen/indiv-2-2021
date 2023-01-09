package constants

var MessageCode = struct{
    INVALID_PARAM_ERROR 	string
    DATA_NOT_FOUND_ERROR 	string
	EMPTY_LIST_ERROR		string
	DATA_EXIST_ERROR		string
	SAVE_DATA_ERROR			string
	DELETE_DATA_ERROR		string
	INTERNAL_SERVER_ERROR	string
	DATABASE_ERROR			string
	SEND_MAIL_ERROR			string
}{
    INVALID_PARAM_ERROR: 	"invalid %s",
    DATA_NOT_FOUND_ERROR: 	"%s does not exist",
	EMPTY_LIST_ERROR:		"%s is empty",
	DATA_EXIST_ERROR:		"%s already exist",
	SAVE_DATA_ERROR:		"save %s failed",
	DELETE_DATA_ERROR:		"delete %s failed",
	INTERNAL_SERVER_ERROR:	"Internal Server Error: %s",
	DATABASE_ERROR: 		"A database error has occurred: %s",
	SEND_MAIL_ERROR: 		"send mail (%s) failed: %s",
}