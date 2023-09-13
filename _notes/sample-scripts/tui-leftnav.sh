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
esac

echo tui-leftnav ACTION: $ACTION