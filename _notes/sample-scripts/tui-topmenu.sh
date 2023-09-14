#!/usr/bin/env bash

### USAGE:
# ./tui-topmenu.sh init
# ./tui-topmenu.sh -section blur
# ./tui-topmenu.sh -section focus


echo Running tui-topmenu $@

case $1 in 
	"init")
		ACTION="init"
	;;
	"-section")
		ACTION="section-$2"
	;;
	"-update")
		ACTION="update-$2"
	;;
	"-custom")
		ACTION="custom-$2"
	;;
esac

echo tui-topmenu ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  echo Running init function: $SomethingCustom
}

function CustomFnc {
	echo Running custom function: $1
}

# https://www.geeksforgeeks.org/array-basics-shell-scripting-set-1/
# https://www.geeksforgeeks.org/bash-script-define-bash-variables-and-its-types/
# https://phoenixnap.com/kb/bash-declare
# https://www.geeksforgeeks.org/looping-statements-shell-script/
topmenuInitContent=(top nav menu items)
# topmenuInitKeyVal=([key4]=value1 [key2]=value2 [key3]=value3)
topMenuKV=(
    'DIGIT_1::DQ::fncToRun'
    'DIGIT_2::OPT_2::anotherFncToRun:single:colon:"for params"'
		'DIGIT_3::ok::fncToRunDUDE'
)

function UpdateContent {
	echo ${topmenuInitContent[@]}
	
	for index in "${topMenuKV[@]}" ; do
		echo "${index##}|"
	done
}

if [ "$ACTION" == "init" ]; then
  echo Initial Value: $SomethingCustom
  SomethingCustom="POC"
  InitFnc
elif [ $ACTION == "update-content" ]; then
  UpdateContent $3
elif [ $ACTION == "section-blur" ]; then
	echo create and run SectionBlur method
elif [ $ACTION == "section-focus" ]; then
  echo create and run SectionFocus method
elif [ $ACTION == "custom-top" ]; then
  CustomFnc 'custom method prop'
fi