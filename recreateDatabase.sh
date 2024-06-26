# the container id is variable, you can get it by running docker ps
docker compose stop
docker compose up -d
docker exec -it 72043a9b032f psql -U postgres -d postgres -c "DROP DATABASE devtraining;"
docker exec -it 72043a9b032f psql -U postgres -d postgres -c "CREATE DATABASE devtraining;"
pnpm run build
npx typeorm migration:run -d dist/database/orm-cli-config.js