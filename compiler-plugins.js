const allAvailablePlugins = {
	read: {
		name: 'read',
		async run(ctx) {
			ctx.fileContent = 'here is content of the file: ' + ctx.filePath;
		}
	},
	parse: {
		name: 'parse',
		async run(ctx) {
			ctx.fileAST = { this: 'is', ast: 'of', the: 'file' };
		}
	},
	validate: {
		name: 'validate',
		async run(ctx, global, next, finish) {
			const isValid = Math.random() > 0.5 ? true : false;
			console.log(isValid);

			if (isValid) {
				// file is valid, continue....
				console.log('file is valid, continue');
				await next();
			} else {
				finish(ctx.filePath + ' is not a valid @htmlplus/element file');
			}
		}
	},
	print: {
		name: 'print',
		async run(ctx, global, next, finish) {
			console.log('\n\n- context -----------------------------------');
			console.log(JSON.stringify(ctx, null, 2));
			console.log('\n\n- global ------------------------------------');
			console.log(JSON.stringify(global, null, 2));
			console.log('\n-------------------------------------------');
			await finish('Executed successfully');
		}
	}
};

function Compiler(options) {
	this.plugins = options.plugins ?? [];
	this.global = {
		contexts: {}
	};

	const start = async () => {
		console.log('start compiler');
		for (let plugin of this.plugins) {
			global = (await plugin.start?.(global)) ?? global;
		}
	};

	const run = async (filePath) => {
		console.log('run compiler', filePath);

		const context = {
			filePath
		};

		let finished = false;
		let i = 0;

		function finish(message) {
			console.log(`[finish from "${this.plugins[i - 1].name}"]: `, message);

			finished = true;
		}

		async function loop() {
			if (!finished) {
				if (i < this.plugins.length) {
					console.log('run plugin', `"${this.plugins[i].name}"...`);
					await plugins[i++].run?.(context, this.global, next, finish);
					this.global.contexts[filePath] = context;
				} else {
					console.log('finished normally');
				}
			} else {
				console.log('finished manually');
			}
		}

		async function next() {
			console.log(`calling next function from "${this.plugins[i].name}"`);
			await loop();
		}

		while (!finished && i < this.plugins.length) {
			loop();
		}

		return context;
	};

	const finish = async () => {
		for (let plugin in this.plugins) {
			this.global = (await plugin.finish?.(this.global)) ?? this.global;
		}
	};

	function use(...newPlugins) {
		plugins = [...plugins, ...newPlugins];
	}

	return {
		start,
		run,
		finish,
		use
	};
}

const compiler = Compiler({
	plugins: [
		allAvailablePlugins.read,
		allAvailablePlugins.parse,
		allAvailablePlugins.validate,
		{
			name: 'test',
			async run(context, global, next, finish) {
				console.log('Run test plugin');
				console.log({ some_field: context.some_field });
				await next();
				console.log('This lines will run at the end, maybe useful for cleanup');
				console.log({ some_field: context.some_field });
			}
		},
		{
			name: 'set some field',
			async run(context, global, next, finish) {
				console.log('setting some_field....');
				context.some_field = true;
			}
		},
		allAvailablePlugins.print,
		{
			name: 'Never',
			async run(context, global, next, finish) {
				console.log(
					'this is last plugin, and will not run,\
                 because in previous plugin we finished execution'
				);
				console.log(JSON.stringify(context, null, 2));
				console.log('\n\n');
				finish('Executed successfully...');
			}
		}
	]
});

// you can use more plugins using compiler.use method

compiler.use({
	name: 'some plugin',
	async start(global) {
		console.log('start of the plugin');
	},
	async run(context, global) {
		console.log('run of the plugin');
	},
	async finish(global) {
		console.log('finish of the plugin');
	}
});

async function test() {
	await compiler.start();

	const context = await compiler.run('test.js');

	console.log('finished run file ' + context.filePath);

	await compiler.finish();
}

test();
