#USE EXAMPLE: make push m='QPAY-19: cambios en server' 
push: 
	make deploy;
	git add -A;
	git commit -m '$(m)';
	make me-happy;

me-happy:
	git pull origin master
	git push origin master

compile:
	npm run build:dev

debug:
	npm run build:debug

deploy:
	npm run build:prod