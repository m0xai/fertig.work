# Notes
Use in new development environments new docker database container. This keeps my knowledge a bit more persistent.
You may need to create user, database before running the application at all. 
You may need to change ownership of the database.

Some commands to make things easier:

```shell
# Connect to the bash in the container
docker exec -it mydb_conaiter_name bash
```

```shell
# Connect to testdb with user postgres
psql -h localhost -p 5432 -U postgress testdb
```
