#!/usr/bin/env bash

### USAGE:
# ./tui-leftnav.sh init
# ./tui-leftnav.sh -section blur
# ./tui-leftnav.sh -section focus

noop="N0thing"
# echo Running tui-leftnav $@

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

# echo tui-leftnav ACTION: $ACTION

SomethingCustom="NOT set yet"
function InitFnc {
  noop="Running init function: $SomethingCustom"
}

function UpdateContent {
	noop="PSUEDO updating leftnav content"
}

function UpdateDisplay {
	echo Left,Nav,Men,Items
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
fi