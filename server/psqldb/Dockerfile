FROM postgres

# Run the rest of the commands as the ``postgres`` user created in image by docker
USER postgres

# run on init
ADD 01_init-user-db.sh /docker-entrypoint-initdb.d
ADD 02_create_test_tables.sh /docker-entrypoint-initdb.d

