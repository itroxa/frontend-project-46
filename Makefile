# Makefile

gendiff:
	node bin/gendiff.js

link:
	npm link

lint:
	npx eslint .