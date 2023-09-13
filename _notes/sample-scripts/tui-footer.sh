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