.DEFAULT_GOAL = help
.PHONY: help run

include .env

# target: help - Shows all available commands
help:
	egrep "^# target:" [Mm]akefile

# target: run - Run all advent of code challenges
run:
	deno run --allow-env --allow-read=${SECURITY_READ} --allow-hrtime src/main.ts $$DAY
