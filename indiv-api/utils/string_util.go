package utils

import (
	"strings"
)

func Capitalize(input string) string {
	words := strings.Fields(input)
	words[0] = strings.Title(words[0])
	return strings.Join(words, " ")
}