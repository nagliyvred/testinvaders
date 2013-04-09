#!/bin/bash


if [[ -e /etc/init.d/testinvaders ]]; then
  /etc/init.d/testinvaders stop
fi
touch /etc/init.d/testinvaders
cat > /etc/init.d/testinvaders <<EOF
#!/bin/bash 

case '$1' in
  start|stop|run)
  /usr/bin/ruby1.9.1 /opt/testinvaders/runner.rb  -- /opt/testinvaders/config.ru
  ;;
  *)
  echo "Usage: /var/lib/dpkg/info/testinvaders.postinst start|stop|run"
esac
EOF
chmod +x /etc/init.d/testinvaders

/etc/init.d/testinvaders start

