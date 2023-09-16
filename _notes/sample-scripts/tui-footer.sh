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
	"-update")
		ACTION="update-$2"
	;;
	"-custom")
		ACTION="custom-$2"
	;;
esac

echo tui-footer ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  echo Running init function: $SomethingCustom
	echo FIN
}

function UpdateContent {
	echo PSUEDO updating footer content
}

function UpdateDisplay {
	echo send back to deno if you have to
	echo AFTER you get the ts side working so you can focus on this
}

if [ "$ACTION" == "init" ]; then
  echo Initial Value: $SomethingCustom
  SomethingCustom="POCfooter"
  InitFnc
elif [ $ACTION == "update-content" ]; then
  UpdateContent $3
elif [ $ACTION == "update-display" ]; then
  UpdateDisplay $3
elif [ $ACTION == "section-blur" ]; then
	echo create and run SectionBlur method
elif [ $ACTION == "section-focus" ]; then
  echo create and run SectionFocus method
elif [ $ACTION == "custom-top" ]; then
  CustomFnc 'custom method prop'
fi