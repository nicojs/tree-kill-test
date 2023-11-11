import childProcess from "child_process";
import treeKill from "tree-kill";
const child = childProcess.spawn("node", ["worker.js"], {
  stdio: "pipe",
});
child.on("exit", (code, signal) => {
  console.log(`child process exited with code ${code}, signal ${signal}`);
});

setTimeout(() => {
  treeKill(child.pid, "SIGTERM", (err) => {
    if (err) {
      console.log("Error killing child process");
    } else {
      console.log("Child process killed");
    }
  });
}, 1_000);
