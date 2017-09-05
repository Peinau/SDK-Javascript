#USE EXAMPLE: make push m='QPAY-19: cambios en server' 
push: 
	git add -A;
	git commit -m '$(m)';
	make me-happy;

me-happy:
	git pull origin master
	git push origin master

compile:
	npm run rebuild