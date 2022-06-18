#!/usr/bin/env node

import sade from "sade";
import { cleanupDatabase } from "./clean-db.js";
import { insertExpenseTypes } from "./prep-db.js";

const prog = sade("my-cli");

prog.version("1.0.0");

prog
	.command("prune")
	.describe("Deletes all data from the database")
	.action(() => {
		cleanupDatabase()
			.then(() => {
				console.log("Database cleaned");
			})
			.catch((err) => {
				console.error(err);
			});
	})
	.command("prep")
	.describe("Insert sample expense categories/groups")
	.action(() => {
		insertExpenseTypes()
			.then(() => {
				console.log("Expense groups inserted");
			})
			.catch((err) => {
				console.error(err);
			});
	});

prog.parse(process.argv);
