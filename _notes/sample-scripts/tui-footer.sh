#!/usr/bin/env bash

### USAGE:
# ./tui-footer.sh init
# ./tui-footer.sh -section blur
# ./tui-footer.sh -section focus

noop="N0thing"
# echo Running tui-footer $@

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

# echo tui-footer ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  noop="Running init function: $SomethingCustom"
}

function UpdateContent {
	noop="PSUEDO updating footer content"
}

function UpdateDisplay {
	echo Updated footer content
}

if [ "$ACTION" == "init" ]; then
  noop="Initial"
  InitFnc
elif [ $ACTION == "update-content" ]; then
  UpdateContent $3
elif [ $ACTION == "update-display" ]; then
  UpdateDisplay $3
elif [ $ACTION == "section-blur" ]; then
	noop="create and run SectionBlur method"
elif [ $ACTION == "section-focus" ]; then
  noop="create and run SectionFocus method"
elif [ $ACTION == "custom-top" ]; then
  CustomFnc 'custom method prop'
fi