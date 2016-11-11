var cmd1 = process.argv[2];
var args1 = [];
var i = 3;
while(true) {
	if(i >= process.argv.length) {
		console.error("Missing commands");
		process.exit();
	}
	var val = process.argv[i];
	if(val == ";") {
		break;
	}
	else {
		args1.push(val);
	}
	i++;
}
var cmd2 = process.argv[i+1];
var args2 = process.argv.slice(i+2);

var spawn = require('child_process').spawn;
var proc1 = spawn(cmd1, args1);
var proc2 = spawn(cmd2, args2);
proc1.stdout.pipe(process.stdout);
proc1.stderr.on('data', function(data) {
	proc2.stdin.write(data);
	process.stderr.write(data);
});
proc2.stdout.pipe(process.stdout);
proc2.stderr.pipe(process.stderr);
