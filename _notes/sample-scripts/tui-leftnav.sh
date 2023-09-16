#!/usr/bin/env bash

### USAGE:
# ./tui-leftnav.sh init
# ./tui-leftnav.sh -section blur
# ./tui-leftnav.sh -section focus


echo Running tui-leftnav $@

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

echo tui-leftnav ACTION: $ACTION

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