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