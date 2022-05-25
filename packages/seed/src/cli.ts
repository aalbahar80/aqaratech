#!/usr/bin/env node

import sade from "sade";
import { cleanupDatabase } from "./clean-db.js";

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
	});

prog.parse(process.argv);
