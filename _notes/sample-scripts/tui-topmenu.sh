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
esac

echo tui-topmenu ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  echo Running init function: $SomethingCustom
}

if [ "$ACTION" == "init" ]; then
  echo Initial Value: $SomethingCustom
  SomethingCustom="POC"
  InitFnc
elif [ $ACTION == "section-blur" ]; then
	echo create and run SectionBlur method
elif [ $ACTION == "section-focus" ]; then
  echo create and run SectionFocus method
fi