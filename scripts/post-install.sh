#!/bin/bash


if [[ -e /etc/init.d/testinvaders ]]; then
  /etc/init.d/testinvaders stop
fi
touch /etc/init.d/testinvaders
cat > /etc/init.d/testinvaders <<EOF
#!/bin/bash 

case "\$1" in
  start)
    cd /opt/testinvaders && /usr/bin/ruby1.9.1 /usr/bin/rackup /opt/testinvaders/config.ru --host 0.0.0.0 --port 9090 -P /tmp/testinvaders.pid -D
  ;;
  status)
    pid=\`cat /tmp/testinvaders.pid\`
    ps -p \$pid 2>/dev/null 1>&2
    is_there=\$?
    if [[ \$pid != '' ]] && [[ \$is_there == '0' ]]; then
      echo "Testinvaders app is running, pid \$pid"
    else
      echo "Testinvaders app is not running"
    fi
  ;;
  
  stop)
    pid=\`cat /tmp/testinvaders.pid\`
    if [[ \$pid != '' ]]; then
      kill \$pid
      sleep 2
      kill -9 \$pid
      rm /tmp/testinvaders.pid
    else
      echo "pid not found, trying to kill the process"
      pkill -9 /usr/bin/rackup 
    fi
  ;;
  *)
  echo "Usage: /etc/init.d/testinvaders start|stop|status"
esac
EOF
chmod +x /etc/init.d/testinvaders

/etc/init.d/testinvaders start

