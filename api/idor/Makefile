build:
	yarn
	docker compose up
run:
	yarn dev 
clean:
	docker idor_vulb_db
	docker compose down -v
	rm node_modules/ -rf
database:
	yarn run migrate
	bash seed.sh