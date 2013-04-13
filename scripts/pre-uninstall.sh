#!/bin/bash
echo "Stopping testinvaders"
/etc/init.d/testinvaders stop
sleep 2
if [[ `pgrep ruby1.9.1` -eq 0 ]]; then
  echo "killing the process"
  pkill -9 ruby1.9.1
  echo "Done"
fi
