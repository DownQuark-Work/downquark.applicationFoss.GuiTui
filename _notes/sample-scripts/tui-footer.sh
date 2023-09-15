#!/usr/bin/env bash

### USAGE:
# ./tui-footer.sh init
# ./tui-footer.sh -section blur
# ./tui-footer.sh -section focus


echo Running tui-footer $@

case $1 in 
	"init")
		ACTION="init"
	;;
	"-section")
		ACTION="section-$2"
	;;	
esac

echo tui-footer ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  echo Running init function: $SomethingCustom
	echo FIN
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