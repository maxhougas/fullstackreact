# Fullstackreact
- A fullstack react application
- Works with https://hub.docker.com/repository/docker/maxhougas/fullstack/general

## Mariadb
- Install via apk add mysql-client mysql; works as expected.
- User "root" is included--must specify --user=root in most cases
- When running mysql_install_db, specify --ldata=/var/lib/mysql
- Must create /run/mysql. This is where the socet file lives.
- Networking is disabled by default. add "[mysqld]\nskip-networking=0\nskip-bind-address" to /etc/my.cnf
- By default root is denied access from the network. Best to add a new user.
### You must execute /srv/dbinit.sh
